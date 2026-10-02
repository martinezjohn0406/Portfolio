import { SkillCategory, ExperienceItem, CertificationItem, EducationItem } from '../types';

export const profileData = {
  name: 'John Martinez',
  title: 'Data Analyst | Excel & SQL | Problem Solver',
  tagline: 'Turning messy data into clean answers with Excel and SQL.',
  bio: 'I am a detail-oriented data analyst currently completing a B.S. in Data Analytics at Western Governors University (expected January 2028). My toolkit is Excel — pivot tables, XLOOKUP/VLOOKUP, data cleaning, charts — and SQL — filtering, joins, aggregations, subqueries. By day I work as a Rental Sales Agent for an agency managing Avis rental vehicles, where I handle customer data, transactions, and reporting. I am bilingual (English/Spanish) and open to entry-level data analyst roles and internships.',
  status: 'Open to Data Analyst Roles',
  location: 'Wichita, KS',
  address: 'Wichita, KS 67213',
  phone: '(316) 452-0406',
  email: 'martinezjohn0406@gmail.com',
  github: 'https://github.com/martinezjohn0406',
  linkedin: 'https://www.linkedin.com/in/martinezjohn0406',
  educationSummary: 'Western Governors University (B.S. Data Analytics, in progress)',
  languages: ['English (Native)', 'Spanish (Fluent)'],
  yearsExperience: 3,
  certificationsCount: 'In Progress',
  coreStrengths: [
    'Excel: Pivot Tables & XLOOKUP',
    'SQL: Joins & Aggregations',
    'Data Cleaning',
    'Charts & Reporting',
    'Bilingual (EN/ES)',
    'Turning Findings into Recommendations'
  ]
};

export const skillsCategories: SkillCategory[] = [
  {
    category: 'Excel',
    iconName: 'Table',
    description: 'The tool I reach for first: cleaning, summarizing, and visualizing data.',
    skills: [
      { name: 'Pivot Tables', level: 90, yearsExp: 'Proficient', highlight: true },
      { name: 'XLOOKUP / VLOOKUP', level: 90, yearsExp: 'Proficient', highlight: true },
      { name: 'Data Cleaning', level: 88, yearsExp: 'Proficient', highlight: true },
      { name: 'Charts & Dashboards', level: 85, yearsExp: 'Proficient' }
    ]
  },
  {
    category: 'SQL',
    iconName: 'Database',
    description: 'Querying relational data: filtering, joining, and aggregating answers.',
    skills: [
      { name: 'SELECT & Filtering', level: 88, yearsExp: 'Proficient', highlight: true },
      { name: 'JOINs', level: 85, yearsExp: 'Proficient', highlight: true },
      { name: 'Aggregations (GROUP BY)', level: 85, yearsExp: 'Proficient', highlight: true },
      { name: 'Subqueries', level: 80, yearsExp: 'Proficient' }
    ]
  },
  {
    category: 'Analysis & Reporting',
    iconName: 'BarChart3',
    description: 'Going from numbers to decisions people can act on.',
    skills: [
      { name: 'KPIs & Business Metrics', level: 85, yearsExp: 'Proficient', highlight: true },
      { name: 'Trend Analysis', level: 82, yearsExp: 'Proficient' },
      { name: 'Written Recommendations', level: 88, yearsExp: 'Proficient', highlight: true }
    ]
  }
];

export const experiencesData: ExperienceItem[] = [
  {
    role: 'Rental Sales Agent',
    company: 'Avis (agency-managed location)',
    period: 'Jun 2023 – Present',
    location: 'Wichita, KS',
    type: 'Full-time',
    highlights: [
      'Handle customer transactions, reservations, and vehicle inventory data daily.',
      'Explain pricing, fees, and options clearly to a high volume of customers.',
      'Reconcile transactions and resolve billing discrepancies.'
    ],
    technologies: ['Customer Data', 'Transactions', 'Reporting']
  },
  {
    role: 'Crew Trainer',
    company: "McDonald's",
    period: 'Mar 2021 – May 2023',
    location: 'Goddard, KS',
    type: 'Full-time',
    highlights: [
      'Trained new crew members on procedures, registers, and food safety.',
      'Built weekly crew schedules balancing coverage and labor targets.',
      'Kept operations running in a fast-paced, high-volume environment.'
    ],
    technologies: ['Scheduling', 'Training', 'Operations']
  }
];

export const certificationsData: CertificationItem[] = [];

export const educationData: EducationItem[] = [
  {
    institution: 'Western Governors University (WGU)',
    location: 'Online',
    credential: 'B.S. in Data Analytics',
    period: 'Aug 2025 – Jan 2028 (Expected)',
    details: 'In progress. Coursework in data management, statistics, and analytics.'
  },
  {
    institution: 'Clearwater High School',
    location: 'Clearwater, KS',
    credential: 'High School Diploma',
    period: 'Graduated May 2023',
    details: ''
  }
];
