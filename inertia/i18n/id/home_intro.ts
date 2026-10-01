import type en from '../en/home_intro'

const homeIntro: typeof en = {
  hero: {
    pill: {
      before: 'Untuk bisnis MLM, direct selling',
      long: ' & jaringan',
      after: '',
    },
    title: {
      lead: 'Software MLM,',
      highlight: 'dirancang mengikuti bisnis Anda.',
    },
    lead: 'Member, jaringan, compensation plan, order hingga payout: mlmsoft memetakan cara kerja bisnis Anda yang sebenarnya, lalu merancang sistem di atasnya, bukan memaksa bisnis Anda mengikuti template.',
    proof: [
      'Compensation plan Anda, dipetakan aturan demi aturan',
      'Untuk bisnis MLM dan direct selling di Indonesia',
      'Diskusikan bisnis Anda bersama tim kami',
    ],
    bonusCard: {
      label: 'Bonus sponsor · baru saja',
      title: 'Rp187.500 dikreditkan ke Budi S.',
      meta: 'Entri ledger LG-88213 · Order INV-20931',
    },
    rankCard: {
      label: 'Rank tercapai',
      title: 'Maya Lestari mencapai Gold',
      meta: '3 dari 3 syarat kualifikasi terpenuhi',
    },
  },

  dashboard: {
    nav: {
      overview: 'Ringkasan',
      members: 'Member',
      network: 'Jaringan',
      orders: 'Order',
      commissions: 'Komisi',
      wallet: 'Wallet',
      rewards: 'Reward',
      reports: 'Laporan',
      settings: 'Pengaturan',
    },
    tenant: {
      name: 'Kantor Pusat',
      initials: 'KP',
      role: 'Administrator',
    },
    greeting: 'Selamat pagi, Andi',
    title: 'Ringkasan bisnis',
    search: 'Cari member, order…',
    period: 'Sep 2026',
    today: 'Hari ini',
    kpis: {
      revenue: 'Pendapatan',
      activeMembers: 'Member aktif',
      newMembers: 'Member baru',
      commissionPayout: 'Payout komisi',
    },
    vsLastMonth: 'vs bulan lalu',
    growth: {
      title: 'Pertumbuhan jaringan',
      caption: 'Member aktif, 12 bulan terakhir',
      ranges: ['3 Bln', '6 Bln', '12 Bln'],
    },
    months: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
    commission: {
      title: 'Status komisi',
      caption: 'Periode Sep 2026 · total Rp1,84 miliar',
      chartLabel: 'Dibayar 62%, disetujui 24%, menunggu 14%',
      status: {
        paid: 'Dibayar',
        approved: 'Disetujui',
        pending: 'Menunggu',
      },
      nextRun: 'Jadwal payout berikutnya',
      nextRunDate: 'Sen, 5 Okt · 09:00',
    },
    performers: {
      title: 'Performer terbaik',
      caption: 'Omzet grup · Sep',
      member: 'Member',
      rank: 'Rank',
      sales: 'Omzet grup',
      change: 'Perubahan',
    },
    regions: {
      title: 'Penjualan per wilayah',
      unit: 'Rp, miliar',
      names: {
        westJava: 'Jawa Barat',
        jakarta: 'DKI Jakarta',
        eastJava: 'Jawa Timur',
        centralJava: 'Jawa Tengah',
        baliNusaTenggara: 'Bali & Nusa Tenggara',
      },
    },
  },

  industries: {
    title: 'Dirancang untuk bisnis seperti ini',
    items: {
      beauty: 'Kecantikan',
      wellness: 'Kesehatan & Wellness',
      fmcg: 'FMCG',
      supplements: 'Suplemen',
      fashion: 'Fashion',
      community: 'Bisnis Komunitas',
    },
  },

  platform: {
    eyebrow: 'Mengapa ini penting',
    title: 'Banyak bisnis MLM mengandalkan lima alat yang tidak saling terhubung.',
    lead: 'Toko online di satu tempat, spreadsheet bonus di tempat lain, payout lewat transfer bank, dan pertanyaan member menumpuk di grup WhatsApp. mlmsoft menyatukan member, order, bonus dan payout dalam satu sistem yang dirancang mengikuti aturan bisnis Anda.',
    chainLabel: 'Alur bisnis yang kami satukan',
    chain: [
      'Member',
      'Pelanggan',
      'Ecommerce',
      'Jaringan',
      'Komisi',
      'Rank',
      'Wallet',
      'Reward',
      'Keuangan',
      'Analitik',
    ],
    capabilities: {
      oneSystem: {
        title: 'Satu tempat untuk seluruh bisnis',
        text: 'Member, order, bonus dan payout dalam satu sistem, bukan file ekspor yang berpindah dari satu spreadsheet ke spreadsheet lain.',
      },
      trust: {
        title: 'Bonus yang bisa dipercaya',
        text: 'Sistem bonus Anda dituangkan menjadi aturan yang jelas, sehingga leader, member dan tim finance mendapat jawaban yang sama.',
      },
      fit: {
        title: 'Compensation plan yang sesuai',
        text: 'Kami petakan dulu aturan bonus, rank dan kualifikasi Anda, lalu kami konfigurasi sistem mengikuti aturan itu.',
      },
      network: {
        title: 'Jaringan yang terlihat jelas',
        text: 'Setiap leg, level dan leader, lengkap dengan penjualan dan rank di balik setiap cabang.',
      },
      sales: {
        title: 'Penjualan masuk ke orang yang tepat',
        text: 'Order dikaitkan dengan jaringan Anda, agar setiap penjualan diperhitungkan untuk sponsor dan upline yang tepat.',
      },
      money: {
        title: 'Keuangan tetap terkendali',
        text: 'Wallet, penarikan dan pajak dirancang dengan tahapan persetujuan serta catatan yang jelas untuk setiap perubahan.',
      },
    },
  },

  commandCenter: {
    eyebrow: 'Tampilan owner',
    title: 'Lihat seluruh bisnis Anda dari satu layar.',
    lead: 'Seperti inilah dashboard owner yang kami rancang bersama Anda: pendapatan, pertumbuhan jaringan, komisi dan liabilitas. Cukup satu klik untuk melihat apa yang ada di balik setiap angka.',
    listLabel: 'Metrik bisnis',
    hint: 'Pilih metrik untuk melihat rinciannya',
    day: (day: number) => `${day} Sep`,
    week: (week: number) => `Mg ${week}`,
    months: ['Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep'],
    points: 'poin',
    metrics: {
      revenue: {
        label: 'Pendapatan hari ini',
        caption: 'vs kemarin',
        period: 'Pendapatan harian, 14 hari terakhir',
        breakdownTitle: 'Hari ini per kanal',
        breakdown: ['Order member', 'Order pelanggan', 'Autoship'],
      },
      growth: {
        label: 'Pertumbuhan jaringan',
        caption: 'vs bulan lalu',
        period: 'Total member jaringan, 12 bulan terakhir',
        breakdownTitle: 'Pertumbuhan per wilayah bulan ini',
        breakdown: ['Jawa Barat', 'DKI Jakarta', 'Jawa Timur', 'Bali & Nusa Tenggara'],
      },
      active: {
        label: 'Distributor aktif',
        caption: 'vs bulan lalu',
        period: 'Distributor aktif, 12 bulan terakhir',
        breakdownTitle: 'Per rank',
        breakdown: ['Silver', 'Gold', 'Platinum', 'Diamond'],
      },
      registrations: {
        label: 'Pendaftaran baru',
        caption: 'vs bulan lalu',
        period: 'Pendaftaran bulanan, 12 bulan terakhir',
        breakdownTitle: 'Per sumber bulan ini',
        breakdown: ['Link referral', 'Event', 'Daftar langsung'],
      },
      commission: {
        label: 'Total komisi',
        caption: 'vs periode lalu',
        period: 'Komisi per periode, 12 bulan terakhir',
        breakdownTitle: 'Per jenis bonus',
        breakdown: ['Bonus sponsor', 'Bonus pasangan', 'Bonus generasi', 'Bonus rank'],
      },
      wallet: {
        label: 'Liabilitas wallet',
        caption: 'vs minggu lalu',
        period: 'Total saldo wallet, 12 minggu terakhir',
        breakdownTitle: 'Per status saldo',
        breakdown: ['Bisa ditarik', 'Menunggu', 'Ditahan'],
      },
      reward: {
        label: 'Liabilitas reward',
        caption: 'vs bulan lalu',
        period: 'Poin reward belum ditukar, 12 bulan terakhir',
        breakdownTitle: 'Per jenis reward',
        breakdown: ['Poin belum ditukar', 'Voucher tertunda', 'Reward pencapaian'],
      },
      leaders: {
        label: 'Leader jaringan teratas',
        caption: 'omzet grup vs bulan lalu',
        period: 'Omzet grup Budi Santoso, 12 bulan terakhir',
        breakdownTitle: 'Leader teratas menurut omzet grup',
        breakdown: ['Budi Santoso', 'Sarah Wijaya', 'Daniel Pratama', 'Kevin Halim'],
      },
    },
  },
}

export default homeIntro
