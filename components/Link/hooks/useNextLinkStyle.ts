import { useColorMode } from "@chakra-ui/react"

export const useNextLinkStyle = () => {
  const { colorMode } = useColorMode()
  return {
    fontWeight: "bold",
    fontSize: "16px",
    color: colorMode === 'light' ? "var(--chakra-colors-blue-600)" : "var(--chakra-colors-blue-300)",
    textDecoration: "underline",
  }
}