# CSS Architecture Cleanup Guide - Restaurant Standards

## Current State (October 28, 2025)

This document explains the CSS architecture issues in the Restaurant Standards app and provides a roadmap for cleaning them up.

---

## The Problem

**Three CSS files are fighting each other:**

1. **theme.css** - Declares body styles with system fonts
2. **global.css** - Declares body styles with Poppins fonts (OVERRIDES theme.css)
3. **UnifiedHeader.css** - Tries to add padding for fixed header

**Result:** Unpredictable styles, difficult debugging, and conflicts when adding new features.

---

## Current CSS Files

### **theme.css** (`src/styles/theme.css`)
```css
/* Lines 37-42 */
body {
  font-family: system-ui, Avenir, Helvetica, sans-serif;  /* ← Conflict with global.css */
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
}
```

**Problem:** This body declaration conflicts with global.css. Whichever loads last wins.

---

### **global.css** (`src/styles/global.css`)
```css
/* Lines 5-10 */
body {
  margin: 0;
  padding: 60px 0 0 0;  /* ← BAND-AID: Works but affects ALL pages */
  font-family: 'Poppins', sans-serif;  /* ← Conflicts with theme.css */
  background-color: #fafafa;
  color: #1b1b1b;
}
```

**Problem:** 
- Padding of 60px affects EVERY page (including desktop landing page where header is hidden)
- Font declaration conflicts with theme.css
- Any reset to padding: 0 breaks the entire app

---

### **UnifiedHeader.css** (`src/components/UnifiedHeader.css`)
```css
/* Original attempt - didn't work */
body {
  padding-top: 60px;
}
```

**Problem:** global.css loads after this and resets padding to 0 (or now 60px from band-aid fix).

---

## Why Global CSS is Problematic

### **1. Unpredictable Cascade**
- Changes affect pages you didn't intend
- Hard to know what's overriding what
- Requires constant DevTools inspection

### **2. Cannot Delete Safely**
- Afraid to remove anything (might break something)
- File grows forever
- Technical debt accumulates

### **3. Specificity Wars**
- Need increasingly specific selectors
- End up using !important
- Code becomes unmaintainable

### **4. Not Component-Based**
- React is component-based, CSS should be too
- Global styles break component encapsulation
- Cannot reuse components safely

---

## The Correct Architecture

### **What SHOULD Be In Each File**

**theme.css** - Design tokens ONLY
```css
:root {
  --color-primary: #001f3f;
  --color-bg: #fafafa;
  --spacing-md: 1rem;
  --font-primary: 'Poppins', sans-serif;
}

/* NO body declarations */
/* NO component styles */
/* ONLY variables/tokens */
```

**global.css** - Universal resets ONLY
```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;  /* Always 0, let components handle spacing */
  font-family: var(--font-primary);
}

html {
  scroll-behavior: smooth;
}

/* NO page-specific styles */
/* NO padding for specific layouts */
```

**Component CSS** - Page/component-specific styles
```css
/* LandingPage.css */
.landing-hero {
  padding-top: 80px;  /* Only on this page */
}

/* SectionPage.css */
.section-content-wrapper {
  padding-top: 80px;  /* Only on this page */
}
```

---

## The Cleanup Plan

### **Step 1: Consolidate Body Declarations**

**Remove from theme.css:**
```css
/* DELETE LINES 37-42 */
body {
  font-family: system-ui, Avenir, Helvetica, sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
}
```

**Update global.css to:**
```css
body {
  margin: 0;
  padding: 0;  /* Reset to 0 */
  font-family: var(--font-primary);  /* Use CSS variable from theme.css */
  background-color: var(--color-bg);  /* Use CSS variable */
  color: var(--color-text);           /* Use CSS variable */
  line-height: 1.5;
}
```

---

### **Step 2: Move Header Spacing to Component Level**

