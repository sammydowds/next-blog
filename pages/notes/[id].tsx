import { SingleColumnLayout } from '@/components/SingleColumnLayout'
import { Note } from '../../types'
import Head from 'next/head'
import { getNote, getNoteStaticPaths } from '../../lib/posts'
import { GetStaticPropsContext } from 'next'
import { MarkdownToJsx } from '../../components/MarkdownToJsx'
import { Box } from '@chakra-ui/react'
import { Inquiry } from '@/components/Inquiry'

interface NoteDetailProps {
  note: Note
}
export default function NoteDetail({ note }: NoteDetailProps) {
  return (
    <>
      <Head>
        <title>{note.data.title}</title>
        <meta name="description" content="Notes written" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SingleColumnLayout>
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