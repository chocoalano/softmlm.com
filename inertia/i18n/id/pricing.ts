import type en from '../en/pricing'

const pricing: typeof en = {
  hero: {
    eyebrow: 'Harga mlmsoft',
    title: 'Harga yang disesuaikan dengan',
    titleAccent: 'kebutuhan bisnis Anda.',
    lead: 'Jumlah member, struktur compensation plan, modul, integrasi dan kebutuhan migrasi, semuanya ikut menentukan cakupan implementasi.',
    whatsapp: 'Diskusikan harga via WhatsApp',
    estimate: 'Mulai estimasi kebutuhan',
  },

  estimate: {
    eyebrow: 'Estimasi kebutuhan',
    title: 'Tiga langkah, sekitar dua menit.',
    lead: 'Tidak ada angka harga di akhir, dan tidak perlu mendaftar. Jawaban Anda membantu tim kami memahami cakupan kebutuhan sebelum kita berdiskusi.',
  },

  wizard: {
    progressLabel: 'Tahapan estimasi',
    steps: {
      business: 'Bisnis Anda',
      modules: 'Kebutuhan Anda',
      implementation: 'Implementasi',
    },
    stepOf: (step: number, total: number) => `Langkah ${step} dari ${total}`,
    questions: {
      businessType: 'Apa jenis bisnis Anda?',
      activeMembers: 'Berapa kira-kira jumlah member aktif Anda?',
      currentSystem: 'Apakah saat ini Anda sudah memiliki sistem?',
      modules: 'Area apa saja yang Anda butuhkan? Pilih semua yang sesuai.',
      compensation: 'Seberapa kompleks compensation plan Anda?',
      migration: 'Data apa saja yang perlu dipindahkan?',
      integrations: 'Sistem apa saja yang perlu dihubungkan?',
    },
    back: 'Kembali',
    continue: 'Lanjut',
    finish: 'Lihat ringkasan',
    incomplete: 'Jawab semua pertanyaan untuk melanjutkan.',
    result: {
      title: 'Kebutuhan Anda',
      summary: {
        businessType: 'Jenis bisnis',
        activeMembers: 'Member aktif',
        currentSystem: 'Sistem saat ini',
        modules: 'Modul',
        compensation: 'Compensation plan',
        migration: 'Migrasi data',
        integrations: 'Integrasi',
      },
      message:
        'Cakupan seperti ini diestimasi berdasarkan aturan bisnis dan kebutuhan implementasi Anda. Hubungi tim kami untuk mendapatkan penawaran yang sesuai dengan bisnis Anda.',
      whatsapp: 'Diskusikan estimasi via WhatsApp',
      privacy:
        'Jawaban Anda hanya tersimpan di halaman ini. WhatsApp akan terbuka dengan pesan standar singkat; pilihan Anda tidak ikut terkirim kecuali Anda sendiri yang membagikannya.',
      change: 'Ubah jawaban',
      restart: 'Mulai ulang',
    },
  },

  details: {
    factors: {
      eyebrow: 'Dasar penawaran',
      title: 'Apa saja yang memengaruhi harga?',
      lead: 'Enam faktor ini paling menentukan cakupan implementasi, sekaligus harganya.',
      items: {
        scale: {
          title: 'Skala bisnis',
          text: 'Jumlah member aktif Anda saat ini, dan seberapa cepat jaringan Anda bertumbuh.',
        },
        compensation: {
          title: 'Kompleksitas compensation plan',
          text: 'Berapa banyak jenis bonus, kualifikasi dan rank, serta seberapa khusus aturannya.',
        },
        modules: {
          title: 'Modul',
          text: 'Area yang Anda butuhkan sekarang, dan area yang bisa menyusul kemudian.',
        },
        integration: {
          title: 'Integrasi',
          text: 'Sistem pembayaran, logistik, akuntansi dan pengiriman pesan yang perlu dihubungkan.',
        },
        migration: {
          title: 'Migrasi',
          text: 'Data member, struktur jaringan dan riwayat yang perlu dipindahkan dari sistem Anda saat ini.',
        },
        support: {
          title: 'Dukungan implementasi',
          text: 'Pelatihan untuk tim Anda dan tingkat dukungan yang Anda perlukan setelah sistem berjalan.',
        },
      },
    },
    steps: {
      eyebrow: 'Implementasi',
      title: 'Seperti apa tahapan implementasinya?',
      lead: 'Setiap proyek melalui delapan tahap yang sama. Lama tiap tahap bergantung pada cakupan kebutuhan Anda; jadwal tertulis kami berikan setelah tahap discovery.',
      cta: 'Diskusikan implementasi',
      items: {
        discovery: {
          title: 'Discovery',
          text: 'Memahami model bisnis dan tujuan Anda.',
        },
        mapping: {
          title: 'Pemetaan bisnis',
          text: 'Compensation plan dan alur kerja Anda ditulis dan disepakati bersama.',
        },
        configuration: {
          title: 'Konfigurasi',
          text: 'Sistem disiapkan mengikuti aturan bisnis Anda.',
        },
        integration: {
          title: 'Integrasi',
          text: 'Menghubungkan aplikasi yang sudah Anda gunakan.',
        },
        migration: {
          title: 'Migrasi',
          text: 'Pemindahan data disertai pengecekan rekonsiliasi.',
        },
        testing: {
          title: 'Pengujian',
          text: 'Hasil perhitungan dicocokkan dengan angka Anda.',
        },
        training: {
          title: 'Pelatihan',
          text: 'Tim Anda siap menjalankan operasional sehari-hari.',
        },
        launch: {
          title: 'Go-live',
          text: 'Peluncuran yang terencana, didampingi tim kami.',
        },
      },
    },
  },

  faq: {
    title: 'Pertanyaan seputar harga.',
    lead: 'Apa yang bisa kami sampaikan sebelum diskusi, dan apa yang bergantung pada cakupan kebutuhan Anda.',
    items: [
      {
        q: 'Apakah ada paket harga tetap?',
        a: 'Untuk saat ini belum. Setiap bisnis sangat berbeda dari sisi ukuran jaringan, compensation plan dan integrasi, sehingga tim kami menyusun penawaran berdasarkan cakupan implementasi Anda.',
      },
      {
        q: 'Apa saja yang memengaruhi biaya implementasi?',
        a: 'Terutama skala bisnis, tingkat kompleksitas compensation plan, modul yang dibutuhkan, integrasi, migrasi data dan tingkat dukungan setelah sistem berjalan.',
      },
      {
        q: 'Apakah bisa mulai dengan beberapa modul dulu?',
        a: 'Hal ini bisa didiskusikan. Banyak bisnis memulai dari area yang paling penting; apa saja yang masuk tahap pertama disepakati berdasarkan cakupan kebutuhan Anda.',
      },
      {
        q: 'Apakah sistem kami saat ini bisa dimigrasikan?',
        a: 'Sering kali bisa. Apa yang bisa dimigrasikan, dan bagaimana caranya, bergantung pada sistem dan data Anda saat ini. Kami menilainya pada tahap discovery.',
      },
      {
        q: 'Apakah compensation plan custom bisa didiskusikan?',
        a: 'Bisa. Siapkan dokumen plan Anda dan contoh payout sebelumnya; kami memetakannya aturan demi aturan bersama tim Anda.',
      },
      {
        q: 'Apakah ada biaya maintenance atau support?',
        a: 'Tim kami akan membahasnya berdasarkan cakupan implementasi Anda.',
      },
      {
        q: 'Bagaimana cara mendapatkan penawaran?',
        a: 'Isi estimasi kebutuhan di halaman ini atau hubungi kami via WhatsApp. Setelah diskusi singkat tentang bisnis Anda, tim kami menyiapkan penawarannya.',
      },
    ],
  },

  demo: {
    title: 'Belum yakin kebutuhan Anda masuk kategori yang mana?',
    text: 'Ceritakan saja tentang bisnis Anda. Tidak perlu memakai istilah teknis; tim kami akan membantu memetakannya.',
  },
}

export default pricing
