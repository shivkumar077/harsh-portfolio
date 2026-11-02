# Editfolio — Visual Customization Guide

Welcome to your new video editing portfolio template! This template includes an interactive, browser-based **Visual Customizer** that lets you personalize your portfolio in real time without writing code or editing configuration files manually.

---

## ⚡ Quick 30-Second Start

1. Start your local development server:
   ```bash
   npm run dev
   ```
2. Open the Visual Customizer in your browser:
   ```
   http://localhost:5173/customize
   ```
3. Personalize your name, photo, video projects, and contact channels.
4. Preview your website live inside the dashboard on desktop and mobile.
5. Click **Save Draft** to store your changes locally.
6. When satisfied, switch to the **Export & Deploy** tab and click **Download portfolioData.ts**.
7. Replace `src/data/portfolioData.ts` in your project folder with the downloaded file!

---

## 🎨 What You Can Customize

### 1. Personal Information & Bio
* **Brand Name / Display Name**: Updates your logo in the navigation bar, hero marquee, copyright, and page headers.
* **Professional Title**: Displayed under your name, in metadata, and in section tags (e.g. *Freelance Video Editor & Colorist*).
* **Tagline & Hero Statement**: The primary pitch visitors see above the fold.
* **Editorial & Brand Punchlines**: High-impact editorial typography across the home page.
* **About Bio**: Multi-paragraph storytelling section. You can add, edit, or remove paragraphs freely.
* **Profile Photo**:
  * Click **Upload From Computer** to select any JPG or PNG from your computer.
  * While editing in the browser, your image previews instantly.
  * For permanent builds, click **Download for public/ folder**, save the file into `porfolio/public/` (e.g. `public/my-photo.jpg`), and enter `/my-photo.jpg` in the photo path field.

---

### 2. Video Project Management
Video deliverables are the core of your portfolio. In the **Video Projects** tab, you can:
* **Add a New Project**: Click **+ Add Project** to create a new case study.
* **Edit Existing Projects**: Change title, category, year, description, and client name.
* **Reorder Projects**: Use the **↑ Move Up** and **↓ Move Down** arrows to organize deliverables in the exact sequence you want them to appear in the dual marquee tracks and archive grid.
* **Delete Projects**: Click the trash icon. A confirmation dialog will pop up to prevent accidental deletion.
* **Feature Projects**: Toggle **Feature on Homepage Showreel & Marquee** on your top deliverables.

---

## 🎬 Adding Videos to Projects (Two Methods)

The Visual Customizer at `/customize` gives you two direct ways to add videos to your projects:

### Method 1: Upload Video From Your Device (Easiest)
* Click **"1. Upload from Device"** in the project editor.
* Select or drag & drop any `.mp4`, `.webm`, or `.mov` video file directly from your computer.
* **Instant Frame Extraction**: The customizer automatically captures a high-resolution frame from the 1st second of your video as the project thumbnail!
* **Instant Autoplay**: The live preview starts playing your exact video on loop immediately.
* **Device Storage**: The video file is saved in browser IndexedDB so it stays loaded and plays across all pages even if you refresh your browser.
* When ready to export, download your video file from the **Export & Deploy** tab and place it into `public/`.

### Method 2: Paste Video Link
Click **"2. Paste Video Link"** to attach a hosted video URL:

#### A. Google Drive (Direct Autoplay Streaming & 4K Deliverables)
* Paste your Google Drive sharing link (e.g. `https://drive.google.com/file/d/.../view?usp=sharing`).
* **Important**: Ensure General Access is set to **"Anyone with the link can view"**.
* Editfolio automatically generates direct autoplay streams and high-resolution thumbnail posters.

#### B. YouTube (Videos & Shorts)
* Paste any YouTube video URL, YouTube Shorts link, or shortened `youtu.be` link.
* Autoplays muted on loop in cards and automatically fetches the YouTube thumbnail.

#### C. Vimeo
* Paste any public Vimeo link (e.g. `https://vimeo.com/76979871`).
* Embedded with background loop autoplay and zero branding overlays.

#### D. Direct MP4 / Cloud CDN URL
* Enter any direct video link (e.g. `https://my-cdn.com/edit.mp4` or `/my-reel.mp4`).

---

## 📞 Contact Channels & Socials

* **WhatsApp Link Prefill**: Enter your country code and phone number (digits only, e.g. `15550192834`). The website automatically crafts pre-filled greetings so clients can start a chat in one click:
  > *"Hi Alex, I saw your portfolio and want to collaborate on a video project!"*
* **Gmail / Direct Email**: Configures the 1-click inquiry composer button.
* **Social Links**: Instagram, LinkedIn, and YouTube channel URLs.
* **Google Drive Master Folder**: Your central vault where clients can browse your complete archive.

---

## ⭐ Client Reviews & Testimonials

Build trust and win high-ticket video editing clients with social proof:

* **Add New Review**: Click **+ Add New Review** to add quotes from creators, brands, or creative directors you've collaborated with.
* **Outcome Badges**: Highlight concrete client results (e.g. `600K+ Views on Reel`, `3.2x ROAS on Ads`, `24h Fast Delivery`).
* **Live Animated Marquee**: Reviews automatically stream along the animated marquee on your homepage with 5-star ratings and client initials.
* **Edit or Delete**: Remove demo reviews with one click or edit them to add your own real client feedback.

---

## 💾 Exporting & Applying Changes to Your Code

Browsers cannot silently overwrite files on your hard drive for security reasons. Here is how you apply your customized configuration permanently:

1. In the Visual Customizer, switch to the **Export & Deploy** tab.
2. Click **Download portfolioData.ts**.
3. Move the downloaded `portfolioData.ts` into:
   ```
   porfolio/src/data/portfolioData.ts
   ```
   *(Confirm "Replace file" when prompted by your operating system).*
4. If you uploaded new images, download each image from the list and move them into `porfolio/public/`.
5. Run `npm run build` in your terminal to verify everything compiles cleanly!

---

## 🔄 Recovering From Mistakes & Resetting

* **Restore Default Template Data**: In the top navigation bar of `/customize`, click **Reset**. You will be prompted to confirm, and the dashboard will restore the original template data.
* **Backup Configuration**: In the **Export & Deploy** tab, click **Export Backup (JSON)** to save a copy of your settings. You can re-import this JSON anytime by clicking **Import JSON**.
