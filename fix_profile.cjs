const fs = require('fs');
let content = fs.readFileSync('src/data/profileData.ts', 'utf8');

const replacementSkills = `  {
    category: 'Advanced Excel',
    iconName: 'Terminal',
    description: 'Complex cross-sheet formula structuring and historical data forecasting.',
    skills: [
      { name: 'Complex Cross-Sheet Formulas', level: 98, yearsExp: 'Advanced', highlight: true },
      { name: 'Historical Data Forecasting', level: 95, yearsExp: 'Advanced', highlight: true }
    ]
  },
  {
    category: 'Business Logic & Argument Evaluation',
    iconName: 'BrainCircuit',
    description: 'Bias mitigation, logical fallacy identification, and deductive/inductive argument mapping to ensure data-driven decisions are logically sound.',
    skills: [
      { name: 'Bias Mitigation', level: 95, yearsExp: 'Advanced', highlight: true },
      { name: 'Logical Fallacy Identification', level: 92, yearsExp: 'Advanced', highlight: true },
      { name: 'Deductive/Inductive Mapping', level: 94, yearsExp: 'Advanced', highlight: true }
    ]
  }`;

content = content.replace(/\{\s*category:\s*'Advanced Excel'[\s\S]*?\]\s*\}/, replacementSkills);

const replacementStrengths = `'Advanced Excel',
    'Business Logic & Argument Evaluation'`;

content = content.replace(/'Advanced Excel'/, replacementStrengths);

fs.writeFileSync('src/data/profileData.ts', content);
