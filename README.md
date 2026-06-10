# Muhammad Bilal Raza — Portfolio Website v2.0

A premium, modern Full Stack Developer portfolio built with vanilla HTML, CSS, and JavaScript.

## 📁 Folder Structure

```
Portfoilio/
├── index.html                          ← Main entry point (open this in browser)
│
├── assets/
│   ├── css/
│   │   └── style.css                   ← All styles (theme, layout, animations)
│   │
│   ├── js/
│   │   └── main.js                     ← All JavaScript (3D sphere, nav, form, etc.)
│   │
│   ├── images/
│   │   ├── profile/
│   │   │   ├── bilal.jpg               ← YOUR PROFILE PHOTO (hero section)
│   │   │   ├── bilal-about.jpg         ← YOUR ABOUT PHOTO (about section)
│   │   │   └── README.txt
│   │   │
│   │   ├── projects/
│   │   │   ├── taskflow.jpg            ← TaskFlow screenshot
│   │   │   ├── secure-api.jpg          ← Secure API screenshot
│   │   │   ├── user-management.jpg     ← User Management screenshot
│   │   │   ├── legacy-migration.jpg    ← Legacy Migration screenshot
│   │   │   └── README.txt
│   │   │
│   │   └── og/
│   │       └── og-preview.jpg          ← Social media preview image (1200x630px)
│   │
│   └── docs/
│       ├── Muhammad-Bilal-Raza-CV.pdf  ← YOUR CV (for download button)
│       └── README.txt
│
└── README.md                           ← This file
```

## 🚀 Features

- **Midnight Violet** color theme (Purple + Cyan)
- **Dark / Light** mode toggle with localStorage persistence
- **Typed.js** hero typing animation
- **Interactive 3D Sphere** — 30 tech skills rotating in 3D space (drag to rotate!)
- **Redesigned Experience** — Company showcase cards with dual-panel layout
- **Redesigned Projects** — Bento-grid with UI mockup previews + filter tabs
- **Scroll animations** via Intersection Observer API
- **Mouse parallax** on hero orbs
- **Animated stat counters** in About section
- **Client-side form validation**
- **Mobile hamburger menu**
- **Active nav link** tracking on scroll
- **SEO meta tags** + OpenGraph

## 📸 Adding Your Photos

### Profile Photo (Hero Section)
1. Add your photo as: `assets/images/profile/bilal.jpg`
2. In `index.html`, find the comment `PHOTO PLACEHOLDER — Hero` and uncomment the `<img>` tag

### About Photo
1. Add your photo as: `assets/images/profile/bilal-about.jpg`
2. In `index.html`, find the comment `PHOTO PLACEHOLDER — About` and uncomment the `<img>` tag

### Project Screenshots
1. Add screenshots as `.jpg` files in `assets/images/projects/`
2. In each project card in `index.html`, uncomment the `<img>` tag and remove the mockup div

## 📄 Adding Your CV
1. Add your CV as: `assets/docs/Muhammad-Bilal-Raza-CV.pdf`
2. The Download CV button is already linked to this path!

## 🔗 Updating Social Links
Search for these placeholder URLs in `index.html` and replace them:
- `https://github.com/bilalrazaqadri` → your GitHub URL
- `https://linkedin.com/in/bilal-raza` → your LinkedIn URL
- `https://www.fiverr.com/bilalraza` → your Fiverr URL

## 📬 Contact Form
Currently simulates form sending. To receive real emails, integrate:
- **Formspree**: Free, no backend needed — [formspree.io](https://formspree.io)
- **EmailJS**: Client-side email sending — [emailjs.com](https://emailjs.com)

Replace the `setTimeout` block in `assets/js/main.js` with the respective API call.

## 🌐 Deploying Online (Free Options)
- **GitHub Pages**: Push to GitHub → Settings → Pages → Deploy from main
- **Netlify**: Drag & drop the Portfoilio folder at [netlify.com/drop](https://netlify.com/drop)
- **Vercel**: Import GitHub repo at [vercel.com](https://vercel.com)
