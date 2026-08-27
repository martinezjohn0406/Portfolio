import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'data-architecture-cleansing',
    title: 'Data Architecture & Cleansing Pipeline',
    domain: 'Data Analysis',
    tagline: 'Transformed raw, unstructured string data into a clean, normalized relational structure.',
    summary: 'Ingested flat, pipe-delimited arrays and parsed them into distinct analytical categories. Architected a relational data model by splitting a single flat file into normalized, theme-based entities (Owner, Dog, Stay), dramatically improving query efficiency.',
    impactMetric: 'Normalized',
    impactLabel: 'Relational Structure',
    technologies: ['Data Parsing', 'Table Normalization', 'Entity-Relationship Mapping'],
    completionDate: '2025',
    featured: true,
    businessContext: 'Unstructured flat files creating analytical bottlenecks.',
    businessProblem: 'Raw data was stored in pipe-delimited arrays, making it impossible to perform relational queries or deep analysis efficiently.',
    solutionOverview: 'Engineered a parsing and splitting pipeline to normalize the data into a relational structure.',
    keyFindings: [
      'Successfully normalized flat file into Owner, Dog, and Stay entities.',
      'Significantly improved query efficiency and data integrity.',
      'Enabled complex relational analysis across previously siloed data points.'
    ],
    methodology: [
      {
        step: 'Data Ingestion',
        title: 'Parsing Arrays',
        description: 'Ingested flat, pipe-delimited arrays.',
        toolsUsed: ['Data Parsing']
      },
      {
        step: 'Normalization',
        title: 'Entity Splitting',
        description: 'Split single flat file into normalized, theme-based entities.',
        toolsUsed: ['Table Normalization']
      }
    ],
    interactiveData: [
      { name: 'Raw', actual: 100, predicted: 100 },
      { name: 'Parsed', actual: 80, predicted: 80 },
      { name: 'Normalized', actual: 50, predicted: 50 }
    ],
    chartType: 'bar'
  },
  {
    id: 'time-series-revenue',
    title: 'Time-Series Revenue Analysis',
    domain: 'Data Analysis',
    tagline: 'Analyzed historical music industry sales to identify long-term revenue shifts.',
    summary: 'Aggregated multi-year sales data to track the financial decline of physical media against the growth of streaming. Built categorical summaries tracking total revenue by genre and product type to inform high-level market strategy.',
    impactMetric: 'Trends',
    impactLabel: 'Revenue Shifts Identified',
    technologies: ['Time-Series Analysis', 'Data Aggregation', 'Categorical Summaries'],
    completionDate: '2025',
    featured: true,
    businessContext: 'Shifting market dynamics in the music industry requiring strategic realignment.',
    businessProblem: 'Needed clear visibility into the long-term financial shifts from physical media to streaming.',
    solutionOverview: 'Aggregated historical sales data to track revenue trends by genre and product type over multiple years.',
    keyFindings: [
      'Identified the exact inflection point where streaming revenue overtook physical media.',
      'Tracked categorical revenue shifts by genre to inform targeted marketing strategies.',
      'Provided a clear visual narrative of long-term market trends.'
    ],
    methodology: [
      {
        step: 'Aggregation',
        title: 'Multi-Year Data Aggregation',
        description: 'Aggregated multi-year sales data by product type and genre.',
        toolsUsed: ['Data Aggregation']
      },
      {
        step: 'Analysis',
        title: 'Trend Identification',
        description: 'Analyzed financial decline of physical media against streaming growth.',
        toolsUsed: ['Time-Series Analysis']
      }
    ],
    interactiveData: [
      { name: '2018', actual: 120, predicted: 100 },
      { name: '2019', actual: 130, predicted: 110 },
      { name: '2020', actual: 150, predicted: 130 }
    ],
    chartType: 'line'
  },
  {
    id: 'statistical-outlier-detection',
    title: 'Statistical Outlier Detection',
    domain: 'Data Analysis',
    tagline: 'Applied statistical rigor to real estate market data to identify true expected values.',
    summary: 'Analyzed variables like "Days on Market" to calculate expected baselines. Isolated severe statistical outliers (e.g., a property sitting for 352 days versus a 32-day market average) using principles of standard deviation and event probability to prevent skewed modeling.',
    impactMetric: 'Outliers',
    impactLabel: 'Isolated',
    technologies: ['Statistical Analysis', 'Standard Deviation', 'Event Probability'],
    completionDate: '2025',
    featured: true,
    businessContext: 'Real estate market models were being skewed by extreme outliers.',
    businessProblem: 'Needed to calculate true expected values for "Days on Market" by isolating statistically significant anomalies.',
    solutionOverview: 'Applied standard deviation and event probability principles to identify and isolate severe statistical outliers.',
    keyFindings: [
      'Calculated accurate expected baselines for Days on Market.',
      'Successfully isolated severe outliers (e.g., 352 days vs 32 days average).',
      'Prevented skewed modeling by applying rigorous statistical principles.'
    ],
    methodology: [
      {
        step: 'Analysis',
        title: 'Baseline Calculation',
        description: 'Calculated expected baselines for variables like Days on Market.',
        toolsUsed: ['Statistical Analysis']
      },
      {
        step: 'Isolation',
        title: 'Outlier Detection',
        description: 'Isolated severe statistical outliers using standard deviation.',
        toolsUsed: ['Standard Deviation']
      }
    ],
    interactiveData: [
      { name: 'Prop A', actual: 32, predicted: 30 },
      { name: 'Prop B', actual: 35, predicted: 30 },
      { name: 'Prop C', actual: 352, predicted: 30 }
    ],
    chartType: 'bar'
  },
  {
    id: 'historical-forecasting-modeling',
    title: 'Historical Forecasting Modeling',
    domain: 'Excel & Spreadsheets',
    tagline: 'Built an automated forecasting tool for recurring financial liabilities.',
    summary: 'Structured complex formulas referencing extensive data ranges across multiple worksheets. Calculated moving averages to accurately forecast upcoming dates and expected costs, optimizing cash flow visibility.',
    impactMetric: 'Forecast',
    impactLabel: 'Accuracy Optimized',
    technologies: ['Advanced Excel', 'Cross-Sheet Formulas', 'Moving Averages'],
    completionDate: '2025',
    featured: true,
    businessContext: 'Lack of visibility into upcoming recurring financial liabilities.',
    businessProblem: 'Needed an automated way to accurately forecast expected costs and dates based on historical data.',
    solutionOverview: 'Structured complex cross-sheet formulas to calculate moving averages and forecast future liabilities.',
    keyFindings: [
      'Automated forecasting for recurring financial liabilities.',
      'Accurately forecast upcoming dates and expected costs using moving averages.',
      'Optimized cash flow visibility for stakeholders.'
    ],
    methodology: [
      {
        step: 'Modeling',
        title: 'Complex Formula Structuring',
        description: 'Structured complex formulas referencing extensive data ranges.',
        toolsUsed: ['Advanced Excel']
      },
      {
        step: 'Forecasting',
        title: 'Moving Averages Calculation',
        description: 'Calculated moving averages to forecast expected costs.',
        toolsUsed: ['Moving Averages']
      }
    ],
    interactiveData: [
      { name: 'Q1', actual: 100, predicted: 105 },
      { name: 'Q2', actual: 110, predicted: 115 },
      { name: 'Q3', actual: 120, predicted: 125 }
    ],
    chartType: 'line'
  }
  ,
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
];