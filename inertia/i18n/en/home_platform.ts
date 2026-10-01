/**
 * Homepage platform sections: the feature explorer and its product mocks,
 * compensation, the genealogy preview, the order flow, wallet and tax, and
 * the AI product direction.
 *
 * Sample data (member names, IDs, Rupiah amounts, counts) is the same in
 * every language; only the words around it are translated.
 */
export default {
  features: {
    eyebrow: 'What you can manage',
    title: 'Eight areas every direct selling business runs.',
    lead: 'Pick an area to see what it can look like. Each one is scoped with you, so you only build what your business needs.',
    tabsLabel: 'Platform modules',
    askAbout: (label: string) => `Ask about ${label}`,
    details: {
      members: {
        title: 'Know every member in your network.',
        text: 'Member profiles, verification, sponsor relationships, rank and history. We define with you which data matters and how new members are onboarded.',
        points: [
          'Registration & onboarding',
          'Identity verification (KYC)',
          'Sponsor & placement',
          'Rank history',
          'Bank & tax details',
          'Member activity',
        ],
      },
      compensation: {
        title: 'A bonus plan that follows your rules.',
        text: 'Bonuses, ranks and qualifications are mapped with your team, written down as clear rules and tested before anything goes live.',
        points: [
          'Binary, unilevel, matrix or hybrid',
          'Rule changes with effective dates',
          'Qualification & rank rules',
          'Testing against past payouts',
          'Caps, flush-outs & carry-over',
          'Refunds and reversals',
        ],
      },
      ecommerce: {
        title: 'Sales and your network, connected.',
        text: 'Member and retail sales from one catalog, with each order carrying the volume your plan pays on.',
        points: [
          'Products, variants & bundles',
          'Member & retail pricing',
          'Promotions & vouchers',
          'Checkout & payments',
          'Shipping & returns',
          'Inventory & repeat orders',
        ],
      },
      network: {
        title: 'Every leg, level and leader in view.',
        text: 'Genealogy and placement views that show the sales and rank behind every branch, for head office and for your leaders.',
        points: [
          'Genealogy & placement trees',
          'Leg volume & balance',
          'Member search & filters',
          'Sponsor changes with a trail',
          'Depth & width reports',
          'Leader drill-downs',
        ],
      },
      wallet: {
        title: 'Balances your finance team can trust.',
        text: 'Wallets and payouts designed with finance in mind: a record for every movement, clear balance states and an approval step before money leaves.',
        points: [
          'A record for every movement',
          'Available, pending & on-hold',
          'Withdrawal approvals',
          'Bank payout files',
          'Tax withholding',
          'Corrections with a trail',
        ],
      },
      rewards: {
        title: 'Turn engagement into loyalty.',
        text: 'Points, vouchers, milestones and campaigns designed to keep distributors active and customers coming back.',
        points: [
          'Points with full history',
          'Reward catalog & redemption',
          'Vouchers & coupons',
          'Milestones & achievements',
          'Leaderboards & campaigns',
          'Challenges for your teams',
        ],
      },
      analytics: {
        title: 'Know what drives your numbers.',
        text: 'Dashboards and reports for sales, network, commissions and liabilities, sliced by period, region and rank, around the numbers you actually use.',
        points: [
          'Owner dashboards',
          'Sales & volume reports',
          'Commission analysis',
          'Retention & churn',
          'Scheduled exports',
          'Access per role',
        ],
      },
      operations: {
        title: 'Daily operations without losing control.',
        text: 'Queues and approvals that keep members onboarded, orders moving and payouts on schedule.',
        points: [
          'Member & KYC approvals',
          'Order fulfilment queues',
          'Withdrawal approvals',
          'Customer service tickets',
          'Announcements & campaigns',
          'Permissions & activity logs',
        ],
      },
    },
  },

  /** Text inside the product mock of each feature explorer tab. */
  screens: {
    members: {
      meta: 'SM-240118 · Joined Jan 2024 · Bandung',
      personalAp: 'Personal AP',
      groupSales: 'Group sales',
      directMembers: 'Direct members',
      tabs: ['Timeline', 'Network', 'Orders', 'Wallet'],
      timeline: [
        { title: 'Rank upgraded to Platinum', meta: '2 days ago · 5 of 5 requirements met' },
        { title: 'Order INV-20931 paid · Rp1.250.000', meta: '3 days ago · +Rp1.25M AP' },
        { title: 'Sponsor of Maya Lestari', meta: '1 week ago · placed in left leg' },
      ],
      kycTitle: 'KYC & verification',
      kyc: ['National ID', 'Tax ID (NPWP)', 'Bank account'],
      verified: 'Verified',
    },
    compensation: {
      title: 'Hybrid plan · Version 3',
      meta: 'Effective 01 Jan 2027 · Draft',
      simulate: 'Simulate',
      on: 'On',
      draft: 'Draft',
      rules: [
        { name: 'Direct referral bonus', detail: '15% of AP value · active members' },
        { name: 'Pairing bonus', detail: '10% of weaker leg · daily cap Rp5M' },
        { name: 'Generation bonus', detail: '5 levels · 5% / 4% / 3% / 2% / 1%' },
        { name: 'Leadership pool', detail: '2% of company AP · Diamond and above' },
      ],
      simulation: 'Simulation vs version 2',
      simulationNote: 'Projected payout ratio: 15.2% of sales',
    },
    ecommerce: {
      title: 'Orders',
      today: 'Today · 1,284 orders',
      columns: {
        order: 'Order',
        buyer: 'Buyer',
        total: 'Total',
        ap: 'AP value',
        status: 'Status',
      },
      customer: 'Customer',
      status: {
        paid: 'Paid',
        shipped: 'Shipped',
        awaiting: 'Awaiting',
        refunded: 'Refunded',
      },
      productPrice: 'Member price · Retail Rp420.000',
    },
    network: {
      title: 'Binary legs · Budi Santoso',
      meta: 'Period Sep 2026 · depth 12 levels',
      total: '2,381 members',
      left: 'Left leg',
      right: 'Right leg',
      leftMeta: '1,284 members · 612 active',
      rightMeta: '1,097 members · 544 active',
      note: 'Pairing on Rp791M · carry-over Rp51M to left leg',
    },
    wallet: {
      available: 'Available balance',
      pending: 'Pending',
      onHold: 'On hold',
      withdraw: 'Withdraw',
      entries: [
        { title: 'Direct referral bonus', meta: 'INV-20931 · LG-88213' },
        { title: 'Pairing bonus', meta: 'Sep 29 · LG-88176' },
        { title: 'Withdrawal to bank account ••4821', meta: 'Approved · LG-88102' },
      ],
    },
    rewards: {
      points: 'Your points',
      total: '12,480 pts',
      sprint: 'Q4 Sprint · 12 days left',
      items: [
        { name: 'Shopping voucher Rp100K', meta: '1,000 pts', action: 'Redeem' },
        { name: 'Smartwatch', meta: '18,000 pts', action: '5,520 to go' },
        { name: "Leaders' retreat, Bali", meta: 'Milestone · Gold rank', action: 'View' },
      ],
      leaderboard: 'Leaderboard · Q4 Sprint',
    },
    analytics: {
      title: 'Monthly sales',
      unit: 'Rp, billions · last 12 months',
      growth: '+12.4% MoM',
      chartLabel: 'Monthly sales rising from Rp7.9B to Rp12.48B',
      /** Initials of October to September. */
      months: ['O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S'],
      averageOrder: 'Avg. order value',
      retention: '90-day retention',
      apPerMember: 'AP per active member',
    },
    operations: {
      title: "Today's work queue",
      team: 'Operations team',
      queue: [
        { name: 'Member approvals', count: '24 waiting', due: 'SLA 4h' },
        { name: 'KYC reviews', count: '17 waiting', due: 'SLA 24h' },
        { name: 'Orders to fulfil', count: '138 open', due: 'Cut-off 15:00' },
        { name: 'Withdrawal requests', count: '41 open', due: 'Run Mon 09:00' },
        { name: 'Support tickets', count: '9 open', due: 'SLA on track' },
      ],
      applicant: 'New member · sponsor Sarah W.',
      reject: 'Reject',
      approve: 'Approve',
    },
  },

  compensation: {
    eyebrow: 'Compensation plan',
    title: 'A commission system that follows your business rules.',
    lead: 'The mlmsoft team helps you map your bonus scheme, qualifications, ranks and payouts before the system is configured to your needs.',
    points: [
      'Every bonus written down as a rule your team can read',
      'Qualification and rank logic agreed with you, not guessed',
      'Rule changes planned with effective dates, so past payouts stay intact',
      'Results checked against your past payouts before going live',
    ],
    architecturesLabel: 'Common architectures we discuss',
    discuss: 'Discuss your compensation plan',
    explore: 'Explore compensation plans',
  },

  network: {
    eyebrow: 'Your network',
    title: 'Understand how your network is really structured.',
    lead: 'Owners and leaders need to find any member, see the sales and rank behind each branch and spot where growth stalls. Try the genealogy preview below.',
    searchPlaceholder: 'Search a member, e.g. Maya',
    searchLabel: 'Search the network',
    found: (count: number) => `${count} found`,
    rankFilterLabel: 'Filter by rank',
    allRanks: 'All',
    activeOnly: 'Active only',
    zoomLabel: 'Zoom',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    fit: 'Fit to screen',
    treeLabel: 'Genealogy preview',
    active: 'Active',
    inactive: 'Inactive',
    members: 'Members',
    groupSales: 'Group sales',
    expand: (name: string) => `Expand ${name}'s downline`,
    collapse: (name: string) => `Collapse ${name}'s downline`,
    more: (count: number) => `+${count} more direct members`,
    detail: {
      personalAp: 'Personal AP',
      commission: 'Commission (Sep)',
      downline: 'Downline',
      downlineCount: (count: number) => `${count} members`,
      sponsor: 'Sponsor',
      company: 'Company',
      joined: 'Joined',
      openProfile: 'Open member profile',
    },
    /** Short month names, January first. */
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },

  commerce: {
    eyebrow: 'Orders & ecommerce',
    title: "Orders and bonuses shouldn't live in separate worlds.",
    lead: "We design the path from order to payment, volume, bonus, rank and wallet as one flow, so you don't wait for month-end spreadsheets to know who earned what.",
    capabilitiesLabel: 'What we map for commerce',
    capabilities: [
      'Products & variants',
      'Member & retail pricing',
      'Promotions',
      'Cart & checkout',
      'Orders',
      'Payments',
      'Shipping',
      'Returns',
      'Inventory',
      'Autoship',
    ],
    flowLabel: 'What happens when an order is paid',
    steps: [
      { label: 'Order', title: 'INV-20931 placed', text: 'Sarah W. · Rp1.250.000 · 3 items' },
      {
        label: 'Payment',
        title: 'Paid by virtual account',
        text: 'Verified by the gateway callback',
      },
      {
        label: 'AP / PV',
        title: 'AP Rp1.250.000 recorded',
        text: 'Personal and group volume updated',
      },
      { label: 'Bonus', title: 'Rp187.500 to sponsor', text: 'Direct referral · 15% of AP' },
      { label: 'Rank', title: 'Rank progress updated', text: 'Sarah W. now 72% to Diamond' },
      { label: 'Wallet', title: 'Ledger entry posted', text: "LG-88213 · Budi S.'s wallet" },
    ],
    refundTitle: 'Order refunded?',
    refundText:
      'The flow is designed so the related volume, bonuses and wallet entries are reversed with a clear trail, not deleted.',
  },

  wallet: {
    eyebrow: 'Finance, wallet & tax',
    title: 'Financial control, designed in from day one.',
    lead: 'Commissions are money your distributors depend on. We design wallets, payouts and withholding so your finance team can trace every rupiah from order to payout.',
    pointsLabel: 'What we design for',
    points: [
      'A record for every balance change, never a silent overwrite',
      'Available, pending and on-hold balances per member',
      'A second pair of eyes before withdrawals are paid',
      'Corrections and reversals that keep a clear trail',
    ],
    available: 'Available balance',
    pending: 'Pending',
    onHold: 'On hold',
    ledgerTitle: 'Ledger · Budi Santoso',
    columns: {
      entry: 'Entry',
      description: 'Description',
      amount: 'Amount',
      balance: 'Balance',
    },
    /** One description per sample ledger row, newest first. */
    entries: [
      'Direct referral bonus · INV-20931',
      'Pairing bonus · period 29 Sep',
      'Withdrawal to bank account ••4821',
      'Tax withheld · pairing bonus',
      'Bonus reversal · INV-20874 refunded',
    ],
    taxTitle: 'Plan for tax from the start.',
    taxText:
      'Tax on orders, bonuses and rewards is easier to get right when it is part of the design, not an afterthought. We work through it with you and your tax advisor, who stays in control of the rates.',
    tax: [
      { title: 'Order tax', text: 'How VAT applies to member and retail orders.' },
      { title: 'Commission tax', text: 'When withholding applies to bonuses, and at which rate.' },
      { title: 'Reward tax', text: 'Prizes and non-cash rewards.' },
      { title: 'Tax records', text: 'Tracing every withheld rupiah to its source.' },
      { title: 'Withholding slips', text: 'Bukti potong per member and period.' },
      { title: 'Tax reporting', text: 'What your tax team needs each period.' },
    ],
  },

  ai: {
    eyebrow: 'Where we are heading',
    badge: 'Product direction',
    title: 'Ask your business a question, in plain language.',
    lead: 'We are exploring AI assistance that answers questions from your own orders, network and commission data. It is not part of current implementations yet; the conversation here is a concept.',
    capabilities: [
      {
        title: 'Plain-language questions',
        text: 'Ask about sales, bonuses or your network without building a report.',
      },
      { title: 'Sales forecast', text: 'Projections by period, region and product.' },
      { title: 'Churn risk', text: 'Spot leaders and members losing momentum.' },
      { title: 'Anomaly & fraud detection', text: 'Flag unusual orders, sign-ups and payouts.' },
      { title: 'Network growth insight', text: 'See which legs and regions drive growth.' },
      { title: 'Commission explanation', text: 'Show any member exactly how a bonus was earned.' },
    ],
    chatTitle: 'Ask mlmsoft',
    promptsLabel: 'Example questions',
    /** Each answer's chart labels line up with the sample values in ai_insights.vue. */
    conversations: [
      {
        question: 'Why did commission payout increase this month?',
        answer:
          'Commission payout rose 18.4% to Rp1.84B. Most of the increase came from pairing bonuses in the West Java network, after 212 new registrations in the first two weeks.',
        labels: ['Pairing', 'Direct referral', 'Rank bonus'],
        unit: 'Rp, millions · increase vs August',
      },
      {
        question: 'Which leaders are at risk of going inactive?',
        answer:
          '7 leaders have had declining personal AP for three weeks in a row. Their downlines produce Rp37.2M in monthly sales. The largest is Andre Setiawan (Silver, 27 members).',
        labels: ['Andre S.', 'Dewi A.', '5 others'],
        unit: 'Downline sales at risk, Rp millions',
      },
      {
        question: "Forecast next month's sales",
        answer:
          'Based on the last 12 months and current registrations, October sales are forecast at Rp13.1B to Rp13.9B. East Java is expected to grow fastest.',
        labels: ['Low', 'Expected', 'High'],
        unit: 'October forecast, Rp billions',
      },
    ],
  },
}
