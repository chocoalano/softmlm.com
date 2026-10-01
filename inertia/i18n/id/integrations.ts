import type en from '../en/integrations'

/**
 * Copy area: integrations (Bahasa Indonesia). /id/integrations.
 * Istilah teknis yang lazim (API, webhook, sandbox, payment) tetap
 * dipakai; kalimat di sekitarnya ditulis dalam bahasa Indonesia.
 */
const integrations: typeof en = {
  hero: {
    eyebrow: 'Integrasi',
    title: 'Bisnis Anda tidak dimulai',
    highlight: 'dari sistem yang kosong.',
    lead: 'Pembayaran, logistik, finance, messaging dan sistem internal mungkin sudah menjadi bagian dari operasional Anda setiap hari. Kami memetakan data apa saja yang perlu terhubung sebelum menentukan bagaimana integrasinya perlu dibangun.',
    cta: 'Diskusikan Kebutuhan Integrasi',
    secondary: 'Ajukan Konsultasi Integrasi',
  },

  map: {
    caption: 'Konsep arsitektur integrasi',
    centre: 'Sistem MLM Anda',
    centreText: 'Member, order, komisi',
    nodes: {
      payments: 'Payment',
      banking: 'Bank & payout',
      logistics: 'Logistik',
      finance: 'Finance',
      messaging: 'Messaging',
      systems: 'Sistem yang sudah ada',
    },
    description:
      'Sistem MLM di tengah, dikelilingi payment, bank dan payout, logistik, finance, messaging serta sistem yang sudah Anda gunakan. Konsep data apa saja yang mungkin perlu dipertukarkan, bukan daftar konektor yang sudah ada.',
  },

  problem: {
    eyebrow: 'Mengapa integrasi perlu dirancang',
    title: 'Tantangannya bukan sekadar menghubungkan dua API.',
    lead: 'Dua sistem bisa saling bertukar data, tetapi tetap tidak sepakat. Sebagian besar masalah integrasi berasal dari pertanyaan yang belum dijawab sebelum pembangunan dimulai.',
    items: [
      {
        title: 'Sumber data utama yang berbeda',
        text: 'Sistem mana yang menjadi pemilik data member, order, pembayaran atau stok ketika keduanya menyimpan salinan?',
      },
      {
        title: 'Identitas data yang berbeda',
        text: 'Pelanggan atau order yang sama bisa memakai ID berbeda di setiap sistem.',
      },
      {
        title: 'Waktu yang berbeda',
        text: 'Satu sistem langsung diperbarui, sistem lain baru memproses perubahan belakangan secara berkala.',
      },
      {
        title: 'Penanganan kegagalan',
        text: 'Apa yang terjadi ketika satu sisi berhasil, tetapi sisi lainnya gagal?',
      },
      {
        title: 'Rekonsiliasi',
        text: 'Bagaimana tim finance tahu bahwa kedua sistem sudah sesuai di akhir periode?',
      },
    ],
  },

  areas: {
    eyebrow: 'Area integrasi',
    title: 'Area integrasi yang umum kami bahas',
    lead: 'Sebagian besar bisnis MLM dan direct selling sudah menjalankan beberapa di antaranya. Masing-masing ditinjau berdasarkan alur kerja Anda, bukan diasumsikan.',
    items: {
      payments: {
        title: 'Pembayaran',
        text: 'Konfirmasi pembayaran dan status transaksi: bagaimana bisnis tahu sebuah order benar-benar sudah dibayar.',
      },
      banking: {
        title: 'Bank & Payout',
        text: 'Kebutuhan perbankan atau pencairan dana untuk penarikan dan payout member.',
      },
      logistics: {
        title: 'Logistik',
        text: 'Informasi pengiriman, ongkir dan status antar untuk order member maupun pelanggan.',
      },
      finance: {
        title: 'Akuntansi & Finance',
        text: 'Data keuangan yang dibutuhkan akuntansi Anda, dan cara kedua sisi direkonsiliasi.',
      },
      messaging: {
        title: 'Messaging',
        text: 'Notifikasi dan komunikasi dengan member serta pelanggan.',
      },
      systems: {
        title: 'Sistem yang Sudah Ada',
        text: 'ERP, CRM, gudang, POS atau software internal yang sudah Anda gunakan.',
      },
    },
    disclosure:
      'Metode integrasi ditentukan berdasarkan sistem, provider, dan akses teknis yang tersedia pada proyek Anda.',
    available: {
      title: 'Integrasi yang tersedia',
      lead: 'Konektor yang terverifikasi di mlmsoft. Selain itu, dinilai per proyek.',
      documentation: 'Dokumentasi',
    },
  },

  discovery: {
    eyebrow: 'Discovery integrasi',
    title: 'Kami mulai dari alur datanya.',
    lead: 'Sebelum memilih metode teknis, setiap koneksi dijelaskan dengan cara yang sama: data apa yang berpindah, siapa pemiliknya, kapan berpindah, dan apa yang terjadi jika data tidak sampai.',
    from: 'Sistem A',
    to: 'Sistem B',
    label: 'Pertanyaan untuk setiap alur data, dari Sistem A ke Sistem B',
    steps: [
      {
        title: 'Data apa?',
        text: 'Order, pembayaran, member, pengiriman: field apa saja yang perlu berpindah.',
      },
      {
        title: 'Siapa pemiliknya?',
        text: 'Sistem mana yang berhak membuat dan mengubah data tersebut.',
      },
      {
        title: 'Kapan berpindah?',
        text: 'Begitu sesuatu terjadi, sesuai jadwal, atau saat seseorang memutuskan.',
      },
      {
        title: 'Apa tanda berhasilnya?',
        text: 'Sinyal yang disepakati kedua sisi sebagai “selesai”.',
      },
      {
        title: 'Apa yang terjadi jika gagal?',
        text: 'Coba lagi, tunggu, beri tahu seseorang, atau hentikan untuk ditinjau.',
      },
    ],
  },

  truth: {
    eyebrow: 'Sumber data utama',
    title: 'Setiap data perlu punya pemilik yang jelas.',
    lead: 'Sebelum pengembangan, tim perlu sepakat sistem mana yang menjadi acuan utama untuk setiap jenis data. Kadang itu sistem MLM, kadang sistem lain yang sudah Anda jalankan.',
    domainLabel: 'Jenis data',
    ownerLabel: 'Sistem acuan',
    domains: [
      'Status order',
      'Status pembayaran',
      'Profil member',
      'Stok',
      'Konteks komisi',
      'Status pengiriman',
    ],
    unknown: 'Disepakati bersama',
    note: 'Disepakati bersama tim Anda saat discovery, tidak diasumsikan.',
  },

  examples: {
    eyebrow: 'Contoh',
    title: 'Yang perlu dipertimbangkan dalam desain integrasi.',
    lead: 'Contoh konseptual, bukan gambaran konektor yang sudah ada. Setiap contoh menunjukkan pertanyaan yang perlu dijawab sebelum sebuah alur bisa dibangun.',
    tabsLabel: 'Contoh integrasi',
    flowLabel: 'Contoh alur',
    questionsLabel: 'Pertanyaan yang perlu dijawab',
    payment: {
      tab: 'Pembayaran',
      title: 'Konfirmasi pembayaran',
      lead: 'Pelanggan membayar melalui payment provider eksternal; bisnis perlu tahu pembayarannya sah sebelum order diproses lebih lanjut.',
      steps: [
        'Pelanggan membuat order',
        'Payment provider memproses pembayaran',
        'Konfirmasi pembayaran diterima',
        'Status order dievaluasi',
        'Alur bisnis berlanjut',
      ],
      questions: [
        'Bagaimana keaslian konfirmasi pembayaran diverifikasi?',
        'Apa yang terjadi jika konfirmasi yang sama datang dua kali?',
        'Bagaimana jika konfirmasi datang terlambat, setelah order kedaluwarsa?',
        'Apa yang terjadi pada order, dan pada komisi, ketika pembayaran di-refund?',
      ],
    },
    logistics: {
      tab: 'Logistik',
      title: 'Sebuah pengiriman',
      lead: 'Order yang sudah dibayar perlu sampai ke member atau pelanggan, sering kali melalui kurir yang sudah bekerja sama dengan bisnis Anda.',
      steps: [
        'Order siap dikirim',
        'Pengiriman diminta',
        'Resi atau nomor referensi pengiriman dibuat',
        'Paket diserahkan ke kurir',
        'Status diperbarui',
        'Terkirim, atau ada kendala',
      ],
      questions: [
        'Siapa yang membuat pengiriman, dan dari sistem mana?',
        'Status pengiriman apa saja yang penting bagi tim dan member Anda?',
        'Apa yang terjadi jika pengiriman gagal atau dikembalikan?',
        'Sistem mana yang menjadi pemilik informasi pelacakan?',
      ],
    },
    finance: {
      tab: 'Finance',
      title: 'Sebuah catatan keuangan',
      lead: 'Penjualan, komisi dan payout pada akhirnya masuk ke pembukuan Anda. Tim finance perlu bisa memercayai angka di kedua sisi.',
      steps: [
        'Transaksi',
        'Kejadian bisnis',
        'Catatan keuangan',
        'Kebutuhan finance atau akuntansi eksternal',
        'Rekonsiliasi',
      ],
      questions: [
        'Kejadian bisnis apa saja yang menjadi catatan keuangan, dan kapan?',
        'Bagaimana penjualan, komisi dan kewajiban dipetakan ke bagan akun Anda?',
        'Total apa saja yang harus sesuai di setiap akhir periode?',
        'Siapa yang meninjau dan menyelesaikan selisih?',
      ],
    },
    messaging: {
      tab: 'Messaging',
      title: 'Tiga jenis komunikasi',
      lead: 'Pesan ke member dan pelanggan tidak semuanya sama. Setiap jenis punya aturannya sendiri.',
      kinds: [
        {
          title: 'Komunikasi marketing',
          text: 'Kampanye dan pengumuman. Perlu persetujuan penerima dan cara mudah untuk berhenti berlangganan.',
        },
        {
          title: 'Notifikasi transaksional',
          text: 'Kabar order, pembayaran atau payout yang dipicu suatu kejadian. Harus tepat waktu dan benar.',
        },
        {
          title: 'Percakapan support',
          text: 'Seseorang berbicara dengan tim Anda. Perlu riwayat dan penanggung jawab, bukan otomatisasi.',
        },
      ],
      channels:
        'Kanal yang mungkin dipakai antara lain email, WhatsApp dan SMS. Kanal komunikasi ditinjau saat discovery integrasi.',
      questions: [
        'Pesan mana yang termasuk marketing, transaksional, atau support?',
        'Siapa yang boleh menerima setiap jenis pesan, dan bagaimana persetujuannya dicatat?',
        'Kejadian apa yang memicu notifikasi, dan dalam bahasa apa?',
        'Siapa yang menjawab ketika member membalas?',
      ],
    },
  },

  patterns: {
    eyebrow: 'Pola integrasi',
    title: 'Pola integrasi yang umum dipertimbangkan saat merancang solusi.',
    lead: 'Pola yang cocok bergantung pada alur kerja dan pada apa yang diizinkan sistem lain. Satu proyek sering memakai lebih dari satu pola.',
    items: {
      immediate: {
        title: 'Langsung',
        text: 'Informasi dikirim atau diterima begitu sesuatu terjadi, atau sesaat setelahnya.',
      },
      scheduled: {
        title: 'Terjadwal',
        text: 'Data dipertukarkan pada waktu yang disepakati, misalnya setiap jam atau setiap malam.',
      },
      manual: {
        title: 'Impor / ekspor manual',
        text: 'Seseorang mengekspor dan mengimpor file jika otomatisasi tidak diperlukan atau tidak memungkinkan.',
      },
      event: {
        title: 'Berbasis kejadian',
        text: 'Satu sistem memberi tahu sistem lain ketika terjadi kejadian yang relevan, misalnya pembayaran atau perubahan status pengiriman.',
      },
    },
    plain: {
      title: 'Dalam bahasa sederhana',
      items: [
        {
          title: 'API',
          text: 'Memungkinkan dua sistem bertukar data melalui antarmuka yang disepakati.',
        },
        {
          title: 'Webhook',
          text: 'Pesan yang dikirim satu sistem ke sistem lain ketika sesuatu terjadi.',
        },
        {
          title: 'Sandbox',
          text: 'Lingkungan uji untuk mencoba integrasi tanpa transaksi sungguhan.',
        },
      ],
      note: 'Tidak satu pun menentukan siapa pemilik data, atau apa yang terjadi jika pesan hilang. Itu bagian dari desain.',
    },
  },

  approach: {
    eyebrow: 'Pendekatan',
    title: 'Sebagian integrasi cukup konfigurasi. Sebagian lain perlu pengembangan.',
    lead: 'Pendekatan yang tepat bergantung pada apa yang dibuka sistem eksternal dan seberapa penting alur tersebut bagi operasional Anda.',
    label: 'Dari kemampuan yang ada hingga batasan eksternal',
    steps: [
      {
        title: 'Kemampuan yang ada',
        text: 'Apa yang sudah bisa dilakukan sebuah sistem tanpa perubahan.',
      },
      { title: 'Konfigurasi', text: 'Pengaturan, pemetaan dan aturan, tanpa kode baru.' },
      {
        title: 'Integrasi custom',
        text: 'Pengembangan baru untuk koneksi yang dibutuhkan alur kerja Anda.',
      },
      {
        title: 'Batasan eksternal',
        text: 'Apa yang tidak diizinkan sistem lain, dan solusi alternatif yang disepakati.',
      },
    ],
  },

  ownership: {
    eyebrow: 'Tanggung jawab',
    title: 'Siapa yang bertanggung jawab atas setiap sisi integrasi?',
    lead: 'Integrasi biasanya melibatkan lebih dari satu tim. Menyepakati siapa mengerjakan apa adalah bagian dari desain, bukan urusan belakangan.',
    parties: [
      {
        title: 'Tim mlmsoft',
        text: 'Sisi sistem MLM: desain, pengembangan dan pengujian bagian kami.',
      },
      {
        title: 'Tim Anda',
        text: 'Aturan bisnis, persetujuan, serta sistem dan tim IT Anda sendiri.',
      },
      {
        title: 'Provider eksternal',
        text: 'Layanan yang dihubungkan: akses, dokumentasi dan aturan mereka sendiri.',
      },
      {
        title: 'Vendor pihak ketiga',
        text: 'Pihak yang membangun atau menjalankan sistem lain yang Anda gunakan, jika bukan tim Anda.',
      },
    ],
    questionsTitle: 'Disepakati sebelum pengembangan',
    questions: [
      'Ketersediaan API',
      'Kredensial, dan siapa yang menerbitkannya',
      'Sandbox atau lingkungan uji',
      'Dokumentasi',
      'Kebutuhan callback atau webhook',
      'Batas pemakaian (rate limit)',
      'Persyaratan persetujuan atau onboarding',
      'Dukungan vendor',
    ],
  },

  readiness: {
    eyebrow: 'Kesiapan integrasi',
    title: 'Apakah gambaran sistem Anda siap didiskusikan?',
    lead: 'Centang yang sudah sesuai. Tidak ada yang disimpan atau dikirim: ini daftar periksa untuk persiapan Anda sendiri.',
    label: 'Daftar periksa kesiapan integrasi',
    items: [
      'Kami tahu sistem mana saja yang perlu diintegrasikan.',
      'Kami tahu siapa pemilik setiap sistem.',
      'Detail API atau dokumentasi sistem lain sudah kami pegang.',
      'Akses uji atau sandbox memungkinkan.',
      'Kami tahu data apa saja yang perlu berpindah.',
      'Kami tahu sistem mana yang menjadi source of truth untuk setiap jenis data.',
      'Kami tahu siapa yang akan memvalidasi integrasi.',
    ],
    resultReady: 'Ini adalah bahan yang berguna untuk sesi discovery integrasi.',
    resultOpen: 'Sebagian detail teknis bisa diperjelas saat discovery.',
    cta: 'Diskusikan Kebutuhan Integrasi',
    form: 'Atau ajukan konsultasi',
  },

  security: {
    eyebrow: 'Keamanan',
    title: 'Desain integrasi harus mencakup keputusan keamanan.',
    lead: 'Setiap koneksi adalah jalan masuk ke data bisnis Anda. Keputusan ini dibuat untuk setiap integrasi, sebelum integrasinya dibangun.',
    items: [
      { title: 'Autentikasi', text: 'Bagaimana setiap sistem membuktikan identitasnya.' },
      {
        title: 'Kredensial',
        text: 'Siapa yang menerbitkan, di mana disimpan, dan bagaimana diganti.',
      },
      { title: 'Otorisasi', text: 'Apa yang boleh dibaca atau diubah oleh setiap koneksi.' },
      { title: 'Transport', text: 'Bagaimana data dilindungi selama berpindah antarsistem.' },
      { title: 'Cakupan data', text: 'Hanya data yang dibutuhkan alur kerja, tidak lebih.' },
      { title: 'Logging', text: 'Apa yang dicatat, dan apa yang tidak boleh dicatat.' },
      { title: 'Retry', text: 'Mencoba ulang tanpa menggandakan pembayaran atau order.' },
      { title: 'Auditabilitas', text: 'Bisa menunjukkan apa yang terjadi, dan kapan.' },
    ],
    link: 'Cara kami membahas keamanan',
  },

  failure: {
    eyebrow: 'Penanganan kegagalan',
    title: 'Rencanakan jalur gagal, bukan hanya jalur yang lancar.',
    lead: 'Integrasi gagal dengan cara yang biasa: provider sedang tidak bisa diakses, pesan datang dua kali, respons tidak pernah tiba. Desainlah yang menentukan apa yang terjadi selanjutnya.',
    label: 'Pertanyaan pada jalur gagal',
    flow: [
      'Sistem eksternal tidak bisa diakses',
      'Apa yang terjadi pada transaksi?',
      'Coba lagi?',
      'Masuk antrean?',
      'Tinjau manual?',
      'Rekonsiliasi?',
    ],
    observability: {
      title: 'Tahu ketika ada yang tidak beres.',
      lead: 'Desain integrasi juga perlu menentukan:',
      items: [
        'Apa yang dicatat (log)',
        'Kegagalan mana yang harus ditindaklanjuti',
        'Siapa yang menerima peringatan',
        'Bagaimana rekonsiliasi dilakukan',
      ],
    },
  },

  pricing: {
    text: 'Integrasi adalah salah satu faktor yang menentukan cakupan implementasi.',
    link: 'Lihat apa yang memengaruhi harga',
  },

  midCta: {
    eyebrow: 'Discovery integrasi',
    title: 'Punya sistem yang perlu bekerja bersama?',
    text: 'Ceritakan apa yang Anda gunakan hari ini. Kami memetakannya bersama Anda sebelum apa pun dibangun.',
    whatsapp: 'Diskusikan Kebutuhan Integrasi',
  },

  faq: {
    title: 'Pertanyaan seputar integrasi, dijawab apa adanya.',
    lead: 'Yang paling sering ditanyakan pemilik bisnis dan tim IT. Sistem yang spesifik selalu ditinjau bersama Anda.',
    items: [
      {
        q: 'Apakah mlmsoft bisa terhubung dengan sistem yang kami gunakan sekarang?',
        a: 'Itu bergantung pada setiap sistem dan apa yang diizinkannya. Kami meninjau sistem yang Anda gunakan, data yang perlu berpindah dan akses teknis yang tersedia, lalu menyepakati pendekatannya bersama Anda sebelum apa pun dibangun.',
      },
      {
        q: 'Apakah sudah ada integrasi dengan provider tertentu?',
        a: 'Ketersediaan integrasi bergantung pada provider dan kebutuhan proyek. Kami meninjau sistem yang sudah Anda gunakan, akses teknis yang tersedia, dan alur kerja yang perlu didukung sebelum memastikan pendekatan integrasinya.',
      },
      {
        q: 'Bagaimana jika sistem kami tidak bisa diakses lewat API?',
        a: 'Maka pendekatan lain dipertimbangkan: pertukaran file terjadwal, impor dan ekspor manual, atau perubahan yang dilakukan pemilik sistem tersebut. Sebagian langkah juga bisa tetap manual jika masih wajar untuk alur kerjanya.',
      },
      {
        q: 'Apakah integrasi bisa memakai CSV atau impor/ekspor saja?',
        a: 'Kadang bisa. Pertukaran file bisa cukup jika waktunya tidak kritis. Cocok atau tidaknya bergantung pada alur kerja, jumlah data, dan siapa yang memeriksa hasilnya.',
      },
      {
        q: 'Siapa yang menyediakan kredensial API?',
        a: 'Biasanya pemilik akun eksternal: bisnis Anda atau provider-nya. Kredensial dipertukarkan melalui proses aman yang disepakati saat implementasi, tidak pernah lewat formulir publik atau pesan chat.',
      },
      {
        q: 'Apakah perlu akses sandbox?',
        a: 'Lingkungan uji atau sandbox memungkinkan integrasi dicoba tanpa transaksi sungguhan. Ada tidaknya bergantung pada provider, dan diperjelas saat discovery.',
      },
      {
        q: 'Berapa lama sebuah integrasi dikerjakan?',
        a: 'Tidak ada durasi yang tetap. Lamanya bergantung pada kualitas API, ketersediaan sandbox, persetujuan provider, kompleksitas alur kerja, pemetaan data, pengujian, dan ketergantungan eksternal lainnya.',
      },
      {
        q: 'Apa yang memengaruhi biaya integrasi?',
        a: 'Jumlah sistem, seberapa banyak dan seberapa sering data berpindah, apa yang dibuka sistem lain, kebutuhan penanganan kegagalan dan rekonsiliasi, serta seberapa banyak pengujian yang dibutuhkan alur kerjanya.',
      },
      {
        q: 'Bagaimana jika provider eksternal mengubah API-nya?',
        a: 'Perubahan di sisi provider bisa membutuhkan perubahan di sisi kami. Cara perubahan seperti itu diketahui, diuji dan ditangani menjadi bagian dari kesepakatan support dengan Anda.',
      },
      {
        q: 'Apakah sistem internal yang sudah ada bisa diintegrasikan?',
        a: 'Sering kali bisa, selama pemiliknya dapat memberikan akses, dokumentasi, dan orang yang bisa menjawab pertanyaan. Sistem itu dinilai dengan cara yang sama seperti sistem lainnya.',
      },
    ],
  },

  finalCta: {
    title: 'Petakan sistem Anda sebelum apa pun dibangun.',
    text: 'Ceritakan sistem apa saja yang menjalankan bisnis Anda hari ini. Kami mulai dari alur datanya dan menyepakati pendekatannya bersama Anda.',
    whatsapp: 'Diskusikan Kebutuhan Integrasi',
    demo: 'Jadwalkan Demo',
  },

  form: {
    title: 'Ajukan Konsultasi Integrasi',
    text: 'Ceritakan sistem mana saja yang perlu saling terhubung. Beberapa detail sudah cukup untuk memulai.',
  },
}

export default integrations
