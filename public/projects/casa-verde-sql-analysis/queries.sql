
-- =============================================================
-- Q1: Monthly revenue by location (joins + aggregation)
-- =============================================================
SELECT strftime('%Y-%m', o.order_datetime) AS month,
       l.location_name,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM orders o
JOIN locations l      ON o.location_id = l.location_id
JOIN order_items oi   ON oi.order_id = o.order_id
GROUP BY month, l.location_name
ORDER BY month, revenue DESC;

-- =============================================================
-- Q2: Top 5 menu items by revenue (join + aggregation + limit)
-- =============================================================
SELECT m.item_name, m.category,
       SUM(oi.quantity) AS units_sold,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM order_items oi
JOIN menu_items m ON oi.item_id = m.item_id
GROUP BY m.item_name, m.category
ORDER BY revenue DESC
LIMIT 5;

-- =============================================================
-- Q3: Average order value by location
-- =============================================================
SELECT l.location_name,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(oi.quantity * oi.unit_price) / COUNT(DISTINCT o.order_id), 2) AS avg_order_value
FROM orders o
JOIN locations l    ON o.location_id = l.location_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY l.location_name
ORDER BY avg_order_value DESC;

-- =============================================================
-- Q4: Revenue share by menu category
-- =============================================================
SELECT m.category,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
       ROUND(100.0 * SUM(oi.quantity * oi.unit_price) /
             (SELECT SUM(quantity * unit_price) FROM order_items), 1) AS pct_of_revenue
FROM order_items oi
JOIN menu_items m ON oi.item_id = m.item_id
GROUP BY m.category
ORDER BY revenue DESC;

-- =============================================================
-- Q5: Busiest day of week (SQLite: %w => 0=Sunday)
-- =============================================================
SELECT CASE strftime('%w', o.order_datetime)
         WHEN '0' THEN 'Sunday' WHEN '1' THEN 'Monday' WHEN '2' THEN 'Tuesday'
         WHEN '3' THEN 'Wednesday' WHEN '4' THEN 'Thursday' WHEN '5' THEN 'Friday'
         ELSE 'Saturday' END AS weekday,
       COUNT(DISTINCT o.order_id) AS orders,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY weekday
ORDER BY orders DESC;

-- =============================================================
-- Q6: High-value customers - lifetime spend above the average (subquery)
-- =============================================================
SELECT c.customer_name,
       COUNT(DISTINCT o.order_id) AS visits,
       ROUND(SUM(oi.quantity * oi.unit_price), 2) AS lifetime_spend
FROM customers c
JOIN orders o      ON o.customer_id = c.customer_id
JOIN order_items oi ON oi.order_id = o.order_id
GROUP BY c.customer_name
HAVING lifetime_spend > (SELECT AVG(cust_total) FROM (
          SELECT SUM(oi2.quantity * oi2.unit_price) AS cust_total
          FROM orders o2 JOIN order_items oi2 ON oi2.order_id = o2.order_id
          GROUP BY o2.customer_id))
ORDER BY lifetime_spend DESC
LIMIT 10;

-- =============================================================
-- Q7: Month-over-month revenue growth (subquery + self-join style)
-- =============================================================
SELECT month, revenue,
       ROUND(100.0 * (revenue - prev_revenue) / prev_revenue, 1) AS mom_growth_pct
FROM (SELECT strftime('%Y-%m', o.order_datetime) AS month,
             SUM(oi.quantity * oi.unit_price) AS revenue,
             LAG(SUM(oi.quantity * oi.unit_price)) OVER (ORDER BY strftime('%Y-%m', o.order_datetime)) AS prev_revenue
      FROM orders o JOIN order_items oi ON oi.order_id = o.order_id
      GROUP BY month)
ORDER BY month;
