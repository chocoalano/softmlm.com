/**
 * /pricing: hero, needs estimate (also used on the homepage in quick mode),
 * what shapes a quote, implementation steps, FAQ and the demo band.
 *
 * No prices and no commercial policy that has not been decided: where
 * something depends on scope, the copy says so.
 */
export default {
  hero: {
    eyebrow: 'mlmsoft Pricing',
    title: 'Pricing that follows',
    titleAccent: 'your business needs.',
    lead: 'Member count, compensation plan structure, modules, integrations and migration needs all shape the scope of an implementation.',
    whatsapp: 'Discuss pricing via WhatsApp',
    estimate: 'Start the needs estimate',
  },

  estimate: {
    eyebrow: 'Needs estimate',
    title: 'Three steps, about two minutes.',
    lead: 'No price at the end, and no sign-up. Your answers help our team understand the scope before we talk.',
  },

  wizard: {
    progressLabel: 'Estimate progress',
    steps: {
      business: 'Your business',
      modules: 'What you need',
      implementation: 'Implementation',
    },
    stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
    questions: {
      businessType: 'What type of business do you run?',
      activeMembers: 'Roughly how many active members?',
      currentSystem: 'Do you have a system today?',
      modules: 'Which areas do you need? Pick all that apply.',
      compensation: 'How complex is your compensation plan?',
      migration: 'What data would need to move over?',
      integrations: 'Which systems should it connect to?',
    },
    back: 'Back',
    continue: 'Continue',
    finish: 'See my summary',
    incomplete: 'Answer each question to continue.',
    result: {
      title: 'Your needs',
      summary: {
        businessType: 'Business type',
        activeMembers: 'Active members',
        currentSystem: 'Current system',
        modules: 'Modules',
        compensation: 'Compensation',
        migration: 'Data migration',
        integrations: 'Integrations',
      },
      message:
        'A scope like this is estimated based on your business rules and implementation needs. Talk to our team for a quotation that fits your business.',
      whatsapp: 'Discuss your estimate via WhatsApp',
      privacy:
        'Your answers stay on this page. WhatsApp opens with a short standard message; nothing you selected is sent unless you share it.',
      change: 'Change answers',
      restart: 'Start over',
    },
  },

  details: {
    factors: {
      eyebrow: 'What shapes a quote',
      title: 'What affects the price?',
      lead: 'Six things make the biggest difference to the scope, and so to the price.',
      items: {
        scale: {
          title: 'Business scale',
          text: 'How many active members you have today, and how fast the network is growing.',
        },
        compensation: {
          title: 'Compensation complexity',
          text: 'The number of bonus types, qualifications and ranks, and how unusual the rules are.',
        },
        modules: {
          title: 'Modules',
          text: 'Which areas you need now and which can follow later.',
        },
        integration: {
          title: 'Integration',
          text: 'Payment, logistics, accounting and messaging systems that need to be connected.',
        },
        migration: {
          title: 'Migration',
          text: 'Member data, network structure and history moving over from your current system.',
        },
        support: {
          title: 'Implementation support',
          text: 'Training for your teams and the level of support you need after launch.',
        },
      },
    },
    steps: {
      eyebrow: 'Implementation',
      title: 'What does implementation involve?',
      lead: 'Every project follows the same eight steps. How long each one takes depends on your scope; you get a written timeline after discovery.',
      cta: 'Discuss implementation',
      items: {
        discovery: {
          title: 'Discovery',
          text: 'Understanding your business model and goals.',
        },
        mapping: {
          title: 'Business mapping',
          text: 'Your plan and workflows, written down and agreed.',
        },
        configuration: {
          title: 'Configuration',
          text: 'The system set up around your rules.',
        },
        integration: {
          title: 'Integration',
          text: 'Connecting the tools you already use.',
        },
        migration: {
          title: 'Migration',
          text: 'Moving data with reconciliation checks.',
        },
        testing: {
          title: 'Testing',
          text: 'Results compared against your numbers.',
        },
        training: {
          title: 'Training',
          text: 'Your teams ready for day-to-day work.',
        },
        launch: {
          title: 'Launch',
          text: 'A planned go-live with our team on hand.',
        },
      },
    },
  },

  faq: {
    title: 'Pricing questions, answered.',
    lead: 'What we can tell you before a conversation, and what depends on your scope.',
    items: [
      {
        q: 'Is there a fixed price package?',
        a: 'Not at the moment. Businesses differ a lot in network size, compensation plan and integrations, so our team prepares a quotation based on your implementation scope.',
      },
      {
        q: 'What affects the implementation cost?',
        a: 'Mainly your business scale, how complex your compensation plan is, the modules you need, integrations, data migration and the level of support after launch.',
      },
      {
        q: 'Can we start with a few modules?',
        a: 'That can be discussed. Many businesses start with the areas that matter most; what fits in a first phase is agreed based on your scope.',
      },
      {
        q: 'Can our current system be migrated?',
        a: 'Often, yes. What can be migrated, and how, depends on your current system and data. We assess it during discovery.',
      },
      {
        q: 'Can a custom compensation plan be discussed?',
        a: 'Yes. Bring your plan document and a sample of past payouts; we map it rule by rule with your team.',
      },
      {
        q: 'Are there maintenance or support costs?',
        a: 'Our team will discuss this based on your implementation scope.',
      },
      {
        q: 'How do we get a quotation?',
        a: 'Complete the needs estimate on this page or message us on WhatsApp. After a short conversation about your business, our team prepares a quotation.',
      },
    ],
  },

  demo: {
    title: 'Not sure which category your needs fall into?',
    text: "Tell us about your business. You don't need the technical terms; our team will help map them.",
  },
}
