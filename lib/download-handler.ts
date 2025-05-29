import React from 'react';
import { createRoot } from 'react-dom/client';

// Resume Templates
import { BlueAccentResume } from '@/components/resume-templates/blue-accent-resume';
import { CreativeResume } from '@/components/resume-templates/creative-resume';
import { DarkSidebarResume } from '@/components/resume-templates/dark-sidebar-resume';
import { MinimalCleanResume } from '@/components/resume-templates/minimal-clean-resume';
import { ModernResume } from '@/components/resume-templates/modern-resume';
import { ProfessionalResume } from '@/components/resume-templates/professional-resume';

// Portfolio Templates
import { AstroPortfolio } from '@/components/portfolio-templates/astro-portfolio';
import { CreativePortfolio } from '@/components/portfolio-templates/creative-portfolio';
import { MikonPortfolio } from '@/components/portfolio-templates/mikon-portfolio';
import { MinimalPortfolio } from '@/components/portfolio-templates/minimal-portfolio';
import { ModernPortfolio } from '@/components/portfolio-templates/modern-portfolio';
import { NicholPortfolio } from '@/components/portfolio-templates/nichol-portfolio';
import { ObsidianPortfolio } from '@/components/portfolio-templates/obsidian-portfolio';
import { ShowoffPortfolio } from '@/components/portfolio-templates/showoff-portfolio';
import { ZyanPortfolio } from '@/components/portfolio-templates/zyan-portfolio';

// Template mappings
const RESUME_TEMPLATES = {
  'blue-accent': BlueAccentResume,
  'creative': CreativeResume,
  'dark-sidebar': DarkSidebarResume,
  'minimal-clean': MinimalCleanResume,
  'modern': ModernResume,
  'professional': ProfessionalResume,
};

const PORTFOLIO_TEMPLATES = {
  'astro': AstroPortfolio,
  'creative': CreativePortfolio,
  'mikon': MikonPortfolio,
  'minimal': MinimalPortfolio,
  'modern': ModernPortfolio,
  'nichol': NicholPortfolio,
  'obsidian': ObsidianPortfolio,
  'showoff': ShowoffPortfolio,
  'zyan': ZyanPortfolio,
};

// Load external dependencies
const loadExternalDependencies = () => {
  return new Promise((resolve) => {
    if (window.html2pdf && window.html2canvas) {
      resolve(true);
      return;
    }

    let loadedCount = 0;
    const totalDependencies = 2;

    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= totalDependencies) {
        resolve(true);
      }
    };

    if (!window.html2canvas) {
      const html2canvasScript = document.createElement('script');
      html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      html2canvasScript.onload = checkAllLoaded;
      document.head.appendChild(html2canvasScript);
    } else {
      checkAllLoaded();
    }

    if (!window.html2pdf) {
      const html2pdfScript = document.createElement('script');
      html2pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      html2pdfScript.onload = checkAllLoaded;
      document.head.appendChild(html2pdfScript);
    } else {
      checkAllLoaded();
    }
  });
};

