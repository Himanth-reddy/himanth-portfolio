import { GITHUB_STATS } from '../hooks/useGithubStats.js'
import { LEETCODE_STATS } from '../hooks/useLeetcodeStats.js'

export const siteContent = {
  brand: {
    shortName: 'YK',
    mark: '.',
    footerCopy: 'Copyright 2026. Built with React + Tailwind.',
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
      label: 'Hire Me',
      href: '#contact',
    },
  },
  hero: {
    kicker: 'Available for internships and freelance',
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
        href: 'https://drive.google.com/file/d/replace-with-your-cv-id/view',
      },
    },
    terminal: {
      path: '~/portfolio',
      command: '> whoami',
      output: [
          'AIML student @ Warangal, India',
      ],
    },
  },
  marquee: {
    ariaLabel: 'Skills ticker',
    items: [
      'React',
      'Machine Learning',
      'Kaggle Top 12%',
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
      { id: 'web', label: 'React' },
    ],
    items: [
      {
        id: 'credit-risk-classifier',
        category: 'ml',
        type: 'Kaggle Competition',
        title: 'Credit Risk Classifier',
        description:
          'Ensemble model predicting loan defaults. Top 8% leaderboard using XGBoost and advanced feature engineering.',
        tags: ['Python', 'XGBoost', 'Pandas', 'SHAP'],
        links: [
          { label: 'GitHub', href: '#' },
          { label: 'Kaggle', href: '#' },
        ],
      },
      {
        id: 'devboard-task-manager',
        category: 'web',
        type: 'React Web App',
        title: 'DevBoard - Task Manager',
        description:
          'Kanban-style task manager with drag and drop, real-time sync, and team collaboration workflows.',
        tags: ['React', 'Tailwind', 'Firebase', 'DnD'],
        links: [
          { label: 'Live Demo', href: '#' },
          { label: 'GitHub', href: '#' },
        ],
      },
      {
        id: 'sentimentai-dashboard',
        category: 'ml',
        type: 'Hackathon - 2nd Place',
        title: 'SentimentAI Dashboard',
        description:
          'Real-time social sentiment analysis processing high-volume streams with a fine-tuned transformer pipeline.',
        tags: ['BERT', 'React', 'FastAPI', 'HuggingFace'],
        links: [
          { label: 'Live Demo', href: '#' },
          { label: 'GitHub', href: '#' },
        ],
      },
      {
        id: 'campus-mentor-ai',
        category: 'web',
        type: 'Full Stack AI Tool',
        title: 'Campus Mentor AI',
        description:
          'Student support assistant that recommends resources, answers campus FAQs, and routes queries through a lightweight RAG workflow.',
        tags: ['React', 'Node.js', 'OpenAI API', 'Vector Search'],
        links: [
          { label: 'Live Demo', href: '#' },
          { label: 'GitHub', href: '#' },
        ],
      },
    ],
  },
  stats: {
    profile: {
      githubUsername: 'octocat',
      leetcodeUsername: 'leetcode',
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
        href: 'https://github.com/yourhandle',
        short: 'GH',
        name: 'GitHub',
        colorClass: 'gh-c',
        primaryStat: GITHUB_STATS.publicRepos,
        progress: 72,
        fallbackMetrics: {
          [GITHUB_STATS.publicRepos.key]: 23,
          [GITHUB_STATS.followers.key]: 154,
          [GITHUB_STATS.following.key]: 12,
          [GITHUB_STATS.gists.key]: 8,
        },
        subStats: [GITHUB_STATS.followers, GITHUB_STATS.following, GITHUB_STATS.gists],
      },
      {
        id: 'leetcode',
        source: 'leetcode',
        href: 'https://leetcode.com/yourname',
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
        id: 'kaggle',
        source: 'static',
        short: 'KG',
        name: 'Kaggle',
        colorClass: 'kg-c',
        primaryText: 'Top 12%',
        primaryLabel: 'Global Rank',
        progress: 88,
        subStats: [
          { label: 'Competitions', value: 8 },
          { label: 'Notebooks', value: 14 },
          { label: 'Medals', value: 3 },
        ],
      },
      {
        id: 'codeforces',
        source: 'static',
        short: 'CF',
        name: 'Codeforces',
        colorClass: 'gh-c',
        primaryText: 'Pupil',
        primaryLabel: 'Current Rank',
        progress: 61,
        subStats: [
          { label: 'Rating', value: 1284 },
          { label: 'Contests', value: 19 },
          { label: 'Best', value: 1362 },
        ],
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
      { id: 'github', icon: 'GH', label: 'github.com/yourhandle', href: 'https://github.com/' },
      { id: 'linkedin', icon: 'LI', label: 'linkedin.com/in/yourname', href: 'https://linkedin.com/' },
      { id: 'kaggle', icon: 'KG', label: 'kaggle.com/yourname', href: 'https://kaggle.com/' },
      { id: 'email', icon: '@', label: 'hello@yourname.dev', href: 'mailto:hello@yourname.dev' },
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
