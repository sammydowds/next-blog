import Head from 'next/head'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { Link } from '@/components/Link'
import { Inquiry } from '@/components/Inquiry'
import { Header } from '@/components/Header'
import { Projects } from '@/components/Projects'
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
				<Header />
				<SingleColumnLayout>
					<Box>
						<VStack align="start">
							<Heading>Hi, I am Sammy!</Heading>
							<Text fontSize="24px">
								I like building things on the web. I am a mechanical engineer turned fullstack engineer.
							</Text>
							<Box pt="30px" alignSelf="end">
								<Inquiry buttonText="Drop me a message" ctaText='Send' modalTitle='Lets get in touch' secondaryCtaText='Close' />
							</Box>
						</VStack>
						<Projects />
						<VStack fontSize="24" alignItems="start" marginTop="26px">
							<Heading as="h3">Links</Heading>
							<Link href="https://github.com/sammydowds">
								Github
							</Link>,
							<Link href="https://www.linkedin.com/in/sammy-dowds-521182b3/">
								LinkedIn
							</Link>,
						</VStack>
					</Box>
				</SingleColumnLayout>
			</main>
		</>
	)
}
