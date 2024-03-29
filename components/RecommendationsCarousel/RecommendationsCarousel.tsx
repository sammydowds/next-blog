import { Box, Flex, Text } from "@chakra-ui/react";
import {
  SimpleAutoCarousel,
  SIMPLE_AUTO_CAROUSEL_SLIDE_CLASSNAME,
} from "../Carousels/SimpleAutoCarousel";
import { GithubLinkButton } from "../GithubLinkButton";

const recommendations = [
  {
    content:
      "He quickly became one of our top fullstack engineers, by constantly proving his excellent vision as an engineer and his kindness.",
    who: "Hugo Pineda",
    position: "Staff Frontend Engineer - Zumper",
  },
  {
    content:
      "His execution and attention to detail makes collaborating with him very seamless and easy.",
    who: "Tela Cheang",
    position: "Designer - Zumper",
  },
  {
    content:
      "I am writing to highly recommend Sammy, who has been an exceptional full stack developer during their tenure at Zumper.",
    who: "Tetsuji Ono",
    position: "Staff Backend Engineer - Zumper",
  },
  {
    content: "Sammy's technical breadth is truly impressive...",
    who: "Max Del Guidice",
    position: "Senior Backend Engineer - Zumper",
  },
  {
    content:
      "Sammy has been a very valued employee here at Acieta. His positive energy and great work efficiency will be missed.",
    who: "Robert Komljenovic",
    position: "CEO at Acieta",
  },
  {
    content:
      "I highly recommend Sammy to any new employer. His drive, learning ability and his interpersonal skills will make him a valuable team member.",
    who: "Dhumketu Patel",
    position: "Solutions Engineer at Michelin",
  },
];

interface RecommendationSlideProps {
  content: string;
  who: string;
  position: string;
}
const RecommendationSlide = ({
  content,
  who,
  position,
}: RecommendationSlideProps) => {
  return (
    <Flex
      px="10px"
      direction="column"
      justify="center"
      className={SIMPLE_AUTO_CAROUSEL_SLIDE_CLASSNAME}
      align="center"
      textAlign="center"
    >
      <GithubLinkButton href="https://www.linkedin.com/in/sammydowds/details/recommendations/?detailScreenTabIndex=0">
        <Text fontSize="14px" fontWeight="bold">
          {'"' + content + '"'}
        </Text>
      </GithubLinkButton>

      <Box>
        <Text fontSize="12px" mt="24px">
          {who}
        </Text>
        <Text fontSize="10px">{position}</Text>
      </Box>
    </Flex>
  );
};

export const RecommendationsCarousel = () => {
  return (
    <SimpleAutoCarousel rtl={false} duration={3000}>
      {recommendations.map((r) => {
        return <RecommendationSlide key={r.who} {...r} />;
      })}
    </SimpleAutoCarousel>
  );
};
