const https = require('https');
const fs = require('fs');
const path = require('path');

const imageDir = 'C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone\\public\\assets\\images';

if (!fs.existsSync(imageDir)){
    fs.mkdirSync(imageDir, { recursive: true });
}

const imagesToDownload = [
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/cropped-logo_concret_blocos.png", name: "logo.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2020/11/dots-2.png", name: "dots.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_19x19x39.png", name: "bloco_19x19x39_large.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_14x19x39-150x150.png", name: "bloco_14x19x39_thumb.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/tubos-150x150.png", name: "tubos_thumb.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_19x19x39_1-1-150x150.png", name: "bloco_19x19x39_thumb.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/elementor/thumbs/history-r8pcdiyvm5uskktjrap5ft4mae0x9ll6rz4ty81j4w.png", name: "icon_history.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/elementor/thumbs/check-decagram-outline-r8pcdno2kc186mmpzuqaa9xx9bdrc33ugme9cluk9s.png", name: "icon_quality.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/elementor/thumbs/face-agent-r8pcdaibwnj7o35u4p1ibd9gxx6mcbnlqt9gmqe2ow.png", name: "icon_service.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/elementor/thumbs/map-marker-radius-outline-r8pcde9onzocyj0diqo0lcbbbgo3742j3bveju8i00.png", name: "icon_map.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/canaleta_estrutural_19x19x39.png", name: "canaleta_19x19x39.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_19x19x39-1024x1024.png", name: "bloco_19x19x39_detail.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_de_15.png", name: "bloco_de_15.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_14x19x39.png", name: "bloco_14x19x39.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_14x19x54.png", name: "bloco_14x19x54.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_19x19x39_1-1.png", name: "bloco_19x19x39.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_19x19x19-1.png", name: "bloco_19x19x19.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_14x19x19.png", name: "bloco_14x19x19.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/bloco_estrutural_09x14x19.png", name: "bloco_09x14x19.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/piso-16-faces-rustico-22x11x08-f.png", name: "piso_16_faces_8cm.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/piso-16-faces-rustico-22x11x06-f.png", name: "piso_16_faces_6cm.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/piso-retangular-rustico-20x10x06.png", name: "piso_retangular_6cm.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/piso-retangular-rustico-20x10x08.png", name: "piso_retangular_8cm.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/canaletas1.png", name: "canaletas_thumb.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/canaleta-14-19-39-f.png", name: "canaleta_14x19x39.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/guia_rua.png", name: "guia_rua.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2026/03/guia-de-jardim-f.png", name: "guia_jardim.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/tubos.png", name: "tubos.png" },
  { url: "https://concretblocos.com.br/wp-content/uploads/2025/07/tubo_fossa_posso.png", name: "tubo_fossa.png" }
];

function downloadImage(img, index = 0) {
    if (index >= imagesToDownload.length) {
        console.log('All images downloaded successfully.');
        return;
    }
    
    const item = imagesToDownload[index];
    const dest = path.join(imageDir, item.name);
    console.log(`Downloading (${index + 1}/${imagesToDownload.length}): ${item.url} -> ${item.name}`);
    
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };
    
    https.get(item.url, options, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Failed to download ${item.name}: Status code ${res.statusCode}`);
            // skip to next
            downloadImage(img, index + 1);
            return;
        }
        
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Saved ${item.name}`);
            downloadImage(img, index + 1);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${item.name}:`, err.message);
        downloadImage(img, index + 1);
    });
}

downloadImage();
