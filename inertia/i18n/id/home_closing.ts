import type en from '../en/home_closing'

const homeClosing: typeof en = {
  roles: {
    eyebrow: 'Untuk siapa',
    title: 'Setiap tim di balik jaringan Anda punya kebutuhan berbeda.',
    lead: 'Owner, finance, operasional, IT dan distributor melihat bisnis dari sudut pandang masing-masing. Inilah yang biasanya mereka butuhkan.',
    tablistLabel: 'Peran',
    items: {
      executives: {
        title: 'Lihat apa yang menggerakkan bisnis Anda.',
        text: 'Pendapatan, pertumbuhan, rasio payout dan risiko dalam satu tampilan, disusun dari angka yang benar-benar Anda pakai untuk menjalankan perusahaan.',
        points: [
          'Pendapatan & margin per periode',
          'Pertumbuhan & retensi jaringan',
          'Rasio payout terhadap penjualan',
          'Peringatan liabilitas & risiko',
          'Kinerja wilayah & produk',
          'Ekspor data untuk rapat direksi',
        ],
        more: 'Selengkapnya untuk owner & eksekutif',
      },
      finance: {
        title: 'Ketahui ke mana setiap rupiah mengalir.',
        text: 'Rekonsiliasi komisi, payout dan catatan pajak dirancang bersama tim finance Anda, supaya tutup buku cukup dicek, bukan disusun ulang dari awal.',
        points: [
          'Rekonsiliasi komisi',
          'Liabilitas wallet',
          'Persetujuan penarikan',
          'Pemotongan pajak',
          'Tahap persetujuan bonus',
          'Laporan settlement',
        ],
        more: 'Selengkapnya untuk tim finance',
      },
      operations: {
        title: 'Jalankan operasional harian tanpa kehilangan kendali.',
        text: 'Persetujuan member, order, reward dan layanan pelanggan disusun menjadi antrean kerja yang sanggup ditangani tim Anda.',
        points: [
          'Persetujuan member',
          'Pemrosesan order',
          'Produk & stok',
          'Pengiriman reward',
          'Layanan pelanggan',
          'Manajemen kampanye',
        ],
        more: 'Selengkapnya untuk tim operasional',
      },
      it: {
        title: 'Pertanyaan teknis, terjawab sejak awal.',
        text: 'Tim IT Anda akan bertanya soal integrasi, akses, migrasi data, backup dan monitoring. Kami membahasnya satu per satu sebelum implementasi, termasuk apa yang sudah ada saat ini dan apa yang masih perlu dibangun.',
        points: [
          'Kebutuhan integrasi',
          'Akses & hak pengguna',
          'Migrasi data',
          'Kebutuhan audit trail',
          'Hosting & operasional',
          'Monitoring & backup',
        ],
        more: 'Selengkapnya untuk tim IT',
      },
      distributors: {
        title: 'Beri setiap distributor cara tumbuh yang lebih baik.',
        text: 'Pengalaman mobile yang dirancang agar member bisa melihat penjualan, tim, progres rank dan penghasilan mereka, serta membagikan link referral dalam hitungan detik.',
        points: [
          'Penjualan & order saya',
          'Tim saya',
          'Komisi & wallet',
          'Progres rank',
          'Poin & reward',
          'Link referral & leaderboard',
        ],
        more: 'Selengkapnya untuk distributor',
      },
    },

    mockups: {
      executives: {
        title: 'Ringkasan eksekutif · Sep 2026',
        period: 'Bulanan',
        kpis: ['Pendapatan', 'Margin kotor', 'Rasio payout', 'Tingkat aktif'],
        points: 'poin',
        alertsLabel: 'Peringatan',
        alerts: [
          'Liabilitas wallet turun 2,3% minggu ini',
          'Liabilitas reward naik 6,0%: tinjau anggaran kampanye Q4',
          '7 leader berisiko churn di jaringan Jawa Timur',
        ],
      },
      finance: {
        title: 'Proses payout · Sen, 5 Okt 2026',
        batch: 'Batch PR-2026-10-A · 1.284 penerima',
        status: 'Menunggu persetujuan',
        approved: 'Komisi disetujui',
        withheld: 'Potongan pajak',
        net: 'Payout bersih',
        checks: ['Cocok dengan ledger wallet', 'Bukti potong dibuat', 'File transfer bank siap'],
        download: 'Unduh laporan',
        approve: 'Setujui payout',
      },
      operations: {
        title: 'Alur order · hari ini',
        location: 'Gudang Jakarta',
        stages: ['Baru', 'Dikemas', 'Dikirim', 'Diterima'],
        slaValue: '96,8%',
        slaText: 'order dikirim dalam 24 jam minggu ini',
      },
    },
  },

  outcomes: {
    eyebrow: 'Alasan owner datang ke kami',
    title: 'Tumbuh tanpa kehilangan kendali atas detail.',
    items: [
      {
        title: 'Lebih sedikit waktu untuk spreadsheet bonus',
        text: 'Saat aturan bonus terdokumentasi dan dihitung dengan cara yang sama setiap kali, tutup buku tidak lagi jadi maraton spreadsheet.',
      },
      {
        title: 'Lebih sedikit pertanyaan soal payout',
        text: 'Saat member dan leader bisa melihat asal-usul sebuah bonus, makin sedikit komplain yang sampai ke meja Anda.',
      },
      {
        title: 'Gambaran jaringan yang lebih jelas',
        text: 'Kantor pusat dan para leader melihat angka yang sama untuk penjualan, rank dan pertumbuhan tim.',
      },
      {
        title: 'Satu sumber data yang sama',
        text: 'Setiap tim bekerja dari data yang sama, mulai dari dashboard owner sampai tampilan distributor.',
      },
    ],
  },

  implementation: {
    eyebrow: 'Cara memulai',
    title: 'Dari diskusi pertama sampai go-live.',
    lead: 'Sistem mengikuti bisnis Anda, bukan sebaliknya. Kami memetakan model bisnis, aturan kompensasi dan alur kerja Anda sebelum konfigurasi dimulai.',
    whatsapp: 'Diskusikan implementasi Anda',
    pageLink: 'Lihat cara kami bekerja, tahap demi tahap',
    concerns: [
      {
        q: 'Bagaimana dengan migrasi data kami?',
        a: 'Member dan genealogi lebih dulu, lalu saldo setelah angkanya cocok dengan sistem Anda saat ini.',
      },
      {
        q: 'Compensation plan kami unik.',
        a: 'Tidak masalah. Kami memetakannya aturan demi aturan bersama tim Anda sebelum konfigurasi dimulai.',
      },
      {
        q: 'Siapa yang mengurus integrasi pembayaran?',
        a: 'Payment gateway, bank dan logistik dibahas bersama tim Anda di tahap discovery, termasuk siapa mengerjakan apa.',
      },
    ],
    phases: [
      {
        title: 'Pahami Bisnis',
        text: 'Kami mempelajari model bisnis, katalog produk dan compensation plan Anda saat ini.',
      },
      {
        title: 'Blueprint Sistem',
        text: 'Alur, aturan bonus dan kasus khusus dipetakan, lalu disetujui secara tertulis.',
      },
      {
        title: 'Konfigurasi',
        text: 'Compensation plan, rank, aturan pajak dan peran pengguna disiapkan di dalam sistem.',
      },
      {
        title: 'Integrasi',
        text: 'Pembayaran, pengiriman, messaging dan sistem internal Anda dihubungkan sesuai kebutuhan plan.',
      },
      {
        title: 'Migrasi',
        text: 'Member dan genealogi dipindahkan lebih dulu; saldo dan riwayat menyusul setelah angkanya cocok.',
      },
      {
        title: 'Pengujian',
        text: 'Uji penerimaan (UAT), dengan hasil bonus dibandingkan terhadap angka Anda saat ini.',
      },
      {
        title: 'Training',
        text: 'Tim admin, finance dan operasional dilatih sesuai alur kerja harian mereka.',
      },
      {
        title: 'Go-Live',
        text: 'Peluncuran ke produksi yang terencana, didampingi tim kami sejak hari pertama.',
      },
      {
        title: 'Support',
        text: 'Monitoring, optimasi dan perubahan plan seiring bisnis Anda berkembang.',
      },
    ],
  },

  why: {
    eyebrow: 'Mengapa berdiskusi dengan kami',
    title: 'Bukan template. Sistem yang mengikuti bisnis Anda.',
    lead: 'Komisi dan wallet adalah uang yang diandalkan distributor Anda. Karena itu kami memulai dari cara bisnis Anda berjalan, bukan dari daftar fitur.',
    items: [
      {
        title: 'Kami mulai dari plan Anda',
        text: 'Aturan bonus, rank dan kualifikasi Anda menjadi titik awal. Sistem dibentuk mengikutinya, bukan sebaliknya.',
      },
      {
        title: 'Satu rancangan, bukan lima aplikasi',
        text: 'Member, order, bonus, wallet dan reward direncanakan bersama, sehingga semuanya saling cocok sejak hari pertama.',
      },
      {
        title: 'Uang dikelola dengan cermat',
        text: 'Bonus dan saldo dirancang agar bisa ditelusuri, dan setiap koreksi meninggalkan jejak, bukan diubah diam-diam.',
      },
      {
        title: 'Ruang untuk bertumbuh',
        text: 'Ukuran jaringan, volume order dan perubahan plan ke depan ikut dibahas sejak awal.',
      },
      {
        title: 'Integrasi dibahas di depan',
        text: 'Kebutuhan pembayaran, logistik dan akuntansi dipetakan sejak awal, supaya tidak ada kejutan di akhir proyek.',
      },
      {
        title: 'Tim yang bisa Anda ajak bicara',
        text: 'Implementasi adalah kerja sama dengan tim kami, bukan checklist yang Anda kerjakan sendiri.',
      },
    ],
  },

  integrations: {
    eyebrow: 'Integrasi',
    title: 'Petakan sistem yang sudah Anda gunakan.',
    lead: 'Kami memetakan sistem eksternal yang terlibat dan menilai bagaimana data perlu berpindah di antara sistem tersebut.',
    items: [
      {
        title: 'Pembayaran',
        text: 'Metode pembayaran yang Anda gunakan, dan bagaimana pembayaran dikonfirmasi.',
      },
      {
        title: 'Bank & payout',
        text: 'Bagaimana penarikan komisi sampai ke rekening bank member.',
      },
      {
        title: 'Logistik',
        text: 'Ongkir, resi dan status pengiriman untuk order member maupun pelanggan.',
      },
      {
        title: 'Akuntansi & finance',
        text: 'Data penjualan, komisi dan kewajiban yang dibutuhkan finance, serta cara rekonsiliasinya.',
      },
      {
        title: 'Messaging',
        text: 'Notifikasi dan komunikasi dengan member serta pelanggan.',
      },
      {
        title: 'Sistem yang sudah ada',
        text: 'ERP, CRM, gudang, POS atau software internal yang sudah dipakai.',
      },
    ],
    custom: {
      title: 'Integrasi dimulai dari alur datanya.',
      text: 'Lihat cara kami memetakan sistem, kepemilikan data dan penanganan kegagalan sebelum apa pun dibangun.',
      link: 'Pelajari Integrasi',
      whatsapp: 'Tanya soal integrasi',
    },
  },

  security: {
    eyebrow: 'Keamanan & kepercayaan',
    title: 'Kebutuhan keamanan dibahas sebelum go-live.',
    lead: 'Akses, data, integrasi dan infrastruktur masing-masing membutuhkan kontrol yang berbeda. Kami menjadikan pertanyaan-pertanyaan tersebut bagian dari perencanaan implementasi.',
    cta: 'Pelajari Keamanan',
    items: [
      {
        title: 'Akses & peran',
        text: 'Siapa yang membutuhkan akses, dan apa yang boleh dilihat atau diubah setiap peran.',
      },
      {
        title: 'Perlindungan data',
        text: 'Data mana yang sensitif, dan siapa yang boleh melihat atau mengekspornya.',
      },
      {
        title: 'Integrasi',
        text: 'Cara sistem yang terhubung saling mengautentikasi, dan data apa yang diterimanya.',
      },
      {
        title: 'Audit & jejak perubahan',
        text: 'Perubahan mana yang perlu riwayat siapa mengubah apa, dan kapan.',
      },
      {
        title: 'Infrastruktur',
        text: 'Di mana sistem berjalan, serta bagaimana environment dipisahkan dan dipantau.',
      },
      {
        title: 'Backup & pemulihan',
        text: 'Ekspektasi pemulihan, disepakati dan diuji sebelum production.',
      },
    ],
  },

  pricingQuote: {
    eyebrow: 'Harga',
    title: 'Harga yang disusun sesuai bisnis Anda.',
    lead: 'Setiap bisnis direct selling berbeda, begitu juga setiap penawaran mlmsoft. Dua pertanyaan singkat membantu tim kami memahami kondisi bisnis Anda.',
    scopedTitle: 'Penawaran Anda disusun berdasarkan',
    scoped: [
      'Modul yang Anda pilih',
      'Compensation plan Anda dan tingkat kerumitannya',
      'Integrasi dengan tools yang Anda pakai',
      'Migrasi data, jika Anda pindah dari sistem lain',
      'Pelatihan dan pendampingan setelah go-live',
    ],
    moreQuestion: 'Ingin estimasi yang lebih rinci?',
    moreLink: 'Buka estimasi lengkap',
    whatsapp: 'Tanya soal harga',
  },

  page: {
    compensationCta: {
      eyebrow: 'Plan Anda',
      title: 'Punya compensation plan sendiri?',
      text: 'Tidak masalah. Ceritakan aturan bonus, rank dan kualifikasi Anda kepada tim mlmsoft, lalu kami petakan bersama Anda.',
      whatsapp: 'Diskusikan via WhatsApp',
    },
  },

  faq: {
    title: 'Pertanyaan yang sering diajukan owner.',
    lead: 'Belum menemukan jawaban yang Anda cari? Tim kami siap menjelaskannya.',
    items: [
      {
        q: 'Compensation plan kami unik. Apakah bisa diakomodasi?',
        a: 'Bisa, justru dari situ kami memulai. Kami memetakan bonus, rank, kualifikasi dan batas (cap) Anda aturan demi aturan bersama tim Anda, lalu merancang sistem mengikutinya, termasuk aturan hybrid dan custom.',
      },
      {
        q: 'Struktur compensation plan apa saja yang bisa didiskusikan?',
        a: 'Binary, unilevel, matrix, generation dan hybrid, juga aturan custom. Semuanya kami pakai sebagai acuan saat memetakan plan Anda; implementasi akhirnya mengikuti hasil analisis bisnis Anda.',
      },
      {
        q: 'Berapa lama proses implementasinya?',
        a: 'Tergantung kerumitan plan Anda, kebutuhan integrasi dan seberapa banyak data yang perlu dipindahkan. Setelah tahap discovery, kami memberikan jadwal tertulis, jadi Anda tahu apa yang dikerjakan dan kapan sebelum memutuskan.',
      },
      {
        q: 'Bisakah kami pindah dari sistem yang sekarang?',
        a: 'Umumnya bisa. Member dan genealogi dipindahkan lebih dulu; saldo dan riwayat menyusul setelah angkanya cocok dengan sistem Anda saat ini. Data apa saja yang bisa dimigrasikan dinilai di tahap discovery.',
      },
      {
        q: 'Apakah kami perlu toko online terpisah?',
        a: 'Belum tentu. Ecommerce bisa menjadi bagian dari rancangan yang sama, sehingga order ikut terhitung dalam plan Anda tanpa perlu ekspor data. Apakah masuk fase pertama atau tidak, kita putuskan bersama.',
      },
      {
        q: 'Bagaimana komisi dan wallet dijaga tetap akurat?',
        a: 'Lewat rancangannya: setiap perubahan saldo dirancang untuk dicatat bersama sumbernya, dan koreksi seperti refund menjadi entri baru, bukan perubahan diam-diam. Kami menjelaskan hal ini kepada tim finance Anda sebelum go-live.',
      },
      {
        q: 'Bagaimana dengan pajak atas bonus di Indonesia?',
        a: 'Pajak atas order, bonus dan reward menjadi bagian dari diskusi rancangan, termasuk bukti potong. Tarifnya tetap ditentukan oleh konsultan pajak Anda; kami tidak memberikan nasihat pajak.',
      },
      {
        q: 'Apakah distributor kami bisa mengakses lewat ponsel?',
        a: 'Pengalaman yang nyaman di ponsel untuk member termasuk dalam cakupan yang kami bahas bersama Anda: penjualan, tim, progres rank, wallet dan link referral mereka.',
      },
      {
        q: 'Bisakah terhubung ke payment gateway atau sistem kami yang lain?',
        a: 'Ceritakan apa yang Anda pakai. Payment gateway, bank, logistik, akuntansi dan messaging dibahas di tahap discovery, dan opsi integrasi untuk tim IT Anda menjadi bagian dari diskusi teknis.',
      },
    ],
  },
}

export default homeClosing
