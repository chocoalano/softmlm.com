/**
 * /features and the feature pages (docs/feature-page-strategy.md).
 * Needs, approach and interface concepts only: none of these capabilities
 * is described as implemented today.
 */
export default {
  shared: {
    breadcrumbRoot: 'Features',
    problemEyebrow: 'The problem',
    growthEyebrow: 'As the network grows',
    approachEyebrow: 'Our approach',
    outcomesEyebrow: 'What changes',
    teamsEyebrow: 'Related teams',
    considerEyebrow: 'Before implementation',
    considerTitle: 'What to consider before implementation.',
    considerLead:
      'We go through these with you during discovery. You don’t need a technical answer to any of them on day one.',
    faqLead: 'Straight answers, including what depends on your scope.',
    askWhatsapp: 'Ask about it on WhatsApp',
    orBookDemo: 'Or book a demo',
    moreFor: (label: string) => `More for ${label}`,
    signalsLabel: 'Questions owners ask',
    stageLabel: (n: number) => `Stage ${n}`,
  },

  index: {
    hero: {
      eyebrow: 'Features',
      title: 'Start with the problem',
      highlight: 'you need to solve.',
      lead: 'mlmsoft isn’t a feature checklist. Choose the part of your business that needs the most attention and see how we approach it, from the business rules to the screens your teams use.',
    },
    groups: [
      {
        title: 'Plan and earnings',
        text: 'How members earn, and how every amount is explained.',
      },
      {
        title: 'Network and members',
        text: 'How the network grows, and what members and teams see.',
      },
      {
        title: 'Commerce',
        text: 'How orders move through a network business.',
      },
      {
        title: 'Systems and data',
        text: 'How mlmsoft fits with the systems you already run.',
      },
    ],
    cards: {
      compensation: {
        label: 'Compensation Plans',
        problem: 'A plan that is hard to change, and harder to explain.',
        text: 'Bonuses, qualifications and ranks, mapped rule by rule before they become software.',
      },
      wallet: {
        label: 'Wallet & Payout',
        problem: 'Members don’t understand their balance.',
        text: 'Payout rules, pending amounts, adjustments and approvals, written down with finance.',
      },
      network: {
        label: 'Network Management',
        problem: 'Thousands of members, no clear picture of the network.',
        text: 'Sponsorship, placement and the signals that show where growth stalls.',
      },
      distributors: {
        label: 'Distributor Experience',
        problem: 'Members ask support what they could see themselves.',
        text: 'The member journey and what each member should see, from first order to next rank.',
      },
      operations: {
        label: 'Member operations',
        problem: 'Your team jumps between systems for one answer.',
        text: 'Onboarding, member records and corrections, designed as a workflow first.',
      },
      integrations: {
        label: 'Integrations',
        problem: 'Existing systems need to work together.',
        text: 'Payment, logistics, finance and messaging, mapped as data flows before anything is connected.',
      },
      ecommerce: {
        label: 'Ecommerce',
        problem: 'The shop and the bonus system don’t agree.',
        text: 'Member prices, stock points, periods and follow-up around every order.',
      },
    },
    learnMore: 'See the approach',
    notListed: {
      title: 'Looking for something that isn’t listed?',
      text: 'Rewards, analytics or anything specific to your plan: tell us what you need and we’ll tell you honestly how we would approach it.',
      cta: 'Ask on WhatsApp',
    },
    cta: {
      title: 'Not sure where to start?',
      text: 'Tell us what hurts most in your business today. We’ll start there and map what connects to it.',
      label: 'Consult via WhatsApp',
    },
    demo: {
      title: 'Start with the problem that costs you most.',
      text: 'Tell us about your business and the part that needs attention first.',
    },
  },

  pages: {
    network: {
      hero: {
        eyebrow: 'Network Management',
        title: 'Understand how your network',
        highlight: 'is growing.',
        lead: 'A genealogy tree shows who sits where. Owners need more: which branches are growing, which are stalling and where leaders need support, before it shows up in sales.',
        ctaLabel: 'Discuss your network structure',
        chips: [
          'Which leaders build active teams?',
          'Where did growth stop?',
          'Which placements need a fix?',
        ],
      },
      problem: {
        quote: 'We have thousands of members, but no clear picture of the network.',
        text: 'Most businesses can look up a member’s sponsor. Few can quickly answer which part of the network drives growth, and which part is quietly falling away.',
        signals: [
          'Which leaders are building active teams?',
          'Where did growth stop this quarter?',
          'Which placements keep coming back to support?',
        ],
      },
      growth: {
        title: 'It gets harder with every level.',
        lead: 'A network that was easy to follow at a few hundred members becomes hard to read at tens of thousands.',
        stages: [
          {
            label: 'Hundreds of members',
            text: 'The team knows the leaders by name. Questions are answered from memory and spreadsheets.',
          },
          {
            label: 'Thousands',
            text: 'Legs and generations multiply. Finding who sits under whom takes time, and placement mistakes get costly.',
          },
          {
            label: 'Tens of thousands',
            text: 'Growth and churn hide inside deep branches. Month-end reports arrive too late to act on.',
          },
        ],
      },
      approach: {
        title: 'Structure first, then visibility.',
        lead: 'We map how your network is actually built (sponsorship, placement and the rules your plan reads) before deciding what each team should see.',
        steps: [
          { title: 'Sponsorship', text: 'Who introduced whom, and how it is recorded.' },
          { title: 'Placement', text: 'Where new members are placed, and who decides.' },
          { title: 'Plan rules', text: 'Which parts of the structure your plan reads.' },
          { title: 'Corrections', text: 'How a wrong placement is fixed and recorded.' },
          { title: 'Views', text: 'What owners, leaders and support each need to see.' },
          { title: 'Growth signals', text: 'The indicators that show where to act.' },
        ],
        note: 'Which views and indicators your implementation includes is agreed during discovery.',
      },
      concept: {
        eyebrow: 'Interface concept',
        title: 'A network view built for decisions.',
        lead: 'An example of how an owner could look at the network: one branch, the activity behind it and the signals that need attention.',
        mock: {
          title: 'Network overview',
          period: 'September 2026',
          branch: 'Selected branch',
          leader: 'Leader',
          members: 'Members',
          active: 'Active this month',
          newMembers: 'New this month',
          volume: 'Group volume',
          legs: 'Legs',
          left: 'Left',
          right: 'Right',
          signals: 'Needs attention',
          legend: ['Active', 'Inactive', 'New this month'],
          signalItems: [
            'Right leg growing faster than the left for 3 months',
            '3 leaders below their activity requirement',
            '12 new placements waiting for confirmation',
          ],
          ariaLabel: 'Example network overview with sample data',
        },
      },
      outcomes: {
        title: 'What owners get from a clearer network.',
        items: [
          {
            title: 'Know where growth comes from',
            text: 'Branches and leaders behind the numbers, not just totals.',
          },
          {
            title: 'Spot stalling branches earlier',
            text: 'Before a quiet branch shows up in month-end sales.',
          },
          {
            title: 'Support leaders with facts',
            text: 'Conversations based on their team’s real activity.',
          },
          {
            title: 'Fewer placement disputes',
            text: 'Clear rules for who is placed where, and why.',
          },
          {
            title: 'Plan campaigns by team and region',
            text: 'Target the parts of the network that need a push.',
          },
        ],
      },
      teams: {
        title: 'Who works with the network view.',
        items: [
          'Growth and risk by branch, leader and region.',
          'Placements, corrections and member questions.',
          'Their own team, levels and new members.',
        ],
      },
      consider: [
        'How complete and consistent your current genealogy data is.',
        'Your placement rules, and who is allowed to change a placement.',
        'Binary, unilevel, matrix or hybrid structure, and how deep members can see.',
        'How history is kept when a placement is corrected.',
        'Migration from your current system, reconciled branch by branch.',
        'What members may see about other members.',
      ],
      faq: {
        title: 'Network questions, answered.',
        items: [
          {
            q: 'Can you work with our existing genealogy?',
            a: 'Usually, yes. How complete and consistent the current data is decides the migration approach, which we assess during discovery.',
          },
          {
            q: 'Which network structures can we discuss?',
            a: 'Binary, unilevel, matrix and hybrid structures, as well as custom placement rules. The structure your plan depends on is mapped first.',
          },
          {
            q: 'Can members see their own downline?',
            a: 'What members see about their team is decided with you, including privacy between branches.',
          },
          {
            q: 'How are placement mistakes corrected?',
            a: 'Who may correct a placement, who approves it and how the history is kept are designed with your operations team.',
          },
        ],
      },
      cta: {
        title: 'Want to see your network more clearly?',
        text: 'Tell us how your network is structured today and which questions you can’t answer yet.',
        label: 'Discuss your network structure',
      },
      demo: {
        title: 'Let’s look at your network together.',
        text: 'Tell us about your structure, your leaders and where growth is hard to see.',
      },
    },

    ecommerce: {
      hero: {
        eyebrow: 'Ecommerce for network businesses',
        title: 'Commerce that follows',
        highlight: 'your business rules.',
        lead: 'In a network business an order is never just an order. It carries a member, a price level, a sponsor and a period, and it matters to your compensation plan.',
        ctaLabel: 'Discuss your commerce flow',
        chips: ['Which price applies here?', 'Does this order count?', 'Who follows up?'],
      },
      problem: {
        quote: 'Our shop and our bonus system don’t agree.',
        text: 'Orders come from a web store, a stockist or a WhatsApp group, while bonuses are worked out somewhere else. Every mismatch becomes a support ticket or a finance correction.',
        signals: [
          'Which price applies to this member?',
          'Does this order count for the current period?',
          'Who follows up when a delivery fails?',
        ],
      },
      growth: {
        title: 'More channels, more exceptions.',
        lead: 'Selling through members, stockists and customers multiplies the rules every order has to respect.',
        stages: [
          {
            label: 'One store, one price list',
            text: 'Orders are few enough to check by hand.',
          },
          {
            label: 'Member prices and stockists',
            text: 'Price levels, stock points and returns start to affect bonuses.',
          },
          {
            label: 'Many channels and regions',
            text: 'Every channel has its exceptions, and finance reconciles them at month-end.',
          },
        ],
      },
      approach: {
        title: 'Map the order before building the shop.',
        lead: 'We follow one order through your business: who buys, which price applies, which rules it touches and who acts on it next.',
        steps: [
          { title: 'Customer or member', text: 'Who is buying, and at which price level.' },
          { title: 'Order', text: 'Products, quantities and payment.' },
          { title: 'Business context', text: 'Sponsor, period and the volume it carries.' },
          { title: 'Operational rules', text: 'Stock point, shipping and approval steps.' },
          {
            title: 'Fulfilment and follow-up',
            text: 'Delivery, returns and what the member is told.',
          },
        ],
        note: 'Whether bonus-related steps are automated in your implementation is agreed during discovery; we don’t assume it.',
      },
      concept: {
        eyebrow: 'Interface concept',
        title: 'One order, with its business context.',
        lead: 'An example of an order screen that shows what matters in a network business: the member, the price level, the period and the next step.',
        mock: {
          order: 'Order',
          paid: 'Paid',
          member: 'Member',
          sponsor: 'Sponsor',
          priceLevel: 'Price level',
          priceLevelValue: 'Member price',
          stockPoint: 'Stock point',
          period: 'Period',
          periodValue: 'September 2026',
          volume: 'Volume',
          items: 'Items',
          total: 'Total',
          timeline: ['Paid', 'Packed', 'Shipped', 'Delivered'],
          nextStep: 'Next step',
          nextStepValue: 'Ship from Surabaya stock point',
          products: ['Herbal Tea · 2 boxes', 'Collagen Drink · 1 pack'],
          ariaLabel: 'Example order screen with sample data',
        },
      },
      outcomes: {
        title: 'What changes when the order knows its context.',
        items: [
          {
            title: 'Prices that match the buyer',
            text: 'Retail, member and stockist prices applied the same way every time.',
          },
          {
            title: 'Orders that count where they should',
            text: 'Period and volume clear from the order itself.',
          },
          {
            title: 'Fewer manual corrections',
            text: 'Less month-end work for finance and support.',
          },
          {
            title: 'Clear follow-up',
            text: 'Everyone knows who acts on a failed delivery or a return.',
          },
          {
            title: 'A shop that fits how you sell',
            text: 'Designed around your channels, not a generic template.',
          },
        ],
      },
      teams: {
        title: 'Who works with the order flow.',
        items: [
          'Orders, stock points, shipping and returns.',
          'Payments, refunds and what reaches the payout.',
          'Ordering and tracking from their own account.',
        ],
      },
      consider: [
        'Your price levels: retail, member and stockist.',
        'Payment methods, and the payment provider you use today.',
        'Stock points, shipping partners and delivery areas.',
        'Return and refund rules, and their effect on bonuses.',
        'Tax on orders, as your tax advisor specifies.',
        'Your current store and order history, if you have one.',
      ],
      integrationsLink: {
        text: 'Payment providers, couriers and the other systems you already use are reviewed in integration discovery.',
        link: 'Explore Integrations',
      },
      faq: {
        title: 'Commerce questions, answered.',
        items: [
          {
            q: 'Do we need a separate online store?',
            a: 'Not necessarily. Whether the store is part of the same system or connected to one you already run is decided with you, based on how you sell today.',
          },
          {
            q: 'Can members and customers see different prices?',
            a: 'Price levels per type of buyer are part of the design conversation, including stockist prices.',
          },
          {
            q: 'Which payment providers can we use?',
            a: 'Tell us which provider you use. Integration options are assessed during discovery.',
          },
          {
            q: 'What happens to bonuses when an order is returned?',
            a: 'Returns are designed as corrections that leave a trail, agreed with your finance team. The compensation page shows how we approach reversals.',
          },
        ],
      },
      cta: {
        title: 'Selling through members, stockists and customers?',
        text: 'Walk us through how an order moves in your business today. We’ll show where the rules need to meet.',
        label: 'Discuss your commerce flow',
      },
      demo: {
        title: 'Let’s map your order flow.',
        text: 'Tell us where you sell, which prices you use and how orders reach your members.',
      },
    },

    wallet: {
      hero: {
        eyebrow: 'Wallet & Payout',
        title: 'Make payout rules',
        highlight: 'easier to understand.',
        lead: 'Members want to know what they earned and when they get paid. Finance needs to explain every amount. Both depend on payout rules that are written down clearly before they become software.',
        ctaLabel: 'Discuss your payout workflow',
        chips: ['Why is this amount pending?', 'Who approved this payout?', 'When can I withdraw?'],
      },
      problem: {
        quote: 'Why is my balance different from what I expected?',
        text: 'When the reason behind an amount, the pending part and the deductions aren’t visible, every payout day creates questions for support and finance.',
        signals: [
          'What is pending, and what can be withdrawn?',
          'Why was this amount deducted?',
          'Who approved this payout, and when?',
        ],
      },
      growth: {
        title: 'Every payout run gets bigger.',
        lead: 'With a few hundred members, finance checks each transfer. At scale, unclear rules turn into disputes.',
        stages: [
          {
            label: 'Hundreds of payouts',
            text: 'Finance reviews every transfer by hand.',
          },
          {
            label: 'Thousands',
            text: 'Holds, corrections and tax deductions need their own steps.',
          },
          {
            label: 'Tens of thousands',
            text: 'Members need answers without asking, and finance needs a trail for every change.',
          },
        ],
      },
      approach: {
        title: 'Write the payout rules down first.',
        lead: 'Before any balance is shown to a member, we agree with your finance team how an amount moves from earned to paid.',
        steps: [
          { title: 'Earning context', text: 'Which order or rule created the amount.' },
          { title: 'Pending', text: 'When an amount becomes available, and why it may wait.' },
          { title: 'Adjustments', text: 'Corrections and reversals, each with a reason.' },
          { title: 'Tax', text: 'Withholding as your tax advisor specifies.' },
          { title: 'Approval', text: 'Who reviews a payout run, in which order.' },
          { title: 'Payout', text: 'How and when money reaches the member.' },
        ],
        note: 'Your tax advisor stays in control of rates. Which steps are automated in your implementation is agreed during discovery.',
      },
      concept: {
        eyebrow: 'Interface concept',
        title: 'The same amounts, explained for each side.',
        lead: 'An example of a member wallet next to a finance payout queue: what the member sees, and what finance reviews.',
        mock: {
          walletTitle: 'My wallet',
          available: 'Available',
          pending: 'Pending',
          onHold: 'On hold',
          withdraw: 'Withdraw',
          history: 'Recent activity',
          entries: [
            { text: 'Generation bonus · September', note: 'From your team’s orders' },
            { text: 'Income tax withheld', note: 'Recorded on your tax slip' },
            { text: 'Direct referral bonus', note: 'Available after the return window' },
          ],
          financeTitle: 'Payout run · 5 Oct 2026',
          recipients: 'Recipients',
          statuses: ['In review', 'Approved', 'Ready to pay'],
          checks: ['Holds released for September orders', '3 adjustments need a reason'],
          approve: 'Approve run',
          ariaLabel: 'Example member wallet and payout queue with sample data',
        },
      },
      outcomes: {
        title: 'What changes when payout rules are clear.',
        items: [
          {
            title: 'Fewer “where is my bonus?” questions',
            text: 'Members see why an amount is pending or deducted.',
          },
          {
            title: 'Every amount with its reason',
            text: 'Traceable to the order or rule that created it.',
          },
          {
            title: 'Approvals that follow your policy',
            text: 'Clear steps before money leaves the business.',
          },
          { title: 'Tax recorded per member and period', text: 'As your tax advisor specifies.' },
          { title: 'Calmer payout days', text: 'Fewer surprises for finance and support.' },
        ],
      },
      teams: {
        title: 'Who works with payouts.',
        items: [
          'Approvals, tax and reconciliation.',
          'Payout ratio and liability in context.',
          'Their balance and payout history.',
        ],
      },
      consider: [
        'Your payout schedule and minimum amounts.',
        'Holding periods, and the events that release them.',
        'Withdrawal methods, and the banks or providers involved.',
        'Tax withholding and withholding slips, set by your tax advisor.',
        'Approval steps, and who signs off.',
        'Opening balances from your current system, reconciled before they move.',
      ],
      faq: {
        title: 'Payout questions, answered.',
        items: [
          {
            q: 'Can we set our own payout schedule?',
            a: 'Yes. The schedule, minimum amounts and holding periods are part of the rules we write down with you.',
          },
          {
            q: 'How is tax handled?',
            a: 'Your tax advisor sets rates and treatment; the design records what they need per member and period. We don’t give tax advice.',
          },
          {
            q: 'Can finance review a payout before it is paid?',
            a: 'Approval steps are designed around your internal policy, including who signs off and in which order.',
          },
          {
            q: 'What happens to balances in our current system?',
            a: 'Opening balances move only after they reconcile with your records. What can be migrated is assessed during discovery.',
          },
        ],
      },
      cta: {
        title: 'Is payout day stressful for your team?',
        text: 'Tell us how payouts work today, from earning to transfer. We’ll help you write down rules members and finance can both follow.',
        label: 'Discuss your payout workflow',
      },
      demo: {
        title: 'Let’s go through your payout rules.',
        text: 'Tell us your schedule, your approvals and the questions members ask most.',
      },
    },
  },
}
