# Free Deployment Guide

Deploy your customized video editing portfolio to the web for free with global high-speed CDN hosting, automatic SSL certificates, and custom domain support.

> [!IMPORTANT]
> **Before Deploying**: Make sure you have clicked **"Save Changes"** in the Visual Customizer (or placed your updated `portfolioData.ts` into `src/data/portfolioData.ts`).
> Vercel and Netlify build your website from the project files on your computer. If you deploy without saving, your live site will display the default template!

---

## ⚡ Option 1: Deploy to Vercel (Recommended — 60 Seconds)

Vercel provides the fastest and easiest hosting for modern frontend applications.

### Steps:
1. Create a free account at [vercel.com](https://vercel.com) using your GitHub account.
2. Push your project folder to a repository on your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "My customized video editing portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. On your Vercel Dashboard, click **Add New...** → **Project**.
4. Import your portfolio repository from the list.
5. Vercel automatically detects the Vite framework settings:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
6. Click **Deploy**.
7. In about 20 seconds, your site is live at `https://your-portfolio.vercel.app`!

### Connecting a Custom Domain (e.g. `yourname.com`):
1. In your Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Type your domain name (e.g. `alexrivera.com`) and click **Add**.
3. Add the two DNS records (A Record and CNAME) provided by Vercel into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.).
4. Vercel will issue a free SSL certificate automatically within a few minutes.

---

## 🌐 Option 2: Deploy to Netlify

1. Sign up for a free account at [netlify.com](https://www.netlify.com).
2. Click **Add new site** → **Import an existing project**.
3. Select your GitHub repository.
4. Set the build settings:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
5. Click **Deploy site**.

---

## 📦 Option 3: Manual Drag-and-Drop Deploy (No Git Required)

If you don't use Git or GitHub:

1. In your project terminal, run:
   ```bash
   npm run build
   ```
2. This creates a folder named `dist` inside your project root.
3. Open [app.netlify.com/drop](https://app.netlify.com/drop).
4. Drag and drop the `dist` folder directly into your browser window.
5. Netlify will deploy your website instantly!

---

## 🔍 Pre-Launch Checklist

Before sharing your link with clients:
- [ ] Tested all Google Drive video links to verify they are set to **"Anyone with the link can view"**.
- [ ] Replaced profile image in `public/` and checked on mobile devices.
- [ ] Tested the **Chat on WhatsApp** buttons to confirm your phone number and prefilled text.
- [ ] Tested the **Send Gmail** button to verify your email address.
- [ ] Verified that `npm run build` completes without errors.
