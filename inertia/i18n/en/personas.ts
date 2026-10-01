/**
 * Copy area: personas. /who-we-serve and the five role pages
 * (/who-we-serve/executives, finance, operations, it-teams, distributors).
 *
 * Every statement is a business problem, a question, or how we approach the
 * work. Nothing describes a capability as available today; interface
 * concepts carry a caption saying so. Icons, links and the order of the
 * teams each role connects to live in content/personas.ts, in the same
 * order as the lists here. Role names come from `common.roles`.
 */
import type { PersonaKey } from '@shared/personas'
import type { FaqItem } from '~/content/faq'

type Step = { title: string; text: string }

/**
 * The copy of one role page. Every role has the same shape, so the page
 * components read any role the same way.
 */
export type PersonaCopy = {
  card: { problem: string; outcome: string }
  hero: {
    eyebrow: string
    /** The plain part of the headline; `highlight` follows it in brand colour. */
    title: string
    highlight: string
    lead: string
    ctaLabel: string
    /** Three questions shown as speech bubbles next to the headline. */
    concerns: [string, string, string]
  }
  matters: { title: string; lead: string; items: Step[] }
  problems: {
    eyebrow: string
    title: string
    lead: string
    /** `tag` is shown for the finance questions; for distributors `text` names the area that answers the message. */
    items: (Step & { tag?: string })[]
  }
  approach: { eyebrow: string; title: string; lead: string; steps: Step[]; note?: string }
  areas: {
    title: string
    lead: string
    items: (Step & { linkLabel?: string })[]
    related?: string[]
  }
  concept: { eyebrow: string; title: string; lead: string; caption: string }
  questions: { title: string; lead: string; items: string[] }
  /** One sentence per connected team, in the order of `connections` in content/personas.ts. */
  connections: { title: string; lead: string; items: string[] }
  cta: { title: string; text: string; label: string }
  faqTitle: string
  faqs: FaqItem[]
  demo: { title: string; text: string }
}

