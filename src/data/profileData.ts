import { SkillCategory, ExperienceItem, CertificationItem, EducationItem } from '../types';

export const profileData = {
  name: 'John Martinez',
  title: 'Data Analyst | Problem Solver | Strategic Thinker',
  tagline: 'Transforming messy, unstructured information into clean, relational datasets and actionable business insights.',
  bio: 'I am a rigorous and detail-oriented data professional currently completing a Bachelor of Science in Data Analytics at Western Governors University. I specialize in transforming messy, unstructured information into clean, relational datasets and actionable business insights. Beyond technical execution, I bring a strong framework of critical thinking to my work—actively evaluating data models for logical fallacies to ensure that business decisions are based on sound, objective reality. Whether I am building complex Excel forecasting models, analyzing expected values, or restructuring databases, I am passionate about finding the narrative in the numbers and delivering clear value to stakeholders.',
  status: 'Open to Data Analyst Roles',
  location: 'Wichita, KS',
  address: 'Wichita, KS 67213',
  phone: '(316) 452-0406',
  email: 'martinezjohn0406@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://www.linkedin.com/in/martinezjohn0406',
  educationSummary: 'Western Governors University (B.S. Data Analytics)',
  languages: ['English (Fluent)', 'Spanish (Bilingual)'],
  yearsExperience: 2,
  certificationsCount: 'Certified',
  coreStrengths: [
    'Data Wrangling & Cleaning',
    'Database Structuring',
    'Statistical Analysis',
    'Data Visualization & Reporting',
    'Advanced Excel',
    'Business Logic & Argument Evaluation'
  ]
};

export const skillsCategories: SkillCategory[] = [
  {
    category: 'Data Wrangling & Cleaning',
    iconName: 'Database',
    description: 'Advanced data parsing, delimiter splitting, and missing value treatment.',
    skills: [
      { name: 'Advanced Data Parsing', level: 95, yearsExp: 'Advanced', highlight: true },
      { name: 'Delimiter Splitting', level: 90, yearsExp: 'Advanced', highlight: true },
      { name: 'Missing Value Treatment', level: 92, yearsExp: 'Advanced', highlight: true }
    ]
  },
  {
    category: 'Database Structuring',
    iconName: 'Layers',
    description: 'Relational database design, table normalization, and entity-relationship mapping.',
    skills: [
      { name: 'Relational Database Design', level: 92, yearsExp: 'Advanced', highlight: true },
      { name: 'Table Normalization', level: 94, yearsExp: 'Advanced', highlight: true },
      { name: 'Entity-Relationship Mapping', level: 90, yearsExp: 'Advanced', highlight: true }
    ]
  },
  {
    category: 'Statistical Analysis',
    iconName: 'BarChart3',
    description: 'Expected value calculations, normal distributions, standard deviations, event probabilities, and Z-score modeling.',
    skills: [
      { name: 'Expected Value Calculations', level: 95, yearsExp: 'Advanced', highlight: true },
      { name: 'Normal Distributions & Std Dev', level: 92, yearsExp: 'Advanced', highlight: true },
      { name: 'Event Probabilities & Z-scores', level: 90, yearsExp: 'Advanced', highlight: true }
    ]
  },
  {
    category: 'Data Visualization & Reporting',
    iconName: 'Sparkles',
    description: 'PivotTables, trend analysis, and categorical performance tracking.',
    skills: [
      { name: 'PivotTables', level: 96, yearsExp: 'Advanced', highlight: true },
      { name: 'Trend Analysis', level: 92, yearsExp: 'Advanced', highlight: true },
      { name: 'Categorical Performance Tracking', level: 90, yearsExp: 'Advanced', highlight: true }
    ]
  },
    {
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
  }
];

export const experiencesData: ExperienceItem[] = [];

export const certificationsData: CertificationItem[] = [];

export const educationData: EducationItem[] = [
  {
    institution: 'Western Governors University (WGU)',
    location: 'Online',
    credential: 'B.S. in Data Analytics',
    period: 'In Progress',
    details: 'Currently completing a Bachelor of Science in Data Analytics.'
  }
];
