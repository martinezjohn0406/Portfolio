const fs = require('fs');
let content = fs.readFileSync('src/components/ProjectModal.tsx', 'utf8');

// Remove the interactive tab object from the map
const interactiveTabRegex = /\s*\{\s*id:\s*'interactive',\s*label:\s*'Interactive Data Explorer',\s*icon:\s*BarChart2\s*\},/g;
content = content.replace(interactiveTabRegex, '');

// Remove the interactive tab section
const interactiveSectionRegex = /\/\* TAB 2: INTERACTIVE DATA EXPLORER & CHARTS \*\/[\s\S]*?(?=\/\* TAB 3: CODE & METHODOLOGY \*\/)/g;
content = content.replace(interactiveSectionRegex, '');

fs.writeFileSync('src/components/ProjectModal.tsx', content);
console.log('Fixed tabs');
