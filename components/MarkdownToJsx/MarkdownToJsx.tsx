import Markdown from "markdown-to-jsx";
import { Code } from "../Code";
import { Heading, Text, Img, OrderedList, ListItem, UnorderedList } from '@chakra-ui/react'
import { Link } from '@/components/Link'

const config = {
  overrides: {
    h1: {
      component: Heading,
      props: {
        as: "h1",
        margin: "32px 0px"
      },
    },
    h2: {
      component: Heading,
      props: {
        as: "h2",
        margin: "24px 0px",
        fontSize: "28px"
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
    ol: OrderedList,
    li: {
      component: ListItem,
      props: {
        marginLeft: "10px"
      },
    },
    ul: UnorderedList
  },
};

export const MarkdownToJsx = ({ content }: { content: string }) => {
  return <Markdown options={config} style={{ marginBottom: "75px" }}>{content}</Markdown>;
};