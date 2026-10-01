/**
 * Copy area: integrations. /integrations (docs/integrations-marketing.md).
 *
 * Integration readiness, discovery and system architecture. Nothing here
 * says an integration exists: areas are discussed, methods are assessed
 * per project, and no provider is named (docs/integration-evidence.md).
 * Examples are conceptual and say so.
 */
import type { FaqItem } from '~/content/faq'

type Item = { title: string; text: string }
type Example = {
  tab: string
  title: string
  lead: string
  steps: string[]
  questions: string[]
}

const integrations = {
  hero: {
    eyebrow: 'Integrations',
    title: 'Your business does not start',
    highlight: 'from a blank system.',
    lead: 'Payment, logistics, finance, messaging and internal tools may already be part of your operation. We map what needs to exchange data before deciding how the integration should be built.',
    cta: 'Discuss Your Integrations',
    secondary: 'Request an Integration Consultation',
  },

  map: {
    caption: 'Integration architecture concept',
    centre: 'Your MLM system',
    centreText: 'Members, orders, commissions',
    nodes: {
      payments: 'Payment',
      banking: 'Banking & payout',
      logistics: 'Logistics',
      finance: 'Finance',
      messaging: 'Messaging',
      systems: 'Existing systems',
    },
    /** Read by screen readers instead of the drawing. */
    description:
      'An MLM system in the centre, with payment, banking and payout, logistics, finance, messaging and existing systems around it. A concept of what may need to exchange data, not a list of existing connectors.',
  },

  problem: {
    eyebrow: 'Why integration needs design',
    title: 'The difficult part is rarely just connecting two APIs.',
    lead: 'Two systems can exchange data and still disagree. Most integration problems come from questions nobody answered before building.',
    items: [
      {
        title: 'Different sources of truth',
        text: 'Which system owns member, order, payment or inventory data when both keep a copy?',
      },
      {
        title: 'Different identifiers',
        text: 'The same customer or order can carry a different ID in every system.',
      },
      {
        title: 'Different timing',
        text: 'One system updates immediately; another processes changes later, in batches.',
      },
      {
        title: 'Failure handling',
        text: 'What happens when one side succeeds and the other does not?',
      },
      {
        title: 'Reconciliation',
        text: 'How does finance know that both systems agree at the end of a period?',
      },
    ] satisfies Item[],
  },

  areas: {
    eyebrow: 'Integration areas',
    title: 'Common integration areas we discuss',
    lead: 'Most MLM and direct selling businesses already run some of these. Each one is reviewed against your workflow, not assumed.',
    items: {
      payments: {
        title: 'Payments',
        text: 'Payment confirmation and transaction status: how the business knows an order is really paid.',
      },
      banking: {
        title: 'Banking & Payout',
        text: 'Banking or disbursement requirements for member withdrawals and payouts.',
      },
      logistics: {
        title: 'Logistics',
        text: 'Shipment, rate and delivery information for member and customer orders.',
      },
      finance: {
        title: 'Accounting & Finance',
        text: 'The financial data your accounting needs, and how both sides are reconciled.',
      },
      messaging: {
        title: 'Messaging',
        text: 'Notifications and communication with members and customers.',
      },
      systems: {
        title: 'Existing Systems',
        text: 'ERP, CRM, warehouse, POS or custom internal software you already use.',
      },
    } satisfies Record<string, Item>,
    disclosure:
      'The exact integration method depends on the systems, providers and technical access available in your project.',
    available: {
      title: 'Available integrations',
      lead: 'Connectors verified in mlmsoft. Anything else is assessed per project.',
      documentation: 'Documentation',
    },
  },

  discovery: {
    eyebrow: 'Integration discovery',
    title: 'We start with the data flow.',
    lead: 'Before a technical method is chosen, every connection is described the same way: what moves, who owns it, when it moves, and what happens when it does not arrive.',
    from: 'System A',
    to: 'System B',
    label: 'Questions answered for every data flow, from System A to System B',
    steps: [
      {
        title: 'What data?',
        text: 'Orders, payments, members, shipments: the exact fields that need to move.',
      },
      { title: 'Who owns it?', text: 'Which system is allowed to create and change that data.' },
      {
        title: 'When does it move?',
        text: 'As soon as something happens, on a schedule, or when a person decides.',
      },
      {
        title: 'What confirms success?',
        text: 'The signal both sides accept as “done”.',
      },
      {
        title: 'What happens on failure?',
        text: 'Retry, wait, alert someone, or stop and review.',
      },
    ] satisfies Item[],
  },

  truth: {
    eyebrow: 'Source of truth',
    title: 'One piece of data should have a clear owner.',
    lead: 'Before development, teams should agree which system is authoritative for each data domain. Sometimes that is the MLM system, sometimes it is another system you already run.',
    domainLabel: 'Data domain',
    ownerLabel: 'Authoritative system',
    domains: [
      'Order status',
      'Payment status',
      'Member profile',
      'Inventory',
      'Commission context',
      'Shipment status',
    ],
    unknown: 'To be agreed',
    note: 'Agreed with your team during discovery, never assumed.',
  },

  examples: {
    eyebrow: 'Examples',
    title: 'What integration design has to consider.',
    lead: 'Conceptual examples, not a description of existing connectors. Each one shows the questions a flow raises before it can be built.',
    tabsLabel: 'Integration examples',
    flowLabel: 'Example flow',
    questionsLabel: 'Questions to answer',
    payment: {
      tab: 'Payment',
      title: 'A payment confirmation',
      lead: 'A customer pays through an external payment provider; the business needs to know the payment is real before the order moves on.',
      steps: [
        'Customer places an order',
        'Payment provider processes the payment',
        'Payment confirmation is received',
        'Order status is evaluated',
        'Business workflow continues',
      ],
      questions: [
        'How is the authenticity of a payment confirmation verified?',
        'What happens when the same confirmation arrives twice?',
        'What if the confirmation arrives late, after the order expired?',
        'What happens to the order, and to commissions, when a payment is refunded?',
      ],
    } satisfies Example,
    logistics: {
      tab: 'Logistics',
      title: 'A shipment',
      lead: 'A paid order has to reach a member or customer, often through a courier your business already works with.',
      steps: [
        'Order is ready',
        'Shipment is requested',
        'Waybill or shipment reference is created',
        'Package is handed over',
        'Status is updated',
        'Delivered, or an exception',
      ],
      questions: [
        'Who creates the shipment, and from which system?',
        'Which shipment statuses matter to your team and to members?',
        'What happens when a delivery fails or is returned?',
        'Which system owns the tracking information?',
      ],
    } satisfies Example,
    finance: {
      tab: 'Finance',
      title: 'A financial record',
      lead: 'Sales, commissions and payouts end up in your books. Finance needs to trust the numbers on both sides.',
      steps: [
        'Transaction',
        'Business event',
        'Financial record',
        'External finance or accounting requirement',
        'Reconciliation',
      ],
      questions: [
        'Which business events become financial records, and when?',
        'How do sales, commissions and liabilities map to your chart of accounts?',
        'Which totals must agree at the end of each period?',
        'Who reviews and resolves differences?',
      ],
    } satisfies Example,
    messaging: {
      tab: 'Messaging',
      title: 'Three kinds of communication',
      lead: 'Messages to members and customers are not all the same. Each kind has different rules.',
      kinds: [
        {
          title: 'Marketing communication',
          text: 'Campaigns and announcements. Needs consent and an easy way to opt out.',
        },
        {
          title: 'Transactional notification',
          text: 'Order, payment or payout updates triggered by an event. Needs to be timely and correct.',
        },
        {
          title: 'Support conversation',
          text: 'A person talking to your team. Needs history and an owner, not automation.',
        },
      ] satisfies Item[],
      channels:
        'Possible channels include email, WhatsApp and SMS. Communication channels are reviewed during integration discovery.',
      questions: [
        'Which messages are marketing, which are transactional, and which are support?',
        'Who may receive each kind, and how is consent recorded?',
        'Which events trigger a notification, and in which language?',
        'Who answers when a member replies?',
      ],
    },
  },

  patterns: {
    eyebrow: 'Integration patterns',
    title: 'Common integration patterns considered during solution design.',
    lead: 'Which pattern fits depends on the workflow and on what the other system allows. One project often uses more than one.',
    items: {
      immediate: {
        title: 'Immediate',
        text: 'Information is sent or received as soon as something happens, or very shortly after.',
      },
      scheduled: {
        title: 'Scheduled',
        text: 'Data is exchanged at agreed times, for example every hour or every night.',
      },
      manual: {
        title: 'Manual import / export',
        text: 'A person exports and imports files where automation is unnecessary or not possible.',
      },
      event: {
        title: 'Event-driven',
        text: 'One system tells another when a relevant event occurs, such as a payment or a shipment update.',
      },
    } satisfies Record<string, Item>,
    plain: {
      title: 'In plain words',
      items: [
        {
          title: 'API',
          text: 'Lets two systems exchange data through an agreed interface.',
        },
        {
          title: 'Webhook',
          text: 'A message one system sends to another when something happens.',
        },
        {
          title: 'Sandbox',
          text: 'A test environment where an integration can be tried without real transactions.',
        },
      ] satisfies Item[],
      note: 'None of them decides who owns the data, or what happens when a message is lost. That is design work.',
    },
  },

  approach: {
    eyebrow: 'Approach',
    title: 'Some integrations are configuration. Others are development.',
    lead: 'The right approach depends on what the external system exposes and how important the workflow is to your operation.',
    label: 'From existing capability to external limitation',
    steps: [
      { title: 'Existing capability', text: 'What a system already does without changes.' },
      { title: 'Configuration', text: 'Settings, mappings and rules, without new code.' },
      {
        title: 'Custom integration',
        text: 'New development for a connection your workflow needs.',
      },
      {
        title: 'External limitation',
        text: 'What the other system does not allow, and the workaround agreed for it.',
      },
    ] satisfies Item[],
  },

  ownership: {
    eyebrow: 'Responsibilities',
    title: 'Who owns each side of the integration?',
    lead: 'An integration usually involves more than one team. Agreeing who does what is part of the design, not an afterthought.',
    parties: [
      {
        title: 'mlmsoft team',
        text: 'The MLM system side: design, development and testing of our part.',
      },
      {
        title: 'Your team',
        text: 'Business rules, approvals, and your own systems and IT.',
      },
      {
        title: 'External provider',
        text: 'The service being connected: access, documentation and its own rules.',
      },
      {
        title: 'Third-party vendor',
        text: 'Whoever built or runs another system you use, if it is not your team.',
      },
    ] satisfies Item[],
    questionsTitle: 'Established before development',
    questions: [
      'API availability',
      'Credentials, and who issues them',
      'Sandbox or test environment',
      'Documentation',
      'Callback or webhook requirements',
      'Rate limits',
      'Approval or onboarding requirements',
      'Vendor support',
    ],
  },

  readiness: {
    eyebrow: 'Integration readiness',
    title: 'Is your integration landscape ready to discuss?',
    lead: 'Tick what is already true. Nothing is saved or sent: this is a checklist for your own preparation.',
    label: 'Integration readiness checklist',
    items: [
      'We know which systems need integration.',
      'We know who owns each system.',
      'API details or documentation for the other systems are at hand.',
      'Test or sandbox access is possible.',
      'We know which data needs to move.',
      'We know which system is the source of truth for each data domain.',
      'We know who will validate the integration.',
    ],
    resultReady: 'These are useful inputs for an integration discovery session.',
    resultOpen: 'Some technical details can be clarified during discovery.',
    cta: 'Discuss Your Integrations',
    form: 'Or request a consultation',
  },

  security: {
    eyebrow: 'Security',
    title: 'Integration design must include security decisions.',
    lead: 'Every connection is a way into your business data. These decisions are made for each integration, before it is built.',
    items: [
      { title: 'Authentication', text: 'How each system proves who it is.' },
      {
        title: 'Credentials',
        text: 'Who issues them, where they are kept and how they are replaced.',
      },
      { title: 'Authorization', text: 'What each connection is allowed to read or change.' },
      { title: 'Transport', text: 'How data is protected while it travels between systems.' },
      { title: 'Data scope', text: 'Only the data the workflow needs, nothing more.' },
      { title: 'Logging', text: 'What is recorded, and what must never be.' },
      { title: 'Retry', text: 'Trying again without duplicating payments or orders.' },
      { title: 'Auditability', text: 'Being able to show what happened, and when.' },
    ] satisfies Item[],
    link: 'How we approach security',
  },

  failure: {
    eyebrow: 'Failure handling',
    title: 'Plan for the failure path, not only the happy path.',
    lead: 'Integrations fail in ordinary ways: a provider is down, a message arrives twice, a response never comes. The design decides what happens next.',
    label: 'Questions on the failure path',
    flow: [
      'External system unavailable',
      'What happens to the transaction?',
      'Retry?',
      'Queue?',
      'Manual review?',
      'Reconciliation?',
    ],
    observability: {
      title: 'Know when something is wrong.',
      lead: 'Integration design should also decide:',
      items: [
        'What is logged',
        'Which failures someone must act on',
        'Who gets alerted',
        'How reconciliation is performed',
      ],
    },
  },

  pricing: {
    text: 'Integrations are one of the factors that shape implementation scope.',
    link: 'See what affects pricing',
  },

  midCta: {
    eyebrow: 'Integration discovery',
    title: 'Have systems that need to work together?',
    text: 'Tell us what you use today. We map it with you before anything is built.',
    whatsapp: 'Discuss Your Integrations',
  },

  faq: {
    title: 'Integration questions, answered honestly.',
    lead: 'What business owners and IT teams ask first. Specific systems are always reviewed with you.',
    items: [
      {
        q: 'Can mlmsoft connect to our current systems?',
        a: 'That depends on each system and what it allows. We review the systems you use, the data that needs to move and the technical access available, then agree on the approach with you before anything is built.',
      },
      {
        q: 'Do you already have integrations with specific providers?',
        a: 'Integration availability depends on the provider and project requirements. We review the systems you already use, the technical access available, and the workflow that needs to be supported before confirming the integration approach.',
      },
      {
        q: 'What if our system has no API?',
        a: 'Then other approaches are considered: a scheduled file exchange, manual import and export, or changes made by the system’s owner. Some steps can also stay manual where that is acceptable for the workflow.',
      },
      {
        q: 'Can integration use CSV or import/export instead?',
        a: 'Sometimes, yes. Exchanging files can be enough when timing is not critical. Whether it fits depends on the workflow, the amount of data and who checks the result.',
      },
      {
        q: 'Who issues the API credentials?',
        a: 'Usually the owner of the external account: your business or the provider. Credentials are exchanged through a secure process agreed during implementation, never through a public form or a chat message.',
      },
      {
        q: 'Do you need sandbox access?',
        a: 'A test or sandbox environment makes it possible to try an integration without real transactions. Whether one exists depends on the provider; it is clarified during discovery.',
      },
      {
        q: 'How long does an integration take?',
        a: 'There is no fixed duration. It depends on the quality of the API, sandbox availability, provider approval, how complex the workflow is, data mapping, testing and other external dependencies.',
      },
      {
        q: 'What affects integration cost?',
        a: 'The number of systems, how much data moves and how often, what the other system exposes, the failure handling and reconciliation needed, and how much testing the workflow requires.',
      },
      {
        q: 'What happens if the external provider changes its API?',
        a: 'Changes on the provider’s side can require changes on ours. How such changes are noticed, tested and handled is part of the support arrangement agreed with you.',
      },
      {
        q: 'Can an existing internal system be integrated?',
        a: 'Often it can, when its owner can provide access, documentation and someone to answer questions. It is assessed the same way as any other system.',
      },
    ] satisfies FaqItem[],
  },

  finalCta: {
    title: 'Map your systems before anything is built.',
    text: 'Tell us which systems run your business today. We start with the data flow and agree the approach with you.',
    whatsapp: 'Discuss Your Integrations',
    demo: 'Book a Demo',
  },

  form: {
    title: 'Request an Integration Consultation',
    text: 'Tell us which systems need to work together. A few details are enough to start.',
  },
}

export default integrations
