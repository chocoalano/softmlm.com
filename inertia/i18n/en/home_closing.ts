/**
 * Homepage sections from "Who it's for" to the FAQ, plus the homepage-only
 * conversion band after the compensation section.
 */
export default {
  roles: {
    eyebrow: "Who it's for",
    title: 'Every team behind your network needs something different.',
    lead: 'Owners, finance, operations, IT and distributors each look at the business from their own angle. This is what each of them usually asks for.',
    tablistLabel: 'Roles',
    items: {
      executives: {
        title: 'See what drives your business.',
        text: 'Revenue, growth, payout ratio and risk in one view, designed around the numbers you actually use to run the company.',
        points: [
          'Revenue & margin by period',
          'Network growth & retention',
          'Payout ratio vs sales',
          'Liability & risk alerts',
          'Region & product performance',
          'Exports for board meetings',
        ],
        more: 'More for Owners & Executives',
      },
      finance: {
        title: 'Know where every rupiah goes.',
        text: 'Commission reconciliation, payouts and tax records designed with your finance team, so month-end is a check instead of a rebuild.',
        points: [
          'Commission reconciliation',
          'Wallet liability',
          'Withdrawal approvals',
          'Tax withholding',
          'Bonus approval steps',
          'Settlement reports',
        ],
        more: 'More for Finance',
      },
      operations: {
        title: 'Run daily operations without losing control.',
        text: 'Member approvals, orders, rewards and customer service organised into queues your team can keep up with.',
        points: [
          'Member approval',
          'Order processing',
          'Product & stock',
          'Reward fulfilment',
          'Customer service',
          'Campaign management',
        ],
        more: 'More for Operations',
      },
      it: {
        title: 'Technical questions, answered early.',
        text: 'Your IT team will ask about integrations, access, data migration, backups and monitoring. We go through each one before implementation, including what is in place today and what would need to be built.',
        points: [
          'Integration requirements',
          'Access & permissions',
          'Data migration',
          'Audit trail needs',
          'Hosting & operations',
          'Monitoring & backups',
        ],
        more: 'More for IT Teams',
      },
      distributors: {
        title: 'Give every distributor a better way to grow.',
        text: 'A mobile experience designed so members see their sales, team, rank progress and earnings, and can share their referral link in seconds.',
        points: [
          'My sales & orders',
          'My team',
          'Commission & wallet',
          'Rank progress',
          'Points & rewards',
          'Referral link & leaderboard',
        ],
        more: 'More for Distributors',
      },
    },

    /** Text inside the interface concepts (sample data). */
    mockups: {
      executives: {
        title: 'Executive summary · Sep 2026',
        period: 'Monthly',
        /** KPI labels; the figures are sample data in the component. */
        kpis: ['Revenue', 'Gross margin', 'Payout ratio', 'Active rate'],
        /** Unit after a change in percentage points: "+0.8 pts". */
        points: 'pts',
        alertsLabel: 'Alerts',
        alerts: [
          'Wallet liability down 2.3% this week',
          'Reward liability up 6.0%: review the Q4 campaign budget',
          '7 leaders show churn risk in the East Java network',
        ],
      },
      finance: {
        title: 'Payout run · Mon 5 Oct 2026',
        batch: 'Batch PR-2026-10-A · 1,284 recipients',
        status: 'Awaiting approval',
        approved: 'Approved commissions',
        withheld: 'Tax withheld',
        net: 'Net payout',
        checks: [
          'Reconciled with wallet ledger',
          'Withholding slips generated',
          'Bank transfer file ready',
        ],
        download: 'Download report',
        approve: 'Approve payout',
      },
      operations: {
        title: 'Order pipeline · today',
        location: 'Warehouse Jakarta',
        stages: ['New', 'Packed', 'Shipped', 'Delivered'],
        slaValue: '96.8%',
        slaText: 'of orders shipped within 24 hours this week',
      },
    },
  },

  outcomes: {
    eyebrow: 'What owners come to us for',
    title: 'Grow without losing control of the details.',
    items: [
      {
        title: 'Less time on bonus spreadsheets',
        text: 'When bonus rules are written down and calculated the same way every time, month-end stops being a spreadsheet marathon.',
      },
      {
        title: 'Fewer payout questions',
        text: 'When members and leaders can see how a bonus came about, fewer disputes end up on your desk.',
      },
      {
        title: 'A clearer view of the network',
        text: 'Head office and leaders look at the same numbers for sales, ranks and team growth.',
      },
      {
        title: 'One source of truth',
        text: 'Every team works from the same data, from the owner dashboard to what distributors see.',
      },
    ],
  },

  implementation: {
    eyebrow: 'How to get started',
    title: 'From first conversation to launch.',
    lead: 'Built around your business, not the other way around. We map your business model, compensation rules and workflows before anything is configured.',
    whatsapp: 'Discuss your implementation',
    pageLink: 'See how we work, phase by phase',
    concerns: [
      {
        q: 'How do we migrate our data?',
        a: 'Members and genealogy first, then balances once they reconcile with your current system.',
      },
      {
        q: 'Our compensation plan is unique.',
        a: 'Good. We map it rule by rule with your team before anything is configured.',
      },
      {
        q: 'Who integrates payments?',
        a: 'Gateways, banks and logistics are scoped with your team during discovery, including who builds what.',
      },
    ],
    phases: [
      {
        title: 'Discover',
        text: 'We study your business model, product catalog and current compensation plan.',
      },
      {
        title: 'Blueprint',
        text: 'Flows, bonus rules and edge cases are mapped and signed off in writing.',
      },
      {
        title: 'Configure',
        text: 'Your plan, ranks, tax rules and user roles are set up in the system.',
      },
      {
        title: 'Integrate',
        text: 'Payments, shipping, messaging and any in-house systems are connected where your plan needs them.',
      },
      {
        title: 'Migrate',
        text: 'Members and genealogy move first; balances and history follow only once they reconcile.',
      },
      {
        title: 'Test',
        text: 'Acceptance testing, with bonus results compared against your current numbers.',
      },
      {
        title: 'Train',
        text: 'Admin, finance and operations teams are trained on their daily workflows.',
      },
      {
        title: 'Launch',
        text: 'A planned production rollout, with our team on hand from day one.',
      },
      {
        title: 'Support',
        text: 'Monitoring, optimisation and plan changes as your business grows.',
      },
    ],
  },

  why: {
    eyebrow: 'Why talk to us',
    title: 'Not a template. A system shaped around your business.',
    lead: 'Commissions and wallets are money your distributors depend on. That is why we start with how your business works, not with a list of features.',
    items: [
      {
        title: 'We start from your plan',
        text: 'Your bonus rules, ranks and qualifications come first. The system is shaped around them, not the other way around.',
      },
      {
        title: 'One design, not five tools',
        text: 'Members, orders, bonuses, wallets and rewards are planned together, so the pieces fit from day one.',
      },
      {
        title: 'Money handled with care',
        text: 'Bonuses and balances are designed to be traceable, with corrections that leave a record instead of silent edits.',
      },
      {
        title: 'Room to grow',
        text: 'Network size, order volume and future plan changes are part of the conversation from the start.',
      },
      {
        title: 'Integration discussed up front',
        text: 'Payment, logistics and accounting tools are mapped early, so there are no surprises late in the project.',
      },
      {
        title: 'People you can talk to',
        text: 'Implementation is a partnership with our team, not a self-service checklist.',
      },
    ],
  },

  integrations: {
    eyebrow: 'Integrations',
    title: 'Map the systems you already use.',
    lead: 'We identify which external systems matter to the workflow and assess how data should move between them.',
    items: [
      {
        title: 'Payments',
        text: 'Which payment methods you use, and how a payment is confirmed.',
      },
      {
        title: 'Banking & payout',
        text: "How commission withdrawals reach members' bank accounts.",
      },
      {
        title: 'Logistics',
        text: 'Rates, waybills and delivery status for member and customer orders.',
      },
      {
        title: 'Accounting & finance',
        text: 'What finance needs from sales, commissions and liabilities, and how it is reconciled.',
      },
      {
        title: 'Messaging',
        text: 'Notifications and communication with members and customers.',
      },
      {
        title: 'Existing systems',
        text: 'ERP, CRM, warehouse, POS or custom software already in use.',
      },
    ],
    custom: {
      title: 'Integration starts with the data flow.',
      text: 'See how we map systems, data ownership and failure handling before anything is built.',
      link: 'Explore Integrations',
      whatsapp: 'Ask about an integration',
    },
  },

  security: {
    eyebrow: 'Security & trust',
    title: 'Security requirements, discussed before launch.',
    lead: 'Access, data, integrations and infrastructure each require different controls. We make those questions part of implementation planning.',
    cta: 'Explore Security',
    items: [
      {
        title: 'Access & roles',
        text: 'Who needs access, and what each role may see or change.',
      },
      {
        title: 'Data protection',
        text: 'Which data is sensitive, and who may view or export it.',
      },
      {
        title: 'Integrations',
        text: 'How connected systems authenticate, and which data they receive.',
      },
      {
        title: 'Audit & traceability',
        text: 'Which changes need a history of who changed what, and when.',
      },
      {
        title: 'Infrastructure',
        text: 'Where the system runs, and how environments are separated and monitored.',
      },
      {
        title: 'Backup & recovery',
        text: 'Recovery expectations, agreed and tested before production.',
      },
    ],
  },

  pricingQuote: {
    eyebrow: 'Pricing',
    title: 'Pricing built around your business.',
    lead: 'Every direct selling business is different, and so is every mlmsoft quote. Two quick questions help our team understand where you stand.',
    scopedTitle: 'Your quote is scoped around',
    scoped: [
      'The modules you select',
      'Your compensation plan and its complexity',
      'Integrations with the tools you use',
      'Data migration, if you are moving from another system',
      'Training and support after launch',
    ],
    moreQuestion: 'Want a more detailed estimate?',
    moreLink: 'Open the full estimate',
    whatsapp: 'Ask about pricing',
  },

  page: {
    compensationCta: {
      eyebrow: 'Your plan',
      title: 'Have your own compensation plan?',
      text: "No problem. Tell the mlmsoft team about your bonus, rank and qualification rules, and we'll map them with you.",
      whatsapp: 'Discuss via WhatsApp',
    },
  },

  faq: {
    title: 'Questions owners ask us.',
    lead: "Can't find what you're looking for? Our team is happy to walk you through it.",
    items: [
      {
        q: 'Our compensation plan is unique. Can you work with it?',
        a: 'Yes, that is where we start. We map your bonuses, ranks, qualifications and caps rule by rule with your team, then design the system around them, including hybrid and custom rules.',
      },
      {
        q: 'Which compensation structures can we discuss?',
        a: 'Binary, unilevel, matrix, generation and hybrid plans, as well as custom rules. We use them as references while mapping your plan; the final implementation follows the analysis of your business.',
      },
      {
        q: 'How long does implementation take?',
        a: 'It depends on the complexity of your plan, your integrations and how much data needs to move. After the discovery phase we share a written timeline, so you know what happens when before you commit.',
      },
      {
        q: 'Can we move away from our current system?',
        a: 'Usually, yes. Members and genealogy come first; balances and history follow once they reconcile with your current system. What can be migrated is assessed during discovery.',
      },
      {
        q: 'Do we need a separate web store?',
        a: 'Not necessarily. Ecommerce can be part of the same design, so orders count toward your plan without exports. Whether it belongs in your first phase is decided together.',
      },
      {
        q: 'How do you keep commissions and wallets accurate?',
        a: 'By design: every balance change is meant to be recorded with its source, and corrections such as refunds become new entries instead of silent edits. We walk your finance team through this before launch.',
      },
      {
        q: 'What about Indonesian tax on bonuses?',
        a: 'Tax on orders, bonuses and rewards is part of the design discussion, including withholding slips (bukti potong). Your tax advisor stays in control of the rates; we do not give tax advice.',
      },
      {
        q: 'Will our distributors have a mobile experience?',
        a: 'A mobile-friendly experience for members is part of what we scope with you: sales, team, rank progress, wallet and their referral link.',
      },
      {
        q: 'Can it connect to our payment gateway or other systems?',
        a: 'Tell us what you use. Payment gateways, banks, logistics, accounting and messaging are scoped during discovery, and integration options for your IT team are part of the technical discussion.',
      },
    ],
  },
}
