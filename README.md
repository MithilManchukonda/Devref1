# DevRef — Developer Cheat Sheet App

A personal syntax reference and cheat-sheet tool built for daily use while learning to code. Search, filter, bookmark, and contribute your own code snippets across 8 languages and tools — Python, HTML, CSS, JavaScript, React, Java, DevOps, and AWS.

**Live demo:** _add your Vercel/Firebase URL here after deploying_

---

## Why I built this

As a B.Tech CS student, I kept forgetting small syntax details across the many languages I was learning at once. Instead of searching Google every time, I built DevRef — a single place with quick, searchable code references, plus the ability to add my own notes as I learn new things.

## Features

- **24+ pre-built snippets** across 8 languages, each with a description, code block, and expected output
- **Click-to-expand animation** — click any card to reveal the code's output with a smooth Framer Motion transition
- **One-click copy** — copy any snippet straight to your clipboard with a toast confirmation
- **Live search** — filters by title, description, or code content as you type
- **Language filter pills** — instantly narrow the grid to one language
- **Bookmarks** — save your most-used snippets to your account
- **Add your own notes** — logged-in users can contribute new snippets that appear instantly for everyone
- **Authentication** — Google sign-in or email/password, powered by Firebase Auth
- **Dark, neon-accented UI** — a custom design distinct from typical AI-generated templates

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Auth & Database | Firebase (Authentication + Firestore) |
| Notifications | react-hot-toast |
| Hosting | Firebase Hosting / Vercel (free tier) |

## Project structure

```
devref/
├── src/
│   ├── components/      # Navbar, SnippetCard, AddNoteModal, AuthModal, LanguageFilter
│   ├── hooks/            # useAuth, useSnippets (Firestore logic)
│   ├── data/             # Pre-built seed snippets + language color tokens
│   ├── App.jsx
│   ├── firebase.js       # Firebase config
│   └── index.css
├── package.json
└── README.md
```

## Running locally

1. Clone this repo and install dependencies:
   ```bash
   npm install
   ```
2. Add your own Firebase project config in `src/firebase.js` (create a free project at [firebase.google.com](https://firebase.google.com), enable **Authentication → Google + Email/Password** and **Firestore Database**).
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## Deploying

```bash
npm run build
```
Deploy the `dist/` folder to **Vercel**, **Netlify**, or **Firebase Hosting** — all free for personal projects.

## What I learned

Building this taught me React state management across multiple components, real-time data sync with Firestore's `onSnapshot`, Firebase Authentication flows, and how to design a UI with a distinct visual identity instead of default template styling.

## Future improvements

- Spaced-repetition quiz mode using the saved snippets
- Export bookmarks as a PDF cheat sheet
- Community upvoting on user-submitted snippets
