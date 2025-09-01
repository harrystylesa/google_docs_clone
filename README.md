# Google Docs Clone

A real-time collaborative document editor built with **Next.js**, **React**, and **Tailwind CSS**, featuring **rich text editing** with [Tiptap](https://tiptap.dev/) and **real-time collaboration** via [Liveblocks](https://liveblocks.io/).

This project replicates core Google Docs features — including multiple-user editing, live cursors, and persistent storage — in a modern, full-stack JavaScript environment. It is powered by a dedicated **AI-Collaborator Backend** that adds intelligent, AI-driven functionalities.

🔗 Live Demo: [google-docs-clone-kappa-lovat.vercel.app](https://google-docs-clone-kappa-lovat.vercel.app)

🔗 Backend Project Repo: [AI-Collaborator-Agent](https://github.com/harrystylesa/AI-Collaborator-Agent)

---

## ✨ Features

- **Real-Time Collaboration** – Multiple users can edit the same document simultaneously.
- **Rich Text Editing** – Bold, italic, headings, lists, links, and more via Tiptap.
- **Live Cursor Indicators** – See other users’ selections and edits instantly.
- **AI-Powered Document Summary** – Automatically generate a concise summary of your document with the click of a button.

![AI Summary Feature](https://s14.gifyu.com/images/bTKUZ.gif)

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

**AI Backend**

* **AI-Collaborator Backend**: A dedicated FastAPI service that provides AI capabilities, including document summarization.

* **Databricks Model Serving & OpenAI API**: The backend leverages these services for AI model inference.

* **MLflow**: Used for managing and tracking AI model versions and experiments.

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
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
CONVEX_DEPLOYMENT=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
LIVEBLOCKS_SECRET_KEY=
# AI-Collaborator Backend Serving Endpoint
NEXT_PUBLIC_SUMMARY_URL=
NEXT_PUBLIC_FASTAPI_FEEDBACK_URL=
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
![](https://i.ibb.co/wNYXytXk/2025-08-13-10-23-17.png)

### Editor View with Multiple Users
![](https://i.ibb.co/CpnGGF82/2025-08-13-10-28-17.png)

### Manage Orgnizaiton and Share Documents within the Orgnization 
![](https://i.ibb.co/pjmtWxSF/2025-08-13-10-44-51.png)