# Insomnia – A Hub for Late-Night Writers

**Insomnia** is a Google Docs clone built for collaborative writing in real-time. It leverages modern web technologies including **React**, **Nest.js**, **Tailwind**, **MongoDB**, **Yjs**, **Hocuspocus**, **Tiptap**, and **Socket.IO** to create a seamless, multi-user editing experience.

---

## Features

* Real-time collaborative document editing
* Rich text editing powered by **Tiptap**
* Conflict-free multi-user editing via **Yjs** and **Hocuspocus**
* Persistent backend storage with **MongoDB**
* Responsive UI styled with **TailwindCSS**
* Authentication and session management via **Nest.js**

---

## How Collaboration Works

1. **Yjs**: A CRDT (Conflict-free Replicated Data Type) library that handles concurrent updates across multiple clients. It ensures that all users see consistent document content even when editing simultaneously.
2. **Hocuspocus Server**: A WebSocket server that coordinates Yjs document updates between connected clients.
3. **Tiptap**: A rich text editor for React that connects directly to Yjs documents, allowing users to see live edits with formatting preserved.
4. **Socket.IO**: Facilitates real-time communication between the frontend and backend for additional events outside of Yjs (like presence indicators).

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repo-url>
cd google-docs-clone
```

### 2. Install Dependencies

From the **root**:

```bash
npm install
```

Then go to the frontend folder:

```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create `.env` files in each relevant folder.

#### yjs-backend

```env
HOCUSPOCUS_PORT=8000
NEST_BACKEND=http://localhost:4000
```

#### frontend

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=<your Firebase API key>
VITE_FIREBASE_AUTH_DOMAIN=<your Firebase auth domain>
VITE_FIREBASE_PROJECT_ID=<your Firebase project ID>
VITE_FIREBASE_STORAGE_BUCKET=<your Firebase storage bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<your Firebase messaging sender id>
VITE_FIREBASE_APP_ID=<your Firebase app ID>
VITE_BACKEND_URL=http://localhost:4000
VITE_HOCUSPOCUS_WEBSOCKET=ws://localhost:8000
```

#### backend

```env
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<secret for JWT auth>
JWT_EXPIRES=<expiry duration>
FIREBASE_SERVICE_ACCOUNT=<your firebase service account JSON string>
```

> **Important:** If your backend port changes, update `NEST_BACKEND` in the **yjs-backend** `.env` file accordingly.

---

### 4. Solving Frontend Vite Import Errors

If you encounter the error:

```text
[plugin:vite:import-analysis] Failed to resolve import "@tiptap/react" from "src/pages/Document.tsx". Does the file exist?
```

Follow these steps:

```bash
# From root
rm -rf node_modules package-lock.json
npm install

# Go to frontend
cd frontend
rm -rf node_modules/.vite
npm run dev -- --force
```

This clears both the Node modules and Vite cache, forcing Vite to rebuild its dependency graph.

---

### 5. Running the Project

1. Start the backend:

```bash
cd apps/backend
npm run dev
```

2. Start the Yjs/Hocuspocus server:

```bash
cd apps/yjs-backend
npm run dev
```

3. Start the frontend:

```bash
cd apps/frontend
npm run dev
```

Now open your browser at `http://localhost:5173` (or your configured frontend URL) and start collaborating!
