import Head from 'next/head'
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import NextLink from 'next/link'

export default function Home() {
	return (
		<>
			<Head>
				<title>About Me</title>
				<meta name="description" content="About me page" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<SingleColumnLayout>
					<Box>
						<Heading>Hi, I am Sammy!</Heading>
						<Text as="p" fontSize="18" marginTop="18">
							As a full-stack engineer, I have a passion for building and learning new things. I began my career as a Mechanical Engineer, graduating from Oklahoma State University in 2016. My curiosity led me to the world of web development, which I taught myself, and I have been hooked ever since.
						</Text>
						<Text as="p" fontSize="18" marginTop="18">
							While I currently focus on frontend technologies, I also possess a strong appreciation for backend aspects, including CRON, Django, Fastly, and FastApi, among others. My experience with frontend technologies includes Express, React, Redux, Node, Deno, and Next JS, with a preference for TypeScript.
						</Text>
						<Text as="p" fontSize="18" marginTop="18">
							Beyond my love for the beautiful chaos of frontend development, I enjoy hobbies such as gaming, running, and watching sports, particularly the NBA. My priorities are becoming a better engineer, maintaining my health, and achieving a healthy balance in my life.
						</Text>
						<VStack fontSize="24" alignItems="start" marginTop="26px">
							<Heading as="h3">Links</Heading>
							<Link as={NextLink} href="https://github.com/sammydowds" isExternal>
								Github
							</Link>,
							<Link as={NextLink} href="https://twitter.com/d1993_sam" isExternal>
								Tweeter
							</Link>,
							<Link as={NextLink} href="https://www.linkedin.com/in/sammy-dowds-521182b3/" isExternal>
								LinkedIn
							</Link>,
						</VStack>
					</Box>
				</SingleColumnLayout>
			</main>
		</>
	)
}
