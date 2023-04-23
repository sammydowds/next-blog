import { Args, useIntersectionObserver } from "../IntersectionObserver"
import { VStack, Text, Card, CardBody, Image, Fade } from "@chakra-ui/react"
import { ReactNode, useEffect, useRef } from "react"

export interface SectionProps {
  height: string
  children: ReactNode
  offset?: string
  intersectionProps?: Args
  onInViewChange?: (inView: boolean) => void
}
export const Section = ({ children, height, intersectionProps, onInViewChange }: SectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { entry } = useIntersectionObserver(ref, intersectionProps ?? {})

  useEffect(() => {
    if (typeof entry?.isIntersecting === "boolean") {
      onInViewChange?.(entry?.isIntersecting)
    }
  }, [entry?.isIntersecting, onInViewChange])

  return (
    <VStack justify="center" h={height} ref={ref} mx="20px">
      {children}
    </VStack>
  )
}