const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://concretblocos.com.br/wp-content/uploads/2026/03/video-concretblocos.mp4';
const projectPublicDir = 'C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone\\public';

const urlObj = new URL(videoUrl);
const relativePath = decodeURIComponent(urlObj.pathname);
const destPath = path.join(projectPublicDir, relativePath);
const destDir = path.dirname(destPath);

// Ensure directories exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

console.log(`Downloading video from ${videoUrl}...`);
console.log(`Destination: ${destPath}`);

const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

https.get(videoUrl, options, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Failed to download: status code ${res.statusCode}`);
        return;
    }
    
    // Log content length if available
    const totalBytes = parseInt(res.headers['content-length'] || '0', 10);
    console.log(`Size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
    
    const fileStream = fs.createWriteStream(destPath);
    res.pipe(fileStream);
    
    let downloadedBytes = 0;
    res.on('data', (chunk) => {
        downloadedBytes += chunk.length;
        if (totalBytes > 0) {
            const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1);
            process.stdout.write(`Progress: ${percent}% (${(downloadedBytes / (1024 * 1024)).toFixed(2)} / ${(totalBytes / (1024 * 1024)).toFixed(2)} MB)\r`);
        }
    });

    fileStream.on('finish', () => {
        fileStream.close();
        console.log('\nVideo downloaded successfully!');
    });
}).on('error', (err) => {
    console.error('Error downloading video:', err);
});
