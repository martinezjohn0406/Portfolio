# Project 3: BrightWave Marketing Campaign Analysis (Excel)

**Business question:** Which ad channels deserve more budget, and which should be cut?

## The dataset
`data/brightwave_campaigns_raw.csv` — 12 months of spend, impressions, clicks, conversions, and revenue across 6 channels (Google Search, Meta Ads, TikTok Ads, Email, YouTube Ads, Affiliate) for a fictional agency. One quirk: TikTok's Sep 2026 row shows spend with 0 conversions (a tracking-pixel misfire).

## What I did
1. Built a channel summary with calculated metrics: **CTR** = Clicks ÷ Impressions, **CPC** = Spend ÷ Clicks, **CPA** = Spend ÷ Conversions, **ROAS** = Revenue ÷ Spend.
2. Handled the zero-conversion row honestly — flagged it for the tracking team instead of deleting it or dividing by zero.
3. Built a monthly ROAS trend table and a dashboard (ROAS by channel, CPA by channel, monthly ROAS trend).

## Key findings
- **Blended ROAS of 4.68** on ~$347K spend (~$1.62M revenue) — the program is profitable overall.
- **Email is the most efficient channel** — highest ROAS by far; recommend increasing its budget.
- **YouTube Ads has the lowest ROAS** — recommend cutting spend or reworking creative before spending more.
- TikTok's September pixel misfire ($5.2K spend, 0 recorded conversions) was excluded from efficiency judgments and flagged for the tracking team — bad data shouldn't drive budget decisions.

## Skills demonstrated
Excel calculated metrics, handling dirty/edge-case data, pivot-style summary tables, bar/line charts, turning analysis into recommendations.

## Files
- `brightwave-marketing-dashboard.xlsx` — Raw_Data, Channel_Summary, Monthly_ROAS, Dashboard
- `data/brightwave_campaigns_raw.csv` — the raw export
