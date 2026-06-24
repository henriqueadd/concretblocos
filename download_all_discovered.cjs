const https = require('https');
const fs = require('fs');
const path = require('path');

const projectPublicDir = 'C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone\\public';
const imageUrls = JSON.parse(fs.readFileSync('C:\\Users\\henri\\.gemini\\antigravity\\scratch\\all_discovered_images.json', 'utf-8'));

console.log(`Starting download of ${imageUrls.length} assets...`);

function downloadAsset(index = 0) {
    if (index >= imageUrls.length) {
        console.log('All discovered assets downloaded successfully!');
        return;
    }

    const urlStr = imageUrls[index];
    try {
        const urlObj = new URL(urlStr);
        // Pathname starts with '/' (e.g., /wp-content/uploads/2025/07/name.png)
        const relativePath = decodeURIComponent(urlObj.pathname);
        const destPath = path.join(projectPublicDir, relativePath);
        const destDir = path.dirname(destPath);

        // Ensure directories exist
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        console.log(`[${index + 1}/${imageUrls.length}] Downloading: ${urlStr}`);
        
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };

        https.get(urlStr, options, (res) => {
            if (res.statusCode !== 200) {
                console.error(`  Failed (Status ${res.statusCode}): ${urlStr}`);
                downloadAsset(index + 1);
                return;
            }

            const fileStream = fs.createWriteStream(destPath);
            res.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`  Saved to: ${destPath}`);
                downloadAsset(index + 1);
            });
        }).on('error', (err) => {
            console.error(`  Error downloading ${urlStr}:`, err.message);
            downloadAsset(index + 1);
        });
    } catch (e) {
        console.error(`  Invalid URL: ${urlStr}`, e.message);
        downloadAsset(index + 1);
    }
}

downloadAsset();
