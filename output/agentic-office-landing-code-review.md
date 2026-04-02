# Agentic Agency Landing Page -- Code Review

**Date:** 2026-04-02
**Reviewer:** Code Reviewer Agent
**File:** `output/agentic-office-landing/index.html`

---

## Critical (must fix before shipping)

### 1. FAQ accordion answer regions lack `id` and `aria-controls` pairing

**File:** `index.html`, lines 1567-1573 (and all subsequent FAQ items)

The `<button>` elements have `aria-expanded` but no `aria-controls` attribute pointing to the answer panel. The answer `<div role="region">` elements have no `id` and no `aria-labelledby` pointing back to the question. Screen readers cannot programmatically associate questions with answers.

**Fix:** Add matching `id` and `aria-controls`/`aria-labelledby` pairs:

```html
<button class="faq-item__question" aria-expanded="false" aria-controls="faq-answer-1">
  <span>Is this a real working system or a concept demo?</span>
  <span class="faq-item__icon" aria-hidden="true">+</span>
</button>
<div class="faq-item__answer" id="faq-answer-1" role="region" aria-labelledby="faq-question-1">
  <p>...</p>
</div>
```

Also add `id="faq-question-1"` to each button. Repeat for all 6 FAQ items (faq-answer-1 through faq-answer-6).

### 2. FAQ answer panels are not hidden from accessibility tree when collapsed

**File:** `index.html`, lines 1096-1104 (CSS), lines 1571 (HTML)

The collapsed state uses `max-height: 0; overflow: hidden` which visually hides the content but does **not** hide it from screen readers. Assistive technology will read all answers regardless of collapsed state.

**Fix:** Add `hidden` attribute management in JS, or toggle `aria-hidden`:

```javascript
// In the FAQ accordion JS (line 1689-1691):
other.classList.remove('active');
other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
other.querySelector('.faq-item__answer').setAttribute('hidden', ''); // ADD THIS

// (line 1694-1696):
item.classList.add('active');
btn.setAttribute('aria-expanded', 'true');
item.querySelector('.faq-item__answer').removeAttribute('hidden'); // ADD THIS
```

Then update CSS to override the hidden attribute when active:

```css
.faq-item.active .faq-item__answer {
  display: block; /* override [hidden] */
  max-height: 300px;
}
```

And add `hidden` to all `.faq-item__answer` divs in the HTML.

### 3. Hero visual dots use hardcoded inline colors instead of CSS custom properties

**File:** `index.html`, lines 1262-1272

Every dot uses hardcoded hex values in `style` attributes:
```html
<span class="hero__visual-dot" style="background:#3B82F6; box-shadow:0 0 12px #3B82F6; animation-delay:0s"></span>
```

The design tokens file explicitly defines `--color-agent-anders`, `--color-agent-researcher`, etc. Hardcoded values bypass the token system and will not update if tokens change.

**Fix:** Use CSS custom properties:

```html
<span class="hero__visual-dot" style="background:var(--color-agent-anders); box-shadow:0 0 12px var(--color-agent-anders); animation-delay:0s"></span>
<span class="hero__visual-dot" style="background:var(--color-agent-researcher); box-shadow:0 0 12px var(--color-agent-researcher); animation-delay:0.3s"></span>
```

Repeat for all 11 dots with the correct agent token.

---

## Warnings (should fix)

### 4. Mobile navigation is hidden with no replacement

**File:** `index.html`, lines 435-439

```css
@media (max-width: 640px) {
  .site-nav__links {
    display: none;
  }
}
```

On mobile (below 640px), navigation links are completely removed. There is no hamburger menu, no alternative navigation. Users on mobile cannot navigate between sections from the nav bar.

**Fix:** Add a mobile hamburger toggle or convert to a disclosure pattern. At minimum, provide an accessible mobile menu.

### 5. `section-label` uses `--color-text-faint` for essential navigational context

**File:** `index.html`, line 507

```css
.section-label {
  color: var(--color-text-faint);  /* #6b7280 -- 3.8:1 contrast ratio */
}
```

