/**
 * /how-we-do-it: the implementation journey (docs/implementation-marketing.md).
 * A process, not a capability list: nothing here promises a timeline, a
 * migration result, an integration or a support level. Where a policy is
 * set per project, the copy says so.
 */
export default {
  hero: {
    eyebrow: 'From business rules to a working system',
    title: 'We understand the business',
    highlight: 'before we build the software.',
    lead: 'Your compensation plan, member journey, sales flow and operational rules are mapped before implementation begins. That gives both teams a clearer picture of what needs to be built, tested and launched.',
    cta: 'Discuss Your Project',
    canvas: {
      label: 'Implementation blueprint, built up in six layers',
      title: 'Implementation blueprint',
      layers: [
        { title: 'Business model', items: ['Products', 'Markets', 'Member types'] },
        { title: 'Member journey', items: ['Registration', 'Placement', 'Activity'] },
        { title: 'Sales flow', items: ['Orders', 'Stock points', 'Returns'] },
        { title: 'Compensation rules', items: ['Qualification', 'Bonuses', 'Ranks'] },
        { title: 'Operations', items: ['Approvals', 'Payouts', 'Reports'] },
        { title: 'Technical blueprint', items: ['Data', 'Integrations', 'Migration'] },
      ],
    },
  },

  problem: {
    eyebrow: 'Why projects struggle',
    title: 'Software projects usually become difficult before the code is the problem.',
    lead: 'Delays and rework often trace back to three things that are easy to underestimate at the start of a project.',
    causes: [
      {
        title: 'The rules are not written down.',
        text: 'Bonus exceptions, approval habits and manual corrections are often known by a few people and documented nowhere. They tend to surface late, during testing.',
      },
      {
        title: 'Each team describes the same process differently.',
        text: 'Owners, finance, operations and IT each see their own part of the flow. Without one shared picture, requirements conflict before development starts.',
      },
      {
        title: 'Existing data is more complicated than expected.',
        text: 'Years of spreadsheets, manual adjustments and a previous system leave duplicates, gaps and history that must be understood before anything moves.',
      },
    ],
  },

  positioning: {
    eyebrow: 'Our approach',
    title: 'Business first. Software second.',
    lead: 'Before deciding what to configure or build, we map how your business works today and what needs to change.',
    first: {
      title: 'What we map first',
      items: [
        'How members join, get placed and stay active',
        'When an order counts toward qualification',
        'How each bonus is earned, calculated and approved',
        'Who decides what, and where exceptions happen',
      ],
    },
    then: {
      title: 'What that decides',
      items: [
        'What is configured and what needs custom work',
        'Which systems need to exchange data',
        'Which data moves, and how it is checked',
        'What has to be tested before launch',
      ],
    },
  },

  phases: {
    eyebrow: 'The implementation journey',
    title: 'Nine phases, from the first conversation to life after launch.',
    lead: 'Each phase has a purpose and a result both teams can review. Some phases overlap; the order shows how the picture of the project builds up.',
    railLabel: 'Implementation phases',
    phase: (n: number) => `Phase ${n}`,
    lookAt: 'What we look at',
    outcome: 'What comes out of it',
    items: {
      discover: {
        label: 'Discover',
        title: 'Understand how the business actually works.',
        text: 'We start with conversations, not configuration: how you sell, how your network grows, how bonuses are paid today, and where the current process causes the most work.',
        points: [
          'Business model, products and markets',
          'Member lifecycle and network structure',
          'The current compensation plan and its exceptions',
          'Sales and order flow',
          'Operational roles: who does what today',
          'Current systems, spreadsheets and manual work',
          'Pain points, priorities and the target launch period',
        ],
        outcome: 'Shared understanding of the current business flow and project priorities.',
      },
      blueprint: {
        label: 'Blueprint',
        title: 'Turn business rules into a system blueprint.',
        text: 'What we learn is written down as a blueprint your team can read and correct: who does what, which data is involved, and how each rule decides an outcome.',
        points: [
          'Actors and roles',
          'Processes and their steps',
          'Data each step needs',
          'Qualification rules',
          'Calculation requirements',
          'Approvals',
          'Exceptions',
          'Reports',
          'Integrations',
        ],
        securityLink: 'How security requirements are clarified',
        map: {
          label: 'Example of a decision map',
          trigger: 'Order paid',
          check: 'Does the member qualify this period?',
          yes: 'Yes',
          no: 'No',
          yesResult: 'Counts toward the bonus',
          noResult: 'Held and flagged for review',
          note: 'Drawn up with your team in workshops and documents.',
        },
        outcome:
          'A reviewed blueprint of processes, rules, data and decisions: the reference for every phase that follows.',
      },
      configure: {
        label: 'Configure',
        title: 'Define what can be configured and what needs custom work.',
        text: 'Once the blueprint is agreed, each requirement is sorted into one of three groups, so scope and effort are visible before any building starts.',
        split: [
          {
            title: 'Existing platform capability',
            text: 'Requirements the platform already covers, used as they are.',
          },
          {
            title: 'Configuration',
            text: 'Settings, rules and parameters adjusted to your business.',
          },
          {
            title: 'Custom requirements',
            text: 'What your business needs beyond that, scoped and agreed separately.',
          },
        ],
        note: 'Which group a requirement belongs to is confirmed per project, during the blueprint.',
        featuresLink: 'Explore the feature areas',
        outcome:
          'A clear split between what is used as it is, configured or built, with the scope agreed.',
      },
      integrate: {
        label: 'Integrate',
        title: 'Map the systems that need to work together.',
        text: 'Most businesses already run other systems. We map which ones need to exchange data with the MLM system, in which direction, and who is responsible for each side.',
        areasLabel: 'Potential integration areas',
        areas: [
          'Payments',
          'Banking',
          'Logistics',
          'Accounting',
          'Messaging',
          'Identity & sign-in',
          'Internal systems',
        ],
        areasNote:
          'Each integration is assessed per project: what the other system allows, which data moves, and who builds which side.',
        pageLink: 'See how integrations are planned',
        cta: {
          title: 'Have an existing system landscape?',
          text: 'Tell us what you use today and we can map it together.',
          label: 'Discuss your systems via WhatsApp',
        },
        outcome: 'An integration map: systems, data exchanged, direction and responsibilities.',
      },
      migrate: {
        label: 'Migrate',
        title: 'Move the data that matters—without treating migration as an afterthought.',
        text: 'Migration is planned from the start, because member history, network structure and balances affect how the new system is set up.',
        categoriesLabel: 'Data that is commonly considered',
        categories: [
          'Member profiles',
          'Sponsor relationships',
          'Network structure',
          'Rank and qualification history',
          'Transaction history',
          'Wallet balances, only where technically and financially feasible',
          'Reference data: products, regions, price lists',
        ],
        scope:
          'Migration scope depends on the source system, data quality, and agreed implementation requirements.',
        outcome: 'A migration plan: what moves, how it is checked, and when.',
      },
      test: {
        label: 'Test',
        title: 'Test the business scenarios—not just the screens.',
        text: 'A screen that works is not the same as a bonus that is right. Test scenarios are written from your business rules and checked by the people who know them.',
        points: [
          'Qualifying and non-qualifying transactions',
          'Rank changes, up and down',
          'Changed or cancelled transactions',
          "Edge cases from your plan's exceptions",
          'Finance reconciliation against expected totals',
          'Roles and permissions',
        ],
        outcome: 'Test results your business team has reviewed, with open issues listed.',
      },
      train: {
        label: 'Train',
        title: 'Prepare the people who will run the system.',
        text: 'Admins, operations, finance, member support and management each use the system differently, so training follows their daily work rather than a general tour.',
        points: [
          'Sessions organised by role',
          'Daily tasks and period-end tasks',
          'Handling exceptions and corrections',
          'Where to get help after launch',
        ],
        scope: 'Training scope is defined based on the roles involved in the implementation.',
        outcome: 'Teams who know their part of the system before members start using it.',
      },
      launch: {
        label: 'Launch',
        title: 'Go live with a clear transition plan.',
        text: 'Go-live is a planned step, not a switch flipped at the last minute. The plan is agreed with your team beforehand.',
        points: [
          'Final data cutover: steps and timing',
          'User accounts and access ready before go-live',
          'Known outstanding issues and how they are handled',
          'Communication to members and staff',
          'Close monitoring in the first period',
          'Fallback and escalation paths',
        ],
        outcome: 'A go-live both teams agreed on, with everyone knowing their role.',
      },
      support: {
        label: 'Support',
        title: 'Implementation does not end on launch day.',
        text: 'The first periods after launch (the first bonus run, the first payouts, the first month-end) are when questions come up. We plan for them from the start.',
        points: [
          'Follow-up on the first calculation and payout periods',
          'Issue reporting and follow-up',
          'Changes and improvements after launch',
        ],
        scope:
          'Post-launch support scope is agreed as part of the implementation and commercial arrangement.',
        outcome: 'A known way to raise issues and requests after launch.',
      },
    },
  },

  migrationReality: {
    title: 'Migration is more than importing a spreadsheet.',
    text: 'Data from a previous system has to be understood before it can be trusted. Each of these steps is agreed with your team.',
    steps: [
      { title: 'Extract', text: 'Export data from the current system and spreadsheets.' },
      { title: 'Understand', text: 'Learn what each field means and where the history lives.' },
      { title: 'Clean', text: 'Resolve duplicates, gaps and conflicting records.' },
      { title: 'Map', text: 'Match old fields and structures to the new system.' },
      { title: 'Validate', text: 'Check counts, relationships and balances with your team.' },
      { title: 'Import', text: 'Load the agreed data, with trial runs where needed.' },
      { title: 'Reconcile', text: 'Compare the result with the source before sign-off.' },
    ],
    pricingLink: 'See what affects pricing',
  },

  compensationValidation: {
    eyebrow: 'Compensation validation',
    title: 'Before launch, the compensation logic needs to make sense to the business.',
    text: 'Before go-live, your business team compares the expected result with the system result for each agreed scenario, using example transactions they recognise.',
    stepsLabel: 'How each rule is checked',
    steps: [
      'Business rule',
      'Example transaction',
      'Expected outcome',
      'System result',
      'Review',
      'Approval',
    ],
    example: {
      label: 'A worked example',
      rule: "The sponsor earns 10% of a new member's first order",
      transaction: (amount: string) => `A new member's first order: ${amount}`,
      expected: (amount: string) => `${amount} for the sponsor`,
      result: (amount: string) => `${amount} for the sponsor`,
      match: 'Matches',
      review: 'Finance and the plan owner compare both results',
      approval: 'The rule is approved for launch',
    },
    link: 'Discuss your compensation plan',
    whatsapp: 'Ask how a plan is checked before launch',
  },

  responsibilities: {
    eyebrow: 'Working together',
    title: 'A successful implementation needs both sides.',
    lead: 'Neither team can do this alone. This is how the work is usually shared.',
    ours: {
      title: 'What the mlmsoft team brings',
      items: [
        'Runs the discovery sessions and writes down what we learn',
        'Turns your rules and workflows into a blueprint your team can review',
        'Identifies technical dependencies early: systems, data and access',
        'Configures and builds the agreed scope, and explains what is configuration and what is custom work',
        'Prepares test scenarios with you and works through what testing finds',
        'Plans the migration and the go-live steps with you',
      ],
    },
    yours: {
      title: 'What your team brings',
      items: [
        'The business rules, as they really work today',
        'The people who make decisions, named early',
        'Current documents, spreadsheets and data exports',
        'Validation of the test scenarios and review of the results',
        'Decisions when a rule is unclear or two teams see it differently',
        'Internal users prepared, and communication to your members',
      ],
    },
  },

  discoveryTeam: {
    eyebrow: 'Who should join discovery',
    title: 'The right people in the room reduce expensive misunderstandings later.',
    lead: 'Discovery works best when the people who own each part of the business can take part. Not every session needs everyone.',
    roles: {
      owner: {
        title: 'Owner or project sponsor',
        text: 'Sets priorities, makes scope decisions and settles trade-offs.',
      },
      operations: {
        title: 'Operations',
        text: 'Knows the daily flow: registrations, orders, stock and member support.',
      },
      finance: {
        title: 'Finance',
        text: 'Owns payouts, tax, reconciliation and the reports finance relies on.',
      },
      it: {
        title: 'IT',
        text: 'Knows the current systems, data, access and infrastructure.',
      },
      sme: {
        title: 'Compensation or network expert',
        text: "Knows the plan's rules, its exceptions and how they came about.",
      },
    },
    roleLink: 'What matters to this team',
    smeLink: 'How compensation plans are mapped',
  },

  scope: {
    eyebrow: 'Scope',
    title: 'What affects implementation scope?',
    lead: 'Every project is different. These are the factors that shape the effort, the timeline and the price.',
    factors: [
      { title: 'Business complexity', text: 'Markets, entities, member types and sales channels.' },
      {
        title: 'Compensation rules',
        text: 'The number of bonuses, qualifications, ranks and exceptions.',
      },
      {
        title: 'Number of modules',
        text: 'Which parts of the business the system needs to cover.',
      },
      { title: 'Existing integrations', text: 'Systems that need to exchange data, and how.' },
      { title: 'Migration volume', text: 'Members, network history and transactions to move.' },
      { title: 'Data quality', text: 'How much cleaning and clarification the data needs.' },
      { title: 'Customization', text: 'Requirements that go beyond configuration.' },
      { title: 'Testing scope', text: 'Scenarios, reconciliation and who signs off.' },
      {
        title: 'Organization readiness',
        text: 'How available decision makers and process owners are.',
      },
    ],
    pricingLink: 'See how pricing works',
    timeline: {
      title: 'So how long does it take?',
      text: 'There is no single timeline that fits every project. The scope becomes clearer after discovery, once the business rules, migration needs, integrations and testing requirements are understood.',
    },
  },

  migrationBand: {
    eyebrow: 'Migration',
    title: 'Already running on another system?',
    text: 'Tell us what you use today, what works, and what needs to change. That is usually the best place to start.',
    whatsapp: 'Discuss Migration via WhatsApp',
    pricing: 'See Pricing',
  },

  readiness: {
    eyebrow: 'Readiness check',
    title: 'How ready is your project?',
    lead: 'Tick what already applies. It only helps you see where you stand: nothing here is saved or sent.',
    legend: 'What already applies to your project',
    items: [
      'We know how our compensation plan works, even if it is not fully documented.',
      'We know who owns each business process.',
      'We know which data needs to move from our current system.',
      'We know which external systems need to connect.',
      'Finance, operations and IT can take part in discovery.',
      'We have a target launch period in mind.',
    ],
    progress: (count: number, total: number) => `${count} of ${total} ticked`,
    results: {
      none: 'Start from wherever you are. Discovery is where these areas get clarified.',
      some: 'Some areas can be clarified during discovery. What you ticked is a good starting point.',
      most: 'You already have useful inputs for a discovery conversation. The remaining points can be clarified together.',
      all: 'You already have useful inputs for a discovery conversation.',
    },
    note: 'This is not an assessment of your project, only a way to prepare for the first conversation.',
    cta: 'Discuss Your Project',
  },

  faq: {
    title: 'Questions about implementation',
    lead: 'The short answers. Every project is scoped on its own, so the details are confirmed with your team.',
    items: [
      {
        q: 'How long does an implementation take?',
        a: 'There is no single timeline that fits every project. The scope becomes clearer after discovery, once the business rules, migration needs, integrations and testing requirements are understood.',
      },
      {
        q: 'Can we move from our current MLM system?',
        a: 'That is a common starting point. What can move, and how, depends on the source system, the data quality and the agreed requirements, so we assess it during discovery before anything is promised.',
      },
      {
        q: 'Can mlmsoft follow our existing compensation plan?',
        a: 'We start from your plan as it works today and map it rule by rule. Rules that need configuration or custom work, or that are still unclear, become visible in the blueprint before anything is built. The scope is agreed based on the implementation requirements.',
      },
      {
        q: 'What data can be migrated?',
        a: 'Commonly: member profiles, sponsor relationships, network structure, rank history, transaction history and reference data, and wallet balances only where technically and financially feasible. Migration scope depends on the source system, data quality, and agreed implementation requirements.',
      },
      {
        q: 'Do we need our own IT team?',
        a: 'Not necessarily, but someone who knows your current systems and data helps a lot, especially for integrations and migration. If you have no IT team, who covers those responsibilities is discussed during discovery.',
      },
      {
        q: 'What happens before development starts?',
        a: 'Discovery and the blueprint. Your business flow, compensation rules, data and integrations are mapped and reviewed with your team, and the split between configuration and custom work is agreed.',
      },
      {
        q: 'How is the compensation plan tested?',
        a: 'With scenarios from your own rules: example transactions, the outcome your team expects, and the result the system produces. Differences are reviewed and resolved before the business approves each rule.',
      },
      {
        q: 'Can you integrate with our existing systems?',
        a: 'Each integration is assessed per project: what the other system allows, which data needs to move, and who builds each side. This is mapped in the Integrate phase before anything is committed.',
      },
      {
        q: 'Is training included?',
        a: 'Training is one of the implementation phases. Training scope is defined based on the roles involved in the implementation.',
      },
      {
        q: 'What happens after go-live?',
        a: 'The first periods after launch get close attention, especially the first calculation and payout runs. Post-launch support scope is agreed as part of the implementation and commercial arrangement.',
      },
    ],
  },

  finalCta: {
    title: 'Your project does not need to start with a technical specification.',
    text: 'Start by telling us how the business works today. We can map the system requirements from there.',
    whatsapp: 'Discuss Your Project via WhatsApp',
  },

  demo: {
    title: 'Prefer a scheduled conversation?',
    text: 'Book a demo and tell us about your current setup. The session starts from how your business works.',
  },
}
