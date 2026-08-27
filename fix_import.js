const fs = require('fs');
let content = fs.readFileSync('src/components/ResumeModal.tsx', 'utf8');

if (!content.includes("import { projectsData }")) {
  content = content.replace(
    "import { profileData", 
    "import { projectsData } from '../data/projectsData';\nimport { profileData"
  );
  fs.writeFileSync('src/components/ResumeModal.tsx', content);
  console.log('Import added successfully.');
} else {
  console.log('Import already exists.');
}