Per the tokens file contrast notes (line 468), `--color-text-faint` at 3.8:1 only passes for large text. The section labels are set to `--text-xs` (11-12px), which is **not** large text. This fails WCAG AA for normal text.

**Fix:** Use `--color-text-muted` (#9ca3af, 6.5:1) instead:

```css
.section-label {
  color: var(--color-text-muted);
}
```

### 6. `hero__visual-label` uses `--color-text-ghost` which fails WCAG contrast

**File:** `index.html`, line 653

```css
.hero__visual-label {
  color: var(--color-text-ghost);  /* #4b5563 -- 2.4:1 contrast ratio */
}
```

This is a 2.4:1 ratio which fails all WCAG levels. The label text says "3D office visualization -- embed or video placeholder" which is informational.

**Fix:** If decorative/placeholder, add `aria-hidden="true"` to the label span. If it conveys meaning in the shipped version, upgrade to `--color-text-muted`.

### 7. `step-card__visual-label` uses `--color-text-ghost` -- same contrast failure

**File:** `index.html`, line 797

Same issue as finding #6. Labels like "Briefing scene", "Assignment scene" etc. at lines 1316, 1324, 1332, 1340.

**Fix:** Same as #6 -- either mark `aria-hidden="true"` or upgrade color.

### 8. `feature-card__icon` uses a hardcoded font-size instead of a design token

**File:** `index.html`, line 946

```css
.feature-card__icon {
  font-size: 1.5rem;
}
```

All other font sizes use the token scale (`--text-xs` through `--text-hero`). This hardcoded value breaks the convention.

**Fix:** Use `--text-2xl` or the closest token:

```css
.feature-card__icon {
  font-size: var(--text-xl);
}
```

### 9. `max-height: 300px` on FAQ answers can clip long content

**File:** `index.html`, line 1103

```css
.faq-item.active .faq-item__answer {
  max-height: 300px;
}
```

The last FAQ answer about SSE sync is already substantial. If content grows or the viewport is narrow (increasing line wraps), text will be clipped with no scroll or indication.

**Fix:** Use a larger value (e.g., `500px`) or calculate the actual `scrollHeight` in JS and set it dynamically:

```javascript
if (!isActive) {
  item.classList.add('active');
  var answer = item.querySelector('.faq-item__answer');
  answer.style.maxHeight = answer.scrollHeight + 'px';
  btn.setAttribute('aria-expanded', 'true');
}
```

On close, set `answer.style.maxHeight = '0'`.

### 10. `scroll-behavior: smooth` on `<html>` without prefers-reduced-motion override

**File:** `index.html`, line 323

```css
html {
  scroll-behavior: smooth;
}
```

The `prefers-reduced-motion` media query (lines 302-311) zeros out animation durations but does not reset `scroll-behavior` to `auto`. Users who prefer reduced motion will still get smooth scrolling, which can cause nausea/discomfort.

**Fix:** Add to the reduced-motion block:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### 11. Google Fonts loaded as render-blocking resource

**File:** `index.html`, line 37

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

This blocks rendering until the CSS is downloaded. The `display=swap` parameter helps with font display but the stylesheet itself still blocks. For a landing page, this delays First Contentful Paint.

**Fix:** Preload the stylesheet and use the media-swap pattern:

```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" /></noscript>
```

### 12. Missing tokens from the token file that are defined but not included in the page

**File:** `index.html`, `:root` block (lines 147-300) vs. `tokens.css` (full file)

The following tokens from `tokens.css` are missing from the page's `:root`:

- `--color-text-dim` (#374151) -- defined in tokens, omitted from page
- `--space-0`, `--space-px`, `--space-0-5`, `--space-1-5` -- spacing scale gaps
- `--glow-sm`, `--glow-md`, `--glow-lg`, `--glow-xl` -- base glow tokens
- `--glow-card`, `--glow-card-hover` -- card glow tokens
- `--blur-sm`, `--blur-md`, `--blur-lg` -- backdrop blur tokens
- `--gradient-section-fade`, `--gradient-agent-glow` -- gradient tokens
- `--duration-instant`, `--duration-slower` -- animation duration gaps
- `--ease-in`, `--ease-in-out` -- easing curve gaps
- `--motion-scale` -- reduced-motion override variable
- `--radius-2xl` -- missing from radius scale

While not all are currently used, shipping a partial token set means future additions will require revisiting the root block. Include the full set for forward compatibility.

### 13. `color-mix()` CSS function has limited browser support

**File:** `index.html`, lines 849-850

```css
.agent-card:hover {
  border-color: color-mix(in srgb, var(--agent-color) 30%, transparent);
  box-shadow: 0 0 24px color-mix(in srgb, var(--agent-color) 15%, transparent), var(--shadow-lg);
}
```

`color-mix()` is supported in Chrome 111+, Firefox 113+, Safari 16.2+. This excludes older browsers that are still in significant use (Samsung Internet older versions, some WebViews).

**Fix:** Add a fallback before the `color-mix()` line:

```css
.agent-card:hover {
  border-color: var(--color-border-strong); /* fallback */
  border-color: color-mix(in srgb, var(--agent-color) 30%, transparent);
  box-shadow: var(--shadow-lg); /* fallback */
  box-shadow: 0 0 24px color-mix(in srgb, var(--agent-color) 15%, transparent), var(--shadow-lg);
}
```

### 14. JSON-LD uses `--` (double hyphens) instead of em dashes

**File:** `index.html`, lines 47, 66, 104

The JSON-LD text fields contain `--` (ASCII double hyphens) while the visible page copy uses `&mdash;`. Inconsistent and looks unprofessional in search result snippets.

**Fix:** Use actual em dash characters in the JSON-LD strings:

```json
"description": "A 3D virtual office where 11 AI agents research, write, review, debug, and deliver \u2014 visualized in real time..."
```

Or simply use a single hyphen surrounded by spaces for readability in structured data.

---

## Minor (nice to fix)

### 15. Hero visual `<div>` used as decorative image but has `aria-label` instead of `role="img"`

**File:** `index.html`, line 1259

```html
<div class="hero__visual reveal" aria-label="AI agents working in a 3D virtual office built with Babylon.js">
```

A `<div>` with `aria-label` but no explicit `role` means the label may be ignored by some screen readers. The step-card visuals correctly use `role="img"`.

**Fix:** Add `role="img"`:

```html
<div class="hero__visual reveal" role="img" aria-label="AI agents working in a 3D virtual office built with Babylon.js">
```

### 16. `outline-color` on `.btn-primary:focus-visible` uses a token reference, not a color

**File:** `index.html`, line 468-469

```css
.btn-primary:focus-visible {
  outline: 2px solid var(--gradient-cta-hover-from);
}
```

`--gradient-cta-hover-from` is `#60A5FA` which works, but the name suggests it is a gradient endpoint, not a focus color. This is semantically confusing for future maintainers.

**Fix:** Reference the CTA color token directly:

```css
outline: 2px solid var(--color-agent-anders-text);
```

### 17. `gap: 12px` hardcoded in hero visual dots

**File:** `index.html`, line 633

```css
.hero__visual-dots {
  gap: 12px;
}
```

Should use `var(--space-3)` which equals 12px, keeping the token system consistent.

### 18. `max-width: 600px` hardcoded on `.section-subtitle` and `.tech__intro`

**File:** `index.html`, lines 524, 976

```css
.section-subtitle { max-width: 600px; }
.tech__intro { max-width: 600px; }
```

The token system defines `--width-content: 768px`. Either use the token or define a new content width token. The value 600px is a magic number.

### 19. `max-width: 640px` hardcoded on `.hero__sub` and `.faq-item__answer p`

**File:** `index.html`, lines 585, 1111

Same issue as #18. Consider a `--width-narrow` token or using the existing `--width-content`.

### 20. `max-width: 280px` and `width: 14px / height: 14px` hardcoded in hero dot layout

**File:** `index.html`, lines 636, 640-641

Magic numbers without tokens. Not critical for dots but breaks the pattern established everywhere else.

### 21. `width: 40px / height: 40px` hardcoded on `.step-card__number`

**File:** `index.html`, lines 758-759

Should use `var(--space-10)` which equals 40px.

### 22. `width: 12px / height: 12px` hardcoded on `.agent-card__dot`

**File:** `index.html`, lines 861-862

Should use `var(--space-3)` which equals 12px.

### 23. `width: 24px / height: 24px` hardcoded on `.faq-item__icon`

**File:** `index.html`, lines 1082-1083

Should use `var(--space-6)` which equals 24px.

### 24. Nav links list items missing semantic roles for clarity

**File:** `index.html`, lines 1235-1242

The `<ul>` has no list styling reset concerns since CSS resets already handle it, but the `<li>` elements work fine here. No action needed -- mentioning for completeness.

### 25. Tech section has 5 cards on a 3-column grid, leaving an asymmetric last row

**File:** `index.html`, lines 1523-1555

At desktop (1024px+), 5 cards in a 3-column grid gives 3 + 2, with the last two left-aligned. This is not a bug but is visually unbalanced.

**Fix (optional):** Either add a 6th tech card (e.g., "Git-Tracked Memory") or use CSS to center the last row:

```css
.tech__grid {
  justify-items: center;
}
```

---

## Approved (what looks solid)

- **Semantic HTML structure:** Correct use of `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`. Every section uses `aria-labelledby` with matching `id` attributes on headings. This is textbook-quality semantic markup.

- **Skip link:** Present at line 1230, visually hidden until focused, styled with the CTA gradient. Correctly targets `#main`.

- **Heading hierarchy:** Clean H1 > H2 > H3 flow with no skipped levels. Matches the SEO audit's recommended hierarchy exactly.

- **SEO meta tags:** Title, description, canonical, OG, Twitter Card -- all present and well-formed. All three JSON-LD schemas (Organization, SoftwareApplication, FAQPage) are correctly structured.

- **Design token usage:** The `:root` block closely mirrors the token file. The vast majority of styles reference custom properties. Colors, spacing, typography, radii, shadows, gradients, and animation durations all use tokens consistently.

- **IntersectionObserver implementation:** Correct pattern -- observes elements, adds `visible` class, then `unobserve`s to prevent memory leaks. Has a clean fallback for browsers without IntersectionObserver support (line 1659-1661). No memory leak risk.

- **FAQ accordion:** Clean event handling with proper `aria-expanded` toggle. Closes other items when opening a new one (accordion pattern). No memory leaks from the event listeners.

- **`prefers-reduced-motion`:** All animation duration tokens zeroed out. The `pulse-glow` keyframe animation on hero dots will effectively freeze since the tokens zero out. (Exception: smooth scroll, noted as Warning #10.)

- **External links:** All external links (`target="_blank"`) include `rel="noopener noreferrer"`. No security risk from `window.opener` exploitation.

- **Progressive enhancement:** The page is fully readable without JavaScript -- content is in the DOM, only animations and accordion behavior require JS. The IntersectionObserver fallback ensures visibility.

- **CSS architecture:** BEM-style naming convention used consistently. No specificity conflicts. Media queries are well-organized with mobile-first approach on grids.

- **Agent card color system:** Using `--agent-color` as a local custom property set via inline `style` attributes is a clean pattern for per-card theming. Text-safe variants are correctly provided.

- **No XSS vectors:** The inline JavaScript uses no `innerHTML`, no `eval()`, no user input interpolation. All DOM manipulation is class toggling and attribute setting. Safe.

- **Performance (general):** Single inline `<style>` block avoids an extra HTTP request. Scripts at the bottom of `<body>`. No external JS dependencies. Preconnect hints for Google Fonts. DNS prefetch for GitHub.

---

## Summary

| Severity | Count |
|----------|-------|
| Critical | 3 |
| Warning | 11 |
| Minor | 11 |
| **Total** | **25** |

The page is well-built overall. The critical issues are all accessibility-related (FAQ screen reader support). The warnings split between contrast failures, a missing mobile nav, and token consistency. The minor findings are mostly hardcoded magic numbers that should use the token system.

**Recommendation:** Fix the 3 critical issues and warnings #4, #5, #10, and #11 before shipping. The rest can be addressed in a polish pass.

---

*Review prepared by the Code Reviewer agent for the Agentic Agency landing page project.*
