import Markdown from "markdown-to-jsx";
import { Code } from "../Code";
import {
  Heading,
  Text,
  Img,
  OrderedList,
  ListItem,
  UnorderedList,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  TableProps,
} from "@chakra-ui/react";
import { Link } from "@/components/Link";
import { ReactNode } from "react";

const ChakraTable = ({
  children,
  ...props
}: {
  children: ReactNode[];
  props: TableProps;
}) => {
  return (
    <TableContainer>
      <Table {...props}>{children}</Table>
    </TableContainer>
  );
};

const config = {
  overrides: {
    h1: {
      component: Heading,
      props: {
        as: "h1",
        fontSize: "26px",
        margin: "24px 0px 18px 0px",
      },
    },
    h2: {
      component: Heading,
      props: {
        as: "h2",
        fontSize: "22px",
        margin: "20px 0px 16px 0px",
      },
    },
    h3: {
      component: Heading,
      props: {
        as: "h3",
        fontSize: "20px",
        margin: "18px 0px 12px 0px",
      },
    },
    h4: {
      component: Heading,
      props: {
        as: "h4",
        fontSize: "16px",
        margin: "10px 0px 10px 0px",
      },
    },
    p: {
      component: Text,
      props: {
        fontSize: "16px",
        margin: "12px 0px 12px 0px",
      },
    },
    div: {
      component: Text,
      props: {
        fontSize: "16px",
        margin: "12px 0px 12px 0px",
      },
    },
    code: {
      component: Code,
    },
    a: {
      component: Link,
      props: {
        style: { fontSize: "16px", textDecoration: "underline", color: "blue" },
      },
    },
    img: {
      component: Img,
      props: {
        width: "100%",
        height: "300px",
        borderRadius: "5px",
        objectFit: "contain",
      },
    },
    ol: {
      component: OrderedList,
      props: {
        margin: "0px 0px 0px 10px",
      },
    },
    li: {
      component: ListItem,
      props: {
        marginLeft: "10px",
        fontSize: "16px",
      },
    },
    ul: {
      component: UnorderedList,
      props: {
        margin: "0px 0px 0px 10px",
      },
    },
    // table
    table: {
      component: ChakraTable,
      props: {
        variant: "striped",
        display: "scroll",
        fontSize: "12px",
        parent: TableContainer,
      },
    },
    thead: {
      component: Thead,
    },
    tbody: {
      component: Tbody,
    },
    tfoot: {
      component: Tfoot,
    },
    tr: {
      component: Tr,
    },
    th: {
      component: Th,
    },
    td: {
      component: Td,
    },
  },
};

export const MarkdownToJsx = ({ content }: { content: string }) => {
  return (
    <Markdown options={config} style={{ marginBottom: "75px" }}>
      {content}
    </Markdown>
  );
};
