import Head from 'next/head'
import { Box, Heading, Link, Text, VStack } from '@chakra-ui/react'
import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { Inquiry } from '@/components/Inquiry'
import { Header } from '@/components/Header'
import { Projects } from '@/components/Projects'
export default function Home() {
	return (
		<>
			<Head>
				<title>Sammy Dowds - Hire Me</title>
				<meta name="description" content="Talented full stack engineer." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👋</text></svg>" />
			</Head>
			<main>
				<Header />
				<SingleColumnLayout>
					<Box>
						<VStack align="start" gap="10px">
							<Heading>Hi, I am Sammy!</Heading>
							<Text fontSize="16px">
								I am an experienced full stack engineer working evenly on both sides of the stack.
							</Text>
							<Text fontSize="16px">
								Most recently, I worked for <Link color="blue.500" href="https://www.zumper.com" isExternal>Zumper</Link> (real estate startup, ~30 engineers) shipping new features, pages, SEO improvements, workers, consumers, tables, and APIs.
							</Text>
							<Text fontSize="16px">
								I have worked with a range of languages, frameworks, and databases.
								I am currently looking for my next challenge. Want to chat?
								Message me below, or on LinkedIn, or at{" "}
								<Link color="blue.500" href="mailto:sammycdowds@gmail.com">
									sammycdowds@gmail.com
								</Link>
								.
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
