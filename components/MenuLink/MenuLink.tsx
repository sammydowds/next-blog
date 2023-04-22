import { useRouter } from "next/router"
import { ReactNode } from "react"
import { Link } from "../Link"

const SELECTED_STYLE = {
  color: "black",
  fontWeight: "bold",
  textDecoration: "underline"
} as const

const UNSELECTED_STYLE = {
  color: "gray",
  fontWeight: "bold",
  textDecoration: undefined
} as const

interface MenuLinkProps {
  children: ReactNode | string
  to: string
  forceSelected?: boolean
}
export const MenuLink = ({ to, children, forceSelected }: MenuLinkProps) => {
  const router = useRouter()
  const isAt = router.asPath === to
  return (
    <Link
      href={to}
      style={isAt || forceSelected ? SELECTED_STYLE : UNSELECTED_STYLE}
    >
      {children}
    </Link>
  )
}