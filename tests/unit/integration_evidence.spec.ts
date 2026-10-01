import { test } from '@japa/runner'
import { readFile } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import { verifiedIntegrations } from '#shared/integrations'
import { auditedFiles, visibleCopy } from '#tests/support/claims'

/**
 * Evidence-driven integration copy (docs/integration-evidence.md): the
 * matrix decides what may be public. A provider becomes public only when
 * its row is VERIFIED_IN_MLMSOFT with "Public Claim Allowed: Yes" and it is
 * listed in `verifiedIntegrations`; until then no provider from the
 * document's list may appear in any public marketing file.
 */

const STATUSES = [
  'VERIFIED_IN_MLMSOFT',
  'VERIFIED_IN_REFERENCE_ONLY',
  'PARTIALLY_VERIFIED',
  'PLANNED',
  'NOT_VERIFIED',
]

async function evidence() {
  const doc = await readFile(app.makePath('docs/integration-evidence.md'), 'utf8')
  const section = (title: string) => {
    const start = doc.indexOf(`## ${title}`)
    if (start === -1) throw new Error(`Missing section "${title}"`)
    const end = doc.indexOf('\n## ', start + 1)
    return doc.slice(start, end === -1 ? undefined : end)
  }

  const rows = section('Evidence matrix')
    .split('\n')
    .filter((line) => line.startsWith('| ') && !line.startsWith('| Integration Area'))
    .map((line) =>
      line
        .slice(1, -1)
        .split(' | ')
        .map((cell) => cell.trim())
    )
    .map(([area, provider, source, proof, status, publicClaim]) => ({
      area,
      provider,
      source,
      proof,
      status: status.match(/`([A-Z_]+)`/)?.[1] ?? status,
      publicClaim,
    }))

  /* the name list: lines made only of `Name` tokens (prose lines are skipped) */
  const providers = section('Provider names never used in public copy')
    .split('\n')
    .filter((line) => /^(?:`[^`]+`\s*)+$/.test(line.trim()))
    .flatMap((line) => [...line.matchAll(/`([^`]+)`/g)].map((match) => match[1]))

  return { rows, providers }
}

test.group('Integration evidence', () => {
  test('every row of the matrix has a known status', async ({ assert }) => {
    const { rows } = await evidence()
    assert.isAbove(rows.length, 20)
    for (const row of rows) assert.include(STATUSES, row.status, `${row.area}: ${row.status}`)
  })

  test('the public connector list follows the matrix', async ({ assert }) => {
    const { rows } = await evidence()
    const publicProviders = rows
      .filter((row) => row.status === 'VERIFIED_IN_MLMSOFT' && /^Yes\b/.test(row.publicClaim))
      .map((row) => row.provider)
      .sort()
    assert.deepEqual(verifiedIntegrations.map((item) => item.provider).sort(), publicProviders)
    // today: no provider integration is verified in mlmsoft
    assert.isEmpty(verifiedIntegrations)
  })

  test('no unverified provider name appears in public marketing copy', async ({ assert }) => {
    const { providers } = await evidence()
    const allowed = new Set(verifiedIntegrations.map((item) => item.provider))
    const blocked = providers.filter((name) => !allowed.has(name))
    assert.isAbove(blocked.length, 30)

    const offenders: string[] = []
    for (const file of await auditedFiles()) {
      const copy = visibleCopy(await readFile(app.makePath(file), 'utf8'))
      copy.split('\n').forEach((line, index) => {
        for (const name of blocked) {
          const escaped = name.replace(/[.*+?^${}()|[\]\\&]/g, (char) =>
            char === '&' ? '&(?:amp;)?' : `\\${char}`
          )
          if (new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`).test(line)) {
            offenders.push(`${file}:${index + 1} ${name}`)
          }
        }
      })
    }
    assert.deepEqual(offenders, [])
  })
})
