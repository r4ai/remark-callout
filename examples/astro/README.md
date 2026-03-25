# remark-callout — Astro Example

This example demonstrates two different approaches to rendering
[`@r4ai/remark-callout`](https://github.com/r4ai/remark-callout) callouts in an
[Astro](https://astro.build) project with MDX.

## Pages

| Route | Description |
|---|---|
| `/` | Home page with links to both examples |
| `/custom-components` | Callouts styled with **custom React components** + Tailwind CSS |
| `/css` | Callouts styled with **plain CSS** (no JavaScript components) |

### Custom Components (`/custom-components`)

Configures `remark-callout` to emit custom HTML element names
(`callout-root`, `callout-title`, `callout-body`), then maps them to React
components via the MDX `components` export.

- Full Tailwind CSS styling with per-type colours and icons from
  `@radix-ui/react-icons`
- Foldable callouts use native `<details>`/`<summary>` elements
- Best choice when you want full React component control

### CSS (`/css`)

Uses the same custom-element output, but renders without any React component
mapping. The custom elements (`callout-root`, `callout-title`, `callout-body`)
are styled entirely with plain CSS in
[`src/styles/callout.css`](./src/styles/callout.css).

- Zero JavaScript for callout rendering
- Per-type theming via CSS custom properties (`--callout-color`)
- Icon via CSS `mask-image`
- Best choice for purely static sites or when you want to avoid a JS runtime

## Getting Started

Install dependencies:

```sh
bun install
```

Start the development server:

```sh
bun dev
```

Build for production:

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

## Project Structure

```
examples/astro/
├── astro.config.ts          # Astro config — remark-callout plugin setup
├── tsconfig.json
├── src/
│   ├── components/
│   │   └── Callout.tsx      # React components for callout-root/-title/-body
│   ├── layouts/
│   │   └── BaseLayout.astro # Shared HTML shell
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── custom-components.mdx  # Custom components example
│   │   └── css.mdx          # CSS-only example
│   └── styles/
│       ├── global.css       # Tailwind CSS base styles
│       └── callout.css      # CSS-only callout styles
└── package.json
```

## How remark-callout Is Configured

In `astro.config.ts`, `remark-callout` is set up to replace the default
`<div>`/`<details>` output with named custom elements so that MDX can map them
to React components:

```ts
// astro.config.ts
remarkCallout,
{
  root: (callout) => ({
    tagName: "callout-root",
    properties: {
      type: callout.type,
      isFoldable: String(callout.isFoldable),
      defaultFolded: callout.defaultFolded != null
        ? String(callout.defaultFolded)
        : undefined,
    },
  }),
  title: (callout) => ({
    tagName: "callout-title",
    properties: { type: callout.type, isFoldable: String(callout.isFoldable) },
  }),
  body: () => ({
    tagName: "callout-body",
    properties: {},
  }),
}
```

### Custom Components approach

Map the custom elements to React components in your `.mdx` file:

```mdx
import { CalloutBody, CalloutRoot, CalloutTitle } from "@/components/Callout"

export const components = {
  "callout-root": CalloutRoot,
  "callout-title": CalloutTitle,
  "callout-body": CalloutBody,
}
```

### CSS approach

Import the CSS file in your `.mdx` file and let the browser render the custom
elements as block-level elements with CSS styling — no React required:

```mdx
import "../styles/callout.css"
```

```css
/* callout.css */
callout-root, callout-title, callout-body { display: block; }

callout-root {
  border-radius: 0.5rem;
  border: 1px solid rgba(var(--callout-color) / 0.25);
  background-color: rgba(var(--callout-color) / 0.08);
  padding: 1rem;
}

callout-root[type="note"]    { --callout-color: 59 130 246; }
callout-root[type="success"] { --callout-color: 34 197 94;  }
callout-root[type="warning"] { --callout-color: 249 115 22; }
/* … */
```
