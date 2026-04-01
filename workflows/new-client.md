# New Client Workflow

## Trigger
User says: "new client", "start a project for [client]", "onboard [client]", "new project for [client]"

---

## Steps

### 1. Gather Intake Info
Ask the user for the following if not already provided:
- Client name
- Business type (RV park / campground or housing / real estate)
- Location (city, state)
- Brand colors (hex codes if available, or describe: "earthy greens and browns")
- Website goals (bookings, leads, info-only, tenant portal, etc.)
- Any existing site to reference or replace?
- Target audience (families, retirees, first-time buyers, etc.)
- Any competitor sites to differentiate from?
- Preferred font or "use your judgment"

### 2. Confirm Before Delegating to `client-onboarder`
Tell the user: "I'm going to delegate to the client-onboarder to produce the project brief and page list. Good to proceed?"
Wait for approval, then delegate. The client-onboarder produces:
- `CLAUDE.md` draft for the client project repo
- Recommended page list
- Copy tone notes
- Recommended subagent sequence

Output saved to: `output/[client-slug]-project-brief.md`

### 3. Confirm Before Delegating to `design-tokenizer`
Tell the user: "I'm going to delegate to the design-tokenizer to map the brand colors to xpress-2 tokens. Good to proceed?"
Wait for approval, then delegate. The design-tokenizer produces:
- `theme.json` color block
- Tailwind v4 `@theme` CSS variables
- Button variant mapping
- Accessibility contrast report

Output saved to: `output/[client-slug]-design-tokens.md`

### 4. Review Both Outputs
As lead developer, review both outputs before proceeding:
- Confirm page list makes sense for the client type
- Confirm color tokens pass accessibility
- Flag anything that needs user clarification

### 5. Present Plan to User
Show the user:
- Confirmed page list
- Color palette preview (token names + hex values)
- Proposed site structure
- Next step: delegate to `scaffolder`

Ask: "Does this look right? Ready to scaffold the project?"

### 6. Delegate to `scaffolder` (on approval)
Wait for explicit approval, then delegate. The scaffolder produces:
- Client `CLAUDE.md` (final)
- WordPress project structure plan
- Block recommendations per page
- `memory/` folder with starter files
- `npm run build` confirmation

### 7. Save to Memory
Save a memory entry with:
- Client name, type, location
- Key decisions made (colors, pages, tone)
- Output file paths

---

## Output Files
- `output/[client-slug]-project-brief.md`
- `output/[client-slug]-design-tokens.md`
