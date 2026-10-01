import { test } from '@japa/runner'
import ace from '@adonisjs/core/services/ace'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import { Secret } from '@adonisjs/core/helpers'
import env from '#start/env'
import BootstrapAdmin from '../../../commands/bootstrap_admin.js'
import User from '#models/user'

/**
 * The first admin account on a host without a shell (Hostinger shared
 * hosting): created from BOOTSTRAP_ADMIN_* during `npm run build:hostinger`.
 */

const PASSWORD = 'a-long-bootstrap-password'

/** Sets the BOOTSTRAP_ADMIN_* variables; an undefined value removes the variable. */
function configure(email?: string, password?: string, name?: string) {
  const values = {
    BOOTSTRAP_ADMIN_EMAIL: email,
    BOOTSTRAP_ADMIN_PASSWORD: password === undefined ? undefined : new Secret(password),
    BOOTSTRAP_ADMIN_NAME: name,
  }
  for (const [key, value] of Object.entries(values)) {
    env.set(key as keyof typeof values, value as never)
    // Env.set also writes process.env, where undefined becomes "undefined"
    if (value === undefined) delete process.env[key]
  }
}

async function run() {
  const command = await ace.create(BootstrapAdmin, [])
  await command.exec()
  return command
}

async function runExpecting(outcome: 'succeeded' | 'failed') {
  const command = await run()
  if (outcome === 'succeeded') command.assertSucceeded()
  else command.assertFailed()
}

test.group('Command | users:bootstrap', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    ace.ui.switchMode('raw')
    return () => {
      ace.ui.switchMode('normal')
      configure()
    }
  })

  test('does nothing unless both email and password are set', async ({ assert }) => {
    for (const [email, password] of [
      [undefined, undefined],
      ['owner@mlmsoft.test', undefined],
      [undefined, PASSWORD],
    ]) {
      configure(email, password)
      const command = await run()
      command.assertSucceeded()
    }
    assert.lengthOf(await User.all(), 0)
  })

  test('creates the first admin with a hashed password, never printing it', async ({ assert }) => {
    configure(' Owner@MLMsoft.TEST ', PASSWORD, 'Owner')
    const command = await run()
    command.assertSucceeded()

    const user = await User.findByOrFail('email', 'owner@mlmsoft.test')
    assert.equal(user.role, 'admin')
    assert.equal(user.fullName, 'Owner')
    assert.isTrue(await hash.verify(user.password, PASSWORD))
    assert.notInclude(JSON.stringify(command.ui.logger.getLogs()), PASSWORD)
  })

  test('runs on every deployment without touching existing accounts', async ({ assert }) => {
    configure('owner@mlmsoft.test', PASSWORD)
    await runExpecting('succeeded')
    const created = await User.findByOrFail('email', 'owner@mlmsoft.test')

    // the next deployment, even with a different password in the panel
    configure('owner@mlmsoft.test', 'another-long-password')
    await runExpecting('succeeded')
    configure('second@mlmsoft.test', PASSWORD)
    await runExpecting('succeeded')

    assert.lengthOf(await User.all(), 1)
    await created.refresh()
    assert.isTrue(await hash.verify(created.password, PASSWORD))
  })

  test('fails the deployment on a bad value or an existing non-admin email', async ({ assert }) => {
    configure('not-an-email', PASSWORD)
    await runExpecting('failed')
    configure('owner@mlmsoft.test', 'too-short')
    await runExpecting('failed')
    assert.lengthOf(await User.all(), 0)

    await User.create({ email: 'sales@mlmsoft.test', password: PASSWORD, role: 'sales' })
    configure('sales@mlmsoft.test', PASSWORD)
    await runExpecting('failed')
    const sales = await User.findByOrFail('email', 'sales@mlmsoft.test')
    assert.equal(sales.role, 'sales')
  })
})
