# WordPress Build Workflow

## Trigger
User says: "build the site", "build [client] site", "push pages to WordPress", "populate the site", "create the pages"

---

## Prerequisites
Before running this workflow, confirm:
- [ ] xpress-2 MCP server is connected (`claude mcp list` shows `xpress2`)
- [ ] Client `.env` is set in `mcp-server/` (WP_URL, WP_USER, WP_APP_PASSWORD)
- [ ] Client project brief exists in `output/[client-slug]-project-brief.md`
- [ ] Design tokens exist in `output/[client-slug]-design-tokens.md`

If any are missing, run the `new-client` workflow first.

---

## Steps

### 1. Read Site Context
Call `get_site_info` via the xpress-2 MCP server to confirm:
- Connected to the right WordPress site
- Site name matches the client
- Theme options / colors are set

If colors don't match the design tokens — stop and tell the user to apply the tokens in the WordPress admin first (Appearance → xpress-2 Options).

### 2. Read Client Brief
Read `output/[client-slug]-project-brief.md` to get:
- Page list
- Block recommendations per page
- Tone and content notes

### 3. Check Existing Pages
Call `list_pages` to see what's already on the site.
- If pages exist: confirm with user whether to update them or skip
- If site is fresh: proceed to build all pages

### 4. Search Media Library
Call `search_media` to inventory available images.
- Note which images are available for hero slides, amenity sections, etc.
- If media library is empty: flag to user — they need to upload images before heroes can be populated with real photos

### 5. Build Pages (one at a time, in order)

For each page in the brief:

**a. Delegate to `copywriter`**
Pass: client name, page name, page goal, tone notes from brief.
Get back: headline, body copy, CTA, meta description.

**b. Delegate to `seo-analyst`**
Pass: the copy + page type.
Get back: confirmed title tag, meta description, any heading adjustments.

**c. Build Gutenberg block markup**
As lead developer, construct the full block markup using xpress-2 block schemas:
- Use correct block names (`xpress-2/hero`, `xpress-2/rates`, etc.)
- Populate attributes with real copy, real media IDs from search_media
- Follow block schema attribute rules exactly

**d. Call `create_page` or `update_page`**
- New page: `create_page` with `status: "draft"` — never publish directly without user review
- Existing page: `update_page` with the page ID

**e. Report back**
After each page: report the page title, WordPress edit URL, and status.

### 6. Final Summary
After all pages are built, return:
- List of all pages created/updated with edit URLs
- Any pages skipped and why
- Any media gaps (missing images)
- Recommended next step: "Review drafts in WordPress admin, then publish when ready"

---

## Safety Rules
- Always create pages as **drafts** — never publish directly
- Never delete existing pages without explicit user instruction
- If a page already exists and has content, show the user before overwriting
- One page at a time — do not batch create without confirmation on the first page

---

## Output
Save a build log to `output/[client-slug]-build-log.md` with all page IDs and URLs.
