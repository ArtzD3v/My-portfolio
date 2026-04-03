const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const githubSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.12-.35 6.4-.81 6.4-7.03A5.42 5.42 0 0 0 19 4.39a5.1 5.1 0 0 0-.1-3.32s-1.15-.37-3.6 1.25a12.8 12.8 0 0 0-6.6 0C6.15 1.07 5 1.44 5 1.44a5.1 5.1 0 0 0-.1 3.32 5.42 5.42 0 0 0-1.42 3.53c0 6.2 3.28 6.67 6.4 7.02a4.8 4.8 0 0 0-1 3.03V22"/><path d="M9 19c-4.2 1.4-5.2-1.4-7-2"/></svg>';
const linkedinSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>';

html = html.replace(/<i data-lucide="github" class="w-5 h-5"><\/i>/g, githubSvg);
html = html.replace(/<i data-lucide="linkedin" class="w-5 h-5"><\/i>/g, linkedinSvg);

// Improve optimizations: load scripts with defer, remove unused gsap plugins
html = html.replace(/<script src="https:\/\/unpkg.com\/lucide@latest"><\/script>/g, '<script src="https://unpkg.com/lucide@latest" defer></script>');
html = html.replace(/<script src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/gsap\/3.12.2\/gsap.min.js"><\/script>\s*<script src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/gsap\/3.12.2\/ScrollTrigger.min.js"><\/script>/g, '');

fs.writeFileSync('index.html', html);
console.log('Optimized index.html!');
