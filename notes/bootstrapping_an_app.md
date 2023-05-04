---
title: "Bootstrapping an app, fast"
description: "Here is what I do to bootstrap an app quickly."
date: "05/04/2023"
labels: "personal"
---

![CodeAI](/code_ai.png)

# Bootstrapping an App 

I like going 0-1 on ideas. Having the inkling of an app idea and then converting that to a real world thing is fun for me. It allows me to express creativity, explore curiosity in my tech stack, and put something out that solves a problem for me (and hopefully others). 

This is not a comprehensive post, but covers some basics. 

## Ideation

If you have a hard time coming up with ideas (because you lack originality, like myself) - then [check in daily to my side-project](https://www.dailybusinessplan.app/). Other than that you could use ChatGPT directly or focus on solving a problem you have and working with AI to scale out a plan. 

Generally, you should also do some of the more "business" minded things and check whether or not others even need your solution before spending time building it. 

For instance, you could build a compelling landing page with a "sign up" form to gauge interest.

For myself, I compromise the business analysis due to the fact that I build to let my creativity run free.

Tool: 
- [Daily Business Plans](https://www.dailybusinessplan.app/)

## Planning

I think its important to write down a brief summary of the technical solution you will be using before you start coding. Also, clearly define your data. 

Tool: 
- [Notion](https://www.notion.so/)

## Design

I use Figma if I want to quickly build layouts to use in my apps. However, most of the time I jump right to coding as I will get trapped in Figma making too may tweaks for hours. I find coding and iterating more satisfying. 

For illustrations, I cant recommend [undraw.co](https://undraw.co/illustrations) enough. 

Tools: 
- [Figma](https://www.figma.com/)
- [Undraw](https://undraw.co/illustrations)


## Technical Stack

React. Why React? Because it has been widely adopted and is also relevant to career experience. The community is great. 

Currently, the best developer experience on the market is Next JS. However, it does suffer from the risk of vendor lock.

Lately I have had a strong preference for AWS Lambda for CRON jobs and S3 for cloud storage. In terms of the DB - I do not have a preference yet. I really liked Prisma the last time I used it (for your ORM).  

If I am ok with vendor lock: 
- Next JS
- Chakra UI
- Vercel (Deployment)
- S3
- DB (no preference yet...)
- Prisma

If I want an alternative, and SSR is not as important: 
- Vite
- Chakra UI
- Cloudfront
- S3
- DB (no preference yet...)
- Prisma

If I build out an isolated API (from Next JS): 
- Express
- Django
- Lambda (I also prefer to write CRON jobs with it)

Tools: 
- [Next JS](https://vercel.com/solutions/nextjs)
- [AWS](https://aws.amazon.com/)
- [Chakra UI](https://chakra-ui.com/)
- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/)
- [Django](https://www.djangoproject.com/)
- [AWS Lambda](https://aws.amazon.com/lambda/)

## General workflow

1. Create the repo (Github)
2. I always setup backend/data first (Lambdas, APIs, S3, etc)
3. Setup the FE (Next JS)
4. Build out the main page(s) that provide utility to users
5. Build out the landing page(s)
6. Test locally
7. Buy domain (you can do this via Vercel now) 
8. Test in prod
9. Make a post about it

## SEO for app

Find some keywords, and then use ChatGPT to generate some landing page content based on your features and keywords. 

1. Landing page, with keywords found via Google Keyword Planner
2. Sitemap 
3. ChatGPT

Tools: 
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/)
- [Next Sitemap](https://github.com/iamvishnusankar/next-sitemap)
- [ChatGPT](https://chat.openai.com/auth/login)

## Conclusion

I use React because it has won. I use Next JS because it offers the fastest plan --> prod path. I use Chakra UI because it takes most of the menial CSS/design structure questions out of the workflow (it is great). Undraw to find illustrations and make things look legit. 

If your data structures/sourcing is simple, I think this stack makes it possible to launch a good looking app quickly. 