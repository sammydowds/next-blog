import { Heading, SimpleGrid, Tag, VStack, Text, Tooltip, Mark } from "@chakra-ui/react"
import { ProjectCard } from "./ProjectCard"
import { FaAws } from "react-icons/fa";
import { SiTypescript, SiMarkdown, SiVite, SiVercel, SiNextdotjs } from "react-icons/si";
import { TbBrandPython } from "react-icons/tb";
import { FaNode } from "react-icons/fa";
import { ReactNode } from "react";

interface IconProps {
  label: string
  icon: ReactNode
}
const Icon = ({ label, icon }: IconProps) => {
  return (
    <Tooltip label={label} hasArrow>
      <span>
        {icon}
      </span>
    </Tooltip>
  )
}

const PythonTag = () => {
  return (
    <Icon label="Python" icon={<TbBrandPython color="gray" />} />
  )
}

const TypeScriptTag = () => {
  return (
    <Icon label="TypeScript" icon={<SiTypescript color="gray" />} />
  )
}

const VercelTag = () => {
  return (
    <Icon label="Vercel" icon={<SiVercel color="gray" />} />
  )
}

const ViteTag = () => {
  return (
    <Icon label="Vite" icon={<SiVite color="gray" />} />
  )
}

const MarkdownTag = () => {
  return (
    <Icon label="Markdown" icon={<SiMarkdown color="gray" />} />
  )
}

const AwsTag = () => {
  return (
    <Icon label="AWS" icon={<FaAws color="gray" />} />
  )
}

const NodeTag = () => {
  return (
    <Icon label="Node" icon={<FaNode color="gray" />} />
  )
}

const NextJsTag = () => {
  return (
    <Icon label="Next JS" icon={<SiNextdotjs color="gray" />} />
  )
}


export const Projects = () => {
  return (
    <VStack my="40px" gap="20px">
      <Heading alignSelf="start">Recent Projects</Heading>
      <SimpleGrid w="100%" spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <ProjectCard
          heading="SEC Scraping"
          summary="I built a platform to scrape SEC data and visualize it using Next JS."
          pieces={[<NextJsTag />, <TypeScriptTag />, <PythonTag />]}
          date="08/20/23"
        />
        <ProjectCard
          heading="Business Plans"
          summary="I created a platform to write business plans! Create, edit, update business plans with the help of AI."
          pieces={[<VercelTag />, <TypeScriptTag />, <ViteTag />, <NodeTag />, <MarkdownTag />]}
          date="07/20/23"
        />
        <ProjectCard
          heading="Generated Business Plans"
          summary="An app which generates a business plan daily via ChatGPT. I hope it inspires new small businesses."
          pieces={[<AwsTag />, <NextJsTag />, <TypeScriptTag />]}
          date="04/12/23"
        />
        <ProjectCard
          heading="This Blog!"
          summary="I built this blog to help others, challenge myself, and iterate on feature ideas."
          pieces={[<NextJsTag />, <TypeScriptTag />, <MarkdownTag />]}
          date="01/20/23"
        />
      </SimpleGrid>

    </VStack>
  )
}
