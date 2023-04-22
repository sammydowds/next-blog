import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { NoteFrontMatter } from '../types'
import { Box, Text, Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedNotesMetaData } from '../lib/posts'
import { useNextLinkStyle } from '@/components/Link/hooks/useNextLinkStyle'

interface Notes {
	notes: NoteFrontMatter[]
}
export default function Notes({ notes }: Notes) {
	const linkStyle = useNextLinkStyle()

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
					<VStack gap="20px">
						{
							notes.map((note) => {
								return (
									<Box key={note.id} w="100%">
										<Heading as="h2" fontSize="28px">{note.title}</Heading>
										<Text fontSize="24px">{note.description}</Text>
										<Box margin="14px 0px">
											<Link style={{ ...linkStyle }} href={`/notes/${note.id}`}>Read More</Link>
										</Box>
									</Box>
								)
							})
						}
					</VStack>
				</SingleColumnLayout>
			</main>
		</>
	)
}

export async function getStaticProps() {
	const sortedNotes = getSortedNotesMetaData()
	return { props: { notes: sortedNotes } }
}