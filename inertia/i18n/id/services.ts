import type en from '../en/services'

/**
 * Layanan pendukung bisnis. Layanan ditawarkan; hasil tidak dijanjikan.
 * Tanpa angka follower, peringkat, traffic, leads, penjualan atau ROI,
 * tanpa portofolio, tanpa klaim kemitraan platform, dan tanpa kemampuan
 * maklon di luar docs/product-maklon-evidence.md.
 */
const services: typeof en = {
  shared: {
    breadcrumbRoot: 'Layanan',
    problemEyebrow: 'Masalahnya',
    scopeEyebrow: 'Yang bisa kami bantu',
    processEyebrow: 'Cara kerjanya',
    audienceEyebrow: 'Untuk siapa',
    contextEyebrow: 'Untuk bisnis jaringan',
    relatedEyebrow: 'Layanan terkait',
    scopeNote:
      'Cakupan disepakati per proyek setelah diskusi awal. Anda yang memilih apa yang dibutuhkan.',
    pricingNote: 'Harga mengikuti cakupan pekerjaan.',
    concept: 'Konsep',
    exampleWorkflow: 'Contoh alur kerja',
    explore: 'Lihat',
    faqLead: 'Jawaban singkatnya. Detailnya bergantung pada bisnis Anda dan disepakati bersama.',
  },

  cards: {
    social_media: 'Tampil konsisten di media sosial tanpa harus mengurus setiap unggahan sendiri.',
    seo: 'Buat konten bermanfaat yang membantu calon pelanggan menemukan bisnis Anda.',
    paid_advertising:
      'Rencanakan kampanye sesuai audiens dan penawaran yang ingin Anda kembangkan.',
    branding: 'Identitas yang lebih jelas di produk, kanal digital dan materi kampanye.',
    product_maklon:
      'Diskusikan produk di balik jaringan Anda, dari konsep sampai kebutuhan produksinya.',
  },

  home: {
    eyebrow: 'Lebih dari software',
    title: 'Bisnis Anda membutuhkan lebih dari sekadar software.',
    lead: 'Sistem hanyalah salah satu bagian. Produk, brand, konten, dan pemasaran juga perlu dibangun dengan arah yang sama.',
    storyLabel: 'Bagian-bagian yang membentuk bisnis jaringan',
    story: [
      'Model bisnis',
      'Produk',
      'Brand',
      'Kehadiran digital',
      'Software',
      'Traffic',
      'Pertumbuhan jaringan',
      'Operasional',
    ],
    storyCore: 'Inti layanan kami',
    cardsLabel: 'Layanan pendukung bisnis',
    onePartner: {
      title: 'Satu diskusi bisa mencakup lebih dari satu kebutuhan bisnis.',
      text: 'Pakai satu layanan atau beberapa sekaligus. Tidak ada yang otomatis dijadikan paket.',
    },
    cta: {
      title: 'Butuh lebih dari sekadar software?',
      text: 'Ceritakan kondisi bisnis Anda saat ini dan dukungan apa yang dibutuhkan berikutnya.',
      whatsapp: 'Diskusikan Bisnis Anda via WhatsApp',
      explore: 'Lihat Layanan',
    },
  },

  hub: {
    hero: {
      eyebrow: 'Layanan pendukung bisnis',
      title: 'Lebih dari software',
      highlight: 'untuk bisnis MLM Anda.',
      lead: 'Dari produk dan branding sampai pemasaran digital, kita bisa mendiskusikan pekerjaan pendukung yang dibutuhkan di sekitar sistem Anda.',
      cta: 'Diskusikan Bisnis Anda',
      explore: 'Lihat Layanan',
      positioning:
        'Satu partner untuk sistem, brand, produk, dan pertumbuhan bisnis jaringan Anda.',
    },
    challenge: {
      eyebrow: 'Tantangannya',
      title: 'Bisnis jaringan dibangun dari lebih dari sekadar sistemnya.',
      lead: 'Software menjaga member, order dan bonus tetap tertata. Di sekitarnya, bagian lain dari bisnis juga butuh perhatian yang sama.',
      points: [
        {
          title: 'Produk yang ingin dibagikan orang',
          text: 'Distributor lebih percaya diri berjualan ketika produk dan ceritanya jelas.',
        },
        {
          title: 'Brand yang tampil sama di mana pun',
          text: 'Kemasan, unggahan media sosial, iklan dan aplikasi member sebaiknya terasa dari satu perusahaan.',
        },
        {
          title: 'Pelanggan yang bisa menemukan Anda',
          text: 'Pencarian, media sosial dan iklan masing-masing membawa orang ke bisnis Anda dengan cara berbeda.',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'Cara semuanya terhubung',
      title: 'Layanan-layanan ini berada di sekitar bisnis, dengan sistem sebagai intinya.',
      lead: 'Setiap layanan bisa berdiri sendiri. Bersama-sama, layanan ini mencakup bagian bisnis jaringan yang tidak ditangani software.',
      label: 'Konsep: layanan di sekitar bisnis jaringan',
      center: 'Bisnis Anda',
      core: 'Layanan inti',
      nodes: {
        software: 'Software',
        product: 'Produk',
        brand: 'Brand',
        growth: 'Pertumbuhan digital',
        seo: 'SEO & konten',
        ads: 'Iklan digital',
        social: 'Media sosial',
      },
    },
    areas: {
      eyebrow: 'Bidang layanan',
      title: 'Lima cara kami bisa mendukung bisnis di sekitar sistem Anda.',
    },
    together: {
      eyebrow: 'Bekerja bersama',
      title: 'Satu diskusi bisa mencakup lebih dari satu kebutuhan bisnis.',
      lead: 'Beberapa kebutuhan sering muncul bersamaan. Anda yang menentukan mana yang ingin dibahas.',
      examples: [
        {
          title: 'Meluncurkan lini produk baru',
          text: 'Pengembangan produk, lalu branding dan kemasan, lalu konten dan kampanye untuk memperkenalkannya.',
        },
        {
          title: 'Menyegarkan brand yang sudah ada',
          text: 'Branding lebih dulu, lalu kehadiran di media sosial dan rencana konten yang membawa identitas barunya.',
        },
        {
          title: 'Tumbuh melampaui jaringan saat ini',
          text: 'Konten pencarian dan kampanye iklan yang membawa pelanggan baru ke produk Anda.',
        },
      ],
      note: 'Setiap layanan bisa dipakai sendiri-sendiri. Tidak ada yang dipaketkan otomatis.',
    },
    audience: {
      eyebrow: 'Untuk siapa setiap layanan',
      title: 'Mulai dari kebutuhan Anda hari ini.',
      items: {
        social_media: 'Brand yang belum punya tim konten khusus.',
        seo: 'Brand yang ingin mudah ditemukan lewat pencarian dalam jangka panjang.',
        paid_advertising: 'Bisnis yang siap menjangkau pelanggan baru lewat iklan berbayar.',
        branding: 'Brand baru, atau brand yang perlu reposisi.',
        product_maklon: 'Owner yang sedang mengembangkan produk untuk jaringan atau bisnisnya.',
      },
    },
    start: {
      eyebrow: 'Cara memulai kerja sama',
      title: 'Diskusi singkat lebih dulu, lalu cakupan yang Anda setujui.',
      steps: [
        { title: 'Pahami', text: 'Bisnis Anda, pasar Anda dan apa yang ingin diubah.' },
        {
          title: 'Rencanakan',
          text: 'Apa saja cakupannya, siapa mengerjakan apa, dan cara meninjaunya.',
        },
        { title: 'Kerjakan', text: 'Pekerjaan yang disepakati diproduksi atau dibangun.' },
        { title: 'Tinjau', text: 'Anda meninjaunya sebelum apa pun dipublikasikan.' },
        { title: 'Luncurkan', text: 'Hasilnya dipublikasikan, diluncurkan atau diserahterimakan.' },
        { title: 'Evaluasi', text: 'Yang berhasil ditinjau ulang, bila termasuk dalam cakupan.' },
      ],
      note: 'Sebagian layanan berupa proyek sekali jalan, sebagian berkelanjutan. Itu bagian dari cakupan yang Anda sepakati.',
    },
    pricing: {
      title: 'Harga mengikuti cakupan pekerjaan.',
      text: 'Tidak ada paket harga tetap di situs ini. Ceritakan kebutuhan Anda, lalu cakupan dan biayanya kita bahas bersama.',
      cta: 'Diskusikan Kebutuhan Anda',
    },
    faq: {
      title: 'Pertanyaan seputar layanan',
      items: [
        {
          q: 'Bisakah kami memakai satu layanan saja?',
          a: 'Bisa. Setiap layanan bisa dipakai sendiri, dan satu layanan adalah titik awal yang wajar.',
        },
        {
          q: 'Apakah kami harus memakai software mlmsoft untuk memakai layanan lainnya?',
          a: 'Tidak. Layanan ini tersedia, baik Anda memakai software kami maupun tidak.',
        },
        {
          q: 'Bisakah beberapa layanan digabungkan?',
          a: 'Bisa, jika itu membantu bisnis Anda. Layanan direncanakan bersama hanya jika Anda meminta lebih dari satu.',
        },
        {
          q: 'Bagaimana cakupan pekerjaan ditentukan?',
          a: 'Lewat diskusi awal tentang bisnis, tujuan dan apa yang sudah Anda miliki. Cakupan dan harga disepakati sebelum pekerjaan dimulai.',
        },
        {
          q: 'Bisakah hasil pemasaran dijanjikan?',
          a: 'Tidak. Hasil bergantung pada produk, pasar, anggaran dan persaingan. Yang kita sepakati adalah apa yang dikerjakan dan cara meninjau perkembangannya, bukan hasil yang tidak bisa dijanjikan siapa pun.',
        },
        {
          q: 'Apakah maklon termasuk produksi?',
          a: 'Ya. Kami juga menerima permintaan pengembangan dan maklon produk, termasuk produksinya. Kebutuhan formulasi, kemasan, regulasi, volume produksi dan proses implementasi akan dibahas berdasarkan produk yang ingin dikembangkan.',
        },
        {
          q: 'Bisakah bekerja dengan brand atau tim yang sudah ada?',
          a: 'Bisa. Kami bisa melanjutkan dari brand yang Anda miliki dan bekerja bersama tim internal atau partner lain.',
        },
        {
          q: 'Bagaimana cara memulainya?',
          a: 'Kirim pesan lewat WhatsApp atau ajukan konsultasi lewat formulir. Ceritakan sedikit tentang bisnis dan kebutuhan Anda.',
        },
      ],
    },
    consult: {
      title: 'Ceritakan kebutuhan Anda di sekitar sistem.',
      text: 'Pilih topik yang ingin didiskusikan. Satu topik sudah cukup untuk memulai.',
    },
  },

  pages: {
    social_media: {
      hero: {
        eyebrow: 'Pengelolaan Media Sosial',
        title: 'Bangun tampilan brand yang konsisten',
        highlight: 'setiap kali muncul di media sosial.',
        lead: 'Perencanaan konten, kreatif, copywriting dan alur publikasi untuk kanal media sosial Anda, agar brand tampil konsisten tanpa tim Anda harus mengurus setiap unggahan.',
        cta: 'Diskusikan Pengelolaan Media Sosial',
      },
      problem: {
        title: 'Produk dan jaringan sudah ada. Media sosialnya yang lebih sulit.',
        lead: 'Banyak brand direct selling mengunggah konten saat sempat, dengan gaya seadanya.',
        signals: [
          'Tampilan konten berbeda-beda dari satu unggahan ke unggahan lain',
          'Jadwal unggah tidak teratur, tergantung siapa yang sempat',
          'Pesan brand berubah di setiap kampanye',
          'Tim internal tidak punya kapasitas untuk konten',
          'Materi kampanye tersebar di banyak orang dan folder',
        ],
      },
      scope: {
        title: 'Area yang bisa kami tangani untuk kanal media sosial Anda.',
        lead: 'Kita sepakati mana yang Anda butuhkan. Kebanyakan brand tidak butuh semuanya.',
        items: [
          { title: 'Perencanaan konten', text: 'Tema bulanan seputar produk dan kampanye Anda.' },
          { title: 'Arahan konten', text: 'Gaya bahasa, gaya visual dan pesan brand.' },
          { title: 'Produksi kreatif', text: 'Desain, video pendek dan materi visual.' },
          { title: 'Copywriting', text: 'Caption dan pesan dengan suara brand Anda.' },
          { title: 'Dukungan kampanye', text: 'Konten untuk peluncuran, promo dan acara.' },
          { title: 'Alur publikasi', text: 'Langkah tinjauan, persetujuan dan penjadwalan.' },
          {
            title: 'Tinjauan performa',
            text: 'Evaluasi rutin: apa yang berhasil dan apa yang perlu diubah.',
          },
        ],
      },
      process: {
        title: 'Ritme bulanan yang bisa diikuti tim Anda.',
        steps: [
          { title: 'Arahan bulanan', text: 'Fokus bulan ini, disepakati bersama Anda.' },
          { title: 'Tema konten', text: 'Tema yang mendukung produk dan kampanye.' },
          { title: 'Kreatif', text: 'Visual dan video untuk setiap tema.' },
          { title: 'Copy', text: 'Caption dengan suara brand Anda.' },
          { title: 'Tinjauan', text: 'Anda menyetujui sebelum apa pun diunggah.' },
          { title: 'Publikasi', text: 'Konten tayang sesuai jadwal yang disepakati.' },
          { title: 'Evaluasi', text: 'Yang berhasil membentuk rencana bulan berikutnya.' },
        ],
      },
      audience: {
        title: 'Cocok ketika brand butuh kehadiran yang stabil.',
        items: [
          'Brand yang belum punya tim konten khusus',
          'Perusahaan yang meluncurkan produk atau kampanye baru',
          'Bisnis yang distributornya butuh konten konsisten untuk dibagikan',
        ],
      },
      context: {
        title: 'Konten untuk jaringan, bukan hanya untuk follower.',
        lead: 'Dalam direct selling, kanal media sosial Anda juga menjadi sumber konten yang dibagikan distributor ke kenalan mereka.',
        items: [
          'Edukasi produk yang bisa dipakai ulang distributor',
          'Cerita brand yang tetap konsisten di seluruh jaringan',
          'Konten kampanye untuk peluncuran dan promo',
        ],
      },
      visual: {
        label: 'Konsep: kalender konten bulanan',
        month: 'Arahan bulanan',
        direction: 'Bulan edukasi produk',
        themes: 'Tema konten',
        themeList: ['Manfaat produk', 'Cerita distributor', 'Di balik layar'],
        days: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum'],
        posts: [
          { type: 'Carousel', title: 'Cara memakai produk', status: 'Terjadwal' },
          { type: 'Reel', title: 'Sehari di gudang', status: 'Ditinjau' },
          { type: 'Post', title: 'Cerita distributor', status: 'Draf' },
          { type: 'Story', title: 'Hitung mundur peluncuran', status: 'Terjadwal' },
          { type: 'Carousel', title: 'Mengenal bahan produk', status: 'Ditinjau' },
        ],
      },
      mid: {
        title: 'Ingin kehadiran media sosial yang lebih stabil?',
        text: 'Ceritakan kondisi kanal Anda saat ini dan apa yang ingin dicapai.',
        whatsapp: 'Diskusikan Pengelolaan Media Sosial',
      },
      related: {
        text: 'Konten media sosial paling kuat bila dibangun di atas brand yang jelas.',
        keys: ['branding', 'paid_advertising'],
      },
      faq: {
        title: 'Pertanyaan seputar pengelolaan media sosial',
        items: [
          {
            q: 'Berapa jumlah unggahan yang termasuk?',
            a: 'Itu bergantung pada cakupan yang kita sepakati. Tidak ada paket tetap di situs ini.',
          },
          {
            q: 'Apakah pertambahan follower atau engagement dijanjikan?',
            a: 'Tidak. Kami merencanakan dan memproduksi konten yang konsisten lalu meninjau apa yang berhasil; pertumbuhan audiens bergantung pada banyak faktor di luar kendali siapa pun.',
          },
          {
            q: 'Siapa yang menyetujui konten?',
            a: 'Anda. Tidak ada yang diunggah sebelum ditinjau tim Anda.',
          },
          {
            q: 'Bisakah bekerja dengan konten yang sudah dibuat tim kami?',
            a: 'Bisa. Kami bisa merencanakan di sekitar konten yang ada dan melengkapi kekurangannya.',
          },
        ],
      },
      consult: {
        title: 'Ceritakan tentang kanal media sosial Anda.',
        text: 'Kanal apa yang dipakai, seberapa sering mengunggah saat ini, dan apa yang ingin diubah.',
      },
    },

    seo: {
      hero: {
        eyebrow: 'SEO & Konten',
        title: 'Bangun konten yang lebih mudah',
        highlight: 'ditemukan calon pelanggan.',
        lead: 'Riset intensi pencarian, strategi konten dan SEO on-page yang membantu calon pelanggan dan calon distributor menemukan bisnis Anda. Kanal jangka panjang, dibangun bertahap.',
        cta: 'Diskusikan SEO & Konten',
      },
      problem: {
        title: 'Orang mencari dulu sebelum membeli atau bergabung. Apakah bisnis Anda ada di sana?',
        lead: 'Banyak brand direct selling hanya mengandalkan jaringan, dan sulit ditemukan oleh orang di luar jaringan itu.',
        signals: [
          'Website jarang membahas hal yang dicari orang',
          'Pertanyaan tentang produk dijawab di chat, bukan di website',
          'Artikel ditulis tanpa tahu apa yang dicari orang',
          'Tidak ada yang mengecek apakah konten mendatangkan pengunjung',
        ],
      },
      scope: {
        title: 'Area yang bisa kami tangani untuk pencarian dan konten.',
        lead: 'Kita sepakati mana yang sesuai tahap bisnis Anda. Pencarian adalah kanal jangka panjang, bukan tombol instan.',
        items: [
          { title: 'Riset kata kunci', text: 'Apa yang benar-benar diketik pelanggan Anda.' },
          {
            title: 'Pemetaan intensi pencarian',
            text: 'Pertanyaan apa yang harus dijawab setiap halaman.',
          },
          { title: 'Strategi konten', text: 'Topik, prioritas dan rencana publikasi.' },
          { title: 'SEO on-page', text: 'Judul, struktur halaman dan tautan internal.' },
          { title: 'Tinjauan SEO teknis', text: 'Kendala yang membuat halaman sulit ditemukan.' },
          {
            title: 'Artikel SEO',
            text: 'Artikel bermanfaat yang ditulis untuk manusia lebih dulu.',
          },
          {
            title: 'Optimasi landing page',
            text: 'Halaman yang menjawab pencarian dan mengundang kontak.',
          },
          {
            title: 'Tinjauan performa konten',
            text: 'Konten mana yang ditemukan, dibaca dan ditindaklanjuti.',
          },
        ],
      },
      process: {
        title: 'Dari apa yang dicari orang ke konten yang menjawabnya.',
        steps: [
          { title: 'Intensi pencarian', text: 'Apa yang ingin diketahui atau dilakukan orang.' },
          { title: 'Topik', text: 'Pokok bahasan yang sebaiknya dikuasai bisnis Anda.' },
          { title: 'Konten', text: 'Artikel dan halaman yang menjawabnya dengan baik.' },
          { title: 'Landing page', text: 'Tempat pembaca mengambil langkah berikutnya.' },
          { title: 'Pengukuran', text: 'Apa yang ditemukan dan dibaca, ditinjau berkala.' },
        ],
      },
      audience: {
        title: 'Cocok ketika Anda ingin ditemukan, bukan hanya direferensikan.',
        items: [
          'Brand yang ingin mudah ditemukan lewat pencarian dalam jangka panjang',
          'Bisnis yang produknya banyak memunculkan pertanyaan',
          'Perusahaan yang tidak ingin hanya bergantung pada iklan berbayar',
        ],
      },
      context: {
        title: 'Konten pencarian yang sesuai untuk bisnis jaringan.',
        lead: 'SEO bukan sekadar urusan teknis mesin pencari. Untuk brand direct selling, tema yang berguna antara lain:',
        items: [
          'Edukasi produk: cara kerja dan cara memakainya',
          'Edukasi peluang bisnis, dijelaskan dengan jujur',
          'Konten yang bisa dibagikan distributor ke kenalannya',
          'Nama brand Anda, saat orang mencarinya',
          'Pertanyaan pelanggan sebelum order pertama',
        ],
      },
      visual: {
        label: 'Konsep: dari intensi pencarian sampai pengukuran',
        columns: {
          intent: 'Intensi pencarian',
          topic: 'Topik',
          content: 'Konten',
          landing: 'Landing page',
          measure: 'Pengukuran',
        },
        queries: [
          'cara pakai [produk]',
          '[produk] untuk sehari-hari',
          'cara jadi distributor [brand]',
        ],
        pillar: 'Edukasi produk',
        pieces: ['Panduan', 'Artikel FAQ', 'Video cara pakai'],
        landing: 'Halaman produk dengan tombol tanya via WhatsApp',
        measures: ['Visibilitas pencarian', 'Halaman dibaca', 'Pertanyaan masuk'],
      },
      mid: {
        title: 'Ingin bisnis Anda lebih mudah ditemukan?',
        text: 'Ceritakan kondisi website Anda saat ini dan pertanyaan yang sering diajukan pelanggan.',
        whatsapp: 'Diskusikan SEO & Konten',
      },
      related: {
        text: 'Konten pencarian dan kampanye iklan sering saling mendukung.',
        keys: ['paid_advertising', 'social_media'],
      },
      faq: {
        title: 'Pertanyaan seputar SEO & konten',
        items: [
          {
            q: 'Bisakah posisi tertentu di Google dijanjikan?',
            a: 'Tidak. Posisi bergantung pada persaingan, waktu dan perubahan dari mesin pencari. Kami mengerjakan hal yang bisa dikendalikan: konten yang bermanfaat, website yang sehat dan tinjauan rutin.',
          },
          {
            q: 'Berapa lama sampai SEO terasa hasilnya?',
            a: 'SEO terbangun dalam hitungan bulan, bukan minggu, dan setiap pasar berbeda. Perkembangannya kita tinjau bersama di sepanjang jalan.',
          },
          {
            q: 'Apakah artikelnya juga ditulis?',
            a: 'Penulisan bisa masuk dalam cakupan, atau kami merencanakan konten yang ditulis tim Anda.',
          },
          {
            q: 'Apakah SEO cocok untuk bisnis direct selling?',
            a: 'Cocok, selama kontennya menjawab pertanyaan nyata tentang produk dan bisnisnya dengan jujur.',
          },
        ],
      },
      consult: {
        title: 'Ceritakan tentang website dan target pencarian Anda.',
        text: 'Website Anda, produk Anda, dan siapa yang ingin Anda jangkau.',
      },
    },

    paid_advertising: {
      hero: {
        eyebrow: 'Iklan Digital',
        title: 'Kelola iklan sebagai',
        highlight: 'kanal pertumbuhan yang lebih terarah.',
        lead: 'Perencanaan kampanye, strategi audiens, arahan kreatif dan penyelarasan landing page, agar setiap kampanye punya tujuan yang jelas dan ditinjau berdasarkan tujuan itu.',
        cta: 'Diskusikan Target Iklan Anda',
      },
      problem: {
        title: 'Iklan mudah dimulai, tapi tidak mudah dijalankan dengan baik.',
        lead: 'Tanpa rencana, anggaran habis untuk boost post dan tidak ada yang tahu hasilnya.',
        signals: [
          'Kampanye dimulai tanpa tujuan yang jelas',
          'Audiens yang sama dipakai untuk setiap produk',
          'Iklan mengarah ke halaman yang tidak sesuai penawarannya',
          'Pengeluaran tidak ditinjau terhadap pertanyaan yang masuk',
        ],
      },
      scope: {
        title: 'Area yang bisa kami tangani untuk kampanye iklan.',
        lead: 'Kita sepakati mana yang Anda butuhkan, di platform yang sesuai dengan pasar Anda.',
        items: [
          { title: 'Perencanaan kampanye', text: 'Tujuan, waktu dan struktur kampanye.' },
          { title: 'Strategi audiens', text: 'Siapa yang perlu dijangkau setiap kampanye.' },
          { title: 'Arahan kreatif', text: 'Konsep dan pesan yang akan diuji.' },
          {
            title: 'Penyelarasan landing page',
            text: 'Halaman yang sesuai dengan iklan dan penawarannya.',
          },
          { title: 'Setup kampanye', text: 'Pelacakan dan struktur kampanye yang rapi.' },
          { title: 'Struktur anggaran', text: 'Cara anggaran dibagi dan disesuaikan.' },
          { title: 'Optimasi', text: 'Perubahan berdasarkan apa yang ditunjukkan data.' },
          {
            title: 'Laporan',
            text: 'Laporan yang jelas tentang pengeluaran dan pertanyaan masuk.',
          },
        ],
      },
      process: {
        title: 'Rencana kampanye sebelum anggaran dikeluarkan.',
        steps: [
          { title: 'Tujuan', text: 'Apa yang ingin dicapai kampanye.' },
          { title: 'Audiens', text: 'Siapa yang ingin dijangkau.' },
          { title: 'Kreatif', text: 'Apa yang akan mereka lihat.' },
          { title: 'Landing page', text: 'Ke mana mereka diarahkan.' },
          { title: 'Pertanyaan masuk', text: 'Bagaimana mereka menghubungi Anda.' },
          { title: 'Pengukuran', text: 'Apa yang dilacak dan ditinjau.' },
        ],
      },
      audience: {
        title: 'Cocok ketika Anda siap membayar untuk menjangkau lebih luas.',
        items: [
          'Bisnis yang siap menjangkau pelanggan baru lewat iklan berbayar',
          'Brand yang meluncurkan produk atau kampanye',
          'Tim yang sudah beriklan tetapi belum punya struktur yang jelas',
        ],
      },
      context: {
        title: 'Iklan yang menghargai cara bisnis jaringan berjualan.',
        lead: 'Dalam direct selling, kampanye bisa ditujukan untuk pelanggan, calon distributor, atau keduanya. Kami merencanakannya dengan memperhatikan hal itu:',
        items: [
          'Kampanye untuk pelanggan dan untuk calon distributor dipisahkan',
          'Pesan dan penawaran yang selaras dengan yang disampaikan distributor',
          'Pertanyaan yang masuk diarahkan ke tim atau distributor yang tepat',
        ],
      },
      visual: {
        label: 'Konsep: rencana kampanye, sebelum anggaran dikeluarkan',
        title: 'Rencana kampanye',
        rows: [
          { label: 'Tujuan', value: 'Pertanyaan dari pelanggan baru untuk peluncuran produk' },
          { label: 'Audiens', value: 'Audiens berbasis minat di wilayah peluncuran' },
          {
            label: 'Kreatif',
            value: 'Dua konsep untuk dibandingkan: video demo dan carousel cara pakai',
          },
          { label: 'Landing page', value: 'Halaman produk dengan tombol tanya via WhatsApp' },
          { label: 'Pengukuran', value: 'Biaya per pertanyaan masuk dan kualitas pertanyaannya' },
        ],
        funnel: ['Audiens', 'Kreatif', 'Landing page', 'Pertanyaan masuk'],
      },
      mid: {
        title: 'Sedang merencanakan kampanye berikutnya?',
        text: 'Ceritakan apa yang ingin dipromosikan dan siapa yang ingin dijangkau.',
        whatsapp: 'Diskusikan Target Iklan Anda',
      },
      related: {
        text: 'Kampanye bekerja lebih baik dengan brand yang jelas dan halaman yang dibangun untuk pencarian.',
        keys: ['branding', 'seo'],
      },
      faq: {
        title: 'Pertanyaan seputar iklan digital',
        items: [
          {
            q: 'Bisakah imbal hasil iklan dijanjikan?',
            a: 'Tidak. Hasil bergantung pada produk, penawaran, pasar dan anggaran. Kami merencanakan, menjalankan dan meninjau kampanye berdasarkan tujuan yang jelas.',
          },
          {
            q: 'Platform apa saja yang dipakai?',
            a: 'Platform yang sesuai dengan pasar dan audiens Anda, disepakati saat perencanaan.',
          },
          {
            q: 'Apakah anggaran iklan termasuk di dalamnya?',
            a: 'Anggaran iklan dan biaya pengelolaan dibahas terpisah sebagai bagian dari cakupan. Tidak ada persentase tetap di situs ini.',
          },
          {
            q: 'Apakah materi iklannya juga dibuatkan?',
            a: 'Arahan kreatif adalah bagian dari layanan; produksinya bisa masuk dalam cakupan.',
          },
        ],
      },
      consult: {
        title: 'Ceritakan target iklan Anda.',
        text: 'Apa yang ingin dipromosikan, di mana pelanggan Anda berada, dan iklan apa yang berjalan saat ini.',
      },
    },

    branding: {
      hero: {
        eyebrow: 'Branding & Kreatif',
        title: 'Bangun brand yang',
        highlight: 'lebih mudah dikenali pasar.',
        lead: 'Strategi brand, identitas visual dan materi yang membawanya: arahan kemasan, visual kampanye dan materi pemasaran yang terlihat dari satu perusahaan.',
        cta: 'Diskusikan Brand Anda',
      },
      problem: {
        title: 'Brand mudah dikenali ketika tampil dan terdengar sama di mana pun.',
        lead: 'Banyak brand jaringan tumbuh lebih cepat daripada identitasnya, dan setiap distributor akhirnya punya versinya sendiri.',
        signals: [
          'Logo dan warna berbeda di tiap materi',
          'Kemasan, website dan media sosial terasa seperti perusahaan berbeda',
          'Distributor membuat materinya sendiri',
          'Brand sudah tidak sesuai dengan produk atau pasarnya',
        ],
      },
      scope: {
        title: 'Area yang bisa kami tangani untuk brand Anda.',
        lead: 'Dari identitas lengkap sampai penyegaran yang terfokus. Cakupannya kita sepakati bersama.',
        items: [
          { title: 'Strategi brand', text: 'Untuk siapa brand ini dan apa yang diperjuangkannya.' },
          { title: 'Identitas visual', text: 'Sistem di balik setiap materi.' },
          { title: 'Logo', text: 'Tanda yang berfungsi di setiap ukuran dan tempat.' },
          { title: 'Sistem warna', text: 'Warna yang tepat untuk cetak dan layar.' },
          { title: 'Tipografi', text: 'Huruf untuk judul, teks dan kemasan.' },
          { title: 'Arahan kemasan', text: 'Cara identitas diterapkan pada produk.' },
          { title: 'Visual kampanye', text: 'Key visual untuk peluncuran dan promo.' },
          { title: 'Materi pemasaran', text: 'Materi yang bisa dipakai distributor.' },
        ],
      },
      process: {
        title: 'Bisnisnya dulu, identitasnya menyusul.',
        steps: [
          { title: 'Bisnis', text: 'Apa yang Anda jual, dan bagaimana caranya.' },
          { title: 'Audiens', text: 'Siapa yang ingin Anda jangkau.' },
          { title: 'Positioning', text: 'Arti brand ini bagi mereka.' },
          { title: 'Identitas', text: 'Logo, warna, huruf dan gaya bahasa.' },
          { title: 'Penerapan', text: 'Kemasan, digital dan materi kampanye.' },
          { title: 'Konsistensi', text: 'Panduan agar semua orang memakainya dengan cara sama.' },
        ],
      },
      audience: {
        title: 'Cocok ketika brand masih baru atau sudah tidak sesuai.',
        items: [
          'Brand baru yang bersiap diluncurkan',
          'Brand yang perlu reposisi',
          'Jaringan yang distributornya memakai versi brand berbeda-beda',
        ],
      },
      context: {
        title: 'Brand yang bisa dibawa oleh distributor.',
        lead: 'Dalam direct selling, banyak orang ikut memperkenalkan brand Anda. Identitasnya harus tetap utuh:',
        items: [
          'Panduan yang cukup sederhana untuk diikuti distributor',
          'Materi yang bisa langsung dipakai tanpa didesain ulang',
          'Satu tampilan di kemasan, media sosial dan aplikasi member',
        ],
      },
      visual: {
        label: 'Contoh arah kreatif untuk brand fiktif',
        caption: 'Contoh arah kreatif',
        brand: 'YOUR BRAND',
        tagline: 'Sehat setiap hari',
        palette: 'Sistem warna',
        type: 'Tipografi',
        applications: 'Penerapan',
        items: ['Kemasan', 'Unggahan media sosial', 'Kartu nama'],
      },
      mid: {
        title: 'Siapkah brand Anda untuk tahap berikutnya?',
        text: 'Ceritakan kondisi brand Anda saat ini dan arah bisnis ke depan.',
        whatsapp: 'Diskusikan Brand Anda',
      },
      related: {
        text: 'Sudah punya brand tetapi butuh pelanggan baru? Lihat SEO dan Iklan Digital.',
        keys: ['seo', 'paid_advertising'],
      },
      faq: {
        title: 'Pertanyaan seputar branding',
        items: [
          {
            q: 'Apakah pendaftaran merek juga diurus?',
            a: 'Tidak. Pendaftaran merek adalah proses hukum; kami menyarankan konsultan merek untuk itu.',
          },
          {
            q: 'Bisakah brand kami disegarkan, bukan diganti?',
            a: 'Bisa. Banyak brand cukup membutuhkan penyegaran yang terfokus, bukan identitas baru.',
          },
          {
            q: 'Bisakah melihat hasil branding sebelumnya?',
            a: 'Contoh yang relevan kami tunjukkan saat konsultasi. Visual di halaman ini adalah contoh arah kreatif untuk brand fiktif.',
          },
          {
            q: 'Apakah kemasan juga didesain?',
            a: 'Arahan kemasan bisa masuk dalam cakupan; produksi kemasannya dibahas terpisah.',
          },
        ],
      },
      consult: {
        title: 'Ceritakan tentang brand Anda.',
        text: 'Apa yang Anda jual, untuk siapa, dan apa yang belum berjalan baik saat ini.',
      },
    },

    product_maklon: {
      hero: {
        eyebrow: 'Pengembangan & Maklon Produk',
        title: 'Ceritakan produk',
        highlight: 'yang ingin Anda buat.',
        lead: 'Kami menerima permintaan pengembangan dan maklon produk untuk bisnis MLM dan direct selling. Kami dapat membahas konsep produk, target pasar, kemasan, kebutuhan produksi, dan rencana peluncurannya bersama Anda.',
        cta: 'Konsultasi Maklon Produk',
      },
      problem: {
        title: 'Produk hadir lebih dulu sebelum jaringannya.',
        lead: 'Owner sering sudah punya ide produk, atau produk yang sudah ada, tetapi belum punya jalan yang jelas untuk mengembangkannya.',
        signals: [
          'Idenya jelas, langkah berikutnya belum',
          'Belum jelas apa saja yang dibutuhkan untuk mengembangkan produknya',
          'Kemasan dan positioning masih terbuka',
          'Produk perlu sesuai dengan cara jaringan akan menjualnya',
        ],
      },
      scope: {
        title: 'Area yang bisa didiskusikan saat product discovery.',
        lead: 'Topik untuk diskusi awal. Langkah berikutnya bergantung pada produk yang ingin Anda buat.',
        items: [
          { title: 'Ide produk', text: 'Produk apa, dan mengapa perlu ada.' },
          { title: 'Target pelanggan', text: 'Siapa yang membeli, dan siapa yang menjualnya.' },
          { title: 'Kategori produk', text: 'Jenis produk yang Anda bayangkan.' },
          { title: 'Kebutuhan formulasi', text: 'Apa yang perlu dikandung atau dilakukan produk.' },
          { title: 'Kemasan', text: 'Bentuk, tampilan dan cara pengirimannya.' },
          { title: 'Positioning', text: 'Apa yang membedakannya dari produk di pasar.' },
          { title: 'Volume produksi', text: 'Jumlah yang Anda bayangkan.' },
          {
            title: 'Kebutuhan regulasi',
            text: 'Apa yang mungkin dibutuhkan sebelum produk dijual.',
          },
          { title: 'Rencana peluncuran', text: 'Bagaimana dan kapan produk sampai ke jaringan.' },
        ],
      },
      process: {
        title: 'Dari ide menjadi konsep yang siap dikembangkan.',
        steps: [
          { title: 'Konsep', text: 'Ide, pelanggan dan alasan untuk membeli.' },
          { title: 'Kebutuhan', text: 'Apa yang dibutuhkan produk dan formulanya.' },
          { title: 'Kemasan', text: 'Tampilannya, dan cara pengirimannya.' },
          { title: 'Produksi', text: 'Kebutuhan produksi, dibahas sesuai produk Anda.' },
          { title: 'Rencana peluncuran', text: 'Cara produk sampai ke jaringan dan pelanggan.' },
        ],
      },
      audience: {
        title: 'Cocok ketika produknya masih dibentuk.',
        items: [
          'Owner yang mengembangkan produk untuk jaringan atau bisnisnya',
          'Brand yang menambah lini produk baru',
          'Bisnis yang meninjau ulang cara produknya dibuat',
        ],
      },
      transparency: {
        title: 'Yang kita bahas bersama.',
        lead: 'Kebutuhan formulasi, kemasan, regulasi, volume produksi dan proses implementasi akan dibahas berdasarkan produk yang ingin dikembangkan.',
        confirmed: {
          title: 'Yang ditawarkan halaman ini',
          items: [
            'Konsultasi tentang ide produk atau produk yang sudah Anda miliki',
            'Product discovery: topik-topik di atas, dibahas bersama Anda',
            'Branding dan sistem penjualan yang direncanakan di sekitar produk, bila Anda menginginkannya',
          ],
        },
        perProject: {
          title: 'Dibahas sesuai produk Anda',
          items: [
            'Formulasi dan kebutuhan produk',
            'Kemasan dan positioning',
            'Kebutuhan regulasi',
            'Volume produksi, waktu dan harga',
          ],
        },
      },
      visual: {
        label: 'Ilustrasi konsep: perjalanan produk dengan kemasan netral',
        caption: 'Ilustrasi konsep',
        brand: 'YOUR BRAND',
        product: 'PRODUCT CONCEPT',
        stages: ['Konsep', 'Kebutuhan', 'Kemasan', 'Rencana peluncuran'],
      },
      mid: {
        title: 'Sudah punya produk yang dibayangkan?',
        text: 'Ceritakan sampai mana idenya. Ide kasar pun titik awal yang baik.',
        whatsapp: 'Diskusikan Produk Anda',
      },
      related: {
        text: 'Setelah arah produknya jelas, branding dan sistem penjualan digital bisa direncanakan di sekitarnya.',
        keys: ['branding', 'social_media'],
      },
      faq: {
        title: 'Pertanyaan seputar pengembangan dan maklon produk',
        items: [
          {
            q: 'Apakah maklon termasuk produksi?',
            a: 'Permintaan maklon kami terima, termasuk produksinya. Kebutuhan formulasi, kemasan, regulasi, volume produksi dan proses implementasi akan dibahas berdasarkan produk yang ingin dikembangkan.',
          },
          {
            q: 'Produk apa saja yang bisa dikembangkan?',
            a: 'Ceritakan produk yang Anda bayangkan. Apa yang bisa dikembangkan, dan bagaimana caranya, dibahas berdasarkan produknya.',
          },
          {
            q: 'Bagaimana dengan registrasi produk?',
            a: 'Kebutuhan regulasi dibahas saat product discovery, berdasarkan produknya dan wilayah penjualannya.',
          },
          {
            q: 'Berapa minimum order-nya?',
            a: 'Jumlah minimum dan harga bergantung pada produknya dan dibahas bersama Anda.',
          },
        ],
      },
      consult: {
        title: 'Ceritakan tentang produk Anda.',
        text: 'Idenya, sudah sampai tahap mana, dan kapan ingin diluncurkan. Semua opsional kecuali data kontak Anda.',
      },
    },
  },

  crossLinks: {
    howWeDoIt: {
      text: 'Butuh dukungan branding, pemasaran atau produk?',
      link: 'Lihat Layanan',
    },
    ecommerce: {
      text: 'Butuh bantuan menyiapkan brand di sekitar toko online Anda?',
      link: 'Lihat Branding',
    },
  },
}

export default services
