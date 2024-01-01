import { Box, BoxProps } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { CSSProperties, ReactNode } from "react"

const selectedStyles: CSSProperties = {
  fontWeight: "bold",
}

interface GithubLinkButtonProps extends BoxProps {
  href: string
  children: ReactNode
  forceSelected?: boolean
}
export const GithubLinkButton = ({ href, children, forceSelected, ...props }: GithubLinkButtonProps) => {
  const router = useRouter()
  const isAt = router.asPath === href
  const selected = isAt || forceSelected
  return (
    <Link
      href={href}
      style={
        selected ? selectedStyles : undefined
      }
    >
      <Box
        borderRadius="2px"
        px="5px"
        py="2px"
        _hover={{ backgroundColor: 'rgba(220, 220, 220, 0.5)' }}
        fontSize="16px"
        {...props}
      >
        {children}
      </Box>
    </Link>
  )
}
