import type en from '../en/personas'

const roles: (typeof en)['personas'] = {
  executives: {
    card: {
      problem: 'Angka datang terlambat, dan dari terlalu banyak tempat.',
      outcome: 'Lihat bagian bisnis yang sedang tumbuh dan bagian yang perlu perhatian.',
    },
    hero: {
      eyebrow: 'Untuk Owner & Eksekutif',
      title: 'Lihat kondisi bisnis',
      highlight: 'di balik pertumbuhan jaringan Anda.',
      lead: 'Pertumbuhan bukan sekadar menambah member. Owner perlu melihat penjualan, aktivitas jaringan, beban bonus dan risiko operasional sebelum mengambil keputusan berikutnya.',
      ctaLabel: 'Diskusikan bisnis Anda',
      concerns: [
        'Dari mana sebenarnya pertumbuhan kami datang?',
        'Bagian jaringan mana yang perlu perhatian?',
        'Berapa biayanya kalau sistem bonus kami diubah?',
      ],
    },
    matters: {
      title: 'Yang penting saat Anda menjalankan bisnis.',
      lead: 'Owner jarang butuh laporan tambahan. Yang dibutuhkan adalah konteks yang tepat di waktu yang tepat, supaya keputusan tidak harus menunggu akhir bulan.',
      items: [
        {
          title: 'Gambaran bisnis yang lebih jelas',
          text: 'Penjualan, member dan aktivitas jaringan terlihat bersama, bukan dirangkai dari ekspor data yang terpisah.',
        },
        {
          title: 'Konteks keputusan yang lebih jelas',
          text: 'Pahami apa yang ada di balik sebuah angka sebelum Anda bertindak.',
        },
        {
          title: 'Perencanaan bonus yang terstruktur',
          text: 'Ketahui biaya sistem bonus saat ini dan dampaknya jika ada perubahan.',
        },
        {
          title: 'Operasional yang lebih terkendali',
          text: 'Lebih sedikit jalan pintas manual antartim saat jaringan terus tumbuh.',
        },
        {
          title: 'Rencana pertumbuhan yang lebih mudah',
          text: 'Rencanakan wilayah, produk atau kampanye baru dari gambaran kondisi saat ini yang lebih jelas.',
        },
      ],
    },
    problems: {
      eyebrow: 'Terdengar familiar?',
      title: 'Masalah yang sering dialami owner.',
      lead: 'Jika salah satunya terasa akrab, itu titik awal yang baik untuk memulai diskusi.',
      items: [
        {
          title: 'Data kami tersebar di terlalu banyak tempat.',
          text: 'Data penjualan, member dan laporan operasional sering disimpan terpisah, sehingga setiap pertanyaan butuh orang untuk menggabungkannya.',
        },
        {
          title: 'Saya baru tahu ada masalah setelah tutup bulan.',
          text: 'Pemilik bisnis butuh informasi lebih awal, bukan baru setelah rekonsiliasi manual.',
        },
        {
          title: 'Jaringan terus tumbuh, tapi operasional makin berat.',
          text: 'Pertumbuhan bisa menambah pekerjaan manual jika proses di baliknya masih terpecah-pecah.',
        },
        {
          title: 'Mengubah compensation plan jadi proyek teknis.',
          text: 'Aturan bisnis perlu dipahami dulu sebelum dijadikan aturan di software.',
        },
      ],
    },
    approach: {
      eyebrow: 'Bisnis dulu, baru software.',
      title: 'Kami mulai dari cara bisnis Anda berjalan.',
      lead: 'Banyak diskusi software dimulai dari paket dan fitur. Kami mulai dari model bisnis Anda: cara Anda berjualan, cara jaringan tumbuh dan cara member dibayar.',
      steps: [
        { title: 'Model bisnis', text: 'Cara Anda berjualan, dan kepada siapa.' },
        {
          title: 'Jaringan & penjualan',
          text: 'Cara member bergabung, membeli dan membangun tim.',
        },
        { title: 'Compensation plan', text: 'Bonus, rank dan kualifikasi, aturan demi aturan.' },
        {
          title: 'Operasional',
          text: 'Siapa mengerjakan apa saat ini, dan bagian mana yang masih manual.',
        },
        { title: 'Kebutuhan laporan', text: 'Angka yang Anda pakai untuk menjalankan perusahaan.' },
        {
          title: 'Rencana implementasi',
          text: 'Apa yang dikerjakan lebih dulu, dan apa yang bisa menyusul.',
        },
      ],
    },
    areas: {
      title: 'Titik awal yang biasa dipilih owner.',
      lead: 'Mulailah dari pertanyaan terbesar Anda. Setiap area disusun mengikuti bisnis Anda.',
      items: [
        {
          title: 'Ringkasan bisnis',
          text: 'Bagaimana penjualan, member dan payout bisa disatukan dalam satu tampilan.',
          linkLabel: 'Lihat konsepnya',
        },
        {
          title: 'Compensation plan',
          text: 'Bagaimana bonus, rank dan kualifikasi Anda dipetakan bersama Anda.',
          linkLabel: 'Pelajari compensation plan',
        },
        {
          title: 'Struktur jaringan',
          text: 'Melihat penjualan dan rank di balik setiap cabang jaringan.',
          linkLabel: 'Lihat pratinjau jaringan',
        },
        {
          title: 'Cakupan dan harga',
          text: 'Hal-hal yang menentukan besar kecilnya implementasi untuk bisnis seperti milik Anda.',
          linkLabel: 'Perkirakan kebutuhan Anda',
        },
      ],
    },
    concept: {
      eyebrow: 'Konsep tampilan',
      title: 'Satu tampilan bisnis, disusun dari angka-angka Anda.',
      lead: 'Contoh hal-hal yang bisa dirangkum dalam satu ringkasan untuk owner. Metrik di layar Anda nantinya mengikuti model bisnis dan laporan yang Anda pakai saat ini.',
      caption: 'Konsep tampilan eksekutif · data contoh',
    },
    questions: {
      title: 'Pertanyaan yang biasa dibawa owner ke diskusi pertama.',
      lead: 'Tanyakan saja. Kami lebih suka menjawabnya di awal daripada setelah kontrak ditandatangani.',
      items: [
        'Bisakah sistemnya mengikuti compensation plan kami seperti yang berjalan sekarang?',
        'Apa yang berubah bagi distributor kami, dan bagaimana kami menjelaskannya kepada mereka?',
        'Berapa lama implementasi untuk bisnis sebesar kami?',
        'Apa saja yang perlu kami siapkan dari sisi kami?',
        'Bagaimana kami beralih dari sistem lama tanpa mengganggu member?',
      ],
    },
    connections: {
      title: 'Keputusan Anda berdampak ke setiap tim.',
      lead: 'Perubahan di tingkat pimpinan terasa di finance, di operasional, dan di apa yang dilihat distributor.',
      items: [
        'Aturan bonus baru mengubah apa yang harus direkonsiliasi dan dibayar oleh finance.',
        'Produk atau promo baru mengubah cara order dan member ditangani.',
        'Setiap perubahan sistem bonus harus masuk akal bagi orang yang berjualan.',
      ],
    },
    cta: {
      title: 'Model bisnis Anda kemungkinan lebih kompleks daripada sekadar daftar fitur.',
      text: 'Ceritakan cara kerja penjualan, jaringan dan compensation plan Anda. Kami mulai dari model bisnisnya dulu.',
      label: 'Konsultasi via WhatsApp',
    },
    faqTitle: 'Jawaban untuk owner.',
    faqs: [
      {
        q: 'Apakah kami harus tahu persis apa yang kami mau sebelum menghubungi Anda?',
        a: 'Tidak. Kebanyakan owner mulai dengan menceritakan cara bisnisnya berjalan dan di mana masalahnya. Memetakan detailnya adalah bagian dari pekerjaan yang kita lakukan bersama.',
      },
      {
        q: 'Bisakah Anda bekerja dengan compensation plan yang sudah kami punya?',
        a: 'Justru dari situ kami mulai. Kami petakan bonus, rank dan kualifikasi Anda aturan demi aturan bersama tim Anda, sebelum apa pun dibangun.',
      },
      {
        q: 'Apakah ada paket jadi yang bisa kami pilih?',
        a: 'Untuk saat ini belum. Cakupan bergantung pada ukuran jaringan, compensation plan, modul, integrasi dan migrasi Anda, jadi tim kami menyiapkan proposal sesuai kebutuhan Anda.',
      },
      {
        q: 'Siapa yang sebaiknya ikut di diskusi pertama?',
        a: 'Biasanya owner atau direktur, ditambah orang yang paling memahami compensation plan. Tim finance dan IT bisa bergabung setelah cakupannya lebih jelas.',
      },
    ],
    demo: {
      title: 'Mari bahas model bisnis Anda.',
      text: 'Ceritakan cara bisnis Anda berjalan saat ini. Tim kami akan membantu Anda melihat seperti apa model operasional yang lebih terhubung.',
    },
  },

  finance: {
    card: {
      problem: 'Satu pertanyaan soal payout bisa butuh berhari-hari untuk dijawab.',
      outcome: 'Kebutuhan komisi, payout, pajak dan rekonsiliasi jadi lebih jelas.',
    },
    hero: {
      eyebrow: 'Untuk Tim Finance',
      title: 'Buat setiap payout',
      highlight: 'lebih mudah dijelaskan.',
      lead: 'Struktur komisi, saldo wallet, kewajiban pajak dan penyesuaian bisa sulit direkonsiliasi jika aturan dasarnya tersebar di banyak sistem.',
      ctaLabel: 'Diskusikan kebutuhan finance',
      concerns: [
        'Angka ini dihitung dari mana?',
        'Apa saja yang siap dibayar minggu ini?',
        'Pajak apa yang berlaku untuk bonus ini?',
      ],
    },
    matters: {
      title: 'Yang penting bagi tim finance.',
      lead: 'Setiap angka harus bisa ditelusuri, setiap koreksi tercatat, dan setiap payout melewati persetujuan yang jelas.',
      items: [
        {
          title: 'Angka yang bisa ditelusuri',
          text: 'Setiap komisi bisa dilacak kembali ke order dan aturan di baliknya.',
        },
        {
          title: 'Payout yang terkendali',
          text: 'Tahapan yang jelas: dihitung, disetujui, lalu dibayar.',
        },
        {
          title: 'Koreksi yang tercatat',
          text: 'Refund dan penyesuaian meninggalkan jejak, bukan diubah diam-diam.',
        },
        {
          title: 'Konteks pajak',
          text: 'Pemotongan pajak dicatat per member dan periode, sesuai arahan konsultan pajak Anda.',
        },
        {
          title: 'Rekonsiliasi',
          text: 'Angka yang cocok antara komisi, wallet dan pembukuan Anda.',
        },
      ],
    },
    problems: {
      eyebrow: 'Setiap periode',
      title: 'Pertanyaan yang terus berulang di tim finance.',
      lead: 'Ini pertanyaan bisnis yang perlu dijawab setiap tim finance. Kami memakainya untuk memetakan kebutuhan Anda sebelum apa pun dibangun.',
      items: [
        {
          tag: 'Rekonsiliasi komisi',
          title: 'Angka ini dihitung dari mana?',
          text: 'Saat distributor mempertanyakan bonusnya, jawabannya tidak seharusnya berarti menghitung ulang secara manual.',
        },
        {
          tag: 'Penyesuaian & koreksi',
          title: 'Apa yang terjadi kalau order berubah?',
          text: 'Retur dan pembatalan setelah periode bonus bisa mengubah angka yang sudah dihitung.',
        },
        {
          tag: 'Payout',
          title: 'Mana yang masih pending, sudah disetujui, atau siap dibayar?',
          text: 'Persetujuan, penahanan dan transfer butuh status yang disepakati semua pihak.',
        },
        {
          tag: 'Pajak',
          title: 'Perlakuan pajak apa yang berlaku untuk transaksi ini?',
          text: 'Bonus dan reward bisa diperlakukan berbeda, dan konsultan pajak Anda membutuhkan catatan per member dan periode.',
        },
        {
          tag: 'Audit',
          title: 'Bisakah kami menelusuri alasan di balik sebuah angka?',
          text: 'Auditor dan manajemen ingin tahu mengapa sebuah angka muncul, bukan hanya berapa angkanya.',
        },
      ],
    },
    approach: {
      eyebrow: 'Pendekatan kami',
      title: 'Kami petakan alur keuangan sebelum implementasi.',
      lead: 'Sebelum sebuah aturan dijadikan software, kami menelusuri satu angka bersama tim finance Anda: dari transaksi yang memunculkannya sampai rekonsiliasi yang menutupnya.',
      steps: [
        { title: 'Transaksi', text: 'Order dibayar, diretur atau diubah.' },
        { title: 'Aturan bisnis', text: 'Aturan compensation plan mana yang berlaku.' },
        { title: 'Ketentuan komisi', text: 'Siapa yang memenuhi syarat, dan berapa besarnya.' },
        { title: 'Ketentuan pajak', text: 'Pemotongan pajak sesuai arahan konsultan Anda.' },
        { title: 'Persetujuan', text: 'Siapa yang memeriksa dan menyetujui, dengan urutan apa.' },
        { title: 'Payout', text: 'Bagaimana dan kapan member dibayar.' },
        { title: 'Rekonsiliasi', text: 'Komisi, wallet dan pembukuan Anda saling cocok.' },
      ],
      note: 'Beginilah kami menyusun diskusi desain. Langkah mana yang diotomatiskan dalam implementasi Anda disepakati pada tahap discovery.',
    },
    areas: {
      title: 'Tempat topik finance dibahas.',
      lead: 'Halaman compensation plan membahas lebih dalam bagaimana setiap angka dirancang agar bisa ditelusuri dan dikoreksi.',
      items: [
        {
          title: 'Compensation plan',
          text: 'Bagaimana bonus, kualifikasi dan rank dipetakan aturan demi aturan.',
          linkLabel: 'Pelajari compensation plan',
        },
        {
          title: 'Audit & reversal',
          text: 'Bagaimana refund dan koreksi dirancang agar meninggalkan jejak.',
          linkLabel: 'Lihat rancangan reversal',
        },
        {
          title: 'Wallet & pajak',
          text: 'Dari bonus ke wallet, dengan pemotongan pajak dicatat per member dan periode.',
          linkLabel: 'Lihat wallet & pajak',
        },
        {
          title: 'Saldo & payout',
          text: 'Bagaimana saldo, penahanan dana dan tahapan payout dirancang.',
          linkLabel: 'Lihat konsep wallet',
        },
      ],
    },
    concept: {
      eyebrow: 'Konsep alur kerja',
      title: 'Satu periode payout, dari review sampai rekonsiliasi.',
      lead: 'Contoh bagaimana tim finance bisa menuntaskan satu periode: komisi yang perlu dicek, koreksi yang perlu disetujui, konteks pajak, dan apa yang masih perlu direkonsiliasi.',
      caption: 'Konsep alur kerja finance · data contoh',
    },
    questions: {
      title: 'Yang ingin dipastikan tim finance sebelum memutuskan.',
      lead: 'Bawa pertanyaan ini ke diskusi pertama. Jawabannya lebih menentukan desain daripada daftar fitur mana pun.',
      items: [
        'Bagaimana sebuah komisi ditelusuri kembali ke order dan aturannya?',
        'Apa yang terjadi pada bonus yang sudah dibayar jika order-nya diretur belakangan?',
        'Siapa yang menyetujui payout, dan bisakah alur persetujuannya mengikuti kebijakan internal kami?',
        'Bagaimana pemotongan pajak dicatat, dan siapa yang menentukan tarifnya?',
        'Bagaimana rekonsiliasi dengan catatan akuntansi kami?',
      ],
    },
    connections: {
      title: 'Finance berada di tengah semua tim.',
      lead: 'Sebagian besar pertanyaan finance berawal dari bagian lain bisnis.',
      items: [
        'Retur dan koreksi order berawal di operasional dan berakhir di finance.',
        'Owner perlu melihat rasio payout dan kewajiban dalam konteks, bukan hanya totalnya.',
        'Member lebih percaya pada sistem bonus jika bisa melihat alasan sebuah angka berubah.',
      ],
    },
    cta: {
      title: 'Punya alur komisi atau payout yang sulit direkonsiliasi?',
      text: 'Tunjukkan kepada kami bagaimana satu angka dihitung saat ini, dari order sampai payout. Kami bantu Anda melihat di titik mana angka itu mulai sulit dijelaskan.',
      label: 'Diskusikan via WhatsApp',
    },
    faqTitle: 'Jawaban untuk tim finance.',
    faqs: [
      {
        q: 'Apakah Anda memberikan saran pajak?',
        a: 'Tidak. Tarif dan perlakuan pajak tetap ditentukan konsultan pajak Anda. Kami memastikan desainnya mencatat apa yang mereka butuhkan, per member dan periode.',
      },
      {
        q: 'Bisakah tim finance menyetujui payout sebelum dibayarkan?',
        a: 'Tahapan persetujuan adalah bagian dari diskusi desain. Kami petakan siapa memeriksa apa, dan dengan urutan apa, berdasarkan kebijakan internal Anda.',
      },
      {
        q: 'Bagaimana dengan data komisi historis kami?',
        a: 'Data apa yang bisa dimigrasikan, dan bagaimana data itu dicocokkan dengan catatan Anda saat ini, dinilai pada tahap discovery.',
      },
      {
        q: 'Bagaimana data sampai ke sistem akuntansi kami?',
        a: 'Beri tahu kami sistem akuntansi yang Anda gunakan. Bagaimana dan kapan data dikirim ke sana ditentukan bersama tim finance dan IT Anda.',
      },
    ],
    demo: {
      title: 'Mari petakan alur keuangan Anda bersama.',
      text: 'Ceritakan cara kerja komisi, payout dan pajak di bisnis Anda saat ini. Kami mulai dari satu angka dan menelusurinya sampai tuntas.',
    },
  },

  operations: {
    card: {
      problem: 'Tim Anda berpindah-pindah sistem hanya untuk menjawab satu pertanyaan.',
      outcome: 'Kurangi kerumitan operasional di balik member, order dan aktivitas jaringan.',
    },
    hero: {
      eyebrow: 'Untuk Tim Operasional',
      title: 'Lebih sedikit koordinasi manual.',
      highlight: 'Operasional lebih jelas.',
      lead: 'Onboarding member, order, perubahan jaringan dan permintaan support makin sulit dikelola seiring bisnis tumbuh.',
      ctaLabel: 'Diskusikan operasional Anda',
      concerns: [
        'Siapa yang masih menunggu verifikasi?',
        'Kenapa order ini tidak terhitung?',
        'Siapa sponsor member ini?',
      ],
    },
    matters: {
      title: 'Yang penting bagi tim operasional.',
      lead: 'Tim operasional menjaga bisnis tetap berjalan setiap hari. Mereka butuh lebih sedikit serah terima, status yang lebih jelas, dan satu tempat untuk memahami seorang member.',
      items: [
        {
          title: 'Satu tampilan per member',
          text: 'Profil, status, sponsor, order dan catatan, tanpa berpindah aplikasi.',
        },
        {
          title: 'Status yang jelas',
          text: 'Semua orang tahu mana yang pending, disetujui atau tertahan.',
        },
        {
          title: 'Lebih sedikit serah terima',
          text: 'Koreksi tidak perlu disepakati tiga departemen lewat chat.',
        },
        {
          title: 'Onboarding yang konsisten',
          text: 'Langkah yang sama jelasnya untuk setiap member baru.',
        },
        {
          title: 'Ruang untuk tumbuh',
          text: 'Proses yang tetap berjalan saat jaringan tumbuh dua kali lipat.',
        },
      ],
    },
    problems: {
      eyebrow: 'Sehari-hari',
      title: 'Di sinilah pekerjaan manual biasanya tersembunyi.',
      lead: 'Lima situasi yang membuat operasional harian lebih berat dari seharusnya.',
      items: [
        {
          title: 'Onboarding member butuh terlalu banyak langkah manual.',
          text: 'Pengecekan dokumen, penempatan member dan aktivasi akun sering tersebar di chat, spreadsheet dan layar admin.',
        },
        {
          title: 'Tim support berpindah-pindah sistem.',
          text: 'Satu pertanyaan dari distributor bisa berarti mencari di tiga tempat berbeda.',
        },
        {
          title: 'Status order sulit dikaitkan dengan aktivitas member.',
          text: 'Apakah order itu terhitung untuk periode ini? Jawabannya sering tergantung siapa yang ditanya.',
        },
        {
          title: 'Pertanyaan soal rank dan jaringan menyita waktu admin.',
          text: 'Menjelaskan penempatan, sponsor dan kualifikasi secara manual memakan waktu berjam-jam setiap minggu.',
        },
        {
          title: 'Koreksi melibatkan beberapa departemen.',
          text: 'Salah penempatan atau order yang diretur bisa melibatkan operasional, finance dan IT sekaligus.',
        },
      ],
    },
    approach: {
      eyebrow: 'Pendekatan kami',
      title: 'Rancang alur kerjanya dulu, baru otomatiskan.',
      lead: 'Mengotomatiskan proses yang berantakan hanya membuat kesalahan terjadi lebih cepat. Kami petakan dulu bagaimana pekerjaan benar-benar berjalan di tim Anda, lalu menentukan bagian mana yang sebaiknya diambil alih sistem.',
      steps: [
        { title: 'Member', text: 'Seseorang bergabung atau memperbarui datanya.' },
        { title: 'Verifikasi', text: 'Pengecekan yang diwajibkan bisnis Anda.' },
        { title: 'Transaksi', text: 'Order, retur dan pembayaran.' },
        { title: 'Konteks jaringan', text: 'Sponsor, penempatan dan tim.' },
        {
          title: 'Aturan bisnis',
          text: 'Apa yang seharusnya terjadi menurut compensation plan Anda.',
        },
        {
          title: 'Tindakan operasional',
          text: 'Apa yang dikerjakan tim Anda selanjutnya, dan oleh siapa.',
        },
      ],
    },
    areas: {
      title: 'Tempat topik operasional dibahas.',
      lead: 'Setiap area dipetakan sesuai cara kerja tim Anda saat ini.',
      items: [
        {
          title: 'Manajemen member',
          text: 'Profil, verifikasi, sponsor dan riwayat rank.',
          linkLabel: 'Lihat manajemen member',
        },
        {
          title: 'Order & ecommerce',
          text: 'Bagaimana order terkait dengan member dan compensation plan Anda.',
          linkLabel: 'Lihat ecommerce',
        },
        {
          title: 'Struktur jaringan',
          text: 'Mencari member dan memahami penempatan.',
          linkLabel: 'Lihat pratinjau jaringan',
        },
        {
          title: 'Implementasi',
          text: 'Bagaimana alur kerja dipetakan, diuji dan diterapkan.',
          linkLabel: 'Lihat cara kami mengimplementasikan',
        },
      ],
    },
    concept: {
      eyebrow: 'Konsep tampilan',
      title: 'Semua tentang seorang member, di satu tempat.',
      lead: 'Contoh tampilan member untuk tim operasional dan support: status, konteks jaringan, aktivitas terbaru dan catatan dari tim.',
      caption: 'Konsep tampilan operasional · data contoh',
    },
    questions: {
      title: 'Yang pertama ingin diketahui tim operasional.',
      lead: 'Bawa pertanyaan yang paling menyita waktu tim Anda. Dari situ kami mulai.',
      items: [
        'Langkah onboarding mana yang bisa disederhanakan atau digabung?',
        'Bagaimana tim support bisa melihat order dan jaringan seorang member di satu tempat?',
        'Siapa yang boleh mengoreksi penempatan, dan bagaimana koreksinya dicatat?',
        'Bagaimana retur ditangani jika periode bonus sudah ditutup?',
        'Apa yang perlu dipelajari tim kami sebelum go-live?',
      ],
    },
    connections: {
      title: 'Di operasional, pekerjaan semua tim bertemu.',
      lead: 'Apa yang terjadi di operasional jarang berhenti di operasional.',
      items: [
        'Setiap retur atau koreksi yang ditangani operasional akan sampai ke payout.',
        'Jawaban support yang lebih cepat dan jelas berarti lebih sedikit member yang kecewa.',
        'Integrasi logistik dan pembayaran membentuk pekerjaan operasional sehari-hari.',
      ],
    },
    cta: {
      title: 'Apakah tim Anda terlalu banyak berkoordinasi?',
      text: 'Ceritakan di mana pekerjaan manual masih terjadi: onboarding, order, perubahan jaringan atau support. Kami lihat alur kerjanya dulu sebelum bicara otomatisasi.',
      label: 'Diskusikan operasional Anda',
    },
    faqTitle: 'Jawaban untuk tim operasional.',
    faqs: [
      {
        q: 'Apakah tim kami perlu pelatihan?',
        a: 'Ya. Pelatihan untuk tim yang memakai sistem setiap hari adalah bagian dari implementasi, dan cakupannya disepakati bersama Anda.',
      },
      {
        q: 'Bisakah kami mempertahankan sebagian proses yang ada?',
        a: 'Sering kali bisa. Tujuannya bukan mengubah semuanya, melainkan menghilangkan langkah yang tidak perlu dikerjakan manual.',
      },
      {
        q: 'Bagaimana dengan data member dari sistem kami saat ini?',
        a: 'Data member dan genealogi biasanya didahulukan. Apa yang bisa dimigrasikan, dan bagaimana pengecekannya, dinilai pada tahap discovery.',
      },
      {
        q: 'Bisakah tim support dan operasional punya akses yang berbeda?',
        a: 'Siapa yang boleh melihat dan mengubah apa ditentukan per peran saat desain, berdasarkan cara kerja tim Anda.',
      },
    ],
    demo: {
      title: 'Mari lihat operasional harian Anda.',
      text: 'Ceritakan bagaimana member, order dan permintaan support berjalan di tim Anda saat ini.',
    },
  },

  it: {
    card: {
      problem: 'Kejutan teknis baru muncul setelah pengembangan berjalan.',
      outcome: 'Rencanakan integrasi, kontrol akses dan kebutuhan teknis sebelum implementasi.',
    },
    hero: {
      eyebrow: 'Untuk Tim Teknologi',
      title: 'Perjelas kebutuhan teknis',
      highlight: 'sebelum implementasi.',
      lead: 'Integrasi, kontrol akses, migrasi data dan keputusan infrastruktur perlu dipahami sejak awal, bukan baru ditemukan setelah pengembangan dimulai.',
      ctaLabel: 'Hubungi tim kami',
      concerns: [
        'Sistem mana yang perlu bertukar data?',
        'Siapa boleh melihat dan mengubah apa?',
        'Seberapa rapi data kami saat ini?',
      ],
    },
    matters: {
      title: 'Yang penting bagi tim teknologi.',
      lead: 'Jawaban lugas: apa yang sudah ada, apa yang perlu dibangun, apa terhubung ke apa, dan siapa yang mengoperasikannya.',
      items: [
        {
          title: 'Cakupan yang jelas',
          text: 'Apa yang dikonfigurasi, apa yang dibangun dan apa yang diintegrasikan, semuanya tertulis.',
        },
        {
          title: 'Integrasi yang terpetakan',
          text: 'Setiap sistem eksternal didaftar beserta data yang dipertukarkan.',
        },
        {
          title: 'Akses yang terdefinisi',
          text: 'Peran dan hak akses disepakati sebelum akun dibuat.',
        },
        {
          title: 'Migrasi yang terencana',
          text: 'Data dinilai dan dicek sebelum dipindahkan.',
        },
        {
          title: 'Kebutuhan operasional',
          text: 'Tanggung jawab hosting, monitoring dan backup disepakati sejak awal.',
        },
      ],
    },
    problems: {
      eyebrow: 'Discovery teknis',
      title: 'Yang kami evaluasi bersama tim IT Anda.',
      lead: 'Kami membahas pertanyaan ini bersama-sama. Jawabannya membentuk rencana implementasi, jadi kami menanyakannya sejak awal.',
      items: [
        {
          title: 'Kebutuhan integrasi',
          text: 'Sistem eksternal apa saja yang perlu bertukar data?',
        },
        { title: 'Autentikasi', text: 'Siapa saja yang membutuhkan akses, dan sampai level apa?' },
        { title: 'Migrasi data', text: 'Data apa yang ada saat ini, dan seberapa rapi?' },
        { title: 'Hak akses', text: 'Tim mana yang boleh melihat atau mengubah informasi apa?' },
        {
          title: 'Infrastruktur',
          text: 'Skala dan kebutuhan operasional apa yang perlu direncanakan?',
        },
        { title: 'Jejak audit', text: 'Perubahan mana yang riwayatnya perlu bisa ditelusuri?' },
      ],
    },
    approach: {
      eyebrow: 'Cara kami bekerja',
      title: 'Kebutuhan dulu, baru arsitektur.',
      lead: 'Kami mendokumentasikan lanskap teknis Anda sebelum mengusulkan arsitektur, supaya keputusan berdasar fakta, bukan asumsi.',
      steps: [
        { title: 'Kondisi saat ini', text: 'Sistem yang dipakai sekarang, dan siapa pemiliknya.' },
        { title: 'Peta integrasi', text: 'Data apa berpindah ke mana, dan seberapa sering.' },
        { title: 'Model akses', text: 'Peran, hak akses dan tahapan persetujuan.' },
        { title: 'Penilaian data', text: 'Apa yang ada, seberapa rapi, apa yang dipindahkan.' },
        { title: 'Rencana operasional', text: 'Tanggung jawab hosting, monitoring dan backup.' },
        { title: 'Uji penerimaan', text: 'Bagaimana hasilnya diuji terhadap angka Anda.' },
      ],
      note: 'Kami sampaikan apa yang sudah ada saat ini dan apa yang perlu dibangun, topik demi topik.',
    },
    areas: {
      title: 'Tempat topik teknis dibahas.',
      lead: 'Mulai dari topik yang paling dulu akan ditanyakan kepada tim Anda.',
      items: [
        {
          title: 'Integrasi',
          text: 'Aplikasi yang Anda pakai saat ini dan kemungkinan cara menghubungkannya.',
          linkLabel: 'Pelajari perencanaan integrasi',
        },
        {
          title: 'Pertanyaan keamanan',
          text: 'Topik keamanan yang kami bahas sebelum Anda memutuskan.',
          linkLabel: 'Lihat topik keamanan',
        },
        {
          title: 'Implementasi',
          text: 'Discovery, migrasi, pengujian dan go-live.',
          linkLabel: 'Lihat cara kami mengimplementasikan',
        },
        {
          title: 'Estimasi cakupan',
          text: 'Sampaikan kebutuhan integrasi dan migrasi dalam beberapa langkah.',
          linkLabel: 'Mulai estimasi',
        },
      ],
    },
    concept: {
      eyebrow: 'Contoh discovery',
      title: 'Lembar kerja discovery teknis.',
      lead: 'Contoh cara pertanyaan teknis dipantau bersama tim Anda: setiap topik, pertanyaan yang masih terbuka, dan sejauh mana diskusinya.',
      caption: 'Contoh lembar kerja discovery · jawaban contoh',
    },
    questions: {
      title: 'Yang pertama ingin dijawab tim IT.',
      lead: 'Kami menjawabnya topik demi topik, termasuk apa yang sudah ada saat ini dan apa yang belum.',
      items: [
        'Di mana sistem akan di-hosting, dan siapa yang mengoperasikannya?',
        'Integrasi mana yang dibutuhkan saat go-live, dan mana yang bisa menyusul?',
        'Bagaimana data dari sistem kami saat ini dimigrasikan dan diverifikasi?',
        'Bagaimana peran dan hak akses staf ditentukan dan ditinjau?',
        'Perubahan mana yang butuh jejak audit, dan untuk berapa lama?',
        'Siapa yang bertanggung jawab atas monitoring dan backup?',
      ],
    },
    connections: {
      title: 'Pilihan teknis membentuk pekerjaan setiap tim.',
      lead: 'Dampak keputusan arsitektur terasa jauh di luar tim IT.',
      items: [
        'Integrasi akuntansi dan pembayaran menentukan cara tim finance merekonsiliasi angka.',
        'Integrasi logistik dan layanan pesan mengubah pekerjaan operasional sehari-hari.',
        'Keputusan hosting dan skala memengaruhi biaya dan rencana pertumbuhan.',
      ],
    },
    cta: {
      title: 'Sudah punya sistem atau integrasi yang berjalan?',
      text: 'Diskusikan arsitekturnya dengan tim kami.',
      label: 'Diskusikan via WhatsApp',
    },
    faqTitle: 'Jawaban untuk tim teknologi.',
    faqs: [
      {
        q: 'Bisakah kami meninjau dokumentasi teknis sebelum memutuskan?',
        a: 'Sampaikan apa yang perlu ditinjau tim Anda. Apa yang bisa dibagikan, dan kapan, disepakati dalam diskusi teknis.',
      },
      {
        q: 'Pilihan login dan akses apa saja yang ada?',
        a: 'Kebutuhan akses seperti peran, tahapan persetujuan dan metode login adalah bagian dari diskusi teknis. Kami sampaikan apa yang sudah ada saat ini dan apa yang perlu dibangun.',
      },
      {
        q: 'Di mana sistem akan di-hosting?',
        a: 'Tanggung jawab hosting dan operasional disepakati pada tahap discovery, berdasarkan kebutuhan Anda.',
      },
      {
        q: 'Bagaimana migrasi data dicek?',
        a: 'Migrasi direncanakan dengan pengecekan rekonsiliasi: data dan total dari sistem Anda saat ini dibandingkan sebelum go-live.',
      },
    ],
    demo: {
      title: 'Mari bahas lanskap teknis Anda.',
      text: 'Ceritakan sistem apa saja yang Anda jalankan saat ini dan apa yang perlu dihubungkan. Kami bantu Anda menyusun kebutuhannya.',
    },
  },

  distributors: {
    card: {
      problem: 'Member bertanya ke support untuk hal yang sebenarnya bisa mereka lihat sendiri.',
      outcome: 'Bantu member memahami aktivitas, jaringan dan progres mereka dengan lebih jelas.',
    },
    hero: {
      eyebrow: 'Pengalaman Distributor',
      title: 'Buat progres lebih mudah',
      highlight: 'dipahami member Anda.',
      lead: 'Distributor tidak perlu selalu bertanya ke tim support setiap kali ingin memahami aktivitas, jaringan atau target berikutnya.',
      ctaLabel: 'Diskusikan pengalaman member Anda',
      concerns: [
        'Kurang berapa lagi saya naik ke Gold?',
        'Kenapa bonus saya bulan ini berbeda?',
        'Link referral saya di mana?',
      ],
    },
    matters: {
      title: 'Yang ingin diketahui member Anda.',
      lead: 'Distributor sibuk berjualan dan membangun tim. Pengalaman yang Anda berikan seharusnya menjawab pertanyaan sehari-hari mereka dalam sekali lihat.',
      items: [
        {
          title: 'Posisi mereka saat ini',
          text: 'Aktivitas dan volume mereka di periode berjalan.',
        },
        { title: 'Langkah berikutnya', text: 'Rank berikutnya, dan persis apa syaratnya.' },
        {
          title: 'Alasan angka berubah',
          text: 'Penghasilan dengan konteks yang cukup untuk dipahami.',
        },
        {
          title: 'Tim mereka',
          text: 'Siapa yang bergabung, siapa yang aktif dan siapa yang butuh bantuan.',
        },
        { title: 'Mudah dibagikan', text: 'Link referral yang selalu mudah dijangkau.' },
      ],
    },
    problems: {
      eyebrow: 'Inbox support Anda',
      title: 'Pertanyaan yang didengar tim support Anda setiap hari.',
      lead: 'Setiap pertanyaan menandakan ada hal yang dibutuhkan member tapi tidak bisa mereka lihat. Setiap jawaban yang bisa mereka temukan sendiri berarti satu tiket berkurang.',
      items: [
        { title: 'Masih berapa jauh saya dari rank berikutnya?', text: 'Progres rank' },
        { title: 'Kenapa bonus saya bulan ini lebih kecil?', text: 'Penghasilan' },
        { title: 'Order terakhir saya terhitung untuk periode ini?', text: 'Order' },
        { title: 'Siapa yang bergabung ke tim saya minggu ini?', text: 'Jaringan' },
        { title: 'Link referral saya ada di mana?', text: 'Referral' },
      ],
    },
    approach: {
      eyebrow: 'Pendekatan kami',
      title: 'Dirancang mengikuti momen penting bagi member.',
      lead: 'Kami petakan perjalanan member bersama Anda, dari order pertama sampai rank berikutnya, lalu menentukan apa yang perlu dilihat member di setiap tahap.',
      steps: [
        { title: 'Bergabung', text: 'Registrasi dan langkah pertama yang jelas.' },
        { title: 'Order pertama', text: 'Tahu apa yang terhitung, dan alasannya.' },
        { title: 'Membangun tim', text: 'Melihat siapa yang bergabung dan siapa yang aktif.' },
        { title: 'Memantau progres', text: 'Syarat rank yang bisa dilihat kapan saja.' },
        { title: 'Memahami penghasilan', text: 'Angka dengan konteks, bukan hanya total.' },
        { title: 'Mendapat reward', text: 'Poin, reward dan penghargaan.' },
      ],
    },
    areas: {
      title: 'Area pengalaman yang kami rancang bersama Anda.',
      lead: 'Pilih area yang penting bagi member Anda. Setiap area disusun bersama Anda, bukan sekadar diaktifkan dari template.',
      items: [
        { title: 'Aktivitas Saya', text: 'Penjualan, volume dan status.' },
        { title: 'Jaringan', text: 'Tim, level dan member baru.' },
        { title: 'Progres Rank', text: 'Rank berikutnya dan syarat yang tersisa.' },
        { title: 'Konteks penghasilan', text: 'Bonus beserta alasan di baliknya.' },
        { title: 'Referral', text: 'Link pribadi untuk dibagikan.' },
        { title: 'Order', text: 'Riwayat dan status order.' },
        { title: 'Reward', text: 'Poin, kampanye dan reward.' },
        { title: 'Profil', text: 'Data pribadi dan verifikasi.' },
      ],
      related: [
        'Bagaimana syarat rank dirancang',
        'Masukkan pengalaman member ke dalam estimasi Anda',
      ],
    },
    concept: {
      eyebrow: 'Contoh tampilan',
      title: 'Progres yang bisa dipahami member dalam sekali lihat.',
      lead: 'Contoh layar utama member: progres rank, angka-angka kunci dan link referral. Nama member, angka dan target semuanya data contoh.',
      caption: 'Contoh tampilan · bukan data pelanggan sebenarnya',
    },
    questions: {
      title: 'Keputusan yang perlu diambil soal pengalaman member.',
      lead: 'Member Anda yang akan memakainya, jadi keputusan ini sebaiknya diambil sejak awal.',
      items: [
        'Apa yang pertama kali dilihat member saat membuka aplikasi?',
        'Seberapa banyak isi compensation plan yang perlu dilihat member?',
        'Bagaimana menjelaskan perubahan penghasilan tanpa menambah beban tim support?',
        'Sebaiknya berupa aplikasi mobile, aplikasi web, atau keduanya?',
        'Bagaimana memperkenalkannya ke member yang sudah ada?',
      ],
    },
    connections: {
      title: 'Apa yang dilihat member bergantung pada setiap tim di belakangnya.',
      lead: 'Pengalaman member yang jelas dibangun dari pekerjaan yang akurat di bagian lain bisnis.',
      items: [
        'Order dan penempatan yang akurat dari tim operasional.',
        'Penghasilan yang bisa dipercaya member, karena finance bisa menjelaskannya.',
        'Pengalaman member yang lebih baik ikut mendorong pertumbuhan jaringan.',
      ],
    },
    cta: {
      title: 'Apa yang perlu dilihat member saat membuka aplikasi?',
      text: 'Ceritakan cara member Anda berjualan, merekrut dan mencapai kualifikasi saat ini. Kami bantu Anda merancang pengalaman di sekitar momen-momen itu.',
      label: 'Konsultasi via WhatsApp',
    },
    faqTitle: 'Jawaban seputar pengalaman member.',
    faqs: [
      {
        q: 'Ini aplikasi mobile atau website?',
        a: 'Itu diputuskan bersama Anda. Formatnya bergantung pada member Anda, cara mereka berjualan, dan cakupan implementasi Anda.',
      },
      {
        q: 'Bisakah member melihat compensation plan kami?',
        a: 'Anda yang menentukan seberapa banyak yang dilihat member. Syarat rank dan progres biasanya titik awal yang paling berguna.',
      },
      {
        q: 'Bisakah tampilannya memakai brand kami?',
        a: 'Branding adalah bagian dari diskusi desain pengalaman member, bersama area yang pertama kali dilihat member.',
      },
      {
        q: 'Bagaimana cara memperkenalkannya ke jaringan kami?',
        a: 'Pengalaman yang jelas seharusnya tidak perlu banyak penjelasan. Cara memperkenalkannya ke leader dan member direncanakan bersama sebelum go-live.',
      },
    ],
    demo: {
      title: 'Mari rancang pengalaman untuk member Anda.',
      text: 'Ceritakan tentang distributor Anda dan pertanyaan yang paling sering mereka ajukan. Kami bantu Anda merencanakan apa yang perlu mereka lihat.',
    },
  },
}