// Get complete shadcn/ui + Tailwind CSS
const getCompleteShadcnCSS = () => {
  return `
/* CSS Reset and Base */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

::before, ::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
  font-family: Arial, Helvetica, sans-serif;
}

/* Shadcn/UI CSS Variables */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --chart-1: 12 76% 61%;
  --chart-2: 173 58% 39%;
  --chart-3: 197 37% 24%;
  --chart-4: 43 74% 66%;
  --chart-5: 27 87% 67%;
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
  --chart-1: 220 70% 50%;
  --chart-2: 160 60% 45%;
  --chart-3: 30 80% 55%;
  --chart-4: 280 65% 60%;
  --chart-5: 340 75% 55%;
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Tailwind Base */
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button, [role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}

/* Colors - Complete palette */
.bg-white { background-color: rgb(255 255 255); }
.bg-black { background-color: rgb(0 0 0); }
.bg-transparent { background-color: transparent; }

/* Gray scale */
.bg-gray-50 { background-color: rgb(249 250 251); }
.bg-gray-100 { background-color: rgb(243 244 246); }
.bg-gray-200 { background-color: rgb(229 231 235); }
.bg-gray-300 { background-color: rgb(209 213 219); }
.bg-gray-400 { background-color: rgb(156 163 175); }
.bg-gray-500 { background-color: rgb(107 114 128); }
.bg-gray-600 { background-color: rgb(75 85 99); }
.bg-gray-700 { background-color: rgb(55 65 81); }
.bg-gray-800 { background-color: rgb(31 41 55); }
.bg-gray-900 { background-color: rgb(17 24 39); }
.bg-gray-950 { background-color: rgb(3 7 18); }

/* Slate scale */
.bg-slate-50 { background-color: rgb(248 250 252); }
.bg-slate-100 { background-color: rgb(241 245 249); }
.bg-slate-200 { background-color: rgb(226 232 240); }
.bg-slate-300 { background-color: rgb(203 213 225); }
.bg-slate-400 { background-color: rgb(148 163 184); }
.bg-slate-500 { background-color: rgb(100 116 139); }
.bg-slate-600 { background-color: rgb(71 85 105); }
.bg-slate-700 { background-color: rgb(51 65 85); }
.bg-slate-800 { background-color: rgb(30 41 59); }
.bg-slate-900 { background-color: rgb(15 23 42); }
.bg-slate-950 { background-color: rgb(2 6 23); }

/* Blue scale */
.bg-blue-50 { background-color: rgb(239 246 255); }
.bg-blue-100 { background-color: rgb(219 234 254); }
.bg-blue-200 { background-color: rgb(191 219 254); }
.bg-blue-300 { background-color: rgb(147 197 253); }
.bg-blue-400 { background-color: rgb(96 165 250); }
.bg-blue-500 { background-color: rgb(59 130 246); }
.bg-blue-600 { background-color: rgb(37 99 235); }
.bg-blue-700 { background-color: rgb(29 78 216); }
.bg-blue-800 { background-color: rgb(30 64 175); }
.bg-blue-900 { background-color: rgb(30 58 138); }
.bg-blue-950 { background-color: rgb(23 37 84); }

/* Purple scale */
.bg-purple-50 { background-color: rgb(250 245 255); }
.bg-purple-100 { background-color: rgb(243 232 255); }
.bg-purple-200 { background-color: rgb(233 213 255); }
.bg-purple-300 { background-color: rgb(216 180 254); }
.bg-purple-400 { background-color: rgb(196 181 253); }
.bg-purple-500 { background-color: rgb(168 85 247); }
.bg-purple-600 { background-color: rgb(147 51 234); }
.bg-purple-700 { background-color: rgb(126 34 206); }
.bg-purple-800 { background-color: rgb(107 33 168); }
.bg-purple-900 { background-color: rgb(88 28 135); }
.bg-purple-950 { background-color: rgb(59 7 100); }

/* Green scale */
.bg-green-50 { background-color: rgb(240 253 244); }
.bg-green-100 { background-color: rgb(220 252 231); }
.bg-green-200 { background-color: rgb(187 247 208); }
.bg-green-300 { background-color: rgb(134 239 172); }
.bg-green-400 { background-color: rgb(74 222 128); }
.bg-green-500 { background-color: rgb(34 197 94); }
.bg-green-600 { background-color: rgb(22 163 74); }
.bg-green-700 { background-color: rgb(21 128 61); }
.bg-green-800 { background-color: rgb(22 101 52); }
.bg-green-900 { background-color: rgb(20 83 45); }
.bg-green-950 { background-color: rgb(5 46 22); }

/* Yellow scale */
.bg-yellow-50 { background-color: rgb(254 252 232); }
.bg-yellow-100 { background-color: rgb(254 249 195); }
.bg-yellow-200 { background-color: rgb(254 240 138); }
.bg-yellow-300 { background-color: rgb(253 224 71); }
.bg-yellow-400 { background-color: rgb(250 204 21); }
.bg-yellow-500 { background-color: rgb(234 179 8); }
.bg-yellow-600 { background-color: rgb(202 138 4); }

/* Pink scale */
.bg-pink-50 { background-color: rgb(253 242 248); }
.bg-pink-100 { background-color: rgb(252 231 243); }
.bg-pink-200 { background-color: rgb(251 207 232); }
.bg-pink-300 { background-color: rgb(249 168 212); }
.bg-pink-400 { background-color: rgb(244 114 182); }
.bg-pink-500 { background-color: rgb(236 72 153); }
.bg-pink-600 { background-color: rgb(219 39 119); }

/* Indigo scale */
.bg-indigo-50 { background-color: rgb(238 242 255); }
.bg-indigo-100 { background-color: rgb(224 231 255); }
.bg-indigo-200 { background-color: rgb(199 210 254); }
.bg-indigo-300 { background-color: rgb(165 180 252); }
.bg-indigo-400 { background-color: rgb(129 140 248); }
.bg-indigo-500 { background-color: rgb(99 102 241); }
.bg-indigo-600 { background-color: rgb(79 70 229); }
.bg-indigo-700 { background-color: rgb(67 56 202); }
.bg-indigo-800 { background-color: rgb(55 48 163); }
.bg-indigo-900 { background-color: rgb(49 46 129); }
.bg-indigo-950 { background-color: rgb(30 27 75); }

/* Teal scale */
.bg-teal-50 { background-color: rgb(240 253 250); }
.bg-teal-100 { background-color: rgb(204 251 241); }
.bg-teal-200 { background-color: rgb(153 246 228); }
.bg-teal-300 { background-color: rgb(94 234 212); }
.bg-teal-400 { background-color: rgb(45 212 191); }
.bg-teal-500 { background-color: rgb(20 184 166); }
.bg-teal-600 { background-color: rgb(13 148 136); }

/* Cyan scale */
.bg-cyan-50 { background-color: rgb(236 254 255); }
.bg-cyan-100 { background-color: rgb(207 250 254); }
.bg-cyan-200 { background-color: rgb(165 243 252); }
.bg-cyan-300 { background-color: rgb(103 232 249); }
.bg-cyan-400 { background-color: rgb(34 211 238); }
.bg-cyan-500 { background-color: rgb(6 182 212); }
.bg-cyan-600 { background-color: rgb(8 145 178); }

/* Orange scale */
.bg-orange-50 { background-color: rgb(255 247 237); }
.bg-orange-100 { background-color: rgb(255 237 213); }
.bg-orange-200 { background-color: rgb(254 215 170); }
.bg-orange-300 { background-color: rgb(253 186 116); }
.bg-orange-400 { background-color: rgb(251 146 60); }
.bg-orange-500 { background-color: rgb(249 115 22); }
.bg-orange-600 { background-color: rgb(234 88 12); }

/* Text colors - Complete set */
.text-white { color: rgb(255 255 255); }
.text-black { color: rgb(0 0 0); }
.text-transparent { color: transparent; }

/* Gray text */
.text-gray-50 { color: rgb(249 250 251); }
.text-gray-100 { color: rgb(243 244 246); }
.text-gray-200 { color: rgb(229 231 235); }
.text-gray-300 { color: rgb(209 213 219); }
.text-gray-400 { color: rgb(156 163 175); }
.text-gray-500 { color: rgb(107 114 128); }
.text-gray-600 { color: rgb(75 85 99); }
.text-gray-700 { color: rgb(55 65 81); }
.text-gray-800 { color: rgb(31 41 55); }
.text-gray-900 { color: rgb(17 24 39); }
.text-gray-950 { color: rgb(3 7 18); }

/* Slate text */
.text-slate-50 { color: rgb(248 250 252); }
.text-slate-100 { color: rgb(241 245 249); }
.text-slate-200 { color: rgb(226 232 240); }
.text-slate-300 { color: rgb(203 213 225); }
.text-slate-400 { color: rgb(148 163 184); }
.text-slate-500 { color: rgb(100 116 139); }
.text-slate-600 { color: rgb(71 85 105); }
.text-slate-700 { color: rgb(51 65 85); }
.text-slate-800 { color: rgb(30 41 59); }
.text-slate-900 { color: rgb(15 23 42); }
.text-slate-950 { color: rgb(2 6 23); }

/* Blue text */
.text-blue-50 { color: rgb(239 246 255); }
.text-blue-100 { color: rgb(219 234 254); }
.text-blue-200 { color: rgb(191 219 254); }
.text-blue-300 { color: rgb(147 197 253); }
.text-blue-400 { color: rgb(96 165 250); }
.text-blue-500 { color: rgb(59 130 246); }
.text-blue-600 { color: rgb(37 99 235); }
.text-blue-700 { color: rgb(29 78 216); }
.text-blue-800 { color: rgb(30 64 175); }
.text-blue-900 { color: rgb(30 58 138); }
.text-blue-950 { color: rgb(23 37 84); }

/* Purple text */
.text-purple-50 { color: rgb(250 245 255); }
.text-purple-100 { color: rgb(243 232 255); }
.text-purple-200 { color: rgb(233 213 255); }
.text-purple-300 { color: rgb(216 180 254); }
.text-purple-400 { color: rgb(196 181 253); }
.text-purple-500 { color: rgb(168 85 247); }
.text-purple-600 { color: rgb(147 51 234); }
.text-purple-700 { color: rgb(126 34 206); }
.text-purple-800 { color: rgb(107 33 168); }
.text-purple-900 { color: rgb(88 28 135); }
.text-purple-950 { color: rgb(59 7 100); }

/* Green text */
.text-green-50 { color: rgb(240 253 244); }
.text-green-100 { color: rgb(220 252 231); }
.text-green-200 { color: rgb(187 247 208); }
.text-green-300 { color: rgb(134 239 172); }
.text-green-400 { color: rgb(74 222 128); }
.text-green-500 { color: rgb(34 197 94); }
.text-green-600 { color: rgb(22 163 74); }
.text-green-700 { color: rgb(21 128 61); }
.text-green-800 { color: rgb(22 101 52); }
.text-green-900 { color: rgb(20 83 45); }
.text-green-950 { color: rgb(5 46 22); }

/* Yellow text */
.text-yellow-50 { color: rgb(254 252 232); }
.text-yellow-100 { color: rgb(254 249 195); }
.text-yellow-200 { color: rgb(254 240 138); }
.text-yellow-300 { color: rgb(253 224 71); }
.text-yellow-400 { color: rgb(250 204 21); }
.text-yellow-500 { color: rgb(234 179 8); }
.text-yellow-600 { color: rgb(202 138 4); }

/* Pink text */
.text-pink-50 { color: rgb(253 242 248); }
.text-pink-100 { color: rgb(252 231 243); }
.text-pink-200 { color: rgb(251 207 232); }
.text-pink-300 { color: rgb(249 168 212); }
.text-pink-400 { color: rgb(244 114 182); }
.text-pink-500 { color: rgb(236 72 153); }
.text-pink-600 { color: rgb(219 39 119); }

/* Indigo text */
.text-indigo-50 { color: rgb(238 242 255); }
.text-indigo-100 { color: rgb(224 231 255); }
.text-indigo-200 { color: rgb(199 210 254); }
.text-indigo-300 { color: rgb(165 180 252); }
.text-indigo-400 { color: rgb(129 140 248); }
.text-indigo-500 { color: rgb(99 102 241); }
.text-indigo-600 { color: rgb(79 70 229); }
.text-indigo-700 { color: rgb(67 56 202); }
.text-indigo-800 { color: rgb(55 48 163); }
.text-indigo-900 { color: rgb(49 46 129); }
.text-indigo-950 { color: rgb(30 27 75); }

/* Teal text */
.text-teal-50 { color: rgb(240 253 250); }
.text-teal-100 { color: rgb(204 251 241); }
.text-teal-200 { color: rgb(153 246 228); }
.text-teal-300 { color: rgb(94 234 212); }
.text-teal-400 { color: rgb(45 212 191); }
.text-teal-500 { color: rgb(20 184 166); }
.text-teal-600 { color: rgb(13 148 136); }

/* Cyan text */
.text-cyan-50 { color: rgb(236 254 255); }
.text-cyan-100 { color: rgb(207 250 254); }
.text-cyan-200 { color: rgb(165 243 252); }
.text-cyan-300 { color: rgb(103 232 249); }
.text-cyan-400 { color: rgb(34 211 238); }
.text-cyan-500 { color: rgb(6 182 212); }
.text-cyan-600 { color: rgb(8 145 178); }

/* Orange text */
.text-orange-50 { color: rgb(255 247 237); }
.text-orange-100 { color: rgb(255 237 213); }
.text-orange-200 { color: rgb(254 215 170); }
.text-orange-300 { color: rgb(253 186 116); }
.text-orange-400 { color: rgb(251 146 60); }
.text-orange-500 { color: rgb(249 115 22); }
.text-orange-600 { color: rgb(234 88 12); }

/* Gradients with proper color stops */
.bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
.bg-gradient-to-l { background-image: linear-gradient(to left, var(--tw-gradient-stops)); }
.bg-gradient-to-t { background-image: linear-gradient(to top, var(--tw-gradient-stops)); }
.bg-gradient-to-b { background-image: linear-gradient(to bottom, var(--tw-gradient-stops)); }
.bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
.bg-gradient-to-bl { background-image: linear-gradient(to bottom left, var(--tw-gradient-stops)); }
.bg-gradient-to-tr { background-image: linear-gradient(to top right, var(--tw-gradient-stops)); }
.bg-gradient-to-tl { background-image: linear-gradient(to top left, var(--tw-gradient-stops)); }

/* Gradient color stops */
.from-slate-950 { --tw-gradient-from: #020617; --tw-gradient-to: rgb(2 6 23 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-950 { --tw-gradient-from: #3b0764; --tw-gradient-to: rgb(59 7 100 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-slate-900 { --tw-gradient-from: #0f172a; --tw-gradient-to: rgb(15 23 42 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-900 { --tw-gradient-from: #1e3a8a; --tw-gradient-to: rgb(30 58 138 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-gray-900 { --tw-gradient-from: #111827; --tw-gradient-to: rgb(17 24 39 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-900 { --tw-gradient-from: #581c87; --tw-gradient-to: rgb(88 28 135 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-indigo-900 { --tw-gradient-from: #312e81; --tw-gradient-to: rgb(49 46 129 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-to: rgb(239 246 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-green-50 { --tw-gradient-from: #f0fdf4; --tw-gradient-to: rgb(240 253 244 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-teal-50 { --tw-gradient-from: #f0fdfa; --tw-gradient-to: rgb(240 253 250 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-50 { --tw-gradient-from: #faf5ff; --tw-gradient-to: rgb(250 245 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-to: rgb(59 130 246 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-to: rgb(37 99 235 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-400 { --tw-gradient-from: #c4b5fd; --tw-gradient-to: rgb(196 181 253 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-500 { --tw-gradient-from: #a855f7; --tw-gradient-to: rgb(168 85 247 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-purple-600 { --tw-gradient-from: #9333ea; --tw-gradient-to: rgb(147 51 234 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-400 { --tw-gradient-from: #60a5fa; --tw-gradient-to: rgb(96 165 250 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-green-400 { --tw-gradient-from: #4ade80; --tw-gradient-to: rgb(74 222 128 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-green-500 { --tw-gradient-from: #22c55e; --tw-gradient-to: rgb(34 197 94 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-green-600 { --tw-gradient-from: #16a34a; --tw-gradient-to: rgb(22 163 74 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-yellow-400 { --tw-gradient-from: #facc15; --tw-gradient-to: rgb(250 204 21 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-pink-400 { --tw-gradient-from: #f472b6; --tw-gradient-to: rgb(244 114 182 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-indigo-600 { --tw-gradient-from: #4f46e5; --tw-gradient-to: rgb(79 70 229 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-teal-400 { --tw-gradient-from: #2dd4bf; --tw-gradient-to: rgb(45 212 191 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }

.via-purple-950 { --tw-gradient-to: rgb(59 7 100 / 0); --tw-gradient-stops: var(--tw-gradient-from), #3b0764, var(--tw-gradient-to); }
.via-blue-900 { --tw-gradient-to: rgb(30 58 138 / 0); --tw-gradient-stops: var(--tw-gradient-from), #1e3a8a, var(--tw-gradient-to); }
.via-pink-400 { --tw-gradient-to: rgb(244 114 182 / 0); --tw-gradient-stops: var(--tw-gradient-from), #f472b6, var(--tw-gradient-to); }
.via-transparent { --tw-gradient-to: transparent; --tw-gradient-stops: var(--tw-gradient-from), transparent, var(--tw-gradient-to); }

.to-slate-950 { --tw-gradient-to: #020617; }
.to-slate-900 { --tw-gradient-to: #0f172a; }
.to-blue-700 { --tw-gradient-to: #1d4ed8; }
.to-blue-900 { --tw-gradient-to: #1e3a8a; }
.to-indigo-600 { --tw-gradient-to: #4f46e5; }
.to-indigo-900 { --tw-gradient-to: #312e81; }
.to-purple-600 { --tw-gradient-to: #9333ea; }
.to-purple-400 { --tw-gradient-to: #c4b5fd; }
.to-pink-500 { --tw-gradient-to: #ec4899; }
.to-pink-600 { --tw-gradient-to: #db2777; }
.to-cyan-400 { --tw-gradient-to: #22d3ee; }
.to-cyan-500 { --tw-gradient-to: #06b6d4; }
.to-teal-500 { --tw-gradient-to: #14b8a6; }
.to-teal-50 { --tw-gradient-to: #f0fdfa; }
.to-green-400 { --tw-gradient-to: #4ade80; }
.to-yellow-400 { --tw-gradient-to: #facc15; }
.to-orange-600 { --tw-gradient-to: #ea580c; }
.to-transparent { --tw-gradient-to: transparent; }

/* Background clip for gradients */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Layout */
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; padding-right: 1.5rem; padding-left: 1.5rem; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

@media (min-width: 1536px) {
  .container { max-width: 1536px; }
}

/* Max widths */
.max-w-xs { max-width: 20rem; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-6xl { max-width: 72rem; }
.max-w-7xl { max-width: 80rem; }
.max-w-full { max-width: 100%; }
.max-w-screen-sm { max-width: 640px; }
.max-w-screen-md { max-width: 768px; }
.max-w-screen-lg { max-width: 1024px; }
.max-w-screen-xl { max-width: 1280px; }
.max-w-screen-2xl { max-width: 1536px; }
.max-w-none { max-width: none; }

/* Margin and padding */
.mx-auto { margin-left: auto; margin-right: auto; }
.my-auto { margin-top: auto; margin-bottom: auto; }

.m-0 { margin: 0px; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
.m-4 { margin: 1rem; }
.m-5 { margin: 1.25rem; }
.m-6 { margin: 1.5rem; }
.m-8 { margin: 2rem; }
.m-10 { margin: 2.5rem; }
.m-12 { margin: 3rem; }
.m-16 { margin: 4rem; }
.m-20 { margin: 5rem; }
.m-24 { margin: 6rem; }
.m-32 { margin: 8rem; }
.m-40 { margin: 10rem; }
.m-48 { margin: 12rem; }
.m-56 { margin: 14rem; }
.m-64 { margin: 16rem; }
.m-auto { margin: auto; }

.mt-0 { margin-top: 0px; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.mt-5 { margin-top: 1.25rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mt-10 { margin-top: 2.5rem; }
.mt-12 { margin-top: 3rem; }
.mt-16 { margin-top: 4rem; }
.mt-20 { margin-top: 5rem; }
.mt-24 { margin-top: 6rem; }
.mt-32 { margin-top: 8rem; }
.mt-40 { margin-top: 10rem; }
.mt-48 { margin-top: 12rem; }
.mt-56 { margin-top: 14rem; }
.mt-64 { margin-top: 16rem; }
.mt-auto { margin-top: auto; }

.mr-0 { margin-right: 0px; }
.mr-1 { margin-right: 0.25rem; }
.mr-2 { margin-right: 0.5rem; }
.mr-3 { margin-right: 0.75rem; }
.mr-4 { margin-right: 1rem; }
.mr-5 { margin-right: 1.25rem; }
.mr-6 { margin-right: 1.5rem; }
.mr-8 { margin-right: 2rem; }
.mr-10 { margin-right: 2.5rem; }
.mr-12 { margin-right: 3rem; }
.mr-16 { margin-right: 4rem; }
.mr-20 { margin-right: 5rem; }
.mr-24 { margin-right: 6rem; }
.mr-32 { margin-right: 8rem; }
.mr-40 { margin-right: 10rem; }
.mr-48 { margin-right: 12rem; }
.mr-56 { margin-right: 14rem; }
.mr-64 { margin-right: 16rem; }
.mr-auto { margin-right: auto; }

.mb-0 { margin-bottom: 0px; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-10 { margin-bottom: 2.5rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-16 { margin-bottom: 4rem; }
.mb-20 { margin-bottom: 5rem; }
.mb-24 { margin-bottom: 6rem; }
.mb-32 { margin-bottom: 8rem; }
.mb-40 { margin-bottom: 10rem; }
.mb-48 { margin-bottom: 12rem; }
.mb-56 { margin-bottom: 14rem; }
.mb-64 { margin-bottom: 16rem; }
.mb-auto { margin-bottom: auto; }

.ml-0 { margin-left: 0px; }
.ml-1 { margin-left: 0.25rem; }
.ml-2 { margin-left: 0.5rem; }
.ml-3 { margin-left: 0.75rem; }
.ml-4 { margin-left: 1rem; }
.ml-5 { margin-left: 1.25rem; }
.ml-6 { margin-left: 1.5rem; }
.ml-8 { margin-left: 2rem; }
.ml-10 { margin-left: 2.5rem; }
.ml-12 { margin-left: 3rem; }
.ml-16 { margin-left: 4rem; }
.ml-20 { margin-left: 5rem; }
.ml-24 { margin-left: 6rem; }
.ml-32 { margin-left: 8rem; }
.ml-40 { margin-left: 10rem; }
.ml-48 { margin-left: 12rem; }
.ml-56 { margin-left: 14rem; }
.ml-64 { margin-left: 16rem; }
.ml-auto { margin-left: auto; }

.p-0 { padding: 0px; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-10 { padding: 2.5rem; }
.p-12 { padding: 3rem; }
.p-16 { padding: 4rem; }
.p-20 { padding: 5rem; }
.p-24 { padding: 6rem; }
.p-32 { padding: 8rem; }
.p-40 { padding: 10rem; }
.p-48 { padding: 12rem; }
.p-56 { padding: 14rem; }
.p-64 { padding: 16rem; }

.px-0 { padding-left: 0px; padding-right: 0px; }
.px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.px-10 { padding-left: 2.5rem; padding-right: 2.5rem; }
.px-12 { padding-left: 3rem; padding-right: 3rem; }
.px-16 { padding-left: 4rem; padding-right: 4rem; }
.px-20 { padding-left: 5rem; padding-right: 5rem; }
.px-24 { padding-left: 6rem; padding-right: 6rem; }
.px-32 { padding-left: 8rem; padding-right: 8rem; }
.px-40 { padding-left: 10rem; padding-right: 10rem; }
.px-48 { padding-left: 12rem; padding-right: 12rem; }
.px-56 { padding-left: 14rem; padding-right: 14rem; }
.px-64 { padding-left: 16rem; padding-right: 16rem; }

.py-0 { padding-top: 0px; padding-bottom: 0px; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-5 { padding-top: 1.25rem; padding-bottom: 1.25rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.py-24 { padding-top: 6rem; padding-bottom: 6rem; }
.py-32 { padding-top: 8rem; padding-bottom: 8rem; }
.py-40 { padding-top: 10rem; padding-bottom: 10rem; }
.py-48 { padding-top: 12rem; padding-bottom: 12rem; }
.py-56 { padding-top: 14rem; padding-bottom: 14rem; }
.py-64 { padding-top: 16rem; padding-bottom: 16rem; }

.pt-0 { padding-top: 0px; }
.pt-1 { padding-top: 0.25rem; }
.pt-2 { padding-top: 0.5rem; }
.pt-3 { padding-top: 0.75rem; }
.pt-4 { padding-top: 1rem; }
.pt-5 { padding-top: 1.25rem; }
.pt-6 { padding-top: 1.5rem; }
.pt-8 { padding-top: 2rem; }
.pt-10 { padding-top: 2.5rem; }
.pt-12 { padding-top: 3rem; }
.pt-16 { padding-top: 4rem; }
.pt-20 { padding-top: 5rem; }
.pt-24 { padding-top: 6rem; }
.pt-32 { padding-top: 8rem; }
.pt-40 { padding-top: 10rem; }
.pt-48 { padding-top: 12rem; }
.pt-56 { padding-top: 14rem; }
.pt-64 { padding-top: 16rem; }

.pr-0 { padding-right: 0px; }
.pr-1 { padding-right: 0.25rem; }
.pr-2 { padding-right: 0.5rem; }
.pr-3 { padding-right: 0.75rem; }
.pr-4 { padding-right: 1rem; }
.pr-5 { padding-right: 1.25rem; }
.pr-6 { padding-right: 1.5rem; }
.pr-8 { padding-right: 2rem; }
.pr-10 { padding-right: 2.5rem; }
.pr-12 { padding-right: 3rem; }
.pr-16 { padding-right: 4rem; }
.pr-20 { padding-right: 5rem; }
.pr-24 { padding-right: 6rem; }
.pr-32 { padding-right: 8rem; }
.pr-40 { padding-right: 10rem; }
.pr-48 { padding-right: 12rem; }
.pr-56 { padding-right: 14rem; }
.pr-64 { padding-right: 16rem; }

.pb-0 { padding-bottom: 0px; }
.pb-1 { padding-bottom: 0.25rem; }
.pb-2 { padding-bottom: 0.5rem; }
.pb-3 { padding-bottom: 0.75rem; }
.pb-4 { padding-bottom: 1rem; }
.pb-5 { padding-bottom: 1.25rem; }
.pb-6 { padding-bottom: 1.5rem; }
.pb-8 { padding-bottom: 2rem; }
.pb-10 { padding-bottom: 2.5rem; }
.pb-12 { padding-bottom: 3rem; }
.pb-16 { padding-bottom: 4rem; }
.pb-20 { padding-bottom: 5rem; }
.pb-24 { padding-bottom: 6rem; }
.pb-32 { padding-bottom: 8rem; }
.pb-40 { padding-bottom: 10rem; }
.pb-48 { padding-bottom: 12rem; }
.pb-56 { padding-bottom: 14rem; }
.pb-64 { padding-bottom: 16rem; }

.pl-0 { padding-left: 0px; }
.pl-1 { padding-left: 0.25rem; }
.pl-2 { padding-left: 0.5rem; }
.pl-3 { padding-left: 0.75rem; }
.pl-4 { padding-left: 1rem; }
.pl-5 { padding-left: 1.25rem; }
.pl-6 { padding-left: 1.5rem; }
.pl-8 { padding-left: 2rem; }
.pl-10 { padding-left: 2.5rem; }
.pl-12 { padding-left: 3rem; }
.pl-16 { padding-left: 4rem; }
.pl-20 { padding-left: 5rem; }
.pl-24 { padding-left: 6rem; }
.pl-32 { padding-left: 8rem; }
.pl-40 { padding-left: 10rem; }
.pl-48 { padding-left: 12rem; }
.pl-56 { padding-left: 14rem; }
.pl-64 { padding-left: 16rem; }

/* Grid */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
.grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
.grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
.grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
.grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
.grid-cols-none { grid-template-columns: none; }

.col-auto { grid-column: auto; }
.col-span-1 { grid-column: span 1 / span 1; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-4 { grid-column: span 4 / span 4; }
.col-span-5 { grid-column: span 5 / span 5; }
.col-span-6 { grid-column: span 6 / span 6; }
.col-span-7 { grid-column: span 7 / span 7; }
.col-span-8 { grid-column: span 8 / span 8; }
.col-span-9 { grid-column: span 9 / span 9; }
.col-span-10 { grid-column: span 10 / span 10; }
.col-span-11 { grid-column: span 11 / span 11; }
.col-span-12 { grid-column: span 12 / span 12; }
.col-span-full { grid-column: 1 / -1; }

.col-start-1 { grid-column-start: 1; }
.col-start-2 { grid-column-start: 2; }
.col-start-3 { grid-column-start: 3; }
.col-start-4 { grid-column-start: 4; }
.col-start-5 { grid-column-start: 5; }
.col-start-6 { grid-column-start: 6; }
.col-start-7 { grid-column-start: 7; }
.col-start-8 { grid-column-start: 8; }
.col-start-9 { grid-column-start: 9; }
.col-start-10 { grid-column-start: 10; }
.col-start-11 { grid-column-start: 11; }
.col-start-12 { grid-column-start: 12; }
.col-start-13 { grid-column-start: 13; }
.col-start-auto { grid-column-start: auto; }

.col-end-1 { grid-column-end: 1; }
.col-end-2 { grid-column-end: 2; }
.col-end-3 { grid-column-end: 3; }
.col-end-4 { grid-column-end: 4; }
.col-end-5 { grid-column-end: 5; }
.col-end-6 { grid-column-end: 6; }
.col-end-7 { grid-column-end: 7; }
.col-end-8 { grid-column-end: 8; }
.col-end-9 { grid-column-end: 9; }
.col-end-10 { grid-column-end: 10; }
.col-end-11 { grid-column-end: 11; }
.col-end-12 { grid-column-end: 12; }
.col-end-13 { grid-column-end: 13; }
.col-end-auto { grid-column-end: auto; }

.gap-0 { gap: 0px; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-5 { gap: 1.25rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.gap-10 { gap: 2.5rem; }
.gap-12 { gap: 3rem; }
.gap-16 { gap: 4rem; }
.gap-20 { gap: 5rem; }
.gap-24 { gap: 6rem; }
.gap-32 { gap: 8rem; }

/* Flexbox */
.flex { display: flex; }
.inline-flex { display: inline-flex; }

.flex-row { flex-direction: row; }
.flex-row-reverse { flex-direction: row-reverse; }
.flex-col { flex-direction: column; }
.flex-col-reverse { flex-direction: column-reverse; }

.flex-wrap { flex-wrap: wrap; }
.flex-wrap-reverse { flex-wrap: wrap-reverse; }
.flex-nowrap { flex-wrap: nowrap; }

.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

.justify-items-start { justify-items: start; }
.justify-items-end { justify-items: end; }
.justify-items-center { justify-items: center; }
.justify-items-stretch { justify-items: stretch; }

.justify-self-auto { justify-self: auto; }
.justify-self-start { justify-self: start; }
.justify-self-end { justify-self: end; }
.justify-self-center { justify-self: center; }
.justify-self-stretch { justify-self: stretch; }

.content-center { align-content: center; }
.content-start { align-content: flex-start; }
.content-end { align-content: flex-end; }
.content-between { align-content: space-between; }
.content-around { align-content: space-around; }
.content-evenly { align-content: space-evenly; }
.content-baseline { align-content: baseline; }

.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }

.self-auto { align-self: auto; }
.self-start { align-self: flex-start; }
.self-end { align-self: flex-end; }
.self-center { align-self: center; }
.self-stretch { align-self: stretch; }
.self-baseline { align-self: baseline; }

.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }

.flex-shrink-0 { flex-shrink: 0; }
.flex-shrink { flex-shrink: 1; }

.flex-grow-0 { flex-grow: 0; }
.flex-grow { flex-grow: 1; }

.order-1 { order: 1; }
.order-2 { order: 2; }
.order-3 { order: 3; }
.order-4 { order: 4; }
.order-5 { order: 5; }
.order-6 { order: 6; }
.order-7 { order: 7; }
.order-8 { order: 8; }
.order-9 { order: 9; }
.order-10 { order: 10; }
.order-11 { order: 11; }
.order-12 { order: 12; }
.order-first { order: -9999; }
.order-last { order: 9999; }
.order-none { order: 0; }

/* Typography */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-base { font-size: 1rem; line-height: 1.5rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.text-5xl { font-size: 3rem; line-height: 1; }
.text-6xl { font-size: 3.75rem; line-height: 1; }
.text-7xl { font-size: 4.5rem; line-height: 1; }
.text-8xl { font-size: 6rem; line-height: 1; }
.text-9xl { font-size: 8rem; line-height: 1; }

.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

.italic { font-style: italic; }
.not-italic { font-style: normal; }

.leading-3 { line-height: .75rem; }
.leading-4 { line-height: 1rem; }
.leading-5 { line-height: 1.25rem; }
.leading-6 { line-height: 1.5rem; }
.leading-7 { line-height: 1.75rem; }
.leading-8 { line-height: 2rem; }
.leading-9 { line-height: 2.25rem; }
.leading-10 { line-height: 2.5rem; }
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.25; }
.leading-snug { line-height: 1.375; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 2; }

.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight { letter-spacing: -0.025em; }
.tracking-normal { letter-spacing: 0em; }
.tracking-wide { letter-spacing: 0.025em; }
.tracking-wider { letter-spacing: 0.05em; }
.tracking-widest { letter-spacing: 0.1em; }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

.text-wrap { text-wrap: wrap; }
.text-nowrap { text-wrap: nowrap; }
.text-balance { text-wrap: balance; }
.text-pretty { text-wrap: pretty; }

.indent-0 { text-indent: 0px; }
.indent-1 { text-indent: 0.25rem; }
.indent-2 { text-indent: 0.5rem; }
.indent-3 { text-indent: 0.75rem; }
.indent-4 { text-indent: 1rem; }
.indent-5 { text-indent: 1.25rem; }
.indent-6 { text-indent: 1.5rem; }
.indent-7 { text-indent: 1.75rem; }
.indent-8 { text-indent: 2rem; }

.align-baseline { vertical-align: baseline; }
.align-top { vertical-align: top; }
.align-middle { vertical-align: middle; }
.align-bottom { vertical-align: bottom; }
.align-text-top { vertical-align: text-top; }
.align-text-bottom { vertical-align: text-bottom; }
.align-sub { vertical-align: sub; }
.align-super { vertical-align: super; }

.whitespace-normal { white-space: normal; }
.whitespace-nowrap { white-space: nowrap; }
.whitespace-pre { white-space: pre; }
.whitespace-pre-line { white-space: pre-line; }
.whitespace-pre-wrap { white-space: pre-wrap; }
.whitespace-break-spaces { white-space: break-spaces; }

.break-normal { overflow-wrap: normal; word-break: normal; }
.break-words { overflow-wrap: break-word; }
.break-all { word-break: break-all; }
.break-keep { word-break: keep-all; }

.hyphens-none { hyphens: none; }
.hyphens-manual { hyphens: manual; }
.hyphens-auto { hyphens: auto; }

.text-ellipsis { text-overflow: ellipsis; }
.text-clip { text-overflow: clip; }

.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }
.normal-case { text-transform: none; }

.underline { text-decoration-line: underline; }
.overline { text-decoration-line: overline; }
.line-through { text-decoration-line: line-through; }
.no-underline { text-decoration-line: none; }

.decoration-solid { text-decoration-style: solid; }
.decoration-double { text-decoration-style: double; }
.decoration-dotted { text-decoration-style: dotted; }
.decoration-dashed { text-decoration-style: dashed; }
.decoration-wavy { text-decoration-style: wavy; }

.decoration-auto { text-decoration-thickness: auto; }
.decoration-from-font { text-decoration-thickness: from-font; }
.decoration-0 { text-decoration-thickness: 0px; }
.decoration-1 { text-decoration-thickness: 1px; }
.decoration-2 { text-decoration-thickness: 2px; }
.decoration-4 { text-decoration-thickness: 4px; }
.decoration-8 { text-decoration-thickness: 8px; }

.underline-offset-auto { text-underline-offset: auto; }
.underline-offset-0 { text-underline-offset: 0px; }
.underline-offset-1 { text-underline-offset: 1px; }
.underline-offset-2 { text-underline-offset: 2px; }
.underline-offset-4 { text-underline-offset: 4px; }
.underline-offset-8 { text-underline-offset: 8px; }

/* Dimensions */
.w-0 { width: 0px; }
.w-px { width: 1px; }
.w-0.5 { width: 0.125rem; }
.w-1 { width: 0.25rem; }
.w-1.5 { width: 0.375rem; }
.w-2 { width: 0.5rem; }
.w-2.5 { width: 0.625rem; }
.w-3 { width: 0.75rem; }
.w-3.5 { width: 0.875rem; }
.w-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.w-6 { width: 1.5rem; }
.w-7 { width: 1.75rem; }
.w-8 { width: 2rem; }
.w-9 { width: 2.25rem; }
.w-10 { width: 2.5rem; }
.w-11 { width: 2.75rem; }
.w-12 { width: 3rem; }
.w-14 { width: 3.5rem; }
.w-16 { width: 4rem; }
.w-20 { width: 5rem; }
.w-24 { width: 6rem; }
.w-28 { width: 7rem; }
.w-32 { width: 8rem; }
.w-36 { width: 9rem; }
.w-40 { width: 10rem; }
.w-44 { width: 11rem; }
.w-48 { width: 12rem; }
.w-52 { width: 13rem; }
.w-56 { width: 14rem; }
.w-60 { width: 15rem; }
.w-64 { width: 16rem; }
.w-72 { width: 18rem; }
.w-80 { width: 20rem; }
.w-96 { width: 24rem; }
.w-auto { width: auto; }
.w-1/2 { width: 50%; }
.w-1/3 { width: 33.333333%; }
.w-2/3 { width: 66.666667%; }
.w-1/4 { width: 25%; }
.w-2/4 { width: 50%; }
.w-3/4 { width: 75%; }
.w-1/5 { width: 20%; }
.w-2/5 { width: 40%; }
.w-3/5 { width: 60%; }
.w-4/5 { width: 80%; }
.w-1/6 { width: 16.666667%; }
.w-2/6 { width: 33.333333%; }
.w-3/6 { width: 50%; }
.w-4/6 { width: 66.666667%; }
.w-5/6 { width: 83.333333%; }
.w-1/12 { width: 8.333333%; }
.w-2/12 { width: 16.666667%; }
.w-3/12 { width: 25%; }
.w-4/12 { width: 33.333333%; }
.w-5/12 { width: 41.666667%; }
.w-6/12 { width: 50%; }
.w-7/12 { width: 58.333333%; }
.w-8/12 { width: 66.666667%; }
.w-9/12 { width: 75%; }
.w-10/12 { width: 83.333333%; }
.w-11/12 { width: 91.666667%; }
.w-full { width: 100%; }
.w-screen { width: 100vw; }
.w-min { width: min-content; }
.w-max { width: max-content; }
.w-fit { width: fit-content; }

.min-w-0 { min-width: 0px; }
.min-w-full { min-width: 100%; }
.min-w-min { min-width: min-content; }
.min-w-max { min-width: max-content; }
.min-w-fit { min-width: fit-content; }

.max-w-0 { max-width: 0rem; }
.max-w-none { max-width: none; }
.max-w-xs { max-width: 20rem; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-6xl { max-width: 72rem; }
.max-w-7xl { max-width: 80rem; }
.max-w-full { max-width: 100%; }
.max-w-min { max-width: min-content; }
.max-w-max { max-width: max-content; }
.max-w-fit { max-width: fit-content; }
.max-w-prose { max-width: 65ch; }
.max-w-screen-sm { max-width: 640px; }
.max-w-screen-md { max-width: 768px; }
.max-w-screen-lg { max-width: 1024px; }
.max-w-screen-xl { max-width: 1280px; }
.max-w-screen-2xl { max-width: 1536px; }

.h-0 { height: 0px; }
.h-px { height: 1px; }
.h-0.5 { height: 0.125rem; }
.h-1 { height: 0.25rem; }
.h-1.5 { height: 0.375rem; }
.h-2 { height: 0.5rem; }
.h-2.5 { height: 0.625rem; }
.h-3 { height: 0.75rem; }
.h-3.5 { height: 0.875rem; }
.h-4 { height: 1rem; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-7 { height: 1.75rem; }
.h-8 { height: 2rem; }
.h-9 { height: 2.25rem; }
.h-10 { height: 2.5rem; }
.h-11 { height: 2.75rem; }
.h-12 { height: 3rem; }
.h-14 { height: 3.5rem; }
.h-16 { height: 4rem; }
.h-20 { height: 5rem; }
.h-24 { height: 6rem; }
.h-28 { height: 7rem; }
.h-32 { height: 8rem; }
.h-36 { height: 9rem; }
.h-40 { height: 10rem; }
.h-44 { height: 11rem; }
.h-48 { height: 12rem; }
.h-52 { height: 13rem; }
.h-56 { height: 14rem; }
.h-60 { height: 15rem; }
.h-64 { height: 16rem; }
.h-72 { height: 18rem; }
.h-80 { height: 20rem; }
.h-96 { height: 24rem; }
.h-auto { height: auto; }
.h-1/2 { height: 50%; }
.h-1/3 { height: 33.333333%; }
.h-2/3 { height: 66.666667%; }
.h-1/4 { height: 25%; }
.h-2/4 { height: 50%; }
.h-3/4 { height: 75%; }
.h-1/5 { height: 20%; }
.h-2/5 { height: 40%; }
.h-3/5 { height: 60%; }
.h-4/5 { height: 80%; }
.h-1/6 { height: 16.666667%; }
.h-2/6 { height: 33.333333%; }
.h-3/6 { height: 50%; }
.h-4/6 { height: 66.666667%; }
.h-5/6 { height: 83.333333%; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.h-min { height: min-content; }
.h-max { height: max-content; }
.h-fit { height: fit-content; }

.min-h-0 { min-height: 0px; }
.min-h-full { min-height: 100%; }
.min-h-screen { min-height: 100vh; }
.min-h-min { min-height: min-content; }
.min-h-max { min-height: max-content; }
.min-h-fit { min-height: fit-content; }

.max-h-0 { max-height: 0px; }
.max-h-px { max-height: 1px; }
.max-h-0.5 { max-height: 0.125rem; }
.max-h-1 { max-height: 0.25rem; }
.max-h-1.5 { max-height: 0.375rem; }
.max-h-2 { max-height: 0.5rem; }
.max-h-2.5 { max-height: 0.625rem; }
.max-h-3 { max-height: 0.75rem; }
.max-h-3.5 { max-height: 0.875rem; }
.max-h-4 { max-height: 1rem; }
.max-h-5 { max-height: 1.25rem; }
.max-h-6 { max-height: 1.5rem; }
.max-h-7 { max-height: 1.75rem; }
.max-h-8 { max-height: 2rem; }
.max-h-9 { max-height: 2.25rem; }
.max-h-10 { max-height: 2.5rem; }
.max-h-11 { max-height: 2.75rem; }
.max-h-12 { max-height: 3rem; }
.max-h-14 { max-height: 3.5rem; }
.max-h-16 { max-height: 4rem; }
.max-h-20 { max-height: 5rem; }
.max-h-24 { max-height: 6rem; }
.max-h-28 { max-height: 7rem; }
.max-h-32 { max-height: 8rem; }
.max-h-36 { max-height: 9rem; }
.max-h-40 { max-height: 10rem; }
.max-h-44 { max-height: 11rem; }
.max-h-48 { max-height: 12rem; }
.max-h-52 { max-height: 13rem; }
.max-h-56 { max-height: 14rem; }
.max-h-60 { max-height: 15rem; }
.max-h-64 { max-height: 16rem; }
.max-h-72 { max-height: 18rem; }
.max-h-80 { max-height: 20rem; }
.max-h-96 { max-height: 24rem; }
.max-h-none { max-height: none; }
.max-h-full { max-height: 100%; }
.max-h-screen { max-height: 100vh; }
.max-h-min { max-height: min-content; }
.max-h-max { max-height: max-content; }
.max-h-fit { max-height: fit-content; }

/* Positioning */
.static { position: static; }
.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.sticky { position: sticky; }

.inset-0 { inset: 0px; }
.inset-1 { inset: 0.25rem; }
.inset-2 { inset: 0.5rem; }
.inset-3 { inset: 0.75rem; }
.inset-4 { inset: 1rem; }
.inset-5 { inset: 1.25rem; }
.inset-6 { inset: 1.5rem; }
.inset-7 { inset: 1.75rem; }
.inset-8 { inset: 2rem; }
.inset-9 { inset: 2.25rem; }
.inset-10 { inset: 2.5rem; }
.inset-11 { inset: 2.75rem; }
.inset-12 { inset: 3rem; }
.inset-14 { inset: 3.5rem; }
.inset-16 { inset: 4rem; }
.inset-20 { inset: 5rem; }
.inset-24 { inset: 6rem; }
.inset-28 { inset: 7rem; }
.inset-32 { inset: 8rem; }
.inset-36 { inset: 9rem; }
.inset-40 { inset: 10rem; }
.inset-44 { inset: 11rem; }
.inset-48 { inset: 12rem; }
.inset-52 { inset: 13rem; }
.inset-56 { inset: 14rem; }
.inset-60 { inset: 15rem; }
.inset-64 { inset: 16rem; }
.inset-72 { inset: 18rem; }
.inset-80 { inset: 20rem; }
.inset-96 { inset: 24rem; }
.inset-auto { inset: auto; }
.inset-1/2 { inset: 50%; }
.inset-1/3 { inset: 33.333333%; }
.inset-2/3 { inset: 66.666667%; }
.inset-1/4 { inset: 25%; }
.inset-2/4 { inset: 50%; }
.inset-3/4 { inset: 75%; }
.inset-full { inset: 100%; }

.inset-x-0 { left: 0px; right: 0px; }
.inset-x-1 { left: 0.25rem; right: 0.25rem; }
.inset-x-2 { left: 0.5rem; right: 0.5rem; }
.inset-x-3 { left: 0.75rem; right: 0.75rem; }
.inset-x-4 { left: 1rem; right: 1rem; }
.inset-x-5 { left: 1.25rem; right: 1.25rem; }
.inset-x-6 { left: 1.5rem; right: 1.5rem; }
.inset-x-7 { left: 1.75rem; right: 1.75rem; }
.inset-x-8 { left: 2rem; right: 2rem; }
.inset-x-9 { left: 2.25rem; right: 2.25rem; }
.inset-x-10 { left: 2.5rem; right: 2.5rem; }
.inset-x-11 { left: 2.75rem; right: 2.75rem; }
.inset-x-12 { left: 3rem; right: 3rem; }
.inset-x-14 { left: 3.5rem; right: 3.5rem; }
.inset-x-16 { left: 4rem; right: 4rem; }
.inset-x-20 { left: 5rem; right: 5rem; }
.inset-x-24 { left: 6rem; right: 6rem; }
.inset-x-28 { left: 7rem; right: 7rem; }
.inset-x-32 { left: 8rem; right: 8rem; }
.inset-x-36 { left: 9rem; right: 9rem; }
.inset-x-40 { left: 10rem; right: 10rem; }
.inset-x-44 { left: 11rem; right: 11rem; }
.inset-x-48 { left: 12rem; right: 12rem; }
.inset-x-52 { left: 13rem; right: 13rem; }
.inset-x-56 { left: 14rem; right: 14rem; }
.inset-x-60 { left: 15rem; right: 15rem; }
.inset-x-64 { left: 16rem; right: 16rem; }
.inset-x-72 { left: 18rem; right: 18rem; }
.inset-x-80 { left: 20rem; right: 20rem; }
.inset-x-96 { left: 24rem; right: 24rem; }
.inset-x-auto { left: auto; right: auto; }
.inset-x-1/2 { left: 50%; right: 50%; }
.inset-x-1/3 { left: 33.333333%; right: 33.333333%; }
.inset-x-2/3 { left: 66.666667%; right: 66.666667%; }
.inset-x-1/4 { left: 25%; right: 25%; }
.inset-x-2/4 { left: 50%; right: 50%; }
.inset-x-3/4 { left: 75%; right: 75%; }
.inset-x-full { left: 100%; right: 100%; }

.inset-y-0 { top: 0px; bottom: 0px; }
.inset-y-1 { top: 0.25rem; bottom: 0.25rem; }
.inset-y-2 { top: 0.5rem; bottom: 0.5rem; }
.inset-y-3 { top: 0.75rem; bottom: 0.75rem; }
.inset-y-4 { top: 1rem; bottom: 1rem; }
.inset-y-5 { top: 1.25rem; bottom: 1.25rem; }
.inset-y-6 { top: 1.5rem; bottom: 1.5rem; }
.inset-y-7 { top: 1.75rem; bottom: 1.75rem; }
.inset-y-8 { top: 2rem; bottom: 2rem; }
.inset-y-9 { top: 2.25rem; bottom: 2.25rem; }
.inset-y-10 { top: 2.5rem; bottom: 2.5rem; }
.inset-y-11 { top: 2.75rem; bottom: 2.75rem; }
.inset-y-12 { top: 3rem; bottom: 3rem; }
.inset-y-14 { top: 3.5rem; bottom: 3.5rem; }
.inset-y-16 { top: 4rem; bottom: 4rem; }
.inset-y-20 { top: 5rem; bottom: 5rem; }
.inset-y-24 { top: 6rem; bottom: 6rem; }
.inset-y-28 { top: 7rem; bottom: 7rem; }
.inset-y-32 { top: 8rem; bottom: 8rem; }
.inset-y-36 { top: 9rem; bottom: 9rem; }
.inset-y-40 { top: 10rem; bottom: 10rem; }
.inset-y-44 { top: 11rem; bottom: 11rem; }
.inset-y-48 { top: 12rem; bottom: 12rem; }
.inset-y-52 { top: 13rem; bottom: 13rem; }
.inset-y-56 { top: 14rem; bottom: 14rem; }
.inset-y-60 { top: 15rem; bottom: 15rem; }
.inset-y-64 { top: 16rem; bottom: 16rem; }
.inset-y-72 { top: 18rem; bottom: 18rem; }
.inset-y-80 { top: 20rem; bottom: 20rem; }
.inset-y-96 { top: 24rem; bottom: 24rem; }
.inset-y-auto { top: auto; bottom: auto; }
.inset-y-1/2 { top: 50%; bottom: 50%; }
.inset-y-1/3 { top: 33.333333%; bottom: 33.333333%; }
.inset-y-2/3 { top: 66.666667%; bottom: 66.666667%; }
.inset-y-1/4 { top: 25%; bottom: 25%; }
.inset-y-2/4 { top: 50%; bottom: 50%; }
.inset-y-3/4 { top: 75%; bottom: 75%; }
.inset-y-full { top: 100%; bottom: 100%; }

.top-0 { top: 0px; }
.top-1 { top: 0.25rem; }
.top-2 { top: 0.5rem; }
.top-3 { top: 0.75rem; }
.top-4 { top: 1rem; }
.top-5 { top: 1.25rem; }
.top-6 { top: 1.5rem; }
.top-7 { top: 1.75rem; }
.top-8 { top: 2rem; }
.top-9 { top: 2.25rem; }
.top-10 { top: 2.5rem; }
.top-11 { top: 2.75rem; }
.top-12 { top: 3rem; }
.top-14 { top: 3.5rem; }
.top-16 { top: 4rem; }
.top-20 { top: 5rem; }
.top-24 { top: 6rem; }
.top-28 { top: 7rem; }
.top-32 { top: 8rem; }
.top-36 { top: 9rem; }
.top-40 { top: 10rem; }
.top-44 { top: 11rem; }
.top-48 { top: 12rem; }
.top-52 { top: 13rem; }
.top-56 { top: 14rem; }
.top-60 { top: 15rem; }
.top-64 { top: 16rem; }
.top-72 { top: 18rem; }
.top-80 { top: 20rem; }
.top-96 { top: 24rem; }
.top-auto { top: auto; }
.top-1/2 { top: 50%; }
.top-1/3 { top: 33.333333%; }
.top-2/3 { top: 66.666667%; }
.top-1/4 { top: 25%; }
.top-2/4 { top: 50%; }
.top-3/4 { top: 75%; }
.top-full { top: 100%; }

.right-0 { right: 0px; }
.right-1 { right: 0.25rem; }
.right-2 { right: 0.5rem; }
.right-3 { right: 0.75rem; }
.right-4 { right: 1rem; }
.right-5 { right: 1.25rem; }
.right-6 { right: 1.5rem; }
.right-7 { right: 1.75rem; }
.right-8 { right: 2rem; }
.right-9 { right: 2.25rem; }
.right-10 { right: 2.5rem; }
.right-11 { right: 2.75rem; }
.right-12 { right: 3rem; }
.right-14 { right: 3.5rem; }
.right-16 { right: 4rem; }
.right-20 { right: 5rem; }
.right-24 { right: 6rem; }
.right-28 { right: 7rem; }
.right-32 { right: 8rem; }
.right-36 { right: 9rem; }
.right-40 { right: 10rem; }
.right-44 { right: 11rem; }
.right-48 { right: 12rem; }
.right-52 { right: 13rem; }
.right-56 { right: 14rem; }
.right-60 { right: 15rem; }
.right-64 { right: 16rem; }
.right-72 { right: 18rem; }
.right-80 { right: 20rem; }
.right-96 { right: 24rem; }
.right-auto { right: auto; }
.right-1/2 { right: 50%; }
.right-1/3 { right: 33.333333%; }
.right-2/3 { right: 66.666667%; }
.right-1/4 { right: 25%; }
.right-2/4 { right: 50%; }
.right-3/4 { right: 75%; }
.right-full { right: 100%; }

.bottom-0 { bottom: 0px; }
.bottom-1 { bottom: 0.25rem; }
.bottom-2 { bottom: 0.5rem; }
.bottom-3 { bottom: 0.75rem; }
.bottom-4 { bottom: 1rem; }
.bottom-5 { bottom: 1.25rem; }
.bottom-6 { bottom: 1.5rem; }
.bottom-7 { bottom: 1.75rem; }
.bottom-8 { bottom: 2rem; }
.bottom-9 { bottom: 2.25rem; }
.bottom-10 { bottom: 2.5rem; }
.bottom-11 { bottom: 2.75rem; }
.bottom-12 { bottom: 3rem; }
.bottom-14 { bottom: 3.5rem; }
.bottom-16 { bottom: 4rem; }
.bottom-20 { bottom: 5rem; }
.bottom-24 { bottom: 6rem; }
.bottom-28 { bottom: 7rem; }
.bottom-32 { bottom: 8rem; }
.bottom-36 { bottom: 9rem; }
.bottom-40 { bottom: 10rem; }
.bottom-44 { bottom: 11rem; }
.bottom-48 { bottom: 12rem; }
.bottom-52 { bottom: 13rem; }
.bottom-56 { bottom: 14rem; }
.bottom-60 { bottom: 15rem; }
.bottom-64 { bottom: 16rem; }
.bottom-72 { bottom: 18rem; }
.bottom-80 { bottom: 20rem; }
.bottom-96 { bottom: 24rem; }
.bottom-auto { bottom: auto; }
.bottom-1/2 { bottom: 50%; }
.bottom-1/3 { bottom: 33.333333%; }
.bottom-2/3 { bottom: 66.666667%; }
.bottom-1/4 { bottom: 25%; }
.bottom-2/4 { bottom: 50%; }
.bottom-3/4 { bottom: 75%; }
.bottom-full { bottom: 100%; }

.left-0 { left: 0px; }
.left-1 { left: 0.25rem; }
.left-2 { left: 0.5rem; }
.left-3 { left: 0.75rem; }
.left-4 { left: 1rem; }
.left-5 { left: 1.25rem; }
.left-6 { left: 1.5rem; }
.left-7 { left: 1.75rem; }
.left-8 { left: 2rem; }
.left-9 { left: 2.25rem; }
.left-10 { left: 2.5rem; }
.left-11 { left: 2.75rem; }
.left-12 { left: 3rem; }
.left-14 { left: 3.5rem; }
.left-16 { left: 4rem; }
.left-20 { left: 5rem; }
.left-24 { left: 6rem; }
.left-28 { left: 7rem; }
.left-32 { left: 8rem; }
.left-36 { left: 9rem; }
.left-40 { left: 10rem; }
.left-44 { left: 11rem; }
.left-48 { left: 12rem; }
.left-52 { left: 13rem; }
.left-56 { left: 14rem; }
.left-60 { left: 15rem; }
.left-64 { left: 16rem; }
.left-72 { left: 18rem; }
.left-80 { left: 20rem; }
.left-96 { left: 24rem; }
.left-auto { left: auto; }
.left-1/2 { left: 50%; }
.left-1/3 { left: 33.333333%; }
.left-2/3 { left: 66.666667%; }
.left-1/4 { left: 25%; }
.left-2/4 { left: 50%; }
.left-3/4 { left: 75%; }
.left-full { left: 100%; }

/* Z-index */
.z-0 { z-index: 0; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.z-30 { z-index: 30; }
.z-40 { z-index: 40; }
.z-50 { z-index: 50; }
.z-auto { z-index: auto; }

/* Display */
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.table { display: table; }
.inline-table { display: inline-table; }
.table-caption { display: table-caption; }
.table-cell { display: table-cell; }
.table-column { display: table-column; }
.table-column-group { display: table-column-group; }
.table-footer-group { display: table-footer-group; }
.table-header-group { display: table-header-group; }
.table-row-group { display: table-row-group; }
.table-row { display: table-row; }
.flow-root { display: flow-root; }
.grid { display: grid; }
.inline-grid { display: inline-grid; }
.contents { display: contents; }
.list-item { display: list-item; }
.hidden { display: none; }

/* Visibility */
.visible { visibility: visible; }
.invisible { visibility: hidden; }
.collapse { visibility: collapse; }

/* Overflow */
.overflow-auto { overflow: auto; }
.overflow-hidden { overflow: hidden; }
.overflow-clip { overflow: clip; }
.overflow-visible { overflow: visible; }
.overflow-scroll { overflow: scroll; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-auto { overflow-y: auto; }
.overflow-x-hidden { overflow-x: hidden; }
.overflow-y-hidden { overflow-y: hidden; }
.overflow-x-clip { overflow-x: clip; }
.overflow-y-clip { overflow-y: clip; }
.overflow-x-visible { overflow-x: visible; }
.overflow-y-visible { overflow-y: visible; }
.overflow-x-scroll { overflow-x: scroll; }
.overflow-y-scroll { overflow-y: scroll; }

/* Position */
.overscroll-auto { overscroll-behavior: auto; }
.overscroll-contain { overscroll-behavior: contain; }
.overscroll-none { overscroll-behavior: none; }
.overscroll-y-auto { overscroll-behavior-y: auto; }
.overscroll-y-contain { overscroll-behavior-y: contain; }
.overscroll-y-none { overscroll-behavior-y: none; }
.overscroll-x-auto { overscroll-behavior-x: auto; }
.overscroll-x-contain { overscroll-behavior-x: contain; }
.overscroll-x-none { overscroll-behavior-x: none; }

/* Border radius */
.rounded-none { border-radius: 0px; }
.rounded-sm { border-radius: 0.125rem; }
.rounded { border-radius: 0.25rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-3xl { border-radius: 1.5rem; }
.rounded-full { border-radius: 9999px; }

.rounded-s-none { border-start-start-radius: 0px; border-end-start-radius: 0px; }
.rounded-s-sm { border-start-start-radius: 0.125rem; border-end-start-radius: 0.125rem; }
.rounded-s { border-start-start-radius: 0.25rem; border-end-start-radius: 0.25rem; }
.rounded-s-md { border-start-start-radius: 0.375rem; border-end-start-radius: 0.375rem; }
.rounded-s-lg { border-start-start-radius: 0.5rem; border-end-start-radius: 0.5rem; }
.rounded-s-xl { border-start-start-radius: 0.75rem; border-end-start-radius: 0.75rem; }
.rounded-s-2xl { border-start-start-radius: 1rem; border-end-start-radius: 1rem; }
.rounded-s-3xl { border-start-start-radius: 1.5rem; border-end-start-radius: 1.5rem; }
.rounded-s-full { border-start-start-radius: 9999px; border-end-start-radius: 9999px; }

.rounded-e-none { border-start-end-radius: 0px; border-end-end-radius: 0px; }
.rounded-e-sm { border-start-end-radius: 0.125rem; border-end-end-radius: 0.125rem; }
.rounded-e { border-start-end-radius: 0.25rem; border-end-end-radius: 0.25rem; }
.rounded-e-md { border-start-end-radius: 0.375rem; border-end-end-radius: 0.375rem; }
.rounded-e-lg { border-start-end-radius: 0.5rem; border-end-end-radius: 0.5rem; }
.rounded-e-xl { border-start-end-radius: 0.75rem; border-end-end-radius: 0.75rem; }
.rounded-e-2xl { border-start-end-radius: 1rem; border-end-end-radius: 1rem; }
.rounded-e-3xl { border-start-end-radius: 1.5rem; border-end-end-radius: 1.5rem; }
.rounded-e-full { border-start-end-radius: 9999px; border-end-end-radius: 9999px; }

.rounded-t-none { border-top-left-radius: 0px; border-top-right-radius: 0px; }
.rounded-t-sm { border-top-left-radius: 0.125rem; border-top-right-radius: 0.125rem; }
.rounded-t { border-top-left-radius: 0.25rem; border-top-right-radius: 0.25rem; }
.rounded-t-md { border-top-left-radius: 0.375rem; border-top-right-radius: 0.375rem; }
.rounded-t-lg { border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; }
.rounded-t-xl { border-top-left-radius: 0.75rem; border-top-right-radius: 0.75rem; }
.rounded-t-2xl { border-top-left-radius: 1rem; border-top-right-radius: 1rem; }
.rounded-t-3xl { border-top-left-radius: 1.5rem; border-top-right-radius: 1.5rem; }
.rounded-t-full { border-top-left-radius: 9999px; border-top-right-radius: 9999px; }

.rounded-r-none { border-top-right-radius: 0px; border-bottom-right-radius: 0px; }
.rounded-r-sm { border-top-right-radius: 0.125rem; border-bottom-right-radius: 0.125rem; }
.rounded-r { border-top-right-radius: 0.25rem; border-bottom-right-radius: 0.25rem; }
.rounded-r-md { border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem; }
.rounded-r-lg { border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
.rounded-r-xl { border-top-right-radius: 0.75rem; border-bottom-right-radius: 0.75rem; }
.rounded-r-2xl { border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; }
.rounded-r-3xl { border-top-right-radius: 1.5rem; border-bottom-right-radius: 1.5rem; }
.rounded-r-full { border-top-right-radius: 9999px; border-bottom-right-radius: 9999px; }

.rounded-b-none { border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; }
.rounded-b-sm { border-bottom-right-radius: 0.125rem; border-bottom-left-radius: 0.125rem; }
.rounded-b { border-bottom-right-radius: 0.25rem; border-bottom-left-radius: 0.25rem; }
.rounded-b-md { border-bottom-right-radius: 0.375rem; border-bottom-left-radius: 0.375rem; }
.rounded-b-lg { border-bottom-right-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }
.rounded-b-xl { border-bottom-right-radius: 0.75rem; border-bottom-left-radius: 0.75rem; }
.rounded-b-2xl { border-bottom-right-radius: 1rem; border-bottom-left-radius: 1rem; }
.rounded-b-3xl { border-bottom-right-radius: 1.5rem; border-bottom-left-radius: 1.5rem; }
.rounded-b-full { border-bottom-right-radius: 9999px; border-bottom-left-radius: 9999px; }

.rounded-l-none { border-top-left-radius: 0px; border-bottom-left-radius: 0px; }
.rounded-l-sm { border-top-left-radius: 0.125rem; border-bottom-left-radius: 0.125rem; }
.rounded-l { border-top-left-radius: 0.25rem; border-bottom-left-radius: 0.25rem; }
.rounded-l-md { border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem; }
.rounded-l-lg { border-top-left-radius: 0.5rem; border-bottom-left-radius: 0.5rem; }
.rounded-l-xl { border-top-left-radius: 0.75rem; border-bottom-left-radius: 0.75rem; }
.rounded-l-2xl { border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; }
.rounded-l-3xl { border-top-left-radius: 1.5rem; border-bottom-left-radius: 1.5rem; }
.rounded-l-full { border-top-left-radius: 9999px; border-bottom-left-radius: 9999px; }

.rounded-tl-none { border-top-left-radius: 0px; }
.rounded-tl-sm { border-top-left-radius: 0.125rem; }
.rounded-tl { border-top-left-radius: 0.25rem; }
.rounded-tl-md { border-top-left-radius: 0.375rem; }
.rounded-tl-lg { border-top-left-radius: 0.5rem; }
.rounded-tl-xl { border-top-left-radius: 0.75rem; }
.rounded-tl-2xl { border-top-left-radius: 1rem; }
.rounded-tl-3xl { border-top-left-radius: 1.5rem; }
.rounded-tl-full { border-top-left-radius: 9999px; }

.rounded-tr-none { border-top-right-radius: 0px; }
.rounded-tr-sm { border-top-right-radius: 0.125rem; }
.rounded-tr { border-top-right-radius: 0.25rem; }
.rounded-tr-md { border-top-right-radius: 0.375rem; }
.rounded-tr-lg { border-top-right-radius: 0.5rem; }
.rounded-tr-xl { border-top-right-radius: 0.75rem; }
.rounded-tr-2xl { border-top-right-radius: 1rem; }
.rounded-tr-3xl { border-top-right-radius: 1.5rem; }
.rounded-tr-full { border-top-right-radius: 9999px; }

.rounded-br-none { border-bottom-right-radius: 0px; }
.rounded-br-sm { border-bottom-right-radius: 0.125rem; }
.rounded-br { border-bottom-right-radius: 0.25rem; }
.rounded-br-md { border-bottom-right-radius: 0.375rem; }
.rounded-br-lg { border-bottom-right-radius: 0.5rem; }
.rounded-br-xl { border-bottom-right-radius: 0.75rem; }
.rounded-br-2xl { border-bottom-right-radius: 1rem; }
.rounded-br-3xl { border-bottom-right-radius: 1.5rem; }
.rounded-br-full { border-bottom-right-radius: 9999px; }

.rounded-bl-none { border-bottom-left-radius: 0px; }
.rounded-bl-sm { border-bottom-left-radius: 0.125rem; }
.rounded-bl { border-bottom-left-radius: 0.25rem; }
.rounded-bl-md { border-bottom-left-radius: 0.375rem; }
.rounded-bl-lg { border-bottom-left-radius: 0.5rem; }
.rounded-bl-xl { border-bottom-left-radius: 0.75rem; }
.rounded-bl-2xl { border-bottom-left-radius: 1rem; }
.rounded-bl-3xl { border-bottom-left-radius: 1.5rem; }
.rounded-bl-full { border-bottom-left-radius: 9999px; }

/* Borders */
.border-0 { border-width: 0px; }
.border-2 { border-width: 2px; }
.border-4 { border-width: 4px; }
.border-8 { border-width: 8px; }
.border { border-width: 1px; }

.border-x-0 { border-left-width: 0px; border-right-width: 0px; }
.border-x-2 { border-left-width: 2px; border-right-width: 2px; }
.border-x-4 { border-left-width: 4px; border-right-width: 4px; }
.border-x-8 { border-left-width: 8px; border-right-width: 8px; }
.border-x { border-left-width: 1px; border-right-width: 1px; }

.border-y-0 { border-top-width: 0px; border-bottom-width: 0px; }
.border-y-2 { border-top-width: 2px; border-bottom-width: 2px; }
.border-y-4 { border-top-width: 4px; border-bottom-width: 4px; }
.border-y-8 { border-top-width: 8px; border-bottom-width: 8px; }
.border-y { border-top-width: 1px; border-bottom-width: 1px; }

.border-s-0 { border-inline-start-width: 0px; }
.border-s-2 { border-inline-start-width: 2px; }
.border-s-4 { border-inline-start-width: 4px; }
.border-s-8 { border-inline-start-width: 8px; }
.border-s { border-inline-start-width: 1px; }

.border-e-0 { border-inline-end-width: 0px; }
.border-e-2 { border-inline-end-width: 2px; }
.border-e-4 { border-inline-end-width: 4px; }
.border-e-8 { border-inline-end-width: 8px; }
.border-e { border-inline-end-width: 1px; }

.border-t-0 { border-top-width: 0px; }
.border-t-2 { border-top-width: 2px; }
.border-t-4 { border-top-width: 4px; }
.border-t-8 { border-top-width: 8px; }
.border-t { border-top-width: 1px; }

.border-r-0 { border-right-width: 0px; }
.border-r-2 { border-right-width: 2px; }
.border-r-4 { border-right-width: 4px; }
.border-r-8 { border-right-width: 8px; }
.border-r { border-right-width: 1px; }

.border-b-0 { border-bottom-width: 0px; }
.border-b-2 { border-bottom-width: 2px; }
.border-b-4 { border-bottom-width: 4px; }
.border-b-8 { border-bottom-width: 8px; }
.border-b { border-bottom-width: 1px; }

.border-l-0 { border-left-width: 0px; }
.border-l-2 { border-left-width: 2px; }
.border-l-4 { border-left-width: 4px; }
.border-l-8 { border-left-width: 8px; }
.border-l { border-left-width: 1px; }

/* Border colors */
.border-inherit { border-color: inherit; }
.border-current { border-color: currentColor; }
.border-transparent { border-color: transparent; }
.border-black { border-color: rgb(0 0 0); }
.border-white { border-color: rgb(255 255 255); }

.border-slate-50 { border-color: rgb(248 250 252); }
.border-slate-100 { border-color: rgb(241 245 249); }
.border-slate-200 { border-color: rgb(226 232 240); }
.border-slate-300 { border-color: rgb(203 213 225); }
.border-slate-400 { border-color: rgb(148 163 184); }
.border-slate-500 { border-color: rgb(100 116 139); }
.border-slate-600 { border-color: rgb(71 85 105); }
.border-slate-700 { border-color: rgb(51 65 85); }
.border-slate-800 { border-color: rgb(30 41 59); }
.border-slate-900 { border-color: rgb(15 23 42); }
.border-slate-950 { border-color: rgb(2 6 23); }

.border-gray-50 { border-color: rgb(249 250 251); }
.border-gray-100 { border-color: rgb(243 244 246); }
.border-gray-200 { border-color: rgb(229 231 235); }
.border-gray-300 { border-color: rgb(209 213 219); }
.border-gray-400 { border-color: rgb(156 163 175); }
.border-gray-500 { border-color: rgb(107 114 128); }
.border-gray-600 { border-color: rgb(75 85 99); }
.border-gray-700 { border-color: rgb(55 65 81); }
.border-gray-800 { border-color: rgb(31 41 55); }
.border-gray-900 { border-color: rgb(17 24 39); }
.border-gray-950 { border-color: rgb(3 7 18); }

.border-zinc-50 { border-color: rgb(250 250 250); }
.border-zinc-100 { border-color: rgb(244 244 245); }
.border-zinc-200 { border-color: rgb(228 228 231); }
.border-zinc-300 { border-color: rgb(212 212 216); }
.border-zinc-400 { border-color: rgb(161 161 170); }
.border-zinc-500 { border-color: rgb(113 113 122); }
.border-zinc-600 { border-color: rgb(82 82 91); }
.border-zinc-700 { border-color: rgb(63 63 70); }
.border-zinc-800 { border-color: rgb(39 39 42); }
.border-zinc-900 { border-color: rgb(24 24 27); }
.border-zinc-950 { border-color: rgb(9 9 11); }

.border-neutral-50 { border-color: rgb(250 250 250); }
.border-neutral-100 { border-color: rgb(245 245 245); }
.border-neutral-200 { border-color: rgb(229 229 229); }
.border-neutral-300 { border-color: rgb(212 212 212); }
.border-neutral-400 { border-color: rgb(163 163 163); }
.border-neutral-500 { border-color: rgb(115 115 115); }
.border-neutral-600 { border-color: rgb(82 82 82); }
.border-neutral-700 { border-color: rgb(64 64 64); }
.border-neutral-800 { border-color: rgb(38 38 38); }
.border-neutral-900 { border-color: rgb(23 23 23); }
.border-neutral-950 { border-color: rgb(10 10 10); }

.border-stone-50 { border-color: rgb(250 250 249); }
.border-stone-100 { border-color: rgb(245 245 244); }
.border-stone-200 { border-color: rgb(231 229 228); }
.border-stone-300 { border-color: rgb(214 211 209); }
.border-stone-400 { border-color: rgb(168 162 158); }
.border-stone-500 { border-color: rgb(120 113 108); }
.border-stone-600 { border-color: rgb(87 83 78); }
.border-stone-700 { border-color: rgb(68 64 60); }
.border-stone-800 { border-color: rgb(41 37 36); }
.border-stone-900 { border-color: rgb(28 25 23); }
.border-stone-950 { border-color: rgb(12 10 9); }

.border-red-50 { border-color: rgb(254 242 242); }
.border-red-100 { border-color: rgb(254 226 226); }
.border-red-200 { border-color: rgb(254 202 202); }
.border-red-300 { border-color: rgb(252 165 165); }
.border-red-400 { border-color: rgb(248 113 113); }
.border-red-500 { border-color: rgb(239 68 68); }
.border-red-600 { border-color: rgb(220 38 38); }
.border-red-700 { border-color: rgb(185 28 28); }
.border-red-800 { border-color: rgb(153 27 27); }
.border-red-900 { border-color: rgb(127 29 29); }
.border-red-950 { border-color: rgb(69 10 10); }

.border-orange-50 { border-color: rgb(255 247 237); }
.border-orange-100 { border-color: rgb(255 237 213); }
.border-orange-200 { border-color: rgb(254 215 170); }
.border-orange-300 { border-color: rgb(253 186 116); }
.border-orange-400 { border-color: rgb(251 146 60); }
.border-orange-500 { border-color: rgb(249 115 22); }
.border-orange-600 { border-color: rgb(234 88 12); }
.border-orange-700 { border-color: rgb(194 65 12); }
.border-orange-800 { border-color: rgb(154 52 18); }
.border-orange-900 { border-color: rgb(124 45 18); }
.border-orange-950 { border-color: rgb(67 20 7); }

.border-amber-50 { border-color: rgb(255 251 235); }
.border-amber-100 { border-color: rgb(254 243 199); }
.border-amber-200 { border-color: rgb(253 230 138); }
.border-amber-300 { border-color: rgb(252 211 77); }
.border-amber-400 { border-color: rgb(251 191 36); }
.border-amber-500 { border-color: rgb(245 158 11); }
.border-amber-600 { border-color: rgb(217 119 6); }
.border-amber-700 { border-color: rgb(180 83 9); }
.border-amber-800 { border-color: rgb(146 64 14); }
.border-amber-900 { border-color: rgb(120 53 15); }
.border-amber-950 { border-color: rgb(69 26 3); }

.border-yellow-50 { border-color: rgb(254 252 232); }
.border-yellow-100 { border-color: rgb(254 249 195); }
.border-yellow-200 { border-color: rgb(254 240 138); }
.border-yellow-300 { border-color: rgb(253 224 71); }
.border-yellow-400 { border-color: rgb(250 204 21); }
.border-yellow-500 { border-color: rgb(234 179 8); }
.border-yellow-600 { border-color: rgb(202 138 4); }
.border-yellow-700 { border-color: rgb(161 98 7); }
.border-yellow-800 { border-color: rgb(133 77 14); }
.border-yellow-900 { border-color: rgb(113 63 18); }
.border-yellow-950 { border-color: rgb(66 32 6); }

.border-lime-50 { border-color: rgb(247 254 231); }
.border-lime-100 { border-color: rgb(236 252 203); }
.border-lime-200 { border-color: rgb(217 249 157); }
.border-lime-300 { border-color: rgb(190 242 100); }
.border-lime-400 { border-color: rgb(163 230 53); }
.border-lime-500 { border-color: rgb(132 204 22); }
.border-lime-600 { border-color: rgb(101 163 13); }
.border-lime-700 { border-color: rgb(77 124 15); }
.border-lime-800 { border-color: rgb(63 98 18); }
.border-lime-900 { border-color: rgb(54 83 20); }
.border-lime-950 { border-color: rgb(26 46 5); }

.border-green-50 { border-color: rgb(240 253 244); }
.border-green-100 { border-color: rgb(220 252 231); }
.border-green-200 { border-color: rgb(187 247 208); }
.border-green-300 { border-color: rgb(134 239 172); }
.border-green-400 { border-color: rgb(74 222 128); }
.border-green-500 { border-color: rgb(34 197 94); }
.border-green-600 { border-color: rgb(22 163 74); }
.border-green-700 { border-color: rgb(21 128 61); }
.border-green-800 { border-color: rgb(22 101 52); }
.border-green-900 { border-color: rgb(20 83 45); }
.border-green-950 { border-color: rgb(5 46 22); }

.border-emerald-50 { border-color: rgb(236 253 245); }
.border-emerald-100 { border-color: rgb(209 250 229); }
.border-emerald-200 { border-color: rgb(167 243 208); }
.border-emerald-300 { border-color: rgb(110 231 183); }
.border-emerald-400 { border-color: rgb(52 211 153); }
.border-emerald-500 { border-color: rgb(16 185 129); }
.border-emerald-600 { border-color: rgb(5 150 105); }
.border-emerald-700 { border-color: rgb(4 120 87); }
.border-emerald-800 { border-color: rgb(6 95 70); }
.border-emerald-900 { border-color: rgb(6 78 59); }
.border-emerald-950 { border-color: rgb(2 44 34); }

.border-teal-50 { border-color: rgb(240 253 250); }
.border-teal-100 { border-color: rgb(204 251 241); }
.border-teal-200 { border-color: rgb(153 246 228); }
.border-teal-300 { border-color: rgb(94 234 212); }
.border-teal-400 { border-color: rgb(45 212 191); }
.border-teal-500 { border-color: rgb(20 184 166); }
.border-teal-600 { border-color: rgb(13 148 136); }
.border-teal-700 { border-color: rgb(15 118 110); }
.border-teal-800 { border-color: rgb(17 94 89); }
.border-teal-900 { border-color: rgb(19 78 74); }
.border-teal-950 { border-color: rgb(4 47 46); }

.border-cyan-50 { border-color: rgb(236 254 255); }
.border-cyan-100 { border-color: rgb(207 250 254); }
.border-cyan-200 { border-color: rgb(165 243 252); }
.border-cyan-300 { border-color: rgb(103 232 249); }
.border-cyan-400 { border-color: rgb(34 211 238); }
.border-cyan-500 { border-color: rgb(6 182 212); }
.border-cyan-600 { border-color: rgb(8 145 178); }
.border-cyan-700 { border-color: rgb(14 116 144); }
.border-cyan-800 { border-color: rgb(21 94 117); }
.border-cyan-900 { border-color: rgb(22 78 99); }
.border-cyan-950 { border-color: rgb(8 51 68); }

.border-sky-50 { border-color: rgb(240 249 255); }
.border-sky-100 { border-color: rgb(224 242 254); }
.border-sky-200 { border-color: rgb(186 230 253); }
.border-sky-300 { border-color: rgb(125 211 252); }
.border-sky-400 { border-color: rgb(56 189 248); }
.border-sky-500 { border-color: rgb(14 165 233); }
.border-sky-600 { border-color: rgb(2 132 199); }
.border-sky-700 { border-color: rgb(3 105 161); }
.border-sky-800 { border-color: rgb(7 89 133); }
.border-sky-900 { border-color: rgb(12 74 110); }
.border-sky-950 { border-color: rgb(8 47 73); }

.border-blue-50 { border-color: rgb(239 246 255); }
.border-blue-100 { border-color: rgb(219 234 254); }
.border-blue-200 { border-color: rgb(191 219 254); }
.border-blue-300 { border-color: rgb(147 197 253); }
.border-blue-400 { border-color: rgb(96 165 250); }
.border-blue-500 { border-color: rgb(59 130 246); }
.border-blue-600 { border-color: rgb(37 99 235); }
.border-blue-700 { border-color: rgb(29 78 216); }
.border-blue-800 { border-color: rgb(30 64 175); }
.border-blue-900 { border-color: rgb(30 58 138); }
.border-blue-950 { border-color: rgb(23 37 84); }

.border-indigo-50 { border-color: rgb(238 242 255); }
.border-indigo-100 { border-color: rgb(224 231 255); }
.border-indigo-200 { border-color: rgb(199 210 254); }
.border-indigo-300 { border-color: rgb(165 180 252); }
.border-indigo-400 { border-color: rgb(129 140 248); }
.border-indigo-500 { border-color: rgb(99 102 241); }
.border-indigo-600 { border-color: rgb(79 70 229); }
.border-indigo-700 { border-color: rgb(67 56 202); }
.border-indigo-800 { border-color: rgb(55 48 163); }
.border-indigo-900 { border-color: rgb(49 46 129); }
.border-indigo-950 { border-color: rgb(30 27 75); }

.border-violet-50 { border-color: rgb(245 243 255); }
.border-violet-100 { border-color: rgb(237 233 254); }
.border-violet-200 { border-color: rgb(221 214 254); }
.border-violet-300 { border-color: rgb(196 181 253); }
.border-violet-400 { border-color: rgb(167 139 250); }
.border-violet-500 { border-color: rgb(139 92 246); }
.border-violet-600 { border-color: rgb(124 58 237); }
.border-violet-700 { border-color: rgb(109 40 217); }
.border-violet-800 { border-color: rgb(91 33 182); }
.border-violet-900 { border-color: rgb(76 29 149); }
.border-violet-950 { border-color: rgb(46 16 101); }

.border-purple-50 { border-color: rgb(250 245 255); }
.border-purple-100 { border-color: rgb(243 232 255); }
.border-purple-200 { border-color: rgb(233 213 255); }
.border-purple-300 { border-color: rgb(216 180 254); }
.border-purple-400 { border-color: rgb(196 181 253); }
.border-purple-500 { border-color: rgb(168 85 247); }
.border-purple-600 { border-color: rgb(147 51 234); }
.border-purple-700 { border-color: rgb(126 34 206); }
.border-purple-800 { border-color: rgb(107 33 168); }
.border-purple-900 { border-color: rgb(88 28 135); }
.border-purple-950 { border-color: rgb(59 7 100); }

.border-fuchsia-50 { border-color: rgb(253 244 255); }
.border-fuchsia-100 { border-color: rgb(250 232 255); }
.border-fuchsia-200 { border-color: rgb(245 208 254); }
.border-fuchsia-300 { border-color: rgb(240 171 252); }
.border-fuchsia-400 { border-color: rgb(232 121 249); }
.border-fuchsia-500 { border-color: rgb(217 70 239); }
.border-fuchsia-600 { border-color: rgb(192 38 211); }
.border-fuchsia-700 { border-color: rgb(162 28 175); }
.border-fuchsia-800 { border-color: rgb(134 25 143); }
.border-fuchsia-900 { border-color: rgb(112 26 117); }
.border-fuchsia-950 { border-color: rgb(74 4 78); }

.border-pink-50 { border-color: rgb(253 242 248); }
.border-pink-100 { border-color: rgb(252 231 243); }
.border-pink-200 { border-color: rgb(251 207 232); }
.border-pink-300 { border-color: rgb(249 168 212); }
.border-pink-400 { border-color: rgb(244 114 182); }
.border-pink-500 { border-color: rgb(236 72 153); }
.border-pink-600 { border-color: rgb(219 39 119); }
.border-pink-700 { border-color: rgb(190 24 93); }
.border-pink-800 { border-color: rgb(157 23 77); }
.border-pink-900 { border-color: rgb(131 24 67); }
.border-pink-950 { border-color: rgb(80 7 36); }

.border-rose-50 { border-color: rgb(255 241 242); }
.border-rose-100 { border-color: rgb(255 228 230); }
.border-rose-200 { border-color: rgb(254 205 211); }
.border-rose-300 { border-color: rgb(253 164 175); }
.border-rose-400 { border-color: rgb(251 113 133); }
.border-rose-500 { border-color: rgb(244 63 94); }
.border-rose-600 { border-color: rgb(225 29 72); }
.border-rose-700 { border-color: rgb(190 18 60); }
.border-rose-800 { border-color: rgb(159 18 57); }
.border-rose-900 { border-color: rgb(136 19 55); }
.border-rose-950 { border-color: rgb(76 5 25); }

/* Border styles */
.border-solid { border-style: solid; }
.border-dashed { border-style: dashed; }
.border-dotted { border-style: dotted; }
.border-double { border-style: double; }
.border-hidden { border-style: hidden; }
.border-none { border-style: none; }

/* Box shadow */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
.shadow-inner { box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05); }
.shadow-none { box-shadow: 0 0 #0000; }

/* Shadow colors */
.shadow-slate-50 { --tw-shadow-color: #f8fafc; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-100 { --tw-shadow-color: #f1f5f9; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-200 { --tw-shadow-color: #e2e8f0; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-300 { --tw-shadow-color: #cbd5e1; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-400 { --tw-shadow-color: #94a3b8; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-500 { --tw-shadow-color: #64748b; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-600 { --tw-shadow-color: #475569; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-700 { --tw-shadow-color: #334155; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-800 { --tw-shadow-color: #1e293b; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-900 { --tw-shadow-color: #0f172a; --tw-shadow: var(--tw-shadow-colored); }
.shadow-slate-950 { --tw-shadow-color: #020617; --tw-shadow: var(--tw-shadow-colored); }

.shadow-gray-50 { --tw-shadow-color: #f9fafb; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-100 { --tw-shadow-color: #f3f4f6; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-200 { --tw-shadow-color: #e5e7eb; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-300 { --tw-shadow-color: #d1d5db; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-400 { --tw-shadow-color: #9ca3af; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-500 { --tw-shadow-color: #6b7280; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-600 { --tw-shadow-color: #4b5563; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-700 { --tw-shadow-color: #374151; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-800 { --tw-shadow-color: #1f2937; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-900 { --tw-shadow-color: #111827; --tw-shadow: var(--tw-shadow-colored); }
.shadow-gray-950 { --tw-shadow-color: #030712; --tw-shadow: var(--tw-shadow-colored); }

.shadow-blue-50 { --tw-shadow-color: #eff6ff; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-100 { --tw-shadow-color: #dbeafe; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-200 { --tw-shadow-color: #bfdbfe; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-300 { --tw-shadow-color: #93c5fd; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-400 { --tw-shadow-color: #60a5fa; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-500 { --tw-shadow-color: #3b82f6; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-600 { --tw-shadow-color: #2563eb; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-700 { --tw-shadow-color: #1d4ed8; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-800 { --tw-shadow-color: #1e40af; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-900 { --tw-shadow-color: #1e3a8a; --tw-shadow: var(--tw-shadow-colored); }
.shadow-blue-950 { --tw-shadow-color: #172554; --tw-shadow: var(--tw-shadow-colored); }

.shadow-purple-50 { --tw-shadow-color: #faf5ff; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-100 { --tw-shadow-color: #f3e8ff; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-200 { --tw-shadow-color: #e9d5ff; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-300 { --tw-shadow-color: #d8b4fe; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-400 { --tw-shadow-color: #c4b5fd; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-500 { --tw-shadow-color: #a855f7; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-600 { --tw-shadow-color: #9333ea; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-700 { --tw-shadow-color: #7c3aed; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-800 { --tw-shadow-color: #6b21a8; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-900 { --tw-shadow-color: #581c87; --tw-shadow: var(--tw-shadow-colored); }
.shadow-purple-950 { --tw-shadow-color: #3b0764; --tw-shadow: var(--tw-shadow-colored); }

.shadow-yellow-50 { --tw-shadow-color: #fefce8; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-100 { --tw-shadow-color: #fef3cd; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-200 { --tw-shadow-color: #fde68a; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-300 { --tw-shadow-color: #fcd34d; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-400 { --tw-shadow-color: #fbbf24; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-500 { --tw-shadow-color: #f59e0b; --tw-shadow: var(--tw-shadow-colored); }
.shadow-yellow-600 { --tw-shadow-color: #d97706; --tw-shadow: var(--tw-shadow-colored); }

.shadow-green-50 { --tw-shadow-color: #f0fdf4; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-100 { --tw-shadow-color: #dcfce7; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-200 { --tw-shadow-color: #bbf7d0; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-300 { --tw-shadow-color: #86efac; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-400 { --tw-shadow-color: #4ade80; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-500 { --tw-shadow-color: #22c55e; --tw-shadow: var(--tw-shadow-colored); }
.shadow-green-600 { --tw-shadow-color: #16a34a; --tw-shadow: var(--tw-shadow-colored); }

/* Opacity */
.opacity-0 { opacity: 0; }
.opacity-5 { opacity: 0.05; }
.opacity-10 { opacity: 0.1; }
.opacity-15 { opacity: 0.15; }
.opacity-20 { opacity: 0.2; }
.opacity-25 { opacity: 0.25; }
.opacity-30 { opacity: 0.3; }
.opacity-35 { opacity: 0.35; }
.opacity-40 { opacity: 0.4; }
.opacity-45 { opacity: 0.45; }
.opacity-50 { opacity: 0.5; }
.opacity-55 { opacity: 0.55; }
.opacity-60 { opacity: 0.6; }
.opacity-65 { opacity: 0.65; }
.opacity-70 { opacity: 0.7; }
.opacity-75 { opacity: 0.75; }
.opacity-80 { opacity: 0.8; }
.opacity-85 { opacity: 0.85; }
.opacity-90 { opacity: 0.9; }
.opacity-95 { opacity: 0.95; }
.opacity-100 { opacity: 1; }

/* Transform */
.transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.transform-cpu { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.transform-gpu { transform: translate3d(var(--tw-translate-x), var(--tw-translate-y), 0) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.transform-none { transform: none; }

.translate-x-0 { --tw-translate-x: 0px; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-x-1 { --tw-translate-x: 0.25rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-x-2 { --tw-translate-x: 0.5rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-1 { --tw-translate-x: -0.25rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-2 { --tw-translate-x: -0.5rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-8 { --tw-translate-x: -2rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-24 { --tw-translate-x: -6rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-32 { --tw-translate-x: -8rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-x-32 { --tw-translate-x: 8rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-x-1/2 { --tw-translate-x: 50%; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-x-1/2 { --tw-translate-x: -50%; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.translate-y-0 { --tw-translate-y: 0px; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-y-1 { --tw-translate-y: 0.25rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-y-2 { --tw-translate-y: 0.5rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-y-1 { --tw-translate-y: -0.25rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-y-2 { --tw-translate-y: -0.5rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-y-32 { --tw-translate-y: -8rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-y-24 { --tw-translate-y: 6rem; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.translate-y-1/2 { --tw-translate-y: 50%; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-translate-y-1/2 { --tw-translate-y: -50%; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.rotate-0 { --tw-rotate: 0deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-1 { --tw-rotate: 1deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-2 { --tw-rotate: 2deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-3 { --tw-rotate: 3deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-12 { --tw-rotate: 12deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-45 { --tw-rotate: 45deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-90 { --tw-rotate: 90deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.rotate-180 { --tw-rotate: 180deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-1 { --tw-rotate: -1deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-2 { --tw-rotate: -2deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-3 { --tw-rotate: -3deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-12 { --tw-rotate: -12deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-45 { --tw-rotate: -45deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-90 { --tw-rotate: -90deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-rotate-180 { --tw-rotate: -180deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.skew-x-0 { --tw-skew-x: 0deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.skew-x-1 { --tw-skew-x: 1deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.skew-x-2 { --tw-skew-x: 2deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.skew-x-3 { --tw-skew-x: 3deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.skew-x-6 { --tw-skew-x: 6deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.skew-x-12 { --tw-skew-x: 12deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-skew-x-1 { --tw-skew-x: -1deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-skew-x-2 { --tw-skew-x: -2deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-skew-x-3 { --tw-skew-x: -3deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-skew-x-6 { --tw-skew-x: -6deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.-skew-x-12 { --tw-skew-x: -12deg; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.scale-0 { --tw-scale-x: 0; --tw-scale-y: 0; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-50 { --tw-scale-x: .5; --tw-scale-y: .5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-75 { --tw-scale-x: .75; --tw-scale-y: .75; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-90 { --tw-scale-x: .9; --tw-scale-y: .9; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-95 { --tw-scale-x: .95; --tw-scale-y: .95; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-100 { --tw-scale-x: 1; --tw-scale-y: 1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-105 { --tw-scale-x: 1.05; --tw-scale-y: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-110 { --tw-scale-x: 1.1; --tw-scale-y: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-125 { --tw-scale-x: 1.25; --tw-scale-y: 1.25; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-150 { --tw-scale-x: 1.5; --tw-scale-y: 1.5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.scale-x-0 { --tw-scale-x: 0; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-50 { --tw-scale-x: .5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-75 { --tw-scale-x: .75; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-90 { --tw-scale-x: .9; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-95 { --tw-scale-x: .95; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-100 { --tw-scale-x: 1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-105 { --tw-scale-x: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-110 { --tw-scale-x: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-125 { --tw-scale-x: 1.25; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-x-150 { --tw-scale-x: 1.5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.scale-y-0 { --tw-scale-y: 0; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-50 { --tw-scale-y: .5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-75 { --tw-scale-y: .75; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-90 { --tw-scale-y: .9; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-95 { --tw-scale-y: .95; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-100 { --tw-scale-y: 1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-105 { --tw-scale-y: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-110 { --tw-scale-y: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-125 { --tw-scale-y: 1.25; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.scale-y-150 { --tw-scale-y: 1.5; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

/* Transform origin */
.origin-center { transform-origin: center; }
.origin-top { transform-origin: top; }
.origin-top-right { transform-origin: top right; }
.origin-right { transform-origin: right; }
.origin-bottom-right { transform-origin: bottom right; }
.origin-bottom { transform-origin: bottom; }
.origin-bottom-left { transform-origin: bottom left; }
.origin-left { transform-origin: left; }
.origin-top-left { transform-origin: top left; }

/* Transitions */
.transition-none { transition-property: none; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }

.duration-75 { transition-duration: 75ms; }
.duration-100 { transition-duration: 100ms; }
.duration-150 { transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.duration-500 { transition-duration: 500ms; }
.duration-700 { transition-duration: 700ms; }
.duration-1000 { transition-duration: 1000ms; }

.ease-linear { transition-timing-function: linear; }
.ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

.delay-75 { transition-delay: 75ms; }
.delay-100 { transition-delay: 100ms; }
.delay-150 { transition-delay: 150ms; }
.delay-200 { transition-delay: 200ms; }
.delay-300 { transition-delay: 300ms; }
.delay-500 { transition-delay: 500ms; }
.delay-700 { transition-delay: 700ms; }
.delay-1000 { transition-delay: 1000ms; }

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}
@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}
@keyframes pulse {
  50% { opacity: .5; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
}

.animate-none { animation: none; }
.animate-spin { animation: spin 1s linear infinite; }
.animate-ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-bounce { animation: bounce 1s infinite; }

/* Filters */
.blur-none { filter: blur(0); }
.blur-sm { filter: blur(4px); }
.blur { filter: blur(8px); }
.blur-md { filter: blur(12px); }
.blur-lg { filter: blur(16px); }
.blur-xl { filter: blur(24px); }
.blur-2xl { filter: blur(40px); }
.blur-3xl { filter: blur(64px); }

.brightness-0 { filter: brightness(0); }
.brightness-50 { filter: brightness(.5); }
.brightness-75 { filter: brightness(.75); }
.brightness-90 { filter: brightness(.9); }
.brightness-95 { filter: brightness(.95); }
.brightness-100 { filter: brightness(1); }
.brightness-105 { filter: brightness(1.05); }
.brightness-110 { filter: brightness(1.1); }
.brightness-125 { filter: brightness(1.25); }
.brightness-150 { filter: brightness(1.5); }
.brightness-200 { filter: brightness(2); }

.contrast-0 { filter: contrast(0); }
.contrast-50 { filter: contrast(.5); }
.contrast-75 { filter: contrast(.75); }
.contrast-100 { filter: contrast(1); }
.contrast-125 { filter: contrast(1.25); }
.contrast-150 { filter: contrast(1.5); }
.contrast-200 { filter: contrast(2); }

.grayscale-0 { filter: grayscale(0); }
.grayscale { filter: grayscale(100%); }

.hue-rotate-0 { filter: hue-rotate(0deg); }
.hue-rotate-15 { filter: hue-rotate(15deg); }
.hue-rotate-30 { filter: hue-rotate(30deg); }
.hue-rotate-60 { filter: hue-rotate(60deg); }
.hue-rotate-90 { filter: hue-rotate(90deg); }
.hue-rotate-180 { filter: hue-rotate(180deg); }

.invert-0 { filter: invert(0); }
.invert { filter: invert(100%); }

.saturate-0 { filter: saturate(0); }
.saturate-50 { filter: saturate(.5); }
.saturate-100 { filter: saturate(1); }
.saturate-150 { filter: saturate(1.5); }
.saturate-200 { filter: saturate(2); }

.sepia-0 { filter: sepia(0); }
.sepia { filter: sepia(100%); }

/* Backdrop filters */
.backdrop-blur-none { backdrop-filter: blur(0); }
.backdrop-blur-sm { backdrop-filter: blur(4px); }
.backdrop-blur { backdrop-filter: blur(8px); }
.backdrop-blur-md { backdrop-filter: blur(12px); }
.backdrop-blur-lg { backdrop-filter: blur(16px); }
.backdrop-blur-xl { backdrop-filter: blur(24px); }
.backdrop-blur-2xl { backdrop-filter: blur(40px); }
.backdrop-blur-3xl { backdrop-filter: blur(64px); }

.backdrop-brightness-0 { backdrop-filter: brightness(0); }
.backdrop-brightness-50 { backdrop-filter: brightness(.5); }
.backdrop-brightness-75 { backdrop-filter: brightness(.75); }
.backdrop-brightness-90 { backdrop-filter: brightness(.9); }
.backdrop-brightness-95 { backdrop-filter: brightness(.95); }
.backdrop-brightness-100 { backdrop-filter: brightness(1); }
.backdrop-brightness-105 { backdrop-filter: brightness(1.05); }
.backdrop-brightness-110 { backdrop-filter: brightness(1.1); }
.backdrop-brightness-125 { backdrop-filter: brightness(1.25); }
.backdrop-brightness-150 { backdrop-filter: brightness(1.5); }
.backdrop-brightness-200 { backdrop-filter: brightness(2); }

.backdrop-contrast-0 { backdrop-filter: contrast(0); }
.backdrop-contrast-50 { backdrop-filter: contrast(.5); }
.backdrop-contrast-75 { backdrop-filter: contrast(.75); }
.backdrop-contrast-100 { backdrop-filter: contrast(1); }
.backdrop-contrast-125 { backdrop-filter: contrast(1.25); }
.backdrop-contrast-150 { backdrop-filter: contrast(1.5); }
.backdrop-contrast-200 { backdrop-filter: contrast(2); }

.backdrop-grayscale-0 { backdrop-filter: grayscale(0); }
.backdrop-grayscale { backdrop-filter: grayscale(100%); }

.backdrop-hue-rotate-0 { backdrop-filter: hue-rotate(0deg); }
.backdrop-hue-rotate-15 { backdrop-filter: hue-rotate(15deg); }
.backdrop-hue-rotate-30 { backdrop-filter: hue-rotate(30deg); }
.backdrop-hue-rotate-60 { backdrop-filter: hue-rotate(60deg); }
.backdrop-hue-rotate-90 { backdrop-filter: hue-rotate(90deg); }
.backdrop-hue-rotate-180 { backdrop-filter: hue-rotate(180deg); }

.backdrop-invert-0 { backdrop-filter: invert(0); }
.backdrop-invert { backdrop-filter: invert(100%); }

.backdrop-opacity-0 { backdrop-filter: opacity(0); }
.backdrop-opacity-5 { backdrop-filter: opacity(0.05); }
.backdrop-opacity-10 { backdrop-filter: opacity(0.1); }
.backdrop-opacity-20 { backdrop-filter: opacity(0.2); }
.backdrop-opacity-25 { backdrop-filter: opacity(0.25); }
.backdrop-opacity-30 { backdrop-filter: opacity(0.3); }
.backdrop-opacity-40 { backdrop-filter: opacity(0.4); }
.backdrop-opacity-50 { backdrop-filter: opacity(0.5); }
.backdrop-opacity-60 { backdrop-filter: opacity(0.6); }
.backdrop-opacity-70 { backdrop-filter: opacity(0.7); }
.backdrop-opacity-75 { backdrop-filter: opacity(0.75); }
.backdrop-opacity-80 { backdrop-filter: opacity(0.8); }
.backdrop-opacity-90 { backdrop-filter: opacity(0.9); }
.backdrop-opacity-95 { backdrop-filter: opacity(0.95); }
.backdrop-opacity-100 { backdrop-filter: opacity(1); }

.backdrop-saturate-0 { backdrop-filter: saturate(0); }
.backdrop-saturate-50 { backdrop-filter: saturate(.5); }
.backdrop-saturate-100 { backdrop-filter: saturate(1); }
.backdrop-saturate-150 { backdrop-filter: saturate(1.5); }
.backdrop-saturate-200 { backdrop-filter: saturate(2); }

.backdrop-sepia-0 { backdrop-filter: sepia(0); }
.backdrop-sepia { backdrop-filter: sepia(100%); }

/* Lists */
.list-inside { list-style-position: inside; }
.list-outside { list-style-position: outside; }

.list-none { list-style-type: none; }
.list-disc { list-style-type: disc; }
.list-decimal { list-style-type: decimal; }

/* Tables */
.table-auto { table-layout: auto; }
.table-fixed { table-layout: fixed; }

.border-spacing-0 { border-spacing: 0px 0px; }
.border-spacing-1 { border-spacing: 0.25rem 0.25rem; }
.border-spacing-2 { border-spacing: 0.5rem 0.5rem; }
.border-spacing-3 { border-spacing: 0.75rem 0.75rem; }
.border-spacing-4 { border-spacing: 1rem 1rem; }
.border-spacing-5 { border-spacing: 1.25rem 1.25rem; }
.border-spacing-6 { border-spacing: 1.5rem 1.5rem; }
.border-spacing-7 { border-spacing: 1.75rem 1.75rem; }
.border-spacing-8 { border-spacing: 2rem 2rem; }

.border-collapse { border-collapse: collapse; }
.border-separate { border-collapse: separate; }

.caption-top { caption-side: top; }
.caption-bottom { caption-side: bottom; }

.empty-cells-show { empty-cells: show; }
.empty-cells-hide { empty-cells: hide; }

/* Object */
.object-contain { object-fit: contain; }
.object-cover { object-fit: cover; }
.object-fill { object-fit: fill; }
.object-none { object-fit: none; }
.object-scale-down { object-fit: scale-down; }

.object-bottom { object-position: bottom; }
.object-center { object-position: center; }
.object-left { object-position: left; }
.object-left-bottom { object-position: left bottom; }
.object-left-top { object-position: left top; }
.object-right { object-position: right; }
.object-right-bottom { object-position: right bottom; }
.object-right-top { object-position: right top; }
.object-top { object-position: top; }

/* Aspect ratio */
.aspect-auto { aspect-ratio: auto; }
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-video { aspect-ratio: 16 / 9; }

/* Columns */
.columns-1 { columns: 1; }
.columns-2 { columns: 2; }
.columns-3 { columns: 3; }
.columns-4 { columns: 4; }
.columns-5 { columns: 5; }
.columns-6 { columns: 6; }
.columns-7 { columns: 7; }
.columns-8 { columns: 8; }
.columns-9 { columns: 9; }
.columns-10 { columns: 10; }
.columns-11 { columns: 11; }
.columns-12 { columns: 12; }
.columns-auto { columns: auto; }
.columns-3xs { columns: 16rem; }
.columns-2xs { columns: 18rem; }
.columns-xs { columns: 20rem; }
.columns-sm { columns: 24rem; }
.columns-md { columns: 28rem; }
.columns-lg { columns: 32rem; }
.columns-xl { columns: 36rem; }
.columns-2xl { columns: 42rem; }
.columns-3xl { columns: 48rem; }
.columns-4xl { columns: 56rem; }
.columns-5xl { columns: 64rem; }
.columns-6xl { columns: 72rem; }
.columns-7xl { columns: 80rem; }

.break-after-auto { break-after: auto; }
.break-after-avoid { break-after: avoid; }
.break-after-all { break-after: all; }
.break-after-avoid-page { break-after: avoid-page; }
.break-after-page { break-after: page; }
.break-after-left { break-after: left; }
.break-after-right { break-after: right; }
.break-after-column { break-after: column; }

.break-before-auto { break-before: auto; }
.break-before-avoid { break-before: avoid; }
.break-before-all { break-before: all; }
.break-before-avoid-page { break-before: avoid-page; }
.break-before-page { break-before: page; }
.break-before-left { break-before: left; }
.break-before-right { break-before: right; }
.break-before-column { break-before: column; }

.break-inside-auto { break-inside: auto; }
.break-inside-avoid { break-inside: avoid; }
.break-inside-avoid-page { break-inside: avoid-page; }
.break-inside-avoid-column { break-inside: avoid-column; }

.box-decoration-clone { box-decoration-break: clone; }
.box-decoration-slice { box-decoration-break: slice; }

/* Interactivity */
.resize-none { resize: none; }
.resize-y { resize: vertical; }
.resize-x { resize: horizontal; }
.resize { resize: both; }

.select-none { user-select: none; }
.select-text { user-select: text; }
.select-all { user-select: all; }
.select-auto { user-select: auto; }

.cursor-auto { cursor: auto; }
.cursor-default { cursor: default; }
.cursor-pointer { cursor: pointer; }
.cursor-wait { cursor: wait; }
.cursor-text { cursor: text; }
.cursor-move { cursor: move; }
.cursor-help { cursor: help; }
.cursor-not-allowed { cursor: not-allowed; }
.cursor-none { cursor: none; }
.cursor-context-menu { cursor: context-menu; }
.cursor-progress { cursor: progress; }
.cursor-cell { cursor: cell; }
.cursor-crosshair { cursor: crosshair; }
.cursor-vertical-text { cursor: vertical-text; }
.cursor-alias { cursor: alias; }
.cursor-copy { cursor: copy; }
.cursor-no-drop { cursor: no-drop; }
.cursor-grab { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
.cursor-all-scroll { cursor: all-scroll; }
.cursor-col-resize { cursor: col-resize; }
.cursor-row-resize { cursor: row-resize; }
.cursor-n-resize { cursor: n-resize; }
.cursor-e-resize { cursor: e-resize; }
.cursor-s-resize { cursor: s-resize; }
.cursor-w-resize { cursor: w-resize; }
.cursor-ne-resize { cursor: ne-resize; }
.cursor-nw-resize { cursor: nw-resize; }
.cursor-se-resize { cursor: se-resize; }
.cursor-sw-resize { cursor: sw-resize; }
.cursor-ew-resize { cursor: ew-resize; }
.cursor-ns-resize { cursor: ns-resize; }
.cursor-nesw-resize { cursor: nesw-resize; }
.cursor-nwse-resize { cursor: nwse-resize; }
.cursor-zoom-in { cursor: zoom-in; }
.cursor-zoom-out { cursor: zoom-out; }

.pointer-events-none { pointer-events: none; }
.pointer-events-auto { pointer-events: auto; }

.touch-auto { touch-action: auto; }
.touch-none { touch-action: none; }
.touch-pan-x { touch-action: pan-x; }
.touch-pan-left { touch-action: pan-left; }
.touch-pan-right { touch-action: pan-right; }
.touch-pan-y { touch-action: pan-y; }
.touch-pan-up { touch-action: pan-up; }
.touch-pan-down { touch-action: pan-down; }
.touch-pinch-zoom { touch-action: pinch-zoom; }
.touch-manipulation { touch-action: manipulation; }

.scroll-auto { scroll-behavior: auto; }
.scroll-smooth { scroll-behavior: smooth; }

/* Hover, focus, and other states */
.hover\\:bg-white:hover { background-color: rgb(255 255 255); }
.hover\\:bg-black:hover { background-color: rgb(0 0 0); }
.hover\\:bg-gray-50:hover { background-color: rgb(249 250 251); }
.hover\\:bg-gray-100:hover { background-color: rgb(243 244 246); }
.hover\\:bg-gray-200:hover { background-color: rgb(229 231 235); }
.hover\\:bg-gray-300:hover { background-color: rgb(209 213 219); }
.hover\\:bg-gray-400:hover { background-color: rgb(156 163 175); }
.hover\\:bg-gray-500:hover { background-color: rgb(107 114 128); }
.hover\\:bg-gray-600:hover { background-color: rgb(75 85 99); }
.hover\\:bg-gray-700:hover { background-color: rgb(55 65 81); }
.hover\\:bg-gray-800:hover { background-color: rgb(31 41 55); }
.hover\\:bg-gray-900:hover { background-color: rgb(17 24 39); }
.hover\\:bg-gray-950:hover { background-color: rgb(3 7 18); }

.hover\\:bg-slate-50:hover { background-color: rgb(248 250 252); }
.hover\\:bg-slate-100:hover { background-color: rgb(241 245 249); }
.hover\\:bg-slate-200:hover { background-color: rgb(226 232 240); }
.hover\\:bg-slate-300:hover { background-color: rgb(203 213 225); }
.hover\\:bg-slate-400:hover { background-color: rgb(148 163 184); }
.hover\\:bg-slate-500:hover { background-color: rgb(100 116 139); }
.hover\\:bg-slate-600:hover { background-color: rgb(71 85 105); }
.hover\\:bg-slate-700:hover { background-color: rgb(51 65 85); }
.hover\\:bg-slate-800:hover { background-color: rgb(30 41 59); }
.hover\\:bg-slate-900:hover { background-color: rgb(15 23 42); }
.hover\\:bg-slate-950:hover { background-color: rgb(2 6 23); }

.hover\\:bg-blue-50:hover { background-color: rgb(239 246 255); }
.hover\\:bg-blue-100:hover { background-color: rgb(219 234 254); }
.hover\\:bg-blue-200:hover { background-color: rgb(191 219 254); }
.hover\\:bg-blue-300:hover { background-color: rgb(147 197 253); }
.hover\\:bg-blue-400:hover { background-color: rgb(96 165 250); }
.hover\\:bg-blue-500:hover { background-color: rgb(59 130 246); }
.hover\\:bg-blue-600:hover { background-color: rgb(37 99 235); }
.hover\\:bg-blue-700:hover { background-color: rgb(29 78 216); }
.hover\\:bg-blue-800:hover { background-color: rgb(30 64 175); }
.hover\\:bg-blue-900:hover { background-color: rgb(30 58 138); }
.hover\\:bg-blue-950:hover { background-color: rgb(23 37 84); }

.hover\\:bg-purple-50:hover { background-color: rgb(250 245 255); }
.hover\\:bg-purple-100:hover { background-color: rgb(243 232 255); }
.hover\\:bg-purple-200:hover { background-color: rgb(233 213 255); }
.hover\\:bg-purple-300:hover { background-color: rgb(216 180 254); }
.hover\\:bg-purple-400:hover { background-color: rgb(196 181 253); }
.hover\\:bg-purple-500:hover { background-color: rgb(168 85 247); }
.hover\\:bg-purple-600:hover { background-color: rgb(147 51 234); }
.hover\\:bg-purple-700:hover { background-color: rgb(126 34 206); }
.hover\\:bg-purple-800:hover { background-color: rgb(107 33 168); }
.hover\\:bg-purple-900:hover { background-color: rgb(88 28 135); }
.hover\\:bg-purple-950:hover { background-color: rgb(59 7 100); }

.hover\\:bg-green-50:hover { background-color: rgb(240 253 244); }
.hover\\:bg-green-100:hover { background-color: rgb(220 252 231); }
.hover\\:bg-green-200:hover { background-color: rgb(187 247 208); }
.hover\\:bg-green-300:hover { background-color: rgb(134 239 172); }
.hover\\:bg-green-400:hover { background-color: rgb(74 222 128); }
.hover\\:bg-green-500:hover { background-color: rgb(34 197 94); }
.hover\\:bg-green-600:hover { background-color: rgb(22 163 74); }
.hover\\:bg-green-700:hover { background-color: rgb(21 128 61); }
.hover\\:bg-green-800:hover { background-color: rgb(22 101 52); }
.hover\\:bg-green-900:hover { background-color: rgb(20 83 45); }
.hover\\:bg-green-950:hover { background-color: rgb(5 46 22); }

.hover\\:bg-yellow-50:hover { background-color: rgb(254 252 232); }
.hover\\:bg-yellow-100:hover { background-color: rgb(254 249 195); }
.hover\\:bg-yellow-200:hover { background-color: rgb(254 240 138); }
.hover\\:bg-yellow-300:hover { background-color: rgb(253 224 71); }
.hover\\:bg-yellow-400:hover { background-color: rgb(250 204 21); }
.hover\\:bg-yellow-500:hover { background-color: rgb(234 179 8); }
.hover\\:bg-yellow-600:hover { background-color: rgb(202 138 4); }

.hover\\:text-white:hover { color: rgb(255 255 255); }
.hover\\:text-black:hover { color: rgb(0 0 0); }
.hover\\:text-gray-50:hover { color: rgb(249 250 251); }
.hover\\:text-gray-100:hover { color: rgb(243 244 246); }
.hover\\:text-gray-200:hover { color: rgb(229 231 235); }
.hover\\:text-gray-300:hover { color: rgb(209 213 219); }
.hover\\:text-gray-400:hover { color: rgb(156 163 175); }
.hover\\:text-gray-500:hover { color: rgb(107 114 128); }
.hover\\:text-gray-600:hover { color: rgb(75 85 99); }
.hover\\:text-gray-700:hover { color: rgb(55 65 81); }
.hover\\:text-gray-800:hover { color: rgb(31 41 55); }
.hover\\:text-gray-900:hover { color: rgb(17 24 39); }
.hover\\:text-gray-950:hover { color: rgb(3 7 18); }

.hover\\:text-blue-50:hover { color: rgb(239 246 255); }
.hover\\:text-blue-100:hover { color: rgb(219 234 254); }
.hover\\:text-blue-200:hover { color: rgb(191 219 254); }
.hover\\:text-blue-300:hover { color: rgb(147 197 253); }
.hover\\:text-blue-400:hover { color: rgb(96 165 250); }
.hover\\:text-blue-500:hover { color: rgb(59 130 246); }
.hover\\:text-blue-600:hover { color: rgb(37 99 235); }
.hover\\:text-blue-700:hover { color: rgb(29 78 216); }
.hover\\:text-blue-800:hover { color: rgb(30 64 175); }
.hover\\:text-blue-900:hover { color: rgb(30 58 138); }
.hover\\:text-blue-950:hover { color: rgb(23 37 84); }

.hover\\:text-purple-50:hover { color: rgb(250 245 255); }
.hover\\:text-purple-100:hover { color: rgb(243 232 255); }
.hover\\:text-purple-200:hover { color: rgb(233 213 255); }
.hover\\:text-purple-300:hover { color: rgb(216 180 254); }
.hover\\:text-purple-400:hover { color: rgb(196 181 253); }
.hover\\:text-purple-500:hover { color: rgb(168 85 247); }
.hover\\:text-purple-600:hover { color: rgb(147 51 234); }
.hover\\:text-purple-700:hover { color: rgb(126 34 206); }
.hover\\:text-purple-800:hover { color: rgb(107 33 168); }
.hover\\:text-purple-900:hover { color: rgb(88 28 135); }
.hover\\:text-purple-950:hover { color: rgb(59 7 100); }

.hover\\:text-green-50:hover { color: rgb(240 253 244); }
.hover\\:text-green-100:hover { color: rgb(220 252 231); }
.hover\\:text-green-200:hover { color: rgb(187 247 208); }
.hover\\:text-green-300:hover { color: rgb(134 239 172); }
.hover\\:text-green-400:hover { color: rgb(74 222 128); }
.hover\\:text-green-500:hover { color: rgb(34 197 94); }
.hover\\:text-green-600:hover { color: rgb(22 163 74); }
.hover\\:text-green-700:hover { color: rgb(21 128 61); }
.hover\\:text-green-800:hover { color: rgb(22 101 52); }
.hover\\:text-green-900:hover { color: rgb(20 83 45); }
.hover\\:text-green-950:hover { color: rgb(5 46 22); }

.hover\\:text-yellow-50:hover { color: rgb(254 252 232); }
.hover\\:text-yellow-100:hover { color: rgb(254 249 195); }
.hover\\:text-yellow-200:hover { color: rgb(254 240 138); }
.hover\\:text-yellow-300:hover { color: rgb(253 224 71); }
.hover\\:text-yellow-400:hover { color: rgb(250 204 21); }
.hover\\:text-yellow-500:hover { color: rgb(234 179 8); }
.hover\\:text-yellow-600:hover { color: rgb(202 138 4); }

.hover\\:border-white:hover { border-color: rgb(255 255 255); }
.hover\\:border-black:hover { border-color: rgb(0 0 0); }
.hover\\:border-gray-100:hover { border-color: rgb(243 244 246); }
.hover\\:border-gray-200:hover { border-color: rgb(229 231 235); }
.hover\\:border-gray-300:hover { border-color: rgb(209 213 219); }
.hover\\:border-gray-400:hover { border-color: rgb(156 163 175); }
.hover\\:border-gray-500:hover { border-color: rgb(107 114 128); }
.hover\\:border-gray-600:hover { border-color: rgb(75 85 99); }
.hover\\:border-gray-700:hover { border-color: rgb(55 65 81); }
.hover\\:border-gray-800:hover { border-color: rgb(31 41 55); }
.hover\\:border-gray-900:hover { border-color: rgb(17 24 39); }

.hover\\:border-blue-200:hover { border-color: rgb(191 219 254); }
.hover\\:border-blue-300:hover { border-color: rgb(147 197 253); }
.hover\\:border-blue-400:hover { border-color: rgb(96 165 250); }
.hover\\:border-blue-500:hover { border-color: rgb(59 130 246); }
.hover\\:border-blue-600:hover { border-color: rgb(37 99 235); }
.hover\\:border-blue-700:hover { border-color: rgb(29 78 216); }

.hover\\:border-purple-200:hover { border-color: rgb(233 213 255); }
.hover\\:border-purple-300:hover { border-color: rgb(216 180 254); }
.hover\\:border-purple-400:hover { border-color: rgb(196 181 253); }
.hover\\:border-purple-500:hover { border-color: rgb(168 85 247); }
.hover\\:border-purple-600:hover { border-color: rgb(147 51 234); }

.hover\\:border-yellow-300:hover { border-color: rgb(253 224 71); }
.hover\\:border-yellow-400:hover { border-color: rgb(250 204 21); }
.hover\\:border-yellow-500:hover { border-color: rgb(234 179 8); }

.hover\\:shadow-sm:hover { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.hover\\:shadow:hover { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1); }
.hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.hover\\:shadow-xl:hover { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
.hover\\:shadow-2xl:hover { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }

.hover\\:scale-105:hover { --tw-scale-x: 1.05; --tw-scale-y: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.hover\\:scale-110:hover { --tw-scale-x: 1.1; --tw-scale-y: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

.hover\\:grayscale-0:hover { filter: grayscale(0); }
.hover\\:grayscale:hover { filter: grayscale(100%); }

.hover\\:underline:hover { text-decoration-line: underline; }
.hover\\:no-underline:hover { text-decoration-line: none; }

.hover\\:opacity-80:hover { opacity: 0.8; }
.hover\\:opacity-90:hover { opacity: 0.9; }
.hover\\:opacity-100:hover { opacity: 1; }

/* Focus states */
.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\\:outline:focus { outline-style: solid; }
.focus\\:outline-0:focus { outline-width: 0px; }
.focus\\:outline-1:focus { outline-width: 1px; }
.focus\\:outline-2:focus { outline-width: 2px; }
.focus\\:outline-4:focus { outline-width: 4px; }
.focus\\:outline-8:focus { outline-width: 8px; }

.focus\\:ring-0:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus\\:ring-1:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus\\:ring-2:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus\\:ring-4:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus\\:ring-8:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(8px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }
.focus\\:ring:focus { --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color); --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color); box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000); }

/* Group hover states */
.group:hover .group-hover\\:opacity-100 { opacity: 1; }
.group:hover .group-hover\\:scale-105 { --tw-scale-x: 1.05; --tw-scale-y: 1.05; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
.group:hover .group-hover\\:scale-110 { --tw-scale-x: 1.1; --tw-scale-y: 1.1; transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }

/* Responsive utilities */
@media (min-width: 640px) {
  .sm\\:container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; max-width: 640px; }
  .sm\\:block { display: block; }
  .sm\\:inline-block { display: inline-block; }
  .sm\\:inline { display: inline; }
  .sm\\:flex { display: flex; }
  .sm\\:inline-flex { display: inline-flex; }
  .sm\\:table { display: table; }
  .sm\\:inline-table { display: inline-table; }
  .sm\\:table-caption { display: table-caption; }
  .sm\\:table-cell { display: table-cell; }
  .sm\\:table-column { display: table-column; }
  .sm\\:table-column-group { display: table-column-group; }
  .sm\\:table-footer-group { display: table-footer-group; }
  .sm\\:table-header-group { display: table-header-group; }
  .sm\\:table-row-group { display: table-row-group; }
  .sm\\:table-row { display: table-row; }
  .sm\\:flow-root { display: flow-root; }
  .sm\\:grid { display: grid; }
  .sm\\:inline-grid { display: inline-grid; }
  .sm\\:contents { display: contents; }
  .sm\\:list-item { display: list-item; }
  .sm\\:hidden { display: none; }

  .sm\\:flex-row { flex-direction: row; }
  .sm\\:flex-row-reverse { flex-direction: row-reverse; }
  .sm\\:flex-col { flex-direction: column; }
  .sm\\:flex-col-reverse { flex-direction: column-reverse; }

  .sm\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sm\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .sm\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .sm\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  
  .sm\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .sm\\:text-base { font-size: 1rem; line-height: 1.5rem; }
  .sm\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .sm\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .sm\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .sm\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .sm\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .sm\\:text-5xl { font-size: 3rem; line-height: 1; }
  .sm\\:text-6xl { font-size: 3.75rem; line-height: 1; }
}

@media (min-width: 768px) {
  .md\\:container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; max-width: 768px; }
  .md\\:block { display: block; }
  .md\\:inline-block { display: inline-block; }
  .md\\:inline { display: inline; }
  .md\\:flex { display: flex; }
  .md\\:inline-flex { display: inline-flex; }
  .md\\:table { display: table; }
  .md\\:inline-table { display: inline-table; }
  .md\\:table-caption { display: table-caption; }
  .md\\:table-cell { display: table-cell; }
  .md\\:table-column { display: table-column; }
  .md\\:table-column-group { display: table-column-group; }
  .md\\:table-footer-group { display: table-footer-group; }
  .md\\:table-header-group { display: table-header-group; }
  .md\\:table-row-group { display: table-row-group; }
  .md\\:table-row { display: table-row; }
  .md\\:flow-root { display: flow-root; }
  .md\\:grid { display: grid; }
  .md\\:inline-grid { display: inline-grid; }
  .md\\:contents { display: contents; }
  .md\\:list-item { display: list-item; }
  .md\\:hidden { display: none; }

  .md\\:flex-row { flex-direction: row; }
  .md\\:flex-row-reverse { flex-direction: row-reverse; }
  .md\\:flex-col { flex-direction: column; }
  .md\\:flex-col-reverse { flex-direction: column-reverse; }

  .md\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .md\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .md\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  
  .md\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .md\\:text-base { font-size: 1rem; line-height: 1.5rem; }
  .md\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .md\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .md\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .md\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .md\\:text-5xl { font-size: 3rem; line-height: 1; }
  .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
  .md\\:text-7xl { font-size: 4.5rem; line-height: 1; }
  .md\\:text-8xl { font-size: 6rem; line-height: 1; }
}

@media (min-width: 1024px) {
  .lg\\:container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; max-width: 1024px; }
  .lg\\:block { display: block; }
  .lg\\:inline-block { display: inline-block; }
  .lg\\:inline { display: inline; }
  .lg\\:flex { display: flex; }
  .lg\\:inline-flex { display: inline-flex; }
  .lg\\:table { display: table; }
  .lg\\:inline-table { display: inline-table; }
  .lg\\:table-caption { display: table-caption; }
  .lg\\:table-cell { display: table-cell; }
  .lg\\:table-column { display: table-column; }
  .lg\\:table-column-group { display: table-column-group; }
  .lg\\:table-footer-group { display: table-footer-group; }
  .lg\\:table-header-group { display: table-header-group; }
  .lg\\:table-row-group { display: table-row-group; }
  .lg\\:table-row { display: table-row; }
  .lg\\:flow-root { display: flow-root; }
  .lg\\:grid { display: grid; }
  .lg\\:inline-grid { display: inline-grid; }
  .lg\\:contents { display: contents; }
  .lg\\:list-item { display: list-item; }
  .lg\\:hidden { display: none; }

  .lg\\:flex-row { flex-direction: row; }
  .lg\\:flex-row-reverse { flex-direction: row-reverse; }
  .lg\\:flex-col { flex-direction: column; }
  .lg\\:flex-col-reverse { flex-direction: column-reverse; }

  .lg\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .lg\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  
  .lg\\:col-span-2 { grid-column: span 2 / span 2; }
  .lg\\:col-span-3 { grid-column: span 3 / span 3; }
  
  .lg\\:text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .lg\\:text-base { font-size: 1rem; line-height: 1.5rem; }
  .lg\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .lg\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .lg\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .lg\\:text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
  .lg\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
  .lg\\:text-5xl { font-size: 3rem; line-height: 1; }
  .lg\\:text-6xl { font-size: 3.75rem; line-height: 1; }
  .lg\\:text-7xl { font-size: 4.5rem; line-height: 1; }
  .lg\\:text-8xl { font-size: 6rem; line-height: 1; }
}

@media (min-width: 1280px) {
  .xl\\:container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; max-width: 1280px; }
  
  .xl\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .xl\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .xl\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xl\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .xl\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .xl\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

@media (min-width: 1536px) {
  .\\2xl\\:container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; max-width: 1536px; }
  
  .\\2xl\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  .\\2xl\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .\\2xl\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .\\2xl\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .\\2xl\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .\\2xl\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

/* Utility classes for spacing */
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.line-clamp-4 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.line-clamp-5 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.line-clamp-6 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
}

.line-clamp-none {
  overflow: visible;
  display: block;
  -webkit-box-orient: horizontal;
  -webkit-line-clamp: none;
}

/* Additional space utilities */
.space-x-0 > :not([hidden]) ~ :not([hidden]) { margin-left: 0px; }
.space-x-1 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.25rem; }
.space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem; }
.space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.75rem; }
.space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
.space-x-5 > :not([hidden]) ~ :not([hidden]) { margin-left: 1.25rem; }
.space-x-6 > :not([hidden]) ~ :not([hidden]) { margin-left: 1.5rem; }
.space-x-7 > :not([hidden]) ~ :not([hidden]) { margin-left: 1.75rem; }
.space-x-8 > :not([hidden]) ~ :not([hidden]) { margin-left: 2rem; }

.space-y-0 > :not([hidden]) ~ :not([hidden]) { margin-top: 0px; }
.space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
.space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
.space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
.space-y-5 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.25rem; }
.space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
.space-y-7 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.75rem; }
.space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 2rem; }
.space-y-9 > :not([hidden]) ~ :not([hidden]) { margin-top: 2.25rem; }
.space-y-10 > :not([hidden]) ~ :not([hidden]) { margin-top: 2.5rem; }
.space-y-11 > :not([hidden]) ~ :not([hidden]) { margin-top: 2.75rem; }
.space-y-12 > :not([hidden]) ~ :not([hidden]) { margin-top: 3rem; }
.space-y-14 > :not([hidden]) ~ :not([hidden]) { margin-top: 3.5rem; }
.space-y-16 > :not([hidden]) ~ :not([hidden]) { margin-top: 4rem; }
.space-y-20 > :not([hidden]) ~ :not([hidden]) { margin-top: 5rem; }
.space-y-24 > :not([hidden]) ~ :not([hidden]) { margin-top: 6rem; }
.space-y-28 > :not([hidden]) ~ :not([hidden]) { margin-top: 7rem; }
.space-y-32 > :not([hidden]) ~ :not([hidden]) { margin-top: 8rem; }
.space-y-36 > :not([hidden]) ~ :not([hidden]) { margin-top: 9rem; }
.space-y-40 > :not([hidden]) ~ :not([hidden]) { margin-top: 10rem; }
.space-y-44 > :not([hidden]) ~ :not([hidden]) { margin-top: 11rem; }
.space-y-48 > :not([hidden]) ~ :not([hidden]) { margin-top: 12rem; }
.space-y-52 > :not([hidden]) ~ :not([hidden]) { margin-top: 13rem; }
.space-y-56 > :not([hidden]) ~ :not([hidden]) { margin-top: 14rem; }
.space-y-60 > :not([hidden]) ~ :not([hidden]) { margin-top: 15rem; }
.space-y-64 > :not([hidden]) ~ :not([hidden]) { margin-top: 16rem; }
.space-y-72 > :not([hidden]) ~ :not([hidden]) { margin-top: 18rem; }
.space-y-80 > :not([hidden]) ~ :not([hidden]) { margin-top: 20rem; }
.space-y-96 > :not([hidden]) ~ :not([hidden]) { margin-top: 24rem; }

/* Print-specific styles for perfect PDF rendering */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  @page {
    margin: 0;
    size: A4;
  }
  
  body {
    margin: 0 !important;
    padding: 0 !important;
    font-size: 12pt;
    line-height: 1.4;
  }
  
  .shadow-2xl,
  .shadow-xl, 
  .shadow-lg,
  .shadow-md,
  .shadow {
    box-shadow: none !important;
  }
  
  .min-h-screen {
    min-height: auto !important;
  }
  
  .fixed {
    position: relative !important;
  }
  
  .sticky {
    position: relative !important;
  }
}
  
  `;
};

