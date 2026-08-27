const fs = require('fs');
let content = fs.readFileSync('src/data/projectsData.ts', 'utf8');

const newProject = `  ,
  {
    id: 'business-logic-assessment',
    title: 'Business Logic & Bias Mitigation Assessment',
    domain: 'Data Analysis',
    tagline: 'To evaluate business proposals and financial advice for logical validity, identifying underlying cognitive biases before decisions are made.',
    summary: 'Analyzed business case studies by explicitly mapping argument structures and identifying the use of inductive versus deductive reasoning. Evaluated the strength and validity of financial proposals by auditing the reliability of the information sources. Mitigated potential decision-making risks by successfully identifying cognitive biases, such as prototype bias, and logical fallacies, including hasty generalizations, within stakeholder arguments.',
    impactMetric: 'Risks',
    impactLabel: 'Mitigated',
    technologies: ['Argument Mapping', 'Bias Mitigation', 'Logical Validity'],
    completionDate: '2025',
    featured: true,
    businessContext: 'Unidentified cognitive biases and logical fallacies impacting business proposals.',
    businessProblem: 'Needed to evaluate business proposals and financial advice for logical validity to prevent flawed decision-making.',
    solutionOverview: 'Mapped argument structures and audited information sources to mitigate decision-making risks.',
    keyFindings: [
      'Successfully identified cognitive biases like prototype bias within arguments.',
      'Isolated logical fallacies including hasty generalizations to prevent flawed proposals.',
      'Ensured logically sound data-driven decisions via argument mapping.'
    ],
    methodology: [
      {
        step: 'Mapping',
        title: 'Argument Mapping',
        description: 'Explicitly mapped argument structures and reasoning types.',
        toolsUsed: ['Deductive/Inductive Analysis']
      },
      {
        step: 'Mitigation',
        title: 'Bias Mitigation',
        description: 'Identified cognitive biases and logical fallacies.',
        toolsUsed: ['Bias Identification']
      }
    ],
    interactiveData: [
      { name: 'Initial Risk', actual: 80, predicted: 80 },
      { name: 'Mitigated Risk', actual: 15, predicted: 15 }
    ],
    chartType: 'bar'
  }
];`;

content = content.replace(/\];\s*$/, newProject);

fs.writeFileSync('src/data/projectsData.ts', content);
