import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import { verifiedControls } from '#shared/security'
import { LOCALES } from '#shared/locales'
import { findClaimViolations } from '#tests/support/claims'

/**
 * Phase 11: the security evidence matrix (docs/security-evidence.md) and
 * the controls the public Security page names (shared/security.ts) stay in
 * step. A control can only reach the page with evidence that is VERIFIED,
 * allowed as a public claim, and scoped to mlmsoft's own systems.
 */

const STATUSES = [
  'VERIFIED',
  'CONFIG_DEPENDENT',
  'PARTIALLY_VERIFIED',
  'PLANNED',
  'NOT_VERIFIED',
  'NOT_APPLICABLE',
]
const SCOPES: Record<string, string> = {
  MKT: 'MARKETING_SITE',
  ADM: 'INTERNAL_ADMIN',
  CUS: 'CUSTOMER_PLATFORM',
}

type Row = {
  id: string
  control: string
  scope: string
  evidence: string
  status: string
  dependency: string
  publicClaim: string
}

async function evidenceRows(): Promise<Row[]> {
  const source = await readFile(app.makePath('docs/security-evidence.md'), 'utf8')
  return source
    .split('\n')
    .filter((line) => line.startsWith('| SEC-'))
    .map((line) => {
      const cells = line
        .slice(1, -1)
        .split(' | ')
        .map((cell) => cell.trim())
      const [id, control, scope, evidence, status, dependency, publicClaim] = cells
      return { id, control, scope, evidence, status, dependency, publicClaim, cells } as Row & {
        cells: string[]
      }
    })
}

test.group('Security evidence', () => {
  test('every row is well formed: ID, scope, status and claim', async ({ assert }) => {
    const rows = await evidenceRows()
    assert.isAbove(rows.length, 30)
    const ids = new Set<string>()
    for (const row of rows as (Row & { cells: string[] })[]) {
      assert.lengthOf(row.cells, 7, row.id)
      assert.match(row.id, /^SEC-(MKT|ADM|CUS)-\d{3}$/)
      assert.isFalse(ids.has(row.id), `duplicate ${row.id}`)
      ids.add(row.id)
      assert.equal(row.scope, SCOPES[row.id.slice(4, 7)], `${row.id} scope`)
      assert.include(STATUSES, row.status, `${row.id} status`)
      assert.include(['Yes', 'No'], row.publicClaim, `${row.id} public claim`)
      assert.isNotEmpty(row.evidence, `${row.id} evidence`)
    }
  })

  test('only verified controls without a production dependency may be claimed', async ({
    assert,
  }) => {
    for (const row of await evidenceRows()) {
      if (row.publicClaim !== 'Yes') continue
      assert.equal(row.status, 'VERIFIED', row.id)
      assert.equal(row.dependency, 'None', row.id)
      assert.notEqual(row.scope, 'CUSTOMER_PLATFORM', row.id)
    }
  })

  test('nothing is claimed for a customer platform, and the hard topics stay unclaimed', async ({
    assert,
  }) => {
    const rows = await evidenceRows()
    for (const row of rows.filter((item) => item.scope === 'CUSTOMER_PLATFORM')) {
      assert.equal(row.publicClaim, 'No', row.id)
      assert.notEqual(row.status, 'VERIFIED', row.id)
    }
    for (const topic of [
      /encryption at rest/i,
      /backups?/i,
      /two-factor/i,
      /single sign-on/i,
      /certification/i,
    ]) {
      const matching = rows.filter((row) => topic.test(row.control))
      assert.isNotEmpty(matching, String(topic))
      for (const row of matching) assert.equal(row.publicClaim, 'No', `${row.id} ${topic}`)
    }
  })

  test('the Security page names only controls with public, verified evidence', async ({
    assert,
  }) => {
    const matrix = await evidenceRows()
    const rows = new Map(matrix.map((row) => [row.id, row]))
    assert.isNotEmpty(verifiedControls)
    for (const control of verifiedControls) {
      assert.isNotEmpty(control.evidence, control.key)
      for (const id of control.evidence) {
        const row = rows.get(id)
        assert.exists(row, `${control.key} cites ${id}, which is not in the matrix`)
        assert.equal(row!.status, 'VERIFIED', `${control.key} → ${id}`)
        assert.equal(row!.publicClaim, 'Yes', `${control.key} → ${id}`)
        assert.equal(row!.scope, control.scope, `${control.key} → ${id}`)
      }
    }
  })

  test('the controls read the same in both languages and pass the claims gate', ({ assert }) => {
    for (const control of verifiedControls) {
      for (const locale of LOCALES) {
        const { title, text } = control.copy[locale]
        assert.isNotEmpty(title, `${control.key} ${locale}`)
        assert.isNotEmpty(text, `${control.key} ${locale}`)
        assert.isEmpty(findClaimViolations(`${title}\n${text}`), `${control.key} ${locale}`)
      }
    }
  })

  test('the public page reveals no limit, path, version or finding', async ({ assert }) => {
    const sources = await Promise.all(
      ['inertia/i18n/en/security.ts', 'inertia/i18n/id/security.ts', 'shared/security.ts'].map(
        (file) => readFile(app.makePath(file), 'utf8')
      )
    )
    const copy = sources.join('\n')
    for (const leak of [
      /\/admin\b/,
      /\/marketing\/events/,
      /\/r\/whatsapp/,
      /\b\d+\s*(?:requests?|attempts?|failures?)\s*(?:per|\/|every|a)\s*(?:minute|hour)/i,
      /\bAUD-\d{3}\b/,
      /\bv?\d+\.\d+\.\d+\b/,
      /\bscrypt\b|\bargon2\b|\bbcrypt\b/i,
      /\btrustProxy\b|\bAPP_KEY\b|\bDB_PASSWORD\b/,
      /\b(?:MySQL|SQLite|MariaDB|Hostinger)\b/i,
    ]) {
      assert.notMatch(copy, leak, String(leak))
    }
  })
})
