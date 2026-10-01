/**
 * Growth services (docs/services-marketing-strategy.md): the homepage
 * section, the /services hub and the five service pages.
 *
 * Services are offered; results are not promised. No follower, ranking,
 * traffic, lead, sales or ROI figures, no portfolio, no platform
 * partnership, no maklon capability beyond docs/product-maklon-evidence.md.
 * Visuals are concepts and example workflows.
 */
export default {
  shared: {
    breadcrumbRoot: 'Services',
    problemEyebrow: 'The problem',
    scopeEyebrow: 'What we can cover',
    processEyebrow: 'How it works',
    audienceEyebrow: 'Who it is for',
    contextEyebrow: 'For network businesses',
    relatedEyebrow: 'Related services',
    scopeNote:
      'The scope is agreed per project after a first conversation. You choose what you need.',
    pricingNote: 'Pricing depends on scope.',
    concept: 'Concept',
    exampleWorkflow: 'Example workflow',
    explore: 'Explore',
    faqLead: 'Short answers. The details depend on your business and are agreed with you.',
  },

  /** Outcome-oriented card text, used on the homepage and the hub. */
  cards: {
    social_media: 'Build a consistent social presence without managing every post internally.',
    seo: 'Create useful content that helps potential customers discover your business.',
    paid_advertising: 'Plan campaigns around the audience and offer you want to grow.',
    branding: 'Create a clearer identity across product, digital and campaign touchpoints.',
    product_maklon:
      'Discuss the product behind the network, from concept to manufacturing requirements.',
  },

  home: {
    eyebrow: 'Beyond the software',
    title: 'Your business needs more than software.',
    lead: 'The system is only one part of building a direct selling business. Brand, product, content and customer acquisition also need to work together.',
    storyLabel: 'What a network business is built from',
    story: [
      'Business model',
      'Product',
      'Brand',
      'Digital presence',
      'Software',
      'Traffic',
      'Network growth',
      'Operations',
    ],
    storyCore: 'Our core',
    cardsLabel: 'Growth services',
    onePartner: {
      title: 'One conversation can cover more than one part of the business.',
      text: 'Use one service or several. Nothing is bundled automatically.',
    },
    cta: {
      title: 'Need more than the software?',
      text: 'Tell us where your business is today and what support would help next.',
      whatsapp: 'Discuss Your Business via WhatsApp',
      explore: 'Explore Services',
    },
  },

  hub: {
    hero: {
      eyebrow: 'Growth services',
      title: 'More than software',
      highlight: 'for your MLM business.',
      lead: 'From product and branding to digital marketing, we can discuss the supporting work needed around your system.',
      cta: 'Discuss Your Business',
      explore: 'Explore Services',
      positioning: 'One partner for the system behind your network, and the growth around it.',
    },
    challenge: {
      eyebrow: 'The challenge',
      title: 'A network business is built from more than its system.',
      lead: 'The software keeps members, orders and bonuses in order. Around it, other parts of the business need the same care.',
      points: [
        {
          title: 'A product people want to share',
          text: 'Distributors sell with more confidence when the product and its story are clear.',
        },
        {
          title: 'A brand that looks the same everywhere',
          text: 'Packaging, social posts, ads and the member app should feel like one company.',
        },
        {
          title: 'Customers who can find you',
          text: 'Search, social media and advertising each bring people to the business in a different way.',
        },
      ],
    },
    ecosystem: {
      eyebrow: 'How it fits together',
      title: 'The services sit around the business, with the system at its core.',
      lead: 'Each service can stand on its own. Together they cover the parts of a network business that the software does not.',
      label: 'Concept: the services around a network business',
      center: 'Your business',
      core: 'Core offering',
      nodes: {
        software: 'Software',
        product: 'Product',
        brand: 'Brand',
        growth: 'Digital growth',
        seo: 'SEO & content',
        ads: 'Advertising',
        social: 'Social media',
      },
    },
    areas: {
      eyebrow: 'Service areas',
      title: 'Five ways we can support the business around the system.',
    },
    together: {
      eyebrow: 'Working together',
      title: 'One conversation can cover more than one part of the business.',
      lead: 'Some needs come together. You decide which ones you want to discuss.',
      examples: [
        {
          title: 'Launching a new product line',
          text: 'Product development, then branding and packaging, then the content and campaigns that introduce it.',
        },
        {
          title: 'Refreshing an existing brand',
          text: 'Branding first, then a social presence and a content plan that carry the new identity.',
        },
        {
          title: 'Growing beyond the current network',
          text: 'Search content and paid campaigns that bring new customers to your products.',
        },
      ],
      note: 'Every service can be used on its own. Nothing is bundled automatically.',
    },
    audience: {
      eyebrow: 'Who each service is for',
      title: 'Start with the need you have today.',
      items: {
        social_media: 'Brands without a dedicated content team.',
        seo: 'Brands building long-term search visibility.',
        paid_advertising: 'Businesses ready to reach new customers through paid media.',
        branding: 'New brands, or brands that need repositioning.',
        product_maklon: 'Owners developing products for their network or business.',
      },
    },
    start: {
      eyebrow: 'How engagement starts',
      title: 'A short conversation first, then a scope you agree to.',
      steps: [
        { title: 'Understand', text: 'Your business, your market and what you want to change.' },
        { title: 'Plan', text: 'What the work covers, who does what, and how it is reviewed.' },
        { title: 'Create', text: 'The agreed work is produced or built.' },
        { title: 'Review', text: 'You review it before anything goes out.' },
        { title: 'Launch', text: 'The work is published, launched or handed over.' },
        { title: 'Learn', text: 'What worked is reviewed, where the scope includes it.' },
      ],
      note: 'Some services are one-off projects, others ongoing. That is part of the scope you agree.',
    },
    pricing: {
      title: 'Pricing depends on scope.',
      text: 'There are no fixed packages on this site. Tell us what you need and we will discuss the scope and cost with you.',
      cta: 'Discuss Your Requirements',
    },
    faq: {
      title: 'Questions about the services',
      items: [
        {
          q: 'Can we use only one service?',
          a: 'Yes. Every service can be used on its own, and one is a perfectly normal place to start.',
        },
        {
          q: 'Do we have to use mlmsoft software to use the other services?',
          a: 'No. The services are available whether or not you use our software.',
        },
        {
          q: 'Can several services be combined?',
          a: 'Yes, if that helps your business. We plan them together only when you ask for more than one.',
        },
        {
          q: 'How is the scope determined?',
          a: 'In a first conversation about your business, your goals and what you already have. The scope and pricing are agreed before any work starts.',
        },
        {
          q: 'Can you promise marketing results?',
          a: 'No. Results depend on your product, market, budget and competition. We agree on what will be done and how progress is reviewed, not on outcomes nobody can promise.',
        },
        {
          q: 'Does maklon include production?',
          a: 'We also accept product development and maklon inquiries, including manufacturing. Formulation, packaging, regulatory needs, production volume and the implementation process are discussed based on the product you want to develop.',
        },
        {
          q: 'Can you work with our existing brand or team?',
          a: 'Yes. We can build on the brand you have and work alongside your internal team or other partners.',
        },
        {
          q: 'How do we start?',
          a: 'Send a message on WhatsApp or request a consultation with the form. Tell us a little about the business and what you need.',
        },
      ],
    },
    consult: {
      title: 'Tell us what you need around the system.',
      text: 'Choose the topics you would like to discuss. One is enough to start.',
    },
  },

  pages: {
    social_media: {
      hero: {
        eyebrow: 'Social Media Management',
        title: 'Make your brand easier to recognize',
        highlight: 'every time it appears.',
        lead: 'Content planning, creative, copywriting and a publishing workflow for your social channels, so your brand shows up consistently without your team handling every post.',
        cta: 'Discuss Social Media Management',
      },
      problem: {
        title: 'You have a product and a network. The social channels are harder.',
        lead: 'Many direct selling brands post when there is time, in whatever style is at hand.',
        signals: [
          'Content is inconsistent from one post to the next',
          'Posting is irregular and depends on who has time',
          'The message changes with every campaign',
          'The internal team has no capacity for content',
          'Campaign assets are scattered across people and folders',
        ],
      },
      scope: {
        title: 'Areas we can cover for your social channels.',
        lead: 'We agree which of these you need. Most brands do not need all of them.',
        items: [
          { title: 'Content planning', text: 'Monthly themes around your products and campaigns.' },
          { title: 'Content direction', text: 'Tone, visual style and what the brand should say.' },
          { title: 'Creative production', text: 'Designs, short videos and visual assets.' },
          { title: 'Copywriting', text: 'Captions and messages in the brand voice.' },
          { title: 'Campaign support', text: 'Content for launches, promotions and events.' },
          { title: 'Publishing workflow', text: 'Review, approval and scheduling steps.' },
          {
            title: 'Performance review',
            text: 'A regular look at what worked and what to change.',
          },
        ],
      },
      process: {
        title: 'A monthly rhythm your team can follow.',
        steps: [
          { title: 'Monthly direction', text: 'The focus for the month, agreed with you.' },
          { title: 'Content themes', text: 'Themes that support the products and campaigns.' },
          { title: 'Creative', text: 'Visuals and videos for each theme.' },
          { title: 'Copy', text: 'Captions written in the brand voice.' },
          { title: 'Review', text: 'You approve before anything is published.' },
          { title: 'Publish', text: 'Posts go out on the agreed schedule.' },
          { title: 'Learn', text: 'What worked shapes next month.' },
        ],
      },
      audience: {
        title: 'Useful when the brand needs a steady presence.',
        items: [
          'Brands without a dedicated content team',
          'Companies launching new products or campaigns',
          'Businesses whose distributors need consistent content to share',
        ],
      },
      context: {
        title: 'Content for a network, not just for followers.',
        lead: 'In direct selling, your social channels also supply the content distributors share with their own contacts.',
        items: [
          'Product education distributors can reuse',
          'Brand stories that stay consistent across the network',
          'Campaign content for launches and promotions',
        ],
      },
      visual: {
        label: 'Concept: a monthly content calendar',
        month: 'Monthly direction',
        direction: 'Product education month',
        themes: 'Content themes',
        themeList: ['Product benefits', 'Distributor stories', 'Behind the scenes'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        posts: [
          { type: 'Carousel', title: 'How the product is used', status: 'Scheduled' },
          { type: 'Reel', title: 'A day in the warehouse', status: 'In review' },
          { type: 'Post', title: 'Distributor story', status: 'Draft' },
          { type: 'Story', title: 'Launch countdown', status: 'Scheduled' },
          { type: 'Carousel', title: 'Ingredients explained', status: 'In review' },
        ],
      },
      mid: {
        title: 'Want a steadier social presence?',
        text: 'Tell us about your channels today and what you would like them to do.',
        whatsapp: 'Discuss Social Media Management',
      },
      related: {
        text: 'Social content works best on top of a clear brand.',
        keys: ['branding', 'paid_advertising'],
      },
      faq: {
        title: 'Questions about social media management',
        items: [
          {
            q: 'How many posts are included?',
            a: 'That depends on the scope we agree. There are no fixed packages on this site.',
          },
          {
            q: 'Do you promise follower growth or engagement?',
            a: 'No. We plan and produce consistent content and review what works; audience growth depends on many factors outside anyone’s control.',
          },
          {
            q: 'Who approves the content?',
            a: 'You do. Nothing is published before it has been reviewed by your team.',
          },
          {
            q: 'Can you work with content our team already makes?',
            a: 'Yes. We can plan around your existing content and fill the gaps.',
          },
        ],
      },
      consult: {
        title: 'Tell us about your social channels.',
        text: 'Which channels you use, how often you post today, and what you would like to change.',
      },
    },

    seo: {
      hero: {
        eyebrow: 'SEO & Content',
        title: 'Build content people',
        highlight: 'can actually find.',
        lead: 'Search intent research, content strategy and on-page SEO that help potential customers and future distributors discover your business. A long-term channel, built step by step.',
        cta: 'Discuss SEO & Content',
      },
      problem: {
        title: 'People search before they buy or join. Is your business there?',
        lead: 'Most direct selling brands rely on the network alone, and are hard to find for anyone outside it.',
        signals: [
          'The website says little that people search for',
          'Product questions are answered in chats, not on the website',
          'Articles are written without knowing what people look for',
          'Nobody checks whether the content brings anyone in',
        ],
      },
      scope: {
        title: 'Areas we can cover for search and content.',
        lead: 'We agree which of these fit your stage. Search is a long-term channel, not a switch.',
        items: [
          { title: 'Keyword research', text: 'What your customers actually type.' },
          { title: 'Search intent mapping', text: 'Which questions each page should answer.' },
          { title: 'Content strategy', text: 'Topics, priorities and a publishing plan.' },
          { title: 'On-page SEO', text: 'Titles, structure and internal links.' },
          { title: 'Technical SEO review', text: 'Issues that stop pages being found.' },
          { title: 'SEO articles', text: 'Useful articles written for people first.' },
          {
            title: 'Landing page optimization',
            text: 'Pages that answer the search and invite contact.',
          },
          { title: 'Content performance review', text: 'What is found, read and acted on.' },
        ],
      },
      process: {
        title: 'From what people search to content that answers it.',
        steps: [
          { title: 'Search intent', text: 'What people want to know or do.' },
          { title: 'Topic', text: 'The subjects your business should own.' },
          { title: 'Content', text: 'Articles and pages that answer them well.' },
          { title: 'Landing page', text: 'Where a reader can take the next step.' },
          { title: 'Measurement', text: 'What is found and read, reviewed over time.' },
        ],
      },
      audience: {
        title: 'Useful when you want to be found, not only referred.',
        items: [
          'Brands building long-term search visibility',
          'Businesses whose products raise many questions',
          'Companies that want less reliance on paid reach alone',
        ],
      },
      context: {
        title: 'Search content that fits a network business.',
        lead: 'SEO is not only crawler work. For a direct selling brand, useful themes include:',
        items: [
          'Product education: how it works, how to use it',
          'Business opportunity education, explained honestly',
          'Content distributors can point their contacts to',
          'Your brand name, when people search for it',
          'Customer questions asked before a first order',
        ],
      },
      visual: {
        label: 'Concept: from search intent to measurement',
        columns: {
          intent: 'Search intent',
          topic: 'Topic',
          content: 'Content',
          landing: 'Landing page',
          measure: 'Measurement',
        },
        queries: [
          'how to use [product]',
          '[product] for daily use',
          'become a [brand] distributor',
        ],
        pillar: 'Product education',
        pieces: ['Guide', 'FAQ article', 'How-to video'],
        landing: 'Product page with a WhatsApp inquiry',
        measures: ['Search visibility', 'Pages read', 'Inquiries'],
      },
      mid: {
        title: 'Want to be easier to find?',
        text: 'Tell us about your website today and the questions your customers ask.',
        whatsapp: 'Discuss SEO & Content',
      },
      related: {
        text: 'Search content and paid campaigns often support each other.',
        keys: ['paid_advertising', 'social_media'],
      },
      faq: {
        title: 'Questions about SEO & content',
        items: [
          {
            q: 'Can you promise a position on Google?',
            a: 'No. Positions depend on competition, time and changes by the search engines. We work on what can be controlled: useful content, a sound site and regular review.',
          },
          {
            q: 'How long before SEO shows an effect?',
            a: 'SEO builds up over months rather than weeks, and every market is different. We review progress together along the way.',
          },
          {
            q: 'Do you write the articles?',
            a: 'Writing can be part of the scope, or we can plan content your team writes.',
          },
          {
            q: 'Does SEO work for a direct selling business?',
            a: 'Yes, when the content answers real questions about the products and the business, honestly.',
          },
        ],
      },
      consult: {
        title: 'Tell us about your website and search goals.',
        text: 'Your website, your products, and who you would like to reach.',
      },
    },

    paid_advertising: {
      hero: {
        eyebrow: 'Paid Advertising',
        title: 'Turn advertising spend into',
        highlight: 'a structured growth channel.',
        lead: 'Campaign planning, audience strategy, creative direction and landing page alignment, so every campaign has a clear objective and is reviewed against it.',
        cta: 'Discuss Your Advertising Goals',
      },
      problem: {
        title: 'Ads are easy to start and hard to run well.',
        lead: 'Without a plan, budget goes to boosted posts and nobody can say what it brought.',
        signals: [
          'Campaigns start without a clear objective',
          'The same audience is targeted for every product',
          'Ads lead to pages that do not match the offer',
          'Spend is not reviewed against inquiries',
        ],
      },
      scope: {
        title: 'Areas we can cover for paid campaigns.',
        lead: 'We agree which of these you need, on the platforms that fit your market.',
        items: [
          { title: 'Campaign planning', text: 'Objectives, timing and structure.' },
          { title: 'Audience strategy', text: 'Who each campaign should reach.' },
          { title: 'Creative direction', text: 'Concepts and messages to test.' },
          { title: 'Landing page alignment', text: 'Pages that match the ad and the offer.' },
          { title: 'Campaign setup', text: 'Tracking and campaign structure in place.' },
          { title: 'Budget structure', text: 'How spend is split and adjusted.' },
          { title: 'Optimization', text: 'Changes based on what the data shows.' },
          { title: 'Reporting', text: 'Clear reports on spend and inquiries.' },
        ],
      },
      process: {
        title: 'A campaign plan before the budget is spent.',
        steps: [
          { title: 'Objective', text: 'What the campaign should achieve.' },
          { title: 'Audience', text: 'Who it should reach.' },
          { title: 'Creative', text: 'What they will see.' },
          { title: 'Landing page', text: 'Where they arrive.' },
          { title: 'Inquiry', text: 'How they get in touch.' },
          { title: 'Measurement', text: 'What is tracked and reviewed.' },
        ],
      },
      audience: {
        title: 'Useful when you are ready to pay for reach.',
        items: [
          'Businesses ready to reach new customers through paid media',
          'Brands launching a product or campaign',
          'Teams that run ads today without a clear structure',
        ],
      },
      context: {
        title: 'Advertising that respects how a network business sells.',
        lead: 'In direct selling, a campaign can support customers, distributors or both. We plan around that:',
        items: [
          'Campaigns for customers and for new distributors kept apart',
          'Messages and offers that match what distributors say',
          'Inquiries routed to the right team or distributor',
        ],
      },
      visual: {
        label: 'Concept: a campaign plan, before any budget is spent',
        title: 'Campaign plan',
        rows: [
          { label: 'Objective', value: 'New customer inquiries for a product launch' },
          { label: 'Audience', value: 'Interest-based audience in the launch region' },
          {
            label: 'Creative',
            value: 'Two concepts to compare: a demo video and a how-to carousel',
          },
          { label: 'Landing page', value: 'Product page with a WhatsApp inquiry button' },
          { label: 'Measurement', value: 'Cost per inquiry and inquiry quality' },
        ],
        funnel: ['Audience', 'Creative', 'Landing page', 'Inquiry'],
      },
      mid: {
        title: 'Planning your next campaign?',
        text: 'Tell us what you want to promote and who you want to reach.',
        whatsapp: 'Discuss Your Advertising Goals',
      },
      related: {
        text: 'Campaigns perform better with a clear brand and pages built for search.',
        keys: ['branding', 'seo'],
      },
      faq: {
        title: 'Questions about paid advertising',
        items: [
          {
            q: 'Can you promise a return on ad spend?',
            a: 'No. Results depend on the product, offer, market and budget. We plan, run and review campaigns against clear objectives.',
          },
          {
            q: 'Which platforms do you work with?',
            a: 'The ones that fit your market and audience, agreed during planning.',
          },
          {
            q: 'Is the ad budget included?',
            a: 'Ad spend and management are discussed separately as part of the scope. There are no fixed percentages on this site.',
          },
          {
            q: 'Do you make the ad creative?',
            a: 'Creative direction is part of the service; production can be included in the scope.',
          },
        ],
      },
      consult: {
        title: 'Tell us about your advertising goals.',
        text: 'What you want to promote, where your customers are, and what you run today.',
      },
    },

    branding: {
      hero: {
        eyebrow: 'Branding & Creative',
        title: 'Build a brand your market',
        highlight: 'can recognize.',
        lead: 'Brand strategy, visual identity and the materials that carry it: packaging direction, campaign visuals and marketing materials that look like one company.',
        cta: 'Discuss Your Brand',
      },
      problem: {
        title: 'A brand is recognized when it looks and sounds the same everywhere.',
        lead: 'Many network brands grow faster than their identity, and every distributor ends up with a different version.',
        signals: [
          'The logo and colors differ between materials',
          'Packaging, website and social posts feel like different companies',
          'Distributors make their own materials',
          'The brand no longer fits the products or the market',
        ],
      },
      scope: {
        title: 'Areas we can cover for your brand.',
        lead: 'From a full identity to a focused refresh. We agree the scope with you.',
        items: [
          { title: 'Brand strategy', text: 'Who the brand is for and what it stands for.' },
          { title: 'Visual identity', text: 'The system behind every material.' },
          { title: 'Logo', text: 'A mark that works in every size and place.' },
          { title: 'Color system', text: 'Colors that work in print and on screens.' },
          { title: 'Typography', text: 'Typefaces for headings, text and packaging.' },
          { title: 'Packaging direction', text: 'How the identity carries onto products.' },
          { title: 'Campaign visuals', text: 'Key visuals for launches and promotions.' },
          { title: 'Marketing materials', text: 'Materials distributors can use.' },
        ],
      },
      process: {
        title: 'The business first, then the identity.',
        steps: [
          { title: 'Business', text: 'What you sell, and how.' },
          { title: 'Audience', text: 'Who you want to reach.' },
          { title: 'Positioning', text: 'What the brand should mean to them.' },
          { title: 'Identity', text: 'Logo, color, type and voice.' },
          { title: 'Application', text: 'Packaging, digital and campaign materials.' },
          { title: 'Consistency', text: 'Guidelines so everyone uses it the same way.' },
        ],
      },
      audience: {
        title: 'Useful when the brand is new or no longer fits.',
        items: [
          'New brands preparing to launch',
          'Brands that need repositioning',
          'Networks where every distributor uses a different version',
        ],
      },
      context: {
        title: 'A brand distributors can carry.',
        lead: 'In direct selling, many people present your brand. The identity has to survive that:',
        items: [
          'Guidelines simple enough for distributors to follow',
          'Materials they can use without redesigning them',
          'One look across packaging, social media and the member app',
        ],
      },
      visual: {
        label: 'Example creative direction for a fictional brand',
        caption: 'Example creative direction',
        brand: 'YOUR BRAND',
        tagline: 'Everyday wellness',
        palette: 'Color system',
        type: 'Typography',
        applications: 'Applications',
        items: ['Packaging', 'Social post', 'Business card'],
      },
      mid: {
        title: 'Is your brand ready for the next stage?',
        text: 'Tell us about your brand today and where the business is going.',
        whatsapp: 'Discuss Your Brand',
      },
      related: {
        text: 'Already have a brand but need customer acquisition? Explore SEO and Paid Advertising.',
        keys: ['seo', 'paid_advertising'],
      },
      faq: {
        title: 'Questions about branding',
        items: [
          {
            q: 'Do you register trademarks?',
            a: 'No. Trademark registration is a legal process; we recommend a trademark consultant for it.',
          },
          {
            q: 'Can you refresh our brand instead of replacing it?',
            a: 'Yes. Many brands need a focused refresh rather than a new identity.',
          },
          {
            q: 'Can you show previous branding work?',
            a: 'We share relevant examples in a consultation. The visuals on this page are an example direction for a fictional brand.',
          },
          {
            q: 'Do you design packaging?',
            a: 'Packaging direction can be part of the scope; production of packaging is discussed separately.',
          },
        ],
      },
      consult: {
        title: 'Tell us about your brand.',
        text: 'What you sell, who it is for, and what is not working today.',
      },
    },

    product_maklon: {
      hero: {
        eyebrow: 'Product Development / Maklon',
        title: 'Tell us what product',
        highlight: 'you want to build.',
        lead: 'We also accept product development and maklon inquiries for MLM and direct selling businesses. We can discuss the product concept, target market, packaging, manufacturing requirements and launch needs with you.',
        cta: 'Consult About Product Maklon',
      },
      problem: {
        title: 'The product comes before the network.',
        lead: 'Owners often have a product idea, or an existing product, but no clear path to developing it further.',
        signals: [
          'The idea is clear, the next steps are not',
          'It is unclear what developing the product requires',
          'Packaging and positioning are still open',
          'The product should fit how the network will sell it',
        ],
      },
      scope: {
        title: 'Areas we can discuss during product discovery.',
        lead: 'Topics for a first conversation. What comes next depends on the product you want to build.',
        items: [
          { title: 'Product idea', text: 'What the product is and why it should exist.' },
          { title: 'Target customer', text: 'Who will buy it, and who will sell it.' },
          { title: 'Product category', text: 'The kind of product you have in mind.' },
          { title: 'Formulation requirements', text: 'What the product needs to contain or do.' },
          { title: 'Packaging', text: 'Format, look and how it will be shipped.' },
          { title: 'Positioning', text: 'How it differs from what is already on the market.' },
          { title: 'Production volume', text: 'The quantities you have in mind.' },
          {
            title: 'Regulatory requirements',
            text: 'What the product may need before it is sold.',
          },
          { title: 'Launch plan', text: 'How and when the product reaches the network.' },
        ],
      },
      process: {
        title: 'From idea to a concept ready to develop.',
        steps: [
          { title: 'Concept', text: 'The idea, the customer and the reason to buy.' },
          { title: 'Requirements', text: 'What the product and its formula need.' },
          { title: 'Packaging', text: 'How it looks, and how it travels.' },
          { title: 'Production', text: 'Manufacturing requirements, discussed for your product.' },
          { title: 'Launch plan', text: 'How it reaches the network and customers.' },
        ],
      },
      audience: {
        title: 'Useful when the product is still taking shape.',
        items: [
          'Owners developing products for their network or business',
          'Brands adding a new product line',
          'Businesses reviewing how an existing product is made',
        ],
      },
      transparency: {
        title: 'What we discuss with you.',
        lead: 'Formulation, packaging, regulatory needs, production volume and the implementation process are discussed based on the product you want to develop.',
        confirmed: {
          title: 'What this page offers',
          items: [
            'A consultation about your product idea or existing product',
            'Product discovery: the topics above, discussed with you',
            'Branding and a sales system planned around the product, if you want them',
          ],
        },
        perProject: {
          title: 'Discussed for your product',
          items: [
            'Formulation and product requirements',
            'Packaging and positioning',
            'Regulatory needs',
            'Production volume, timing and pricing',
          ],
        },
      },
      visual: {
        label: 'Concept illustration: a product journey with neutral packaging',
        caption: 'Concept illustration',
        brand: 'YOUR BRAND',
        product: 'PRODUCT CONCEPT',
        stages: ['Concept', 'Requirements', 'Packaging', 'Launch plan'],
      },
      mid: {
        title: 'Have a product in mind?',
        text: 'Tell us where the idea stands. A rough idea is a fine place to start.',
        whatsapp: 'Discuss Your Product',
      },
      related: {
        text: 'Once the product direction is clear, branding and the digital sales system can be planned around it.',
        keys: ['branding', 'social_media'],
      },
      faq: {
        title: 'Questions about product development and maklon',
        items: [
          {
            q: 'Does maklon include production?',
            a: 'Maklon inquiries are welcome, including manufacturing. Formulation, packaging, regulatory needs, production volume and the implementation process are discussed based on the product you want to develop.',
          },
          {
            q: 'Which products can be developed?',
            a: 'Tell us what you have in mind. What can be developed, and how, is discussed based on the product itself.',
          },
          {
            q: 'What about product registration?',
            a: 'Regulatory needs are discussed during product discovery, based on the product and where it will be sold.',
          },
          {
            q: 'What is the minimum order?',
            a: 'Minimum quantities and prices depend on the product and are discussed with you.',
          },
        ],
      },
      consult: {
        title: 'Tell us about your product.',
        text: 'The idea, where it stands, and when you would like to launch. All optional except your contact details.',
      },
    },
  },

  crossLinks: {
    howWeDoIt: {
      text: 'Looking for branding, marketing or product support?',
      link: 'Explore Services',
    },
    ecommerce: {
      text: 'Need help preparing the brand around your online store?',
      link: 'Explore Branding',
    },
  },
}
