import { test } from '@japa/runner'
import { DateTime } from 'luxon'
import testUtils from '@adonisjs/core/services/test_utils'
import type { UserRole } from '#config/roles'
import User from '#models/user'
import DemoRequest from '#models/demo_request'
import DemoRequestActivity from '#models/demo_request_activity'

let userCount = 0
function makeUser(role: UserRole) {
  userCount++
  return User.create({
    fullName: `${role} ${userCount}`,
    email: `${role}${userCount}@mlmsoft.test`,
    password: 'secret-password',
    role,
  })
}

let leadCount = 0
function makeLead(overrides: Partial<DemoRequest> = {}) {
  leadCount++
  return DemoRequest.create({
    fullName: `Lead ${leadCount}`,
    email: `lead${leadCount}@example.com`,
    company: `Company ${leadCount}`,
    status: 'new',
    source: 'homepage_demo',
    ...overrides,
  })
}

test.group('Admin | demo requests | access', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('guests are sent to the login page', async ({ client }) => {
    const response = await client.get('/admin/demo-requests').redirects(0)
    response.assertStatus(302)
    response.assertHeader('location', '/login')
  })

  test('signed-in users without a staff role are forbidden', async ({ client }) => {
    const user = await makeUser('user')
    const lead = await makeLead()

    const list = await client.get('/admin/demo-requests').loginAs(user)
    list.assertStatus(403)

    const detail = await client.get(`/admin/demo-requests/${lead.id}`).loginAs(user)
    detail.assertStatus(403)
  })

  test('users without a staff role cannot change status or add notes', async ({
    client,
    assert,
  }) => {
    const user = await makeUser('user')
    const lead = await makeLead()

    const status = await client
      .patch(`/admin/demo-requests/${lead.id}/status`)
      .json({ status: 'converted' })
      .withCsrfToken()
      .loginAs(user)
      .accept('json')
    status.assertStatus(403)

    const note = await client
      .post(`/admin/demo-requests/${lead.id}/notes`)
      .json({ body: 'sneaky' })
      .withCsrfToken()
      .loginAs(user)
      .accept('json')
    note.assertStatus(403)

    await lead.refresh()
    assert.equal(lead.status, 'new')
    assert.lengthOf(await DemoRequestActivity.all(), 0)
  })

  test('sales and admins can open the list and the detail page', async ({ client }) => {
    const lead = await makeLead()

    for (const role of ['sales', 'admin'] as const) {
      const user = await makeUser(role)
      const list = await client.get('/admin/demo-requests').withInertia().loginAs(user)
      list.assertStatus(200)
      list.assertInertiaComponent('admin/demo_requests/index')

      const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(user)
      detail.assertStatus(200)
      detail.assertInertiaComponent('admin/demo_requests/show')
    }
  })

  test('the detail page never exposes spam-analysis fields', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const lead = await makeLead({ ipHash: 'a'.repeat(64), userAgent: 'Mozilla/5.0' })

    const response = await client
      .get(`/admin/demo-requests/${lead.id}`)
      .withInertia()
      .loginAs(sales)

    assert.notProperty(response.inertiaProps.lead, 'ipHash')
    assert.notProperty(response.inertiaProps.lead, 'userAgent')
  })

  test('an unknown lead is a 404', async ({ client }) => {
    const sales = await makeUser('sales')
    const response = await client.get('/admin/demo-requests/999999').loginAs(sales)
    response.assertStatus(404)
  })
})

test.group('Admin | demo requests | list', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('lists leads newest first with pagination metadata', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const older = await makeLead()
    older.createdAt = DateTime.now().minus({ days: 2 })
    await older.save()
    const newer = await makeLead()

    const response = await client.get('/admin/demo-requests').withInertia().loginAs(sales)
    const { leads, hasAnyLeads } = response.inertiaProps

    assert.isTrue(hasAnyLeads)
    assert.equal(leads.metadata.total, 2)
    assert.deepEqual(
      leads.data.map((lead: { id: number }) => lead.id),
      [newer.id, older.id]
    )
  })

  test('filters by status, company type, member range, source and search', async ({
    client,
    assert,
  }) => {
    const sales = await makeUser('sales')
    const match = await makeLead({
      company: 'Nusantara Wellness',
      status: 'contacted',
      businessType: 'direct_selling',
      activeMembers: '5k_25k',
      source: 'homepage_estimator',
    })
    await makeLead({ company: 'Other Co', status: 'contacted', businessType: 'affiliate' })
    await makeLead({ company: 'Nusantara Beauty', status: 'new' })

    const ids = async (qs: Record<string, string>) => {
      const response = await client.get('/admin/demo-requests').qs(qs).withInertia().loginAs(sales)
      return response.inertiaProps.leads.data.map((lead: { id: number }) => lead.id)
    }

    assert.deepEqual(await ids({ status: 'contacted', businessType: 'direct_selling' }), [match.id])
    assert.deepEqual(await ids({ activeMembers: '5k_25k' }), [match.id])
    assert.deepEqual(await ids({ source: 'homepage_estimator' }), [match.id])
    assert.deepEqual(await ids({ q: 'wellness' }), [match.id])
    assert.lengthOf(await ids({ q: 'nusantara' }), 2)
  })

  test('filters by creation date range', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const old = await makeLead()
    old.createdAt = DateTime.fromISO('2026-01-10T10:00:00')
    await old.save()
    const recent = await makeLead()
    recent.createdAt = DateTime.fromISO('2026-03-05T10:00:00')
    await recent.save()

    const response = await client
      .get('/admin/demo-requests')
      .qs({ from: '2026-03-01', to: '2026-03-31' })
      .withInertia()
      .loginAs(sales)

    assert.deepEqual(
      response.inertiaProps.leads.data.map((lead: { id: number }) => lead.id),
      [recent.id]
    )
  })

  test('ignores invalid filters instead of failing', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    await makeLead()

    const response = await client
      .get('/admin/demo-requests')
      .qs({ status: 'hacked', sort: 'password; drop table users', page: '-4' })
      .withInertia()
      .loginAs(sales)

    response.assertStatus(200)
    assert.equal(response.inertiaProps.leads.metadata.total, 1)
    assert.equal(response.inertiaProps.filters.sort, 'created_at')
  })

  test('sorts by an allowed column', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const b = await makeLead({ company: 'Beta' })
    const a = await makeLead({ company: 'Alpha' })

    const response = await client
      .get('/admin/demo-requests')
      .qs({ sort: 'company', direction: 'asc' })
      .withInertia()
      .loginAs(sales)

    assert.deepEqual(
      response.inertiaProps.leads.data.map((lead: { id: number }) => lead.id),
      [a.id, b.id]
    )
  })

  test('paginates instead of loading every lead', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    for (let i = 0; i < 30; i++) await makeLead()

    const first = await client.get('/admin/demo-requests').withInertia().loginAs(sales)
    const second = await client
      .get('/admin/demo-requests')
      .qs({ page: 2 })
      .withInertia()
      .loginAs(sales)

    assert.lengthOf(first.inertiaProps.leads.data, 25)
    assert.equal(first.inertiaProps.leads.metadata.lastPage, 2)
    assert.lengthOf(second.inertiaProps.leads.data, 5)
  })

  test('distinguishes an empty inbox from filters with no match', async ({ client, assert }) => {
    const sales = await makeUser('sales')

    const empty = await client.get('/admin/demo-requests').withInertia().loginAs(sales)
    assert.isFalse(empty.inertiaProps.hasAnyLeads)

    await makeLead()
    const noMatch = await client
      .get('/admin/demo-requests')
      .qs({ q: 'nobody' })
      .withInertia()
      .loginAs(sales)
    assert.isTrue(noMatch.inertiaProps.hasAnyLeads)
    assert.lengthOf(noMatch.inertiaProps.leads.data, 0)
  })
})

