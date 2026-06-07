const fs = require('fs');
const path = require('path');

// 1. REPLACE THIS WITH YOUR ACTUAL LIVE RENDER URL
const LIVE_BACKEND_URL = "https://spice-auction-server.onrender.com"; 

const TARGET_DIRS = ['./']; // Scans the root and all subfolders (1 through 9)

function updateFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        
        // Skip node_modules and git history directories
        if (file === 'node_modules' || file === '.git') return;
        
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            updateFiles(filePath);
        } else if (file.endsWith('.js') || file.endsWith('.html') || file.endsWith('.json')) {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Replaces any local port 8080 reference with your production cloud URL
            if (content.includes('https://spice-auction-server.onrender.com')) {
                const updatedContent = content.replace(/http:\/\/localhost:8080/g, LIVE_BACKEND_URL);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated API endpoint inside: ${filePath}`);
            }
        }
    });
}

console.log("Parsing directory tree for old local environments...");
updateFiles('./');
console.log("✅ All frontend and backend URL bindings successfully pointed to Render!");