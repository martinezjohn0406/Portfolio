export type DomainType = 'All' | 'Data Analysis' | 'Excel & Spreadsheets' | 'Web Design' | 'Programming';

export interface InteractiveDataPoint {
  name: string;
  actual?: number;
  predicted?: number;
  baseline?: number;
  value?: number;
  retention?: number;
  churn?: number;
  upper?: number;
  lower?: number;
  revenue?: number;
  category?: string;
  latency?: number;
  count?: number;
  efficiency?: number;
  score?: number;
}

export interface SqlQueryResult {
  columns: string[];
  rows: (string | number | boolean)[][];
  executionTimeMs: number;
  rowsAffected: number;
}

export interface ProjectMethodology {
  step: string;
  title: string;
  description: string;
  toolsUsed: string[];
}

export interface PipelineStage {
  stage: string;
  tool: string;
  description: string;
  duration?: string;
}

export interface Project {
  id: string;
  title: string;
  domain: 'Data Analysis' | 'Excel & Spreadsheets' | 'Web Design' | 'Programming';
  tagline: string;
  summary: string;
  impactMetric: string;
  impactLabel: string;
  technologies: string[];
  completionDate: string;
  featured: boolean;
  businessContext: string;
  businessProblem: string;
  solutionOverview: string;
  keyFindings: string[];
  methodology: ProjectMethodology[];
  codeSnippet?: {
    language: 'sql' | 'python' | 'dax' | 'java' | 'cpp' | 'html' | 'excel' | 'javascript';
    title: string;
    code: string;
  };
  sqlDemoQuery?: {
    defaultQuery: string;
    result: SqlQueryResult;
  };
  interactiveData: InteractiveDataPoint[];
  chartType: 'line' | 'bar' | 'area' | 'composed' | 'pie';
  chartConfig?: {
    xAxisKey: string;
    series: {
      key: string;
      label: string;
      color: string;
      type?: 'line' | 'bar' | 'area';
    }[];
    unit?: string;
    title?: string;
  };
  modelMetrics?: {
    metric: string;
    value: string;
    benchmark: string;
    status: 'optimal' | 'good' | 'neutral';
  }[];
  pipelineFlow?: PipelineStage[];
  githubUrl?: string;
  dashboardDemoUrl?: string;
  dashboardImage?: {
    src: string;
    caption: string;
  };
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  yearsExp: string;
  highlight?: boolean;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
  technologies: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  badgeColor: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  credential: string;
  period: string;
  details?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  inquiryType: 'Recruiting / Full-time' | 'Contract / Consulting' | 'Technical Collaboration' | 'General Question';
  message: string;
}

export interface AnalyticsProjectDatasetItem {
  id: string;
  title: string;
  businessProblem: string;
  datasetDescription: string;
  methodology: string;
  keyMetricsImpacted: string[];
  toolsUsed: string[];
  sampleQueryOrPayload: {
    type: 'sql' | 'chart_payload' | 'both';
    sampleSqlQuery?: string;
    sqlExecutionResult?: {
      columns: string[];
      rows: (string | number)[][];
      executionTimeMs: number;
    };
    sampleChartPayload: {
      chartType: 'bar' | 'area' | 'line';
      title: string;
      xAxisKey: string;
      data: Array<Record<string, string | number>>;
      series: Array<{
        key: string;
        label: string;
        color: string;
      }>;
    };
  };
}

