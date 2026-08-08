# Momentum Academy — Study Library Website

Next.js 14 + TypeScript + Tailwind CSS + Firebase (Auth, Firestore, Storage).
A permanent, chapter-wise digital library for Momentum Academy's notes, DPPs
and Question & Answer sets, replacing WhatsApp file-sharing.

## What's included

- Landing, About, Notes Library, DPP Library, Notice Board, Fee Structure,
  Contact, Gallery (placeholder), Login/Register pages
- Google-only sign-in with a "Pending Verification" gate — students can't see
  materials until you approve them
- Admin Dashboard (mobile-friendly) with an **Approval Queue**, student
  management (approve/reject/suspend/delete), material upload, and notice
  posting
- Dynamic content structure: Class → Subject → Chapter → Material. Upload a
  PDF and it appears immediately — no code changes needed
- Dark/light mode, back-to-top button, WhatsApp chat button, download
  progress animation, PWA support (installable on Android)

## 1. Firebase setup (do this first)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**.
2. In the project, go to **Build → Authentication → Get started** → enable
   **Google** as a sign-in provider.
3. Go to **Build → Firestore Database → Create database** → start in
   **production mode**, pick a region close to India (e.g. `asia-south1`).
4. Go to **Build → Storage → Get started** → same region.
5. Go to **Project settings → General → Your apps → Add app → Web (`</>`)**.
   Register the app (no hosting setup needed here) and copy the config
   values shown.
6. Copy `.env.local.example` to `.env.local` and paste those values in.
   Set `NEXT_PUBLIC_ADMIN_EMAILS` to your own Gmail address(es), comma
   separated — whichever Gmail signs in first from this list is
   automatically made an Admin instead of a pending student.

## 2. Install and run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Sign in once with your own admin Gmail address
to create your Admin account, then visit `/admin`.

## 3. Deploy security rules and indexes

Install the Firebase CLI once: `npm install -g firebase-tools`

```bash
firebase login
firebase init        # select Firestore, Storage, Hosting; use existing project
firebase deploy --only firestore:rules,firestore:indexes,storage:rules
```

The rules in `firestore.rules` and `storage.rules` enforce exactly the
access model you asked for: only approved students can read materials, only
admins can write/manage anything, and students can never reach `/admin`
(the app also blocks this in the UI).

## 4. Deploy the website (free hosting)

**Option A — Vercel (recommended, simplest):**
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Add the same environment variables from `.env.local` in Vercel's
   Project Settings → Environment Variables.
4. Deploy. Vercel gives you a free `.vercel.app` URL (custom domains supported).

**Option B — Firebase Hosting:**
```bash
npm run build
npm run export   # if using static export; otherwise use Firebase's Next.js integration
firebase deploy --only hosting
```
Note: Firebase Hosting's native Next.js support (via `firebase deploy`)
handles server-rendered routes automatically when you run `firebase init hosting`
with the "Next.js detected" prompt — follow the CLI's prompts.

## 5. Day-to-day usage (from your Android phone)

**Approve a new student**
Open the site → Admin → Dashboard. New sign-ups appear in the **Approval
Queue** with Approve/Reject buttons. Tap Approve — they get access
immediately, no refresh needed.

**Upload a PDF**
Admin → Materials → pick Class, Subject, type the Chapter title exactly as
you want students to see it, choose the material type (Notes / DPP / Q&A /
Video), select the PDF, tap Upload. It appears in the matching Notes/DPP
Library instantly. Typing the same chapter title again reuses that chapter
instead of duplicating it.

**Post a notice**
Admin → Notices → type a title and message → Post. It appears at the top of
the public Notice Board right away.

**Manage students**
Admin → Students → search by name/email, and Approve / Reject / Suspend /
Delete any account.

## 6. Project structure

```
src/
  app/            Pages (App Router) — one folder per route
    admin/        Admin dashboard, students, materials, notices
  components/     Reusable UI: Navbar, Footer, MaterialCard, LibraryBrowser...
  context/        AuthContext — Google sign-in + profile/approval state
  lib/            firebase.ts (init), firestore.ts (data helpers)
  types/          Shared TypeScript types for the content model
firestore.rules   Firestore security rules
storage.rules     Storage security rules
firestore.indexes.json   Composite indexes the app's queries need
```

## 7. Not implemented yet (intentional placeholders)

Per the brief, these have UI placeholders only, ready to build out later:
Video Classes, Assignments, Online Tests, Attendance, Results, full Gallery
uploads, Announcements beyond the Notice Board, Leaderboard, Performance
Analytics. The Gallery page and "Videos (Coming Soon)" labels are already in
place so adding real content later is a small, additive change.

## 8. Honest notes

- This scaffold is complete and internally consistent, but I have not been
  able to run `npm install` / a real build in this environment (no network
  access here), so treat the first `npm run build` as your integration test —
  if anything doesn't compile, paste the error back to me and I'll fix it.
- Search inside the library currently matches chapter title + file name; a
  global cross-subject search bar isn't wired up yet — say the word if you
  want that added.
- Lighthouse/performance tuning (image compression, code-splitting review)
  is easiest to do once real content is loaded, since it depends on actual
  file sizes.
