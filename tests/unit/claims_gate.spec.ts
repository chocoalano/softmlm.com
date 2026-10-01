import { test } from '@japa/runner'
import { readFile, readdir } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import { auditedFiles, findClaimViolations, visibleCopy } from '#tests/support/claims'

/**
 * Price amounts or plan prices the business has not decided on.
 */
const PRICE =
  /\bRp\s?\d|\bIDR\s?\d|\d+\s?(?:jt|juta|rb|ribu)\b|\/\s?(?:month|bulan|mo)\b|\bper (?:month|member|bulan|tahun)\b|\bmulai dari rp/i

test.group('Claims gate', () => {
  test('the pricing funnel shows no price, in either language', async ({ assert }) => {
    const pricingComponents = await readdir(app.makePath('inertia/components/pricing'))
    const files = [
      'inertia/pages/pricing.vue',
      'inertia/content/pricing.ts',
      ...pricingComponents.map((name) => `inertia/components/pricing/${name}`),
      'inertia/components/home/pricing_quote.vue',
      // the copy of those pages, in both languages
      'inertia/i18n/en/pricing.ts',
      'inertia/i18n/id/pricing.ts',
      'inertia/i18n/en/home_closing.ts',
      'inertia/i18n/id/home_closing.ts',
    ]
    const offenders: string[] = []
    for (const file of files) {
      visibleCopy(await readFile(app.makePath(file), 'utf8'))
        .split('\n')
        .forEach((line, index) => {
          const match = line.match(PRICE)
          if (match) offenders.push(`${file}:${index + 1} "${match[0]}"`)
        })
    }
    assert.deepEqual(offenders, [])
  })

  test('flags copy that presents unverified capabilities as available', ({ assert }) => {
    for (const claim of [
      'mlmsoft automatically manages wallet payouts.',
      'Our automated commission engine calculates every bonus in real time.',
      'The platform supports binary, unilevel and matrix plans.',
      'Bonuses are reversed automatically when an order is refunded.',
      'Enterprise-grade security with SSO built in.',
      'Your member data is fully secure.',
      'Supported plan types: binary, unilevel',
      'The mobile app is available today.',
      'Designed for Indonesian direct selling',
      'Talk directly with the team that builds it',
      'Talk to our engineers about your integration.',
      'Talk to our technical team',
      'Member, commerce and finance data, connected in real time.',
      'mlmsoft includes SSO and 2FA for every staff account.',
      'The platform has a REST API and webhooks.',
      'Webhooks are available for every event.',
      'Built on a horizontally scalable, multi-tenant architecture.',
      'mlmsoft supports every compensation plan.',
      'We support all kinds of bonus structures.',
      'Supports any MLM plan.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows solution and discussion wording', ({ assert }) => {
    for (const copy of [
      'Discuss the wallet and payout needs of your business.',
      'We help you map your bonus scheme, qualifications, ranks and payouts.',
      'Designed for configurable commission architectures.',
      'Tell us which payment gateway you use today.',
      'Common compensation architectures we can discuss',
      'Every rule change should take effect from a date.',
      'For MLM and direct selling businesses in Indonesia',
      'Talk with our team about your business',
      'Who needs access, and at what level?',
      'Should staff sign in with company accounts?',
      'What external systems need to exchange data?',
      'Plan integrations, access controls and technical requirements before implementation.',
      'We tell you what is in place today and what would need to be built.',
      'A distributor should not need to ask support every time they want to understand their activity.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('flags Indonesian copy that presents unverified capabilities as available', ({ assert }) => {
    for (const claim of [
      'mlmsoft sudah terintegrasi dengan semua payment gateway.',
      'Bonus dihitung secara otomatis setiap hari.',
      'Sistem kami otomatis menghitung komisi setiap malam.',
      'Platform mendukung semua jenis compensation plan.',
      'Data member Anda dijamin aman.',
      'Keamanan kelas enterprise untuk setiap transaksi.',
      'Dashboard real-time untuk owner.',
      'Laporan dalam waktu nyata.',
      'Jumlah member tanpa batas.',
      'Aplikasi member kini tersedia.',
      'mlmsoft dilengkapi SSO dan 2FA.',
      'Sistem menyediakan API dan webhook.',
      'Dirancang khusus untuk direct selling Indonesia.',
      'Bicara langsung dengan developer kami.',
      'Diskusi dengan tim teknis kami',
      'Fitur bawaan untuk pajak bonus.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows Indonesian discussion and solution wording', ({ assert }) => {
    for (const copy of [
      'Diskusikan kebutuhan integrasi bisnis Anda.',
      'Kami membantu memetakan bonus, kualifikasi, rank dan payout Anda.',
      'Sistem bonus harus mengikuti cara bisnis Anda berjalan.',
      'Siapa saja yang membutuhkan akses, dan sampai level apa?',
      'Untuk bisnis MLM dan direct selling di Indonesia',
      'Hubungi tim kami untuk membahas bisnis Anda.',
      'Kami sampaikan apa yang sudah ada saat ini dan apa yang perlu dibangun.',
      'Payment gateway mana yang Anda gunakan saat ini?',
      'Distributor tidak perlu selalu bertanya ke tim support.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('flags implementation promises, in both languages', ({ assert }) => {
    for (const claim of [
      // guaranteed launch / migration
      'We guarantee your launch date.',
      'Guaranteed migration of all your data.',
      'Your go-live is guaranteed.',
      // any compensation plan
      'We can implement any compensation plan.',
      'mlmsoft handles every kind of compensation plan.',
      // seamless migration, zero downtime, instant implementation
      'A seamless migration from your current system.',
      'Switch with zero downtime.',
      'Move to mlmsoft without any downtime.',
      'Instant implementation, no waiting.',
      'Go live in 2 weeks.',
      'Up and running within a few days.',
      // automatic migration
      'Automatic migration from any MLM system.',
      'Your data is migrated automatically.',
      'One-click migration from spreadsheets.',
      // support and integration promises
      '24/7 support for every client.',
      'Unlimited support after launch.',
      'A dedicated project manager for every implementation.',
      'Support SLA included.',
      'A fully integrated MLM platform.',
      'Plug-and-play integrations.',
      // Bahasa Indonesia
      'Kami menjamin go-live tepat waktu.',
      'Migrasi dijamin berhasil.',
      'Migrasi data mulus tanpa hambatan.',
      'Pindah sistem tanpa downtime.',
      'Implementasi instan.',
      'Sistem siap go-live dalam 2 minggu.',
      'Migrasi otomatis dari sistem lama Anda.',
      'Impor data sekali klik.',
      'Bisa untuk semua jenis compensation plan.',
      'Support 24/7 untuk setiap klien.',
      'Dukungan tanpa batas setelah go-live.',
      'Sistem terintegrasi penuh.',
      'Project manager khusus untuk setiap klien.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows the implementation process wording, in both languages', ({ assert }) => {
    for (const copy of [
      'Migration scope depends on the source system, data quality, and agreed implementation requirements.',
      'Post-launch support scope is agreed as part of the implementation and commercial arrangement.',
      'Training scope is defined based on the roles involved in the implementation.',
      'There is no single timeline that fits every project.',
      'Moving a live compensation plan is a careful, manual process. There is no one-click migration.',
      'Move the data that matters—without treating migration as an afterthought.',
      'Potential integration areas',
      'Each integration is assessed per project.',
      'Go live with a clear transition plan.',
      'Fallback and escalation paths',
      'Cakupan migrasi bergantung pada sistem sumber, kualitas data, dan kebutuhan implementasi yang disepakati.',
      'Cakupan support setelah go-live disepakati sebagai bagian dari implementasi dan kesepakatan komersial.',
      'Tidak ada satu timeline yang cocok untuk semua proyek.',
      'Apa pun jenis plan Anda, kami menguraikannya dengan cara yang sama.',
      'Go-live dengan rencana transisi yang jelas.',
      'Area integrasi yang mungkin',
      'Tidak ada migrasi sekali klik, dan kami tidak akan berpura-pura ada.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('flags marketing, branding and maklon promises, in both languages', ({ assert }) => {
    for (const claim of [
      // marketing guarantees
      'We guarantee more followers every month.',
      'Guaranteed leads from every campaign.',
      'Sales are guaranteed.',
      'Page one guaranteed.',
      'Rank #1 on Google.',
      'Content that goes viral.',
      'ROAS 8.7x on every campaign.',
      '+428% sales after three months.',
      'An official Meta partner agency.',
      // branding
      'We guarantee brand recognition.',
      'Trademark registration included.',
      // maklon
      'Produced in a certified factory.',
      'BPOM included.',
      'Halal and BPOM guaranteed.',
      'Guaranteed approval for your product.',
      'We can make any product.',
      'Unlimited capacity.',
      'The fastest production in Indonesia.',
      'Made in our own factory.',
      // Bahasa Indonesia
      'Follower dijamin bertambah setiap bulan.',
      'Jaminan penjualan naik.',
      'Pasti viral.',
      'Halaman pertama Google.',
      'Partner resmi Meta.',
      'Jaminan brand dikenal luas.',
      'Pabrik kami bersertifikat.',
      'BPOM sudah termasuk.',
      'Izin edar dijamin keluar.',
      'Bisa untuk produk apa pun.',
      'Kapasitas produksi tanpa batas.',
      'Produksi tercepat.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows service offering and process wording, in both languages', ({ assert }) => {
    for (const copy of [
      'Build a consistent social presence without managing every post internally.',
      'Positions depend on competition, time and changes by the search engines.',
      'Results depend on your product, market, budget and competition.',
      'Areas we can discuss during product discovery.',
      'Regulatory requirements are discussed during product discovery.',
      'Minimum quantities and prices depend on the product and are agreed per project.',
      'Example creative direction',
      'Pricing depends on scope.',
      'Tampil konsisten di media sosial tanpa harus mengurus setiap unggahan sendiri.',
      'Area yang bisa didiskusikan saat product discovery.',
      'Kebutuhan regulasi dibahas saat product discovery.',
      'Harga mengikuti cakupan pekerjaan.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('flags integration promises, in both languages', ({ assert }) => {
    for (const claim of [
      'Integrates with all major payment gateways.',
      'mlmsoft integrates with every courier.',
      'Ready-made integrations for your accounting system.',
      'Pre-built connectors for every bank.',
      'Plug and play connectors.',
      'One-click integration with your ERP.',
      'Built-in payment gateway integration.',
      'Supported payment gateways: all of them.',
      'Supports all major couriers.',
      'Works with all major e-wallets.',
      'Native integration with your warehouse system.',
      'Seamless integration with any system.',
      'Connects to any system you use.',
      'Our platform includes a REST API and webhooks.',
      // Bahasa Indonesia
      'Terintegrasi dengan semua payment gateway.',
      'Integrasi siap pakai untuk akuntansi.',
      'Tinggal sambungkan ke sistem Anda.',
      'Integrasi sekali klik.',
      'Mendukung semua ekspedisi.',
      'Integrasi bawaan untuk pembayaran.',
      'Langsung terhubung ke sistem Anda.',
      'Sistem kami sudah terintegrasi dengan bank.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows integration discovery wording, in both languages', ({ assert }) => {
    for (const copy of [
      'The exact integration method depends on the systems, providers and technical access available in your project.',
      'Common integration areas we discuss',
      'Who issues the API credentials?',
      'Is there an API or documentation for the system?',
      'What if our system has no API?',
      'Communication channels are reviewed during integration discovery.',
      'Information is sent or received as soon as something happens, or very shortly after.',
      'Integration availability depends on the provider and project requirements.',
      'Metode integrasi ditentukan berdasarkan sistem, provider, dan akses teknis yang tersedia pada proyek Anda.',
      'Area integrasi yang umum kami bahas',
      'Apakah ada API atau dokumentasi untuk sistem tersebut?',
      'Bagaimana jika sistem kami tidak bisa diakses lewat API?',
      'Kanal komunikasi ditinjau saat discovery integrasi.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('flags security promises, in both languages', ({ assert }) => {
    for (const claim of [
      'Enterprise-grade security for your business.',
      'Bank-grade protection for every member.',
      'Military-grade security, built in.',
      'Your data is fully secure.',
      'An unhackable platform.',
      'Fully encrypted from end to end.',
      'All member data is encrypted at rest.',
      'mlmsoft is SOC 2 certified.',
      'ISO 27001 certified hosting.',
      'GDPR compliant by design.',
      'Guaranteed uptime for your network.',
      'Zero data loss, always.',
      'A disaster-proof infrastructure.',
      'Bulletproof security for your payouts.',
      'Our platform includes SSO and 2FA.',
      'Disaster recovery is included.',
      // Bahasa Indonesia
      'Keamanan kelas enterprise untuk bisnis Anda.',
      'Keamanan setara bank untuk setiap member.',
      'Keamanan tingkat militer.',
      'Data Anda sepenuhnya aman.',
      'Sistem yang tidak bisa diretas.',
      'Data terenkripsi sepenuhnya.',
      'Data member terenkripsi saat disimpan.',
      'mlmsoft bersertifikat ISO 27001.',
      'Platform yang patuh GDPR.',
      'Uptime dijamin untuk jaringan Anda.',
      'Tanpa kehilangan data.',
      'Infrastruktur tahan bencana.',
      'Sistem kami sudah mendukung SSO.',
    ]) {
      assert.isNotEmpty(findClaimViolations(claim), claim)
    }
  })

  test('allows security discovery wording, in both languages', ({ assert }) => {
    for (const copy of [
      'Security requirements should be clear before implementation.',
      'SSO requirements can be assessed during technical discovery.',
      'It should not be assumed to be available until the selected identity provider and implementation scope are confirmed.',
      'Transport and storage controls depend on the final deployment architecture.',
      'Backup and recovery requirements are defined as part of the production infrastructure plan.',
      'mlmsoft does not hold a security certification such as ISO 27001 or SOC 2, and we do not claim one.',
      'If your organisation has regulatory or compliance requirements, include them during discovery.',
      'Infrastructure controls are confirmed as part of the deployment architecture.',
      'Kebutuhan keamanan perlu jelas sejak awal implementasi.',
      'Kebutuhan SSO dapat dinilai saat technical discovery.',
      'mlmsoft tidak memiliki sertifikasi keamanan seperti ISO 27001 atau SOC 2, dan kami tidak mengklaimnya.',
      'Jika organisasi Anda memiliki persyaratan regulasi atau kepatuhan, sertakan saat discovery.',
      'Persyaratan backup dan pemulihan ditetapkan sebagai bagian dari rencana infrastruktur production.',
    ]) {
      assert.isEmpty(findClaimViolations(copy), copy)
    }
  })

  test('the marketing funnel passes the evidence gate', async ({ assert }) => {
    const offenders: string[] = []
    for (const file of await auditedFiles()) {
      let source: string
      try {
        source = await readFile(app.makePath(file), 'utf8')
      } catch {
        continue
      }
      for (const v of findClaimViolations(visibleCopy(source))) {
        offenders.push(`${file}:${v.line} [${v.rule}] "${v.match}"`)
      }
    }
    assert.deepEqual(offenders, [])
  })
})
