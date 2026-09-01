# SIH-project

Demo SkillConnect Academician dashboard. This repository contains a minimal Next.js + TypeScript + Tailwind demo for the Academician dashboard.

To run locally:

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Open http://localhost:3000/academician

Notes:
- Tailwind is required. If styles don't appear, ensure `styles/globals.css` is imported in `pages/_app.tsx` and that `tailwind.config.js` content paths include `./pages` and `./components`.
- This is a demo with mock data; connect to your backend or Supabase for real data.
