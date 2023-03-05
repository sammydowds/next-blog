---
title: "Utilizing Astro for My Blog 🚀"
description: "After searching around for solutions to minimizing JS shipped to the client, I found Astro. It is awesome."
date: "01/16/2023"
labels: "frontend"
---

![Astro Image](/astro.png)

# Utilizing Astro For My Blog

Well here we are again. Refactoring my blog for a third time. I like it, Picasso 🎨. It took about 2 hours, and another 30 mins to #shipit. After that it was another 12 hours of tweaking 😂. Also, the image above was created by AI ([DALL·E 2](https://openai.com/dall-e-2/)).

## What is Astro and what problem does it solve?

**Definition:** [Astro](https://docs.astro.build/en/getting-started/) is a web framework that is hyperfocused on performance.

When I first built my blog in Next JS, even using the static output option still embedded JS into my HTML output. To move away from that, I built my own static site generator using [Deno](https://deno.land/) in order to _only_ output HTML (and to play around with Deno).

It seems that Astro could be the perfect solution to go from bare HTML to slightly interactive. Astro introduces the concept of [Islands](https://docs.astro.build/en/concepts/islands/). No longer ship the entire page's JS, but rather just the JS specific to the components.

**Additional Reading 📚** [MPA vs SPA](https://docs.astro.build/en/concepts/mpa-vs-spa/#are-mpas-better-than-spas)

## Init an Astro Blog Template

Astro has great support for a Markdown [blog template](https://github.com/withastro/astro/tree/latest/examples/blog?on=github). ❤️

```bash
npm create astro@latest -- --template blog
```

## Enabling React

Following [this guide](https://docs.astro.build/en/guides/integrations-guide/react/), my first priority was to integrate react components.

```js
yarn astro add react
```

This installs all the dependencies, and updates the Astro config to:

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://dowds.digital",
  integrations: [mdx(), sitemap(), react()],
});
```

## Chakra UI Worked Out of the Box (Almost)

Chakra UI works out of the box with Astro, with the exception of [HMR](https://docs.astro.build/en/reference/cli-reference/#astro-dev) (which slows down development).

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

HMR seemed broken due to css identifiers not being updated properly when making changes to files being watched (then all of the Chakra styles would break).

## Summary of Next Steps

After getting React and Chakra setup, I copied over my React components, markdown files, and images.

I then updated the **index.astro** component to render my React components and utilized [Astro.glob](https://docs.astro.build/en/guides/imports/#astroglob) to pull in files for the _posts_ props fed into react components.

## Conclusion

Astro is going to give me the freedom to play with differing levels of JS being shipped to the browser. I am excited to scope out the Islands feature, tweak the [Markdown settings](https://docs.astro.build/en/guides/markdown-content/), and maybe even [mix frameworks](https://docs.astro.build/en/core-concepts/framework-components/#mixing-frameworks).
