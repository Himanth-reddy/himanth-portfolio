import { GITHUB_STATS } from '../hooks/useGithubStats.js'
import { LEETCODE_STATS } from '../hooks/useLeetcodeStats.js'
import { CODEFORCES_STATS } from '../hooks/useCodeforcesStats.js'

export const siteContent = {
  brand: {
    shortName: 'HR',
    mark: '.',
    footerCopy: 'Built with React + Tailwind.',
  },
  navigation: {
    links: [
      { label: 'Home', href: '#hero' },
      { label: 'About', href: '#about' },
      { label: 'Projects', href: '#projects' },
      { label: 'Stats', href: '#stats' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: {
      label: 'Contact Me',
      href: '#contact',
    },
  },
  hero: {
    kicker: 'Available for internships',
    titleLines: [
      { text: 'Building', style: 'solid' },
      { text: 'Things That', style: 'solid', offset: true },
      { text: 'Learn.', style: 'outline' },
    ],
    description: 'AIML student crafting intelligent models and bold web experiences.',
    actions: {
      primary: {
        label: 'View My Work',
        href: '#projects',
      },
      secondary: {
        label: 'Download CV',
        href: 'https://drive.google.com/uc?export=download&id=1PHQ0vnQbuXLIsmqy_rYqLdmrDomElWRV',
      },
    },
    terminal: {
      path: '~/portfolio',
      command: 'whoami',
      output: [
        {
          accent: 'AIML Student',
          accentColor: 'green',
          detail: '@ Surampalem, India',
        },
        {
          accent: 'React',
          accentColor: 'orange',
          detail: '+ Machine Learning',
        },
        {
          accent: 'Open',
          accentColor: 'violet',
          detail: 'to opportunities',
        },
      ],
    },
  },
  marquee: {
    ariaLabel: 'Skills ticker',
    items: [
      'React',
      'Machine Learning',
      'PyTorch',
      'Open to Opportunities',
      'Tailwind CSS',
      'NLP & Transformers',
    ],
  },
  about: {
    sectionLabel: 'About Me',
    headingMain: 'AIML',
    headingAccent: 'Dev',
    headingSuffix: '& Builder',
    paragraphs: [
      'Passionate AIML student building things at the intersection of machine learning and the web. From training models on Kaggle to shipping React apps, I turn ideas into reality.',
      'Currently deep in transformers, NLP, and frontend architecture. I believe the best AI work is the kind people can actually use.',
    ],
    nowText: 'Currently - LLM fine-tuning and production UI systems',
    skillGroups: [
      {
        category: 'AI / Machine Learning',
        items: [
          { name: 'Python', hot: true },
          { name: 'PyTorch', hot: true },
          { name: 'Scikit-learn', hot: true },
          { name: 'TensorFlow', hot: false },
          { name: 'XGBoost', hot: false },
          { name: 'Pandas', hot: true },
          { name: 'NLP', hot: false },
          { name: 'Kaggle', hot: false },
        ],
      },
      {
        category: 'Web Development',
        items: [
          { name: 'React', hot: true },
          { name: 'Tailwind CSS', hot: true },
          { name: 'Next.js', hot: false },
          { name: 'TypeScript', hot: false },
          { name: 'REST APIs', hot: false },
          { name: 'GSAP', hot: true },
        ],
      },
      {
        category: 'Tools',
        items: [
          { name: 'Git', hot: false },
          { name: 'Jupyter', hot: false },
          { name: 'Vercel', hot: false },
          { name: 'Google Colab', hot: false },
        ],
      },
    ],
  },
  projects: {
    sectionLabel: 'Selected Work',
    title: 'Projects',
    filters: [
      { id: 'all', label: 'All' },
      { id: 'ml', label: 'ML / AI' },
      { id: 'web', label: 'Web Apps' },
    ],
    items: [
  {
    id: 'lens-of-judgment',
    category: 'web',
    type: 'Full Stack Web App',
    title: 'Lens of Judgment',
    description:
      'Full-stack movie review platform with a custom 4-tier rating system, 15+ RESTful API endpoints, TMDB integration, community features, and JWT authentication.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'JWT', 'TMDB API'],
    links: [
      { label: 'Live Demo', href: 'https://lens-of-judgment.onrender.com/' },
      { label: 'GitHub', href: 'https://github.com/Himanth-reddy/lens-of-judgment-app' },
    ],
  },
  {
    id: 'amantra-pwa',
    category: 'web',
    type: 'Progressive Web App',
    title: 'Amantra — Digital Bond Management',
    description:
      'PWA that digitizes informal financial agreements between local vendors and customers with real-time Firestore, QR sharing, audit logging, and CI/CD via GitHub Actions.',
    tags: ['JavaScript', 'Firebase', 'Firestore', 'Tailwind CSS', 'PWA', 'CI/CD'],
    links: [
      { label: 'Live Demo', href: 'https://amantra-360.web.app/signin.html' },
      { label: 'GitHub', href: 'https://github.com/Manindra-babu/Amantra' },
    ],
  },
  {
    id: 'collabx',
    category: 'web',
    type: 'Hackathon Project',
    title: 'CollabX — Hackathon Team Finder',
    description:
      'Platform for skill-based teammate discovery and team formation with 10+ REST API endpoints, relational schema on Supabase (PostgreSQL), and IaC deployment on Render.',
    tags: ['React 19', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'JWT'],
    links: [
      { label: 'GitHub', href: 'https://github.com/WHENKEY2007/Hackathon_Project' },
    ],
  },
],
  },
  stats: {
    profile: {
      githubUsername: 'Himanth-reddy',
      leetcodeUsername: 'himanth_reddy',
      codeforcesUsername: 'himanth_reddy',
    },
    section: {
      label: 'Live Profiles',
      titleTop: 'Coding',
      titleBottom: 'Stats',
      description: 'Real-time data from my coding profiles. Refreshed on every visit.',
    },
    cards: [
      {
        id: 'github',
        source: 'github',
        href: 'https://github.com/Himanth-reddy',
        short: 'GH',
        name: 'GitHub',
        colorClass: 'gh-c',
        primaryStat: GITHUB_STATS.publicRepos,
        progress: 72,
        fallbackMetrics: {
          [GITHUB_STATS.publicRepos.key]: 23,
          [GITHUB_STATS.followers.key]: 154,
          [GITHUB_STATS.following.key]: 12,
          [GITHUB_STATS.totalCommits.key]: 300,
        },
        subStats: [GITHUB_STATS.totalCommits, GITHUB_STATS.followers, GITHUB_STATS.following,],
      },
      {
        id: 'leetcode',
        source: 'leetcode',
        href: 'https://leetcode.com/u/himanth_reddy/',
        short: 'LC',
        name: 'LeetCode',
        colorClass: 'lc-c',
        primaryStat: LEETCODE_STATS.solved,
        progress: 54,
        fallbackMetrics: {
          [LEETCODE_STATS.solved.key]: 312,
          [LEETCODE_STATS.easy.key]: 178,
          [LEETCODE_STATS.medium.key]: 112,
          [LEETCODE_STATS.hard.key]: 22,
        },
        subStats: [LEETCODE_STATS.easy, LEETCODE_STATS.medium, LEETCODE_STATS.hard],
      },
      {
        id: 'codeforces',
        source: 'codeforces',
        short: 'CF',
        name: 'Codeforces',
        colorClass: 'gh-c',
        primaryStat: CODEFORCES_STATS.rank,
        progress: 61,
        fallbackMetrics: {
          [CODEFORCES_STATS.rank.key]: 'Pupil',
          [CODEFORCES_STATS.rating.key]: 1284,
          [CODEFORCES_STATS.contests.key]: 19,
          [CODEFORCES_STATS.bestRating.key]: 1362,
        },
        subStats: [CODEFORCES_STATS.rating, CODEFORCES_STATS.contests, CODEFORCES_STATS.bestRating],
      },
    ],
  },
  contact: {
    section: {
      label: 'Get In Touch',
      titleTop: "Let's",
      titleAccent: 'Build',
      titleBottom: 'Together',
      description:
        'Open to internships, freelance projects, and hackathon collaborations. If you have an idea, I can help shape and ship it.',
    },
    links: [
      { id: 'github', icon: 'GH', label: 'github.com/Himanth-reddy', href: 'https://github.com/Himanth-reddy' },
      { id: 'linkedin', icon: 'LI', label: 'linkedin.com/in/himanth_reddy', href: 'https://www.linkedin.com/in/himanth-reddy/' },
      { id: 'kaggle', icon: 'KG', label: 'kaggle.com/himanthreddy', href: 'https://www.kaggle.com/himanthreddytummala/' },
      { id: 'email', icon: '@', label: 'himanth421@gmail.com', href: 'mailto:himanth421@gmail.com' },
    ],
    formFields: [
      { id: 'name', label: 'Name', placeholder: 'Your name', type: 'text' },
      { id: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
      { id: 'subject', label: 'Subject', placeholder: "What's this about?", type: 'text' },
      {
        id: 'message',
        label: 'Message',
        placeholder: 'Tell me about your project...',
        type: 'textarea',
      },
    ],
  },
  footer: {
    links: [],
  },
}
