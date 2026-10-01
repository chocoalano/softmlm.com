import type en from '../en/compensation'

const compensation: typeof en = {
  units: {
    thousand: 'rb',
    million: 'jt',
    billion: ' miliar',
    decimal: ',',
  },

  hero: {
    eyebrow: 'Compensation Plan',
    titleLead: 'Sistem bonus harus',
    titleAccent: 'mengikuti cara bisnis Anda berjalan.',
    lead: 'Setiap perusahaan punya struktur bonus, kualifikasi dan rank sendiri. mlmsoft membantu Anda memetakannya ke dalam sistem yang lebih tertata, transparan dan mudah dikelola.',
    whatsapp: 'Diskusikan compensation plan Anda',
    approach: 'Lihat cara kami memetakan sebuah plan',
    cards: {
      binary: 'Binary',
      override: 'Override',
      rank: 'Rank',
    },
  },

  architecture: {
    eyebrow: 'Pendekatan kami',
    title: 'Setiap plan bisa diurai menjadi kondisi pemicu, aturan dan payout.',
    lead: 'Apa pun jenis plan Anda, kami mengurainya dengan cara yang sama: apa saja yang memicu bonus, aturan mana yang berlaku, bagaimana bonus dihitung dan ke mana bonus dibayarkan. Sistem dirancang mengikuti struktur itu.',
    flowLabel: 'Cara sebuah plan diurai',
    stages: {
      events: {
        label: 'Kondisi pemicu',
        items: ['Order lunas', 'Registrasi', 'Penempatan', 'Tutup periode'],
      },
      rules: {
        label: 'Aturan',
        items: ['Aturan bonus', 'Kualifikasi', 'Syarat rank', 'Batas maksimum'],
      },
      calculation: {
        label: 'Perhitungan',
        items: ['Volume per leg', 'Upline yang berhak', 'Nilai bonus', 'Perubahan rank'],
      },
      postings: {
        label: 'Pencatatan',
        items: ['Ledger wallet', 'Pemotongan pajak', 'Laporan', 'Jejak audit'],
      },
    },
    principles: {
      data: {
        title: 'Aturan adalah data, bukan kode',
        text: 'Persentase, batas maksimum dan syarat kualifikasi dirancang sebagai konfigurasi yang bisa diperiksa tim Anda, bukan rumus yang tersembunyi di dalam kode.',
      },
      explainable: {
        title: 'Setiap hasil bisa dijelaskan',
        text: 'Setiap bonus harus bisa ditelusuri ke order, aturan dan versi aturan yang menghasilkannya.',
      },
      history: {
        title: 'Riwayat tidak pernah ditulis ulang',
        text: 'Perubahan plan berlaku mulai tanggal tertentu. Payout yang sudah terjadi tetap seperti semula.',
      },
    },
  },

  patterns: {
    eyebrow: 'Struktur plan',
    title: 'Struktur compensation plan yang umum.',
    lead: 'Struktur di bawah ini kami gunakan sebagai acuan saat memetakan kebutuhan bisnis Anda. Implementasi akhirnya mengikuti hasil analisis sistem Anda.',
    items: {
      binary: {
        name: 'Binary',
        text: 'Dua leg per member. Volume dari leg yang lebih kecil dipasangkan dengan leg yang lebih besar, lengkap dengan batas maksimum dan carry-over.',
      },
      unilevel: {
        name: 'Unilevel',
        text: 'Setiap member bisa punya member langsung berapa pun, dengan bonus dibayarkan sampai sejumlah level tetap di bawahnya.',
      },
      matrix: {
        name: 'Matrix',
        text: 'Lebar dan kedalaman yang tetap. Member baru mengisi posisi kosong berikutnya, termasuk limpahan (spill-over) dari atas.',
      },
      generation: {
        name: 'Generation',
        text: 'Leader mendapat bonus dari organisasinya sampai ke leader berikutnya yang memenuhi kualifikasi, sering kali dengan kompresi yang melewati member tidak aktif.',
      },
      hybrid: {
        name: 'Hybrid',
        text: 'Beberapa jenis bonus dalam satu plan, misalnya bonus pasangan dan override di satu jalur, bonus retail dan cashback di jalur lain.',
      },
      custom: {
        name: 'Custom',
        text: 'Bonus khusus untuk plan Anda, disusun dari komponen yang sama: dasar perhitungan, persentase, syarat penerima dan batas maksimum.',
      },
    },
  },

  builder: {
    eyebrow: 'Rule builder',
    title: 'Aturan yang bisa dibaca tim Anda, bukan rumus di dalam kode.',
    lead: 'Coba pratinjaunya: ubah persentase atau metodenya, lalu jalankan contoh order melalui aturan ini. Semuanya berjalan dengan data contoh di browser Anda.',
    fieldsLabel: 'Satu aturan dirancang untuk memuat',
    fields: [
      'Nama aturan dan jenis bonus',
      'Dasar perhitungan, misalnya nilai agent point',
      'Metode nilai: persentase atau nominal tetap',
      'Volume minimum dan syarat penerima',
      'Tanggal berlaku',
    ],
    ask: 'Aturan bonus Anda lebih kompleks?',
    askLink: 'Diskusikan dengan tim kami',
    caption: 'Konsep interaktif · data contoh, hanya berjalan di browser Anda',

    preview: {
      kicker: 'Aturan bonus',
      name: 'Bonus Sponsor Langsung',
      status: 'Draf · v4',
      base: 'Dasar perhitungan',
      baseValue: 'Agent Point (AP)',
      method: 'Metode',
      percentage: 'Persentase',
      fixed: 'Nominal tetap',
      rate: 'Persentase bonus',
      amount: 'Nominal per order yang memenuhi syarat',
      eligibility: 'Syarat penerima',
      eligibilityValue: 'Member aktif',
      minimum: 'AP minimum',
      effective: 'Tanggal berlaku',
      effectiveValue: '01 Jan 2027',
      simulate: 'Simulasikan contoh order',
      orderTotal: 'Total order',
      pointValue: 'Nilai Agent Point',
      qualifies: 'Memenuhi syarat',
      yes: 'Ya',
      belowMinimum: 'Di bawah minimum',
      result: 'Bonus untuk sponsor',
      save: 'Simpan aturan',
      previewOnly: 'Hanya pratinjau',
    },
  },

  features: {
    qualification: {
      eyebrow: 'Kualifikasi & syarat penerima',
      title: 'Bonus hanya untuk member yang memenuhi syarat.',
      text: 'Setiap bonus dirancang untuk memeriksa siapa yang berhak menerimanya dalam satu periode: status aktif, volume pribadi, penempatan, verifikasi dan paid-as rank.',
      points: [
        'Keaktifan diukur per periode, bukan sekali saja',
        'Syarat berbeda untuk setiap jenis bonus',
        'Alasan yang jelas saat member tidak memenuhi syarat',
      ],
    },
    ranks: {
      eyebrow: 'Aturan rank',
      title: 'Naik rank dengan syarat yang jelas dan terlihat.',
      text: 'Aturan rank dirancang berdasarkan syarat seperti volume grup dan jumlah sponsor langsung yang memenuhi kualifikasi, sehingga member tahu persis apa yang masih perlu dicapai.',
      points: [
        'Syarat berdasarkan volume dan sponsor langsung yang memenuhi kualifikasi',
        'Progres terlihat oleh member dan kantor pusat',
        'Periode rank dan syarat mempertahankannya disepakati bersama Anda',
      ],
    },
    override: {
      eyebrow: 'Logika override',
      title: 'Override leader dengan kompresi.',
      text: 'Override generasi dirancang untuk memberi bonus kepada leader dari volume organisasinya. Dengan kompresi, member yang tidak aktif dilewati sehingga leader yang memenuhi syarat tetap mendapat bagiannya. Coba nyalakan atau matikan di pratinjau.',
      points: [
        'Persentase per generasi atau per rank',
        'Kompresi yang melewati member tidak aktif',
        'Berhenti di leader berikutnya yang memenuhi syarat, jika plan mengaturnya',
      ],
    },
    simulation: {
      eyebrow: 'Simulasi',
      title: 'Ketahui biaya perubahan sebelum member merasakannya.',
      text: 'Sebelum perubahan aturan sampai ke member, biayanya harus jelas. Kami merancang agar setiap perubahan plan diuji dulu dengan data periode sebelumnya, sehingga Anda melihat dampaknya per jenis bonus.',
      points: [
        'Aturan saat ini dan usulan, berdampingan',
        'Dampak per jenis bonus dan per member',
        'Belum ada yang dibayarkan sampai Anda menerapkannya',
      ],
    },
    versioning: {
      eyebrow: 'Versi aturan',
      title: 'Perubahan plan berlaku mulai tanggal tertentu.',
      text: 'Kami merancang perubahan aturan sebagai versi dengan tanggal berlaku, sehingga setiap order dihitung dengan aturan yang berlaku saat order itu dibayar.',
      points: [
        'Versi terjadwal dengan tanggal berlaku',
        'Payout lama tidak pernah dihitung ulang diam-diam',
        'Riwayat yang mudah dibaca: apa yang berubah dan kapan',
      ],
    },
    reversal: {
      eyebrow: 'Audit & koreksi',
      title: 'Setiap koreksi meninggalkan jejak.',
      text: 'Refund, pembatalan dan retur dirancang sebagai entri pembalik yang mengimbangi bonus awal, bukan menghapusnya, sehingga setiap perubahan tetap bisa ditelusuri.',
      points: [
        'Entri pembalik terhubung ke order asalnya',
        'Setiap bonus bisa ditelusuri ke order dan versi aturannya',
        'Bonus yang sudah dibayar tidak diubah diam-diam',
      ],
    },
    walletTax: {
      eyebrow: 'Wallet & pajak',
      title: 'Dari bonus ke wallet, dengan pajak yang tercatat.',
      text: 'Bonus yang sudah final dirancang masuk ke catatan wallet dengan saldo berjalan, sementara pajaknya dipotong dan dicatat per member dan per periode sesuai aturan dari konsultan pajak Anda.',
      points: [
        'Nilai bruto, potongan pajak dan neto dicatat terpisah',
        'Entri ledger, bukan menimpa saldo',
        'Catatan pemotongan pajak per member dan periode',
      ],
    },
  },

  visuals: {
    demoData: 'Data demo',
    illustration: 'Ilustrasi',
    qualification: {
      label: 'Cek kualifikasi · Sep 2026',
      checks: {
        active: 'Aktif: volume pribadi Rp620.000 (minimal Rp500.000)',
        placed: 'Sudah ditempatkan di jaringan',
        verified: 'Identitas terverifikasi',
        rank: 'Butuh paid-as rank Platinum untuk override leader',
      },
      resultLabel: 'Memenuhi syarat periode ini untuk',
      resultValue: 'Bonus sponsor · Pasangan · Override generasi',
    },
    rank: {
      label: 'Syarat rank',
      title: 'Progres Sarah Wijaya',
      achieved: 'Tercapai',
      rules: {
        silver: 'Volume grup Rp10jt dan 2 sponsor langsung',
        gold: '2 sponsor langsung di rank Silver',
        platinum: '2 sponsor langsung di rank Gold',
        diamond: '2 sponsor langsung di rank Platinum',
      },
    },
    override: {
      label: 'Override generasi dari volume Rp1.000.000',
      title: 'Siapa yang menerima, dan di generasi mana',
      compression: 'Kompresi',
      columns: {
        upline: 'Upline',
        status: 'Status',
        generation: 'Generasi',
        override: 'Override',
      },
      active: 'Aktif',
      inactive: 'Tidak aktif',
      skipped: 'Dilewati',
      withCompression: 'Dengan kompresi, member tidak aktif dilewati',
      withoutCompression: 'Tanpa kompresi, member tidak aktif tetap terhitung satu generasi',
      total: 'Total dibayar',
    },
    simulation: {
      label: 'Skenario: bonus pasangan Rp20.000 → Rp22.000 per pasang',
      title: 'Hitung ulang Sep 2026, aturan saat ini vs usulan',
      rows: {
        total: 'Total bonus',
        pairing: 'Bonus pasangan',
        override: 'Bonus override',
      },
      current: 'Aturan saat ini',
      proposed: 'Aturan usulan',
    },
    versioning: {
      label: 'Versi plan',
      title: 'Plan hybrid',
      versions: {
        v1: {
          name: 'Versi 1',
          status: 'Diarsipkan',
          meta: 'Berlaku 01 Jan 2025 · order sampai 28 Feb 2026',
        },
        v2: {
          name: 'Versi 2',
          status: 'Aktif',
          meta: 'Berlaku sejak 01 Mar 2026',
        },
        v3: {
          name: 'Versi 3',
          status: 'Terjadwal',
          meta: 'Berlaku 01 Jan 2027 · pasangan Rp22.000 per pasang',
        },
      },
      resultLabel: 'Order yang dibayar 31 Des 2026',
      resultValue: 'dihitung dengan versi 2',
    },
    reversal: {
      label: 'Order INV-20874 · refund',
      title: 'Entri yang terhubung ke order ini',
      bonus: 'Bonus sponsor langsung',
      bonusMeta: 'Budi S. · dicatat 27 Sep',
      reversal: 'Entri pembalik · order di-refund',
      reversalMeta: 'Budi S. · dicatat 29 Sep',
      resultLabel: 'Kedua entri merujuk ke order dan versi aturan yang sama',
      net: 'Neto',
    },
    walletTax: {
      label: 'Bonus pasangan · 29 Sep 2026',
      title: 'Dari bonus ke wallet',
      gross: 'Bonus bruto',
      withheld: 'Pajak dipotong',
      credited: 'Masuk ke wallet',
      ledger: 'Entri ledger wallet dengan saldo berjalan',
      withholding: 'Catatan pemotongan pajak per member dan periode',
      foot: 'Tarif di sini hanya contoh. Aturan sebenarnya ditetapkan oleh konsultan pajak Anda.',
    },
  },

  migration: {
    eyebrow: 'Plan yang sudah berjalan',
    title: 'Sudah menjalankan plan? Mulai dari situ.',
    lead: 'Memindahkan compensation plan yang sedang berjalan adalah proses manual yang butuh ketelitian. Beginilah cara kami mengerjakannya bersama tim Anda. Tidak ada migrasi sekali klik, dan kami tidak akan berpura-pura ada.',
    steps: {
      share: {
        title: 'Bagikan plan Anda',
        text: 'Dokumen plan, contoh perhitungan bonus dan sampel payout sebelumnya. Pengecualian dan kasus khusus justru yang paling penting.',
      },
      map: {
        title: 'Petakan setiap aturan',
        text: 'Setiap aturan bonus, kualifikasi dan rank ditulis dan disepakati dalam bahasa yang mudah dipahami sebelum ada yang dikonfigurasi.',
      },
      compare: {
        title: 'Bandingkan hasilnya',
        text: 'Hasil perhitungan dibandingkan dengan payout historis Anda pada periode yang sama, dan setiap selisih dijelaskan atau diperbaiki.',
      },
      launch: {
        title: 'Go-live di tanggal yang disepakati',
        text: 'Data member, sponsor dan rank dipindahkan dengan pengecekan rekonsiliasi. Saldo baru dipindahkan setelah angkanya cocok.',
      },
    },
  },

  faq: {
    title: 'Tanya jawab seputar compensation plan.',
    lead: 'Jawaban lugas tentang cara kami menangani plan Anda, dari sesi pemetaan pertama sampai go-live.',
    items: [
      {
        q: 'Apakah tim mlmsoft bisa mengikuti compensation plan yang sudah kami jalankan?',
        a: 'Bisa, justru dari situ kami mulai. Bagikan dokumen plan dan sampel payout sebelumnya, lalu kami petakan aturan demi aturan bersama tim Anda.',
      },
      {
        q: 'Struktur plan apa saja yang bisa didiskusikan?',
        a: 'Binary, unilevel, matrix, generation, hybrid dan aturan custom. Semuanya menjadi acuan saat kami memetakan plan Anda; implementasi akhirnya mengikuti hasil analisis bisnis Anda.',
      },
      {
        q: 'Bagaimana jika aturan kami tidak biasa?',
        a: 'Ceritakan saja. Aturan yang tidak biasa justru umum di direct selling, dan untuk itulah sesi pemetaan diadakan.',
      },
      {
        q: 'Bagaimana perubahan plan ditangani?',
        a: 'Perubahan aturan dirancang berlaku mulai tanggal tertentu, sehingga payout yang sudah dilakukan tetap seperti semula.',
      },
      {
        q: 'Bagaimana dengan bonus jika order di-refund?',
        a: 'Refund menjadi bagian dari rancangan: bonus terkait diimbangi dengan entri pembalik, bukan dihapus, sehingga setiap koreksi tetap bisa ditelusuri.',
      },
      {
        q: 'Bagaimana pajak atas bonus ditangani?',
        a: 'Pemotongan pajak atas bonus menjadi bagian dari rancangan wallet dan payout. Tarifnya tetap ditentukan oleh konsultan pajak Anda; kami tidak memberikan nasihat pajak.',
      },
    ],
  },

  demo: {
    title: 'Mari bahas compensation plan Anda.',
    text: 'Ceritakan cara kerja bonus, rank dan kualifikasi Anda saat ini. Kami bantu melihat bagaimana semuanya bisa berjalan dalam sistem yang lebih tertata.',
  },
}

export default compensation
