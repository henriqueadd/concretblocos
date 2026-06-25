const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\henri\\.gemini\\antigravity\\brain\\3cc225a4-bdb8-480e-86f8-2a71f1a57d8b';
const destDir = 'C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone\\public\\wp-content\\uploads\\2026\\06';

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

const images = [
    { src: 'media__1782389577074.jpg', dest: 'carousel_1.jpg' },
    { src: 'media__1782389577092.jpg', dest: 'carousel_2.jpg' },
    { src: 'media__1782389577097.jpg', dest: 'carousel_3.jpg' },
    { src: 'media__1782389577113.jpg', dest: 'carousel_4.jpg' },
    { src: 'media__1782389593169.jpg', dest: 'carousel_5.jpg' }
];

images.forEach((img, idx) => {
    const srcPath = path.join(srcDir, img.src);
    const destPath = path.join(destDir, img.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${img.src} -> ${img.dest}`);
    } else {
        console.error(`Source not found: ${srcPath}`);
    }
});
