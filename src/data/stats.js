export const statsProfile = {
  githubUsername: 'octocat',
  leetcodeUsername: 'leetcode',
}

export const statsSectionContent = {
  label: 'Live Profiles',
  titleTop: 'Coding',
  titleBottom: 'Stats',
  description: 'Real-time data from my coding profiles. Refreshed on every visit.',
}

export const statsCards = {
  github: {
    id: 'github',
    short: 'GH',
    name: 'GitHub',
    colorClass: 'gh-c',
    primaryLabel: 'Public Repos',
    progress: 72,
    fallbackValue: 23,
    fallbackSubStats: [
      { label: 'Followers', value: 154 },
      { label: 'Following', value: 12 },
      { label: 'Gists', value: 8 },
    ],
  },
  leetcode: {
    id: 'leetcode',
    short: 'LC',
    name: 'LeetCode',
    colorClass: 'lc-c',
    primaryLabel: 'Problems Solved',
    progress: 54,
    fallbackValue: 312,
    fallbackSubStats: [
      { label: 'Easy', value: 178 },
      { label: 'Medium', value: 112 },
      { label: 'Hard', value: 22 },
    ],
  },
  kaggle: {
    id: 'kaggle',
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
}