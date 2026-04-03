const fs = require('fs');

// 1. Update style.css
let css = fs.readFileSync('style.css', 'utf8');

const katanaCss = `
/* ============================================= */
/*  KATANA ANIMATIONS                            */
/* ============================================= */

.katana-1 {
    animation: slash-left 1.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
}

.katana-2 {
    animation: slash-right 1.2s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
    animation-delay: 0.15s;
    opacity: 0;
}

@keyframes slash-left {
    0% {
        opacity: 0;
        transform: translate(-30vw, 30vh) rotate(-25deg);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0) rotate(-25deg);
    }
}

@keyframes slash-right {
    0% {
        opacity: 0;
        transform: translate(30vw, 30vh) rotate(25deg) scaleX(-1);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0) rotate(25deg) scaleX(-1);
    }
}
`;

if (!css.includes('.katana-1')) {
    css += katanaCss;
    fs.writeFileSync('style.css', css);
}

// 2. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'class="absolute w-full max-w-[800px] -rotate-[25deg] drop-shadow-[0_0_40px_rgba(196,30,58,0.6)] object-contain"',
    'class="katana-1 absolute w-full max-w-[800px] -rotate-[25deg] drop-shadow-[0_0_40px_rgba(196,30,58,0.6)] object-contain"'
);

html = html.replace(
    'class="absolute w-full max-w-[800px] rotate-[25deg] -scale-x-100 drop-shadow-[0_0_40px_rgba(196,30,58,0.6)] object-contain"',
    'class="katana-2 absolute w-full max-w-[800px] rotate-[25deg] -scale-x-100 drop-shadow-[0_0_40px_rgba(196,30,58,0.6)] object-contain"'
);

fs.writeFileSync('index.html', html);

console.log('Animation added!');
