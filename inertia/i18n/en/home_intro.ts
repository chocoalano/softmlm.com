/**
 * Copy area: homeIntro. The top of the homepage: hero (with its dashboard
 * mockup), the industries strip, the platform overview and the owner's
 * command center.
 *
 * Sample data in the mockups (names, IDs, Rupiah amounts, percentages,
 * counts) stays identical in every language; the words around it are
 * translated.
 */
export default {
  hero: {
    pill: {
      before: 'For MLM, direct selling',
      /** Hidden on small phones. */
      long: ' & network',
      after: ' businesses',
    },
    title: {
      lead: 'MLM software,',
      highlight: 'built around your business.',
    },
    lead: 'Members, network, compensation plan, orders and payouts: mlmsoft maps how your business really works, then designs the system around it, instead of squeezing you into a template.',
    proof: [
      'Your compensation plan, mapped rule by rule',
      'For MLM and direct selling businesses in Indonesia',
      'Talk with our team about your business',
    ],
    bonusCard: {
      label: 'Direct referral bonus · just now',
      title: 'Rp187.500 credited to Budi S.',
      meta: 'Ledger entry LG-88213 · Order INV-20931',
    },
    rankCard: {
      label: 'Rank achieved',
      title: 'Maya Lestari reached Gold',
      meta: 'All 3 qualification rules met',
    },
  },

  dashboard: {
    nav: {
      overview: 'Overview',
      members: 'Members',
      network: 'Network',
      orders: 'Orders',
      commissions: 'Commissions',
      wallet: 'Wallet',
      rewards: 'Rewards',
      reports: 'Reports',
      settings: 'Settings',
    },
    tenant: {
      name: 'Head Office',
      initials: 'HO',
      role: 'Administrator',
    },
    greeting: 'Good morning, Andi',
    title: 'Business overview',
    search: 'Search members, orders…',
    period: 'Sep 2026',
    today: 'Today',
    kpis: {
      revenue: 'Revenue',
      activeMembers: 'Active members',
      newMembers: 'New members',
      commissionPayout: 'Commission payout',
    },
    vsLastMonth: 'vs last month',
    growth: {
      title: 'Network growth',
      caption: 'Active members, last 12 months',
      ranges: ['3M', '6M', '12M'],
    },
    /** Axis labels, October to September. */
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    commission: {
      title: 'Commission status',
      caption: 'Period Sep 2026 · Rp1.84B total',
      chartLabel: 'Paid 62%, approved 24%, pending 14%',
      status: {
        paid: 'Paid',
        approved: 'Approved',
        pending: 'Pending',
      },
      nextRun: 'Next payout run',
      nextRunDate: 'Mon, 5 Oct · 09:00',
    },
    performers: {
      title: 'Top performers',
      caption: 'Group sales · Sep',
      member: 'Member',
      rank: 'Rank',
      sales: 'Group sales',
      change: 'Change',
    },
    regions: {
      title: 'Sales by region',
      unit: 'Rp, billions',
      names: {
        westJava: 'West Java',
        jakarta: 'DKI Jakarta',
        eastJava: 'East Java',
        centralJava: 'Central Java',
        baliNusaTenggara: 'Bali & Nusa Tenggara',
      },
    },
  },

  industries: {
    title: 'Designed for businesses like these',
    items: {
      beauty: 'Beauty',
      wellness: 'Health & Wellness',
      fmcg: 'FMCG',
      supplements: 'Supplements',
      fashion: 'Fashion',
      community: 'Community Commerce',
    },
  },

  platform: {
    eyebrow: 'Why it matters',
    title: "Most MLM businesses run on five tools that don't talk.",
    lead: 'A web store here, bonus spreadsheets there, payouts through the bank and questions in WhatsApp groups. mlmsoft brings members, orders, bonuses and payouts together in one system designed around your rules.',
    chainLabel: 'The flow we connect',
    chain: [
      'Member',
      'Customer',
      'Ecommerce',
      'Network',
      'Commission',
      'Rank',
      'Wallet',
      'Reward',
      'Finance',
      'Analytics',
    ],
    capabilities: {
      oneSystem: {
        title: 'One place for the whole business',
        text: 'Members, orders, bonuses and payouts in one system, instead of exports passed between spreadsheets.',
      },
      trust: {
        title: 'Bonuses people can trust',
        text: 'Your plan written down as clear rules, so leaders, members and finance get the same answer.',
      },
      fit: {
        title: 'A plan that fits you',
        text: 'We map your bonus, rank and qualification rules first, then configure the system to match them.',
      },
      network: {
        title: 'A network you can see',
        text: 'Every leg, level and leader, with the sales and rank behind each branch.',
      },
      sales: {
        title: 'Sales that credit the right people',
        text: 'Orders connected to your network, so every sale counts toward the right sponsor and upline.',
      },
      money: {
        title: 'Money under control',
        text: 'Wallets, withdrawals and tax designed with approval steps and a clear record of every change.',
      },
    },
  },

  commandCenter: {
    eyebrow: "The owner's view",
    title: 'See your whole business from one screen.',
    lead: 'This is the kind of owner dashboard we design with you: revenue, network growth, commissions and liabilities, with a click through to what is behind each number.',
    listLabel: 'Business metrics',
    hint: 'Select a metric to drill down',
    /** Chart labels. */
    day: (day: number) => `Sep ${day}`,
    week: (week: number) => `W${week}`,
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    /** Unit after reward points and percentage-point changes. */
    points: 'pts',
    /**
     * `breakdown` lists the row names in the order of the sample values in
     * command_center.vue.
     */
    metrics: {
      revenue: {
        label: 'Revenue today',
        caption: 'vs yesterday',
        period: 'Daily revenue, last 14 days',
        breakdownTitle: 'Today by channel',
        breakdown: ['Member orders', 'Customer orders', 'Autoship'],
      },
      growth: {
        label: 'Network growth',
        caption: 'vs last month',
        period: 'Total network members, last 12 months',
        breakdownTitle: 'Growth by region this month',
        breakdown: ['West Java', 'DKI Jakarta', 'East Java', 'Bali & Nusa Tenggara'],
      },
      active: {
        label: 'Active distributors',
        caption: 'vs last month',
        period: 'Active distributors, last 12 months',
        breakdownTitle: 'By rank',
        breakdown: ['Silver', 'Gold', 'Platinum', 'Diamond'],
      },
      registrations: {
        label: 'New registrations',
        caption: 'vs last month',
        period: 'Monthly registrations, last 12 months',
        breakdownTitle: 'By source this month',
        breakdown: ['Referral links', 'Events', 'Direct sign-up'],
      },
      commission: {
        label: 'Total commission',
        caption: 'vs last period',
        period: 'Commission per period, last 12 months',
        breakdownTitle: 'By bonus type',
        breakdown: ['Direct referral', 'Pairing', 'Generation', 'Rank bonus'],
      },
      wallet: {
        label: 'Wallet liability',
        caption: 'vs last week',
        period: 'Total wallet balances, last 12 weeks',
        breakdownTitle: 'By balance state',
        breakdown: ['Available', 'Pending', 'On hold'],
      },
      reward: {
        label: 'Reward liability',
        caption: 'vs last month',
        period: 'Outstanding reward points, last 12 months',
        breakdownTitle: 'By reward type',
        breakdown: ['Unredeemed points', 'Pending vouchers', 'Milestone rewards'],
      },
      leaders: {
        label: 'Top network leader',
        caption: 'group sales vs last month',
        period: 'Group sales of Budi Santoso, last 12 months',
        breakdownTitle: 'Top leaders by group sales',
        breakdown: ['Budi Santoso', 'Sarah Wijaya', 'Daniel Pratama', 'Kevin Halim'],
      },
    },
  },
}
