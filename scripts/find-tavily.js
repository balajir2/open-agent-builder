const fs = require('fs');
const path = require('path');

function findFile(dir, name) {
    try {
        if (!fs.existsSync(dir)) return;
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                if (file !== 'node_modules') {
                    findFile(filePath, name);
                }
            } else if (file.toLowerCase().includes(name.toLowerCase())) {
                console.log(filePath);
            }
        }
    } catch (e) {
        // ignore errors
    }
}

console.log('Searching for tavily in node_modules/@langchain...');
findFile('node_modules/@langchain', 'tavily');
