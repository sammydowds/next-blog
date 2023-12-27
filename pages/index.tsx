import Head from 'next/head'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { SingleColumnLayout } from '@/components/SingleColumnLayout'
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
				<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>" />
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
					</Box>
				</SingleColumnLayout>
			</main>
		</>
	)
}