test.group('Admin | demo requests | status and notes', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('changes status, stamps the milestone and records who did it', async ({
    client,
    assert,
  }) => {
    const sales = await makeUser('sales')
    const lead = await makeLead()

    const response = await client
      .patch(`/admin/demo-requests/${lead.id}/status`)
      .form({ status: 'contacted' })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)

    response.assertStatus(302)
    response.assertFlashMessage('success', 'Status changed to Contacted.')

    await lead.refresh()
    assert.equal(lead.status, 'contacted')
    assert.isNotNull(lead.contactedAt)

    const [activity] = await DemoRequestActivity.query().where('demo_request_id', lead.id)
    assert.equal(activity.type, 'status_changed')
    assert.equal(activity.fromStatus, 'new')
    assert.equal(activity.toStatus, 'contacted')
    assert.equal(activity.userId, sales.id)
  })

  test('never overwrites a milestone timestamp when a lead moves back and forth', async ({
    client,
    assert,
  }) => {
    const sales = await makeUser('sales')
    const firstContact = DateTime.fromISO('2026-02-01T09:00:00')
    const lead = await makeLead({ status: 'qualified', contactedAt: firstContact })

    for (const status of ['contacted', 'qualified', 'contacted']) {
      await client
        .patch(`/admin/demo-requests/${lead.id}/status`)
        .form({ status })
        .withCsrfToken()
        .loginAs(sales)
        .redirects(0)
    }

    await lead.refresh()
    assert.equal(lead.status, 'contacted')
    assert.equal(lead.contactedAt!.toISODate(), '2026-02-01')
    assert.lengthOf(await DemoRequestActivity.query().where('demo_request_id', lead.id), 3)
  })

  test('rejects an unknown status', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const lead = await makeLead()

    const response = await client
      .patch(`/admin/demo-requests/${lead.id}/status`)
      .json({ status: 'won' })
      .withCsrfToken()
      .loginAs(sales)
      .accept('json')

    response.assertStatus(422)
    await lead.refresh()
    assert.equal(lead.status, 'new')
  })

  test('adds internal notes to the history without touching the lead', async ({
    client,
    assert,
  }) => {
    const sales = await makeUser('sales')
    const lead = await makeLead()

    await client
      .post(`/admin/demo-requests/${lead.id}/notes`)
      .form({ body: 'Called <b>Budi</b>, send proposal on Monday.' })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)
    await client
      .post(`/admin/demo-requests/${lead.id}/notes`)
      .form({ body: 'Proposal sent.' })
      .withCsrfToken()
      .loginAs(sales)
      .redirects(0)

    const notes = await DemoRequestActivity.query()
      .where('demo_request_id', lead.id)
      .where('type', 'note')
      .orderBy('id')
    assert.deepEqual(
      notes.map((note) => note.body),
      ['Called <b>Budi</b>, send proposal on Monday.', 'Proposal sent.']
    )

    const detail = await client.get(`/admin/demo-requests/${lead.id}`).withInertia().loginAs(sales)
    assert.lengthOf(detail.inertiaProps.activities, 2)
    assert.equal(detail.inertiaProps.activities[0].author, sales.fullName)
  })

  test('rejects an empty note', async ({ client, assert }) => {
    const sales = await makeUser('sales')
    const lead = await makeLead()

    const response = await client
      .post(`/admin/demo-requests/${lead.id}/notes`)
      .json({ body: '   ' })
      .withCsrfToken()
      .loginAs(sales)
      .accept('json')

    response.assertStatus(422)
    assert.lengthOf(await DemoRequestActivity.all(), 0)
  })
})
