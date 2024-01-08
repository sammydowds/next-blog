import Head from "next/head";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { SingleColumnLayout } from "@/components/SingleColumnLayout";
import { Inquiry } from "@/components/Inquiry";
import { Projects } from "@/components/Projects";
import { RecommendationsCarousel } from "@/components/RecommendationsCarousel/RecommendationsCarousel";
import { HighlightedPost } from "@/components/HighlightedPost";
export default function Home() {
  return (
    <>
      <Head>
        <title>Sammy Dowds - Hire Me</title>
        <meta name="description" content="Talented full stack engineer." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>"
        />
      </Head>
      <main>
        <SingleColumnLayout>
          <Box>
            <VStack align="start" gap="20px" mb="100px">
              <Heading>Hi, I am Sammy!</Heading>
              <HighlightedPost />
              <Text fontSize="16px">
                I am an experienced full stack engineer working evenly on both
                sides of the stack. Most recently, I worked for{" "}
                <Link color="blue" href="https://www.zumper.com" isExternal>
                  Zumper
                </Link>{" "}
                (real estate startup, ~30 engineers) shipping new features,
                pages, SEO improvements, workers, consumers, tables, and APIs.
              </Text>
              <RecommendationsCarousel />
              <Box pt="30px" alignSelf="center">
                <Inquiry
                  buttonText="Drop me a message"
                  ctaText="Send"
                  modalTitle="Lets get in touch"
                  secondaryCtaText="Close"
                />
              </Box>
            </VStack>
            <Projects />
          </Box>
        </SingleColumnLayout>
      </main>
    </>
  );
}
