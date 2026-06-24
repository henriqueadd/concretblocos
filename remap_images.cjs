const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\henri\\.gemini\\antigravity\\scratch\\concretblocos_clone';

const map = {
  "/assets/images/logo.png": "/wp-content/uploads/2025/07/cropped-logo_concret_blocos.png",
  "/assets/images/dots.png": "/wp-content/uploads/2020/11/dots-2.png",
  "/assets/images/bloco_19x19x39_large.png": "/wp-content/uploads/2025/07/bloco_estrutural_19x19x39.png",
  "/assets/images/bloco_14x19x39_thumb.png": "/wp-content/uploads/2025/07/bloco_estrutural_14x19x39-150x150.png",
  "/assets/images/tubos_thumb.png": "/wp-content/uploads/2025/07/tubos-150x150.png",
  "/assets/images/bloco_19x19x39_thumb.png": "/wp-content/uploads/2025/07/bloco_estrutural_19x19x39_1-1-150x150.png",
  "/assets/images/icon_history.png": "/wp-content/uploads/elementor/thumbs/history-r8pcdiyvm5uskktjrap5ft4mae0x9ll6rz4ty81j4w.png",
  "/assets/images/icon_quality.png": "/wp-content/uploads/elementor/thumbs/check-decagram-outline-r8pcdno2kc186mmpzuqaa9xx9bdrc33ugme9cluk9s.png",
  "/assets/images/icon_service.png": "/wp-content/uploads/elementor/thumbs/face-agent-r8pcdaibwnj7o35u4p1ibd9gxx6mcbnlqt9gmqe2ow.png",
  "/assets/images/icon_map.png": "/wp-content/uploads/elementor/thumbs/map-marker-radius-outline-r8pcde9onzocyj0diqo0lcbbbgo3742j3bveju8i00.png",
  "/assets/images/canaleta_19x19x39.png": "/wp-content/uploads/2025/07/canaleta_estrutural_19x19x39.png",
  "/assets/images/bloco_19x19x39_detail.png": "/wp-content/uploads/2025/07/bloco_estrutural_19x19x39-1024x1024.png",
  "/assets/images/bloco_de_15.png": "/wp-content/uploads/2025/07/bloco_estrutural_de_15.png",
  "/assets/images/bloco_14x19x39.png": "/wp-content/uploads/2025/07/bloco_estrutural_14x19x39.png",
  "/assets/images/bloco_14x19x54.png": "/wp-content/uploads/2025/07/bloco_estrutural_14x19x54.png",
  "/assets/images/bloco_19x19x39.png": "/wp-content/uploads/2025/07/bloco_estrutural_19x19x39_1-1.png",
  "/assets/images/bloco_19x19x19.png": "/wp-content/uploads/2025/07/bloco_estrutural_19x19x19-1.png",
  "/assets/images/bloco_14x19x19.png": "/wp-content/uploads/2025/07/bloco_estrutural_14x19x19.png",
  "/assets/images/bloco_09x14x19.png": "/wp-content/uploads/2025/07/bloco_estrutural_09x14x19.png",
  "/assets/images/piso_16_faces_8cm.png": "/wp-content/uploads/2026/03/piso-16-faces-rustico-22x11x08-f.png",
  "/assets/images/piso_16_faces_6cm.png": "/wp-content/uploads/2026/03/piso-16-faces-rustico-22x11x06-f.png",
  "/assets/images/piso_retangular_6cm.png": "/wp-content/uploads/2026/03/piso-retangular-rustico-20x10x06.png",
  "/assets/images/piso_retangular_8cm.png": "/wp-content/uploads/2026/03/piso-retangular-rustico-20x10x08.png",
  "/assets/images/canaletas_thumb.png": "/wp-content/uploads/2025/07/canaletas1.png",
  "/assets/images/canaleta_14x19x39.png": "/wp-content/uploads/2026/03/canaleta-14-19-39-f.png",
  "/assets/images/guia_rua.png": "/wp-content/uploads/2025/07/guia_rua.png",
  "/assets/images/guia_jardim.png": "/wp-content/uploads/2026/03/guia-de-jardim-f.png",
  "/assets/images/tubos.png": "/wp-content/uploads/2025/07/tubos.png",
  "/assets/images/tubo_fossa.png": "/wp-content/uploads/2025/07/tubo_fossa_posso.png"
};

const files = fs.readdirSync(projectDir);

files.forEach(file => {
    const filePath = path.join(projectDir, file);
    const ext = path.extname(filePath);
    
    if (ext === '.html' || ext === '.css') {
        let content = fs.readFileSync(filePath, 'utf-8');
        let updated = false;
        
        for (const [oldPath, newPath] of Object.entries(map)) {
            if (content.includes(oldPath)) {
                content = content.split(oldPath).join(newPath);
                updated = true;
                console.log(`  Updated reference in ${file}: ${oldPath} -> ${newPath}`);
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Saved changes to ${file}`);
        }
    }
});
