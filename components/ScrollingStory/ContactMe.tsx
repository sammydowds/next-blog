import { Heading, VStack } from "@chakra-ui/react"
import { Inquiry } from "../Inquiry"
import { Section, SectionProps } from "./Section"

export const ContactMe = (sectionProps: Omit<SectionProps, 'children'>) => {
  return (
    <Section {...sectionProps}>
      <VStack align="start" maxW="400px" gap="40px">
        <Heading>I would love to hear from you</Heading>
        <Inquiry modalTitle="Contact Me" buttonText="Reach out" ctaText="Send" secondaryCtaText="Close" />
      </VStack>
    </Section>
  )
}