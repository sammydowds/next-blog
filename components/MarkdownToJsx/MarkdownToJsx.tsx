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
        fontSize: "24px",
        margin: "30px 0px 18px 0px"
      },
    },
    h2: {
      component: Heading,
      props: {
        as: "h2",
        fontSize: "20px",
        margin: "25px 0px 14px 0px"
      },
    },
    h3: {
      component: Heading,
      props: {
        as: "h3",
        fontSize: "16px",
        margin: "20px 0px 12px 0px"
      },
    },
    h4: {
      component: Heading,
      props: {
        as: "h4",
        fontSize: "16px",
        margin: "18px 0px 10px 0px"
      },
    },
    p: {
      component: Text,
      props: {
        fontSize: "16px",
        margin: "4px 0px 16px 0px"
      }
    },
    div: {
      component: Text,
      props: {
        fontSize: "16px",
        margin: "4px 0px 16px 0px"
      }
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
    ol: {
      component: OrderedList,
      props: {
        margin: "0px 0px 8px 10px"
      },
    },
    li: {
      component: ListItem,
      props: {
        marginLeft: "10px"
      },
    },
    ul: {
      component: UnorderedList,
      props: {
        margin: "0px 0px 8px 10px"
      },
    }
  },
};

export const MarkdownToJsx = ({ content }: { content: string }) => {
  return <Markdown options={config} style={{ marginBottom: "75px" }}>{content}</Markdown>;
};
