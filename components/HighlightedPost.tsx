import { Card, CardBody, Flex, Link } from '@chakra-ui/react'
import { IoIosStar } from "react-icons/io";

export const HighlightedPost = () => {
  return(
    <Card w="100%" >
      <CardBody p="10px">
        <Flex alignItems="center" fontSize={{ lg: "14px", base: "12px"}} w="100%" justifyContent="space-between">
          <Flex alignItems="center" gap="5px">
          <IoIosStar color="gold" size="24px" />
            Check out one of my best blog posts
          </Flex>
          <Link mr="10px" isExternal href="https://www.sd3.dev/notes/business_planning" color="blue" textDecoration="underline">Read</Link>
        </Flex>
      </CardBody>
    </Card>
  )
}
