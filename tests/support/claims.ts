/**
 * Claims gate (docs/capability-evidence.md).
 *
 * Flags copy that presents an unverified capability as available today, or
 * that uses an unproven quality claim. It does not ban topics: "Discuss the
 * wallet and payout needs of your business" passes, while "mlmsoft
 * automatically manages wallet payouts" fails.
 */

import { readdir } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'

type Rule = { rule: string; pattern: RegExp }

const SUBJECT = String.raw`(?:mlmsoft|platform|engine|system|software|it)`
const CAPABILITY_VERB = String.raw`(?:supports|includes|calculates|manages|handles|processes|pays|posts|withholds|reverses|syncs|integrates|tracks|generates|provides|comes with|offers|automates)`
const MONEY_NOUN = String.raw`(?:bonus(?:es)?|commissions?|payouts?|tax(?:es)?|reversals?|wallets?|withdrawals?|ranks?|orders?)`
const DONE_VERB = String.raw`(?:calculated|paid|posted|reversed|credited|withheld|processed|synced|updated|approved)`
const TECH_TERM = String.raw`(?:SSO|single sign-on|2FA|two-factor(?: authentication)?|MFA|encryption at rest|disaster recovery|multi-tenan\w*|(?:REST |public |open )?APIs?|webhooks?)\b`

