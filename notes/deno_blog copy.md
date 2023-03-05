---
title: "Refactoring my blog"
description: "I transitioned my blog off of Next JS to a Deno script. I utilized Deno's new NPM compatability, with React & Chakra UI."
date: "12/29/2022"
heroImage: "/jurassicDeno.jpeg"
---

![Jurassic Deno](/jurassicDeno.jpeg)

# Refactoring my blog

Sometimes I like to do things in a _bare metal_ fashion. I get the itch to avoid abstractions, dive into something new, and make sure I understand things.

I decided to re-build my blog utilizing [Deno](https://deno.land/) as the runtime when programmatically transforming my markdown files to html. Ah, simplicity (kind of).

## Why?

My blog is not intended to be complex. Maybe once I grow traffic I can implement something a little more dynamic, but for now - I just need something simple.

On top of that, I wanted to learn something new.

## Deno

[Deno](https://deno.land/) was built by the same individual who built [Node](https://nodejs.org/en/).

I have been following the project for a year or so, and here is a [good video on context](https://www.youtube.com/watch?v=M3BM9TB-8yA) from Ryan Dahl, which includes the intro to Deno.

## Steps

### Setup Deno

I already had Deno installed locally. So follow [these instructions](https://deno.land/manual@v1.29.1/getting_started/installation) to get it installed! Note: make sure you are using a version compatible with npm!

### Dependencies

I created an [Import Map](https://deno.land/manual@v1.29.1/basics/modules/import_maps) to pull in the dependencies needed for the project. The dependencies will not be installed until we actually run a script that needs them. [Read more about that here](https://deno.land/manual@v1.29.1/node/npm_specifiers).

```json
// imports.json (in the root of the project)
{
  "imports": {
    "react": "npm:react@18",
    "react-dom/server": "npm:react-dom@18/server",
    "@chakra-ui/react": "npm:@chakra-ui/react@1",
    "react-markdown": "npm:react-markdown",
    "react-syntax-highlighter": "npm:react-syntax-highlighter",
    "gray-matter": "npm:gray-matter"
  }
}
```

**_Note_**: for some reason, I have this issue below when attempting to use the latest version of Chakra UI (which is why I downgraded things off of React 18). Leaving this here as a note to my future self.

```bash
error: 'import', and 'export' cannot be used outside of module code at file:///Users/samueldowds/Library/Caches/deno/npm/registry.npmjs.org/framesync/5.3.0/dist/es/index.js:1:1
```

### Create some react pages

I have two folders in the project. One for pages and one for re-usable components.

I have two types of pages (react components) for my blog:

1. index (lists post previews)
2. post (the page your are currently looking at)

For the react components, I mostly used what I already had from my Next JS blog ([this post details the actual components here](https://dowds.digital/posts/blog_pt_2.html)). The only thing I had to do was remove the usage of the Chakra UI Card since we are using an older version of Chakra UI on this iteration.

### Create a build script

We need to loop through each markdown file (post) to read the data, render it, and then write it to an html file.

Pull the data from the markdown file, which will be used as props to our react pages

```js
import matter from "gray-matter";

const getPropsFromFile = async (path: string) => {
  try {
    const fileContent = await Deno.readTextFile(`./posts/${path}`);
    const { data, content } = matter(fileContent);
    return { ...data, content };
  } catch (e) {
    console.log(
      `%cFailed to extract data, ${e.message}`,
      "color: red; padding: 2px"
    );
  }
};
```

Utitlize [ReactDOMServer.renderToString](https://reactjs.org/docs/react-dom-server.html#rendertostring) to pass the props and get an html string

```js
import * as ReactDOMServer from "react-dom/server";
import Post from "../react/pages/post.tsx";

const renderPostToString = async (props: PostProps) => {
  try {
    const htmlString = ReactDOMServer.renderToString(<Post post={props} />);
    return htmlWrapper.replace(entryString, htmlString);
  } catch (e) {
    console.log(`%cFailed to render, ${e.message}`, "color: red; padding: 2px");
    console.log(`%cStack trace:, ${e.stack}`, "padding: 2px");
  }
};
```

Write that to a new html file

```js
const writeFile = async (path: string, htmlString: string) => {
  try {
    Deno.writeTextFileSync(path, htmlString);
  } catch (e) {
    console.log(
      `%c Failed to write ${path}, ${e.message}`,
      "color: red; padding: 2px"
    );
  }
};
```

So piecing it all together might look like

```js
const transformPosts = async () => {
  for await (const filePath of Deno.readDir("./posts")) {
    const postProps = await getPropsFromFile(filePath.name);
    const htmlString = await renderPostToString(postProps);
    const htmlFilePath = `out/posts/${filePath.name.replace(".md", ".html")}`;
    await writeFile(htmlFilePath, htmlString);
  }
};
```

Using similar logic, you can also build an index page to show a list of previews for your posts!

### Running the build script

```bash
deno run --allow-read --allow-write --allow-env --import-map imports.json ./scripts/build.tsx
```

### Update our Github action to run the Deno build script

Now we need Deno to be included in our workflow! We can use [this](https://github.com/denoland/setup-deno)!

```yaml
- uses: denoland/setup-deno@v1
with:
    deno-version: v1.x
- run: cd apps/deno-blog && deno run --allow-read --allow-write --allow-env --import-map imports.json ./scripts/build.tsx
```

Here is what it used to be (for reference):

```yaml
- uses: actions/setup-node@v3
with:
    node-version: 17
- run: npm install --location=global yarn
- run: cd apps/blog && yarn install --frozen-lockfile
- run: cd apps/blog && yarn build
```

### How to find your "node_modules"

Utilize the [deno info](https://deno.land/manual@v1.29.1/tools/dependency_inspector#cache-location) command!

It will show you where everything lives in terms of dependencies. To "reset" your node modules just delete that folder.

### How to iterate (run dev) locally?

Currently, I am just re-running the build script with a simple [Deno file server](https://deno.land/manual@v1.29.1/examples/file_server#overview) setup to serve the build.

I plan on building out an entire local dev workflow to iterate more quickly on a _single_ post. (Perhaps watch the markdown file).

## Conclusion

Overall, not super complicated to setup. Minimal. I like it!

Shoutout to [Samip Poudel](https://twitter.com/samip4sure) for the sick cover image.
