import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { Box, Text, Heading, Link } from '@chakra-ui/react'
import Head from 'next/head'
import { getSortedNotesData } from '../lib/posts'

interface NotesPreview {
	id: string
	title: string
	description: string
	date: string
	heroImage: string
}
interface Notes {
	notes: NotesPreview[]
}
export default function Notes({ notes }: Notes) {
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
								<Box key={note.id}>
									<Heading>{note.title}</Heading>
									<Text>{note.description}</Text>
									<Link href={`/notes/${note.id}`}>Read More</Link>
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
	const sortedNotes = getSortedNotesData()
	return { props: { notes: sortedNotes } }
}