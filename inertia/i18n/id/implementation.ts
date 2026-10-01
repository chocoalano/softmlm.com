import type en from '../en/implementation'

/**
 * /id/how-we-do-it. Sama seperti versi Inggris: proses, bukan daftar
 * kemampuan. Tidak ada janji timeline, hasil migrasi, integrasi atau
 * tingkat support; kebijakan yang ditentukan per proyek disebut begitu.
 */
const implementation: typeof en = {
  hero: {
    eyebrow: 'Dari aturan bisnis menjadi sistem yang terstruktur',
    title: 'Kami pahami cara bisnis Anda berjalan',
    highlight: 'sebelum sistem mulai dibangun.',
    lead: 'Compensation plan, perjalanan member, alur penjualan, dan aturan operasional dipetakan terlebih dahulu agar scope implementasi, pengujian, dan proses go-live menjadi lebih jelas.',
    cta: 'Konsultasikan Proyek Anda',
    canvas: {
      label: 'Blueprint implementasi, disusun dalam enam lapisan',
      title: 'Blueprint implementasi',
      layers: [
        { title: 'Model bisnis', items: ['Produk', 'Pasar', 'Tipe member'] },
        { title: 'Perjalanan member', items: ['Registrasi', 'Penempatan', 'Aktivitas'] },
        { title: 'Alur penjualan', items: ['Order', 'Stokis', 'Retur'] },
        { title: 'Aturan kompensasi', items: ['Kualifikasi', 'Bonus', 'Rank'] },
        { title: 'Operasional', items: ['Persetujuan', 'Payout', 'Laporan'] },
        { title: 'Blueprint teknis', items: ['Data', 'Integrasi', 'Migrasi'] },
      ],
    },
  },

  problem: {
    eyebrow: 'Kenapa proyek tersendat',
    title: 'Masalah proyek software sering muncul bahkan sebelum proses coding dimulai.',
    lead: 'Keterlambatan dan pekerjaan ulang sering berawal dari tiga hal yang mudah diremehkan di awal proyek.',
    causes: [
      {
        title: 'Aturannya tidak tertulis.',
        text: 'Pengecualian bonus, kebiasaan persetujuan dan koreksi manual sering hanya diketahui beberapa orang dan tidak terdokumentasi. Biasanya baru muncul belakangan, saat pengujian.',
      },
      {
        title: 'Setiap tim menjelaskan proses yang sama dengan cara berbeda.',
        text: 'Owner, finance, operasional dan IT masing-masing melihat bagian alurnya sendiri. Tanpa satu gambaran bersama, kebutuhan sudah saling bertentangan sebelum development dimulai.',
      },
      {
        title: 'Data yang ada lebih rumit dari perkiraan.',
        text: 'Spreadsheet bertahun-tahun, penyesuaian manual dan sistem lama meninggalkan data ganda, data yang tidak lengkap dan riwayat yang harus dipahami sebelum dipindahkan.',
      },
    ],
  },

  positioning: {
    eyebrow: 'Pendekatan kami',
    title: 'Pahami bisnisnya dulu. Sistem menyusul.',
    lead: 'Sebelum memutuskan apa yang dikonfigurasi atau dibangun, kami memetakan cara bisnis Anda berjalan saat ini dan apa yang perlu berubah.',
    first: {
      title: 'Yang kami petakan lebih dulu',
      items: [
        'Cara member bergabung, ditempatkan dan tetap aktif',
        'Kapan sebuah order dihitung untuk kualifikasi',
        'Cara setiap bonus diperoleh, dihitung dan disetujui',
        'Siapa memutuskan apa, dan di mana pengecualian terjadi',
      ],
    },
    then: {
      title: 'Yang kemudian ditentukan',
      items: [
        'Mana yang dikonfigurasi dan mana yang perlu pengembangan khusus',
        'Sistem mana yang perlu bertukar data',
        'Data mana yang dipindahkan dan cara pengecekannya',
        'Apa yang harus diuji sebelum go-live',
      ],
    },
  },

  phases: {
    eyebrow: 'Tahapan implementasi',
    title: 'Sembilan tahap, dari diskusi pertama sampai setelah go-live.',
    lead: 'Setiap tahap punya tujuan dan hasil yang bisa ditinjau kedua tim. Beberapa tahap bisa berjalan bersamaan; urutannya menunjukkan bagaimana gambaran proyek terbentuk.',
    railLabel: 'Tahapan implementasi',
    phase: (n: number) => `Tahap ${n}`,
    lookAt: 'Yang kami pelajari',
    outcome: 'Hasil tahap ini',
    items: {
      discover: {
        label: 'Pahami Bisnis',
        title: 'Memahami cara bisnis benar-benar berjalan.',
        text: 'Kami mulai dari diskusi, bukan konfigurasi: cara Anda berjualan, cara jaringan tumbuh, cara bonus dibayarkan saat ini, dan bagian proses mana yang paling banyak menyita tenaga.',
        points: [
          'Model bisnis, produk dan pasar',
          'Siklus member dan struktur jaringan',
          'Compensation plan saat ini beserta pengecualiannya',
          'Alur penjualan dan order',
          'Peran operasional: siapa mengerjakan apa saat ini',
          'Sistem, spreadsheet dan pekerjaan manual yang dipakai sekarang',
          'Kendala utama, prioritas dan target periode go-live',
        ],
        outcome: 'Pemahaman bersama tentang alur bisnis saat ini dan prioritas proyek.',
      },
      blueprint: {
        label: 'Blueprint Sistem',
        title: 'Mengubah aturan bisnis menjadi blueprint sistem.',
        text: 'Hasil diskusi dituliskan menjadi blueprint yang bisa dibaca dan dikoreksi tim Anda: siapa melakukan apa, data apa yang terlibat, dan bagaimana setiap aturan menentukan hasilnya.',
        points: [
          'Aktor dan peran',
          'Proses dan langkah-langkahnya',
          'Data yang dibutuhkan setiap langkah',
          'Aturan kualifikasi',
          'Kebutuhan perhitungan',
          'Persetujuan',
          'Pengecualian',
          'Laporan',
          'Integrasi',
        ],
        map: {
          label: 'Contoh peta keputusan',
          trigger: 'Order lunas',
          check: 'Apakah member memenuhi kualifikasi periode ini?',
          yes: 'Ya',
          no: 'Tidak',
          yesResult: 'Dihitung untuk bonus',
          noResult: 'Ditahan dan ditandai untuk ditinjau',
          note: 'Disusun bersama tim Anda melalui workshop dan dokumen.',
        },
        outcome:
          'Blueprint proses, aturan, data dan keputusan yang sudah ditinjau: acuan untuk semua tahap berikutnya.',
      },
      configure: {
        label: 'Konfigurasi',
        title: 'Menentukan mana yang cukup dikonfigurasi dan mana yang perlu pengembangan khusus.',
        text: 'Setelah blueprint disepakati, setiap kebutuhan dikelompokkan ke salah satu dari tiga kategori, supaya cakupan dan usahanya terlihat sebelum pembangunan dimulai.',
        split: [
          {
            title: 'Kemampuan platform yang sudah ada',
            text: 'Kebutuhan yang sudah dicakup platform, dipakai sebagaimana adanya.',
          },
          {
            title: 'Konfigurasi',
            text: 'Pengaturan, aturan dan parameter yang disesuaikan dengan bisnis Anda.',
          },
          {
            title: 'Kebutuhan khusus',
            text: 'Kebutuhan bisnis di luar itu, dirumuskan dan disepakati tersendiri.',
          },
        ],
        note: 'Kategori setiap kebutuhan dipastikan per proyek, saat penyusunan blueprint.',
        featuresLink: 'Lihat area fitur',
        outcome:
          'Pembagian yang jelas antara yang dipakai apa adanya, dikonfigurasi atau dibangun, dengan cakupan yang disepakati.',
      },
      integrate: {
        label: 'Integrasi',
        title: 'Memetakan sistem yang perlu saling terhubung.',
        text: 'Sebagian besar bisnis sudah memakai sistem lain. Kami memetakan sistem mana yang perlu bertukar data dengan sistem MLM, ke arah mana, dan siapa yang bertanggung jawab di setiap sisi.',
        areasLabel: 'Area integrasi yang mungkin',
        areas: [
          'Pembayaran',
          'Perbankan',
          'Logistik',
          'Akuntansi',
          'Messaging',
          'Identitas & login',
          'Sistem internal',
        ],
        areasNote:
          'Setiap integrasi dinilai per proyek: apa yang ditawarkan sistem lain, data apa yang berpindah, dan siapa membangun sisi yang mana.',
        pageLink: 'Lihat cara integrasi direncanakan',
        cta: {
          title: 'Sudah memakai beberapa sistem lain?',
          text: 'Ceritakan sistem yang Anda pakai sekarang, lalu kita petakan bersama.',
          label: 'Diskusikan sistem Anda via WhatsApp',
        },
        outcome: 'Peta integrasi: sistem, data yang dipertukarkan, arah dan penanggung jawabnya.',
      },
      migrate: {
        label: 'Migrasi',
        title: 'Memindahkan data yang penting, tanpa menjadikan migrasi urusan belakangan.',
        text: 'Migrasi direncanakan sejak awal, karena riwayat member, struktur jaringan dan saldo memengaruhi cara sistem baru disiapkan.',
        categoriesLabel: 'Data yang biasanya dipertimbangkan',
        categories: [
          'Profil member',
          'Hubungan sponsor',
          'Struktur jaringan',
          'Riwayat rank dan kualifikasi',
          'Riwayat transaksi',
          'Saldo wallet, hanya jika layak secara teknis dan finansial',
          'Data referensi: produk, wilayah, daftar harga',
        ],
        scope:
          'Cakupan migrasi bergantung pada sistem sumber, kualitas data, dan kebutuhan implementasi yang disepakati.',
        outcome: 'Rencana migrasi: apa yang dipindahkan, cara pengecekannya, dan kapan.',
      },
      test: {
        label: 'Pengujian',
        title: 'Menguji skenario bisnis, bukan sekadar tampilan layar.',
        text: 'Layar yang berfungsi belum tentu berarti bonusnya benar. Skenario uji disusun dari aturan bisnis Anda dan diperiksa oleh orang yang memahaminya.',
        points: [
          'Transaksi yang memenuhi dan tidak memenuhi kualifikasi',
          'Perubahan rank, naik maupun turun',
          'Transaksi yang diubah atau dibatalkan',
          'Kasus khusus dari pengecualian plan Anda',
          'Rekonsiliasi finance terhadap total yang diharapkan',
          'Hak akses dan peran',
        ],
        outcome:
          'Hasil pengujian yang sudah ditinjau tim bisnis, beserta daftar isu yang masih terbuka.',
      },
      train: {
        label: 'Training',
        title: 'Menyiapkan orang-orang yang akan menjalankan sistem.',
        text: 'Admin, operasional, finance, layanan member dan manajemen memakai sistem dengan cara berbeda, jadi training mengikuti pekerjaan harian mereka, bukan tur umum.',
        points: [
          'Sesi yang disusun per peran',
          'Tugas harian dan tugas tutup periode',
          'Menangani pengecualian dan koreksi',
          'Ke mana mencari bantuan setelah go-live',
        ],
        scope: 'Cakupan training ditentukan berdasarkan peran yang terlibat dalam implementasi.',
        outcome: 'Tim yang memahami bagiannya sebelum member mulai memakai sistem.',
      },
      launch: {
        label: 'Go-Live',
        title: 'Go-live dengan rencana transisi yang jelas.',
        text: 'Go-live adalah langkah yang direncanakan, bukan keputusan di menit terakhir. Rencananya disepakati bersama tim Anda sebelumnya.',
        points: [
          'Cutover data final: langkah dan waktunya',
          'Akun pengguna dan hak akses siap sebelum go-live',
          'Isu yang masih terbuka dan cara menanganinya',
          'Komunikasi ke member dan staf',
          'Pemantauan ketat di periode awal',
          'Jalur fallback dan eskalasi',
        ],
        outcome: 'Go-live yang disepakati kedua tim, dengan peran setiap orang yang jelas.',
      },
      support: {
        label: 'Support',
        title: 'Implementasi tidak berhenti di hari go-live.',
        text: 'Periode awal setelah go-live (perhitungan bonus pertama, payout pertama, tutup bulan pertama) adalah saat pertanyaan bermunculan. Kami merencanakannya sejak awal.',
        points: [
          'Pendampingan periode perhitungan dan payout pertama',
          'Pelaporan isu dan tindak lanjutnya',
          'Perubahan dan penyempurnaan setelah go-live',
        ],
        scope:
          'Cakupan support setelah go-live disepakati sebagai bagian dari implementasi dan kesepakatan komersial.',
        outcome: 'Jalur yang jelas untuk menyampaikan isu dan permintaan setelah go-live.',
      },
    },
  },

  migrationReality: {
    title: 'Migrasi lebih dari sekadar mengimpor spreadsheet.',
    text: 'Data dari sistem sebelumnya perlu dipahami sebelum bisa dipercaya. Setiap langkah ini disepakati bersama tim Anda.',
    steps: [
      {
        title: 'Ekstrak',
        text: 'Mengambil data dari sistem dan spreadsheet yang dipakai saat ini.',
      },
      { title: 'Pahami', text: 'Memahami arti setiap kolom dan letak riwayatnya.' },
      {
        title: 'Bersihkan',
        text: 'Menyelesaikan data ganda, data kosong dan catatan yang bertentangan.',
      },
      { title: 'Petakan', text: 'Mencocokkan kolom dan struktur lama ke sistem baru.' },
      { title: 'Validasi', text: 'Mengecek jumlah, relasi dan saldo bersama tim Anda.' },
      { title: 'Impor', text: 'Memuat data yang disepakati, dengan uji coba bila diperlukan.' },
      {
        title: 'Rekonsiliasi',
        text: 'Membandingkan hasilnya dengan data sumber sebelum disetujui.',
      },
    ],
    pricingLink: 'Lihat apa saja yang memengaruhi harga',
  },

  compensationValidation: {
    eyebrow: 'Validasi kompensasi',
    title: 'Sebelum go-live, perhitungan bonus harus bisa dipahami oleh tim bisnis.',
    text: 'Sebelum go-live, tim bisnis Anda membandingkan hasil yang diharapkan dengan hasil sistem untuk setiap skenario yang disepakati, memakai contoh transaksi yang mereka kenali.',
    stepsLabel: 'Cara setiap aturan diperiksa',
    steps: [
      'Aturan bisnis',
      'Contoh transaksi',
      'Hasil yang diharapkan',
      'Hasil sistem',
      'Tinjauan',
      'Persetujuan',
    ],
    example: {
      label: 'Contoh penerapannya',
      rule: 'Sponsor mendapat 10% dari order pertama member baru',
      transaction: (amount: string) => `Order pertama member baru: ${amount}`,
      expected: (amount: string) => `${amount} untuk sponsor`,
      result: (amount: string) => `${amount} untuk sponsor`,
      match: 'Sesuai',
      review: 'Finance dan pemilik plan membandingkan kedua hasil',
      approval: 'Aturan disetujui untuk go-live',
    },
    link: 'Diskusikan compensation plan Anda',
    whatsapp: 'Tanyakan cara plan diperiksa sebelum go-live',
  },

  responsibilities: {
    eyebrow: 'Kerja sama',
    title: 'Implementasi yang berhasil membutuhkan kedua belah pihak.',
    lead: 'Tidak ada tim yang bisa melakukannya sendiri. Beginilah pembagian kerjanya pada umumnya.',
    ours: {
      title: 'Yang dibawa tim mlmsoft',
      items: [
        'Memandu sesi diskusi dan mendokumentasikan hasilnya',
        'Menyusun aturan dan alur kerja Anda menjadi blueprint yang bisa ditinjau',
        'Mengidentifikasi ketergantungan teknis sejak awal: sistem, data dan akses',
        'Mengonfigurasi dan membangun cakupan yang disepakati, serta menjelaskan mana konfigurasi dan mana pengembangan khusus',
        'Menyiapkan skenario uji bersama Anda dan menindaklanjuti temuan pengujian',
        'Merencanakan migrasi dan langkah go-live bersama Anda',
      ],
    },
    yours: {
      title: 'Yang dibawa tim Anda',
      items: [
        'Aturan bisnis, sebagaimana benar-benar berjalan saat ini',
        'Pengambil keputusan yang ditetapkan sejak awal',
        'Dokumen, spreadsheet dan ekspor data yang ada saat ini',
        'Validasi skenario uji dan tinjauan atas hasilnya',
        'Keputusan ketika aturan belum jelas atau dua tim berbeda pandangan',
        'Pengguna internal yang siap, dan komunikasi ke member Anda',
      ],
    },
  },

  discoveryTeam: {
    eyebrow: 'Siapa yang perlu ikut',
    title: 'Orang yang tepat dalam diskusi mencegah salah paham yang mahal di kemudian hari.',
    lead: 'Tahap memahami bisnis berjalan paling baik bila pemilik setiap bagian bisnis bisa ikut. Tidak semua sesi membutuhkan semua orang.',
    roles: {
      owner: {
        title: 'Owner atau sponsor proyek',
        text: 'Menetapkan prioritas, mengambil keputusan cakupan dan menimbang kompromi.',
      },
      operations: {
        title: 'Operasional',
        text: 'Memahami alur harian: registrasi, order, stok dan layanan member.',
      },
      finance: {
        title: 'Finance',
        text: 'Bertanggung jawab atas payout, pajak, rekonsiliasi dan laporan yang diandalkan finance.',
      },
      it: {
        title: 'IT',
        text: 'Memahami sistem, data, akses dan infrastruktur yang ada.',
      },
      sme: {
        title: 'Ahli kompensasi atau jaringan',
        text: 'Memahami aturan plan, pengecualiannya, dan asal-usul aturan tersebut.',
      },
    },
    roleLink: 'Yang penting bagi tim ini',
    smeLink: 'Cara compensation plan dipetakan',
  },

  scope: {
    eyebrow: 'Cakupan',
    title: 'Apa saja yang memengaruhi cakupan implementasi?',
    lead: 'Setiap proyek berbeda. Faktor-faktor inilah yang membentuk usaha, waktu dan harga.',
    factors: [
      {
        title: 'Kompleksitas bisnis',
        text: 'Pasar, badan usaha, tipe member dan kanal penjualan.',
      },
      { title: 'Aturan kompensasi', text: 'Jumlah bonus, kualifikasi, rank dan pengecualian.' },
      { title: 'Jumlah modul', text: 'Bagian bisnis yang perlu dicakup sistem.' },
      { title: 'Integrasi yang ada', text: 'Sistem yang perlu bertukar data, dan caranya.' },
      { title: 'Volume migrasi', text: 'Member, riwayat jaringan dan transaksi yang dipindahkan.' },
      { title: 'Kualitas data', text: 'Seberapa banyak data perlu dibersihkan dan diperjelas.' },
      { title: 'Kustomisasi', text: 'Kebutuhan yang melampaui konfigurasi.' },
      { title: 'Cakupan pengujian', text: 'Skenario, rekonsiliasi dan siapa yang menyetujui.' },
      {
        title: 'Kesiapan organisasi',
        text: 'Ketersediaan pengambil keputusan dan pemilik proses.',
      },
    ],
    pricingLink: 'Lihat cara harga ditentukan',
    timeline: {
      title: 'Lalu, berapa lama prosesnya?',
      text: 'Tidak ada satu timeline yang cocok untuk semua proyek. Cakupannya menjadi lebih jelas setelah tahap memahami bisnis, ketika aturan bisnis, kebutuhan migrasi, integrasi dan pengujian sudah dipahami.',
    },
  },

  migrationBand: {
    eyebrow: 'Migrasi',
    title: 'Sudah memakai sistem lain?',
    text: 'Ceritakan sistem yang Anda pakai sekarang, apa yang sudah berjalan baik, dan apa yang perlu berubah. Biasanya itulah titik awal terbaik.',
    whatsapp: 'Diskusikan Migrasi via WhatsApp',
    pricing: 'Lihat Harga',
  },

  readiness: {
    eyebrow: 'Cek kesiapan',
    title: 'Seberapa siap proyek Anda?',
    lead: 'Centang yang sudah sesuai. Ini hanya membantu melihat posisi Anda: tidak ada yang disimpan atau dikirim.',
    legend: 'Yang sudah sesuai dengan proyek Anda',
    items: [
      'Kami memahami cara kerja compensation plan kami, meski belum terdokumentasi lengkap.',
      'Kami tahu siapa pemilik setiap proses bisnis.',
      'Kami tahu data apa yang perlu dipindahkan dari sistem saat ini.',
      'Kami tahu sistem eksternal apa yang perlu terhubung.',
      'Finance, operasional dan IT bisa ikut dalam tahap memahami bisnis.',
      'Kami sudah punya target periode go-live.',
    ],
    progress: (count: number, total: number) => `${count} dari ${total} dicentang`,
    results: {
      none: 'Mulai saja dari posisi Anda sekarang. Area-area ini diperjelas pada tahap memahami bisnis.',
      some: 'Beberapa area bisa diperjelas pada tahap memahami bisnis. Yang sudah Anda centang adalah titik awal yang baik.',
      most: 'Anda sudah punya bekal yang berguna untuk diskusi awal. Sisanya bisa diperjelas bersama.',
      all: 'Anda sudah punya bekal yang berguna untuk diskusi awal.',
    },
    note: 'Ini bukan penilaian atas proyek Anda, hanya cara menyiapkan diskusi pertama.',
    cta: 'Konsultasikan Proyek Anda',
  },

  faq: {
    title: 'Pertanyaan seputar implementasi',
    lead: 'Jawaban singkatnya. Setiap proyek dirumuskan tersendiri, jadi detailnya dipastikan bersama tim Anda.',
    items: [
      {
        q: 'Berapa lama proses implementasi?',
        a: 'Tidak ada satu timeline yang cocok untuk semua proyek. Cakupannya menjadi lebih jelas setelah tahap memahami bisnis, ketika aturan bisnis, kebutuhan migrasi, integrasi dan pengujian sudah dipahami.',
      },
      {
        q: 'Bisakah kami pindah dari sistem MLM yang kami pakai sekarang?',
        a: 'Itu titik awal yang umum. Apa yang bisa dipindahkan dan caranya bergantung pada sistem sumber, kualitas data dan kebutuhan yang disepakati, jadi hal ini kami nilai di tahap memahami bisnis sebelum ada janji apa pun.',
      },
      {
        q: 'Apakah mlmsoft bisa mengikuti compensation plan kami yang sekarang?',
        a: 'Kami mulai dari plan Anda sebagaimana berjalan saat ini dan memetakannya aturan demi aturan. Aturan yang perlu konfigurasi atau pengembangan khusus, atau yang belum jelas, akan terlihat di blueprint sebelum apa pun dibangun. Cakupannya disepakati berdasarkan kebutuhan implementasi.',
      },
      {
        q: 'Data apa saja yang bisa dimigrasikan?',
        a: 'Biasanya: profil member, hubungan sponsor, struktur jaringan, riwayat rank, riwayat transaksi dan data referensi, serta saldo wallet hanya jika layak secara teknis dan finansial. Cakupan migrasi bergantung pada sistem sumber, kualitas data, dan kebutuhan implementasi yang disepakati.',
      },
      {
        q: 'Apakah kami perlu punya tim IT sendiri?',
        a: 'Tidak harus, tetapi orang yang memahami sistem dan data Anda saat ini sangat membantu, terutama untuk integrasi dan migrasi. Jika belum ada tim IT, pembagian tanggung jawabnya dibahas di tahap memahami bisnis.',
      },
      {
        q: 'Apa yang terjadi sebelum development dimulai?',
        a: 'Tahap memahami bisnis dan penyusunan blueprint. Alur bisnis, aturan kompensasi, data dan integrasi dipetakan dan ditinjau bersama tim Anda, lalu pembagian antara konfigurasi dan pengembangan khusus disepakati.',
      },
      {
        q: 'Bagaimana compensation plan diuji?',
        a: 'Dengan skenario dari aturan Anda sendiri: contoh transaksi, hasil yang diharapkan tim Anda, dan hasil dari sistem. Perbedaannya ditinjau dan diselesaikan sebelum bisnis menyetujui setiap aturan.',
      },
      {
        q: 'Bisakah diintegrasikan dengan sistem yang sudah kami pakai?',
        a: 'Setiap integrasi dinilai per proyek: apa yang ditawarkan sistem lain, data apa yang perlu berpindah, dan siapa membangun setiap sisi. Hal ini dipetakan di tahap Integrasi sebelum ada komitmen apa pun.',
      },
      {
        q: 'Apakah training termasuk?',
        a: 'Training adalah salah satu tahap implementasi. Cakupan training ditentukan berdasarkan peran yang terlibat dalam implementasi.',
      },
      {
        q: 'Apa yang terjadi setelah go-live?',
        a: 'Periode awal setelah go-live mendapat perhatian khusus, terutama perhitungan dan payout pertama. Cakupan support setelah go-live disepakati sebagai bagian dari implementasi dan kesepakatan komersial.',
      },
    ],
  },

  finalCta: {
    title: 'Anda tidak perlu datang dengan spesifikasi teknis yang sudah lengkap.',
    text: 'Cukup ceritakan bagaimana bisnis berjalan saat ini. Dari sana, kebutuhan sistem dapat mulai dipetakan bersama.',
    whatsapp: 'Konsultasikan Proyek via WhatsApp',
  },

  demo: {
    title: 'Lebih suka diskusi yang terjadwal?',
    text: 'Jadwalkan demo dan ceritakan sistem yang Anda pakai sekarang. Sesinya dimulai dari cara bisnis Anda berjalan.',
  },
}

export default implementation
