import type en from '../en/security'

/**
 * Copy area: security (Bahasa Indonesia). /id/security.
 * Istilah teknis yang lazim (SSO, TLS, backup, deployment, discovery) tetap
 * dipakai; kalimat di sekitarnya ditulis dalam bahasa Indonesia.
 */
const security: typeof en = {
  hero: {
    eyebrow: 'Keamanan & Kepercayaan',
    title: 'Kebutuhan keamanan perlu jelas',
    highlight: 'sejak awal implementasi.',
    lead: 'Akses, data, integrasi, logging dan infrastruktur memiliki kebutuhan keamanan yang berbeda. Karena itu, pembahasannya perlu dimulai sejak tahap perancangan sistem.',
    cta: 'Diskusikan Kebutuhan Keamanan',
    secondary: 'Ajukan Konsultasi',
  },

  model: {
    caption: 'Konsep model keamanan',
    centre: 'Model keamanan',
    centreText: 'Disepakati per implementasi',
    nodes: {
      identity: { label: 'Identitas', text: 'Siapa penggunanya' },
      access: { label: 'Akses', text: 'Apa yang boleh dilakukan tiap peran' },
      data: { label: 'Data', text: 'Data mana yang sensitif' },
      integrations: { label: 'Integrasi', text: 'Data apa yang keluar dari sistem' },
      operations: { label: 'Operasional', text: 'Cara sistem berjalan dan dipulihkan' },
    },
    description:
      'Konsep area yang dihubungkan oleh sebuah model keamanan: identitas (siapa penggunanya), akses (apa yang boleh dilakukan tiap peran), data (data mana yang sensitif), integrasi (data apa yang keluar dari sistem) dan operasional (cara sistem berjalan dan dipulihkan). Model ini disepakati per implementasi.',
  },

  scope: {
    eyebrow: 'Keamanan dimulai dari cakupan',
    title: 'Keamanan tidak hanya bergantung pada aplikasi.',
    lead: 'Perlindungan sebuah sistem ditentukan oleh cara sistem itu dibangun, di-deploy, dihubungkan dan digunakan. Setiap area punya penanggung jawab, dan kami memperjelasnya sebelum pekerjaan dimulai.',
    ownerLabel: 'Tanggung jawab',
    items: [
      {
        title: 'Aplikasi',
        text: 'Peran, validasi, pengelolaan sesi dan alur kerja di dalam sistem.',
        owner: 'mlmsoft, sesuai cakupan yang disepakati',
      },
      {
        title: 'Infrastruktur',
        text: 'Hosting, jaringan, database, backup dan monitoring.',
        owner: 'Disepakati dalam arsitektur deployment',
      },
      {
        title: 'Akses pengguna',
        text: 'Siapa yang mendapat akun, dengan peran apa, dan kapan akun dicabut.',
        owner: 'Administrator Anda, dengan peran yang telah disepakati',
      },
      {
        title: 'Proses bisnis Anda',
        text: 'Persetujuan, pemisahan tugas dan cara menangani pengecualian.',
        owner: 'Tim Anda, dengan masukan kami saat discovery',
      },
      {
        title: 'Integrasi pihak ketiga',
        text: 'Payment, bank, logistik dan provider lain yang bertukar data dengan sistem.',
        owner: 'Dibagi bersama setiap provider',
      },
      {
        title: 'Praktik operasional',
        text: 'Rilis, penanganan insiden, peninjauan akses dan perubahan dari waktu ke waktu.',
        owner: 'Disepakati oleh kedua tim',
      },
    ],
  },

  access: {
    eyebrow: 'Akses & identitas',
    title: 'Setiap peran cukup melihat yang dibutuhkan, tidak lebih.',
    lead: 'Akses dirancang mengikuti tim Anda, bukan template standar. Ini pertanyaan yang kami bahas bersama.',
    questions: [
      'Siapa saja yang membutuhkan akses: kantor pusat, finance, operasional, stokis, member?',
      'Apa saja yang boleh dilihat oleh setiap peran?',
      'Aksi apa yang memerlukan kontrol tambahan atau persetujuan kedua?',
      'Bagaimana akun dibuat, diubah dan dicabut saat orang berganti peran atau keluar?',
      'Apakah perlu single sign-on dengan identity provider Anda?',
    ],
    sso: {
      title: 'Single sign-on',
      text: 'Kebutuhan SSO dapat dinilai saat technical discovery. SSO tidak boleh dianggap tersedia sebelum identity provider yang dipilih dan cakupan implementasinya dikonfirmasi.',
    },
  },

  data: {
    eyebrow: 'Perlindungan data',
    title: 'Tidak semua tim perlu mengakses semua data.',
    lead: 'Data member, order dan payout berarti data pribadi dan keuangan. Menentukan siapa yang boleh melihat, mengubah dan mengekspornya adalah bagian dari desain.',
    items: [
      {
        title: 'Klasifikasi',
        text: 'Data mana yang bersifat pribadi, mana yang keuangan, dan mana yang sensitif bagi bisnis Anda.',
      },
      {
        title: 'Akses seperlunya',
        text: 'Setiap tim melihat data yang dibutuhkan pekerjaannya, bukan seluruh database.',
      },
      {
        title: 'Kepemilikan',
        text: 'Siapa yang bertanggung jawab atas tiap jenis data, dan siapa yang boleh mengoreksinya.',
      },
      {
        title: 'Retensi',
        text: 'Berapa lama setiap jenis data disimpan, dan apa yang terjadi setelahnya.',
      },
      {
        title: 'Ekspor',
        text: 'Siapa yang boleh mengekspor data, dalam format apa, dan bagaimana hasil ekspor ditangani.',
      },
      {
        title: 'Data pribadi dan keuangan',
        text: 'Dokumen identitas, rekening bank dan riwayat payout mendapat aturan paling ketat.',
      },
    ],
    financial: {
      title: 'Alur keuangan butuh lebih dari sekadar kontrol akses.',
      lead: 'Komisi, wallet, payout dan pajak menyangkut uang. Apa pun cakupan akhirnya, kami merancang alur ini dengan empat prinsip.',
      principles: [
        {
          title: 'Kewenangan yang jelas',
          text: 'Disepakati siapa yang boleh menyesuaikan, menyetujui atau mencairkan suatu nominal, dan siapa yang tidak.',
        },
        {
          title: 'Jejak perubahan',
          text: 'Setiap perubahan nominal dapat ditelusuri ke orang, waktu dan alasannya.',
        },
        {
          title: 'Validasi',
          text: 'Nominal diperiksa terhadap aturan yang disepakati sebelum disetujui.',
        },
        {
          title: 'Rekonsiliasi',
          text: 'Total dapat dicocokkan dengan pembayaran, catatan bank dan laporan finance.',
        },
      ],
      note: 'Ini adalah prinsip desain untuk menyusun cakupan platform Anda, bukan gambaran mesin komisi atau payout yang sudah ada.',
    },
  },

  integrations: {
    eyebrow: 'Integrasi',
    title: 'Setiap koneksi ke sistem lain adalah keputusan keamanan.',
    lead: 'Integrasi memindahkan data dari satu sistem ke sistem lain. Setiap integrasi disusun cakupannya dengan pertanyaan berikut.',
    items: [
      {
        title: 'Kredensial',
        text: 'Di mana key dan secret disimpan, serta siapa yang boleh melihat atau menggantinya.',
      },
      {
        title: 'Autentikasi',
        text: 'Cara setiap sistem membuktikan identitasnya sebelum bertukar data.',
      },
      {
        title: 'Cakupan data',
        text: 'Hanya data yang dibutuhkan sistem lain, tidak lebih.',
      },
      {
        title: 'Verifikasi callback',
        text: 'Cara memastikan pesan dari provider memang asli sebelum ditindaklanjuti.',
      },
      {
        title: 'Retry tanpa duplikasi',
        text: 'Cara mengulang panggilan yang gagal tanpa membuat pembayaran atau order kedua.',
      },
      {
        title: 'Akses vendor',
        text: 'Apa yang boleh diakses provider atau kontraktor dari luar, dan untuk berapa lama.',
      },
    ],
    link: 'Pendekatan kami untuk integrasi',
  },

  audit: {
    eyebrow: 'Audit & jejak perubahan',
    title: 'Perubahan pada data penting bisnis perlu memiliki riwayat yang jelas.',
    lead: 'Siapa mengubah apa, dan kapan. Kami memisahkan apa yang sudah berjalan di sistem internal kami dengan apa yang dibutuhkan platform Anda.',
    today: {
      title: 'Di back office internal mlmsoft saat ini',
      text: 'Perubahan status lead dan catatan yang ditambahkan tersimpan bersama nama staf dan waktunya. Ini adalah pengelolaan lead internal kami, bukan platform pelanggan.',
    },
    platform: {
      title: 'Disepakati untuk platform Anda',
      text: 'Perubahan mana yang perlu riwayat adalah bagian dari cakupan. Contoh yang umum:',
      items: [
        'Penyesuaian komisi dan bonus',
        'Koreksi wallet dan persetujuan payout',
        'Perubahan aturan compensation plan',
        'Perubahan peran dan hak akses',
        'Perubahan data member dan jaringan',
      ],
    },
  },

  infrastructure: {
    eyebrow: 'Infrastruktur & operasional',
    title: 'Kontrol infrastruktur dipastikan sebagai bagian dari arsitektur deployment.',
    lead: 'Di mana dan bagaimana sistem berjalan ditentukan per implementasi. Topik-topik ini disepakati secara tertulis sebelum production, bukan diasumsikan.',
    items: [
      { title: 'HTTPS', text: 'Koneksi terenkripsi antara browser, aplikasi dan sistem.' },
      {
        title: 'Database',
        text: 'Di mana database berjalan, siapa yang bisa menjangkaunya dan bagaimana akses diberikan.',
      },
      {
        title: 'Backup',
        text: 'Seberapa sering data di-backup, di mana salinannya disimpan dan bagaimana restore diuji.',
      },
      {
        title: 'Monitoring',
        text: 'Masalah apa yang memicu peringatan, dan siapa yang menerimanya.',
      },
      {
        title: 'Pemisahan environment',
        text: 'Development, testing dan production dipisahkan, dengan data dan akses masing-masing.',
      },
      {
        title: 'Secret',
        text: 'Cara key dan password disimpan di luar kode, dan siapa yang mengelolanya.',
      },
      {
        title: 'Deployment',
        text: 'Cara perubahan masuk ke production, dan siapa yang menyetujuinya.',
      },
    ],
  },

  discovery: {
    eyebrow: 'Yang kami periksa saat discovery',
    title: 'Pertanyaan yang kami perjelas sebelum implementasi.',
    lead: 'Jawabannya membentuk peran, alur kerja, integrasi dan rencana deployment. Pertanyaan yang belum terjawab wajar di tahap ini.',
    items: [
      { area: 'Akses', question: 'Siapa yang membutuhkan akses?' },
      { area: 'Data', question: 'Data apa yang sensitif?' },
      { area: 'Integrasi', question: 'Sistem eksternal mana yang menerima data?' },
      { area: 'Kontrol keuangan', question: 'Aksi apa yang memerlukan persetujuan?' },
      { area: 'Audit', question: 'Apa yang perlu bisa ditelusuri riwayatnya?' },
      { area: 'Infrastruktur', question: 'Di mana dan bagaimana sistem di-deploy?' },
      { area: 'Pemulihan', question: 'Seperti apa ekspektasi pemulihannya?' },
    ],
    compliance:
      'Jika organisasi Anda memiliki persyaratan regulasi atau kepatuhan, sertakan saat discovery.',
  },

  checklist: {
    eyebrow: 'Sebelum diskusi pertama',
    title: 'Apa yang sudah Anda ketahui?',
    lead: 'Centang hal yang sudah bisa dijawab tim Anda. Tidak ada skor, dan tidak ada yang disimpan atau dikirim.',
    label: 'Tim kami sudah mengetahui',
    items: [
      'Kami tahu tim mana yang membutuhkan akses.',
      'Kami tahu data mana yang sensitif.',
      'Kami tahu integrasi mana yang bertukar data sensitif.',
      'Kami tahu siapa yang menyetujui aksi keuangan.',
      'Kami punya persyaratan backup dan pemulihan.',
      'Kami punya persyaratan keamanan atau kepatuhan.',
    ],
    result: 'Ini adalah masukan yang berguna untuk diskusi technical discovery.',
    resultEmpty:
      'Pertanyaan yang belum terjawab tidak masalah: memperjelasnya adalah tujuan discovery.',
  },

  midCta: {
    eyebrow: 'Bahas bersama',
    title: 'Bawa pertanyaan keamanan Anda ke diskusi pertama.',
    text: 'Ceritakan tim, data dan sistem yang Anda gunakan. Kami akan membahas kebutuhannya bersama Anda, sebelum apa pun dibangun.',
    whatsapp: 'Diskusikan Kebutuhan Keamanan',
  },

  verified: {
    eyebrow: 'Transparansi',
    title: 'Yang sudah dapat kami verifikasi',
    lead: 'Kontrol yang sudah berjalan dan diuji di sistem internal kami.',
    caption:
      'Kontrol ini berlaku untuk aplikasi marketing dan pengelolaan lead internal mlmsoft saat ini. Kontrol pada platform pelanggan ditentukan oleh cakupan implementasi.',
  },

  faq: {
    title: 'Pertanyaan seputar keamanan',
    lead: 'Jawaban apa adanya, termasuk hal yang belum diputuskan.',
    items: [
      {
        q: 'Bagaimana pendekatan keamanan selama implementasi?',
        a: 'Keamanan adalah bagian dari discovery dan desain solusi, bukan langkah setelah go-live. Kami memperjelas siapa yang membutuhkan akses, data mana yang sensitif, sistem mana yang bertukar data, aksi keuangan mana yang perlu persetujuan, apa yang perlu bisa ditelusuri, bagaimana sistem di-deploy dan ekspektasi pemulihannya. Jawabannya menjadi bagian dari cakupan.',
      },
      {
        q: 'Apakah data pelanggan dienkripsi?',
        a: 'Kontrol transport dan penyimpanan bergantung pada arsitektur deployment final. Persyaratan keamanan, termasuk TLS dan perlindungan penyimpanan, ditinjau sebelum deployment production. Secara terpisah, password staf di back office internal kami disimpan sebagai hash satu arah dengan salt; hashing tidak sama dengan enkripsi.',
      },
      {
        q: 'Apakah ada akses berbasis peran (role-based access)?',
        a: 'Back office internal kami saat ini memakai peran: setiap staf hanya melihat area yang diizinkan untuk perannya, dan setiap aksi diperiksa di server. Untuk platform Anda, peran dan apa yang boleh dilihat atau diubah oleh tiap peran ditentukan saat discovery sesuai tim Anda, bukan diambil dari template.',
      },
      {
        q: 'Apakah SSO tersedia?',
        a: 'Kebutuhan SSO dapat dinilai saat technical discovery. SSO tidak boleh dianggap tersedia sebelum identity provider yang dipilih dan cakupan implementasinya dikonfirmasi.',
      },
      {
        q: 'Bagaimana keamanan integrasi dijaga?',
        a: 'Setiap integrasi memiliki keputusannya sendiri: cara sistem saling mengautentikasi, di mana kredensial disimpan dan siapa yang boleh melihatnya, data apa yang dibagikan, cara pesan dari provider diverifikasi, dan cara kegagalan diulang tanpa efek ganda. Akses vendor juga disepakati.',
      },
      {
        q: 'Bagaimana backup ditangani?',
        a: 'Persyaratan backup dan pemulihan ditetapkan sebagai bagian dari rencana infrastruktur production. Persyaratan tersebut perlu diuji sebelum sistem dianggap siap production.',
      },
      {
        q: 'Apakah ada audit log?',
        a: 'Di back office internal kami, perubahan status lead dan catatan yang ditambahkan tersimpan bersama nama staf dan waktunya. Untuk platform Anda, perubahan mana yang perlu riwayat, misalnya penyesuaian komisi, persetujuan payout atau perubahan peran, disepakati saat discovery dan menjadi bagian dari cakupan.',
      },
      {
        q: 'Di mana data di-hosting?',
        a: 'Hosting ditentukan per implementasi sebagai bagian dari arsitektur deployment: environment, lokasi, siapa yang mengoperasikan dan siapa yang memiliki akses. Jika organisasi Anda memiliki persyaratan lokasi data, sertakan saat discovery.',
      },
      {
        q: 'Apakah persyaratan keamanan bisa disesuaikan?',
        a: 'Ya. Aturan akses, langkah persetujuan untuk aksi keuangan, retensi, riwayat audit dan batasan deployment dibahas per proyek dan menjadi bagian dari cakupan, penawaran dan jadwal.',
      },
      {
        q: 'Apakah mlmsoft memiliki sertifikasi keamanan?',
        a: 'Saat ini belum. mlmsoft tidak memiliki sertifikasi keamanan seperti ISO 27001 atau SOC 2, dan kami tidak mengklaimnya. Jika organisasi Anda memiliki persyaratan regulasi atau kepatuhan, sertakan saat discovery agar menjadi bagian dari rencana.',
      },
    ],
  },

  finalCta: {
    title: 'Jadikan keamanan bagian dari rencana sejak hari pertama.',
    text: 'Diskusikan kebutuhan akses, data, integrasi dan deployment Anda bersama tim sebelum implementasi dimulai.',
    whatsapp: 'Diskusikan Kebutuhan Keamanan',
    demo: 'Jadwalkan Demo',
  },

  form: {
    title: 'Ceritakan kebutuhan keamanan organisasi Anda.',
    text: 'Ceritakan hal yang penting bagi organisasi Anda. Tim kami akan menghubungi Anda untuk membahas akses, data, integrasi dan deployment.',
  },
}

export default security
