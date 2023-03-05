---
title: "Recap of my January 2023"
description: "Dry January, refactoring this blog, and running 20 miles."
date: "02/05/2023"
heroImage: "/chicago_1900.png"
labels: "frontend,advice,opinion"
---

![AI Generated Chicago in 1900](/chicago_1900.png)

# Recap of my January 2023

## Summary

- Dry January... yep I was sober the whole time
- Rebuilt this blog ~3 times
- Built a mini design system with Radix UI
- Published my first npm package
- Ran 20 miles

## Engineering

Lets jump into the engineering I did.

### Rebuilt my blog ~3 times

I went on the hunt to find some new tech to build a blog with. Overall, it currently lives as a client-side rendered Vite app. I settled on this after learning a few things.

1. Using Deno was cool, but not sustainable (it just started supporting NPM packages - so there were a lot of little bugs in simple things)
2. Using Astro seemed cool at first, but the fact that I was writing both "astro" and react components felt wonky - plus HMR was broken
3. Vite out of the box offered the best Dev X because it is well documented and supported, and I find the vite config to be straight forward

Eventually, I will build out SSR for the blog - but for now I am focusing on making the blog _delightful_ and a great dev experience to build on.

### Built a mini design system with Radix UI

I was inspired by how easy it was to wire up [stitches](https://stitches.dev/), [radix colors](https://www.radix-ui.com/colors), and [radix primitives](https://www.radix-ui.com/docs/primitives/overview/introduction). The radix colors docs gave me insight in how to work with colors (seriously, check out the docs). I learned about Radix from following [@shacdn](https://twitter.com/shadcn/status/1617916719242293248) on twitter.

I spent some time researching how others are building out their design systems. I came across multiple tools/libraries:

For Styling:

1. [Styled Components](https://styled-components.com/)
2. [Tailwind CSS](https://tailwindcss.com/)
3. [Emotion](https://emotion.sh/docs/introduction)

For Components:

1. [Chakra UI](https://chakra-ui.com/)
2. [Radix Primitives](https://www.radix-ui.com/) (this has a lot more adoption than I thought)
3. [MUI](https://mui.com/) (Material UI)
4. [Ant](https://ant.design/)
5. [Headless UI](https://headlessui.com/)
6. [Mantime](https://mantine.dev/)

I wish Stitches would have taken off more. But it looks like [Paul Duerte](https://github.com/peduarte) has maybe moved on, and the [repo](https://github.com/stitchesjs/stitches) is pretty stale.

I have been on the **CSS-in-js** train. So my recommendation, if you want to build your own components, would be to use [styled-components](https://styled-components.com/) with [Radix Primitives](https://www.radix-ui.com/) (offers greatest customization).

However, if you want to move a little quicker - you could build out a custom theme object and extend the theme of Chakra UI. (**Probably the best option**).

But some final _do for sure_ recommendations:

1. Use Storybook to iterate your component designs
2. Read the [Radix Color Docs](https://www.radix-ui.com/colors) for inspiration on colors (its great)

### Publishing my first package

Over the weekend, I isolated my components from my blog into a package with Storybook and [published them to npm](https://www.npmjs.com/package/@dowds-dev/blog-radix).

Eventually I want publish variants of my design system, so I can pull them into new apps and iterate quicker (all while trying the latest tech).

Publishing a package was pretty simple, just follow [these docs](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages).

One other things I did was set up Vite in "library" mode.

My config looked something like this, where all of the components I wanted to publish were exported in **src/index.js**:

```ts
// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.js"),
      name: "Blog Radix Components",
      // the proper extensions will be added
      fileName: "blog-radix",
      formats: ["es"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "react",
        "@stitches/react",
        "prism-react-renderer",
        "react-icons",
        "@radix-ui/react-collapsible",
        "@radix-ui/react-avatar",
        "@radix-ui/colors",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {},
      },
    },
  },
});
```

# Conclusion

It was a super productive January. Looking forward to mainting momentum throughout the year.
