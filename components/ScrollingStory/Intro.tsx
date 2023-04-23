import { Heading, Text } from "@chakra-ui/react"
import { Section, SectionProps } from "./Section"

export const Intro = (sectionProps: Omit<SectionProps, 'children'>) => {
  return (
    <Section {...sectionProps}>
      <Heading>Hello, my name is Sammy.</Heading>
      <Text>I like to build things on the web and solve problems.</Text>
    </Section>
  )
}