/**
 * Copy area: legal. /en/privacy and /en/terms.
 *
 * Drafts that describe what the site actually does (docs/marketing-
 * attribution.md, docs/security-evidence.md). They still need a final
 * legal and business review before production sign-off
 * (docs/legal-review.md): never present them as reviewed.
 */

/** One section of a legal page. `kind` places an interactive block after the text. */
export type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  items?: string[]
  after?: string[]
  kind?: 'cookies' | 'preference' | 'contact' | 'privacy-link'
}

const legal = {
  updatedLabel: 'Last updated',
  updated: '1 October 2026',
  contents: 'On this page',
  eyebrow: 'Legal',

  privacy: {
    title: 'Privacy Notice',
    lead: 'What this website collects when you browse it or contact us, why we use it, and the choices you have. It describes how the site works today.',
    sections: [
      {
        id: 'summary',
        title: 'In short',
        paragraphs: [],
        items: [
          'What you send us through a form is used to answer your request. We do not add you to a mailing list and we do not sell your information.',
          'To learn which pages and campaigns are useful, the site counts visits itself, with a random ID in a first-party cookie. It is not linked to your name unless you send us a form.',
          'There are no advertising pixels and no third-party analytics scripts on this site.',
          'You can turn analytics off for your browser at any time, and we respect Global Privacy Control.',
        ],
      },
      {
        id: 'scope',
        title: 'What this notice covers',
        paragraphs: [
          'This notice covers this website, its forms and the WhatsApp buttons that open a chat with our team. In it, "we" means the team that operates this website.',
          'It does not cover the MLM software we implement for clients: how members’ data is handled on a client platform is agreed in each project. The site is meant for businesses and is not directed at children.',
        ],
      },
      {
        id: 'you-provide',
        title: 'Information you give us',
        paragraphs: ['When you send a demo or consultation request, we receive what you enter:'],
        items: [
          'your name, work email, company name and, if you add it, your phone or WhatsApp number;',
          'details about your business that you choose to share, such as business type, number of active members, the modules, services, integration areas or security topics you are interested in, your product stage, or the name of a system you use today;',
          'your message, and the needs estimate if you completed one on the pricing page;',
          'the language of the page you sent it from.',
        ],
        after: [
          'Please do not send passwords, API keys or other credentials, or details of security weaknesses, through the forms. The forms never ask for them.',
        ],
      },
      {
        id: 'with-request',
        title: 'Information recorded with your request',
        paragraphs: ['Together with a request, we keep:'],
        items: [
          'how you arrived during that visit: the first page you opened, the website you came from (its address without parameters) and any campaign tags (UTM) in the link;',
          'the page you sent the form from;',
          'a one-way hash of your network (IP) address and your browser’s identification string (user agent), used only to detect spam and abuse;',
          'if analytics is on for your browser, the pages and interests recorded before you sent it (see the next sections).',
        ],
        after: [
          'The first three are kept even when analytics is off, because they are part of handling the request you chose to send.',
        ],
      },
      {
        id: 'analytics',
        title: 'First-party analytics',
        paragraphs: [
          'To see which pages, topics and campaigns are useful, the website records visits itself. No third-party analytics or advertising service receives this data. When analytics is on, we record:',
        ],
        items: [
          'a random visitor ID in a first-party cookie, kept for 90 days, and a visit ID that ends after 30 minutes without activity;',
          'the pages you view (the path of the address only, never its parameters), the website you came from and campaign tags;',
          'the language and colour theme you use, and whether you are on a phone, tablet or desktop (not the device model);',
          'the interests you show: menus, cards or services you open, forms you start, the needs estimate you complete and the WhatsApp buttons you click.',
        ],
        after: [
          'We do not store your IP address with this data, we do not fingerprint your device, and we do not record what you type into a form, your mouse movements or your screen. Search engine crawlers, link previews and other obvious automated visits are not counted.',
        ],
      },
      {
        id: 'identity',
        title: 'When analytics becomes linked to you',
        paragraphs: [
          'Analytics data is pseudonymous: our team sees an anonymous visitor, not a person, and we do not try to find out who an anonymous visitor is. It becomes linked to you in two cases only:',
        ],
        items: [
          'you send a form from this browser: the visits and interests recorded for this browser are attached to your request, so our team understands what you were looking at;',
          'you message us on WhatsApp with a reference from this site, and our sales team links that reference to a request you already sent.',
        ],
        after: ['Another browser or device is never matched to you.'],
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        paragraphs: [
          'The WhatsApp buttons open WhatsApp, a service run by a third party under its own terms and privacy policy. Nothing is sent until you choose to send the message.',
          'When analytics is on, the prepared message ends with a short reference such as "Ref: M7K4P2". It tells our team which page and topic you came from. It is a random code, unrelated to your name or number, and it gives no access to anything on this site. When analytics is off, the button works the same way without a reference.',
          'The website never sees your WhatsApp number or your conversation. Our team sees your number and messages in WhatsApp only after you message us, as with any WhatsApp chat.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies and similar storage',
        paragraphs: ['The site sets only its own (first-party) cookies:'],
        kind: 'cookies',
        after: [
          'The pricing estimator keeps your answers in your browser’s session storage until you close the tab, so you can go back a step. They reach us only if you send a form with the estimate attached.',
          'You can block or delete cookies in your browser settings. The site keeps working; sending a form needs the session cookie.',
        ],
      },
      {
        id: 'choices',
        title: 'Your choices',
        paragraphs: [
          'You can turn first-party analytics off for this browser. Pages, forms and WhatsApp keep working the same way. If your browser sends a Global Privacy Control signal, analytics stays off automatically.',
        ],
        kind: 'preference',
        after: [
          'Turning analytics off stops new records and removes this browser’s visitor ID. What was recorded before stays anonymous and is kept only for a limited time (see "How long we keep information"). To have it removed sooner, contact us.',
        ],
      },
      {
        id: 'use',
        title: 'How we use information',
        paragraphs: [],
        items: [
          'to reply to your request and prepare the consultation or demo you asked for;',
          'to notify our team of a new request by email and send you a confirmation;',
          'to understand which pages, topics and campaigns are useful, with anonymous or pseudonymous data;',
          'to protect the site and its forms from spam and abuse;',
          'to meet our legal obligations.',
        ],
        after: [
          'We do not sell your information, we do not use it for advertising on other sites, and we do not make automated decisions about you.',
        ],
      },
      {
        id: 'sharing',
        title: 'Who receives information',
        paragraphs: [],
        items: [
          'Our team, through staff accounts that see only what their role needs: the marketing role, for example, sees anonymous analytics but not contact details.',
          'The providers that run the site for us: the hosting provider for the site and its database, and the email provider that delivers notification and confirmation emails.',
          'Google Fonts: the site’s typefaces are loaded from Google’s servers, so your browser sends your IP address and browser details to Google when a page loads.',
          'WhatsApp, only when you choose to open it.',
          'Authorities, when the law requires it.',
        ],
      },
      {
        id: 'retention',
        title: 'How long we keep information',
        paragraphs: [
          'We keep information only as long as we need it for the purposes above or as the law requires:',
        ],
        items: [
          'requests and what is recorded with them: as long as needed to handle the request and any business relationship that follows, and for our legal and accounting obligations;',
          'anonymous analytics not linked to a request: for a limited period set in our retention policy, not indefinitely;',
          'cookies: for the durations listed above.',
        ],
      },
      {
        id: 'protection',
        title: 'How information is protected',
        paragraphs: [
          'The site is served over HTTPS, staff accounts are created by an administrator, each role sees only what it needs, and every form is checked on the server. No website or storage system is free of risk, which is one more reason we collect only what this notice describes.',
        ],
      },
      {
        id: 'requests',
        title: 'Your requests',
        paragraphs: [
          'You can ask what information we hold about you, ask us to correct it or ask us to delete it, and you can withdraw a request you sent. We answer within a reasonable time, subject to the obligations that apply to us, and we may need to confirm that the request comes from you. Depending on the law that applies to you, you may have further rights.',
          'To make a request, contact our team on WhatsApp or through the form at the bottom of this page, and mention that it is a privacy request.',
        ],
        kind: 'contact',
      },
      {
        id: 'changes',
        title: 'Changes to this notice',
        paragraphs: [
          'We update this page when the way the website handles information changes. The date at the top shows the current version.',
        ],
      },
    ] as LegalSection[],
  },

  terms: {
    title: 'Terms of Use',
    lead: 'The terms for using this website. The services we provide to clients are governed by a separate written agreement.',
    sections: [
      {
        id: 'about',
        title: 'About these terms',
        paragraphs: [
          'These terms apply when you use this website. By using it, you accept them; if you do not agree, please do not use the site. In these terms, "we" means the team that operates this website.',
        ],
      },
      {
        id: 'information',
        title: 'Information on this site',
        paragraphs: [
          'The site describes our software, our implementation approach and our services in general terms. It is not an offer, a quotation or a commitment to deliver a particular feature, integration or result. Examples and interface concepts use sample data and may differ from what is agreed for your business. We may change the site at any time.',
        ],
      },
      {
        id: 'requests',
        title: 'Consultation and demo requests',
        paragraphs: [
          'Sending a form, clicking a WhatsApp button or talking with our team does not create a contract. Scope, deliverables, timeline, pricing and responsibilities are set only in a separate written agreement accepted by both parties. The needs estimate on the pricing page is an indication for discussion, not a quotation.',
        ],
      },
      {
        id: 'software',
        title: 'Software and implementation',
        paragraphs: [
          'What a client platform contains, including its features, integrations and security controls, depends on the scope agreed for each project. Pages about compensation plans, integrations or security explain what we discuss and plan with you; they do not mean that a capability is available for your business before it is agreed.',
        ],
      },
      {
        id: 'growth',
        title: 'Growth services',
        paragraphs: [
          'For social media, SEO and content, digital advertising and branding, we agree the scope and approach with you. Results depend on many factors outside our control, such as the market, the platforms, budgets and your product. We do not promise specific outcomes such as search positions, follower numbers, leads, return on ad spend or sales.',
        ],
      },
      {
        id: 'maklon',
        title: 'Product development and maklon',
        paragraphs: [
          'An inquiry about product development or maklon does not form a manufacturing agreement. Formulation, minimum order quantity, regulatory scope such as product registration, production, timelines and pricing are determined in a separate scope agreed in writing.',
        ],
      },
      {
        id: 'ip',
        title: 'Intellectual property',
        paragraphs: [
          'The text, design, graphics and logos on this site belong to us or to their respective owners. You may view the site, share links to it, and print or save pages for your own reference. Copying, republishing or commercial use requires our written permission.',
        ],
      },
      {
        id: 'acceptable-use',
        title: 'Acceptable use',
        paragraphs: ['Please use the site lawfully. Do not:'],
        items: [
          'send false or misleading information, someone else’s details, or spam through the forms;',
          'try to access the back office, accounts or data you are not authorised to use;',
          'probe, scan or test the site’s security, or overload it with automated requests, without our written permission;',
          'misuse WhatsApp references or other identifiers from the site;',
          'copy the site’s content in bulk with automated tools.',
        ],
        after: [
          'If you believe you have found a security issue, please tell us through the contact options below instead of testing further.',
        ],
      },
      {
        id: 'availability',
        title: 'Availability',
        paragraphs: [
          'We work to keep the site available and accurate, but we provide it as it is and may change, suspend or remove parts of it. The site may be unavailable at times, for example during maintenance.',
        ],
      },
      {
        id: 'third-parties',
        title: 'Third-party services and links',
        paragraphs: [
          'The site uses or links to services run by others, such as WhatsApp and the font service that delivers the site’s typefaces. Their own terms and policies apply, and we are not responsible for their content or availability.',
        ],
      },
      {
        id: 'liability',
        title: 'Limitation of liability',
        paragraphs: [
          'To the extent the law allows, we are not liable for indirect or consequential loss, or for decisions made only on the basis of the general information on this site. Nothing in these terms limits liability that cannot be limited by law.',
        ],
      },
      {
        id: 'privacy',
        title: 'Privacy',
        paragraphs: ['How we handle information is described in our Privacy Notice.'],
        kind: 'privacy-link',
      },
      {
        id: 'changes',
        title: 'Changes to these terms',
        paragraphs: [
          'We may update these terms. The date at the top shows the current version, and using the site after a change means you accept the updated terms.',
        ],
      },
      {
        id: 'contact',
        title: 'Contact',
        paragraphs: ['Questions about these terms? Contact our team.'],
        kind: 'contact',
      },
    ] as LegalSection[],
  },

  cookies: {
    caption: 'Cookies this website sets',
    headers: { name: 'Cookie', purpose: 'Purpose', duration: 'Duration' },
    rows: [
      {
        name: 'Session',
        cookies: 'adonis-session, XSRF-TOKEN',
        purpose:
          'Keeps a visit together between pages: form protection, the message shown after a form is sent, and how you arrived during the visit. Also keeps staff signed in to the back office.',
        duration: '2 hours after your last activity',
      },
      {
        name: 'Preferences',
        cookies: 'mlmsoft_locale, mlmsoft_theme',
        purpose: 'Remembers the language and colour theme you chose.',
        duration: '1 year',
      },
      {
        name: 'Analytics',
        cookies: 'mlmsoft_visitor, mlmsoft_visit',
        purpose: 'The random visitor ID and the current visit. Not set when analytics is off.',
        duration: '90 days; the visit ends after 30 minutes without activity',
      },
      {
        name: 'Analytics choice',
        cookies: 'mlmsoft_tracking',
        purpose: 'Remembers that you turned analytics off.',
        duration: '1 year',
      },
    ],
  },

  preference: {
    title: 'Analytics on this browser',
    status: {
      on: 'On. Visits from this browser are counted with a random ID.',
      off: 'Off. You turned analytics off for this browser.',
      gpc: 'Off. Your browser sends Global Privacy Control, so this browser is not counted.',
      disabled: 'Off. First-party analytics is currently switched off for every visitor.',
    },
    turnOff: 'Turn analytics off',
    turnOn: 'Turn analytics back on',
    saving: 'Saving…',
  },

  contact: {
    form: 'Go to the form',
  },

  privacyLink: 'Read the Privacy Notice',

  form: {
    title: 'Contact our team',
    text: 'Questions about privacy, these terms or our services. We reply by email or WhatsApp.',
  },
}

export default legal
