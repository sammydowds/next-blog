import { Card, CardHeader, CardBody, Heading, Text, Box, VStack } from '@chakra-ui/react'
import { Link } from '../Link'

interface ProjectCardProps {
  heading: string
  summary: string
  href: string
}
export const ProjectCard = ({ heading, summary, href }: ProjectCardProps) => {
  return (
    <Card variant="outline" w="100%">
      <CardHeader>
        <Heading size='md'>{heading}</Heading>
      </CardHeader>
      <CardBody>
        <VStack>
          <Text w="100%">{summary}</Text>
          <Box alignSelf="end">
            <Link href={href}>View</Link>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}