export const CLAIM_RULES: Rule[] = [
  {
    rule: 'unproven quality',
    pattern:
      /\b(?:enterprise-grade|bank-grade|bank-level|military-grade|unlimited|real[- ]?time|fully automated|guaranteed|compliant|certified|99\.9+%|horizontally scalable|auto-?scal\w+)\b|\bscales? (?:horizontally|infinitely|automatically)\b/i,
  },
  {
    rule: 'security claim',
    pattern: /\b(?:is|are|stays?|kept|fully|highly)\s+secure\b|\bsecure by (?:default|design)\b/i,
  },
  {
    rule: 'security guarantee claim',
    pattern:
      /\bunhackable\b|\bhack[- ]?proof\b|\bbulletproof\b|\bfully encrypted\b|\bencrypted at rest\b|\b(?:SOC ?2|ISO ?27001|PCI[- ]DSS|HIPAA)(?:\s+type\s+(?:I{1,2}|[12]))?\s+(?:certified|compliant|accredited)\b|\b(?:certified|compliant|accredited)\s+(?:with\s+|to\s+)?(?:SOC ?2|ISO ?27001|PCI[- ]DSS|HIPAA|GDPR|PDPA)\b|\b(?:GDPR|PDPA|HIPAA)[- ]compliant\b|\bguaranteed uptime\b|\buptime guarantee\b|\b(?:zero|no) data loss\b|\bdisaster[- ]proof\b|\b100% (?:secure|uptime|safe)\b|\b(?:enterprise|bank|military)[- ](?:grade|level) security\b/i,
  },
  {
    rule: 'availability claim',
    pattern: new RegExp(
      String.raw`\b${SUBJECT}\s+(?:now\s+|already\s+|automatically\s+)?${CAPABILITY_VERB}\b`,
      'i'
    ),
  },
  {
    rule: 'automation claim',
    pattern: new RegExp(
      String.raw`\b${MONEY_NOUN}\s+(?:are|is|get|gets)\s+${DONE_VERB}\s+automatically\b|\bautomatically\s+(?:calculates?|pays?|posts?|reverses?|credits?|withholds?|processes|syncs?)\b`,
      'i'
    ),
  },
  {
    rule: 'plan support claim',
    pattern:
      /\bsupports?\s+(?:binary|unilevel|matrix|generation|hybrid|stairstep)\b|\bsupports?\s+(?:every|all|any)\s+(?:(?:kind|type)s?\s+of\s+)?(?:[a-z-]+\s+)?(?:plans?|plan types?|compensation|bonus(?:es)?|structures?)\b|\bsupported (?:plans?|plan types?)\b/i,
  },
  { rule: 'built-in claim', pattern: /\bbuilt[- ]in\b/i },
  {
    rule: 'technical capability claim',
    pattern: new RegExp(
      String.raw`\b(?:includes?|supports?|offers?|provides?|has|comes with|ships with)\s+(?:an?\s+|full\s+|native\s+)?${TECH_TERM}` +
        String.raw`|${TECH_TERM}\s+(?:is|are)\s+(?:already\s+)?(?:included|available|supported|ready|enabled)\b`,
      'i'
    ),
  },
  {
    rule: 'market fit as capability',
    pattern:
      /\b(?:designed|built|made|tailored|optimi[sz]ed)\s+(?:specifically\s+)?for\s+(?:the\s+)?Indonesian\b/i,
  },
  {
    rule: 'direct builder access promise',
    pattern:
      /\b(?:team|people)\s+(?:that|who)\s+builds?\s+it\b|\b(?:talk|speak|chat)\s+(?:directly\s+)?(?:to|with)\s+(?:our\s+|the\s+)?(?:engineers?|developers?|builders?|technical team|tech team)\b/i,
  },
  {
    rule: 'availability wording',
    pattern: /\b(?:is|are)\s+(?:now\s+)?(?:available|live)\s+(?:today|now)\b/i,
  },

  /* ---- implementation promises (docs/implementation-marketing.md) ---- */
  {
    rule: 'implementation promise',
    pattern:
      /\bguarantee[sd]?\s+(?:an?\s+|the\s+|your\s+)?(?:on-time\s+|successful\s+|smooth\s+)?(?:launch|go-live|migration|timeline|delivery|results?|success)\b|\b(?:launch|go-live|migration|timeline|delivery)\s+(?:is\s+|are\s+)?guaranteed\b|\b(?:seamless(?:ly)?|effortless(?:ly)?|hassle-free|painless)\b|\bzero[- ]downtime\b|\b(?:no|without(?:\s+any)?)\s+downtime\b|\binstant(?:ly)?\s+(?:implementation|setup|set-up|launch|go-live|migration|deployment|onboarding)\b|\b(?:implemented|launched|migrated|deployed|live)\s+instantly\b/i,
  },
  {
    rule: 'timeline promise',
    pattern:
      /\b(?:go[- ]live|launch(?:ed)?|live|implemented|migrated|up and running)\s+(?:in|within)\s+(?:\d+|a|one|two|three|four|five|six|a few)\s+(?:days?|weeks?|months?)\b/i,
  },
  {
    rule: 'automatic migration claim',
    pattern:
      /\bautomatic(?:ally)?\s+(?:data\s+)?migrat\w*|\bmigrat\w*\s+(?:is\s+|are\s+)?(?:done\s+|handled\s+)?automatically\b|(?<!\bno\s)\bone[- ]click\s+(?:migration|import|setup)\b/i,
  },
  {
    rule: 'any plan claim',
    pattern:
      /\bany\s+(?:kind\s+of\s+|type\s+of\s+)?(?:MLM\s+)?compensation plans?\b|\b(?:handles?|runs?|fits?|works with|configures?|implements?|builds?)\s+(?:every|all|any)\s+(?:kinds?\s+of\s+|types?\s+of\s+)?(?:MLM\s+)?(?:compensation\s+)?plans?\b/i,
  },
  {
    rule: 'integration claim',
    pattern:
      /\bfully[- ]integrated\b|\bintegrates?\s+(?:with\s+)?(?:everything|any system|all (?:your\s+)?systems)\b|\bplug[- ]and[- ]play\b|\bout[- ]of[- ]the[- ]box\s+integrations?\b/i,
  },
  {
    rule: 'integration availability claim',
    pattern:
      /\bintegrat(?:es?|ed)\s+with\s+(?:all|every|any|most)\b|\b(?:ready[- ]made|pre[- ]?built)\s+(?:integrations?|connectors?)\b|\bone[- ]click\s+(?:integrations?|connect\w*)\b|\bsupported\s+(?:payment\s+gateways?|couriers?|banks?|providers?|e-?wallets?|marketplaces?)\b|\bsupports?\s+(?:all|every|any|most)\s+(?:(?:the\s+)?major\s+)?(?:payment\s+gateways?|couriers?|banks?|providers?|e-?wallets?|marketplaces?)\b|\ball\s+(?:the\s+)?major\s+(?:payment\s+gateways?|couriers?|banks?|providers?|e-?wallets?|marketplaces?)\b|\bnative(?:ly)?\s+integrat\w*|\bnative\s+connectors?\b|\bconnects?\s+(?:to|with)\s+(?:any|every|all)\b/i,
  },
  {
    rule: 'support promise',
    pattern:
      /\b24\s*\/\s*7\b|\b24x7\b|\b(?:round|around)[- ]the[- ]clock\b|\bunlimited\s+(?:support|revisions|changes|training)\b|\bdedicated\s+(?:account|project|success|implementation|support)\s+manager\b|\b(?:support|uptime|response[- ]time)\s+SLA\b|\bSLA[- ](?:backed|guaranteed)\b/i,
  },

  /* ---- growth services (docs/services-marketing-strategy.md) ---- */
  {
    rule: 'marketing guarantee',
    pattern:
      /\bguarantee[sd]?\s+(?:more\s+|new\s+|real\s+)?(?:followers?|likes|engagement|leads?|sales|traffic|conversions?|ROAS|ROI|results?|rankings?|positions?|reach|views|virality)\b|\b(?:followers?|leads?|sales|traffic|ROAS|ROI|rankings?|results?)\s+(?:is\s+|are\s+)?guaranteed\b|\bpage one\b|\bfirst page of google\b|(?:#|\bnumber\s*)1\s+(?:on|in)\s+google\b|\b(?:go|goes|going|content that goes)\s+viral\b|\bviral\s+(?:content|posts?|videos?)\b|\bROAS\s+(?:of\s+)?\d|\b\d+(?:\.\d+)?x\s+ROAS\b|\+\d+%\s+(?:sales|leads|traffic|followers|revenue)\b/i,
  },
  {
    rule: 'platform partner claim',
    pattern:
      /\b(?:official|certified|premier|verified)\s+(?:Meta|Facebook|Google|TikTok|Instagram)\s+(?:partners?|agency)\b|\b(?:Meta|Facebook|Google|TikTok)\s+(?:business\s+)?partner\b/i,
  },
  {
    rule: 'branding guarantee',
    pattern:
      /\bguarantee[sd]?\s+(?:brand\s+)?(?:recognition|awareness|trademark)|\b(?:trademark|brand recognition)\s+(?:is\s+)?guaranteed\b|\btrademark registration included\b/i,
  },
  {
    rule: 'maklon claim',
    pattern:
      /\bcertified\s+(?:factory|manufacturer|production|facility)\b|\b(?:BPOM|Halal|GMP|ISO|HACCP)(?:\s+(?:and|&)\s+(?:BPOM|Halal|GMP|ISO|HACCP))?\s+(?:included|guaranteed|certified|registered|approved)\b|\bguaranteed\s+(?:approval|registration)\b|\bany\s+(?:kind\s+of\s+)?product\b|\bunlimited\s+(?:capacity|production|volume)\b|\bfastest\s+(?:production|manufacturing|turnaround)\b|\bour\s+(?:own\s+)?factory\b/i,
  },

  /* ---- Bahasa Indonesia: the same claims, as they are written in Indonesian ---- */
  {
    rule: 'unproven quality (id)',
    pattern: new RegExp(
      String.raw`\b(?:waktu nyata|tanpa batas|kelas enterprise|standar enterprise|setara (?:bank|enterprise)|standar perbankan|dijamin|bersertifikat|sepenuhnya otomatis|serba otomatis|100% otomatis|pasti akurat)\b`,
      'i'
    ),
  },
  {
    rule: 'security guarantee claim (id)',
    pattern:
      /\btidak (?:bisa|dapat) (?:di)?retas\b|\banti[- ]?(?:retas|hack)\b|\bkebal (?:terhadap )?(?:peretasan|serangan|hack)\b|\bterenkripsi (?:penuh|sepenuhnya|seluruhnya|100%)|\bsepenuhnya terenkripsi\b|\bterenkripsi (?:saat|ketika) disimpan\b|\b(?:bersertifikat|tersertifikasi) (?:SOC ?2|ISO ?27001|PCI[- ]DSS)\b|\b(?:SOC ?2|ISO ?27001|PCI[- ]DSS) (?:bersertifikat|tersertifikasi)\b|\b(?:patuh|sesuai|memenuhi) (?:standar |ketentuan )?(?:GDPR|UU PDP|PDPA)\b|\buptime (?:dijamin|terjamin|100%)|\bjaminan uptime\b|\b(?:tanpa|nol|zero) kehilangan data\b|\bdata (?:tidak akan|tak akan|tidak pernah) hilang\b|\btahan bencana\b|\bkeamanan (?:anti peluru|tingkat (?:bank|militer|enterprise))\b|\b100% aman\b|\baman sepenuhnya\b|\bsepenuhnya aman\b/i,
  },
  {
    rule: 'security claim (id)',
    pattern: new RegExp(
      String.raw`\b(?:mlmsoft|sistem|platform|data|transaksi|aplikasi)\s+(?:\w+\s+){0,2}(?:sudah\s+|pasti\s+|dijamin\s+|100%\s+|sangat\s+|sepenuhnya\s+)aman\b|\bkeamanan\s+(?:tingkat|kelas|setara)\s+(?:bank|enterprise|militer)\b`,
      'i'
    ),
  },
  {
    rule: 'availability claim (id)',
    pattern: new RegExp(
      String.raw`\b(?:mlmsoft|platform|sistem|software|aplikasi|engine)\s+(?:kami\s+)?(?:sudah\s+|telah\s+|kini\s+|otomatis\s+|secara otomatis\s+)?(?:mendukung|menyediakan|dilengkapi|menghitung|mengelola|memproses|membayar|mencairkan|memotong|mengotomatiskan|mengirim|melacak|mencatat)\b`,
      'i'
    ),
  },
  {
    rule: 'automation claim (id)',
    pattern: new RegExp(
      String.raw`\b(?:bonus|komisi|payout|pajak|wallet|saldo|penarikan|pencairan|order|rank)\s+(?:\w+\s+){0,3}(?:dihitung|dibayarkan|dicairkan|diproses|dipotong|dibalik|dicatat|dikirim|diperbarui|disetujui)\s+(?:secara\s+)?otomatis\b|\botomatis\s+(?:menghitung|membayar|mencairkan|memotong|memproses|mengirim|membalik)\b`,
      'i'
    ),
  },
  {
    rule: 'plan support claim (id)',
    pattern: new RegExp(
      String.raw`\bmendukung\s+(?:binary|unilevel|matrix|generation|hybrid|stairstep)\b|\b(?:mendukung|terintegrasi\s+dengan|terhubung\s+(?:ke|dengan))\s+(?:semua|seluruh|segala|berbagai|setiap)\b`,
      'i'
    ),
  },
  {
    rule: 'built-in claim (id)',
    pattern: /\b(?:fitur\s+)?bawaan\b|\bsudah\s+termasuk\b|\bsiap\s+pakai\b/i,
  },
  {
    rule: 'availability wording (id)',
    pattern:
      /\b(?:sudah|kini|telah)\s+(?:tersedia|terintegrasi|terhubung|aktif)\b|\btersedia\s+(?:sekarang|hari ini|saat ini)\b/i,
  },
  {
    rule: 'technical capability claim (id)',
    pattern: new RegExp(
      String.raw`\b(?:dilengkapi|mendukung|menyediakan|memiliki|punya|sudah ada)\s+(?:dengan\s+)?(?:fitur\s+)?(?:SSO|single sign-on|2FA|autentikasi dua faktor|enkripsi|disaster recovery|multi-tenan\w*|(?:REST |public |open )?API|webhook)\b`,
      'i'
    ),
  },
  {
    rule: 'market fit as capability (id)',
    pattern:
      /\b(?:dirancang|dibuat|dibangun|disesuaikan)\s+(?:khusus\s+)?(?:untuk|bagi)\s+(?:\w+\s+){0,2}Indonesia\b/i,
  },
  {
    rule: 'implementation promise (id)',
    pattern:
      /\b(?:jaminan|menjamin|dijamin|pasti)\s+(?:\S+\s+){0,2}?(?:go-live|peluncuran|migrasi|timeline|selesai|berhasil|lancar|tepat waktu)\b|\b(?:mulus|tanpa hambatan|tanpa kendala|tanpa ribet|tanpa repot)\b|\b(?:zero downtime|tanpa downtime|tanpa gangguan layanan|tanpa henti)\b|\b(?:implementasi|go-live|migrasi|setup|onboarding)\s+(?:secara\s+)?(?:instan|seketika|kilat)\b|\b(?:langsung|instan)\s+(?:go-live|jalan|live)\b/i,
  },
  {
    rule: 'timeline promise (id)',
    pattern:
      /\b(?:go-live|live|selesai|rampung|diimplementasikan|dimigrasikan|berjalan|siap)\s+(?:hanya\s+)?dalam\s+(?:\d+|satu|dua|tiga|empat|lima|enam|beberapa)\s+(?:hari|minggu|bulan)\b/i,
  },
  {
    rule: 'automatic migration claim (id)',
    pattern:
      /\bmigrasi\s+(?:data\s+)?(?:secara\s+)?otomatis\b|\b(?:otomatis|langsung)\s+(?:memigrasikan|mengimpor|memindahkan)\b|\bimpor\s+(?:data\s+)?otomatis\b|(?<!\btidak ada\s(?:migrasi\s)?)\bsekali\s+klik\b/i,
  },
  {
    rule: 'any plan claim (id)',
    pattern:
      /\b(?:semua|segala|apa pun|apapun)\s+(?:jenis\s+|bentuk\s+|tipe\s+|model\s+)?(?:compensation plan|plan kompensasi|marketing plan|skema bonus)\b/i,
  },
  {
    rule: 'integration claim (id)',
    pattern:
      /\bterintegrasi\s+(?:penuh|sepenuhnya|menyeluruh)\b|\bterintegrasi\s+dengan\s+(?:apa pun|apapun)\b|\bplug[- ]and[- ]play\b/i,
  },
  {
    rule: 'integration availability claim (id)',
    pattern:
      /\btinggal\s+(?:sambung\w*|hubung\w*|pasang|colok|aktifkan)\b|\bsemua\s+(?:payment gateway|ekspedisi|kurir|bank|provider|e-?wallet|marketplace)\b|\b(?:integrasi|konektor)\s+(?:bawaan|siap pakai|instan|otomatis)\b|\blangsung\s+terhubung\s+(?:ke|dengan)\b|\bmendukung\s+(?:semua|seluruh|berbagai)\s+(?:payment gateway|ekspedisi|kurir|bank|provider|e-?wallet|marketplace)\b/i,
  },
  {
    rule: 'support promise (id)',
    pattern:
      /\b24\s*\/\s*7\b|\b(?:support|dukungan|layanan|bantuan)\s+(?:\S+\s+)?(?:24\s*jam|nonstop|tanpa henti|tanpa batas|tak terbatas|tidak terbatas|sepuasnya)\b|\b(?:account|project)\s+manager\s+(?:khusus|dedicated)\b|\bmanajer\s+(?:akun|proyek)\s+(?:khusus|tersendiri)\b|\bSLA\s+(?:support|dukungan|respons)\b/i,
  },
  {
    rule: 'marketing guarantee (id)',
    pattern:
      /\b(?:jaminan|dijamin|menjamin|pasti)\s+(?:\S+\s+){0,2}?(?:follower|pengikut|like|engagement|leads?|penjualan|omzet|traffic|trafik|ROAS|ROI|peringkat|ranking|posisi|viral)\b|\b(?:follower|pengikut|leads?|penjualan|omzet|traffic|ROAS|ROI|peringkat|ranking)\s+(?:\S+\s+){0,2}?(?:dijamin|pasti naik|pasti bertambah)\b|\bhalaman (?:pertama|satu) google\b|\bperingkat (?:1|satu|pertama) (?:di )?google\b|\bpasti viral\b|\bkonten viral\b/i,
  },
  {
    rule: 'platform partner claim (id)',
    pattern:
      /\b(?:partner|mitra)\s+(?:resmi\s+)?(?:Meta|Facebook|Google|TikTok|Instagram)\b|\b(?:Meta|Facebook|Google|TikTok)\s+(?:partner|mitra)\s+resmi\b/i,
  },
  {
    rule: 'branding guarantee (id)',
    pattern:
      /\b(?:jaminan|dijamin|menjamin)\s+(?:\S+\s+){0,2}?(?:dikenal|dikenali|terkenal|merek terdaftar|pendaftaran merek)\b|\bpendaftaran merek\s+(?:sudah\s+)?termasuk\b/i,
  },
  {
    rule: 'maklon claim (id)',
    pattern:
      /\b(?:pabrik|fasilitas produksi)\s+(?:\S+\s+){0,2}?(?:bersertifikat|tersertifikasi)\b|\b(?:BPOM|Halal|GMP|ISO|HACCP)(?:\s+(?:dan|&)\s+(?:BPOM|Halal|GMP|ISO|HACCP))?\s+(?:sudah\s+)?(?:termasuk|dijamin|terjamin|pasti)\b|\b(?:izin|registrasi|sertifikasi)\s+(?:\S+\s+){0,2}?(?:dijamin|pasti disetujui|pasti keluar)\b|\bsegala\s+jenis\s+produk\b|\bproduk\s+apa\s+pun\b|\bkapasitas\s+(?:tanpa batas|tak terbatas|tidak terbatas)\b|\bproduksi\s+(?:tercepat|paling cepat)\b|\bpabrik\s+(?:kami|sendiri)\b/i,
  },
  {
    rule: 'direct builder access promise (id)',
    pattern:
      /\b(?:tim|orang)\s+yang\s+membangun(?:nya)?\b|\b(?:bicara|berbicara|ngobrol|diskusi|berdiskusi)\s+(?:langsung\s+)?dengan\s+(?:para\s+)?(?:engineer|developer|programmer|pembuat(?:nya)?|tim teknis)\b/i,
  },
]

export type ClaimViolation = { rule: string; match: string; line: number }

/**
 * Only the copy a visitor reads: drop styles and comments.
 */
export function visibleCopy(source: string) {
  return source
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (block) => block.replace(/[^\n]/g, ' '))
    .replace(/^\s*\/\/.*$/gm, '')
}

