# Debug Workflow

## Trigger
User says: "something is broken", "debug", "getting an error", "not working", "fix this bug", "[feature] isn't rendering/loading/working"

---

## Steps

### 1. Gather Context
Ask for the following if not provided:
- What is broken? (exact symptom)
- Where? (page, admin, block editor, REST API, etc.)
- Error message? (exact text, file, line number if available)
- When did it start? (after a specific change, plugin update, deploy?)
- WordPress debug log available? (`wp-content/debug.log`)

### 2. Initial Lead Developer Assessment
Before delegating, read the relevant file(s) if identified:
- Does the error point to a specific file/function in xpress-2?
- Is this a known pattern (hook conflict, missing nonce, enqueue issue, block registration)?
- Can the root cause be identified without the debugger?

If the fix is obvious and simple — fix it directly as lead developer without delegating.

If it requires systematic investigation — delegate to `debugger`.

### 3. Delegate to `debugger`
Pass:
- Full error message and context
- Relevant file paths already identified
- Any hypothesis about the cause
- Which xpress-2 layer is likely involved (PHP, block, REST, JS, CSS)

### 4. Review Diagnosis
Read the debugger's root cause analysis:
- Is the root cause correct?
- Is the proposed fix minimal and safe (no over-engineering)?
- Does it touch any security-sensitive code? If so, flag for extra review.

### 5. Implement the Fix
As lead developer, implement the fix:
- Make the targeted change
- Do not refactor surrounding code unless it's causing the bug
- Verify the fix resolves the symptom

### 6. Optional: Code Review
If the fix touches security-sensitive areas (auth, REST, nonces, output escaping), run it through `code-reviewer` before closing.

### 7. Report to User
- What was broken and why
- What was changed (file + line)
- How to verify it's fixed

---

## Output
Save to `output/[client-slug]-debug-[issue-slug].md` for significant bugs worth documenting.