**Add to UnifiedHeader.css:**
```css
/* ============================================ */
/* PAGE CONTAINER SPACING (Fixed Header Fix)   */
/* ============================================ */

/* Add top padding to pages with fixed header */
.section-page,
.home-container,
.overview-page,
.about-content-wrapper {
  padding-top: 80px; /* 60px header + 20px breathing room */
}

/* Landing page: only on mobile (header visible) */
@media (max-width: 767px) {
  .landing .landing-hero {
    padding-top: 80px;
  }
}

/* Landing page desktop: no padding (header hidden) */
@media (min-width: 768px) {
  .landing.landing-page .landing-hero {
    padding-top: 0;
  }
}
```

---

### **Step 3: Remove Band-Aid from global.css**

**Change:**
```css
/* FROM */
body {
  padding: 60px 0 0 0;
}

/* TO */
body {
  padding: 0;
}
```

---

## Current Band-Aid (Temporary Fix)

**For now, to get the app working:**
- global.css has `padding: 60px 0 0 0` on body
- This works for internal pages
- Creates extra space on desktop landing page (but not breaking)

**This is acceptable short-term but needs proper cleanup.**

---

## Benefits of Proper Cleanup

### **Before (Current State)**
- ❌ Three files declaring body styles
- ❌ Global padding affects all pages
- ❌ Hard to debug spacing issues
- ❌ Changes have unpredictable side effects
- ❌ Cannot safely add new pages

### **After (Clean Architecture)**
- ✅ One source of truth for body styles (global.css)
- ✅ Component-level spacing control
- ✅ Easy to debug (check component CSS only)
- ✅ Predictable behavior
- ✅ Safe to add/remove pages

---

## Testing Checklist (After Cleanup)

Test these pages on mobile AND desktop:

- [ ] **Landing Page** - Header hidden on desktop, visible on mobile
- [ ] **Training Dashboard** - Content not hidden under header
- [ ] **Section Pages** (e.g., Reservation System) - Titles visible
- [ ] **About Page** - Content properly spaced
- [ ] **Overview Pages** - Content not hidden
- [ ] **Resources Pages** - Content visible
- [ ] **Quiz Page** - Content not hidden

---

## Timeline Estimate

- **Review current files:** 10 minutes
- **Make changes:** 20 minutes
- **Test all pages:** 15 minutes
- **Fix any issues:** 10 minutes

**Total: 55 minutes**

---

## Files to Modify

1. `/src/styles/theme.css` - Remove body declaration
2. `/src/styles/global.css` - Consolidate and reset body padding
3. `/src/components/UnifiedHeader.css` - Add component-level spacing

---

## Questions to Answer During Cleanup

1. **Do we need both theme.css AND global.css?** 
   - Could merge into one file
   - Would simplify architecture

2. **Should we use CSS Modules?**
   - Industry standard for React
   - Better component isolation
   - Larger refactor (future consideration)

3. **Do all pages need the same top padding?**
   - Or should each page control its own spacing?
   - Component-level control is more flexible

---

## Related Issues

**This CSS cleanup also relates to:**
- Mobile menu positioning (may need adjustment after cleanup)
- Desktop footer spacing (may be affected)
- Landing page hero section (has its own padding rules)

---

## Key Principle

**"Global CSS should only contain styles that EVERY page needs, ALWAYS."**

If the answer is "most pages" or "some pages" → it belongs in component CSS.

---

## Current Status (DO NOT DEPLOY WITHOUT THIS FIX)

**Band-aid is in place:** global.css has 60px top padding on body

**This works but:**
- Affects desktop landing page (adds extra space)
- Not scalable for future pages
- Violates component architecture principles

**Deploy today with band-aid, fix properly tomorrow.**

---

## Starting Tomorrow's Session

**When you start the CSS cleanup session:**

1. Open this file (CSSOVERLAP.md)
2. Review "The Cleanup Plan" section
3. Make changes to the 3 files listed
4. Test all pages (use checklist above)
5. Deploy when all tests pass

**Estimated time: 1 hour**

---

## Contact Points for Issues

**If cleanup breaks something:**
- Check DevTools → Elements → Computed styles
- Look for conflicting padding/margin values
- Verify which CSS file is winning the specificity war
- Use browser search to find where styles are declared

---

**End of Guide**

*Created: October 28, 2025*  
*Status: Band-aid in place, proper cleanup needed*  
*Priority: High (but after hamburger menu implementation)*