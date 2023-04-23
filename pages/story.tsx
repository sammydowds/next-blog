import Head from 'next/head'
import { CardSlideFade } from '@/components/ScrollingStory'
import { useState } from 'react'
import { HStack, Text } from '@chakra-ui/react'


export default function Story() {
  const [onIntro, setOnIntro] = useState(true)
  const [onEarlyLife, setOnEarlyLife] = useState(false)
  const [onCareer, setOnCareer] = useState(false)
  const [onContact, setOnContact] = useState(false)

  const handleOnIntro = (inView: boolean) => {
    setOnIntro(inView)
  }
  const handleOnEarlyLife = (inView: boolean) => {
    setOnEarlyLife(inView)
  }
  const handleOnCareer = (inView: boolean) => {
    setOnCareer(inView)
  }
  const handleOnContact = (inView: boolean) => {
    setOnContact(inView)
  }

  return (
    <>
      <Head>
        <title>My Story</title>
        <meta name="description" content="My Story" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HStack position="fixed" top="20px" left="20px">
          <Text
            fontWeight="bold"
            color={onIntro ? "black" : "gray"}
            textDecoration={onIntro ? "underline" : ""}>
            Intro
          </Text>
          <Text
            fontWeight="bold"
            color={onEarlyLife ? "black" : "gray"}
            textDecoration={onEarlyLife ? "underline" : ""}>
            Early Life
          </Text>
          <Text
            fontWeight="bold"
            color={onCareer ? "black" : "gray"}
            textDecoration={onCareer ? "underline" : ""}>
            Career
          </Text>
          <Text
            fontWeight="bold"
            color={onContact ? "black" : "gray"}
            textDecoration={onContact ? "underline" : ""}>
            Contact Me
          </Text>
        </HStack>
        <CardSlideFade
          height="100vh"
          prompt="Hi. I am Sammy."
          intersectionProps={{ rootMargin: "-50%" }}
          offset="-400px"
          onInViewChange={handleOnIntro}
        />
        <CardSlideFade
          height="100vh"
          prompt="I was born in Oklahoma City, OK. Well, more of Edmond to be specific."
          intersectionProps={{ rootMargin: "-50%" }}
          offset="400px"
          onInViewChange={handleOnEarlyLife}
        />
        <CardSlideFade
          height="100vh"
          prompt="My Career"
          intersectionProps={{ rootMargin: "-50%" }}
          offset="-400px"
          onInViewChange={handleOnCareer}
        />
        <CardSlideFade
          height="100vh"
          prompt="Contact me"
          intersectionProps={{ rootMargin: "-50%" }}
          offset="-400px"
          onInViewChange={handleOnContact}
        />
      </main>
    </>
  )
}