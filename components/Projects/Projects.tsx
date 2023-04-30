import { Heading, VStack } from "@chakra-ui/react"
import { ProjectCard } from "./ProjectCard"

export const Projects = () => {
  return (
    <VStack my="40px" gap="20px">
      <Heading alignSelf="start">Recent Projects</Heading>
      <ProjectCard
        heading="ChatGPT Daily Business Plan"
        summary="An app which generates a business plan daily via ChatGPT. I hope it inspires new small businesses. Stack: AWS Lambda, S3, Next JS"
        href="https://www.dailybusinessplan.app/"
      />
      <ProjectCard
        heading="This Blog!"
        summary="I built this blog to help others, challenge myself, and iterate on feature ideas."
        href="https://www.sd3.dev/"
      />
    </VStack>
  )
}