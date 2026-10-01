import { test } from '@japa/runner'
import type { ApiClient } from '@japa/api-client'
import testUtils from '@adonisjs/core/services/test_utils'
import limiter from '@adonisjs/limiter/services/main'
import accountsConfig from '#config/accounts'
import User from '#models/user'

const PASSWORD = 'correct-horse-battery'

function makeUser(email = 'staff@mlmsoft.test') {
  return User.create({ fullName: 'Staff', email, password: PASSWORD, role: 'sales' })
}

function signIn(client: ApiClient, email: string, password: string) {
  return client
    .post('/login')
    .form({ email, password })
    .withCsrfToken()
    .header('referer', '/login')
    .redirects(0)
}

/** Turns public sign-up on or off for one test. */
function publicSignup(enabled: boolean, cleanup: (fn: () => void) => void) {
  const config = accountsConfig as { publicSignup: boolean }
  const original = config.publicSignup
  config.publicSignup = enabled
  cleanup(() => {
    config.publicSignup = original
  })
}

test.group('Auth | sign in', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))

  test('signs a staff member in and out', async ({ client }) => {
    const user = await makeUser()

    const login = await signIn(client, user.email, PASSWORD)
    login.assertStatus(302)
    login.assertHeader('location', '/dashboard')

    const dashboard = await client.get('/dashboard').loginAs(user).redirects(0)
    dashboard.assertStatus(200)

    const logout = await client.post('/logout').withCsrfToken().loginAs(user).redirects(0)
    logout.assertStatus(302)
    logout.assertHeader('location', '/login')
  })

  test('the email is compared trimmed and in lower case', async ({ client }) => {
    await makeUser()
    const login = await signIn(client, '  Staff@MLMsoft.TEST ', PASSWORD)
    login.assertHeader('location', '/dashboard')
  })

  test('the same message for a wrong password and an unknown email', async ({ client }) => {
    await makeUser()

    const wrongPassword = await signIn(client, 'staff@mlmsoft.test', 'not-the-password')
    wrongPassword.assertStatus(302)
    wrongPassword.assertFlashMessage('errorsBag', { password: 'Invalid email or password.' })

    const unknownEmail = await signIn(client, 'nobody@mlmsoft.test', 'not-the-password')
    unknownEmail.assertStatus(302)
    unknownEmail.assertFlashMessage('errorsBag', { password: 'Invalid email or password.' })
  })

  test('never flashes the password back to the form', async ({ client, assert }) => {
    await makeUser()
    const response = await signIn(client, 'staff@mlmsoft.test', 'not-the-password')
    const flash = response.flashMessages()
    assert.notProperty(flash, 'password')
    assert.equal(flash.email, 'staff@mlmsoft.test')
  })

  test('a fresh session after signing in, the same one after a failure', async ({
    client,
    assert,
  }) => {
    const user = await makeUser()

    // the test client's own session (it carries the CSRF secret)
    const failed = signIn(client, user.email, 'not-the-password')
    const failedId = failed.sessionClient.sessionId
    const failedResponse = await failed
    assert.equal(failedResponse.cookie('adonis-session')?.value, failedId)

    const login = signIn(client, user.email, PASSWORD)
    const before = login.sessionClient.sessionId
    const response = await login
    response.assertHeader('location', '/dashboard')
    const after = response.cookie('adonis-session')?.value
    assert.exists(after)
    assert.notEqual(after, before)
  })

  test('locks an account out after repeated failures, even with the right password', async ({
    client,
  }) => {
    const user = await makeUser()
    for (let i = 0; i < accountsConfig.login.failures; i++) {
      const failed = await signIn(client, user.email, `wrong-${i}`)
      failed.assertFlashMessage('errorsBag', { password: 'Invalid email or password.' })
    }

    const locked = await signIn(client, user.email, PASSWORD)
    locked.assertStatus(302)
    locked.assertHeader('location', '/login')
    locked.assertFlashMessage('errorsBag', {
      password: 'Too many sign-in attempts. Try again in 15 minutes.',
    })
  })

  test('one locked account does not lock another', async ({ client }) => {
    const user = await makeUser()
    const other = await makeUser('other@mlmsoft.test')
    for (let i = 0; i < accountsConfig.login.failures; i++) {
      await signIn(client, user.email, `wrong-${i}`)
    }

    const login = await signIn(client, other.email, PASSWORD)
    login.assertHeader('location', '/dashboard')
  })

  test('a successful sign-in clears earlier failures', async ({ client }) => {
    const user = await makeUser()
    for (let i = 0; i < accountsConfig.login.failures - 1; i++) {
      await signIn(client, user.email, `wrong-${i}`)
    }
    const first = await signIn(client, user.email, PASSWORD)
    first.assertHeader('location', '/dashboard')

    for (let i = 0; i < accountsConfig.login.failures - 1; i++) {
      await signIn(client, user.email, `wrong-again-${i}`)
    }
    const second = await signIn(client, user.email, PASSWORD)
    second.assertHeader('location', '/dashboard')
  })

  test('caps sign-in requests per client address', async ({ client, assert }) => {
    let limited = 0
    for (let i = 0; i < 21; i++) {
      const response = await client
        .post('/login')
        .json({ email: `someone${i}@mlmsoft.test`, password: 'whatever-password' })
        .withCsrfToken()
        .accept('json')
        .redirects(0)
      if (response.status() === 429) limited++
    }
    assert.equal(limited, 1)
  })

  test('signing out needs the CSRF token', async ({ client, assert }) => {
    const user = await makeUser()
    const logout = await client.post('/logout').loginAs(user).redirects(0)
    // refused before the controller: it would have sent the visitor to /login
    assert.notEqual(logout.header('location'), '/login')
  })
})

