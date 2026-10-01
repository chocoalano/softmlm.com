/**
 * Copy area: compensation. The /compensation-plans page, its mockups and
 * the rule-builder preview (also shown on the homepage).
 *
 * mlmsoft has no compensation engine to show yet: everything here is how we
 * design and map a plan with the client, never a capability that runs today
 * (see docs/capability-evidence.md and the claims gate).
 */
export default {
  /** Short amount suffixes for compact Rupiah figures in the mockups. */
  units: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    decimal: '.',
  },

  hero: {
    eyebrow: 'Compensation Plan',
    titleLead: 'Your compensation plan should',
    titleAccent: 'fit your business.',
    lead: 'Every company has its own bonus structure, qualifications and ranks. mlmsoft helps you map them into a system that is more structured, transparent and easy to manage.',
    whatsapp: 'Discuss your compensation plan',
    approach: 'See how we approach a plan',
    cards: {
      binary: 'Binary',
      override: 'Override',
      rank: 'Rank',
    },
  },

  architecture: {
    eyebrow: 'How we approach a plan',
    title: 'Every plan comes down to events, rules and payouts.',
    lead: 'Whatever your plan type, we break it down the same way: which events count, which rules apply, how bonuses are calculated and where they are paid. The system is designed around that structure.',
    flowLabel: 'How a plan is broken down',
    stages: {
      events: {
        label: 'Events',
        items: ['Paid orders', 'Registrations', 'Placements', 'Period close'],
      },
      rules: {
        label: 'Rules',
        items: ['Bonus rules', 'Qualification', 'Rank requirements', 'Caps'],
      },
      calculation: {
        label: 'Calculation',
        items: ['Volume per leg', 'Eligible uplines', 'Bonus amounts', 'Rank changes'],
      },
      postings: {
        label: 'Postings',
        items: ['Wallet ledger', 'Tax withholding', 'Reports', 'Audit trail'],
      },
    },
    principles: {
      data: {
        title: 'Rules are data, not code',
        text: 'Rates, caps and qualification thresholds are meant to live in configuration your team can review, instead of formulas buried in the code.',
      },
      explainable: {
        title: 'Every result is explainable',
        text: 'Each bonus should trace back to the order, the rule and the rule version that produced it.',
      },
      history: {
        title: 'History is never rewritten',
        text: 'A plan change takes effect from a date. Payouts already made stay exactly as they were.',
      },
    },
  },

  patterns: {
    eyebrow: 'Plan structures',
    title: 'Common compensation architectures.',
    lead: 'The structures below are used as references when we map your business needs. The final implementation follows the analysis of your system.',
    items: {
      binary: {
        name: 'Binary',
        text: 'Two legs per member. Volume from the weaker leg is paired against the stronger one, with caps and carry-over.',
      },
      unilevel: {
        name: 'Unilevel',
        text: 'Any number of direct members, with bonuses paid on a fixed number of levels below each member.',
      },
      matrix: {
        name: 'Matrix',
        text: 'A fixed width and depth. New members fill the next open position, including spill-over from above.',
      },
      generation: {
        name: 'Generation',
        text: 'Leaders earn on their organisation down to the next qualified leader, often with compression past inactive members.',
      },
      hybrid: {
        name: 'Hybrid',
        text: 'Several bonus types in one plan, for example pairing and overrides on one track, retail and cashback on another.',
      },
      custom: {
        name: 'Custom',
        text: 'Plan-specific bonuses built from the same building blocks: base, rate, eligibility and caps.',
      },
    },
  },

  builder: {
    eyebrow: 'Rule builder',
    title: 'Rules your team can read, not formulas buried in code.',
    lead: 'Try the preview: change the rate or the method and run a sample order through the rule. It runs on sample data in your browser.',
    fieldsLabel: 'A rule is designed to describe',
    fields: [
      'Rule name and bonus type',
      'Calculation base, such as agent point value',
      'Value method: percentage or fixed amount',
      'Minimum volume and eligibility conditions',
      'Effective date',
    ],
    ask: 'Have more complex bonus rules?',
    askLink: 'Discuss them with our team',
    caption: 'Interactive concept · sample data, runs only in your browser',

    /** The interactive rule-builder mockup. */
    preview: {
      kicker: 'Compensation rule',
      name: 'Direct Referral Bonus',
      status: 'Draft · v4',
      base: 'Calculation base',
      baseValue: 'Agent Point (AP)',
      method: 'Method',
      percentage: 'Percentage',
      fixed: 'Fixed amount',
      rate: 'Rate',
      amount: 'Amount per qualifying order',
      eligibility: 'Eligibility',
      eligibilityValue: 'Active member',
      minimum: 'Minimum AP',
      effective: 'Effective date',
      effectiveValue: '01 Jan 2027',
      simulate: 'Simulate a sample order',
      orderTotal: 'Order total',
      pointValue: 'Agent Point value',
      qualifies: 'Qualifies',
      yes: 'Yes',
      belowMinimum: 'Below minimum',
      result: 'Bonus to sponsor',
      save: 'Save rule',
      previewOnly: 'Preview only',
    },
  },

  features: {
    qualification: {
      eyebrow: 'Qualification & eligibility',
      title: 'Only members who qualify get paid.',
      text: 'Each bonus is designed to check who may receive it for a period: active status, personal volume, placement, verification and paid-as rank.',
      points: [
        'Activity measured per period, not once',
        'Different conditions per bonus type',
        'A clear reason when a member does not qualify',
      ],
    },
    ranks: {
      eyebrow: 'Rank rules',
      title: 'Ranks earned on clear, visible requirements.',
      text: 'Rank rules are designed around requirements such as group volume and qualified personally sponsored members, so members can see exactly what they still need.',
      points: [
        'Requirements based on volume and qualified directs',
        'Progress visible to the member and to head office',
        'Rank periods and maintenance agreed with you',
      ],
    },
    override: {
      eyebrow: 'Override logic',
      title: 'Leadership overrides with compression.',
      text: "Generation overrides are designed to pay leaders on their organisation's volume. With compression, inactive members are skipped so qualified leaders are not cut off. Toggle it in the preview.",
      points: [
        'Rates per generation or per rank',
        'Compression past inactive members',
        'Stops at the next qualified leader where the plan requires it',
      ],
    },
    simulation: {
      eyebrow: 'Simulation',
      title: 'See the cost of a change before members do.',
      text: 'Before a rule change reaches members, its cost should be clear. We design plan changes to be tested against a past period first, so you see the impact per bonus type.',
      points: [
        'Current versus proposed, side by side',
        'Impact per bonus type and per member',
        'Nothing is paid until you publish',
      ],
    },
    versioning: {
      eyebrow: 'Rule versioning',
      title: 'Plan changes take effect from a date.',
      text: 'We design rule changes as versions with an effective date, so every order is calculated with the rules that applied when it was paid.',
      points: [
        'Scheduled versions with effective dates',
        'Past payouts are never recalculated silently',
        'A readable history of what changed and when',
      ],
    },
    reversal: {
      eyebrow: 'Audit & reversal',
      title: 'Every correction leaves a trail.',
      text: 'Refunds, cancellations and returns are designed as reversal entries that offset the original bonuses instead of deleting them, so every change stays traceable.',
      points: [
        'Reversal postings linked to the original order',
        'Each bonus traceable to its order and rule version',
        'No silent edits to paid bonuses',
      ],
    },
    walletTax: {
      eyebrow: 'Wallet & tax',
      title: 'From bonus to wallet, with tax accounted for.',
      text: 'Settled bonuses are designed to post to a wallet record with running balances, with tax withheld and recorded per member and period according to rules your tax advisor sets.',
      points: [
        'Gross, withheld and net amounts kept separately',
        'Ledger entries rather than balance overwrites',
        'Withholding records per member and period',
      ],
    },
  },

  /** Mockups beside each feature section. Names and amounts are sample data. */
  visuals: {
    demoData: 'Demo data',
    illustration: 'Illustration',
    qualification: {
      label: 'Eligibility check · Sep 2026',
      checks: {
        active: 'Active: personal volume Rp620.000 of Rp500.000',
        placed: 'Placed in the network',
        verified: 'Identity verified',
        rank: 'Paid-as rank Platinum needed for leadership override',
      },
      resultLabel: 'Qualifies this period for',
      resultValue: 'Sponsor bonus · Pairing · Generation override',
    },
    rank: {
      label: 'Rank requirements',
      title: 'Progress of Sarah Wijaya',
      achieved: 'Achieved',
      rules: {
        silver: 'Group volume Rp10M and 2 personally sponsored members',
        gold: '2 personally sponsored members at Silver',
        platinum: '2 personally sponsored members at Gold',
        diamond: '2 personally sponsored members at Platinum',
      },
    },
    override: {
      label: 'Generation override on Rp1.000.000 of volume',
      title: 'Who earns, and at which generation',
      compression: 'Compression',
      columns: {
        upline: 'Upline',
        status: 'Status',
        generation: 'Generation',
        override: 'Override',
      },
      active: 'Active',
      inactive: 'Inactive',
      skipped: 'Skipped',
      withCompression: 'With compression, inactive members are skipped',
      withoutCompression: 'Without compression, inactive members keep their generation',
      total: 'Total paid',
    },
    simulation: {
      label: 'Scenario: pairing bonus Rp20.000 → Rp22.000 per pair',
      title: 'Sep 2026 re-run, current vs proposed',
      rows: {
        total: 'Total bonus',
        pairing: 'Pairing bonus',
        override: 'Override bonus',
      },
      current: 'Current rules',
      proposed: 'Proposed rules',
    },
    versioning: {
      label: 'Plan versions',
      title: 'Hybrid plan',
      versions: {
        v1: {
          name: 'Version 1',
          status: 'Archived',
          meta: 'Effective 01 Jan 2025 · orders until 28 Feb 2026',
        },
        v2: {
          name: 'Version 2',
          status: 'In effect',
          meta: 'Effective 01 Mar 2026',
        },
        v3: {
          name: 'Version 3',
          status: 'Scheduled',
          meta: 'Effective 01 Jan 2027 · pairing Rp22.000 per pair',
        },
      },
      resultLabel: 'An order paid on 31 Dec 2026',
      resultValue: 'is calculated with version 2',
    },
    reversal: {
      label: 'Order INV-20874 · refunded',
      title: 'Postings linked to the order',
      bonus: 'Direct referral bonus',
      bonusMeta: 'Budi S. · posted 27 Sep',
      reversal: 'Reversal · order refunded',
      reversalMeta: 'Budi S. · posted 29 Sep',
      resultLabel: 'Both entries point to the same order and rule version',
      net: 'Net',
    },
    walletTax: {
      label: 'Pairing bonus · 29 Sep 2026',
      title: 'From bonus to wallet',
      gross: 'Gross bonus',
      withheld: 'Tax withheld',
      credited: 'Credited to wallet',
      ledger: 'Wallet ledger entry with running balance',
      withholding: 'Withholding record per member and period',
      foot: 'Rates shown are an example. Your tax advisor sets the actual rules.',
    },
  },

  migration: {
    eyebrow: 'Existing plan',
    title: 'Already running a plan? Start from it.',
    lead: "Moving a live compensation plan is a careful, manual process. This is how we approach it with your team. There is no one-click migration, and we won't pretend otherwise.",
    steps: {
      share: {
        title: 'Share your plan',
        text: 'Your plan document, bonus examples and a sample of past payouts. Exceptions and special cases matter most.',
      },
      map: {
        title: 'Map every rule',
        text: 'Each bonus, qualification and rank rule is written down and agreed in plain language before anything is configured.',
      },
      compare: {
        title: 'Compare results',
        text: 'Results are compared with your historical payouts for the same periods, and every difference is explained or fixed.',
      },
      launch: {
        title: 'Go live on a date',
        text: 'Members, sponsors and ranks move over with reconciliation checks. Balances move only once they reconcile.',
      },
    },
  },

  faq: {
    title: 'Compensation questions, answered.',
    lead: 'Straight answers about how we work with your plan, from the first mapping session to launch.',
    items: [
      {
        q: 'Can you work with our existing compensation plan?',
        a: 'Yes, that is where we start. Share your plan document and a sample of past payouts, and we map it rule by rule with your team.',
      },
      {
        q: 'Which plan structures can we discuss?',
        a: 'Binary, unilevel, matrix, generation, hybrid and custom rules. They are references while we map your plan; the final implementation follows the analysis of your business.',
      },
      {
        q: 'What if our rules are unusual?',
        a: 'Tell us about them. Unusual rules are common in direct selling, and they are exactly what the mapping sessions are for.',
      },
      {
        q: 'How are plan changes handled?',
        a: 'Rule changes are designed to take effect from a date, so payouts that were already made stay exactly as they were.',
      },
      {
        q: 'What happens to bonuses when an order is refunded?',
        a: 'Refunds are part of the design: the related bonuses are offset by reversal entries instead of being deleted, so every correction stays traceable.',
      },
      {
        q: 'How is tax on bonuses handled?',
        a: 'Withholding on bonuses is part of the wallet and payout design. Your tax advisor stays in control of the rates; we do not give tax advice.',
      },
    ],
  },

  demo: {
    title: "Let's talk about your compensation plan.",
    text: "Tell us how your bonuses, ranks and qualifications work today. We'll help you see how they could run in a more structured system.",
  },
}
