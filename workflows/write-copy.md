# Write Copy Workflow

## Trigger
User says: "write copy for", "write the [page] page", "rewrite [page]", "I need copy for", "draft [page] content"

---

## Steps

### 1. Clarify
If not already known, ask:
- Which client?
- Which page(s)?
- Any existing copy to rewrite, or starting from scratch?
- Anything specific to include (promotions, amenities, key selling points)?

If the client has a project brief in `output/`, read it first for tone and audience context.

### 2. Brief the Copywriter
As lead developer, prepare a clear brief:
- Client name, type (RV park / housing), location
- Page name and goal (what should a visitor do after reading this?)
- Key points to hit (pulled from project brief or intake)
- Tone notes (from brief, or default to client type tone)
- Any SEO keyword to work in naturally (ask user if unknown)

### 3. Delegate to `copywriter`
Pass the full brief. The copywriter produces:
- Primary page copy
- Meta description
- Alt CTA variant

### 4. Review the Copy
As lead developer, read the output and check:
- Does it match the client's voice and niche?
- Is the CTA specific and clear?
- Does it hit the page goal?
- Flag any claims that need fact-checking with the client

### 5. Optional: SEO Check
If launching soon, delegate the copy to `seo-analyst` for a quick on-page SEO pass before presenting to the user.

### 6. Present to User
Deliver the copy with:
- Page name and intended use
- Meta description (separate, labeled)
- Any notes on claims to verify with client

---

## Output
Save to `output/[client-slug]-[page-slug]-copy.md`
