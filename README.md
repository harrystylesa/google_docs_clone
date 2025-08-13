# Google Docs Clone

A real-time collaborative document editor built with **Next.js**, **React**, and **Tailwind CSS**, featuring **rich text editing** with [Tiptap](https://tiptap.dev/) and **real-time collaboration** via [Liveblocks](https://liveblocks.io/).

This project replicates core Google Docs features — including multiple-user editing, live cursors, and persistent storage — in a modern, full-stack JavaScript environment.

🔗 Live Demo: [google-docs-clone-kappa-lovat.vercel.app](https://google-docs-clone-kappa-lovat.vercel.app)

---

## ✨ Features

- **Real-Time Collaboration** – Multiple users can edit the same document simultaneously.
- **Rich Text Editing** – Bold, italic, headings, lists, links, and more via Tiptap.
- **Live Cursor Indicators** – See other users’ selections and edits instantly.
- **Document Management** – Create, rename, and delete documents.
- **Persistent Storage** – Documents saved in [Convex](https://convex.dev/) database.
- **Authentication** – Secure sign-in with Google OAuth.
- **Responsive Design** – Optimized for desktop and mobile.
- **Deployed on Vercel** – Fast and scalable deployment.



## 🛠 Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) – React framework for fullstack applications
- [React](https://react.dev/) – UI library
- [Tiptap](https://tiptap.dev/) – Rich text editor
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS

**Collaboration & Backend**
- [Liveblocks](https://liveblocks.io/) – Real-time presence & CRDT-based collaboration
- [Convex](https://convex.dev/) – Realtime database and backend functions
- [clerk](https://clerk.com) – Authentication

**Deployment**
- [Vercel](https://vercel.com/) – Hosting and CI/CD

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
gh repo clone harrystylesa/google_docs_clone
cd google_docs_clone
```

### 2.Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Set up environment variables
Create a .env.local file in the root and add:
```bash
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_key
CONVEX_DEPLOYMENT=your_convex_deployment
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Run locally
```bash
npm run dev
```
App will be available at http://localhost:3000

---
## 📦 Deployment
Deployed on Vercel:
Connect your GitHub repository in Vercel dashboard.
Add environment variables in Vercel settings.
Deploy.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## 📸 Screenshots
### Document List View
<a href="https://ibb.co/tM3tBRtG"><img src="https://i.ibb.co/wNYXytXk/2025-08-13-10-23-17.png" alt="2025-08-13-10-23-17" border="0"></a>

### Editor View with Multiple Users
<a href="https://ibb.co/spFYYrRH"><img src="https://i.ibb.co/CpnGGF82/2025-08-13-10-28-17.png" alt="2025-08-13-10-28-17" border="0"></a>

### Manage Orgnizaiton and Share Documents within the Orgnization 
<a href="https://ibb.co/4RQ6s7Hr"><img src="https://i.ibb.co/pjmtWxSF/2025-08-13-10-44-51.png" alt="2025-08-13-10-44-51" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>upload your website for free</a><br />
