import { Args, useIntersectionObserver } from "../IntersectionObserver"
import { SlideFade, VStack, Text, Card, CardBody, Image, Fade } from "@chakra-ui/react"
import { useEffect, useRef } from "react"

interface PromptFromRightProps {
  prompt: string
  height: string
  offset?: string
  intersectionProps?: Args
  onInViewChange?: (inView: boolean) => void
}
export const CardSlideFade = ({ height, prompt, offset, intersectionProps, onInViewChange }: PromptFromRightProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const { entry } = useIntersectionObserver(ref, intersectionProps ?? {})

  useEffect(() => {
    if (typeof entry?.isIntersecting === "boolean") {
      onInViewChange?.(entry?.isIntersecting)
    }
  }, [entry?.isIntersecting, onInViewChange])

  return (
    <VStack justify="center" h={height} ref={ref}>
      <SlideFade in={entry?.isIntersecting} offsetX={offset} transition={{ enter: { duration: 0.5 } }}>
        <Card borderRadius="0" opacity=".8">
          <CardBody>
            <Text>
              {prompt}
            </Text>
          </CardBody>
        </Card>
      </SlideFade>
    </VStack>
  )
}