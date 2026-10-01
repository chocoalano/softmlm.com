import type en from '../en/legal'
import type { LegalSection } from '../en/legal'

/**
 * Copy area: legal (Bahasa Indonesia). /id/privacy dan /id/terms.
 * Draf yang menjelaskan cara kerja website saat ini; masih perlu ditinjau
 * oleh bagian legal dan bisnis sebelum production sign-off
 * (docs/legal-review.md).
 */
const legal: typeof en = {
  updatedLabel: 'Terakhir diperbarui',
  updated: '1 Oktober 2026',
  contents: 'Di halaman ini',
  eyebrow: 'Legal',

  privacy: {
    title: 'Kebijakan Privasi',
    lead: 'Data apa yang dikumpulkan website ini saat Anda menjelajahinya atau menghubungi kami, untuk apa kami menggunakannya, dan pilihan yang Anda miliki. Isinya menjelaskan cara kerja website ini saat ini.',
    sections: [
      {
        id: 'summary',
        title: 'Ringkasnya',
        paragraphs: [],
        items: [
          'Data yang Anda kirim lewat form hanya kami gunakan untuk menjawab permintaan Anda. Kami tidak memasukkan Anda ke mailing list dan tidak menjual data Anda.',
          'Untuk mengetahui halaman dan kampanye mana yang bermanfaat, website ini menghitung kunjungan sendiri dengan ID acak di cookie first-party. Data ini tidak terhubung dengan nama Anda, kecuali Anda mengirim form.',
          'Website ini tidak memakai pixel iklan maupun script analitik pihak ketiga.',
          'Anda bisa menonaktifkan analitik untuk browser Anda kapan saja, dan kami menghormati sinyal Global Privacy Control.',
        ],
      },
      {
        id: 'scope',
        title: 'Cakupan kebijakan ini',
        paragraphs: [
          'Kebijakan ini berlaku untuk website ini, form di dalamnya, dan tombol WhatsApp yang membuka chat dengan tim kami. Di sini, "kami" berarti tim yang mengelola website ini.',
          'Kebijakan ini tidak mengatur software MLM yang kami implementasikan untuk klien: cara platform klien menangani data member-nya disepakati di setiap proyek. Website ini ditujukan untuk pelaku bisnis, bukan untuk anak-anak.',
        ],
      },
      {
        id: 'you-provide',
        title: 'Data yang Anda berikan',
        paragraphs: [
          'Saat Anda mengirim permintaan demo atau konsultasi, kami menerima data yang Anda isi:',
        ],
        items: [
          'nama, email kerja, nama perusahaan, serta nomor telepon atau WhatsApp bila Anda mengisinya;',
          'informasi bisnis yang Anda pilih untuk dibagikan, misalnya jenis bisnis, jumlah member aktif, modul, layanan, area integrasi atau topik keamanan yang diminati, tahap produk, atau nama sistem yang Anda gunakan saat ini;',
          'pesan Anda, serta estimasi kebutuhan bila Anda mengisinya di halaman Harga;',
          'bahasa halaman tempat Anda mengirimnya.',
        ],
        after: [
          'Mohon jangan mengirim password, API key, kredensial lain, atau detail celah keamanan melalui form. Form kami tidak pernah memintanya.',
        ],
      },
      {
        id: 'with-request',
        title: 'Data yang dicatat bersama permintaan Anda',
        paragraphs: ['Bersama setiap permintaan, kami menyimpan:'],
        items: [
          'cara Anda datang pada kunjungan tersebut: halaman pertama yang Anda buka, website asal (alamatnya tanpa parameter), dan tag kampanye (UTM) pada link;',
          'halaman tempat Anda mengirim form;',
          'hash satu arah dari alamat jaringan (IP) Anda dan identitas browser (user agent), yang hanya dipakai untuk mendeteksi spam dan penyalahgunaan;',
          'bila analitik aktif di browser Anda, halaman dan minat yang tercatat sebelum Anda mengirimnya (lihat bagian berikutnya).',
        ],
        after: [
          'Tiga hal pertama tetap disimpan walaupun analitik nonaktif, karena merupakan bagian dari penanganan permintaan yang Anda kirim.',
        ],
      },
      {
        id: 'analytics',
        title: 'Analitik first-party',
        paragraphs: [
          'Untuk melihat halaman, topik, dan kampanye mana yang bermanfaat, website ini mencatat kunjungan sendiri. Tidak ada layanan analitik atau iklan pihak ketiga yang menerima data ini. Saat analitik aktif, kami mencatat:',
        ],
        items: [
          'ID pengunjung acak di cookie first-party yang berlaku 90 hari, dan ID kunjungan yang berakhir setelah 30 menit tanpa aktivitas;',
          'halaman yang Anda lihat (hanya path alamatnya, tanpa parameter), website asal, dan tag kampanye;',
          'bahasa dan tema warna yang Anda gunakan, serta jenis perangkat: ponsel, tablet, atau desktop (bukan model perangkatnya);',
          'minat yang Anda tunjukkan: menu, kartu, atau layanan yang Anda buka, form yang mulai Anda isi, estimasi kebutuhan yang Anda selesaikan, dan tombol WhatsApp yang Anda klik.',
        ],
        after: [
          'Kami tidak menyimpan alamat IP Anda bersama data ini, tidak melakukan fingerprinting perangkat, dan tidak merekam isi ketikan di form, gerakan mouse, atau layar Anda. Crawler mesin pencari, preview link, dan kunjungan otomatis lain yang jelas terdeteksi tidak dihitung.',
        ],
      },
      {
        id: 'identity',
        title: 'Kapan analitik terhubung dengan Anda',
        paragraphs: [
          'Data analitik bersifat pseudonim: tim kami melihat pengunjung anonim, bukan orang tertentu, dan kami tidak berusaha mencari tahu siapa pengunjung tersebut. Data ini hanya terhubung dengan Anda dalam dua kondisi:',
        ],
        items: [
          'Anda mengirim form dari browser ini: kunjungan dan minat yang tercatat untuk browser ini dilampirkan ke permintaan Anda, agar tim kami memahami apa yang Anda cari;',
          'Anda mengirim pesan WhatsApp dengan kode referensi dari website ini, lalu tim sales kami menghubungkan referensi itu dengan permintaan yang sudah Anda kirim sebelumnya.',
        ],
        after: ['Browser atau perangkat lain tidak pernah dicocokkan dengan Anda.'],
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        paragraphs: [
          'Tombol WhatsApp membuka WhatsApp, layanan milik pihak ketiga yang memiliki syarat dan kebijakan privasinya sendiri. Tidak ada pesan yang terkirim sampai Anda memilih untuk mengirimnya.',
          'Saat analitik aktif, pesan yang sudah disiapkan diakhiri dengan kode referensi singkat seperti "Ref: M7K4P2". Kode ini memberi tahu tim kami dari halaman dan topik mana Anda datang. Kodenya acak, tidak berhubungan dengan nama atau nomor Anda, dan tidak membuka akses apa pun di website ini. Saat analitik nonaktif, tombol tetap berfungsi sama, tanpa kode referensi.',
          'Website ini tidak pernah melihat nomor WhatsApp maupun percakapan Anda. Tim kami baru melihat nomor dan pesan Anda di WhatsApp setelah Anda mengirim pesan, seperti chat WhatsApp pada umumnya.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookie dan penyimpanan serupa',
        paragraphs: ['Website ini hanya memasang cookie miliknya sendiri (first-party):'],
        kind: 'cookies',
        after: [
          'Estimator di halaman Harga menyimpan jawaban Anda di session storage browser sampai tab ditutup, supaya Anda bisa kembali ke langkah sebelumnya. Jawaban itu baru sampai ke kami bila Anda mengirim form dengan estimasi terlampir.',
          'Anda bisa memblokir atau menghapus cookie lewat pengaturan browser. Website tetap berfungsi; pengiriman form membutuhkan cookie sesi.',
        ],
      },
      {
        id: 'choices',
        title: 'Pilihan Anda',
        paragraphs: [
          'Anda bisa menonaktifkan analitik first-party untuk browser ini. Halaman, form, dan WhatsApp tetap berfungsi seperti biasa. Bila browser Anda mengirim sinyal Global Privacy Control, analitik otomatis nonaktif.',
        ],
        kind: 'preference',
        after: [
          'Menonaktifkan analitik menghentikan pencatatan baru dan menghapus ID pengunjung browser ini. Data yang tercatat sebelumnya tetap anonim dan hanya disimpan untuk waktu terbatas (lihat "Berapa lama data disimpan"). Bila ingin dihapus lebih cepat, hubungi kami.',
        ],
      },
      {
        id: 'use',
        title: 'Untuk apa data digunakan',
        paragraphs: [],
        items: [
          'menjawab permintaan Anda dan menyiapkan konsultasi atau demo yang Anda minta;',
          'memberi tahu tim kami lewat email tentang permintaan baru dan mengirim konfirmasi kepada Anda;',
          'memahami halaman, topik, dan kampanye mana yang bermanfaat, dengan data anonim atau pseudonim;',
          'melindungi website dan form dari spam serta penyalahgunaan;',
          'memenuhi kewajiban hukum kami.',
        ],
        after: [
          'Kami tidak menjual data Anda, tidak memakainya untuk iklan di website lain, dan tidak membuat keputusan otomatis tentang Anda.',
        ],
      },
      {
        id: 'sharing',
        title: 'Siapa yang menerima data',
        paragraphs: [],
        items: [
          'Tim kami, melalui akun staf yang hanya melihat data sesuai perannya: misalnya, peran marketing melihat analitik anonim tetapi tidak melihat data kontak.',
          'Penyedia layanan yang menjalankan website ini untuk kami: penyedia hosting untuk website dan database-nya, serta penyedia email yang mengirim email notifikasi dan konfirmasi.',
          'Google Fonts: huruf (font) website ini dimuat dari server Google, sehingga browser Anda mengirim alamat IP dan informasi browser ke Google saat halaman dimuat.',
          'WhatsApp, hanya bila Anda memilih untuk membukanya.',
          'Pihak berwenang, bila diwajibkan oleh hukum.',
        ],
      },
      {
        id: 'retention',
        title: 'Berapa lama data disimpan',
        paragraphs: [
          'Kami menyimpan data hanya selama dibutuhkan untuk tujuan di atas atau selama diwajibkan oleh hukum:',
        ],
        items: [
          'permintaan dan data yang dicatat bersamanya: selama dibutuhkan untuk menangani permintaan dan hubungan bisnis yang mengikutinya, serta untuk kewajiban hukum dan akuntansi kami;',
          'analitik anonim yang tidak terhubung dengan permintaan: untuk jangka waktu terbatas sesuai kebijakan retensi kami, tidak disimpan selamanya;',
          'cookie: sesuai durasi yang tercantum di atas.',
        ],
      },
      {
        id: 'protection',
        title: 'Cara data dilindungi',
        paragraphs: [
          'Website ini diakses melalui HTTPS, akun staf dibuat oleh administrator, setiap peran hanya melihat data yang dibutuhkannya, dan setiap form diperiksa di server. Tidak ada website atau sistem penyimpanan yang bebas risiko; itu juga alasan kami hanya mengumpulkan data yang dijelaskan di sini.',
        ],
      },
      {
        id: 'requests',
        title: 'Permintaan terkait data Anda',
        paragraphs: [
          'Anda dapat menanyakan data apa yang kami simpan tentang Anda, meminta kami memperbaikinya atau menghapusnya, dan menarik kembali permintaan yang pernah Anda kirim. Kami akan menjawab dalam waktu yang wajar, dengan memperhatikan kewajiban hukum yang berlaku bagi kami, dan mungkin perlu memastikan bahwa permintaan itu memang berasal dari Anda. Tergantung hukum yang berlaku bagi Anda, Anda mungkin memiliki hak tambahan.',
          'Untuk mengajukan permintaan, hubungi tim kami melalui WhatsApp atau form di bagian bawah halaman ini, dan sebutkan bahwa ini adalah permintaan terkait privasi.',
        ],
        kind: 'contact',
      },
      {
        id: 'changes',
        title: 'Perubahan kebijakan ini',
        paragraphs: [
          'Kami memperbarui halaman ini bila cara website menangani data berubah. Tanggal di bagian atas menunjukkan versi yang berlaku.',
        ],
      },
    ] as LegalSection[],
  },

  terms: {
    title: 'Syarat Penggunaan',
    lead: 'Ketentuan penggunaan website ini. Layanan yang kami berikan kepada klien diatur dalam perjanjian tertulis tersendiri.',
    sections: [
      {
        id: 'about',
        title: 'Tentang syarat ini',
        paragraphs: [
          'Syarat ini berlaku saat Anda menggunakan website ini. Dengan menggunakannya, Anda menyetujui syarat ini; bila tidak setuju, mohon tidak menggunakan website ini. Di sini, "kami" berarti tim yang mengelola website ini.',
        ],
      },
      {
        id: 'information',
        title: 'Informasi di website ini',
        paragraphs: [
          'Website ini menjelaskan software, pendekatan implementasi, dan layanan kami secara umum. Isinya bukan penawaran, bukan penawaran harga, dan bukan komitmen untuk menyediakan fitur, integrasi, atau hasil tertentu. Contoh dan konsep tampilan memakai data contoh dan dapat berbeda dari yang disepakati untuk bisnis Anda. Kami dapat mengubah website ini kapan saja.',
        ],
      },
      {
        id: 'requests',
        title: 'Permintaan konsultasi dan demo',
        paragraphs: [
          'Mengirim form, mengklik tombol WhatsApp, atau berdiskusi dengan tim kami tidak menimbulkan kontrak. Ruang lingkup, hasil kerja, timeline, harga, dan tanggung jawab hanya ditetapkan dalam perjanjian tertulis tersendiri yang disetujui kedua belah pihak. Estimasi kebutuhan di halaman Harga adalah gambaran awal untuk diskusi, bukan penawaran harga.',
        ],
      },
      {
        id: 'software',
        title: 'Software dan implementasi',
        paragraphs: [
          'Isi platform klien, termasuk fitur, integrasi, dan kontrol keamanannya, bergantung pada ruang lingkup yang disepakati untuk setiap proyek. Halaman tentang compensation plan, integrasi, atau keamanan menjelaskan hal yang kami diskusikan dan rencanakan bersama Anda; isinya tidak berarti suatu kemampuan bisa langsung dipakai bisnis Anda sebelum disepakati.',
        ],
      },
      {
        id: 'growth',
        title: 'Layanan pendukung bisnis',
        paragraphs: [
          'Untuk pengelolaan media sosial, SEO & konten, iklan digital, dan branding, kami menyepakati ruang lingkup dan pendekatannya bersama Anda. Hasilnya dipengaruhi banyak faktor di luar kendali kami, seperti kondisi pasar, kebijakan platform, anggaran, dan produk Anda. Kami tidak menjanjikan hasil tertentu, misalnya posisi di mesin pencari, jumlah pengikut, leads, ROAS, atau penjualan.',
        ],
      },
      {
        id: 'maklon',
        title: 'Pengembangan & maklon produk',
        paragraphs: [
          'Pertanyaan atau permintaan terkait pengembangan produk maupun maklon tidak membentuk perjanjian produksi. Formulasi, minimum order (MOQ), ruang lingkup regulasi seperti registrasi produk, produksi, timeline, dan harga ditentukan dalam ruang lingkup tersendiri yang disepakati secara tertulis.',
        ],
      },
      {
        id: 'ip',
        title: 'Hak kekayaan intelektual',
        paragraphs: [
          'Teks, desain, grafis, dan logo di website ini milik kami atau pemiliknya masing-masing. Anda boleh melihat website ini, membagikan link-nya, serta mencetak atau menyimpan halaman untuk referensi pribadi. Menyalin, menerbitkan ulang, atau memakainya untuk tujuan komersial memerlukan izin tertulis dari kami.',
        ],
      },
      {
        id: 'acceptable-use',
        title: 'Penggunaan yang wajar',
        paragraphs: ['Gunakan website ini sesuai hukum. Mohon tidak:'],
        items: [
          'mengirim informasi palsu atau menyesatkan, data milik orang lain, atau spam melalui form;',
          'mencoba mengakses back office, akun, atau data yang tidak boleh Anda gunakan;',
          'memindai, menguji, atau mencari celah keamanan website ini, atau membebaninya dengan request otomatis, tanpa izin tertulis dari kami;',
          'menyalahgunakan kode referensi WhatsApp atau identitas lain dari website ini;',
          'menyalin konten website ini dalam jumlah besar dengan alat otomatis.',
        ],
        after: [
          'Bila Anda menemukan kemungkinan celah keamanan, mohon laporkan kepada kami melalui kontak di bawah, alih-alih melanjutkan pengujian.',
        ],
      },
      {
        id: 'availability',
        title: 'Ketersediaan website',
        paragraphs: [
          'Kami berupaya menjaga website ini tetap dapat diakses dan akurat, tetapi website disediakan sebagaimana adanya, dan sebagian isinya dapat kami ubah, hentikan sementara, atau hapus. Website mungkin sesekali tidak dapat diakses, misalnya saat pemeliharaan.',
        ],
      },
      {
        id: 'third-parties',
        title: 'Layanan dan link pihak ketiga',
        paragraphs: [
          'Website ini memakai atau menautkan layanan milik pihak lain, seperti WhatsApp dan layanan font yang menyediakan huruf di website ini. Syarat dan kebijakan mereka sendiri yang berlaku, dan kami tidak bertanggung jawab atas isi maupun ketersediaan layanan tersebut.',
        ],
      },
      {
        id: 'liability',
        title: 'Batasan tanggung jawab',
        paragraphs: [
          'Sejauh diizinkan oleh hukum, kami tidak bertanggung jawab atas kerugian tidak langsung, atau atas keputusan yang diambil hanya berdasarkan informasi umum di website ini. Tidak ada bagian dari syarat ini yang membatasi tanggung jawab yang menurut hukum tidak dapat dibatasi.',
        ],
      },
      {
        id: 'privacy',
        title: 'Privasi',
        paragraphs: ['Cara kami menangani data dijelaskan dalam Kebijakan Privasi.'],
        kind: 'privacy-link',
      },
      {
        id: 'changes',
        title: 'Perubahan syarat ini',
        paragraphs: [
          'Kami dapat memperbarui syarat ini. Tanggal di bagian atas menunjukkan versi yang berlaku, dan penggunaan website setelah perubahan berarti Anda menyetujui syarat yang diperbarui.',
        ],
      },
      {
        id: 'contact',
        title: 'Kontak',
        paragraphs: ['Ada pertanyaan tentang syarat ini? Hubungi tim kami.'],
        kind: 'contact',
      },
    ] as LegalSection[],
  },

  cookies: {
    caption: 'Cookie yang dipasang website ini',
    headers: { name: 'Cookie', purpose: 'Fungsi', duration: 'Durasi' },
    rows: [
      {
        name: 'Sesi',
        cookies: 'adonis-session, XSRF-TOKEN',
        purpose:
          'Menjaga kunjungan tetap tersambung antarhalaman: perlindungan form, pesan setelah form terkirim, dan cara Anda datang pada kunjungan tersebut. Juga menjaga staf tetap login di back office.',
        duration: '2 jam setelah aktivitas terakhir',
      },
      {
        name: 'Preferensi',
        cookies: 'mlmsoft_locale, mlmsoft_theme',
        purpose: 'Mengingat bahasa dan tema warna yang Anda pilih.',
        duration: '1 tahun',
      },
      {
        name: 'Analitik',
        cookies: 'mlmsoft_visitor, mlmsoft_visit',
        purpose:
          'ID pengunjung acak dan kunjungan saat ini. Tidak dipasang bila analitik nonaktif.',
        duration: '90 hari; kunjungan berakhir setelah 30 menit tanpa aktivitas',
      },
      {
        name: 'Pilihan analitik',
        cookies: 'mlmsoft_tracking',
        purpose: 'Mengingat bahwa Anda menonaktifkan analitik.',
        duration: '1 tahun',
      },
    ],
  },

  preference: {
    title: 'Analitik di browser ini',
    status: {
      on: 'Aktif. Kunjungan dari browser ini dihitung dengan ID acak.',
      off: 'Nonaktif. Anda telah menonaktifkan analitik untuk browser ini.',
      gpc: 'Nonaktif. Browser Anda mengirim Global Privacy Control, sehingga browser ini tidak dihitung.',
      disabled: 'Nonaktif. Analitik first-party sedang dimatikan untuk semua pengunjung.',
    },
    turnOff: 'Nonaktifkan analitik',
    turnOn: 'Aktifkan kembali analitik',
    saving: 'Menyimpan…',
  },

  contact: {
    form: 'Ke form kontak',
  },

  privacyLink: 'Baca Kebijakan Privasi',

  form: {
    title: 'Hubungi tim kami',
    text: 'Untuk pertanyaan tentang privasi, syarat penggunaan, atau layanan kami. Kami membalas lewat email atau WhatsApp.',
  },
}

export default legal
