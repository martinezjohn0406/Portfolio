import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'shopsphere-sales-dashboard',
    title: 'ShopSphere E-Commerce Sales Dashboard',
    domain: 'Excel & Spreadsheets',
    tagline: 'Cleaned 1,894 messy orders and built a dashboard answering which products, categories, and regions drive revenue.',
    summary: 'Built an end-to-end Excel sales dashboard for a fictional e-commerce store. Standardized inconsistent categories with XLOOKUP, normalized three different discount formats, removed duplicate orders, then summarized everything with pivot tables and a dashboard of KPIs, trend lines, and category/region breakdowns.',
    impactMetric: '$234K',
    impactLabel: 'Revenue Analyzed',
    technologies: ['Excel', 'XLOOKUP', 'Pivot Tables', 'Data Cleaning', 'Charts'],
    completionDate: '2026',
    featured: true,
    businessContext: 'A growing online store with no clear picture of what drives its revenue.',
    businessProblem: 'Which products, categories, and regions drive revenue, and how is revenue trending month to month?',
    solutionOverview: 'Cleaned the raw order export in Excel, built pivot-table summaries by month, category, region, and product, and assembled a one-page dashboard with KPIs and trend charts.',
    keyFindings: [
      '$234K total revenue across ~1,879 clean orders; average order value ~$125.',
      'Apparel is the top category, ahead of Electronics and Home & Kitchen.',
      'Monthly revenue declined ~22% from the first to the last month — flagged for investigation (seasonality? marketing pullback? product mix?).',
      'The "Unknown" region still holds meaningful revenue — a checkout-form fix that would improve every future analysis.'
    ],
    methodology: [
      {
        step: 'Data Cleaning',
        title: 'Standardize the Mess',
        description: 'Mapped inconsistent category labels with XLOOKUP, normalized discounts stored three different ways, filled blank regions with "Unknown", and removed 15 duplicate order IDs.',
        toolsUsed: ['XLOOKUP', 'Data Cleaning']
      },
      {
        step: 'Summarization',
        title: 'Pivot the Answers',
        description: 'Built pivot tables for revenue by month x category, by region, and top 10 products by revenue, plus a NetRevenue helper column.',
        toolsUsed: ['Pivot Tables', 'Calculated Fields']
      },
      {
        step: 'Dashboard',
        title: 'One-Page Story',
        description: 'Assembled headline KPIs with a monthly revenue trend line, category bar chart, and region breakdown.',
        toolsUsed: ['Charts', 'Dashboard Layout']
      }
    ],
    codeSnippet: {
      language: 'excel',
      title: 'Cleaning formulas used',
      code: '=XLOOKUP([@Category], Category_Lookup[Raw], Category_Lookup[Clean], "Unknown")\n\n=IF([@Discount]="","",IF(RIGHT([@Discount],1)="%",\n   VALUE(LEFT([@Discount],LEN([@Discount])-1))/100, VALUE([@Discount])))\n\n=[@Units]*[@UnitPrice]*(1-[@Discount_Clean])'
    },
    interactiveData: [
      { name: 'Oct 25', actual: 22.9 },
      { name: 'Nov 25', actual: 17.9 },
      { name: 'Dec 25', actual: 19.7 },
      { name: 'Jan 26', actual: 19.8 },
      { name: 'Feb 26', actual: 18.9 },
      { name: 'Mar 26', actual: 20.2 },
      { name: 'Apr 26', actual: 23.5 },
      { name: 'May 26', actual: 18.7 },
      { name: 'Jun 26', actual: 18.8 },
      { name: 'Jul 26', actual: 18.2 },
      { name: 'Aug 26', actual: 17.7 },
      { name: 'Sep 26', actual: 17.8 }
    ],
    chartType: 'line',
    chartConfig: {
      xAxisKey: 'name',
      series: [{ key: 'actual', label: 'Revenue ($K)', color: '#8E795E', type: 'line' }],
      unit: '$K',
      title: 'Monthly revenue trend ($K)'
    },
    githubUrl: 'https://github.com/martinezjohn0406/Portfolio/tree/main/public/projects/shopsphere-sales-dashboard'
  },
  {
    id: 'casa-verde-sql-analysis',
    title: 'Casa Verde Restaurant SQL Analysis',
    domain: 'Data Analysis',
    tagline: 'Seven SQL queries across five tables answering where a 3-location restaurant chain makes money and who its best customers are.',
    summary: 'Analyzed a fictional 3-location restaurant chain (2,373 orders, 5,988 line items) with 7 SQLite queries covering joins, aggregations, subqueries, and window functions. Found that Tuesday — not Friday — is the busiest day, and that Mains drive the clear majority of revenue.',
    impactMetric: '2,373',
    impactLabel: 'Orders Analyzed',
    technologies: ['SQL', 'SQLite', 'JOINs', 'Aggregations', 'Subqueries', 'Window Functions'],
    completionDate: '2026',
    featured: true,
    businessContext: 'A 3-location restaurant chain guessing at staffing, promos, and menu focus.',
    businessProblem: 'Where is the chain making money, who are its best customers, and when is it busiest?',
    solutionOverview: 'Wrote 7 analysis queries in SQLite — monthly revenue by location, top items, average order value, category revenue share, busiest weekday, high-value customers, and month-over-month growth with LAG.',
    keyFindings: [
      'Mains drive $50.4K — the clear majority of revenue; Steak Fajitas is the single top item at $7.9K.',
      'Tuesday is the busiest day (364 orders) — counterintuitive vs. the usual Friday/Saturday assumption; staffing and promos should reflect it.',
      'Riverside has the highest average order value ($36.79) despite Downtown doing more volume.',
      '146 of 300 customers spend above average — a solid base for a loyalty program.',
      'September revenue dipped 9.7% month-over-month — flag for management, not a crisis.'
    ],
    methodology: [
      {
        step: 'Query 1-3',
        title: 'Revenue Foundations',
        description: 'Monthly revenue by location with multi-table JOINs, top 5 menu items by revenue, and average order value per location.',
        toolsUsed: ['JOINs', 'GROUP BY', 'Aggregations']
      },
      {
        step: 'Query 4-6',
        title: 'Customer & Category Insight',
        description: 'Revenue share by category with a scalar subquery, busiest weekday via date functions, and high-value customers with HAVING + subquery vs. average spend.',
        toolsUsed: ['Subqueries', 'Date Functions', 'HAVING']
      },
      {
        step: 'Query 7',
        title: 'Growth Trend',
        description: 'Month-over-month revenue growth using the LAG window function to flag the September dip.',
        toolsUsed: ['Window Functions']
      }
    ],
    codeSnippet: {
      language: 'sql',
      title: 'Monthly revenue by location',
      code: "SELECT strftime('%Y-%m', o.order_datetime) AS month,\n       l.location_name,\n       ROUND(SUM(oi.quantity * mi.price), 2) AS revenue\nFROM orders o\nJOIN order_items oi ON oi.order_id = o.order_id\nJOIN menu_items mi  ON mi.item_id = oi.item_id\nJOIN locations l    ON l.location_id = o.location_id\nGROUP BY month, l.location_name\nORDER BY month, revenue DESC;"
    },
    interactiveData: [
      { name: 'Mains', actual: 50.4 },
      { name: 'Starters', actual: 18.9 },
      { name: 'Desserts', actual: 9.4 },
      { name: 'Drinks', actual: 7.1 }
    ],
    chartType: 'bar',
    chartConfig: {
      xAxisKey: 'name',
      series: [{ key: 'actual', label: 'Revenue ($K)', color: '#8E795E', type: 'bar' }],
      unit: '$K',
      title: 'Revenue by menu category ($K)'
    },
    githubUrl: 'https://github.com/martinezjohn0406/Portfolio/tree/main/public/projects/casa-verde-sql-analysis'
  },
  {
    id: 'brightwave-marketing-analysis',
    title: 'BrightWave Marketing Campaign Analysis',
    domain: 'Excel & Spreadsheets',
    tagline: 'Calculated CTR, CPC, CPA, and ROAS across 6 ad channels to answer which deserve more budget — and which should be cut.',
    summary: 'Analyzed 12 months of spend, impressions, clicks, conversions, and revenue across 6 channels for a fictional agency. Built channel-level efficiency metrics and a monthly ROAS trend dashboard, and handled a zero-conversion tracking glitch honestly instead of letting it skew the numbers.',
    impactMetric: '4.68x',
    impactLabel: 'Blended ROAS',
    technologies: ['Excel', 'CTR / CPC / CPA / ROAS', 'Pivot Tables', 'Charts'],
    completionDate: '2026',
    featured: true,
    businessContext: 'A marketing agency spending ~$347K across 6 channels with no clear read on efficiency.',
    businessProblem: 'Which ad channels deserve more budget, and which should be cut?',
    solutionOverview: 'Built calculated metrics (CTR, CPC, CPA, ROAS) per channel, a monthly ROAS trend table, and a dashboard — then turned the numbers into explicit budget recommendations.',
    keyFindings: [
      'Blended ROAS of 4.68 on ~$347K spend (~$1.62M revenue) — the program is profitable overall.',
      'Email is the most efficient channel by far (ROAS 17.66) — recommend increasing its budget.',
      'YouTube Ads has the lowest ROAS (2.20, CPA $33.82) — recommend cutting spend or reworking creative.',
      "TikTok's September pixel misfire ($5.2K spend, 0 recorded conversions) was excluded from efficiency judgments and flagged for the tracking team — bad data shouldn't drive budget decisions."
    ],
    methodology: [
      {
        step: 'Metrics',
        title: 'Efficiency Formulas',
        description: 'Built channel summary with CTR = Clicks/Impressions, CPC = Spend/Clicks, CPA = Spend/Conversions, ROAS = Revenue/Spend.',
        toolsUsed: ['Calculated Fields']
      },
      {
        step: 'Data Quality',
        title: 'Handle the Glitch Honestly',
        description: 'Flagged TikTok Sep 2026 (spend with 0 conversions, a tracking-pixel misfire) for the tracking team instead of deleting it or dividing by zero.',
        toolsUsed: ['Edge-Case Handling']
      },
      {
        step: 'Recommendations',
        title: 'Decisions, Not Just Numbers',
        description: 'Monthly ROAS trend table plus dashboard charts (ROAS by channel, CPA by channel) feeding explicit increase/cut recommendations.',
        toolsUsed: ['Pivot-Style Summaries', 'Charts']
      }
    ],
    codeSnippet: {
      language: 'excel',
      title: 'Channel efficiency metrics',
      code: '=IF([@Impressions]=0,"n/a",[@Clicks]/[@Impressions])      // CTR\n=[@Spend]/[@Clicks]                                  // CPC\n=IF([@Conversions]=0,"n/a",[@Spend]/[@Conversions]) // CPA\n=[@Revenue]/[@Spend]                                 // ROAS'
    },
    interactiveData: [
      { name: 'Email', actual: 17.66 },
      { name: 'Google', actual: 5.26 },
      { name: 'Affiliate', actual: 4.71 },
      { name: 'Meta', actual: 4.26 },
      { name: 'TikTok', actual: 3.94 },
      { name: 'YouTube', actual: 2.2 }
    ],
    chartType: 'bar',
    chartConfig: {
      xAxisKey: 'name',
      series: [{ key: 'actual', label: 'ROAS', color: '#8E795E', type: 'bar' }],
      title: 'ROAS by channel'
    },
    githubUrl: 'https://github.com/martinezjohn0406/Portfolio/tree/main/public/projects/brightwave-marketing-analysis'
  }
];
