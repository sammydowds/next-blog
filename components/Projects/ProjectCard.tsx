import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  VStack,
  CardFooter,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ProjectCardProps {
  heading: string;
  summary: string;
  date: string;
  pieces: ReactNode[];
}
export const ProjectCard = ({
  heading,
  summary,
  pieces,
  date,
}: ProjectCardProps) => {
  return (
    <Card w={{ small: "225px", large: "225px" }}>
      <CardHeader>
        <Flex w="100%" justify="space-between">
          <Heading size="sm">{heading}</Heading>
          <Text whiteSpace="nowrap" fontSize="8px">
            {date}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody py="5px">
        <VStack>
          <Text fontSize="12px" w="100%">
            {summary}
          </Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <Flex direction="column" gap="2px" w="100%">
          <Flex w="100%" gap="3px" justifyContent="end">
            {pieces.map((piece) => {
              return piece;
            })}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};
