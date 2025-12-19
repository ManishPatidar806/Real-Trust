export const SITE_CONTENT = {
  hero: {
    badge: '✨ Design & Development',
    title: 'We Build Digital',
    titleHighlight: 'Products That Matter',
    subtitle: 'From concept to launch, we create web experiences that people actually enjoy using. No fluff, just results.',
    cta: {
      primary: 'See Our Work',
      secondary: "Let's Talk"
    }
  },
  about: {
    label: 'Who We Are',
    title: "We're not your typical agency",
    description: [
      "Started in 2020, we've grown from a two-person team to a full-fledged studio. What hasn't changed? Our obsession with quality and our belief that good design should be accessible to everyone.",
      "We work with startups, established businesses, and everyone in between. Whether you need a simple landing page or a complex web application, we've got your back."
    ],
    tags: ['Web Design', 'Development', 'Branding', 'UI/UX'],
    stats: [
      { value: '100+', label: 'Projects delivered' },
      { value: '50+', label: 'Happy clients worldwide' },
      { value: '5 Years', label: 'Of making cool stuff' }
    ]
  },
  projects: {
    label: 'Portfolio',
    title: 'Recent Work',
    subtitle: "Check out some projects we're proud of. Each one was a unique challenge that taught us something new.",
    emptyState: "No projects available yet. Check back soon!"
  },
  clients: {
    label: 'Testimonials',
    title: 'What people are saying',
    subtitle: "Here's what some of our clients have to say. We're grateful for every kind word.",
    emptyState: "No client testimonials available yet. Check back soon!"
  },
  contact: {
    label: 'Contact',
    title: "Let's start a conversation",
    subtitle: 'Got a project idea? Need help with something? Just want to say hi? Drop us a message.',
    fields: {
      name: 'Your name',
      email: 'Email address',
      phone: 'Phone',
      city: 'City'
    },
    button: 'Send message',
    success: 'Thanks! Your message has been sent. We\'ll get back to you soon.',
    error: 'Oops! Something went wrong. Please try again.'
  },
  newsletter: {
    title: 'Stay in the loop',
    subtitle: 'Get updates on new projects, design tips, and occasional behind-the-scenes content.',
    placeholder: 'your@email.com',
    button: 'Subscribe',
    success: 'Successfully subscribed! Welcome aboard.',
    alreadySubscribed: 'This email is already subscribed.',
    error: 'Failed to subscribe. Please try again.'
  },
  footer: {
    tagline: 'Making the web a better place, one pixel at a time.',
    sections: {
      navigation: 'Navigation',
      contact: 'Get in Touch'
    },
    copyright: 'Built with care.',
    contact: {
      email: 'manish@gmail.com',
      phone: '+91 xxxxx-xxxxx'
    }
  }
};

// Navigation Links
export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#clients', label: 'Clients' },
  { href: '#contact', label: 'Contact' }
];

// Form Placeholders
export const FORM_PLACEHOLDERS = {
  contact: {
    name: 'Manish Patidar',
    email: 'manish@gmail.com',
    phone: '+91 xxxxx-xxxxx',
    city: 'Pithampur'
  }
};