// Convert React element to HTML string with improved error handling
const reactToHtml = (TemplateComponent: React.ComponentType<{ data: any }>, data: any) => {
  return new Promise<string>((resolve, reject) => {
    try {
      console.log('Converting React to HTML with data:', data);
      
      // Create a temporary container
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px'; // A4 width
      container.style.minHeight = '1123px'; // A4 height
      container.style.backgroundColor = 'white';
      container.style.fontFamily = 'Arial, sans-serif';
      
      // Add styles to container
      const style = document.createElement('style');
      style.textContent = getCompleteShadcnCSS();
      container.appendChild(style);
      
      document.body.appendChild(container);

      // Create wrapper for React content
      const wrapper = document.createElement('div');
      container.appendChild(wrapper);

      // Render React component
      const root = createRoot(wrapper);
      const element = React.createElement(TemplateComponent, { data });
      root.render(element);

      // Wait for rendering and images to load
      setTimeout(() => {
        const images = wrapper.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        const finishConversion = () => {
          const html = wrapper.innerHTML;
          console.log('Generated HTML length:', html.length);
          console.log('HTML preview:', html.substring(0, 500));
          
          // Cleanup
          try {
            root.unmount();
          } catch (e) {
            console.warn('Error unmounting React root:', e);
          }
          
          document.body.removeChild(container);
          
          if (!html || html.trim() === '') {
            reject(new Error('Generated HTML is empty'));
          } else {
            resolve(html);
          }
        };

        if (totalImages === 0) {
          finishConversion();
          return;
        }

        const checkImageLoaded = () => {
          loadedImages++;
          if (loadedImages >= totalImages) {
            finishConversion();
          }
        };

        // Handle image loading
        images.forEach((img) => {
          if (img.complete && img.naturalWidth > 0) {
            checkImageLoaded();
          } else {
            img.onload = checkImageLoaded;
            img.onerror = () => {
              console.warn('Image failed to load:', img.src);
              checkImageLoaded(); // Continue even if image fails
            };
            
            // Trigger load if src is set
            if (!img.src && img.getAttribute('src')) {
              img.src = img.getAttribute('src')!;
            }
          }
        });

        // Fallback timeout
        setTimeout(() => {
          console.warn('Image loading timeout, proceeding with conversion');
          finishConversion();
        }, 5000);
        
      }, 2000); // Increased wait time for better rendering
      
    } catch (error) {
      console.error('Error in reactToHtml:', error);
      reject(error);
    }
  });
};

