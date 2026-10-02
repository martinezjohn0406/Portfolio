# Project 2: Casa Verde Restaurant Chain — SQL Sales Analysis

**Business question:** Where is the restaurant chain making money, who are its best customers, and when is it busiest?

## The dataset
A fictional 3-location restaurant chain ("Casa Verde"), Oct 2025–Sep 2026: 2,373 orders and 5,988 line items across 5 tables (`locations`, `menu_items`, `customers`, `orders`, `order_items`). Raw CSVs in `data/`; `analysis.sql` builds the whole database from scratch.

## What I did
Wrote 7 analysis queries in SQLite covering the core SQL toolkit:
1. **Monthly revenue by location** — multi-table `JOIN` + `GROUP BY`
2. **Top 5 menu items by revenue** — aggregation + `ORDER BY` + `LIMIT`
3. **Average order value by location** — per-group arithmetic
4. **Revenue share by menu category** — scalar subquery for the denominator
5. **Busiest day of week** — date functions + conditional labels
6. **High-value customers** — `HAVING` with a subquery comparing each customer to the overall average spend
7. **Month-over-month growth** — window function (`LAG`)

## Key findings
- **Mains drive $50.4K** — the clear majority of revenue; Steak Fajitas is the single top item at $7.9K.
- **Tuesday is the busiest day** (364 orders) — counterintuitive vs. the usual Friday/Saturday assumption; staffing and promos should reflect it.
- **Riverside has the highest average order value ($36.79)** despite Downtown doing more volume.
- **146 of 300 customers spend above average** — a solid base for a loyalty program.
- September revenue dipped **−9.7% month-over-month** — flag for management, not a crisis.

## Skills demonstrated
SQL joins, filtering, aggregations, GROUP BY/HAVING, subqueries, window functions, date functions.

## Files
- `analysis.sql` — schema, data, and all 7 queries (run: `sqlite3 casa_verde.db < analysis.sql`)
- `casa_verde.db` — pre-built SQLite database, ready to query
- `data/` — the 5 source CSVs
