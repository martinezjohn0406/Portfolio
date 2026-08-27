const fs = require('fs');
let content = fs.readFileSync('src/components/ResumeModal.tsx', 'utf8');

const regex = /\[\s*'Time Management',[\s\S]*?'Java & C\+\+ Fundamentals'\s*\]/;
if (regex.test(content)) {
  content = content.replace(regex, 'profileData.coreStrengths');
  fs.writeFileSync('src/components/ResumeModal.tsx', content);
  console.log('Skills replaced successfully.');
} else {
  console.log('Skills array not found.');
}
