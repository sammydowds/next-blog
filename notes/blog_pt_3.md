---
title: "How I built this blog part 3"
description: "The pipeline to my blog is simple. It utilizes Github actions, S3, and CloudFront."
date: "12/22/2022"
codeSnippetLanguage: "yaml"
heroImage: "/ascent.jpeg"
---

![Ladder to Heaven](/ascent.jpeg)

# Utilizing Astro For My Blog

I like to think the image above is a representation of my blog being uploaded to the cloud.

Whenever I push a new markdown file to Github, a new static folder is generated, uploaded to S3, and then eventually deployed to CloudFront.

### Engineering Tools Used

- [Github Actions](https://github.com/features/actions)
- [S3](https://aws.amazon.com/s3/)
- [CloudFront](https://aws.amazon.com/cloudfront/)
- [Route 53](https://aws.amazon.com/route53/) (for my domain name)

### Setting Up S3

The first thing you should do is create an account for AWS, and create a bucket to host your static files. You then need to sit CloudFront in front of that as a CDN.

To do that, [I find this to be the best AWS doc](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-https-requests-s3/).

### Setting up Route 53

If you want to use a custom domain name, you can utilize route 53 to buy up a domain name. This costed me $29!

Then you want to direct traffic to go through your new domain to CloudFront.

The doc I followed to set all of this up [is here](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-cloudfront-distribution.html#routing-to-cloudfront-distribution-config).

### Uploading From Github

I elected to use Github Actions to detect changes in my files for my blog. When there are changes, the github action creates a new build.

This Github action then utilizes the [AWS cli tools](https://aws.amazon.com/cli/) via the [ubuntu-latest Github image](https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2204-Readme.md) and wired up creds via [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) to upload our build to S3, and invalidate our CloudFront distribution.

Here is a sample Github workflow yaml:

```yaml
name: Deploy blog

on:
  workflow_dispatch: # add this if you want to trigger it manually
  push:
    branches: [main]
    paths:
      - apps/blog/pages/**
      - apps/blog/_posts/**

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 17
      - run: npm install --location=global yarn
      - run: cd apps/blog && yarn install --frozen-lockfile
      - run: cd apps/blog && yarn build
      - uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: <your AWS region>
      - run: aws s3 sync apps/blog/out <your S3 bucket>
      - run: aws cloudfront create-invalidation --distribution-id <your CloudFront ID> --paths "/*"
```

## Conclusion

A lot of this tooling was simple to setup due to the extensive documentation on each part of the pipeline. I find the DevEx to be excellent so far!
