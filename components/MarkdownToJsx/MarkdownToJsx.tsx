import Markdown from "markdown-to-jsx";
import { Code } from "../Code";
import { Heading, Text, Link, Img } from '@chakra-ui/react'

const config = {
  overrides: {
    h1: {
      component: Heading,
      props: {
        as: "h1",
      },
    },
    h2: {
      component: Heading,
      props: {
        as: "h2",
      },
    },
    h3: {
      component: Heading,
      props: {
        as: "h3",
        margin: "20px 0px",
        fontSize: "24px"
      },
    },
    h4: {
      component: Heading,
      props: {
        as: "h4",
      },
    },
    p: {
      component: Text,
      props: {
        css: { margin: "20px 0px" },
      },
    },
    div: {
      component: Text,
      css: { margin: "20px 0px" },
    },
    code: {
      component: Code,
    },
    a: Link,
    img: {
      component: Img,
      props: {
        width: "100%",
        height: "300px",
        borderRadius: "5px",
        objectFit: "cover"
      }
    },
  },
};

export const MarkdownToJsx = ({ content }: { content: string }) => {
  return <Markdown options={config}>{content}</Markdown>;
};