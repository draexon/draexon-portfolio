# DRAEXON — Portfolio
### Parthil Kukadiya · Video Editor · Music Producer · Developer

> *"Designing digital experiences through cinematography, sound synthesis, and clean code."*

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase)
![EmailJS](https://img.shields.io/badge/EmailJS-Contact-FF6B35?style=flat-square)

---

## 🔗 Live Demo
> `Coming soon — will be updated after deployment`

---

## 📌 Overview

A personal portfolio built from scratch showcasing three creative disciplines — cinematic video editing, modular music production, and full-stack software engineering. Designed with a custom **Saffron-Noir** design system inspired by heritage handloom weaving patterns and avant-garde typography.

---

## ✨ Features

- **Custom Design System** — Saffron (`#E8581A`) + Noir (`#0A0A0A`) theme with khadi weave texture overlay
- **Dark / Light Mode** — Smooth theme switching with CSS variable transitions
- **Procedural Audio Engine** — Web Audio API ambient synthesizer with live oscillator visualizer
- **Google Authentication** — Firebase Auth via Google Sign-In on contact form
- **EmailJS Contact Form** — Real email delivery with custom dark-themed HTML template
- **GitHub Live Stats** — Real-time public repo count fetched from GitHub API
- **GitHub Contribution Graph** — 53-week contribution heatmap rendered in canvas
- **Custom Cursor** — Avant-garde saffron cursor with hover/click states
- **System Monitor HUD** — Live JS heap memory, DOM node count, scroll position overlay
- **CV Modal** — Printable resume viewer with print-optimized CSS
- **Smooth Scroll Navigation** — IntersectionObserver-based active section detection
- **Fully Responsive** — Mobile first, works on all screen sizes

---

## 🗂️ Sections

| Section | Description |
|---|---|
| **Home** | Hero with animated role cycling, social links, portrait |
| **Work** | Filterable portfolio grid (Edits / Music / Code) |
| **Edits** | Cinematic video editing showcase with software stats |
| **Music** | Track listings with live procedural audio playback |
| **Code** | GitHub contribution graph, language bars, live stats |
| **Blog** | Editorial essay — "Why Handloom and UI Design Think the Same Way" |
| **Contact** | Google Auth + EmailJS contact form |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| Audio | Web Audio API (custom engine) |
| Auth | Firebase Authentication (Google) |
| Email | EmailJS |
| Icons | Lucide React |
| Fonts | Playfair Display · DM Sans · JetBrains Mono |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/draexon/draexon-portfolio.git

# Navigate into the project
cd draexon-portfolio

# Install dependencies
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Social Links
VITE_GITHUB_URL=https://github.com/your_username
VITE_LINKEDIN_URL=https://linkedin.com/in/your_username
VITE_DISCORD_URL=https://discord.gg/your_invite
VITE_INSTAGRAM_URL=https://instagram.com/your_handle
VITE_SPOTIFY_URL=https://open.spotify.com/artist/your_id

# Portrait Images
VITE_PORTRAIT_DARK_URL=your_dark_image_url
VITE_PORTRAIT_LIGHT_URL=your_light_image_url

# Music Platform Links
VITE_MUSIC_SPOTIFY_URL=https://open.spotify.com/artist/your_id
VITE_MUSIC_SOUNDCLOUD_URL=https://soundcloud.com/your_profile
VITE_MUSIC_BANDCAMP_URL=https://your_name.bandcamp.com
VITE_MUSIC_YOUTUBE_MUSIC_URL=https://music.youtube.com/@your_channel

# EmailJS
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id

# GitHub
VITE_GITHUB_USERNAME=your_github_username
```

### Run Development Server

```bash
npm run dev
```

Open `http://localhost:3000`

### Build for Production

```bash
npm run build
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

> ⚠️ Add all `VITE_` environment variables in your Vercel project dashboard under **Settings → Environment Variables** before deploying.

### Firebase Auth — Authorized Domains
After deploying, add your live domain in:
**Firebase Console → Authentication → Settings → Authorized Domains**

---

## 📁 Project Structure

```
draexon-portfolio/
├── public/
│   └── portrait.png          # Your portrait image
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HomeSection.tsx
│   │   ├── WorkSection.tsx
│   │   ├── EditsSection.tsx
│   │   ├── MusicSection.tsx
│   │   ├── CodeSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── CvModal.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── SystemMonitor.tsx
│   │   ├── Visualizer.tsx
│   │   └── SectionContainer.tsx
│   ├── firebase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env                      # Your environment variables (never commit this)
├── .env.example              # Template with placeholder values
└── README.md
```

---

## ⚙️ Services Setup

| Service | Purpose | Free Tier |
|---|---|---|
| [EmailJS](https://emailjs.com) | Contact form email delivery | 200 emails/month |
| [Firebase](https://firebase.google.com) | Google Authentication | Unlimited auth |
| [GitHub API](https://api.github.com) | Live repo stats | Unlimited public |

---

## 📄 License

MIT — free to use and modify.

---

<div align="center">
  <strong>DRAEXON © 2026</strong><br/>
  <sub>HERITAGE WEAVE // AVANT-GARDE COMPUTER</sub>
</div>
