import { useNextLinkStyle } from "./hooks/useNextLinkStyle"
import NextLink, { LinkProps } from 'next/link'
import { CSSProperties, ReactNode } from 'react'

interface NextLinkProps extends LinkProps {
  children: ReactNode | string
  style?: CSSProperties
}
export const Link = ({ children, style, ...props }: NextLinkProps) => {
  const styles = useNextLinkStyle()
  return (
    <NextLink style={style ?? { ...styles }} {...props}>{children}</NextLink>
  )
}