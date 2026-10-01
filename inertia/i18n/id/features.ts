import type en from '../en/features'

const features: typeof en = {
  shared: {
    breadcrumbRoot: 'Fitur',
    problemEyebrow: 'Masalahnya',
    growthEyebrow: 'Saat jaringan tumbuh',
    approachEyebrow: 'Pendekatan kami',
    outcomesEyebrow: 'Yang berubah',
    teamsEyebrow: 'Tim terkait',
    considerEyebrow: 'Sebelum implementasi',
    considerTitle: 'Yang perlu dipertimbangkan sebelum implementasi.',
    considerLead:
      'Semua ini kami bahas bersama Anda di tahap memahami bisnis. Anda tidak perlu punya jawaban teknis sejak hari pertama.',
    faqLead: 'Jawaban apa adanya, termasuk hal yang bergantung pada cakupan implementasi.',
    askWhatsapp: 'Tanyakan lewat WhatsApp',
    orBookDemo: 'Atau jadwalkan demo',
    moreFor: (label: string) => `Selengkapnya untuk ${label}`,
    signalsLabel: 'Pertanyaan yang sering muncul',
    stageLabel: (n: number) => `Tahap ${n}`,
  },

  index: {
    hero: {
      eyebrow: 'Fitur',
      title: 'Mulai dari masalah bisnis',
      highlight: 'yang ingin Anda selesaikan.',
      lead: 'mlmsoft bukan daftar fitur. Pilih bagian bisnis yang paling butuh perhatian, lalu lihat cara kami menanganinya, dari aturan bisnis sampai tampilan yang dipakai tim Anda.',
    },
    groups: [
      {
        title: 'Plan dan penghasilan',
        text: 'Cara member mendapat penghasilan, dan cara setiap angka dijelaskan.',
      },
      {
        title: 'Jaringan dan member',
        text: 'Cara jaringan tumbuh, serta apa yang dilihat member dan tim Anda.',
      },
      {
        title: 'Penjualan',
        text: 'Cara order bergerak di dalam bisnis jaringan.',
      },
      {
        title: 'Sistem dan data',
        text: 'Bagaimana mlmsoft bekerja bersama sistem yang sudah Anda jalankan.',
      },
    ],
    cards: {
      compensation: {
        label: 'Compensation Plan',
        problem: 'Plan yang sulit diubah, dan lebih sulit lagi dijelaskan.',
        text: 'Bonus, kualifikasi dan rank dipetakan satu per satu sebelum menjadi software.',
      },
      wallet: {
        label: 'Wallet & Payout',
        problem: 'Member tidak paham saldo mereka sendiri.',
        text: 'Aturan payout, saldo tertunda, penyesuaian dan persetujuan, disusun bersama tim finance.',
      },
      network: {
        label: 'Manajemen Jaringan',
        problem: 'Ribuan member, tapi gambaran jaringannya tidak jelas.',
        text: 'Sponsor, penempatan dan tanda-tanda di bagian mana pertumbuhan melambat.',
      },
      distributors: {
        label: 'Pengalaman Distributor',
        problem: 'Member bertanya ke support untuk hal yang bisa mereka lihat sendiri.',
        text: 'Perjalanan member dan apa yang perlu mereka lihat, dari order pertama sampai rank berikutnya.',
      },
      operations: {
        label: 'Operasional member',
        problem: 'Tim Anda berpindah-pindah sistem untuk satu jawaban.',
        text: 'Onboarding, data member dan koreksi, dirancang sebagai alur kerja lebih dulu.',
      },
      integrations: {
        label: 'Integrasi',
        problem: 'Sistem yang sudah digunakan perlu memiliki alur data yang jelas.',
        text: 'Pembayaran, logistik, finance dan messaging dipetakan sebagai alur data sebelum apa pun dihubungkan.',
      },
      ecommerce: {
        label: 'Ecommerce',
        problem: 'Toko online dan sistem bonus tidak pernah sinkron.',
        text: 'Harga member, stock point, periode dan tindak lanjut di setiap order.',
      },
    },
    learnMore: 'Lihat pendekatannya',
    notListed: {
      title: 'Yang Anda cari tidak ada di daftar ini?',
      text: 'Reward, analitik, atau hal yang khusus untuk plan Anda: ceritakan kebutuhannya, dan kami sampaikan apa adanya bagaimana kami akan menanganinya.',
      cta: 'Tanyakan lewat WhatsApp',
    },
    cta: {
      title: 'Belum tahu harus mulai dari mana?',
      text: 'Ceritakan bagian bisnis yang paling merepotkan saat ini. Kami mulai dari sana, lalu memetakan apa saja yang terhubung dengannya.',
      label: 'Konsultasi via WhatsApp',
    },
    demo: {
      title: 'Mulai dari masalah yang paling merugikan bisnis Anda.',
      text: 'Ceritakan bisnis Anda dan bagian yang perlu ditangani lebih dulu.',
    },
  },

  pages: {
    network: {
      hero: {
        eyebrow: 'Manajemen Jaringan',
        title: 'Pahami bagaimana jaringan bisnis Anda',
        highlight: 'berkembang.',
        lead: 'Pohon genealogi hanya menunjukkan siapa berada di mana. Owner butuh lebih dari itu: cabang mana yang tumbuh, mana yang melambat, dan leader mana yang perlu dibantu, sebelum dampaknya terlihat di penjualan.',
        ctaLabel: 'Diskusikan struktur jaringan Anda',
        chips: [
          'Leader mana yang timnya aktif?',
          'Di mana pertumbuhan berhenti?',
          'Penempatan mana yang perlu diperbaiki?',
        ],
      },
      problem: {
        quote: 'Member kami sudah ribuan, tapi gambaran jaringannya tidak jelas.',
        text: 'Hampir semua bisnis bisa mencari siapa sponsor seorang member. Tapi hanya sedikit yang bisa cepat menjawab bagian jaringan mana yang mendorong pertumbuhan, dan bagian mana yang diam-diam mulai berkurang.',
        signals: [
          'Leader mana yang sedang membangun tim yang aktif?',
          'Di bagian mana pertumbuhan berhenti kuartal ini?',
          'Penempatan mana yang terus kembali ke tim support?',
        ],
      },
      growth: {
        title: 'Semakin dalam jaringannya, semakin sulit dibaca.',
        lead: 'Jaringan yang mudah diikuti saat anggotanya ratusan orang menjadi sulit dibaca saat jumlahnya puluhan ribu.',
        stages: [
          {
            label: 'Ratusan member',
            text: 'Tim hafal nama para leader. Pertanyaan dijawab dari ingatan dan spreadsheet.',
          },
          {
            label: 'Ribuan member',
            text: 'Leg dan generasi bertambah banyak. Mencari siapa berada di bawah siapa makan waktu, dan kesalahan penempatan jadi mahal.',
          },
          {
            label: 'Puluhan ribu member',
            text: 'Pertumbuhan dan member yang berhenti tersembunyi di cabang yang dalam. Laporan akhir bulan datang terlambat untuk ditindaklanjuti.',
          },
        ],
      },
      approach: {
        title: 'Rapikan strukturnya dulu, baru buat terlihat.',
        lead: 'Kami petakan dulu bagaimana jaringan Anda benar-benar terbentuk (sponsor, penempatan dan aturan yang dibaca plan Anda) sebelum menentukan apa yang perlu dilihat setiap tim.',
        steps: [
          { title: 'Sponsor', text: 'Siapa mengajak siapa, dan bagaimana hal itu dicatat.' },
          {
            title: 'Penempatan',
            text: 'Di mana member baru ditempatkan, dan siapa yang memutuskan.',
          },
          { title: 'Aturan plan', text: 'Bagian struktur mana yang dibaca oleh plan Anda.' },
          { title: 'Koreksi', text: 'Cara memperbaiki penempatan yang salah dan mencatatnya.' },
          { title: 'Tampilan', text: 'Apa yang perlu dilihat owner, leader dan tim support.' },
          {
            title: 'Sinyal pertumbuhan',
            text: 'Indikator yang menunjukkan di mana perlu bertindak.',
          },
        ],
        note: 'Tampilan dan indikator apa saja yang masuk dalam implementasi Anda disepakati di tahap memahami bisnis.',
      },
      concept: {
        eyebrow: 'Konsep tampilan',
        title: 'Tampilan jaringan untuk mengambil keputusan.',
        lead: 'Contoh cara owner melihat jaringannya: satu cabang, aktivitas di baliknya, dan sinyal yang perlu diperhatikan.',
        mock: {
          title: 'Ringkasan jaringan',
          period: 'September 2026',
          branch: 'Cabang terpilih',
          leader: 'Leader',
          members: 'Member',
          active: 'Aktif bulan ini',
          newMembers: 'Baru bulan ini',
          volume: 'Volume grup',
          legs: 'Leg',
          left: 'Kiri',
          right: 'Kanan',
          signals: 'Perlu perhatian',
          legend: ['Aktif', 'Tidak aktif', 'Baru bulan ini'],
          signalItems: [
            'Leg kanan tumbuh lebih cepat dari leg kiri selama 3 bulan',
            '3 leader di bawah syarat aktivitasnya',
            '12 penempatan baru menunggu konfirmasi',
          ],
          ariaLabel: 'Contoh ringkasan jaringan dengan data contoh',
        },
      },
      outcomes: {
        title: 'Yang didapat owner dari jaringan yang lebih jelas.',
        items: [
          {
            title: 'Tahu dari mana pertumbuhan datang',
            text: 'Cabang dan leader di balik angka, bukan sekadar total.',
          },
          {
            title: 'Cabang yang melambat terlihat lebih awal',
            text: 'Sebelum dampaknya muncul di penjualan akhir bulan.',
          },
          {
            title: 'Mendampingi leader dengan data',
            text: 'Diskusi berdasarkan aktivitas tim mereka yang sebenarnya.',
          },
          {
            title: 'Sengketa penempatan berkurang',
            text: 'Aturan yang jelas: siapa ditempatkan di mana, dan kenapa.',
          },
          {
            title: 'Kampanye per tim dan wilayah',
            text: 'Fokus ke bagian jaringan yang butuh dorongan.',
          },
        ],
      },
      teams: {
        title: 'Siapa yang bekerja dengan tampilan jaringan.',
        items: [
          'Pertumbuhan dan risiko per cabang, leader dan wilayah.',
          'Penempatan, koreksi dan pertanyaan member.',
          'Tim mereka sendiri, level dan member baru.',
        ],
      },
      consider: [
        'Seberapa lengkap dan konsisten data genealogi Anda saat ini.',
        'Aturan penempatan, dan siapa yang boleh mengubahnya.',
        'Struktur binary, unilevel, matrix atau hybrid, dan seberapa dalam member bisa melihat jaringannya.',
        'Cara menyimpan riwayat saat penempatan dikoreksi.',
        'Migrasi dari sistem lama, direkonsiliasi per cabang.',
        'Apa yang boleh dilihat seorang member tentang member lain.',
      ],
      faq: {
        title: 'Pertanyaan seputar jaringan.',
        items: [
          {
            q: 'Apakah genealogi yang sudah ada bisa dipakai?',
            a: 'Biasanya bisa. Seberapa lengkap dan konsisten datanya menentukan cara migrasinya, dan itu kami nilai di tahap memahami bisnis.',
          },
          {
            q: 'Struktur jaringan apa saja yang bisa didiskusikan?',
            a: 'Binary, unilevel, matrix dan hybrid, termasuk aturan penempatan khusus. Struktur yang dipakai plan Anda kami petakan lebih dulu.',
          },
          {
            q: 'Apakah member bisa melihat downline mereka sendiri?',
            a: 'Apa yang boleh dilihat member tentang timnya kami putuskan bersama Anda, termasuk privasi antarcabang.',
          },
          {
            q: 'Bagaimana kesalahan penempatan diperbaiki?',
            a: 'Siapa yang boleh mengoreksi, siapa yang menyetujui dan bagaimana riwayatnya disimpan dirancang bersama tim operasional Anda.',
          },
        ],
      },
      cta: {
        title: 'Ingin melihat jaringan Anda dengan lebih jelas?',
        text: 'Ceritakan struktur jaringan Anda saat ini dan pertanyaan yang belum bisa Anda jawab.',
        label: 'Diskusikan struktur jaringan Anda',
      },
      demo: {
        title: 'Mari melihat jaringan Anda bersama.',
        text: 'Ceritakan struktur, para leader, dan bagian mana yang pertumbuhannya sulit terlihat.',
      },
    },

    ecommerce: {
      hero: {
        eyebrow: 'Ecommerce untuk bisnis jaringan',
        title: 'Penjualan yang mengikuti',
        highlight: 'aturan bisnis Anda.',
        lead: 'Di bisnis jaringan, order tidak pernah sekadar order. Ada member, level harga, sponsor dan periode yang melekat padanya, dan semuanya berpengaruh ke compensation plan Anda.',
        ctaLabel: 'Diskusikan alur penjualan Anda',
        chips: [
          'Harga mana yang berlaku?',
          'Apakah order ini dihitung?',
          'Siapa yang menindaklanjuti?',
        ],
      },
      problem: {
        quote: 'Toko online dan sistem bonus kami tidak pernah sinkron.',
        text: 'Order datang dari web store, stokis, atau grup WhatsApp, sementara bonus dihitung di tempat lain. Setiap selisih berakhir menjadi tiket support atau koreksi di tim finance.',
        signals: [
          'Harga mana yang berlaku untuk member ini?',
          'Apakah order ini dihitung untuk periode sekarang?',
          'Siapa yang menindaklanjuti kalau pengiriman gagal?',
        ],
      },
      growth: {
        title: 'Semakin banyak kanal, semakin banyak pengecualian.',
        lead: 'Berjualan lewat member, stokis dan pelanggan umum melipatgandakan aturan yang harus dipatuhi setiap order.',
        stages: [
          {
            label: 'Satu toko, satu daftar harga',
            text: 'Order masih cukup sedikit untuk dicek manual.',
          },
          {
            label: 'Harga member dan stokis',
            text: 'Level harga, stock point dan retur mulai memengaruhi bonus.',
          },
          {
            label: 'Banyak kanal dan wilayah',
            text: 'Setiap kanal punya pengecualian sendiri, dan tim finance merekonsiliasinya di akhir bulan.',
          },
        ],
      },
      approach: {
        title: 'Petakan alur order sebelum membangun toko.',
        lead: 'Kami ikuti satu order di dalam bisnis Anda: siapa pembelinya, harga mana yang berlaku, aturan apa yang tersentuh, dan siapa yang menindaklanjutinya.',
        steps: [
          { title: 'Pelanggan atau member', text: 'Siapa yang membeli, dan di level harga mana.' },
          { title: 'Order', text: 'Produk, jumlah dan pembayaran.' },
          { title: 'Konteks bisnis', text: 'Sponsor, periode dan volume yang dibawanya.' },
          { title: 'Aturan operasional', text: 'Stock point, pengiriman dan tahap persetujuan.' },
          {
            title: 'Pengiriman dan tindak lanjut',
            text: 'Pengiriman, retur dan informasi untuk member.',
          },
        ],
        note: 'Apakah langkah yang berkaitan dengan bonus dijalankan sistem dalam implementasi Anda disepakati di tahap memahami bisnis; kami tidak mengasumsikannya.',
      },
      concept: {
        eyebrow: 'Konsep tampilan',
        title: 'Satu order, lengkap dengan konteks bisnisnya.',
        lead: 'Contoh layar order yang menampilkan hal penting di bisnis jaringan: member, level harga, periode dan langkah berikutnya.',
        mock: {
          order: 'Order',
          paid: 'Lunas',
          member: 'Member',
          sponsor: 'Sponsor',
          priceLevel: 'Level harga',
          priceLevelValue: 'Harga member',
          stockPoint: 'Stock point',
          period: 'Periode',
          periodValue: 'September 2026',
          volume: 'Volume',
          items: 'Produk',
          total: 'Total',
          timeline: ['Lunas', 'Dikemas', 'Dikirim', 'Diterima'],
          nextStep: 'Langkah berikutnya',
          nextStepValue: 'Kirim dari stock point Surabaya',
          products: ['Teh Herbal · 2 kotak', 'Minuman Kolagen · 1 pak'],
          ariaLabel: 'Contoh layar order dengan data contoh',
        },
      },
      outcomes: {
        title: 'Yang berubah saat order membawa konteksnya.',
        items: [
          {
            title: 'Harga sesuai pembeli',
            text: 'Harga retail, member dan stokis diterapkan dengan cara yang sama setiap kali.',
          },
          {
            title: 'Order dihitung di tempat yang benar',
            text: 'Periode dan volume jelas dari order itu sendiri.',
          },
          {
            title: 'Koreksi manual berkurang',
            text: 'Pekerjaan akhir bulan tim finance dan support jadi lebih ringan.',
          },
          {
            title: 'Tindak lanjut yang jelas',
            text: 'Semua tahu siapa yang menangani pengiriman gagal atau retur.',
          },
          {
            title: 'Toko yang sesuai cara Anda berjualan',
            text: 'Dirancang mengikuti kanal Anda, bukan template umum.',
          },
        ],
      },
      teams: {
        title: 'Siapa yang bekerja dengan alur order.',
        items: [
          'Order, stock point, pengiriman dan retur.',
          'Pembayaran, refund dan apa yang masuk ke payout.',
          'Memesan dan melacak order dari akun mereka sendiri.',
        ],
      },
      consider: [
        'Level harga Anda: retail, member dan stokis.',
        'Metode pembayaran, dan payment provider yang Anda pakai saat ini.',
        'Stock point, mitra pengiriman dan area pengiriman.',
        'Aturan retur dan refund, serta dampaknya ke bonus.',
        'Pajak atas order, sesuai arahan konsultan pajak Anda.',
        'Toko online dan riwayat order Anda saat ini, jika ada.',
      ],
      integrationsLink: {
        text: 'Payment provider, kurir dan sistem lain yang sudah Anda gunakan ditinjau saat discovery integrasi.',
        link: 'Pelajari Integrasi',
      },
      faq: {
        title: 'Pertanyaan seputar penjualan.',
        items: [
          {
            q: 'Apakah kami perlu toko online terpisah?',
            a: 'Belum tentu. Apakah toko menjadi bagian dari sistem yang sama atau dihubungkan ke toko yang sudah berjalan, kami putuskan bersama Anda berdasarkan cara Anda berjualan saat ini.',
          },
          {
            q: 'Apakah member dan pelanggan umum bisa melihat harga yang berbeda?',
            a: 'Level harga per jenis pembeli, termasuk harga stokis, menjadi bagian dari diskusi perancangan.',
          },
          {
            q: 'Payment provider apa yang bisa dipakai?',
            a: 'Beri tahu kami provider yang Anda pakai. Pilihan integrasinya kami nilai di tahap memahami bisnis.',
          },
          {
            q: 'Apa yang terjadi pada bonus kalau order diretur?',
            a: 'Retur dirancang sebagai koreksi yang meninggalkan jejak, disepakati bersama tim finance Anda. Halaman compensation plan menjelaskan cara kami menangani reversal.',
          },
        ],
      },
      cta: {
        title: 'Berjualan lewat member, stokis dan pelanggan umum?',
        text: 'Ceritakan bagaimana sebuah order bergerak di bisnis Anda saat ini. Kami tunjukkan di mana aturan-aturannya perlu bertemu.',
        label: 'Diskusikan alur penjualan Anda',
      },
      demo: {
        title: 'Mari petakan alur order Anda.',
        text: 'Ceritakan di mana Anda berjualan, harga apa saja yang dipakai, dan bagaimana order sampai ke member.',
      },
    },

    wallet: {
      hero: {
        eyebrow: 'Wallet & Payout',
        title: 'Buat aturan payout',
        highlight: 'lebih mudah dipahami.',
        lead: 'Member ingin tahu berapa yang mereka dapat dan kapan dibayarkan. Tim finance perlu bisa menjelaskan setiap angka. Keduanya bergantung pada aturan payout yang ditulis dengan jelas sebelum menjadi software.',
        ctaLabel: 'Diskusikan alur payout Anda',
        chips: [
          'Kenapa saldo ini tertunda?',
          'Siapa yang menyetujui payout ini?',
          'Kapan saya bisa menarik saldo?',
        ],
      },
      problem: {
        quote: 'Kenapa saldo saya berbeda dari yang saya kira?',
        text: 'Kalau asal sebuah angka, bagian yang masih tertunda dan potongannya tidak terlihat, setiap hari payout memunculkan pertanyaan baru untuk tim support dan finance.',
        signals: [
          'Mana yang masih tertunda, dan mana yang bisa ditarik?',
          'Kenapa jumlah ini dipotong?',
          'Siapa yang menyetujui payout ini, dan kapan?',
        ],
      },
      growth: {
        title: 'Setiap periode payout makin besar.',
        lead: 'Saat member masih ratusan, tim finance memeriksa setiap transfer. Saat skalanya membesar, aturan yang tidak jelas berubah menjadi sengketa.',
        stages: [
          {
            label: 'Ratusan payout',
            text: 'Tim finance memeriksa setiap transfer satu per satu.',
          },
          {
            label: 'Ribuan payout',
            text: 'Penahanan saldo, koreksi dan potongan pajak butuh tahapan sendiri.',
          },
          {
            label: 'Puluhan ribu payout',
            text: 'Member butuh jawaban tanpa harus bertanya, dan tim finance butuh jejak untuk setiap perubahan.',
          },
        ],
      },
      approach: {
        title: 'Tulis aturan payout-nya lebih dulu.',
        lead: 'Sebelum saldo apa pun ditampilkan ke member, kami sepakati bersama tim finance Anda bagaimana sebuah angka bergerak dari dihasilkan sampai dibayarkan.',
        steps: [
          {
            title: 'Asal penghasilan',
            text: 'Order atau aturan mana yang menghasilkan angka ini.',
          },
          { title: 'Tertunda', text: 'Kapan saldo bisa ditarik, dan kenapa bisa tertahan.' },
          { title: 'Penyesuaian', text: 'Koreksi dan reversal, masing-masing dengan alasannya.' },
          { title: 'Pajak', text: 'Pemotongan pajak sesuai arahan konsultan pajak Anda.' },
          {
            title: 'Persetujuan',
            text: 'Siapa yang memeriksa sebuah periode payout, dan urutannya.',
          },
          { title: 'Payout', text: 'Bagaimana dan kapan dana sampai ke member.' },
        ],
        note: 'Tarif pajak tetap ditentukan konsultan pajak Anda. Langkah mana yang dijalankan sistem dalam implementasi Anda disepakati di tahap memahami bisnis.',
      },
      concept: {
        eyebrow: 'Konsep tampilan',
        title: 'Angka yang sama, dijelaskan untuk setiap pihak.',
        lead: 'Contoh wallet member berdampingan dengan antrean payout tim finance: apa yang dilihat member, dan apa yang diperiksa finance.',
        mock: {
          walletTitle: 'Wallet saya',
          available: 'Bisa ditarik',
          pending: 'Tertunda',
          onHold: 'Ditahan',
          withdraw: 'Tarik saldo',
          history: 'Aktivitas terakhir',
          entries: [
            { text: 'Bonus generasi · September', note: 'Dari order tim Anda' },
            { text: 'PPh dipotong', note: 'Tercatat di bukti potong Anda' },
            { text: 'Bonus sponsor langsung', note: 'Bisa ditarik setelah masa retur' },
          ],
          financeTitle: 'Periode payout · 5 Okt 2026',
          recipients: 'Penerima',
          statuses: ['Diperiksa', 'Disetujui', 'Siap dibayar'],
          checks: ['Penahanan untuk order September dilepas', '3 penyesuaian perlu alasan'],
          approve: 'Setujui periode',
          ariaLabel: 'Contoh wallet member dan antrean payout dengan data contoh',
        },
      },
      outcomes: {
        title: 'Yang berubah saat aturan payout jelas.',
        items: [
          {
            title: 'Pertanyaan “bonus saya mana?” berkurang',
            text: 'Member bisa melihat kenapa sebuah angka tertunda atau dipotong.',
          },
          {
            title: 'Setiap angka punya alasan',
            text: 'Bisa ditelusuri ke order atau aturan yang menghasilkannya.',
          },
          {
            title: 'Persetujuan mengikuti kebijakan Anda',
            text: 'Tahapan yang jelas sebelum dana keluar.',
          },
          {
            title: 'Pajak tercatat per member dan periode',
            text: 'Sesuai arahan konsultan pajak Anda.',
          },
          {
            title: 'Hari payout lebih tenang',
            text: 'Lebih sedikit kejutan untuk tim finance dan support.',
          },
        ],
      },
      teams: {
        title: 'Siapa yang bekerja dengan payout.',
        items: [
          'Persetujuan, pajak dan rekonsiliasi.',
          'Rasio payout dan kewajiban dalam konteks bisnis.',
          'Saldo dan riwayat payout mereka sendiri.',
        ],
      },
      consider: [
        'Jadwal payout dan jumlah minimum penarikan.',
        'Masa penahanan saldo, dan kejadian yang melepaskannya.',
        'Metode penarikan, serta bank atau provider yang terlibat.',
        'Pemotongan pajak dan bukti potong, sesuai arahan konsultan pajak Anda.',
        'Tahapan persetujuan, dan siapa yang memberi persetujuan akhir.',
        'Saldo awal dari sistem lama, direkonsiliasi sebelum dipindahkan.',
      ],
      faq: {
        title: 'Pertanyaan seputar payout.',
        items: [
          {
            q: 'Apakah kami bisa menentukan jadwal payout sendiri?',
            a: 'Bisa. Jadwal, jumlah minimum dan masa penahanan saldo termasuk aturan yang kami susun bersama Anda.',
          },
          {
            q: 'Bagaimana dengan pajak?',
            a: 'Tarif dan perlakuan pajak ditentukan konsultan pajak Anda; rancangannya mencatat apa yang mereka butuhkan per member dan periode. Kami tidak memberikan nasihat pajak.',
          },
          {
            q: 'Apakah tim finance bisa memeriksa payout sebelum dibayarkan?',
            a: 'Tahapan persetujuan dirancang mengikuti kebijakan internal Anda, termasuk siapa yang menyetujui dan dalam urutan apa.',
          },
          {
            q: 'Bagaimana dengan saldo di sistem kami yang sekarang?',
            a: 'Saldo awal baru dipindahkan setelah cocok dengan catatan Anda. Apa saja yang bisa dimigrasikan kami nilai di tahap memahami bisnis.',
          },
        ],
      },
      cta: {
        title: 'Hari payout selalu bikin repot tim Anda?',
        text: 'Ceritakan alur payout Anda saat ini, dari penghasilan sampai transfer. Kami bantu menyusun aturan yang bisa diikuti member maupun tim finance.',
        label: 'Diskusikan alur payout Anda',
      },
      demo: {
        title: 'Mari bahas aturan payout Anda.',
        text: 'Ceritakan jadwal payout, tahapan persetujuan, dan pertanyaan yang paling sering diajukan member.',
      },
    },
  },
}

export default features
