# Code Review Workflow

## Trigger
User says: "review this code", "do a code review", "check this before it ships", "security review", "review [filename]"

---

## Steps

### 1. Identify Scope
Clarify what needs reviewing if not specified:
- Specific file(s) or the entire changeset?
- Focus area: security, quality, conventions, performance, or all?
- Is this pre-launch, pre-PR, or a spot check?

### 2. Read the Code
As lead developer, read the relevant files before delegating.
Identify:
- What the code does
- Any obvious red flags to flag explicitly to the code-reviewer
- Which xpress-2 patterns are in use (blocks, CPTs, REST, theme options, etc.)

### 3. Delegate to `code-reviewer`
Pass:
- File path(s) to review
- Context: what this code does and where it fits in xpress-2
- Any specific concerns to prioritize

### 4. Review the Report
As lead developer, read the code-reviewer output and:
- Confirm Critical issues are genuine blockers
- Filter out any false positives (reviewer may flag intentional patterns)
- Add your own architectural notes if needed

### 5. Present to User
Return a clean, prioritized report:
- **Critical** — must fix before shipping (with exact file + line + fix)
- **Warnings** — should fix (with recommendations)
- **Minor** — optional improvements
- **Approved** — what's solid and doesn't need touching

---

## Output
Save full review to `output/[file-slug]-code-review.md` for audit trail.
