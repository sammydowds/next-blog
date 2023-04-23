import { Fade, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { Section, SectionProps } from "./Section"

interface MilestoneProps {
  year: string
  text: string
  delay: number
}
const Milestone = ({ year, text, delay }: MilestoneProps) => {
  return (
    <Fade delay={delay} in={true}>
      <HStack align="start" fontSize="20px">
        <Text fontWeight="bold">{year}</Text>
        <Text>{text}</Text>
      </HStack>
    </Fade>
  )
}

export const Background = (sectionProps: Omit<SectionProps, 'children'>) => {
  return (
    <Section {...sectionProps}>
      <VStack align="start">
        <Heading>Background</Heading>
        <Milestone
          year="1993"
          text="Born - Edmond, OK"
          delay={3}
        />
        <Milestone
          year="2003"
          text="Placed 4th in 3rd grade track & field"
          delay={4}
        />
        <Milestone
          year="2004"
          text="Started playing video games"
          delay={5}
        />
        <Milestone
          year="2010"
          text="Continued playing video games"
          delay={6}
        />
        <Milestone
          year="2011"
          text="Double knee surgery, ending potential NBA career"
          delay={7}
        />
        <Milestone
          year="2012"
          text="Graduated high school"
          delay={8}
        />
        <Milestone
          year="2016"
          text="B.Sc Mechanical Engineering"
          delay={9}
        />
        <Milestone
          year="2016"
          text="Lead Mechanical Engineer @ Michelin"
          delay={10}
        />
        <Milestone
          year="2018"
          text="Project Manager @ Acieta"
          delay={11}
        />
        <Milestone
          year="2020"
          text="Fullstack Engineer @ Zumper"
          delay={12}
        />
      </VStack>
    </Section>
  )
}