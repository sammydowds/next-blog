import Head from 'next/head'
import { Background, Intro, Career, ContactMe } from '@/components/ScrollingStory'
import { useState } from 'react'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { BsMailbox } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { TfiHandPointRight } from 'react-icons/tfi'


export default function Story() {
  const [index, setIndex] = useState(1)

  const onIntro = index >= 1
  const onBackground = index >= 2
  const onCareer = index >= 3
  const onContact = index >= 4

  const handleOnIntro = (inView: boolean) => {
    if (inView) {
      setIndex(1)
    }
  }
  const handleOnBackground = (inView: boolean) => {
    if (inView) {
      setIndex(2)
    }
  }
  const handleOnCareer = (inView: boolean) => {
    if (inView) {
      setIndex(3)
    }
  }
  const handleOnContact = (inView: boolean) => {
    if (inView) {
      setIndex(4)
    }
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
        <VStack
          position="fixed"
          top="20px"
          left="20px"
          backgroundColor="white"
          padding="10px"
          borderRadius="10px"
          zIndex="2"
          border="1px solid black"
        >
          <HStack>
            <Text
              fontWeight="bold"
              color={onIntro ? "black" : "gray"}
            >
              Intro
            </Text>
            <Text
              fontWeight="bold"
              color={onBackground ? "black" : "gray"}
            >
              Background
            </Text>
            <Text
              fontWeight="bold"
              color={onCareer ? "black" : "gray"}
            >
              Career
            </Text>
            <Text
              fontWeight="bold"
              color={onContact ? "black" : "gray"}
            >
              Contact Me
            </Text>
          </HStack>
          <HStack w="100%" m="0">
            {
              index <= 3 ? (
                <>
                  <Box w="90%">
                    <Box position="relative" left={`${(index - 1) * 30}%`}>
                      <AiOutlineMail />
                    </Box>
                  </Box>
                  <Box>
                    <BsMailbox />
                  </Box>
                </>
              ) : (
                <>
                  <Box w="90%">
                    <Box position="relative" left={`${(index - 1) * 30}%`}>
                      <TfiHandPointRight />
                    </Box>
                  </Box>
                  <Box>
                    <BsMailbox />
                  </Box>
                </>
              )
            }
          </HStack>
        </VStack>

        <Intro
          onInViewChange={handleOnIntro}
          height="100vh"
          intersectionProps={{ rootMargin: "-50%" }}
        />
        <Background
          onInViewChange={handleOnBackground}
          height="100vh"
          intersectionProps={{ rootMargin: "-50%" }}
        />
        <Career
          onInViewChange={handleOnCareer}
          height="100vh"
          intersectionProps={{ rootMargin: "-50%" }}
        />
        <ContactMe
          onInViewChange={handleOnContact}
          height="100vh"
          intersectionProps={{ rootMargin: "-50%" }}
        />
      </main>
    </>
  )
}