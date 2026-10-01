import { test } from '@japa/runner'
import ace from '@adonisjs/core/services/ace'
import hash from '@adonisjs/core/services/hash'
import testUtils from '@adonisjs/core/services/test_utils'
import CreateUser from '../../../commands/create_user.js'
import User from '#models/user'

const PASSWORD = 'a-long-staff-password'

async function run(args: string[], password = PASSWORD, repeat = password) {
  const command = await ace.create(CreateUser, args)
  command.prompt.trap('Password').replyWith(password)
  command.prompt.trap('Repeat the password').replyWith(repeat)
  await command.exec()
  return command
}

test.group('Command | users:create', (group) => {
  group.each.setup(() => testUtils.db().truncate())
  group.each.setup(() => {
    ace.ui.switchMode('raw')
    return () => ace.ui.switchMode('normal')
  })

  test('creates a staff account with a hashed password', async ({ assert }) => {
    const command = await run(['Sales@MLMsoft.test ', 'sales', '--name=Rina Sales'])
    command.assertSucceeded()

    const user = await User.findByOrFail('email', 'sales@mlmsoft.test')
    assert.equal(user.role, 'sales')
    assert.equal(user.fullName, 'Rina Sales')
    assert.notEqual(user.password, PASSWORD)
    assert.isTrue(await hash.verify(user.password, PASSWORD))
  })

  test('never prints the password', async ({ assert }) => {
    const command = await run(['sales@mlmsoft.test', 'sales'])
    const output = JSON.stringify(command.ui.logger.getLogs())
    assert.notInclude(output, PASSWORD)
  })

  test('refuses an unknown role, a duplicate email and a short password', async ({ assert }) => {
    ;(await run(['someone@mlmsoft.test', 'owner'])).assertFailed()

    await User.create({ email: 'taken@mlmsoft.test', password: PASSWORD, role: 'user' })
    ;(await run(['taken@mlmsoft.test', 'admin'])).assertFailed()
    const existing = await User.findByOrFail('email', 'taken@mlmsoft.test')
    assert.equal(existing.role, 'user')

    // the prompt keeps asking until the password is long enough
    const command = await ace.create(CreateUser, ['short@mlmsoft.test', 'sales'])
    command.prompt
      .trap('Password')
      .assertFails('too-short', `Use ${CreateUser.MIN_PASSWORD} to 128 characters`)
      .assertPasses(PASSWORD)
      .replyWith(PASSWORD)
    command.prompt.trap('Repeat the password').replyWith(PASSWORD)
    await command.exec()
    command.assertSucceeded()
  })

  test('refuses when the repeated password differs', async ({ assert }) => {
    const command = await run(['sales@mlmsoft.test', 'sales'], PASSWORD, 'something-else-entirely')
    command.assertFailed()
    assert.isNull(await User.findBy('email', 'sales@mlmsoft.test'))
  })
})
