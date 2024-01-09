---
title: "Building a business plan platform"
description: "Earlier this year, I spent a too much time building out a full stack solution for writing a business plan. Here is how I built it."
date: "01/08/2024"
labels: "personal"
---

# Plan Your Business

How do I start a business? How do I know if it will be successful? What resources are there? 

These were a few questions I had when I was hit with my seasonal entrepreneurial bug in February of 2023. I went on a deep-ish dive into answering these questions. Then, I built a platform to write and plan businesses. 

The focus of this post will be the technical design and the tiny attempt I made to get some sign ups.

## The Research

The first resource I found on starting a business was the U.S. Small Business Administration. They have guides ranging from [planning](https://www.sba.gov/business-guide/plan-your-business) to [funding](https://www.sba.gov/business-guide/grow-your-business/get-more-funding) of a small business. It was consistently the best resource that I found for answering questions. 

Another resource which proved to be useful was the business section of the [library of congress](https://guides.loc.gov/small-business-hub). I thought that was surprising, but I have not dabbled with its resources before. The [research guides](https://guides.loc.gov/) provided by the library of congress cover a bunch of different subjects, making it a valuable resource to learn about any topic you are interested in. 

Lastly, in parallel with the small business association is [SCORE](https://www.score.org/). I found a few resources on the site useful, but not nearly as useful as the two resources above. I also find it confusing on why it seems SCORE and SBA are so similar, and rely on each other. 

## Why build a platform?

Even with a pile of information sitting in front of me - starting with a blank word document still felt intimidating (how do I structure, how do I know its a good plan, etc). 

So my software engineering instincts kicked in. "I can build it". Over the years I have gotten better at judging whether or not I should spend hours on a side-project or not, but this felt like a good learning experience (a mix of business with engineering). 

On top of those two motivators, when I looked around the market I did not see any "oh, this is nice" business planning sites/apps (yes, yes - subjective). A few sites I dug up were [LivePlan](https://www.liveplan.com/product-tour), [Aha!](https://www.aha.io/roadmaps/overview), and [BizPlan](https://www.bizplan.com/). I was not blown away by any of those, and I found that the user experience felt less like "helping you write" and more of a combination of a bunch of forms. I wanted to still have the "blank slate" feel - but features that helped you get started with the experience of a traditional text editor. 

## Quick MVP

The platform would consist of the following features: users, text editor for writing plans (markdown), storing plans, ChatGPT integration, checklists, templates, competitor discovery, similar company research via SEC filings, and ability to export to PDF. Initially, I wanted to build something fast. I chose Next JS to bootstrap an API and frontend for the dashboard. I built the initial version over about a week time-period. 

After building it, I was not satisfied with the UI or the technical implementation. I am not a designer, and I didnt realize the complexity of trying to make these features look good next to each other. As for the technical side of things, I had hacked so quickly and passionately that I built in some features that I thought were straying away from the "simple" aspect of what a business planning platform should be (I created a bot profiles). 

I have included some _early_ images of my MVP below (2 iterations on the UI). _Please_ Enjoy.

![Bot William Iteration 1](/william_bot.png)


![Iteration 2](/og.png)

So, at this point I knew I needed to get a designer involved, because... well you can see for yourself. I also hatched a new plan to move off of Next JS. 

## Improving Designs

I brought in one of my fellow colleagues who I had worked with at Zumper, Tela Cheang, to help me improve the design. I contracted her to help me build out a more professional version of the dashboard I had hacked together. Below is the screenshot of the Figma we collaborated in!

![Figma Daily Business Planning](/figma_dbp.png)

Tela nailed the changes and improvements I was looking for and also advised some changes I should make to the UX. Her help was invaluable to helping me get this project done. 

![Example Improvements](/example_improvements.png)
## Frontend Details

Checkout my [intro video to see the frontend implementation](https://www.loom.com/share/e342e5ddc6a34199845284b83b89e00a?sid=89287f5b-ad4f-43df-8e9f-aafc54b3cc30) in the video, yes - its a live demo. 

The frontend philosophy is that of most dashboards, a single page application which does not require server-side rendering. I built it with React and Vite. On top of that, I used TypeScript to ensure a smoother developer experience. My goal was to make it simple enough to deploy from any platform or static hosting platform (ended up going with Netlify for pre-launch).

I am just going to compile a list of packages I used, and assume that you mostly can piece together the architecture: 
- React
- Chakra UI
- react-pdf/renderer
- lexical
- react-hook-form
- react-router-dom
- react-markdown
- react-icons

I also built in the ability to pre-render some of the pages (landing page) - since most of the app is rendered on the client. A key part of my design was to also not utilize local storage for credentials. Instead, I opted to include [credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) on requests that utilized them.  

#### General File Structure - client /src

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

On this project, I really focused on organization. I created documentation for each endpoint as well as integration tests (using [vitest](https://vitest.dev/)). It made creating and remembering endpoints way easier.

On top of that, when switching contexts - I find it nicer that the code exists outside of the frontend source code. 

#### Data Model

For the features, I created multiple tables which mostly all tie back to the notion of a single _plan_. Each plan stores a string which is consumed by the text editor on the frontend. Any edits to the plan via the text editor would automatically be saved to the database (debounced on the FE side). I wanted to separate out the chat and checklist data in order to use separate endpoints and hooks on the frontend, this is cleaner from an API and frontend perspective. 

![Data Model Daily Business Plan](/data_model_business_planning.png)

#### API

The API from a code standpoint is pretty straightforward, the most difficult part of the process was keeping the API simple based on the various features. 

On this project, I wanted to focus on re-learning authentication -- So I did what I do not recommend, rolled my own. Each endpoint is a folder in the src folder, and generally follow the structure below. 

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

I enjoy taking a vision/design to production. I love working through the entire stack to build a system that solves a specific problem(s). Doing this myself allowed me to explore the creative side of my brain and build something that I felt is well documented and organized. 

Would I recommend doing something like this for a real product? Mostly no. If I _really_ wanted to build a successful product - instead of building a platform first I would build a funnel and group of users who would be early adopters. Create the landing page, marketing, and ads _first_. Then decide if the customer's exist before spending energy on the engineering.

I built this almost 6months ago, so I could be forgetting details in this post. But I hope it flexes some technical capability and serves as a word of warning for those hacking after work - pace yourself and find customers!  
