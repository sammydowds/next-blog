import { Box, BoxProps } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, ReactNode } from "react";

const selectedStyles: CSSProperties = {
  fontWeight: "bold",
};

interface GithubLinkButtonProps extends BoxProps {
  href: string;
  children: ReactNode;
  forceSelected?: boolean;
}
export const GithubLinkButton = ({
  href,
  children,
  forceSelected,
  ...props
}: GithubLinkButtonProps) => {
  const router = useRouter();
  const isAt = router.asPath === href;
  const selected = isAt || forceSelected;
  return (
    <Link href={href} style={selected ? selectedStyles : undefined}>
      <Box
        borderRadius="6px"
        px="8px"
        py="4px"
        _hover={{ backgroundColor: "rgba(220, 220, 220, 0.5)" }}
        fontSize="14px"
        {...props}
      >
        {children}
      </Box>
    </Link>
  );
};
