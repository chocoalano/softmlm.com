/**
 * Site-wide copy: header, navigation, footer, switchers, conversion
 * buttons, the Book a Demo form and error pages.
 */
export default {
  brand: {
    homeLabel: 'mlmsoft home',
    tagline:
      'MLM and direct selling systems designed around your business, from the first order to the final payout.',
    rights: 'All rights reserved.',
  },

  nav: {
    mainLabel: 'Main',
    mobileLabel: 'Mobile',
    platform: 'Platform',
    features: 'Features',
    compensation: 'Compensation',
    whoWeServe: 'Who We Serve',
    integrations: 'Integrations',
    pricing: 'Pricing',
    implementation: 'Implementation',
    howWeDoIt: 'How We Do It',
    services: 'Services',
    serviceLinks: {
      social_media: {
        label: 'Social Media Management',
        text: 'Build a consistent presence around your business.',
      },
      seo: {
        label: 'SEO & Content',
        text: 'Help potential customers find your business organically.',
      },
      paid_advertising: {
        label: 'Paid Advertising',
        text: 'Reach the right audience through structured campaigns.',
      },
      branding: {
        label: 'Branding & Creative',
        text: 'Build a brand people can recognize and remember.',
      },
      product_maklon: {
        label: 'Product Development / Maklon',
        text: 'Turn a product idea into something ready to develop.',
      },
    },
    servicesOverview: {
      title: 'All services',
      text: 'Support around the system: product, brand and growth.',
      link: 'See the overview',
    },
    security: 'Security',
    modulesLabel: 'Modules',
    overview: 'Overview',
    platformOverview: {
      title: 'Platform overview',
      text: 'How member, commerce, commission and finance data fit together.',
      link: 'Explore the platform',
    },
    platformLinks: {
      commandCenter: 'Command center',
      network: 'Network visualization',
      integrations: 'Integrations',
      security: 'Security',
    },
    rolesOverview: {
      title: 'One business, different teams',
      text: "How every team's needs fit together",
    },
    featureLinks: {
      compensation: { label: 'Compensation Plans', text: 'Bonuses, ranks and qualifications' },
      network: { label: 'Network Management', text: 'Structure, placement and growth signals' },
      ecommerce: { label: 'Ecommerce', text: 'Orders that follow your business rules' },
      wallet: { label: 'Wallet & Payout', text: 'Payout rules members can understand' },
      integrations: {
        label: 'Integrations',
        text: 'How your existing systems exchange data',
      },
      distributors: {
        label: 'Distributor Experience',
        text: 'What your members see and understand',
      },
    },
    allFeatures: {
      title: 'All features',
      text: 'Start with the problem you need to solve.',
      link: 'See the overview',
    },
    moreLabel: 'On the homepage',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },

  roles: {
    executives: {
      label: 'Owners & Executives',
      short: 'Owners & Executives',
      nav: 'Growth, network activity and risk',
    },
    finance: {
      label: 'Finance',
      short: 'Finance',
      nav: 'Commissions, payouts, tax and reconciliation',
    },
    operations: {
      label: 'Operations',
      short: 'Operations',
      nav: 'Members, orders, network changes and support',
    },
    it: {
      label: 'IT Teams',
      short: 'IT Teams',
      nav: 'Integrations, access and technical requirements',
    },
    distributors: {
      label: 'Distributor Experience',
      short: 'Distributors',
      nav: 'What your members see and understand',
    },
  },

  locale: {
    label: 'Language',
    current: 'current language',
  },

  theme: {
    label: 'Theme',
    button: 'Change theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    systemHint: 'Follows your device',
  },

  cta: {
    whatsapp: 'Consult via WhatsApp',
    fallback: 'Talk to our team',
    opensWhatsapp: '(opens WhatsApp)',
    bookDemo: 'Book a Demo',
    requestConsultation: 'Request a Consultation',
    seeHow: 'See how it works',
  },

  visualNote: {
    interface: 'Interface concept · sample data',
    illustration: 'Illustration · sample order',
    concept: 'Concept · sample data',
  },

  footer: {
    platform: 'Platform',
    features: 'Features',
    compensation: 'Compensation plans',
    services: 'Services',
    company: 'Company',
    links: {
      overview: 'Overview',
      commandCenter: 'Command center',
      network: 'Network visualization',
      intelligence: 'mlmsoft Intelligence',
      distributorExperience: 'Distributor experience',
      whoWeServe: 'Who we serve',
      implementation: 'How we do it',
      integrations: 'Integrations',
      security: 'Security',
      pricing: 'Pricing',
      faq: 'FAQ',
      bookDemo: 'Book a demo',
      servicesOverview: 'All services',
    },
    staffLogin: 'Staff login',
    backToTop: 'Back to top',
  },

  breadcrumb: 'Breadcrumb',

  faq: {
    eyebrow: 'FAQ',
    askTeam: 'Ask our team',
  },

  /**
   * The same lead form on the services pages, as a consultation request
   * rather than a software demo.
   */
  consultation: {
    eyebrow: 'Talk to us',
    title: 'Tell us what you need.',
    text: 'Share a little about your business and the support you are looking for. The team will get back to you to discuss scope.',
    or: 'or send a request with the form',
    expectations: [
      'A conversation about your business, not a sales script',
      'Only the services you ask about: one is fine',
      'A clear next step once the scope is understood',
    ],
    success: {
      title: 'Thank you!',
      text: 'Your request is in. Our team will reach out shortly to discuss it.',
      again: 'Send another request',
    },
    form: {
      title: 'Request a Consultation',
      text: 'A few details are enough to start.',
      topics: 'What would you like to discuss?',
      topicsHint: 'Choose one or more.',
      message: 'What do you need help with?',
      messagePlaceholder: 'Your product, your current situation, what you would like to achieve…',
      submit: 'Send request',
      product: {
        legend: 'About your product',
        stage: 'What stage are you at?',
        launch: 'Target launch',
      },
    },
  },

  /**
   * The same lead form on /integrations, as an integration consultation.
   * It asks only whether an API or documentation exists, never for
   * credentials.
   */
  integrationConsultation: {
    eyebrow: 'Talk to us',
    title: 'Tell us which systems need to work together.',
    text: 'Share the systems you use today. The team will get back to you to map the data flow and the approach.',
    or: 'or send a request with the form',
    expectations: [
      'A conversation about your systems and your workflow',
      'Questions about the data flow, not a sales script',
      'A clear next step once the integration scope is understood',
    ],
    success: {
      title: 'Thank you!',
      text: 'Your request is in. Our team will reach out shortly to discuss your integrations.',
      again: 'Send another request',
    },
    form: {
      title: 'Request an Integration Consultation',
      text: 'Everything except your contact details is optional.',
      needs: 'What do you need to connect?',
      needsHint: 'Choose any that apply.',
      api: 'Is there an API or documentation for the system?',
      system: 'Existing system',
      systemPlaceholder: 'Its name, or what it is used for',
      message: 'Anything else we should know?',
      messagePlaceholder: 'The workflow, what goes wrong today, who maintains the system…',
      credentials: 'Please do not send passwords, API keys or other credentials through this form.',
      submit: 'Send request',
    },
  },

  demo: {
    eyebrow: 'Talk to us',
    title: 'Ready to build a more structured MLM system?',
    text: 'Tell us how your business works. The mlmsoft team will help map the system, compensation plan and operations that fit you best.',
    or: 'or book a demo with the form',
    expectations: [
      'A conversation about how your business works',
      'Your compensation plan, discussed with people who know MLM',
      'A clear next step: scope, timeline and quote',
    ],
    success: {
      title: 'Thank you!',
      text: 'Your request is in. Our team will reach out shortly to schedule your demo.',
      again: 'Send another request',
    },
    form: {
      title: 'Book a Demo',
      text: "We'll contact you to schedule a session.",
      name: 'Full name',
      namePlaceholder: 'Your name',
      email: 'Work email',
      emailPlaceholder: 'you@company.com',
      company: 'Company',
      companyPlaceholder: 'Company name',
      phone: 'WhatsApp / phone',
      phonePlaceholder: '+62 812 3456 7890',
      optional: '(optional)',
      businessType: 'Business type',
      activeMembers: 'Active members',
      select: 'Select…',
      modules: 'Modules of interest:',
      message: 'Anything we should know?',
      messagePlaceholder: 'Current system, compensation plan type, timeline…',
      submit: 'Book my demo',
      sending: 'Sending…',
      consent:
        "By sending this form you agree that mlmsoft may use these details to contact you about your request. We don't add you to a mailing list.",
    },
  },

  notFound: {
    title: 'Page not found',
    eyebrow: '404',
    heading: "We couldn't find that page.",
    text: 'The link may be old, or the page may have moved. These are good places to continue:',
    links: {
      home: 'Homepage',
      whoWeServe: 'Who we serve',
      compensation: 'Compensation plans',
      pricing: 'Pricing',
    },
  },

  serverError: {
    title: 'Something went wrong',
    eyebrow: 'Error',
    heading: 'Something went wrong on our side.',
    text: 'Please try again in a moment. If it keeps happening, contact our team and we will look into it.',
    home: 'Back to the homepage',
  },
}
