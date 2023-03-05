---
title: "How I built my blog part 1"
description: "I wanted to build a blog from scratch, and here is how I did it for $29."
date: "12/19/2022"
heroImage: "/christmas_gingy.jpeg"
labels: "frontend"
---

![Christmas Cookie](/christmas_gingy.jpeg)

# How I built my blog part 1

I am going to breakdown the _why_ and _how_ of this blog! I also include some links to tech that I reference for those who are not familiar.

### High-level View

#### Why build a blog?

Lately, I have been writing notes in [markdown files](https://en.wikipedia.org/wiki/Markdown#:~:text=Markdown%20is%20widely%20used%20in,documentation%20pages%2C%20and%20readme%20files.) for my side-projects and I thought it would be nice if I could make them public.

On top of that, I think it would be great to expand my digital footprint and potentially help others!

#### Usability

I wanted to be able to write markdown files, and as soon as I pushed them to [Github](https://github.com/) (to store them) - I wanted them to automatically deploy across the world ([aka at the edge](https://www.cloudflare.com/learning/cdn/glossary/edge-server/)).

### The Plan

#### Translating Markdown to HTML

I knew I wanted to utilize some sort of static build tool which could translate **markdown** to **HTML**.

Initially, I thought I would utilize [Deno](https://deno.land/) and its most recent release ([npm compatability](https://deno.land/manual@v1.29.1/node#interoperating-with-nodejs-and-npm)). However, I got antsy and discovered an [example with Next JS](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) that was similar to what I wanted to do (ugh, [node modules](https://i.redd.it/tfugj4n3l6ez.png) tho).

#### Deploying HTML files automatically

After settling on [Next JS](https://nextjs.org/), I now needed to design a pipeline to get the static output from Next JS to be served on the internet.

Lately, I have been working more with AWS on side projects. I decided that I would create an [S3 bucket](https://aws.amazon.com/s3/) to upload my static output to, and then utilize [CloudFront](https://aws.amazon.com/cloudfront/) to serve the contents of that bucket.

#### The Pipeline

Write a Markdown file **_then_** Next JS converts it to HTML **_then_** Github action pushes to S3 **_then_** CloudFront re-deploys with new bucket contents

## Conclusion

Overall, I found this to be relatively simple to build because most of these tools are plug and play. All in all, I spent $29.50 for the domain name + AWS services.

I discuss how to build the frontend with [Next JS in part 2](/posts/blog_pt_2.html), and then I discuss the [deployment in part 3](/posts/blog_pt_3.html). Check them out!
