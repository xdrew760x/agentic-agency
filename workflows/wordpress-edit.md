# WordPress Edit Workflow

## Trigger
User says: "edit [page]", "update [page] on [client] site", "change the [section] on [page]", "fix the [page]", "rewrite [section]"

---

## Prerequisites
- xpress-2 MCP server connected and pointed at the correct client site
- User has identified which page/section to edit

---

## Steps

### 1. Clarify Scope
If not already clear, ask:
- Which site / client?
- Which page?
- What specifically needs changing? (copy, blocks, layout, images, all of the above?)
- Is this a small edit (copy tweak) or a full page rebuild?

### 2. Read Current Page State
Call `list_pages` and find the target page ID.
Call `get_site_info` to confirm you're on the right site.

As lead developer, read the current page content from WordPress to understand what's there before changing anything.

### 3. Determine Edit Type

**Copy-only edit:**
- Delegate to `copywriter` with current copy + what needs changing
- Update just the text in the relevant block — do not rebuild the whole page

**SEO edit:**
- Delegate to `seo-analyst` with current page copy
- Apply recommended title, meta, heading changes only

**Block/layout edit:**
- As lead developer, reconstruct the affected block(s) using xpress-2 block schemas
- Keep all surrounding blocks unchanged

**Full page rebuild:**
- Follow the `wordpress-build` workflow for that single page
- Confirm with user before replacing all content

### 4. Show the Diff Before Applying
Before calling `update_page`, show the user:
- What the current content is (summarized)
- What will change
- Ask: "Ready to apply this update?"

### 5. Apply the Edit
Call `update_page` with the page ID and updated content.
Page stays in its current status (draft stays draft, published stays published).

### 6. Confirm
Return:
- Page title
- WordPress edit URL
- What was changed

---

## Safety Rules
- Never overwrite a published page without showing the user what will change first
- Never change more than was asked — surgical edits only
- If the page has custom blocks you don't recognize, read the block schema before touching it
- If something looks wrong after the edit, call `update_page` again to revert — always keep a copy of the original markup

---

## Output
Log significant edits to `output/[client-slug]-edit-log.md`
