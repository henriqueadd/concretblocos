const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone\\style.css', 'utf-8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
    if (line.includes('grid-template-columns') || line.includes('minmax')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
