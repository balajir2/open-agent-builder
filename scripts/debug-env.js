const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const match = content.match(/CONVEX_DEPLOYMENT=.*/);
    console.log('Found CONVEX_DEPLOYMENT in .env.local:');
    console.log(match ? match[0] : 'Not found');
    
    // Also print surrounding lines to check for hidden characters or typos
    console.log('\n--- First 20 lines of .env.local ---');
    console.log(content.split('\n').slice(0, 20).join('\n'));
  } else {
    console.log('.env.local does not exist');
  }
} catch (e) {
  console.error('Error reading .env.local:', e.message);
}
