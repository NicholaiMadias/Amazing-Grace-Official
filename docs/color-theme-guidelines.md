# Color Theme Guidelines

## Issue: Black Text on Dark Background

This document addresses the reported issue of "black text with a dark background" and provides guidelines for maintaining proper color contrast across the site.

## ❌ INCORRECT: Invalid CSS Color Values

**DO NOT** use invalid color values like this:

```css
/* WRONG - This is invalid CSS */
:root {
  --bg: NicholaiMadias/AmazingGrace#0;  /* ❌ Invalid - This is not a color! */
  --text: #ffffff;
  color: NicholaiMadias/AmazingGrace#0; /* ❌ Invalid - Will cause unpredictable behavior */
}
```

### Why This is Wrong:

1. **`NicholaiMadias/AmazingGrace#0`** is a GitHub repository reference, NOT a CSS color value
2. `#0` alone is not a valid hex color (should be `#000`, `#000000`, etc.)
3. Invalid CSS values cause browsers to ignore the property or use default values
4. This can result in black text on dark backgrounds (unreadable)

## ✅ CORRECT: Valid Color Schemes

The site uses **dark themes** with **light text**. Here are the correct patterns:

### Example 1: Main Homepage
```css
:root {
  --bg: #020617;          /* Dark blue-gray background */
  --text: #e2e8f0;        /* Light gray text */
  --accent: #38bdf8;      /* Sky blue accent */
}

body {
  background: var(--bg);
  color: var(--text);
}
```

### Example 2: Arcade Page
```css
:root {
  --bg: #0f172a;          /* Dark slate background */
  --text: #e2e8f0;        /* Light gray text */
  --accent: #7effd8;      /* Cyan accent */
}
```

### Example 3: Ministry Page
```css
:root {
  --bg: #0d0115;          /* Deep purple-black */
  --text: #f0e6ff;        /* Light lavender text */
  --gold: #ffd700;        /* Gold accent */
}
```

## Color Contrast Rules

### 1. Dark Backgrounds Must Use Light Text

- **Dark backgrounds**: Colors starting with `#0`, `#1`, or `#2` (e.g., `#020617`, `#0f172a`)
- **Light text**: Colors starting with `#c`, `#d`, `#e`, or `#f` (e.g., `#e2e8f0`, `#f0e6ff`)

### 2. Valid Hex Color Format

- **3-digit**: `#000`, `#fff`, `#f00` (shorthand)
- **6-digit**: `#000000`, `#ffffff`, `#ff0000` (full)
- **8-digit**: `#000000ff`, `#ffffffff` (with alpha)
- **RGB/RGBA**: `rgb(0, 0, 0)`, `rgba(0, 0, 0, 0.5)`

### 3. Never Use:

- Repository references: `NicholaiMadias/AmazingGrace#anything`
- Incomplete hex values: just `#0` (use `#000` or `#000000`)
- Non-color strings as color values

## Validation

An automated test (`tests/color-contrast.test.ts`) ensures:

1. ✅ No invalid color patterns (like repo references)
2. ✅ No black text (`#000`, `#000000`) used with `--text` variable
3. ✅ All dark background pages have proper light text colors
4. ✅ Main pages maintain proper contrast

Run the test with:
```bash
npm test -- tests/color-contrast.test.ts
```

## Current Site Color Schemes

All pages currently use **correct** color values:

- **Home**: Dark slate (#020617) with light text (#e2e8f0)
- **Arcade**: Dark blue (#0f172a) with light text (#e2e8f0)
- **Ministry**: Deep purple (#0d0115) with lavender text (#f0e6ff)
- **Stories**: Dark slate with light text
- **Support**: Light theme (#f3f4f6 bg with #333 text) - intentional for readability

## Fixing Color Issues

If you encounter black text on dark backgrounds:

1. **Check CSS variables**: Ensure `--text` uses light colors (not `#000`)
2. **Validate color format**: Use proper hex codes, not invalid strings
3. **Run tests**: `npm test` to catch issues automatically
4. **Use browser DevTools**: Inspect computed styles to see actual colors applied

## Reference: All CSS Color Keywords to Avoid on Dark Backgrounds

Avoid these CSS color keywords on dark backgrounds:
- `black`
- `darkblue`, `darkred`, `darkgreen` (too dark)
- `navy`, `maroon`, `indigo` (too dark)

Prefer these for dark backgrounds:
- `white`, `snow`, `ivory`
- `lightgray`, `silver`, `gainsboro`
- `cyan`, `lime`, `yellow`, `gold`
- Bright hex colors: `#fff`, `#eee`, `#ddd`, `#ccc`
