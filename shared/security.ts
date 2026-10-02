import type { Locale } from './locales.js'

/**
 * The Security & Trust page (docs/security-marketing.md). Routes, SEO,
 * navigation, tracking and the page read this module.
 */

export const SECURITY_PATH = '/security'

/** The `page` value sent with conversion events (see shared/analytics.ts). */
export const SECURITY_TRACKING_PAGE = 'security'

/**
 * A control the page may name under "What we can verify today". Each one
 * cites the rows of docs/security-evidence.md that prove it: every cited
 * row must be VERIFIED with "Public Claim Allowed: Yes", for the scope
 * named here (tests/unit/security_evidence.spec.ts). These controls belong
 * to mlmsoft's own marketing site and back office, never to a customer
 * platform, and the page says so.
 */
export type VerifiedControl = {
  key: string
  scope: 'MARKETING_SITE' | 'INTERNAL_ADMIN'
  evidence: string[]
  copy: Record<Locale, { title: string; text: string }>
}

export const verifiedControls: VerifiedControl[] = [
  {
    key: 'admin_access',
    scope: 'INTERNAL_ADMIN',
    evidence: ['SEC-ADM-005', 'SEC-ADM-006'],
    copy: {
      en: {
        title: 'Role-based back office',
        text: 'Staff see only the areas their role allows, and every page and action is checked on the server.',
      },
      id: {
        title: 'Back office berbasis peran',
        text: 'Staf hanya melihat area yang diizinkan untuk perannya, dan setiap halaman serta aksi diperiksa di server.',
      },
    },
  },
  {
    key: 'staff_accounts',
    scope: 'INTERNAL_ADMIN',
    evidence: ['SEC-ADM-009', 'SEC-ADM-001'],
    copy: {
      en: {
        title: 'Controlled staff accounts',
        text: 'There is no public sign-up: accounts are created by an administrator, and passwords are stored as salted one-way hashes.',
      },
      id: {
        title: 'Akun staf yang terkendali',
        text: 'Tidak ada pendaftaran publik: akun dibuat oleh administrator, dan password disimpan sebagai hash satu arah dengan salt.',
      },
    },
  },
  {
    key: 'sessions',
    scope: 'INTERNAL_ADMIN',
    evidence: ['SEC-ADM-003'],
    copy: {
      en: {
        title: 'Protected sessions',
        text: 'A new session starts at every sign-in, carried in a cookie that page scripts cannot read.',
      },
      id: {
        title: 'Sesi yang terlindungi',
        text: 'Setiap login memulai sesi baru, disimpan dalam cookie yang tidak bisa dibaca oleh script halaman.',
      },
    },
  },
  {
    key: 'forms',
    scope: 'MARKETING_SITE',
    evidence: ['SEC-MKT-001', 'SEC-MKT-002'],
    copy: {
      en: {
        title: 'Validated forms',
        text: 'Every form and event is validated on the server, and every request that changes data must carry a valid anti-forgery token.',
      },
      id: {
        title: 'Form yang divalidasi',
        text: 'Setiap form dan event divalidasi di server, dan setiap request yang mengubah data wajib membawa token anti-pemalsuan yang valid.',
      },
    },
  },
  {
    key: 'browser',
    scope: 'MARKETING_SITE',
    evidence: ['SEC-MKT-004', 'SEC-MKT-007'],
    copy: {
      en: {
        title: 'Browser protections',
        text: 'Pages are sent with security headers and a content security policy, and error pages show no technical detail.',
      },
      id: {
        title: 'Perlindungan di browser',
        text: 'Halaman dikirim dengan security header dan content security policy, dan halaman error tidak menampilkan detail teknis.',
      },
    },
  },
  {
    key: 'analytics',
    scope: 'MARKETING_SITE',
    evidence: ['SEC-MKT-010', 'SEC-MKT-011'],
    copy: {
      en: {
        title: 'First-party, pseudonymous analytics',
        text: 'Marketing analytics use a random visitor ID, no third-party tracking scripts and no personal data in events.',
      },
      id: {
        title: 'Analitik first-party dan pseudonim',
        text: 'Analitik marketing memakai ID pengunjung acak, tanpa script pelacak pihak ketiga dan tanpa data pribadi di dalam event.',
      },
    },
  },
  {
    key: 'references',
    scope: 'INTERNAL_ADMIN',
    evidence: ['SEC-ADM-007'],
    copy: {
      en: {
        title: 'Expiring WhatsApp references',
        text: 'The reference in a WhatsApp message expires, and it opens nothing outside the signed-in back office.',
      },
      id: {
        title: 'Referensi WhatsApp yang kedaluwarsa',
        text: 'Referensi di pesan WhatsApp memiliki masa berlaku, dan tidak membuka apa pun di luar back office yang memerlukan login.',
      },
    },
  },
  {
    key: 'secrets',
    scope: 'MARKETING_SITE',
    evidence: ['SEC-MKT-020'],
    copy: {
      en: {
        title: 'Secrets kept out of the code',
        text: 'Keys and credentials come from the environment configuration, never from the source code.',
      },
      id: {
        title: 'Rahasia di luar kode',
        text: 'Kunci dan kredensial berasal dari konfigurasi environment, tidak pernah dari source code.',
      },
    },
  },
]
