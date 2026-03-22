# Top Gear Motors — Premium Pre-Owned Car Resale Platform

A luxury, SEO-optimised car resale platform built with **Next.js 14**, **TypeScript**, **MongoDB**, **Cloudinary**, and **NextAuth**.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd drive-elite
npm install
```

### 2. Configure Environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your real credentials:

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Connect → Drivers |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` (dev) or your Vercel URL (prod) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | [Cloudinary Dashboard](https://cloudinary.com) |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → API Keys |

### 3. Seed Admin User

Start the dev server first:

```bash
npm run dev
```

Then call the seed endpoint **once**:

```bash
curl -X POST http://localhost:3000/api/seed
```

This creates the admin user from your `.env.local` credentials (`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

> ⚠️ After seeding, the seed endpoint is disabled in production automatically.

### 4. Open the App

| URL | Purpose |
|---|---|
| `http://localhost:3000` | Public homepage |
| `http://localhost:3000/cars` | Car listing page |
| `http://localhost:3000/admin/login` | Admin login |
| `http://localhost:3000/admin/dashboard` | Admin dashboard |

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (public)/         # Public pages (homepage, cars, contact)
│   ├── admin/            # Admin panel (protected by NextAuth)
│   ├── api/              # API routes
│   ├── sitemap.ts        # Auto-generated sitemap.xml
│   └── robots.ts         # robots.txt
├── components/
│   ├── ui/               # ShadCN-style UI primitives
│   ├── layout/           # Header, Footer
│   ├── home/             # Homepage sections
│   ├── cars/             # Car listing & detail components
│   └── admin/            # Admin panel components
├── lib/                  # DB connection, Cloudinary, auth, utils
├── models/               # Mongoose schemas
└── types/                # TypeScript interfaces
```

---

## ✨ Features

### Public
- ✅ Luxury homepage with animated hero, stats, featured cars, testimonials
- ✅ Car listing page with real-time filters (brand, fuel, transmission, price)
- ✅ Paginated results
- ✅ Car detail page with image gallery, specs, WhatsApp/Call CTAs

### SEO
- ✅ `generateMetadata` per car (dynamic title, description)
- ✅ JSON-LD structured data on every car page
- ✅ Sitemap.xml (auto-includes all car slugs)
- ✅ Robots.txt
- ✅ Slug-based URLs (`/cars/used-hyundai-i20-2022-surat`)

### Admin Panel
- ✅ Secure login (JWT via NextAuth)
- ✅ Dashboard with stats
- ✅ Add / Edit / Delete cars
- ✅ Multi-image upload to Cloudinary
- ✅ Cover image reorder
- ✅ Featured toggle
- ✅ SEO metadata editor per car

---

## 🔧 Customisation

### Change Phone Number / Email
Current contact details (already updated):
- Phone: `+91 98251 34228`
- WhatsApp: `919825134228`
- Email: `nalbandhbilal@gmail.com`
- Address: `Near Khalifa Masjid, Nanura, Nanpura, Surat, Gujarat 395001`

### Change Business Name
Business name is **Top Gear Motors** — updated across all files.

### Change Colours
Edit `tailwind.config.ts` → `theme.extend.colors.gold` for the gold palette.

---

## 🚢 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all env variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 📦 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + ShadCN UI |
| Animation | Framer Motion |
| Database | MongoDB Atlas (Mongoose) |
| Auth | NextAuth v4 (Credentials) |
| Images | Cloudinary |
| Deployment | Vercel |
