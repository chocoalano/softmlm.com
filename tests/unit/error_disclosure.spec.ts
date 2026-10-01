import { test } from '@japa/runner'
import db from '@adonisjs/lucid/services/db'
import testUtils from '@adonisjs/core/services/test_utils'
import HttpExceptionHandler from '#exceptions/handler'

class ProductionHandler extends HttpExceptionHandler {
  protected debug = false
  protected renderStatusPages = false
}

test.group('Error disclosure', () => {
  test('a failed query never carries its bound values into the error', async ({ assert }) => {
    const error = await db
      .table('demo_requests')
      .insert({ no_such_column: 'private-person@example.com' })
      .catch((failure: Error) => failure)
    assert.instanceOf(error, Error)
    assert.notInclude((error as Error).message, 'private-person@example.com')
  })

  for (const accept of ['application/json', 'application/vnd.api+json', 'text/html']) {
    test(`outside debug mode a server error hides its message (${accept})`, async ({
      assert,
    }) => {
      const ctx = await testUtils.createHttpContext()
      ctx.request.request.headers.accept = accept
      const failure = new Error('insert into secret_table - SQLITE_ERROR at /srv/app/x.ts:12')

      await new ProductionHandler().handle(failure, ctx)

      assert.equal(ctx.response.getStatus(), 500)
      const body = JSON.stringify(ctx.response.getBody())
      assert.notInclude(body, 'secret_table')
      assert.notInclude(body, '/srv/app')
      assert.include(body, 'Internal server error')
    })
  }

  test('outside debug mode a client error keeps its message', async ({ assert }) => {
    const ctx = await testUtils.createHttpContext()
    ctx.request.request.headers.accept = 'application/json'
    const failure = Object.assign(new Error('Too large'), { status: 413 })

    await new ProductionHandler().handle(failure, ctx)

    assert.equal(ctx.response.getStatus(), 413)
    assert.deepEqual(ctx.response.getBody(), { message: 'Too large' })
  })
})
