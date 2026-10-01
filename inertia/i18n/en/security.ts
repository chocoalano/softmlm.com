/**
 * /security: the Security & Trust page (docs/security-marketing.md). It
 * explains how security requirements are clarified before implementation.
 * Controls named as existing come only from shared/security.ts, which is
 * checked against docs/security-evidence.md; everything else is a question
 * or a principle, never a claim about a customer platform.
 */
export default {
  hero: {
    eyebrow: 'Security & Trust',
    title: 'Security requirements should be clear',
    highlight: 'before implementation.',
    lead: 'Access, data, integrations, logging and infrastructure all create different security decisions. We discuss those requirements early so they are part of the system design, not an afterthought.',
    cta: 'Discuss Security Requirements',
    secondary: 'Request a Consultation',
  },

  model: {
    caption: 'Security model concept',
    centre: 'Security model',
    centreText: 'Agreed per implementation',
    nodes: {
      identity: { label: 'Identity', text: 'Who someone is' },
      access: { label: 'Access', text: 'What each role may do' },
      data: { label: 'Data', text: 'What is sensitive' },
      integrations: { label: 'Integrations', text: 'What leaves the system' },
      operations: { label: 'Operations', text: 'How it runs and recovers' },
    },
    description:
      'A concept of the areas a security model connects: identity (who someone is), access (what each role may do), data (what is sensitive), integrations (what leaves the system) and operations (how the system runs and recovers). The model is agreed per implementation.',
  },

  scope: {
    eyebrow: 'Security starts with scope',
    title: 'Security depends on more than the application.',
    lead: 'A system is only as protected as the way it is built, deployed, connected and used. Each area has an owner, and we make that ownership explicit before the work starts.',
    ownerLabel: 'Responsibility',
    items: [
      {
        title: 'Application',
        text: 'Roles, validation, session handling and the workflows of the system itself.',
        owner: 'mlmsoft, within the agreed scope',
      },
      {
        title: 'Infrastructure',
        text: 'Hosting, network, database, backups and monitoring.',
        owner: 'Agreed in the deployment architecture',
      },
      {
        title: 'User access',
        text: 'Who receives an account, with which role, and when it is removed.',
        owner: 'Your administrators, using the roles that are agreed',
      },
      {
        title: 'Your processes',
        text: 'Approvals, segregation of duties and how exceptions are handled.',
        owner: 'Your team, with our input during discovery',
      },
      {
        title: 'Third-party integrations',
        text: 'Payment, banking, logistics and other providers the system exchanges data with.',
        owner: 'Shared with each provider',
      },
      {
        title: 'Operational practices',
        text: 'Releases, incident handling, access reviews and changes over time.',
        owner: 'Agreed between both teams',
      },
    ],
  },

  access: {
    eyebrow: 'Access & identity',
    title: 'Every role should see what it needs, and nothing more.',
    lead: 'Access is designed around your teams, not around a default template. These are the questions we work through.',
    questions: [
      'Who needs access: head office, finance, operations, stockists, members?',
      'What should each role be able to see?',
      'Which actions need an additional control or a second approval?',
      'How are accounts created, changed and removed when people change roles or leave?',
      'Is single sign-on with your identity provider required?',
    ],
    sso: {
      title: 'Single sign-on',
      text: 'SSO requirements can be assessed during technical discovery. It should not be assumed to be available until the selected identity provider and implementation scope are confirmed.',
    },
  },

  data: {
    eyebrow: 'Data protection',
    title: 'Not every team needs access to every piece of data.',
    lead: 'Member records, orders and payouts mean personal and financial data. Deciding who can see, change and export it is part of the design.',
    items: [
      {
        title: 'Classification',
        text: 'Which data is personal, which is financial, and which is sensitive to your business.',
      },
      {
        title: 'Minimum necessary access',
        text: 'Each team sees the data its work requires, not the whole database.',
      },
      {
        title: 'Ownership',
        text: 'Who is responsible for each kind of data, and who may correct it.',
      },
      {
        title: 'Retention',
        text: 'How long each kind of data is kept, and what happens after that.',
      },
      {
        title: 'Export',
        text: 'Who may export data, in which format, and how exports are handled.',
      },
      {
        title: 'Personal and financial data',
        text: 'Identity documents, bank details and payout history get the strictest rules.',
      },
    ],
    financial: {
      title: 'Financial workflows need more than access control.',
      lead: 'Commissions, wallets, payouts and tax touch money. Whatever the final scope, we design these workflows around four principles.',
      principles: [
        {
          title: 'Clear authority',
          text: 'It is agreed who may adjust, approve or release an amount, and who may not.',
        },
        {
          title: 'Traceability',
          text: 'Every change to an amount can be traced to a person, a time and a reason.',
        },
        {
          title: 'Validation',
          text: 'Amounts are checked against the agreed rules before they are approved.',
        },
        {
          title: 'Reconciliation',
          text: 'Totals can be matched against payments, bank records and finance reports.',
        },
      ],
      note: 'These are design principles for scoping your platform, not a description of an existing commission or payout engine.',
    },
  },

  integrations: {
    eyebrow: 'Integrations',
    title: 'Every connection to another system is a security decision.',
    lead: 'An integration moves data out of one system and into another. Each one is scoped with these questions.',
    items: [
      {
        title: 'Credentials',
        text: 'Where keys and secrets are stored, and who can see or rotate them.',
      },
      {
        title: 'Authentication',
        text: 'How each system proves who it is before data is exchanged.',
      },
      {
        title: 'Data scope',
        text: 'Only the data the other system needs, and nothing more.',
      },
      {
        title: 'Callback verification',
        text: 'How a message from a provider is confirmed to be genuine before it is acted on.',
      },
      {
        title: 'Retry without duplicates',
        text: 'How a failed call is retried without creating a second payment or order.',
      },
      {
        title: 'Vendor access',
        text: 'What an outside provider or contractor may access, and for how long.',
      },
    ],
    link: 'How we approach integrations',
  },

  audit: {
    eyebrow: 'Audit & traceability',
    title: 'Changes that affect business-critical data should have a clear history.',
    lead: 'Who changed what, and when. We separate what is in place in our own systems today from what your platform needs.',
    today: {
      title: "In mlmsoft's own back office today",
      text: "Changes to a lead's status and the notes added to it are recorded with the staff member and the time. This is our internal lead management, not a customer platform.",
    },
    platform: {
      title: 'Agreed for your platform',
      text: 'Which changes need a history is part of the scope. Typical candidates:',
      items: [
        'Commission and bonus adjustments',
        'Wallet corrections and payout approvals',
        'Changes to compensation rules',
        'Role and permission changes',
        'Changes to member and network data',
      ],
    },
  },

  infrastructure: {
    eyebrow: 'Infrastructure & operations',
    title: 'Infrastructure controls are confirmed as part of the deployment architecture.',
    lead: 'Where and how the system runs is decided per implementation. These topics are agreed in writing before production, not assumed.',
    items: [
      { title: 'HTTPS', text: 'Encrypted connections between browsers, apps and the system.' },
      {
        title: 'Database',
        text: 'Where the database runs, who can reach it and how access is granted.',
      },
      {
        title: 'Backup',
        text: 'How often data is backed up, where copies are kept and how a restore is tested.',
      },
      {
        title: 'Monitoring',
        text: 'Which problems raise an alert, and who receives it.',
      },
      {
        title: 'Environment separation',
        text: 'Development, testing and production kept apart, with their own data and access.',
      },
      {
        title: 'Secrets',
        text: 'How keys and passwords are stored outside the code, and who manages them.',
      },
      {
        title: 'Deployment',
        text: 'How changes reach production, and who approves them.',
      },
    ],
  },

  discovery: {
    eyebrow: 'What we verify during discovery',
    title: 'Questions we clarify before implementation.',
    lead: 'The answers shape roles, workflows, integrations and the deployment plan. Open questions are normal at this stage.',
    items: [
      { area: 'Access', question: 'Who needs access?' },
      { area: 'Data', question: 'What data is sensitive?' },
      { area: 'Integration', question: 'Which external systems receive data?' },
      { area: 'Financial controls', question: 'Which actions need approval?' },
      { area: 'Audit', question: 'What needs historical traceability?' },
      { area: 'Infrastructure', question: 'Where and how is the system deployed?' },
      { area: 'Recovery', question: 'What recovery expectations exist?' },
    ],
    compliance:
      'If your organisation has regulatory or compliance requirements, include them during discovery.',
  },

  checklist: {
    eyebrow: 'Before the first conversation',
    title: 'What do you already know?',
    lead: 'Tick what your team can already answer. Nothing is scored, saved or sent.',
    label: 'Our team already knows',
    items: [
      'We know which teams need access.',
      'We know which data is sensitive.',
      'We know which integrations exchange sensitive data.',
      'We know who approves financial actions.',
      'We have backup and recovery requirements.',
      'We have security or compliance requirements.',
    ],
    result: 'These are useful inputs for a technical discovery discussion.',
    resultEmpty: 'Unanswered questions are fine: clarifying them is what discovery is for.',
  },

  midCta: {
    eyebrow: 'Talk it through',
    title: 'Bring your security questions to the first conversation.',
    text: 'Tell us about your teams, your data and the systems you use. We will go through the requirements with you, before anything is built.',
    whatsapp: 'Discuss Security Requirements',
  },

  verified: {
    eyebrow: 'Transparency',
    title: 'What we can verify today',
    lead: 'Controls that are in place and tested in our own systems.',
    caption:
      'These controls apply to the current mlmsoft marketing and internal lead-management application. Customer platform controls are defined by implementation scope.',
  },

  faq: {
    title: 'Security questions',
    lead: 'Straight answers, including what is not decided yet.',
    items: [
      {
        q: 'How do you approach security during implementation?',
        a: 'Security is part of discovery and solution design, not a step after launch. We clarify who needs access, which data is sensitive, which systems exchange data, which financial actions need approval, what must be traceable, how the system is deployed and what recovery is expected. The answers become part of the scope.',
      },
      {
        q: 'Is customer data encrypted?',
        a: 'Transport and storage controls depend on the final deployment architecture. Security requirements, including TLS and storage protection, are reviewed before production deployment. Separately, staff passwords in our own back office are stored as salted one-way hashes; hashing is not the same as encryption.',
      },
      {
        q: 'Does mlmsoft support role-based access?',
        a: 'Our own back office uses roles today: each staff member sees only the areas their role allows, and every action is checked on the server. For your platform, the roles and what each one may see or change are defined during discovery for your teams, not taken from a template.',
      },
      {
        q: 'Is SSO available?',
        a: 'SSO requirements can be assessed during technical discovery. It should not be assumed to be available until the selected identity provider and implementation scope are confirmed.',
      },
      {
        q: 'How are integrations secured?',
        a: 'Each integration gets its own decisions: how the systems authenticate, where credentials are stored and who can see them, which data is shared, how messages from a provider are verified, and how failures are retried without duplicate effects. Vendor access is agreed as well.',
      },
      {
        q: 'How are backups handled?',
        a: 'Backup and recovery requirements are defined as part of the production infrastructure plan. They should be tested before the system is considered production-ready.',
      },
      {
        q: 'Is there an audit log?',
        a: "In our own back office, changes to a lead's status and the notes added to it are recorded with the staff member and the time. For your platform, which changes need a history, such as commission adjustments, payout approvals or role changes, is agreed during discovery and built into the scope.",
      },
      {
        q: 'Where is data hosted?',
        a: 'Hosting is decided per implementation, as part of the deployment architecture: the environment, the location, who operates it and who has access. If your organisation has data-location requirements, include them during discovery.',
      },
      {
        q: 'Can security requirements be customised?',
        a: 'Yes. Access rules, approval steps for financial actions, retention, audit history and deployment constraints are discussed per project and become part of the scope, the quote and the timeline.',
      },
      {
        q: 'Do you have security certifications?',
        a: 'Not at this time. mlmsoft does not hold a security certification such as ISO 27001 or SOC 2, and we do not claim one. If your organisation has regulatory or compliance requirements, include them during discovery so they are part of the plan.',
      },
    ],
  },

  finalCta: {
    title: 'Make security part of the plan from day one.',
    text: 'Discuss your access, data, integration and deployment requirements with the team before implementation starts.',
    whatsapp: 'Discuss Security Requirements',
    demo: 'Book a Demo',
  },

  form: {
    title: 'Tell us what your security requirements are.',
    text: 'Share what matters to your organisation. The team will get back to you to go through access, data, integrations and deployment.',
  },
}