export function findClaimViolations(text: string): ClaimViolation[] {
  const violations: ClaimViolation[] = []
  text.split('\n').forEach((line, index) => {
    for (const { rule, pattern } of CLAIM_RULES) {
      const match = line.match(pattern)
      if (match) violations.push({ rule, match: match[0], line: index + 1 })
    }
  })
  return violations
}

/**
 * Every file whose copy reaches a visitor on the public marketing site.
 * A page component for a new marketing route must be listed here (the
 * functional tests check that every route's page is).
 */
export async function auditedFiles() {
  const inDir = async (directory: string, extension: string) => {
    const names = await readdir(app.makePath(directory)).catch(() => [] as string[])
    return names.filter((name) => name.endsWith(extension)).map((name) => `${directory}/${name}`)
  }

  return [
    ...(await inDir('inertia/components/home', '.vue')),
    ...(await inDir('inertia/components/site', '.vue')),
    ...(await inDir('inertia/components/compensation', '.vue')),
    ...(await inDir('inertia/components/pricing', '.vue')),
    ...(await inDir('inertia/components/who_we_serve', '.vue')),
    ...(await inDir('inertia/components/who_we_serve/concepts', '.vue')),
    ...(await inDir('inertia/components/features', '.vue')),
    ...(await inDir('inertia/components/features/concepts', '.vue')),
    ...(await inDir('inertia/components/implementation', '.vue')),
    ...(await inDir('inertia/components/services', '.vue')),
    ...(await inDir('inertia/components/services/concepts', '.vue')),
    ...(await inDir('inertia/pages/services', '.vue')),
    ...(await inDir('inertia/components/integrations', '.vue')),
    ...(await inDir('inertia/components/security', '.vue')),
    ...(await inDir('inertia/components/legal', '.vue')),
    ...(await inDir('inertia/pages/legal', '.vue')),
    ...(await inDir('inertia/content', '.ts')),
    ...(await inDir('inertia/i18n/en', '.ts')),
    ...(await inDir('inertia/i18n/id', '.ts')),
    ...(await inDir('app/i18n', '.ts')),
    ...(await inDir('inertia/pages/who_we_serve', '.vue')),
    ...(await inDir('inertia/pages/features', '.vue')),
    'inertia/pages/home.vue',
    'inertia/pages/compensation_plans.vue',
    'inertia/pages/pricing.vue',
    'inertia/pages/how_we_do_it.vue',
    'inertia/pages/integrations.vue',
    'inertia/pages/security.vue',
    'config/leads.ts',
    'config/seo.ts',
    'config/marketing.ts',
    'shared/personas.ts',
    'shared/features.ts',
    'shared/implementation.ts',
    'shared/services.ts',
    'shared/integrations.ts',
    'shared/security.ts',
    'shared/brand.ts',
    'inertia/pages/marketing_not_found.vue',
  ]
}
