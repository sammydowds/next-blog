import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { NoteFrontMatter } from '../types'
import { Box, Text, Heading, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { getSortedNotesMetaData } from '../lib/posts'
import { useNextLinkStyle } from '@/components/Link/hooks/useNextLinkStyle'
import { Header } from '@/components/Header'

interface NotesParams {
	notes: NoteFrontMatter[]
}
export default function Notes({ notes }: NotesParams) {
	const linkStyle = useNextLinkStyle()

	return (
		<>
			<Head>
				<title>Notes</title>
				<meta name="description" content="Notes written" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👓</text></svg>" />
			</Head>
			<main>
				<Header />
				<SingleColumnLayout>
					<VStack gap="20px">
						{
							notes.map((note) => {
								return (
									<Box key={note.id} w="100%">
										<Box>
											<Heading as="h2" fontSize="18px">{note.title}</Heading>
											<Text fontSize="12px">{note.date}</Text>
										</Box>
										<Text fontSize="14px">{note.description}</Text>
										<Box>
											<Link style={{ ...linkStyle }} href={`/notes/${note.id}`}>Read</Link>
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
