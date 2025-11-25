
const fs = require('fs');
const path = require('path');

const requiredDeps = ['pdf2json'];

console.log('🔍 Checking critical dependencies...');

let missing = [];

for (const dep of requiredDeps) {
    try {
        require.resolve(dep);
        console.log(`✅ ${dep} is installed`);
    } catch (e) {
        console.error(`❌ ${dep} is MISSING`);
        missing.push(dep);
    }
}

if (missing.length > 0) {
    console.error('\n⚠️  Missing dependencies detected!');
    console.error('Please run the following command to fix:');
    console.error(`\n    npm install ${missing.join(' ')}\n`);
    process.exit(1);
} else {
    console.log('\n✅ All critical dependencies are installed.\n');
}
