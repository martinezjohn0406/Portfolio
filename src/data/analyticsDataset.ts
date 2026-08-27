import { AnalyticsProjectDatasetItem } from '../types';

export const analyticsProjectsDataset: AnalyticsProjectDatasetItem[] = [
  {
    id: 'proj-cohort-retention',
    title: 'E-Commerce Customer Retention & Cohort Churn Analytics Engine',
    businessProblem: 'A multi-brand direct-to-consumer retailer experienced an unmonitored drop in 90-day repeat purchase rates from 34% down to 21%, resulting in inflated Customer Acquisition Cost (CAC) payback periods exceeding 14 months and revenue leakage.',
    datasetDescription: '24 months of transactional log data comprising 340,000+ orders across 85,000 unique customer IDs, clickstream event logs, coupon discount codes, and Zendesk post-purchase support tickets.',
    methodology: 'Built monthly cohort retention matrices using PostgreSQL window functions (LAG, DENSE_RANK) combined with RFM (Recency, Frequency, Monetary) clustering. Isolated critical drop-off points during days 15–45 and implemented automated triggered lifecycle email campaigns.',
    keyMetricsImpacted: [
      '+27.4% lift in 90-day repeat purchase conversion rate',
      '+$46.20 average increase in 12-month Customer Lifetime Value (LTV)',
      'CAC Payback Period compressed from 14.2 months down to 7.8 months',
      'Identified $320,000/yr in recurring revenue from win-back segments'
    ],
    toolsUsed: [
      'PostgreSQL',
      'dbt (Data Build Tool)',
      'Tableau Desktop',
      'Python (Pandas, Seaborn)',
      'Microsoft Excel (Power Pivot)'
    ],
    sampleQueryOrPayload: {
      type: 'both',
      sampleSqlQuery: `-- Monthly Cohort Retention & Churn Analysis
WITH first_orders AS (
  SELECT
    customer_id,
    DATE_TRUNC('month', MIN(order_date)) AS cohort_month
  FROM raw_orders
  WHERE status = 'completed'
  GROUP BY customer_id
),
monthly_activity AS (
  SELECT
    o.customer_id,
    f.cohort_month,
    DATE_TRUNC('month', o.order_date) AS activity_month,
    EXTRACT(YEAR FROM AGE(DATE_TRUNC('month', o.order_date), f.cohort_month)) * 12 +
    EXTRACT(MONTH FROM AGE(DATE_TRUNC('month', o.order_date), f.cohort_month)) AS month_number,
    SUM(o.net_revenue) AS monthly_revenue
  FROM raw_orders o
  JOIN first_orders f ON o.customer_id = f.customer_id
  WHERE o.status = 'completed'
  GROUP BY 1, 2, 3, 4
)
SELECT
  cohort_month,
  month_number,
  COUNT(DISTINCT customer_id) AS active_retained_customers,
  ROUND(
    COUNT(DISTINCT customer_id)::NUMERIC / 
    FIRST_VALUE(COUNT(DISTINCT customer_id)) OVER (PARTITION BY cohort_month ORDER BY month_number) * 100, 
    2
  ) AS retention_rate_pct,
  ROUND(SUM(monthly_revenue), 2) AS cohort_revenue
FROM monthly_activity
GROUP BY cohort_month, month_number
ORDER BY cohort_month DESC, month_number ASC;`,
      sqlExecutionResult: {
        columns: ['cohort_month', 'month_number', 'active_customers', 'retention_rate_pct', 'cohort_revenue'],
        rows: [
          ['2025-01-01', 0, 4820, 100.00, '$385,600.00'],
          ['2025-01-01', 1, 1831, 37.99, '$164,790.00'],
          ['2025-01-01', 2, 1420, 29.46, '$127,800.00'],
          ['2025-01-01', 3, 1290, 26.76, '$116,100.00'],
          ['2025-01-01', 4, 1195, 24.79, '$107,550.00'],
          ['2025-01-01', 5, 1140, 23.65, '$102,600.00']
        ],
        executionTimeMs: 44
      },
      sampleChartPayload: {
        chartType: 'area',
        title: 'Customer Cohort Retention Rate Decay Curve (%)',
        xAxisKey: 'month',
        data: [
          { month: 'Month 0 (Acquisition)', cohortA: 100, cohortB: 100, benchmark: 100 },
          { month: 'Month 1', cohortA: 38, cohortB: 29, benchmark: 32 },
          { month: 'Month 2', cohortA: 30, cohortB: 22, benchmark: 25 },
          { month: 'Month 3', cohortA: 27, cohortB: 18, benchmark: 21 },
          { month: 'Month 4', cohortA: 25, cohortB: 16, benchmark: 19 },
          { month: 'Month 5', cohortA: 24, cohortB: 15, benchmark: 18 },
          { month: 'Month 6', cohortA: 23, cohortB: 14, benchmark: 17 }
        ],
        series: [
          { key: 'cohortA', label: 'Optimized Workflow (Current)', color: '#C2A47A' },
          { key: 'benchmark', label: 'Industry Median Benchmark', color: '#64748B' },
          { key: 'cohortB', label: 'Legacy Baseline (Unoptimized)', color: '#EF4444' }
        ]
      }
    }
  },
  {
    id: 'proj-inventory-allocation',
    title: 'Multi-Warehouse Inventory Allocation & Supply Chain Optimization',
    businessProblem: 'Regional fulfillment centers suffered high stockout rates (8.4%) on top-tier SKUs while simultaneously holding $2.1M in excess slow-moving inventory, causing high carrying costs and delayed customer shipments.',
    datasetDescription: '3 years of warehouse ERP item movement logs (1.2M transaction lines), vendor delivery lead-time distributions, daily SKU sales velocity across 42,000 zip codes, and freight shipping rate tables.',
    methodology: 'Developed dynamic safety stock algorithms factoring lead-time standard deviation and demand volatility. Implemented automated ABC/XYZ stock prioritization matrices with proactive reorder point triggers in SQL and Excel modeling.',
    keyMetricsImpacted: [
      'Stockout Rate decreased from 8.4% down to 1.1% across primary SKUs',
      '$740,000 in working capital unlocked by purging excess safety stock',
      'Average order delivery transit time reduced by 1.8 business days',
      '99.4% on-time fulfillment SLA compliance achieved across 3 distribution hubs'
    ],
    toolsUsed: [
      'Google BigQuery',
      'Microsoft Excel (Advanced Formulas, XLOOKUP, Pivot)',
      'Power BI',
      'Python (NumPy, SciPy)',
      'SQL Stored Procedures'
    ],
    sampleQueryOrPayload: {
      type: 'both',
      sampleSqlQuery: `-- Dynamic Safety Stock & Reorder Point (ROP) Calculation
WITH sku_demand_stats AS (
  SELECT
    sku_id,
    warehouse_id,
    AVG(daily_units_sold) AS avg_daily_demand,
    STDDEV(daily_units_sold) AS stddev_demand,
    AVG(vendor_lead_time_days) AS avg_lead_time,
    STDDEV(vendor_lead_time_days) AS stddev_lead_time
  FROM warehouse_daily_sales
  WHERE record_date >= CURRENT_DATE - INTERVAL '90 days'
  GROUP BY sku_id, warehouse_id
),
safety_stock_calc AS (
  SELECT
    sku_id,
    warehouse_id,
    avg_daily_demand,
    avg_lead_time,
    -- Service factor Z = 1.65 (95% service level confidence)
    ROUND(
      1.65 * SQRT((avg_lead_time * POWER(stddev_demand, 2)) + (POWER(avg_daily_demand, 2) * POWER(stddev_lead_time, 2)))
    ) AS calculated_safety_stock
  FROM sku_demand_stats
)
SELECT
  s.sku_id,
  s.warehouse_id,
  ROUND(s.avg_daily_demand, 1) AS avg_daily_demand,
  s.calculated_safety_stock,
  ROUND((s.avg_daily_demand * s.avg_lead_time) + s.calculated_safety_stock) AS reorder_point_units,
  inv.on_hand_qty,
  CASE 
    WHEN inv.on_hand_qty <= ((s.avg_daily_demand * s.avg_lead_time) + s.calculated_safety_stock) THEN 'REORDER_NOW'
    WHEN inv.on_hand_qty > (s.calculated_safety_stock * 3) THEN 'OVERSTOCKED'
    ELSE 'OPTIMAL'
  END AS inventory_status
FROM safety_stock_calc s
JOIN warehouse_inventory inv ON s.sku_id = inv.sku_id AND s.warehouse_id = inv.warehouse_id
ORDER BY inv.on_hand_qty ASC;`,
      sqlExecutionResult: {
        columns: ['sku_id', 'warehouse_id', 'avg_daily_demand', 'safety_stock', 'reorder_point', 'on_hand_qty', 'status'],
        rows: [
          ['SKU-9942-A', 'WH-CENTRAL', 84.2, 142, 731, 210, 'REORDER_NOW'],
          ['SKU-8821-B', 'WH-EAST', 56.7, 98, 495, 520, 'OPTIMAL'],
          ['SKU-3310-C', 'WH-WEST', 112.0, 185, 969, 1050, 'OPTIMAL'],
          ['SKU-1044-D', 'WH-CENTRAL', 12.4, 34, 121, 580, 'OVERSTOCKED'],
          ['SKU-7721-E', 'WH-EAST', 45.1, 78, 394, 180, 'REORDER_NOW']
        ],
        executionTimeMs: 62
      },
      sampleChartPayload: {
        chartType: 'bar',
        title: 'Inventory Stockout Reduction by Warehouse Region (%)',
        xAxisKey: 'region',
        data: [
          { region: 'Midwest Hub', baselineStockout: 9.4, optimizedStockout: 1.2 },
          { region: 'East Coast Hub', baselineStockout: 8.1, optimizedStockout: 0.9 },
          { region: 'West Coast Hub', baselineStockout: 7.8, optimizedStockout: 1.1 },
          { region: 'Southern Hub', baselineStockout: 8.9, optimizedStockout: 1.3 }
        ],
        series: [
          { key: 'baselineStockout', label: 'Legacy Stockout Rate (%)', color: '#EF4444' },
          { key: 'optimizedStockout', label: 'Optimized Stockout Rate (%)', color: '#10B981' }
        ]
      }
    }
  },
  {
    id: 'proj-clinical-readmission',
    title: 'Clinical Hospital Readmission Risk & Length-of-Stay Predictor',
    businessProblem: 'A regional healthcare network was penalized under CMS Hospital Readmissions Reduction Program guidelines due to a 19.8% 30-day all-cause readmission rate for heart failure and diabetic patient cohorts.',
    datasetDescription: 'De-identified Electronic Health Records (EHR) of 48,000 inpatient hospitalizations including ICD-10 diagnostic codes, laboratory test velocity, medication counts, age brackets, and post-discharge follow-up records.',
    methodology: 'Constructed an automated patient readmission risk scoring algorithm in SQL and Python. Stratified patients into high/medium/low risk tiers upon hospital discharge, enabling focused nurse outreach within 48 hours of discharge.',
    keyMetricsImpacted: [
      '30-Day Readmission Rate reduced from 19.8% down to 13.2% (-33.3% relative drop)',
      '$1.45M in annual CMS penalty avoidance and uncompensated care savings',
      '94% follow-up coordination rate achieved for high-risk patient segments',
      'Average Inpatient Length of Stay (LOS) decreased by 0.6 days per patient'
    ],
    toolsUsed: [
      'SQL (Snowflake / HIPAA-Compliant Mart)',
      'Python (scikit-learn, Pandas)',
      'Looker Studio Dashboards',
      'Microsoft Excel (Clinical Summary Models)',
      'Healthcare Analytics Data Warehousing'
    ],
    sampleQueryOrPayload: {
      type: 'both',
      sampleSqlQuery: `-- Patient Readmission Risk Scoring & Cohort Stratification
WITH patient_admission_features AS (
  SELECT
    encounter_id,
    patient_id,
    age,
    length_of_stay_days,
    num_prior_admissions_12m,
    num_medications_prescribed,
    has_diabetes_flag,
    has_heart_failure_flag,
    CASE 
      WHEN emergency_admission = TRUE THEN 15 
      ELSE 0 
    END AS emergency_weight
  FROM clinical_encounters
  WHERE discharge_date BETWEEN CURRENT_DATE - INTERVAL '180 days' AND CURRENT_DATE
),
risk_score_calculation AS (
  SELECT
    encounter_id,
    patient_id,
    age,
    length_of_stay_days,
    (
      (num_prior_admissions_12m * 18) +
      (CASE WHEN age >= 65 THEN 12 ELSE 4 END) +
      (length_of_stay_days * 3) +
      (num_medications_prescribed * 1.5) +
      (has_heart_failure_flag * 22) +
      (has_diabetes_flag * 14) +
      emergency_weight
    ) AS calculated_risk_score
  FROM patient_admission_features
)
SELECT
  encounter_id,
  patient_id,
  calculated_risk_score,
  CASE
    WHEN calculated_risk_score >= 70 THEN 'HIGH_RISK_TIER_1'
    WHEN calculated_risk_score >= 40 THEN 'MEDIUM_RISK_TIER_2'
    ELSE 'LOW_RISK_TIER_3'
  END AS risk_tier,
  CASE
    WHEN calculated_risk_score >= 70 THEN 'Mandatory 48hr Nurse Callback & Home Health Visit'
    WHEN calculated_risk_score >= 40 THEN 'Telehealth Follow-up within 7 Days'
    ELSE 'Standard Primary Care Follow-up'
  END AS clinical_protocol
FROM risk_score_calculation
ORDER BY calculated_risk_score DESC;`,
      sqlExecutionResult: {
        columns: ['encounter_id', 'patient_id', 'risk_score', 'risk_tier', 'clinical_protocol'],
        rows: [
          ['ENC-88912', 'PT-55219', 88.5, 'HIGH_RISK_TIER_1', 'Mandatory 48hr Callback & Home Visit'],
          ['ENC-90114', 'PT-41098', 76.0, 'HIGH_RISK_TIER_1', 'Mandatory 48hr Callback & Home Visit'],
          ['ENC-82390', 'PT-99812', 54.5, 'MEDIUM_RISK_TIER_2', 'Telehealth Follow-up within 7 Days'],
          ['ENC-77610', 'PT-12349', 42.0, 'MEDIUM_RISK_TIER_2', 'Telehealth Follow-up within 7 Days'],
          ['ENC-65499', 'PT-88120', 21.0, 'LOW_RISK_TIER_3', 'Standard Primary Care Follow-up']
        ],
        executionTimeMs: 51
      },
      sampleChartPayload: {
        chartType: 'line',
        title: '30-Day Hospital Readmission Rate Reduction Over 12 Months (%)',
        xAxisKey: 'quarter',
        data: [
          { quarter: 'Q1 Baseline', actualRate: 19.8, targetThreshold: 14.0, benchmark: 17.5 },
          { quarter: 'Q2 (Pilot Phase)', actualRate: 17.6, targetThreshold: 14.0, benchmark: 17.4 },
          { quarter: 'Q3 (Rollout)', actualRate: 15.1, targetThreshold: 14.0, benchmark: 17.2 },
          { quarter: 'Q4 (Optimized)', actualRate: 13.2, targetThreshold: 14.0, benchmark: 17.0 }
        ],
        series: [
          { key: 'actualRate', label: 'Actual Readmission Rate (%)', color: '#10B981' },
          { key: 'targetThreshold', label: 'CMS Non-Penalty Target (%)', color: '#C2A47A' },
          { key: 'benchmark', label: 'State Hospital Benchmark (%)', color: '#64748B' }
        ]
      }
    }
  }
];
