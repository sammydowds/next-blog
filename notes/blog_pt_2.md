---
title: "How I built this blog part 2"
description: "My blog is built with Next JS and wires in Chakra UI + React Syntax Highlighting for code snippets."
date: "12/21/2022"
heroImage: "/christmas_tree.jpeg"
---

![Christmas Tree](/christmas_tree.jpeg)

# How I built this blog part 2

This post will cover how I utilized Next JS to take a folder of Markdown files and transform them into HTML files to be served at the edge.

**TL;DR** this is a **_better_** version of the Next JS [example for a blog](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

### Engineering Tools Used

- [Next JS](https://nextjs.org/docs/advanced-features/static-html-export)
- [gray-matter](https://github.com/jonschlinkert/gray-matter) for reading the markdown files
- [react-markdown](https://github.com/remarkjs/react-markdown) for transforming the markdown to React components
- [react-syntax-highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/)
- [Chakra UI](https://chakra-ui.com/docs/components) for the components (highly recommend if you work in React)

### Setting up Next JS

First, create a next js app:

```bash
npx create-next-app --ts
```

Install the packages mentioned up above:

```bash
yarn add gray-matter react-markdown @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

Then, create a dynamic route for your posts (the slug will be the markdown file name!):

```bash
/pages
  _app.tsx
  index.tsx
  /posts
    [slug].tsx <-- our posts page
```

### Set up the static paths

We need to define the paths we should statically generate via [getStaticPaths](https://nextjs.org/docs/basic-features/data-fetching/get-static-paths).

```js
// in [slug].tsx
export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]); // get the file names of our posts directory!

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

### Set up the props

Now we need to wire up how we are going to pull data from the markdown files themselves for each page. We will utilize [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) to fire that off.

```js
// in [slug].tsx
export async function getStaticProps({ params }: Params) {
  // use gray-matter to pull data from the file and return an object!
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "codeSnippetLanguage",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}
```

So now we have props being passed to our page as:

```
{ post: { title, date, slug, content, codeSnippetLanguage }}
```

### Converting Markdown to HTML

For the example below we will only focus on the content prop. The content is still a string of markdown. We need to convert this markdown to react components. That is where [react-markdown](https://github.com/remarkjs/react-markdown) comes in. We will use it to map how it converts the markdown sections. On top of that, we will specify Chakra UI components the sections will map to!

To make these code snippets look nice, I wired in [react-syntax-highlighter](https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/).

```js
import { Text, Heading, Code } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function Post({ post }: Props) {
  return (
    <ReactMarkdown
      className={style.reactMarkdownContainer}
      components={{
        p(props) {
          return <Text {...props} />;
        },
        h2(props) {
          return <Heading size="lg" mt={6} mb={4} {...props} />;
        },
        code(props) {
          if (post.codeSnippetLanguage) {
            return (
              <Box my={4}>
                <SyntaxHighlighter
                  language={post.codeSnippetLanguage}
                  style={a11yDark}
                >
                  {String(props.children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              </Box>
            );
          } else {
            return <Code {...props} my={4} />;
          }
        },
      }}
    >
      {post.content}
    </ReactMarkdown>
  );
}
```

### Creating a static folder

You can utilize [Next JS's static export functionality](https://nextjs.org/docs/advanced-features/static-html-export) to generate your HTML files. You can read up about it here, but that boils down to the following command:

```bash
next build && next export
```

## Conclusion

This creates a path for developing new posts and iterating locally. However, I will address deploying the blog in a separate post! Thanks for reading and cheers to many more posts!

I cover how I deployed the [static files in part 3](/posts/blog_pt_3.html)!