const roles: Record<PersonaKey, PersonaCopy> = {
  executives: {
    card: {
      problem: 'Numbers arrive late, and from too many places.',
      outcome: 'See where the business is growing and where attention is needed.',
    },
    hero: {
      eyebrow: 'For Owners & Executives',
      title: 'See the business',
      highlight: 'behind the network.',
      lead: 'Growth is more than adding members. Owners need visibility into sales, network activity, compensation requirements and operational risk before making the next decision.',
      ctaLabel: 'Discuss your business',
      concerns: [
        'Where is growth really coming from?',
        'Which part of the network needs attention?',
        'What would a plan change cost us?',
      ],
    },
    matters: {
      title: 'What matters when you run the business.',
      lead: "Owners rarely need more reports. They need the right context at the right time, so decisions don't wait for month-end.",
      items: [
        {
          title: 'Better business visibility',
          text: 'Sales, members and network activity seen together, not assembled from separate exports.',
        },
        {
          title: 'Clearer decision context',
          text: 'Know what sits behind a number before you act on it.',
        },
        {
          title: 'Structured compensation planning',
          text: 'Understand what the plan costs today and what a change would do to it.',
        },
        {
          title: 'More controlled operations',
          text: 'Fewer manual workarounds between teams as the network grows.',
        },
        {
          title: 'Easier growth planning',
          text: 'Plan new regions, products or campaigns from a clearer picture of today.',
        },
      ],
    },
    problems: {
      eyebrow: 'Sound familiar?',
      title: 'Problems owners recognise.',
      lead: "If one of these sounds familiar, it's a good place to start the conversation.",
      items: [
        {
          title: 'Our data lives in too many places.',
          text: 'Sales, member data and operational reports are often kept apart, so every question needs someone to pull them together.',
        },
        {
          title: 'I only know there is a problem after month-end.',
          text: 'Business owners need information earlier, not only after manual reconciliation.',
        },
        {
          title: 'The network is growing, but operations are getting harder.',
          text: 'Growth can create more manual work when the processes underneath are fragmented.',
        },
        {
          title: 'Changing the compensation plan becomes a technical project.',
          text: 'Business rules should be understood before they become software rules.',
        },
      ],
    },
    approach: {
      eyebrow: 'Business first. Software second.',
      title: 'We start with how your business works.',
      lead: 'Many software conversations start with packages and features. Ours start with your business model: how you sell, how the network grows and how people are paid.',
      steps: [
        { title: 'Business model', text: 'How you sell, and to whom.' },
        { title: 'Network & sales', text: 'How members join, buy and build teams.' },
        { title: 'Compensation plan', text: 'Bonuses, ranks and qualifications, rule by rule.' },
        { title: 'Operations', text: 'Who does what today, and where it gets manual.' },
        { title: 'Reporting needs', text: 'The numbers you use to run the company.' },
        { title: 'Implementation plan', text: 'What comes first, and what can follow.' },
      ],
    },
    areas: {
      title: 'Where owners usually start.',
      lead: 'Begin wherever your biggest question is. Each area is scoped around your business.',
      items: [
        {
          title: 'Business overview',
          text: 'How sales, members and payouts could come together in one view.',
          linkLabel: 'See the concept',
        },
        {
          title: 'Compensation plans',
          text: 'How your bonuses, ranks and qualifications are mapped with you.',
          linkLabel: 'Explore compensation',
        },
        {
          title: 'Network structure',
          text: 'Seeing the sales and ranks behind each branch of the network.',
          linkLabel: 'See the network preview',
        },
        {
          title: 'Scope and pricing',
          text: 'What shapes the size of an implementation for a business like yours.',
          linkLabel: 'Estimate your needs',
        },
      ],
    },
    concept: {
      eyebrow: 'Interface concept',
      title: 'One view of the business, built around your numbers.',
      lead: 'An example of what an owner overview could bring together. The metrics on your screen would follow your business model and the reports you use today.',
      caption: 'Executive interface concept · sample data',
    },
    questions: {
      title: 'Questions owners bring to the first conversation.',
      lead: 'Ask any of them. We would rather answer early than after a contract is signed.',
      items: [
        'Can the system follow our compensation plan as it works today?',
        'What would change for our distributors, and how do we explain it to them?',
        'How long would implementation take for a business of our size?',
        'What do we need to prepare on our side?',
        'How do we move away from our current system without disrupting members?',
      ],
    },
    connections: {
      title: 'Your decisions reach every team.',
      lead: 'A change at the top shows up in finance, in operations and in what distributors see.',
      items: [
        'A new bonus rule changes what finance has to reconcile and pay.',
        'A new product or promotion changes how orders and members are handled.',
        'Every plan change needs to make sense to the people who sell.',
      ],
    },
    cta: {
      title: 'Your business model is probably more complex than a feature list.',
      text: "Tell us how your sales, network and compensation plan work. We'll start from the business model first.",
      label: 'Consult via WhatsApp',
    },
    faqTitle: 'Answers for owners.',
    faqs: [
      {
        q: 'Do we need to know exactly what we want before contacting you?',
        a: 'No. Most owners start by describing how the business works and where it hurts. Mapping the details is part of the work we do together.',
      },
      {
        q: 'Can you work with the compensation plan we already have?',
        a: 'That is where we start. We map your bonuses, ranks and qualifications rule by rule with your team before anything is built.',
      },
      {
        q: 'Is there a ready-made package we can choose?',
        a: 'Not at the moment. Scope depends on your network size, plan, modules, integrations and migration, so our team prepares a proposal around your needs.',
      },
      {
        q: 'Who should join the first conversation?',
        a: 'Usually the owner or a director, plus whoever knows the compensation plan best. Finance and IT can join once the scope is clearer.',
      },
    ],
    demo: {
      title: "Let's talk about your business model.",
      text: 'Tell us how your business works today. Our team will help you see what a more connected operating model could look like.',
    },
  },

  finance: {
    card: {
      problem: 'A single payout question can take days to answer.',
      outcome: 'Bring more clarity to commissions, payouts, tax and reconciliation requirements.',
    },
    hero: {
      eyebrow: 'For Finance Teams',
      title: 'Make every payout',
      highlight: 'easier to explain.',
      lead: 'Commission structures, wallet balances, tax requirements and adjustments can become difficult to reconcile when the underlying rules are scattered across systems.',
      ctaLabel: 'Discuss finance requirements',
      concerns: [
        'How did this amount get calculated?',
        'What is ready to pay this week?',
        'Which tax applies to this bonus?',
      ],
    },
    matters: {
      title: 'What matters to finance.',
      lead: 'Every amount should be traceable, every correction recorded and every payout approved on purpose.',
      items: [
        {
          title: 'Traceable amounts',
          text: 'Each commission linked back to the order and the rule behind it.',
        },
        {
          title: 'Controlled payouts',
          text: 'Clear steps from calculated, to approved, to paid.',
        },
        {
          title: 'Recorded corrections',
          text: 'Refunds and adjustments that leave a trail instead of silent edits.',
        },
        {
          title: 'Tax context',
          text: 'Withholding recorded per member and period, as your tax advisor specifies.',
        },
        {
          title: 'Reconciliation',
          text: 'Numbers that agree between commissions, wallets and your books.',
        },
      ],
    },
    problems: {
      eyebrow: 'Every period',
      title: 'The questions finance hears again and again.',
      lead: 'These are business questions every finance team needs answered. We use them to map your requirements before anything is built.',
      items: [
        {
          tag: 'Commission reconciliation',
          title: 'How did this amount get calculated?',
          text: 'When a distributor disputes a bonus, the answer should not mean rebuilding the calculation by hand.',
        },
        {
          tag: 'Adjustment & correction',
          title: 'What happens when an order changes?',
          text: 'Returns and cancellations after a bonus period can change amounts that were already calculated.',
        },
        {
          tag: 'Payout',
          title: 'What is pending, approved or ready to pay?',
          text: 'Approvals, holds and transfers need a status everyone agrees on.',
        },
        {
          tag: 'Tax',
          title: 'What tax treatment applies to this transaction?',
          text: 'Bonuses and rewards can be treated differently, and your advisor needs records per member and period.',
        },
        {
          tag: 'Audit',
          title: 'Can we trace the reason behind an amount?',
          text: 'Auditors and management want to see why an amount exists, not only that it does.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'We map the financial flow before implementation.',
      lead: 'Before a rule becomes software, we follow one amount with your finance team: from the transaction that creates it to the reconciliation that closes it.',
      steps: [
        { title: 'Transaction', text: 'An order is paid, returned or changed.' },
        { title: 'Business rule', text: 'Which plan rules apply to it.' },
        { title: 'Commission requirement', text: 'Who qualifies, and for how much.' },
        { title: 'Tax requirement', text: 'The withholding your advisor specifies.' },
        { title: 'Approval', text: 'Who reviews and signs off, in which order.' },
        { title: 'Payout', text: 'How and when members are paid.' },
        { title: 'Reconciliation', text: 'Commissions, wallets and your books in agreement.' },
      ],
      note: 'This is how we structure the design conversation. Which steps are automated in your implementation is agreed during discovery.',
    },
    areas: {
      title: 'Where finance topics are covered.',
      lead: 'The compensation pages go deeper into how amounts are designed to be traced and corrected.',
      items: [
        {
          title: 'Compensation plans',
          text: 'How bonuses, qualifications and ranks are mapped rule by rule.',
          linkLabel: 'Explore compensation',
        },
        {
          title: 'Audit & reversal',
          text: 'How refunds and corrections are designed to leave a trail.',
          linkLabel: 'See the reversal design',
        },
        {
          title: 'Wallet & tax',
          text: 'From bonus to wallet, with withholding recorded per member and period.',
          linkLabel: 'See wallet & tax',
        },
        {
          title: 'Balances & payouts',
          text: 'How balances, holds and payout steps are designed.',
          linkLabel: 'See the wallet concept',
        },
      ],
    },
    concept: {
      eyebrow: 'Workflow concept',
      title: 'A payout period, from review to reconciliation.',
      lead: 'An example of how a finance team could work through a period: commissions to check, a correction to approve, tax context and what still needs to reconcile.',
      caption: 'Finance workflow concept · sample data',
    },
    questions: {
      title: 'What finance teams want answered before they commit.',
      lead: 'Bring them to the first conversation. They shape the design more than any feature list.',
      items: [
        'How will a commission be traced back to its order and rule?',
        'What happens to a paid bonus when the order is returned later?',
        'Who approves a payout, and can approvals follow our internal policy?',
        'How will tax withholding be recorded, and who sets the rates?',
        'How will we reconcile with our accounting records?',
      ],
    },
    connections: {
      title: 'Finance sits between every team.',
      lead: 'Most finance questions start somewhere else in the business.',
      items: [
        'Returns and order corrections start in operations and end in finance.',
        'Owners need payout ratio and liability in context, not just totals.',
        'Members trust the plan more when they can see why an amount changed.',
      ],
    },
    cta: {
      title: 'Have a commission or payout flow that is difficult to reconcile?',
      text: "Walk us through how one amount is calculated today, from order to payout. We'll help you see where it becomes hard to explain.",
      label: 'Discuss it via WhatsApp',
    },
    faqTitle: 'Answers for finance teams.',
    faqs: [
      {
        q: 'Do you give tax advice?',
        a: 'No. Your tax advisor stays in control of rates and treatment. We make sure the design records what they need, per member and period.',
      },
      {
        q: 'Can finance approve payouts before they are paid?',
        a: 'Approval steps are part of the design conversation. We map who reviews what, and in which order, based on your internal policy.',
      },
      {
        q: 'What happens to our historical commission data?',
        a: 'What can be migrated, and how it is checked against your current records, is assessed during discovery.',
      },
      {
        q: 'How would data reach our accounting system?',
        a: 'Tell us which accounting system you use. How and when data should reach it is scoped with your finance and IT teams.',
      },
    ],
    demo: {
      title: "Let's map your financial flow together.",
      text: "Tell us how commissions, payouts and tax work in your business today. We'll start from one amount and follow it through.",
    },
  },

  operations: {
    card: {
      problem: 'Your team jumps between systems to answer one question.',
      outcome: 'Reduce the operational complexity behind members, orders and network activity.',
    },
    hero: {
      eyebrow: 'For Operations',
      title: 'Less manual coordination.',
      highlight: 'More operational clarity.',
      lead: 'Member onboarding, orders, network changes and support requests become harder to manage as the business grows.',
      ctaLabel: 'Discuss your operations',
      concerns: [
        'Who is still waiting for verification?',
        "Why didn't this order count?",
        "Who is this member's sponsor?",
      ],
    },
    matters: {
      title: 'What matters to operations.',
      lead: 'Operations keeps the business running every day. The team needs fewer handoffs, clearer status and one place to understand a member.',
      items: [
        {
          title: 'One view of a member',
          text: 'Profile, status, sponsor, orders and notes, without switching tools.',
        },
        {
          title: 'Clear status',
          text: 'Everyone knows what is pending, approved or blocked.',
        },
        {
          title: 'Fewer handoffs',
          text: "Corrections that don't need three departments to agree over chat.",
        },
        {
          title: 'Predictable onboarding',
          text: 'The same clear steps for every new member.',
        },
        {
          title: 'Room to grow',
          text: 'Processes that still work when the network doubles.',
        },
      ],
    },
    problems: {
      eyebrow: 'Day to day',
      title: 'Where the manual work usually hides.',
      lead: 'Five situations that make daily operations harder than they need to be.',
      items: [
        {
          title: 'Member onboarding requires too many manual steps.',
          text: 'Checking documents, placing members and activating accounts often happens across chat, spreadsheets and admin screens.',
        },
        {
          title: 'The support team jumps between systems.',
          text: 'One question from a distributor can mean looking in three different places.',
        },
        {
          title: 'Order status is hard to connect to member activity.',
          text: 'Did the order count for this period? The answer often depends on who you ask.',
        },
        {
          title: 'Rank and network questions take up admin time.',
          text: 'Explaining placements, sponsors and qualifications by hand takes hours every week.',
        },
        {
          title: 'Corrections need several departments.',
          text: 'A wrong placement or a returned order can involve operations, finance and IT at once.',
        },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Design the workflow before automating it.',
      lead: 'Automating a messy process only makes it faster to get wrong. We map how work actually moves through your team first, then decide what the system should take over.',
      steps: [
        { title: 'Member', text: 'Someone joins or updates their details.' },
        { title: 'Verification', text: 'The checks your business requires.' },
        { title: 'Transaction', text: 'Orders, returns and payments.' },
        { title: 'Network context', text: 'Sponsor, placement and team.' },
        { title: 'Business rule', text: 'What your plan says should happen.' },
        { title: 'Operational action', text: 'What your team does next, and who does it.' },
      ],
    },
    areas: {
      title: 'Where operations topics are covered.',
      lead: 'Each area is mapped to how your team works today.',
      items: [
        {
          title: 'Member management',
          text: 'Profiles, verification, sponsors and rank history.',
          linkLabel: 'See member management',
        },
        {
          title: 'Orders & ecommerce',
          text: 'How orders connect to members and to your plan.',
          linkLabel: 'See ecommerce',
        },
        {
          title: 'Network structure',
          text: 'Finding members and understanding placements.',
          linkLabel: 'See the network preview',
        },
        {
          title: 'Implementation',
          text: 'How workflows are mapped, tested and rolled out.',
          linkLabel: 'See how we implement',
        },
      ],
    },
    concept: {
      eyebrow: 'Interface concept',
      title: 'Everything about a member, in one place.',
      lead: 'An example of a member view for operations and support: status, network context, recent activity and notes from the team.',
      caption: 'Operations interface concept · sample data',
    },
    questions: {
      title: 'What operations teams want to know first.',
      lead: "Bring the ones that cost your team the most time. That's where we start.",
      items: [
        'Which onboarding steps can be simplified or combined?',
        "How will support see a member's orders and network in one place?",
        'Who can correct a placement, and how is it recorded?',
        'How are returns handled when a bonus period has already closed?',
        'What does our team need to learn before launch?',
      ],
    },
    connections: {
      title: "Operations is where every team's work meets.",
      lead: 'What happens in operations rarely stays in operations.',
      items: [
        'Every return or correction operations handles reaches the payout.',
        'Faster, clearer answers from support mean fewer frustrated members.',
        'Logistics and payment integrations shape daily operational work.',
      ],
    },
    cta: {
      title: 'Is your team coordinating more than it should?',
      text: "Tell us where the manual work sits today: onboarding, orders, network changes or support. We'll look at the workflow before any automation.",
      label: 'Discuss your operations',
    },
    faqTitle: 'Answers for operations teams.',
    faqs: [
      {
        q: 'Will our team need training?',
        a: 'Yes. Training for the teams that use the system every day is part of implementation, and its scope is agreed with you.',
      },
      {
        q: 'Can we keep some of our current processes?',
        a: "Often, yes. The goal is not to change everything, but to remove the steps that don't need to be manual.",
      },
      {
        q: 'What happens to member data from our current system?',
        a: 'Members and genealogy usually come first. What can be migrated, and how it is checked, is assessed during discovery.',
      },
      {
        q: 'Can support and operations have different access?',
        a: 'Who can see and change what is defined per role during design, based on how your teams work.',
      },
    ],
    demo: {
      title: "Let's look at your daily operations.",
      text: 'Tell us how members, orders and support requests move through your team today.',
    },
  },

  it: {
    card: {
      problem: 'Technical surprises appear after development has started.',
      outcome:
        'Plan integrations, access controls and technical requirements before implementation.',
    },
    hero: {
      eyebrow: 'For Technology Teams',
      title: 'Make the technical requirements clear',
      highlight: 'before implementation.',
      lead: 'Integrations, access controls, data migration and infrastructure decisions need to be understood early, not discovered after development begins.',
      ctaLabel: 'Talk to our team',
      concerns: [
        'Which systems need to exchange data?',
        'Who can see and change what?',
        'How clean is the data we have today?',
      ],
    },
    matters: {
      title: 'What matters to technology teams.',
      lead: 'Straight answers: what exists, what has to be built, what connects to what, and who operates it.',
      items: [
        {
          title: 'Clear scope',
          text: 'What is configured, what is built and what is integrated, in writing.',
        },
        {
          title: 'Known integrations',
          text: 'Every external system listed with the data it exchanges.',
        },
        {
          title: 'Defined access',
          text: 'Roles and permissions agreed before accounts are created.',
        },
        {
          title: 'Planned migration',
          text: 'Data assessed and checked before it moves.',
        },
        {
          title: 'Operating requirements',
          text: 'Hosting, monitoring and backup responsibilities agreed early.',
        },
      ],
    },
    problems: {
      eyebrow: 'Technical discovery',
      title: 'What we evaluate with your IT team.',
      lead: 'We work through these questions together. The answers shape the implementation plan, so we ask them early.',
      items: [
        { title: 'Integration requirements', text: 'What external systems need to exchange data?' },
        { title: 'Authentication', text: 'Who needs access, and at what level?' },
        { title: 'Data migration', text: 'What data exists today, and how clean is it?' },
        { title: 'Permissions', text: 'Which teams should see or change which information?' },
        {
          title: 'Infrastructure',
          text: 'What scale and operating requirements need to be planned?',
        },
        { title: 'Auditability', text: 'Which changes need historical traceability?' },
      ],
    },
    approach: {
      eyebrow: 'How we work',
      title: 'Requirements first, then architecture.',
      lead: 'We document your technical landscape before proposing an architecture, so decisions rest on facts rather than assumptions.',
      steps: [
        { title: 'Current landscape', text: 'Systems in use today, and who owns them.' },
        { title: 'Integration map', text: 'Which data moves where, and how often.' },
        { title: 'Access model', text: 'Roles, permissions and approval steps.' },
        { title: 'Data assessment', text: 'What exists, how clean it is, what moves.' },
        { title: 'Operating plan', text: 'Hosting, monitoring and backup responsibilities.' },
        { title: 'Acceptance', text: 'How results are tested against your numbers.' },
      ],
      note: 'We tell you what is in place today and what would need to be built, topic by topic.',
    },
    areas: {
      title: 'Where technical topics are covered.',
      lead: 'Start with the topic your team will be asked about first.',
      items: [
        {
          title: 'Integrations',
          text: 'The tools you use today and how they could connect.',
          linkLabel: 'Explore integration planning',
        },
        {
          title: 'Security questions',
          text: 'The security topics we go through before you commit.',
          linkLabel: 'See security topics',
        },
        {
          title: 'Implementation',
          text: 'Discovery, migration, testing and launch.',
          linkLabel: 'See how we implement',
        },
        {
          title: 'Scope estimate',
          text: 'Share integration and migration needs in a few steps.',
          linkLabel: 'Start the estimate',
        },
      ],
    },
    concept: {
      eyebrow: 'Discovery example',
      title: 'A technical discovery worksheet.',
      lead: 'An example of how technical questions are tracked with your team: each topic, the open question and where the discussion stands.',
      caption: 'Example discovery worksheet · sample answers',
    },
    questions: {
      title: 'What IT teams want answered first.',
      lead: 'We answer them topic by topic, including what is in place today and what is not.',
      items: [
        'Where will the system be hosted, and who operates it?',
        'Which integrations are needed at launch, and which can follow?',
        'How will data from our current system be migrated and verified?',
        'How are staff roles and permissions defined and reviewed?',
        'Which changes need an audit trail, and for how long?',
        'Who is responsible for monitoring and backups?',
      ],
    },
    connections: {
      title: "Technical choices shape every team's work.",
      lead: 'Architecture decisions show up far beyond the IT team.',
      items: [
        'Accounting and payment integrations decide how finance reconciles.',
        'Logistics and messaging integrations change daily operational work.',
        'Hosting and scale decisions affect cost and growth plans.',
      ],
    },
    cta: {
      title: 'Have an existing system or integration landscape?',
      text: 'Discuss the architecture with our team.',
      label: 'Discuss via WhatsApp',
    },
    faqTitle: 'Answers for technology teams.',
    faqs: [
      {
        q: 'Can we review technical documentation before we commit?',
        a: 'Tell us what your team needs to review. What can be shared, and when, is agreed during the technical conversation.',
      },
      {
        q: 'Which sign-in and access options are available?',
        a: 'Access requirements such as roles, approval steps and sign-in methods are part of the technical discussion. We tell you what is in place today and what would need to be built.',
      },
      {
        q: 'Where would the system be hosted?',
        a: 'Hosting and operating responsibilities are agreed during discovery, based on your requirements.',
      },
      {
        q: 'How is a data migration checked?',
        a: 'Migration is planned with reconciliation checks: records and totals from your current system are compared before go-live.',
      },
    ],
    demo: {
      title: "Let's go through your technical landscape.",
      text: "Tell us which systems you run today and what needs to connect. We'll help you shape the requirements.",
    },
  },

  distributors: {
    card: {
      problem: 'Members ask support for answers they could see themselves.',
      outcome: 'Give members a clearer way to understand their activity, network and progress.',
    },
    hero: {
      eyebrow: 'For Distributor Experience',
      title: 'Make progress easier for your members',
      highlight: 'to understand.',
      lead: 'A distributor should not need to ask support every time they want to understand their activity, network or next milestone.',
      ctaLabel: 'Discuss your member experience',
      concerns: [
        'How close am I to Gold?',
        'Why is my bonus different this month?',
        'Where is my referral link?',
      ],
    },
    matters: {
      title: 'What your members want to know.',
      lead: 'Distributors are busy selling and building teams. The experience you give them should answer everyday questions at a glance.',
      items: [
        { title: 'Where they stand', text: 'Their activity and volume for the current period.' },
        { title: 'What comes next', text: 'Their next rank, and exactly what it takes.' },
        { title: 'Why amounts change', text: 'Earnings with enough context to make sense.' },
        { title: 'Their team', text: 'Who joined, who is active and who needs help.' },
        { title: 'Easy sharing', text: 'A referral link that is always within reach.' },
      ],
    },
    problems: {
      eyebrow: 'Your support inbox',
      title: 'The questions your support team hears every day.',
      lead: "Each one is a sign that members can't see something they need. Every answer the experience gives them is one less ticket.",
      items: [
        { title: 'How far am I from my next rank?', text: 'Rank progress' },
        { title: 'Why is my bonus lower this month?', text: 'Earnings' },
        { title: 'Did my last order count for this period?', text: 'Orders' },
        { title: 'Who joined my team this week?', text: 'Network' },
        { title: 'Where can I find my referral link?', text: 'Referral' },
      ],
    },
    approach: {
      eyebrow: 'Our approach',
      title: 'Designed around the moments that matter to members.',
      lead: 'We map the member journey with you, from the first order to the next rank, and decide what a member should see at each step.',
      steps: [
        { title: 'Join', text: 'Registration and a clear first step.' },
        { title: 'First order', text: 'Knowing what counts, and why.' },
        { title: 'Build a team', text: 'Seeing who joined and who is active.' },
        { title: 'Track progress', text: 'Rank requirements, visible at any time.' },
        { title: 'Understand earnings', text: 'Amounts with context, not just totals.' },
        { title: 'Get rewarded', text: 'Points, rewards and recognition.' },
      ],
    },
    areas: {
      title: 'Experience areas we design with you.',
      lead: 'Choose the areas that matter for your members. Each one is scoped with you, not switched on from a template.',
      items: [
        { title: 'My Activity', text: 'Sales, volume and status.' },
        { title: 'Network', text: 'Their team, levels and new members.' },
        { title: 'Rank Progress', text: 'Next rank and what remains.' },
        { title: 'Earnings context', text: 'Bonuses with the reason behind them.' },
        { title: 'Referral', text: 'A personal link to share.' },
        { title: 'Orders', text: 'Order history and status.' },
        { title: 'Rewards', text: 'Points, campaigns and rewards.' },
        { title: 'Profile', text: 'Personal details and verification.' },
      ],
      related: [
        'How rank requirements are designed',
        'Include the member experience in your estimate',
      ],
    },
    concept: {
      eyebrow: 'Sample interface',
      title: 'Progress a member can understand at a glance.',
      lead: 'An example of a member home screen: rank progress, the key numbers and a referral link. The member, amounts and targets are all sample data.',
      caption: 'Sample interface · not actual customer data',
    },
    questions: {
      title: 'Decisions to make about the member experience.',
      lead: 'Your members are the ones who use it, so these decisions are worth making early.',
      items: [
        'What should members see first when they open the app?',
        'How much of the compensation plan should members see?',
        'How do we explain earnings changes without more support work?',
        'Should the experience be a mobile app, a web app or both?',
        'How do we roll it out to existing members?',
      ],
    },
    connections: {
      title: 'What members see depends on every team behind them.',
      lead: 'A clear member experience is built on accurate work elsewhere in the business.',
      items: [
        'Accurate orders and placements from operations.',
        'Earnings members can trust, because finance can explain them.',
        'A better member experience is part of how the network grows.',
      ],
    },
    cta: {
      title: 'What should your members see when they open the app?',
      text: "Tell us how your members sell, recruit and qualify today. We'll help you shape an experience around those moments.",
      label: 'Consult via WhatsApp',
    },
    faqTitle: 'Answers about the member experience.',
    faqs: [
      {
        q: 'Is this a mobile app or a website?',
        a: 'That is decided with you. The format depends on your members, how they sell and what your implementation includes.',
      },
      {
        q: 'Can members see our compensation plan?',
        a: 'You decide how much members see. Rank requirements and progress are usually the most useful place to start.',
      },
      {
        q: 'Can the experience carry our brand?',
        a: 'Branding is part of the design conversation for the member experience, together with the areas members see first.',
      },
      {
        q: 'How do we introduce it to our network?',
        a: 'A clear experience should need very little explanation. How you roll it out to leaders and members is planned together before launch.',
      },
    ],
    demo: {
      title: "Let's shape the experience for your members.",
      text: "Tell us about your distributors and the questions they ask most. We'll help you plan what they should see.",
    },
  },
}

export default {
  /** Labels repeated on every role page. */
  shared: {
    whatMatters: 'What matters',
    relevantAreas: 'Relevant areas',
    yourQuestions: 'Your questions',
    askWhatsapp: 'Ask us on WhatsApp',
    orBookDemo: 'Or book a demo',
    acrossBusiness: 'Across the business',
    seeAllTeams: 'See how every team connects',
    moreFor: (role: string) => `More for ${role}`,
    learnMore: 'Learn more',
    /** Screen-reader continuation of "Learn more". */
    learnMoreAbout: (role: string) => `about ${role}`,
    concernsLabel: 'Questions we often hear',
    inboxTitle: 'Messages to support',
    answeredBy: 'Could be answered by',
    faqLead: 'Straight answers about how we work with your team.',
  },

  /** /who-we-serve */
  landing: {
    hero: {
      eyebrow: 'Built around how your business works',
      title: 'One business. Different teams.',
      highlight: 'One shared view.',
      lead: 'Owners, finance, operations, IT and distributors see the business from different angles. mlmsoft helps you map those needs into one connected operating model.',
      jumpNav: 'Choose your role',
      jumpLabel: 'Jump to your role',
      center: 'One shared view',
    },
    cards: {
      eyebrow: 'Choose your view',
      title: 'Every team sees a different problem.',
      lead: 'Start with the role closest to yours. Each page begins with the problems that role recognises, then shows how we approach them.',
    },
    teamFlow: {
      eyebrow: 'One decision affects more than one team',
      title: "Your teams don't operate in isolation.",
      lead: "A change in one business rule can affect operations, finance and the distributor experience. That's why we begin by understanding the whole workflow.",
      exampleTag: 'Example',
      example: 'One returned order, followed through the business',
      label: 'How one returned order reaches every team',
      /** In the order of `teamFlowPersonas` in content/personas.ts. */
      steps: [
        { title: 'Order', text: "A member's order is returned after the bonus period has closed." },
        { title: 'Operations', text: 'The return is processed and the order is updated.' },
        {
          title: 'Compensation requirement',
          text: 'The bonus earned on that order needs a correction.',
        },
        { title: 'Finance', text: 'The payout and the tax record are adjusted.' },
        {
          title: 'Distributor experience',
          text: 'The member can see why their earnings changed.',
        },
        { title: 'Executive reporting', text: 'The numbers still match what was actually sold.' },
      ],
    },
    businessFirst: {
      eyebrow: 'How we start',
      title: 'Business first. Software second.',
      lead: 'Whichever team contacts us first, the first conversation is about the business, not about modules.',
      topics: [
        'How you sell, and who buys',
        'How the network grows and how people are paid',
        'Where your teams lose time today',
      ],
      cta: 'Tell us how your business works',
      theirsLabel: 'Where many software conversations start',
      theirs: 'Which package do you want?',
      oursLabel: 'Where we start',
      ours: 'How does your business work?',
    },
    faq: {
      title: 'Getting started with your team.',
      lead: 'Who to involve, and when. Most businesses start with one conversation.',
      items: [
        {
          q: 'Which team should contact you first?',
          a: 'Usually the owner or a director. Once the scope is clearer, finance, operations and IT join the conversation for their parts.',
        },
        {
          q: 'Do we have to involve every team from the start?',
          a: 'No. Start with the biggest problem. Other teams join when their part of the workflow is discussed.',
        },
        {
          q: 'Our business is still small. Is that a problem?',
          a: 'Scope follows your business. A smaller network may start with fewer areas and add more as it grows.',
        },
        {
          q: 'What happens after we contact you on WhatsApp?',
          a: 'We start by asking about your business and what you need. If it makes sense, we schedule a demo with the right people from your team.',
        },
      ],
    },
    demo: {
      title: 'Start with the part of the business that hurts most.',
      text: "Tell us which team feels it first. We'll map how it connects to the rest of the business.",
    },
  },

  /** The five role pages, by persona key. */
  personas: roles,

  /** The small abstract illustrations on the /who-we-serve role cards. */
  mini: {
    calculated: 'Calculated',
    approved: 'Approved',
    readyToPay: 'Ready to pay',
    verified: 'Verified',
  },

  /**
   * Text inside the interface concepts. Names, IDs, amounts, counts and
   * percentages are sample data and stay in the components.
   */
  concepts: {
    executive: {
      label: 'Example owner overview with sample data',
      eyebrow: 'Business overview',
      period: 'September 2026',
      ranges: ['Month', 'Quarter', 'Year'],
      kpis: {
        sales: 'Sales',
        activeMembers: 'Active members',
        newMembers: 'New members',
        commission: 'Commission requirement',
      },
      points: 'pts',
      chartTitle: 'Sales trend · last 12 months',
      /** The last 12 months, ending in September. */
      months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      regionsTitle: 'New members by region',
      regions: ['East Java', 'West Java', 'Jakarta', 'Sumatra', 'Other'],
      alertsTitle: 'Needs attention',
      alerts: [
        'Q4 reward budget is 6% above plan',
        '7 leaders in East Java are less active this month',
        'Returns are back within the usual range',
      ],
    },
    finance: {
      label: 'Example payout review with sample data',
      eyebrow: 'Payout period',
      period: 'October 2026 · batch A',
      status: {
        calculated: 'Calculated',
        inReview: 'In review',
        approved: 'Approved',
        readyToPay: 'Ready to pay',
        paid: 'Paid',
        onHold: 'On hold',
      },
      reviewTitle: 'Commission review',
      columns: { member: 'Member', bonus: 'Bonus', amount: 'Amount', status: 'Status' },
      bonuses: {
        generation: 'Generation',
        directReferral: 'Direct referral',
        rank: 'Rank bonus',
        leadership: 'Leadership',
      },
      adjustmentTitle: 'Adjustment',
      adjustmentOrder: 'Order INV-20931 returned',
      originalBonus: 'Original bonus',
      reversalEntry: 'Reversal entry',
      taxTitle: 'Tax context',
      gross: 'Gross commissions',
      withheld: 'Withheld',
      net: 'Net payout',
      taxNote: 'Rates as set by your tax advisor',
      reconciliation: [
        'Orders vs commission base matched',
        'Wallet balances vs ledger matched',
        '3 differences to review',
      ],
    },
    operations: {
      label: 'Example member view for operations with sample data',
      memberMeta: 'Member SM-210304 · joined Mar 2024',
      badges: { active: 'Active', verified: 'Verified' },
      networkTitle: 'Network context',
      sponsor: 'Sponsor',
      placement: 'Placement',
      placementValue: 'Left leg · level 3',
      teamSize: 'Team size',
      teamSizeValue: '186 members',
      region: 'Region',
      activityTitle: 'Recent activity',
      activity: [
        {
          title: 'Order INV-20931 paid',
          meta: 'Rp1.500.000 · counts for the September period',
          time: '2 days ago',
        },
        { title: 'Reached Gold', meta: 'All 3 qualification rules met', time: '1 week ago' },
        {
          title: 'Shipping address updated',
          meta: 'Changed by the member',
          time: '3 weeks ago',
        },
      ],
      noteTitle: 'Support note',
      note: 'Asked when the September bonus is paid. Explained the payout schedule.',
      noteMeta: 'Rina · Customer service · yesterday',
    },
    technical: {
      label: 'Example technical discovery worksheet with sample answers',
      eyebrow: 'Technical discovery',
      title: 'Requirements worksheet',
      topicCount: (count: number) => `${count} topics`,
      columns: { topic: 'Topic', question: 'Question', status: 'Status' },
      topics: {
        integrations: 'Integrations',
        authentication: 'Authentication',
        permissions: 'Permissions',
        migration: 'Data migration',
        infrastructure: 'Infrastructure',
        auditability: 'Auditability',
      },
      /** In the order of the worksheet rows in the component. */
      questions: [
        'Which payment gateway, and which payment flows?',
        'Which records need to reach the accounting system?',
        'Should staff sign in with company accounts?',
        'Who may approve payouts or correct placements?',
        'Is the current genealogy complete and consistent?',
        'Expected members and orders in three years?',
        'Which changes need history, and for how long?',
      ],
      status: {
        agreed: 'Agreed',
        discussing: 'In discussion',
        open: 'Open',
        assessing: 'Assessing',
      },
      summary: { agreed: '2 agreed', inProgress: '3 in progress', open: '2 open' },
    },
    distributor: {
      label: 'Example member app screen with sample data',
      greeting: 'Good morning',
      nextRank: 'Next rank',
      daysLeft: '8 days remaining',
      progress: 'progress',
      salesTarget: 'Sales target',
      directRequirement: 'Direct requirement',
      viewRequirements: 'View requirements',
      tiles: { wallet: 'Wallet', points: 'Points', team: 'Team', orders: 'Orders' },
      referralLabel: 'Your referral link',
      referralLink: 'yourbrand.com/r/ayu',
      tabs: { home: 'Home', team: 'Team', wallet: 'Wallet', rewards: 'Rewards' },
      toastTitle: 'Commission received',
      toastMeta: '+Rp96.000 · generation bonus',
    },
  },
}
