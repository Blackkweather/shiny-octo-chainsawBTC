# War Room — First Client Campaign State

_Last updated: 2026-07-03 23:40 UTC. This file lets any future Claude session resume the operation with zero context loss._

## Mission
Get Marco (Blackkweather) his first paying client. Offer: AI missed-call receptionist / workflow automation / website+chatbot for local service businesses. Pricing: €490–1,500 setup, 50% upfront, 48h delivery.

## Live infrastructure (Apollo.io account, sender: heyweb10@gmail.com)

### Sequences (both ACTIVE)
| Sequence | Apollo ID | Contacts | Language |
|---|---|---|---|
| FR — Automatisation locale (appels manqués / site / chatbot) | `6a484162d5bfd7001884bfd0` | 14 active | French |
| EN/US — Local automation (missed calls / website / chatbot) | `6a484173eba2ab0010119845` | 6 active | English |

3 steps each: missed-call AI receptionist hook (day 0) → pivot to quotes/website/chatbot (day 3, same thread) → breakup w/ 50/50 terms (day 7, same thread).

### Enrolled prospects (20, all publicly listed business emails, user-approved per batch)
**FR sequence:** Faro Rénovation (Lyon), Depanneo (Lyon), Les Travaux du Particulier (Paris 11), Plombier Paris Express, Electricien Paris Express, Artisan André Père & Fils (Paris 10), AMP Plombier (Aubervilliers), CPServ (Marseille), Serrurerie Bordelaise (Bordeaux), Plombier Lausanne SA (CH), CertiCHAUFFE (Brussels), Sanichauffe (Brussels), Plomberie Pro-Drain (Montréal), Plomberie V.I.P. (Montréal)

**EN sequence:** Chicago Plumbing Experts, Rescue Plumbing (Chicago), Garage & Gate Service Pros (Denver), Garage Door Repair Denver, Quick Drains (Manchester), Emergency Plumber Manchester

Labels in Apollo: `FR artisans batch 1`, `US home services batch 1`, `INTL artisans batch 2`.

## Rules learned
- Fresh Gmail sender: max ~20 first-touch sends/day, ramp slowly. Day 1 (Jul 3) = 20 → ceiling hit, resume adding Jul 4+.
- Only use publicly displayed emails; never guess `info@` patterns (bounces kill deliverability).
- Every enrollment batch needs Marco's explicit GO after seeing the recipient list.
- Reply speed is the conversion lever: answer within 10 min from heyweb10@gmail.com.

## Warm lead
Gmail draft (marcohemma5@gmail.com → contact@nyotamusic.com): SACEM deposit automation, €490 fixed. Status: UNSENT, sitting in Drafts.

## Blocked / pending
- **Apify**: sandbox network blocks api.apify.com. Fix A: add custom connector at claude.ai/settings/connectors → `https://mcp.apify.com` (needs desktop site; mobile app can't). Fix B: environment network allowlist + new session. Unlocks Google Maps scraping (hundreds of leads incl. form-hidden emails for dentists/med spas) + Reddit/Upwork/X boards.
- **Apollo free plan**: search API blocked; sequences/contacts/sending all work.
- Dashboard artifact: https://claude.ai/code/artifact/fdf1291d-9961-407f-8fc6-62f268a253be

## Tier A pipeline (bigger money, apply manually)
- Free-Work.com: Expert IA Générative €500/j, 1yr, remote/IDF, starts Jul 19 (+ second: €500–550/j from Aug 31) — FR pitch written on dashboard.
- Superteam Earn (earn.superteam.fun/bounties): rolling $1k–5k USDC dev bounties — pick ≤10-submission dev bounties, ship live on Vercel.
- Freelancer.com/jobs/n8n — live n8n briefs.
- Twine music gigs (Blackkweather is SACEM producer): $750 urgent indie-folk job `twine.net/projects/b9kxl0-...` + EP gig `b9llv0` + others. Pitches written on dashboard.
- Braintrust/Gun.io vetting for $95–130/hr contract AI work.

## Next actions queue
1. Check campaign stats ~12h after launch (auto check-in armed: trigger `trig_01RgMs8s5PcbC575s5Hj3xF7`).
2. Batch 4 harvest (Jul 4): more FR/CH/BE artisans + retry dentists via Apify if connected.
3. Send Nyota draft.
4. Apply to Free-Work missions + Twine $750 gig.
5. Set Apollo email signature if not done.
