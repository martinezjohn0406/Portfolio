# Project 1: ShopSphere E-Commerce Sales Dashboard (Excel)

**Business question:** Which products, categories, and regions drive revenue, and how is revenue trending month to month?

## The dataset
`data/shopsphere_orders_raw.csv` — 1,894 online orders (Oct 2025–Sep 2026) for a fictional electronics / home / apparel store. Delivered messy on purpose: inconsistent category labels ("Electronics" vs "electronics" vs "Elec."), discounts stored three different ways ("10%", 0.10, blank), blank regions, and duplicate order IDs.

## What I did
1. **Cleaned the data** — standardized categories with `XLOOKUP` against a mapping table, normalized all discounts to one decimal format (blanks = 0), filled blank regions with "Unknown", removed 15 duplicate order IDs, and added a `NetRevenue = Units × UnitPrice × (1 − Discount)` helper column.
2. **Summarized with pivot tables** — revenue by month × category, by region, and top 10 products by revenue.
3. **Built a dashboard** — monthly revenue trend (line), revenue by category (bar), revenue by region (pie), plus headline KPIs.

## Key findings
- **$234K total revenue** across ~1,879 clean orders; average order value ≈ $125.
- **Apparel is the top category**, ahead of Electronics and Home & Kitchen.
- **Monthly revenue declined ~22%** from the first to the last month — worth investigating (seasonality? marketing pullback? product mix?).
- The **"Unknown" region** still holds meaningful revenue — a checkout-form fix that would improve every future analysis.

## Skills demonstrated
Excel data cleaning, XLOOKUP, pivot tables, calculated fields, line/bar/pie charts, dashboard layout.

## Files
- `shopsphere-sales-dashboard.xlsx` — Raw_Data, Cleaned_Data, Category_Lookup, Summary_Monthly, Summary_Region, Summary_TopProducts, Dashboard
- `data/shopsphere_orders_raw.csv` — the raw export
