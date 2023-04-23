import { Heading, Highlight, Text, VStack } from "@chakra-ui/react"
import { Section, SectionProps } from "./Section"

export const Career = (sectionProps: Omit<SectionProps, 'children'>) => {
  return (
    <Section {...sectionProps}>
      <VStack align="start" maxW="400px">
        <Heading>Career</Heading>
        <Text fontSize="20px">
          I currently work as a Fullstack Engineer.
          My path to writing code started in college when we they taught us Computational Methods with Python.
        </Text>
        <Text fontSize="20px">
          <Highlight query={["learn", "build"]} styles={{ px: '1', py: '1', bg: 'yellow.100' }}>
            I love to learn new things and build new things.
          </Highlight>
        </Text>
      </VStack>
    </Section >
  )
}