import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { NoteFrontMatter } from '../types'
import { Box, Text, Heading, Link } from '@chakra-ui/react'
import Head from 'next/head'
import { getSortedNotesMetaData } from '../lib/posts'

interface Notes {
	notes: NoteFrontMatter[]
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
	const sortedNotes = getSortedNotesMetaData()
	return { props: { notes: sortedNotes } }
}