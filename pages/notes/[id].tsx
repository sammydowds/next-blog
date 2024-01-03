import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { Note } from '../../types'
import Head from 'next/head'
import { getNote, getNoteStaticPaths } from '../../lib/posts'
import { GetStaticPropsContext } from 'next'
import { MarkdownToJsx } from '../../components/MarkdownToJsx'
import { Box } from '@chakra-ui/react'
import { Inquiry } from '@/components/Inquiry'
import { Header } from '@/components/Header'
import { NoteHeader } from '@/components/NoteHeader'

interface NoteDetailProps {
  note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {
  return (
    <>
      <Head>
        <title>{note.data.title}</title>
        <meta name="description" content={note.data.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>" />
      </Head>
      <main>
        <Header />
        <SingleColumnLayout>
          <NoteHeader note={note} />
          <MarkdownToJsx content={note.content} />
          <Box position="fixed" bottom="20px" right="20px">
            <Inquiry
              modalTitle='Let me know what you think'
              ctaText='Send'
              buttonText='Thoughts?'
              secondaryCtaText='Close'
            />
          </Box>
        </SingleColumnLayout>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: getNoteStaticPaths(),
    fallback: false,
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (!context.params?.id) {
    return { props: { note: {} } }
  }
  const note = getNote(context?.params?.id)
  return { props: { note } }
}
