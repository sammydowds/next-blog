---
title: "Building a business plan platform"
description: "Earlier this year, I spent a too much time building out a full stack solution for writing a business plan. Here is how I built it."
date: "01/08/2024"
labels: "personal"
---

# Plan Your Business

In this post, I am going to give details about how I built out a platform to write business plans -- from the database to the frontend.

Check out the [simple landing page here](https://www.planyourbusiness.app/) and watch the video!

## Scope

The app was to have mutliple features: create/update/delete business plans, markdown text editor, AI generated plans, templates, chat with ChatGPT about your plan, plan checklist, and a few features to help you recon the industry of your potential business.

## The Research

The first resource I found on starting a business was the U.S. Small Business Administration. They have guides ranging from [planning](https://www.sba.gov/business-guide/plan-your-business) to [funding](https://www.sba.gov/business-guide/grow-your-business/get-more-funding) of a small business. It was consistently the best resource that I found for answering questions. 

Another resource which proved to be useful was the business section of the [library of congress](https://guides.loc.gov/small-business-hub). The [research guides](https://guides.loc.gov/) provided by the library of congress cover a bunch of different subjects, making it a valuable tool to learn about any topic you are interested in. 

Lastly, in parallel with the small business administration is [SCORE](https://www.score.org/). I found a few pages on the site useful, but not nearly as useful as the SBA or Library of Congress. I also find it confusing that SCORE and SBA are so similar yet rely on each other (partnerships). 

When I looked around the market I did not see any "oh, this is nice" business planning sites/apps (yes, yes - subjective). A few sites I dug up were [LivePlan](https://www.liveplan.com/product-tour), [Aha!](https://www.aha.io/roadmaps/overview), and [BizPlan](https://www.bizplan.com/). I was not blown away by any of those, and I found that the user experience felt less like "helping you write" and more of a combination of a bunch of forms. I wanted to still have the "blank slate" feel - but features that helped you get started with the experience of a traditional text editor. 

## Quick MVP

I jumped right into this project and built an MVP as fast as I possibly could. I utilized Next JS to spin up both the APi and frontend quickly. Below are a few iterations of that MVP's UI. After making it to my second UI iteration, I wanted to bring in a designer to help me transform the UI into something professional.

![Bot William Iteration 1](/william_bot.png)


![Iteration 2](/og.png)

## Improving Designs

I brought in one of my colleagues who I had worked with at Zumper, Tela Cheang, to help me improve the design. I contracted her to help me build out a more professional version of the dashboard I had hacked together. Below is the screenshot of the Figma we collaborated in!

![Figma Daily Business Planning](/figma_dbp.png)

Tela nailed the changes and improvements I was looking for and also advised some changes I should make to the UX. Her help was invaluable to helping me get this project done. 

![Example Improvements](/example_improvements.png)

## Improving the Architecture

Initially I bootstrapped the app with Next JS's ([pages/api directory](https://nextjs.org/docs/pages)). I found three things I did not like about this architecture as my project grew in size:
1. Vercel - it felt like I had minimal control or visibility over the deployment platform (automatic timeouts on lambdas, future costs, etc)
2. Overdesigned - for an app that is _mostly_ rendered client-side, Next JS might not be the right solution (one of its main value propositions is solving SSR for you) 
3. Co-mingling of backend and frontend code - maybe this is old school, but like having the frontend and backend completely isolated

## Frontend Details

The frontend philosophy is that of most dashboards, a single page application which does not require server-side rendering. On my final iteration, I removed the usage of Next JS. I started with a blank slate via the [Vite react-ts template](https://github.com/vitejs/vite/tree/main/packages/create-vite#create-vite-). My goal was to make it simple enough to deploy from any platform or static hosting platform.

The architecture consisted of the following packages: 
- React
- Chakra UI
- react-pdf/renderer
- lexical
- react-hook-form
- react-router-dom
- react-markdown
- react-icons

I also built in the ability to pre-render some of the pages (landing page) - since most of the app is rendered on the client.

#### Frontend File Structure 

I thought it might be nice to show what my folder structure looked like inside the client's source folder. So here you go.

```bash
.
├── api # fetch logic
├── assets
├── components # reusable react components 
├── features # imported into pages
├── hooks # wraps api logic, used in features
├── layouts
├── pages
└── theme
```

## Backend Details

On my final iteration, I isolated the backend code into a new folder within the repo. I utilized Express to build out the final version of the API with a focus on documentation, standardization, and integration tests (via [vitest](https://vitest.dev/)).

#### Data Model

For the features, I created multiple tables which mostly all tie back to the notion of a single _plan_. Each plan stores a string which is consumed by the text editor on the frontend. Any edits to the plan via the text editor would automatically be saved to the database (debounced on the FE side). I chose to store the chat and checklist data separately, since that made it easier to implement unique endpoints and hooks on the frontend. This is cleaner from an API and frontend perspective. 

![Data Model Daily Business Plan](/business_plans_data.png)

#### API

The most difficult part of this project was keeping the API simple to meet the needs of the various features I wanted to implement. Each features was broken into a batch of endpoints. Each endpoint is a folder in the src folder, and generally follows the structure below. 

```bash
auth
├── auth.test.ts # integration tests
├── constants.ts 
├── controller.ts # business logic
├── docs.md
├── middleware
├── routes.ts
└── service.ts # database level integrations
```

Here is part of each endpoints documentation combined into one table. Enjoy.


| Endpoint     | Description | Method |
| ----------- | ----------- | ----------- | 
| /generate/plan | Generate a business plan with a given structure and minimal data. Must be logged in. | POST |
| /chat | Passes the current chat history and new message from the user for chat completion. Must be logged in. | POST |
| /recon/publicCompanies | Requests summary of public companies in same market. Must be logged in. | POST | 
| /recon/similar | Requests a summary of similar companies based on the current business plan. Must be logged in. | POST |
| /signup | Sign user up | POST | 
| /delete | Delete user from the DB, if logged in | POST |
| /profile | Return user, if logged in | GET |
| /login | Request messages for a certain plan | POST |
| /signout | Clears httpOnly jwt cookie  | POST |
| /password/requestReset | Creates a ResetToken in the DB, send email to user with token param and user id param link | POST | 
| /password/reset | Saves the new password created | POST | 
| /password/change | Allows logged in user to update password | POST |
| /chat/:planId | Push a message on to a Chat entity tied to a planId. Must be logged in. | POST | 
| /chat/:planId | Lookup chat and includes messages tied to it. Must be logged in. | GET | 
| /checklist/:planId | Get Checklist for a user. Must be logged in. | GET |
| /checklist/item | Update a single checklist item. Must be logged in. | PUT |
| /checklist/create | Create a new Plan tied to the user. Must be logged in. | POST | 
| /plan/:id | Lookup a plan by id for the user. Must be logged in. | GET |
| /plan/:id | Update a plan by id for the user. Must be logged in. | PUT | 
| /plan/:id | Delete a plan by id for the user. Must be logged in. | DELETE | 
| /plan/all | Get all of the plans belonging to the user. Must be logged in. | GET |
| /filings/:cik | Get filings from SEC api for a particular CIK. Must be logged in. | GET |
| /lookupCik/:ticker | Lookup the CIK via provided Ticker. Must be logged in. | GET |

## Discovery (landing page + users)

So I did what any over-zealous engineer would do - built an entire platform before having any users. #Winning. 

After building it and thinking "wow, its pretty cool." -- I devised a plan to get some feedback. My plan was simple and minimal (I wasnt looking to seriously launch at this point). I would go on reddit, and post about it on a few "entrepreneurial" sub-reddits and try to drive traffic to the landing page. 

On that landing page, I embedded a loom video plus a google form for people to sign up to a waitlist. This resulted in a few sign ups, and a couple of bots asking to connect on Twitter. Maybe I will run an ad campaign on Meta to see what kind of CTR I could get to the landing page and sign-ups. 

![Business Planning](/reddit_daily_business.png)

## Final Thoughts

I enjoy taking a vision/design to production. I love working through the entire stack to build a system that solves a specific problem. This project allowed me to express my creativity, learn more about small businesses, and learn more about my skills and limits. 

For my next project, the first thing I will probably do is build out a funnel to bring in and construct a group of potential customers. Then determine if building a solution will pay off. Every action should provide momentum to an end objective, efficiently. Building out a platform first is a bad idea.  

I built this almost 6 months ago, so I could be forgetting details in this post. But I hope it flexes some technical capability and serves as a word of warning for those hacking after work - pace yourself and find customers!  