export const downloadResumePDF = async (templateName: string, data: any) => {
  try {

    // Validate input data
    if (!data || (!data.resume && !data.portfolio)) {
      throw new Error('Invalid data: No resume or portfolio data found');
    }

    // Load external dependencies
    await loadExternalDependencies();

    const TemplateComponent = RESUME_TEMPLATES[templateName as keyof typeof RESUME_TEMPLATES];
    if (!TemplateComponent) {
      throw new Error(`Resume template "${templateName}" not found`);
    }

    // Generate HTML content
    const htmlContent = await generateResumeHTML(TemplateComponent, data);
    
    if (!htmlContent || htmlContent.trim() === '') {
      throw new Error('Generated HTML content is empty');
    }

    // Create the complete HTML document
    const completeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        ${getCompleteShadcnCSS()}
        
        /* Additional PDF-specific styles */
        * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        body {
            margin: 0 !important;
            padding: 0 !important;
            font-family: Arial, sans-serif !important;
            font-size: 12px !important;
            line-height: 1.4 !important;
            background: white !important;
        }
        
        .shadow-2xl, .shadow-xl, .shadow-lg, .shadow-md, .shadow {
            box-shadow: none !important;
        }
        
        .min-h-screen {
            min-height: auto !important;
        }
        
        .fixed, .sticky {
            position: relative !important;
        }
        
        /* Ensure backgrounds and colors print */
        .bg-gradient-to-r, .bg-gradient-to-br, .bg-gradient-to-b {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    </style>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    // Create temporary iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.left = '-9999px';
    iframe.style.width = '794px';
    // Removed fixed height of 1123px
    iframe.style.border = 'none';
    
    document.body.appendChild(iframe);
    
    // Write content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      throw new Error('Could not access iframe document');
    }
    
    iframeDoc.open();
    iframeDoc.write(completeHTML);
    iframeDoc.close();

    // Wait for content to load and set iframe height dynamically
    await new Promise<void>((resolve) => {
      if (iframe.contentWindow) {
        iframe.contentWindow.addEventListener('load', () => {
          const contentHeight = iframe.contentDocument?.body.scrollHeight;
          if (contentHeight) {
            iframe.style.height = `${contentHeight}px`;
          } else {
            console.warn('Could not determine content height');
          }
          resolve();
        });
      } else {
        setTimeout(resolve, 1000);
      }
    });

    // Additional wait for rendering
    await new Promise<void>((resolve: () => void) => setTimeout(resolve, 2000));

    // PDF generation options
    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${data?.resume?.name?.replace(/\s+/g, '_') || data?.portfolio?.name?.replace(/\s+/g, '_') || 'resume'}_${templateName}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        // Removed height: 1123 to capture full content
        scrollX: 0,
        scrollY: 0,
        logging: false,
        removeContainer: true
      },
      jsPDF: { 
        unit: 'px', 
        format: [794, 1123], 
        orientation: 'portrait'
      }
    };
    // Generate PDF from iframe
    if (!iframe.contentDocument) {
      throw new Error('Could not access iframe document for PDF generation');
    }
    await window.html2pdf().set(opt).from(iframe.contentDocument.body).save();

    // Cleanup
    document.body.removeChild(iframe);

    return { success: true, message: 'Resume PDF downloaded successfully' };

  } catch (error) {
    console.error('Error generating resume PDF:', error);
    return { 
      success: false, 
      message: `Failed to generate resume PDF: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

const generateResumeHTML = async (TemplateComponent: React.ComponentType<{ data: any }>, data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create container with proper styling
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px';
      container.style.minHeight = '1123px';
      container.style.backgroundColor = 'white';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.fontSize = '12px';
      container.style.lineHeight = '1.4';
      
      document.body.appendChild(container);

      // Create React wrapper
      const wrapper = document.createElement('div');
      container.appendChild(wrapper);

      // Render React component
      const root = createRoot(wrapper);
      const element = React.createElement(TemplateComponent, { data });
      
      root.render(element);

      // Wait for rendering
      setTimeout(() => {
        const html = wrapper.innerHTML;
        
        if (!html || html.trim() === '' || html.length < 100) {
          console.error('HTML generation failed - content too short or empty');
          console.log('Component data:', data);
          console.log('Generated HTML:', html);
          
          // Cleanup
          try {
            root.unmount();
          } catch (e) {
            console.warn('Error unmounting:', e);
          }
          document.body.removeChild(container);
          
          reject(new Error('Generated HTML is empty or too short'));
          return;
        }
        
        // Cleanup
        try {
          root.unmount();
        } catch (e) {
          console.warn('Error unmounting:', e);
        }
        document.body.removeChild(container);
        
        resolve(html);
      }, 3000);
      
    } catch (error) {
      console.error('Error in generateResumeHTML:', error);
      reject(error);
    }
  });
};

export const downloadPortfolioHTML = async (templateName: string, data: any) => {
  try {
    console.log('Starting HTML generation for:', templateName);
    console.log('Portfolio data:', JSON.stringify(data, null, 2));
    
    // Validate input data
    if (!data || (!data.portfolio && !data.resume)) {
      throw new Error('Invalid data: No portfolio or resume data found');
    }
    
    const TemplateComponent = PORTFOLIO_TEMPLATES[templateName as keyof typeof PORTFOLIO_TEMPLATES];
    if (!TemplateComponent) {
      throw new Error(`Portfolio template "${templateName}" not found. Available templates: ${Object.keys(PORTFOLIO_TEMPLATES).join(', ')}`);
    }

    // Convert React component to HTML
    const htmlContent = await reactToHtml(TemplateComponent, data);
    
    if (!htmlContent || htmlContent.trim() === '') {
      throw new Error('Generated HTML content is empty');
    }

    // Create complete HTML document with full shadcn/ui styling
    const completeHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data?.portfolio?.name || data?.resume?.name || 'Portfolio'} - Portfolio</title>
    <style>
        ${getCompleteShadcnCSS()}
        
        /* Additional portfolio-specific styles */
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        }
        
        * {
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        /* Fix for any missing responsive utilities */
        @media (max-width: 768px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .text-6xl, .text-7xl, .text-8xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }
        }
        
        /* Enhanced smooth scrolling */
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Portfolio loaded successfully');
            
            // Enhanced smooth scrolling for anchor links
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            // Handle form submissions gracefully
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Thank you for your interest! This is a static portfolio. Please use the contact information provided to get in touch.');
                });
            });
            
            // Add loading states for images
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.addEventListener('error', function() {
                    this.style.display = 'none';
                    console.warn('Failed to load image:', this.src);
                });
            });
            
            // Enhance accessibility
            const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
            interactiveElements.forEach(el => {
                if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
                    el.setAttribute('aria-label', 'Interactive element');
                }
            });
        });
    </script>
</head>
<body>
    ${htmlContent}
</body>
</html>`;

    // Create and download the file
    const blob = new Blob([completeHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data?.portfolio?.name?.replace(/\s+/g, '_') || data?.resume?.name?.replace(/\s+/g, '_') || 'portfolio'}_${templateName}_website.html`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, message: 'Portfolio website downloaded successfully' };

  } catch (error) {
    console.error('Error generating portfolio HTML:', error);
    return { 
      success: false, 
      message: `Failed to generate portfolio website: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};

// Main download handler with improved error handling
export const handleDownload = async (templateType: string, templateName: string, data: any) => {
  console.log('Download handler called with:', { templateType, templateName, data });
  
  try {
    if (templateType.includes('resume') || templateType.includes('cv')) {
      return await downloadResumePDF(templateName, data);
    } else if (templateType.includes('portfolio') || templateType.includes('website')) {
      return await downloadPortfolioHTML(templateName, data);
    } else {
      return { 
        success: false, 
        message: `Unknown template type: ${templateType}. Expected 'resume' or 'portfolio'.` 
      };
    }
  } catch (error) {
    console.error('Error in download handler:', error);
    return { 
      success: false, 
      message: `Download failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};
