import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { NoteFrontMatter } from '../types'
import { Box, Text, Heading, Link, useColorMode } from '@chakra-ui/react'
import Head from 'next/head'
import { getSortedNotesMetaData } from '../lib/posts'

interface Notes {
	notes: NoteFrontMatter[]
}
export default function Notes({ notes }: Notes) {
	const { colorMode } = useColorMode()
	return (
		<>
			<Head>
				<title>Notes</title>
				<meta name="description" content="Notes written" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<SingleColumnLayout>
					{
						notes.map((note) => {
							return (
								<Box key={note.id} margin="46px 0px">
									<Heading as="h2" fontSize="28px">{note.title}</Heading>
									<Text fontSize="24px">{note.description}</Text>
									<Box margin="14px 0px">
										<Link color={colorMode === 'light' ? "blue.700" : "blue.300"} fontWeight="bold" fontSize="20px" href={`/notes/${note.id}`}>Read More</Link>
									</Box>
								</Box>
							)
						})
					}
				</SingleColumnLayout>
			</main>
		</>
	)
}

export async function getStaticProps() {
	const sortedNotes = getSortedNotesMetaData()
	return { props: { notes: sortedNotes } }
}