const personas: typeof en = {
  shared: {
    whatMatters: 'Prioritas',
    relevantAreas: 'Area terkait',
    yourQuestions: 'Pertanyaan Anda',
    askWhatsapp: 'Tanya via WhatsApp',
    orBookDemo: 'Atau jadwalkan demo',
    acrossBusiness: 'Lintas tim',
    seeAllTeams: 'Lihat bagaimana semua tim saling terkait',
    moreFor: (role: string) => `Lihat halaman ${role}`,
    learnMore: 'Selengkapnya',
    learnMoreAbout: (role: string) => `tentang ${role}`,
    concernsLabel: 'Pertanyaan yang sering kami dengar',
    inboxTitle: 'Pesan ke tim support',
    answeredBy: 'Bisa dijawab lewat',
    faqLead: 'Jawaban lugas tentang cara kami bekerja bersama tim Anda.',
  },

  landing: {
    hero: {
      eyebrow: 'Mengikuti cara bisnis Anda berjalan',
      title: 'Satu bisnis. Banyak tim.',
      highlight: 'Satu gambaran bersama.',
      lead: 'Owner, finance, operasional, IT dan distributor melihat bisnis dari sudut yang berbeda. mlmsoft membantu Anda memetakan kebutuhan itu menjadi satu model operasional yang saling terhubung.',
      jumpNav: 'Pilih peran Anda',
      jumpLabel: 'Langsung ke peran Anda',
      center: 'Satu gambaran bersama',
    },
    cards: {
      eyebrow: 'Pilih sudut pandang Anda',
      title: 'Setiap tim melihat masalah yang berbeda.',
      lead: 'Mulai dari peran yang paling dekat dengan Anda. Setiap halaman dibuka dengan masalah yang dikenali peran itu, lalu menunjukkan cara kami menanganinya.',
    },
    teamFlow: {
      eyebrow: 'Satu keputusan, lebih dari satu tim',
      title: 'Tim Anda tidak bekerja sendiri-sendiri.',
      lead: 'Perubahan satu aturan bisnis bisa berdampak ke operasional, finance dan pengalaman distributor. Karena itu, kami mulai dengan memahami alur kerja secara utuh.',
      exampleTag: 'Contoh',
      example: 'Satu order yang diretur, ditelusuri ke seluruh bisnis',
      label: 'Bagaimana satu order retur sampai ke setiap tim',
      steps: [
        { title: 'Order', text: 'Order seorang member diretur setelah periode bonus ditutup.' },
        { title: 'Operasional', text: 'Retur diproses dan status order diperbarui.' },
        { title: 'Aturan bonus', text: 'Bonus dari order itu perlu dikoreksi.' },
        { title: 'Finance', text: 'Payout dan catatan pajaknya disesuaikan.' },
        {
          title: 'Pengalaman distributor',
          text: 'Member bisa melihat alasan penghasilannya berubah.',
        },
        { title: 'Laporan owner', text: 'Angka tetap sesuai dengan penjualan yang sebenarnya.' },
      ],
    },
    businessFirst: {
      eyebrow: 'Cara kami memulai',
      title: 'Bisnis dulu, baru software.',
      lead: 'Tim mana pun yang menghubungi kami lebih dulu, percakapan pertama selalu tentang bisnis Anda, bukan tentang modul.',
      topics: [
        'Cara Anda berjualan, dan siapa pembelinya',
        'Cara jaringan tumbuh dan cara member dibayar',
        'Di mana tim Anda kehilangan waktu saat ini',
      ],
      cta: 'Ceritakan cara bisnis Anda berjalan',
      theirsLabel: 'Titik awal banyak diskusi software',
      theirs: 'Mau ambil paket yang mana?',
      oursLabel: 'Titik awal kami',
      ours: 'Bagaimana bisnis Anda berjalan?',
    },
    faq: {
      title: 'Memulai bersama tim Anda.',
      lead: 'Siapa yang perlu dilibatkan, dan kapan. Sebagian besar bisnis memulai dari satu percakapan.',
      items: [
        {
          q: 'Tim mana yang sebaiknya menghubungi mlmsoft lebih dulu?',
          a: 'Biasanya owner atau direktur. Setelah cakupannya lebih jelas, tim finance, operasional dan IT ikut bergabung untuk bagian masing-masing.',
        },
        {
          q: 'Apakah semua tim harus dilibatkan sejak awal?',
          a: 'Tidak. Mulailah dari masalah terbesar. Tim lain bergabung saat bagian alur kerja mereka dibahas.',
        },
        {
          q: 'Bisnis kami masih kecil. Apakah itu masalah?',
          a: 'Cakupan mengikuti bisnis Anda. Jaringan yang lebih kecil bisa mulai dari beberapa area dulu, lalu menambah area lain seiring pertumbuhan.',
        },
        {
          q: 'Apa yang terjadi setelah kami menghubungi Anda lewat WhatsApp?',
          a: 'Kami mulai dengan menanyakan bisnis dan kebutuhan Anda. Jika memang cocok, kami jadwalkan demo bersama orang yang tepat dari tim Anda.',
        },
      ],
    },
    demo: {
      title: 'Mulai dari masalah yang paling terasa di bisnis Anda.',
      text: 'Ceritakan tim mana yang paling dulu merasakannya. Kami petakan bagaimana masalah itu terkait dengan bagian bisnis lainnya.',
    },
  },

  personas: roles,

  mini: {
    calculated: 'Dihitung',
    approved: 'Disetujui',
    readyToPay: 'Siap dibayar',
    verified: 'Terverifikasi',
  },

  concepts: {
    executive: {
      label: 'Contoh ringkasan bisnis untuk owner dengan data contoh',
      eyebrow: 'Ringkasan bisnis',
      period: 'September 2026',
      ranges: ['Bulan', 'Kuartal', 'Tahun'],
      kpis: {
        sales: 'Penjualan',
        activeMembers: 'Member aktif',
        newMembers: 'Member baru',
        commission: 'Beban komisi',
      },
      points: 'poin',
      chartTitle: 'Tren penjualan · 12 bulan terakhir',
      months: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
      regionsTitle: 'Member baru per wilayah',
      regions: ['Jawa Timur', 'Jawa Barat', 'Jakarta', 'Sumatera', 'Lainnya'],
      alertsTitle: 'Perlu perhatian',
      alerts: [
        'Anggaran reward Q4 6% di atas rencana',
        '7 leader di Jawa Timur kurang aktif bulan ini',
        'Retur kembali ke kisaran normal',
      ],
    },
    finance: {
      label: 'Contoh review payout dengan data contoh',
      eyebrow: 'Periode payout',
      period: 'Oktober 2026 · batch A',
      status: {
        calculated: 'Dihitung',
        inReview: 'Dalam review',
        approved: 'Disetujui',
        readyToPay: 'Siap dibayar',
        paid: 'Dibayar',
        onHold: 'Ditahan',
      },
      reviewTitle: 'Review komisi',
      columns: { member: 'Member', bonus: 'Bonus', amount: 'Jumlah', status: 'Status' },
      bonuses: {
        generation: 'Generation',
        directReferral: 'Sponsor langsung',
        rank: 'Bonus rank',
        leadership: 'Leadership',
      },
      adjustmentTitle: 'Penyesuaian',
      adjustmentOrder: 'Order INV-20931 diretur',
      originalBonus: 'Bonus awal',
      reversalEntry: 'Entri reversal',
      taxTitle: 'Konteks pajak',
      gross: 'Komisi bruto',
      withheld: 'Dipotong pajak',
      net: 'Payout bersih',
      taxNote: 'Tarif sesuai arahan konsultan pajak Anda',
      reconciliation: [
        'Order vs dasar komisi: cocok',
        'Saldo wallet vs ledger: cocok',
        '3 selisih perlu dicek',
      ],
    },
    operations: {
      label: 'Contoh tampilan member untuk tim operasional dengan data contoh',
      memberMeta: 'Member SM-210304 · bergabung Mar 2024',
      badges: { active: 'Aktif', verified: 'Terverifikasi' },
      networkTitle: 'Konteks jaringan',
      sponsor: 'Sponsor',
      placement: 'Penempatan',
      placementValue: 'Leg kiri · level 3',
      teamSize: 'Ukuran tim',
      teamSizeValue: '186 member',
      region: 'Wilayah',
      activityTitle: 'Aktivitas terbaru',
      activity: [
        {
          title: 'Order INV-20931 dibayar',
          meta: 'Rp1.500.000 · terhitung untuk periode September',
          time: '2 hari lalu',
        },
        {
          title: 'Naik ke Gold',
          meta: 'Ketiga syarat kualifikasi terpenuhi',
          time: '1 minggu lalu',
        },
        {
          title: 'Alamat pengiriman diperbarui',
          meta: 'Diubah oleh member',
          time: '3 minggu lalu',
        },
      ],
      noteTitle: 'Catatan support',
      note: 'Menanyakan kapan bonus September dibayarkan. Sudah dijelaskan jadwal payout-nya.',
      noteMeta: 'Rina · Customer service · kemarin',
    },
    technical: {
      label: 'Contoh lembar kerja discovery teknis dengan jawaban contoh',
      eyebrow: 'Discovery teknis',
      title: 'Lembar kebutuhan',
      topicCount: (count: number) => `${count} topik`,
      columns: { topic: 'Topik', question: 'Pertanyaan', status: 'Status' },
      topics: {
        integrations: 'Integrasi',
        authentication: 'Autentikasi',
        permissions: 'Hak akses',
        migration: 'Migrasi data',
        infrastructure: 'Infrastruktur',
        auditability: 'Jejak audit',
      },
      questions: [
        'Payment gateway apa, dan alur pembayaran yang mana?',
        'Data apa yang perlu dikirim ke sistem akuntansi?',
        'Perlukah staf login dengan akun perusahaan?',
        'Siapa yang boleh menyetujui payout atau mengoreksi penempatan?',
        'Apakah genealogi saat ini lengkap dan konsisten?',
        'Perkiraan jumlah member dan order dalam tiga tahun?',
        'Perubahan mana yang perlu riwayat, dan berapa lama?',
      ],
      status: {
        agreed: 'Disepakati',
        discussing: 'Dibahas',
        open: 'Terbuka',
        assessing: 'Dinilai',
      },
      summary: { agreed: '2 disepakati', inProgress: '3 berjalan', open: '2 terbuka' },
    },
    distributor: {
      label: 'Contoh layar aplikasi member dengan data contoh',
      greeting: 'Selamat pagi',
      nextRank: 'Rank berikutnya',
      daysLeft: 'Sisa 8 hari',
      progress: 'progres',
      salesTarget: 'Target penjualan',
      directRequirement: 'Sponsor langsung',
      viewRequirements: 'Lihat syarat',
      tiles: { wallet: 'Wallet', points: 'Poin', team: 'Tim', orders: 'Order' },
      referralLabel: 'Link referral Anda',
      referralLink: 'brandanda.com/r/ayu',
      tabs: { home: 'Beranda', team: 'Tim', wallet: 'Wallet', rewards: 'Reward' },
      toastTitle: 'Komisi diterima',
      toastMeta: '+Rp96.000 · bonus generation',
    },
  },
}

export default personas
