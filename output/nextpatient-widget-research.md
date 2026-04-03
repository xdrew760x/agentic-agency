# NextPatient Widget — Research Report
Date: 2026-04-02

## Executive Summary
- NextPatient widget embeds via a **script tag + div container** pattern, not an iframe — the JS is hosted on `nextpatient.co` and injects content into a target div
- Pricing is **custom/quote-based** across three tiers (Core, Advanced, Pro) — no public prices, no free plan, sales contact required
- Connecting to Nextech requires ordering "NextPatient API Access" through the Nextech Community Portal as a Super User

## Key Findings

### Widget / Embed Code
- Embed pattern: `<div id="nextpatient-widget"></div>` + `<script src="https://nextpatient.co/p/{PracticeID}/{ProviderID}/provider-locations.js" async></script>`
- Script loads async (non-render-blocking), hosted on NextPatient's domain
- Practice ID and Provider ID are required — found in the provider edit page URL within the NextPatient dashboard
- There is also a general scheduling widget (not just provider-specific), but the embed pattern is the same approach
- NextPatient support docs reference a WordPress-specific guide ("Adding the NextPatient widget to your WordPress site") but the article is behind their help center auth

### Signup Process
- No self-service signup — you schedule a demo with a regional account rep
- Demo request available at nextpatient.co
- Quote provided based on practice size and location

### Pricing
- **Core:** Self-scheduling, notifications, credit card capture, dedicated account manager
- **Advanced:** Core + interactive reminders, two-way texting, broadcast messaging, post-visit surveys
- **Pro:** Advanced + digital check-in, insurance/ID capture, consent forms, text-to-pay
- Add-ons: automated waitlist, recalls
- No contracts, 15% discount on annual billing
- No public dollar amounts — must contact sales

### Nextech Connection Setup
1. Log into Nextech Community Portal (nextech.my.site.com)
2. Must have "Super Nextech Community User" permissions
3. Go to "ORDER NOW" tab, select "NextPatient API Access", click Add
4. Accept authorization form
5. NextPatient notifies you when API is connected
6. If you lack permissions, your Practice Admin must request them from a Nextech Client Success Manager

## Implications for the Agency
- For a client site build, we would add the script tag + div to the appropriate page template or a Custom HTML block in WordPress
- No WordPress plugin exists — it is a raw JS embed, which is straightforward to place in xpress-2
- We cannot test/demo the widget without the client's Practice ID and Provider ID
- Client must handle the NextPatient sales process and Nextech API activation themselves — we just place the embed code they provide

## Gaps and Caveats
- Exact dollar pricing is not publicly available
- The WordPress-specific help article is behind NextPatient's support center login
- Could not confirm whether NextPatient also provides a hosted booking page URL (e.g., nextpatient.co/book/practice-name) in addition to the embed widget

## Sources
1. [NextPatient + Nextech Integration](https://www.nextpatient.co/integrations/nextech) — Integration overview and feature list
2. [NextPatient Service Plans](https://www.nextpatient.co/service-plans-pricing-quote-request) — Three pricing tiers, no public prices
3. [Nextech API Activation Instructions](https://help.nextpatient.co/nextech-select-and-practiceplus-api-activation-instructions) — Step-by-step Nextech portal setup
4. [Provider Bio Scheduling Widget](https://help.nextpatient.co/provider-bio-scheduling-widget) — Script tag embed code pattern with Practice ID / Provider ID
5. [Patient Self-Scheduling](https://help.nextpatient.co/patient-self-scheduling) — Feature overview and support article index
6. [Website & Marketing Support](https://help.nextpatient.co/website-marketing) — References WordPress widget guide and widget placement tips
