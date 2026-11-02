# Quick Start Guide

Get your video editing portfolio up and running on your local machine in under 3 minutes.

---

## 📋 Prerequisites

Ensure you have **Node.js** installed on your computer:
* Recommended version: **Node.js 18 or newer** (Node 20+ LTS recommended).
* Check by running `node -v` in your terminal or Command Prompt.
* If you don't have Node.js, download it free from [nodejs.org](https://nodejs.org).

---

## 🚀 3-Step Setup

### Step 1: Open Terminal & Install Dependencies
Open your terminal (Terminal on macOS / Command Prompt or PowerShell on Windows) inside your project directory and run:

```bash
npm install
```

### Step 2: Start the Local Development Server
Run the local dev command:

```bash
npm run dev
```

You will see output similar to:
```
  VITE v8.2.2  ready in 240 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 3: Open the Visual Customizer
Open your browser and navigate to:
```
http://localhost:5173/customize
```
You can now customize your entire portfolio (name, bio, videos, contact details, reviews) using the visual dashboard!

### Step 4: Click "Save Changes" & Deploy
1. In the top bar of the Customizer, click **Save Changes**. This automatically syncs your personal details directly into `src/data/portfolioData.ts` on your computer!
2. Test your production build:
   ```bash
   npm run build
   ```
3. Push to GitHub and deploy to **Vercel** or **Netlify** (see [DEPLOYMENT.md](DEPLOYMENT.md) for 60-second instructions).
Your live site will now display your real name, videos, and contact channels!

---

## 🛠 Available Terminal Commands

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:5173` |
| `npm run build` | Compiles your site into an optimized production bundle in `dist/` |
| `npm run preview` | Previews the production build locally before deploying |
| `npm run lint` | Runs the ultra-fast Oxlint linter to verify code cleanliness |

---

## 🎯 Next Steps

* Read [CUSTOMIZATION.md](CUSTOMIZATION.md) for instructions on personalizing your name, bio, video links, and photos.
* Read [DEPLOYMENT.md](DEPLOYMENT.md) for 1-click free deployment to Vercel or Netlify.
