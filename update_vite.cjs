const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf8');

// Insert base: './', before plugins
content = content.replace(
  "return {",
  "return {\n    base: './',"
);

fs.writeFileSync('vite.config.ts', content);
console.log('Updated vite.config.ts');
