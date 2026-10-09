# Soudha VM — Interactive 360° Portfolio

A React + Vite portfolio with a full 3D rotating carousel, seven navigable panels, keyboard controls, wheel navigation, swipe/drag gestures, responsive layout, and links to email/GitHub/LinkedIn.

## Requirements
- Node.js (LTS recommended)
- npm (installed with Node.js)

## Run on Windows PowerShell
```powershell
cd "$HOME\Desktop\soudha-360-portfolio"
npm install
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for production
```powershell
npm run build
npm run preview
```

## Customize
- Edit profile text and sections in `src/main.jsx`.
- Change colors, layout, and animations in `src/styles.css`.
- The hero portrait is a placeholder by design. Replace the `.portrait-placeholder` block in `Home()` with your own image if you want a real photo. For example, put an image at `public/soudha-photo.jpg` and use `<img className="portrait-photo" src="/soudha-photo.jpg" alt="Soudha VM" />`.
- Update `profile.github` if your preferred GitHub profile URL differs.

The resume content is based on the uploaded `Soudha_VM_ATS_Resume_Updated.pdf`. No personal photo was included in that PDF, so the hero uses a stylized placeholder.
