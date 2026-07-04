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

## Apify — WORKING (as of Jul 4 00:50 UTC)
- `api.apify.com` added to environment network allowlist → API token works directly via curl. Token in scratchpad `.apify_token` (also `apify_api_Kdo1...`). Account: Black Fruits / blackkfruits@gmail.com, free plan $5 credit.
- Google Maps scraper actor: **`lukaskrivka/google-maps-with-contact-details`** (1.8M runs). Input: `{searchStringsArray:[...], locationQuery:"City, Country", maxCrawledPlacesPerSearch:15, language, skipClosedPlaces:true}`. POST to `/v2/acts/lukaskrivka~google-maps-with-contact-details/runs?token=`, poll run, GET `/v2/datasets/{defaultDatasetId}/items?clean=true`.
- First scrape (Geneva dentists + aesthetic clinics): 30 places, 21 emails, 20 unique loaded to Apollo (label `Geneva clinics batch 4`) — NOT yet enrolled (day-1 Gmail ceiling hit).
- The mcp.apify.com CUSTOM connector OAuth is broken (ofid errors) — ignore it, use the API-token+allowlist path.

## Geneva clinics batch 4 — staged, ENROLL Jul 4+ into FR sequence
High-ticket: dentists + aesthetic surgeons (Swiss prices). 20 contacts in Apollo, label `Geneva clinics batch 4`. Enroll into FR sequence `6a484162d5bfd7001884bfd0` after getting Marco's GO, respecting ~20-25/day fresh-Gmail ramp.

## Swiss clinics batch 5 — staged Jul 4 (ALL OF SWITZERLAND scrape)
6 parallel Apify runs (Zürich, Lausanne, Basel, Bern, Zug, Lugano): 240 places scraped, 181 emails, **170 unique contacts created in Apollo**, label `Swiss clinics batch 5`. Full list in `leads_switzerland.csv`. Cost: $2.13 (session Apify total ~$2.39 of $5).
- Language split for enrollment: Lausanne→FR sequence; Zürich/Basel/Bern/Zug→need a GERMAN sequence (create before enrolling); Lugano→need ITALIAN sequence (or enroll into EN).
- Daily ramp plan from Jul 4: ~25/day day2, ~35 day3, ~50 day4+ (single sender). Second sender doubles this — Marco declined for now.
- 2 emails had a scraped `%20` prefix, fixed on import: info@zahnarztpraxis-bernwest.ch, info@dr-hashagen.ch.

## Apollo totals (Jul 4 ~00:00 UTC)
- Live sending: 20 (FR seq 14 + EN seq 6)
- Staged: 190 (Geneva 20 + Switzerland 170)
- TOTAL CRM: 210 businesses
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
