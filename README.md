# Portfolio

Personal portfolio built with React, Vite, GSAP, and Tailwind CSS.

## Stack

- React 19
- Vite 8
- Tailwind CSS 3
- GSAP
- EmailJS

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

5. Run lint:

```bash
npm run lint
```

## Main Editing Flow

Most editable content now lives in:

- [src/data/siteContent.js](/home/himanth/github/portfolio/src/data/siteContent.js)

Use that file to update:

- brand text
- navbar labels and links
- hero text and CV link
- marquee items
- about section text and skills
- projects and project links
- coding stats cards and profile links
- contact section text and contact links
- footer content

## Project Structure

- [src/data/siteContent.js](/home/himanth/github/portfolio/src/data/siteContent.js): single source of editable content
- [src/sections/Hero.jsx](/home/himanth/github/portfolio/src/sections/Hero.jsx): hero section
- [src/sections/About.jsx](/home/himanth/github/portfolio/src/sections/About.jsx): about section
- [src/sections/Projects.jsx](/home/himanth/github/portfolio/src/sections/Projects.jsx): projects section with horizontal scrolling and arrow control
- [src/sections/LiveStats.jsx](/home/himanth/github/portfolio/src/sections/LiveStats.jsx): coding stats tiles
- [src/sections/Contact.jsx](/home/himanth/github/portfolio/src/sections/Contact.jsx): contact form
- [src/styles/index.css](/home/himanth/github/portfolio/src/styles/index.css): main styling

## Dynamic Stats

GitHub and LeetCode data are fetched by custom hooks:

- [src/hooks/useGithubStats.js](/home/himanth/github/portfolio/src/hooks/useGithubStats.js)
- [src/hooks/useLeetcodeStats.js](/home/himanth/github/portfolio/src/hooks/useLeetcodeStats.js)

These hooks also export stat constants used by the content layer.

In `siteContent.stats.cards`, dynamic cards can define:

- `source`: which hook-backed source to use, for example `github` or `leetcode`
- `primaryStat`: the main stat constant to display
- `subStats`: the stat constants to show below
- `fallbackMetrics`: backup values if the API is unavailable
- `href`: optional profile URL, making the tile clickable

Static tiles like Kaggle can use:

- `primaryText`
- `subStats`
- `progress`    
- `href` if needed

## Contact Form

The contact form uses EmailJS. Set these environment variables in your `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If these are missing, the form will show a configuration error in the UI.

## GitHub Commit Totals

`useGithubStats` can also return `totalCommits`, sourced from GitHub GraphQL as current-year commit contributions.

Add this optional environment variable if you want commit totals:

```env
VITE_GITHUB_TOKEN=your_github_token
```

Without a token, the hook still returns the existing REST-based stats and falls back to `totalCommits: 0`.

## Deployment

This project is configured for static deployment on Vercel.

Recommended Vercel settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

Also add the EmailJS environment variables in Vercel project settings if you use the contact form.
