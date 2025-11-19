# ClodeDisc  
A Lightweight Cloud Storage Platform for Media Files

**ClodeDisc** is a modern cloud-based storage application designed to securely store, preview, and manage user files, including PDFs, images, videos, and audio.  
The platform is built with **Next.js**, styled with **Tailwind CSS**, and uses **Zustand** for state management.

ClodeDisc focuses on simplicity, fast performance, and a clean UI/UX — making it a minimal OneDrive-like solution tailored for media content.

---

## Features

### File Upload & Management
ClodeDisc provides core cloud storage functionality:

- upload PDFs, videos, audio, and images,
- view all uploaded files in a clean grid layout,
- delete, rename, and manage user items,
- lightweight previews for supported media types.

### Media Preview Support

- **Images** — full-size preview inside the application  
- **Videos** — built-in video player  
- **Audio** — embedded audio player  
- **PDFs** — PDF preview or direct open in browser  

All rendering happens seamlessly inside the app interface.

### Organized File View
Files are displayed in a responsive gallery-style UI:

- automatic file-type detection,
- file-type badges (PDF, MP3, MP4, JPG, etc.),
- hover interactions,
- quick actions (preview, download, delete).

---

## Tech Stack

- **Next.js** — full-stack React framework with server-side rendering
- **Tailwind CSS** — utility-first styling
- **Zustand** — lightweight state management
- **TypeScript** (if used)
- File storage (local, cloud, or custom backend — depending on your setup)

---

## Core Functionality

### Upload System
The upload flow supports:

- drag-and-drop,
- manual selection,
- progress tracking (optional),
- automatic file-type categorization.

### File Actions

- **Preview** — open the file in a modal window
- **Download** — direct browser download
- **Delete** — remove file from storage
- **Rename** — update file title (if implemented)

### Global State (Zustand)
Zustand stores:

- list of files,
- current preview item,
- UI modal states,
- upload queue (if enabled).

This keeps the app lightweight and fast compared to heavier state solutions.

---

## Screenshots

<img width="1440" height="781" alt="Screenshot 2025-11-19 at 17 55 04" src="https://github.com/user-attachments/assets/4ac91d89-0e02-42eb-a65e-c4f69f5023fb" />