test.group('Auth | public sign-up', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => limiter.clear(['memory']))

  test('is off by default in production', async ({ assert }) => {
    const source = await import('node:fs/promises').then((fs) =>
      fs.readFile(new URL('../../../config/accounts.ts', import.meta.url), 'utf8')
    )
    assert.match(
      source,
      /publicSignup:\s*env\.get\('PUBLIC_SIGNUP_ENABLED',\s*!app\.inProduction\)/
    )
  })

  test('when off, the page and the form are not found and nothing is created', async ({
    client,
    assert,
    cleanup,
  }) => {
    publicSignup(false, cleanup)

    const page = await client.get('/signup').redirects(0)
    page.assertStatus(404)

    const submit = await client
      .post('/signup')
      .form({
        fullName: 'Someone',
        email: 'someone@example.com',
        password: 'long-enough-password',
        passwordConfirmation: 'long-enough-password',
      })
      .withCsrfToken()
      .redirects(0)
    submit.assertStatus(404)
    assert.lengthOf(await User.all(), 0)

    const login = await client.get('/login').withInertia()
    assert.isFalse(login.inertiaProps.signupEnabled)
  })

  test('when on, the login page links to it', async ({ client, assert, cleanup }) => {
    publicSignup(true, cleanup)
    const login = await client.get('/login').withInertia()
    assert.isTrue(login.inertiaProps.signupEnabled)
  })

  test('new accounts never get a staff role', async ({ client, assert, cleanup }) => {
    publicSignup(true, cleanup)
    await client
      .post('/signup')
      .form({
        fullName: 'Someone',
        email: 'someone@example.com',
        password: 'long-enough-password',
        passwordConfirmation: 'long-enough-password',
        role: 'admin',
      })
      .withCsrfToken()
      .redirects(0)

    const user = await User.findByOrFail('email', 'someone@example.com')
    assert.equal(user.role, 'user')
    assert.isFalse(user.canManageLeads)
    assert.isFalse(user.canViewMarketing)
  })
})
