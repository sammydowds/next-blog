import { SingleColumnLayout } from "@/components/SingleColumnLayout";
import { NoteFrontMatter } from "../types";
import { Box, Text, Heading, VStack, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { getSortedNotesMetaData } from "../lib/posts";
import { GithubLinkButton } from "@/components/GithubLinkButton";

interface NotesParams {
  notes: NoteFrontMatter[];
}
export default function Notes({ notes }: NotesParams) {
  return (
    <>
      <Head>
        <title>Notes</title>
        <meta name="description" content="Notes written" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👓</text></svg>"
        />
      </Head>
      <main>
        <SingleColumnLayout>
          <VStack>
            {notes.map((note) => {
              return (
                <Box key={note.id} w="100%">
                  <GithubLinkButton href={`/notes/${note.id}`} p="10px">
                    <Flex direction="column">
                      <Heading as="h2" fontSize="18px">
                        {note.title}
                      </Heading>
                      <Flex alignContent="middle" fontSize="10px" gap="2px">
                        <Box>{note.date}</Box>
                        <Box>·</Box>
                        <Box>{note.estimatedTime}m read</Box>
                      </Flex>
                    </Flex>
                    <Text fontSize="14px">{note.description}</Text>
                  </GithubLinkButton>
                </Box>
              );
            })}
          </VStack>
        </SingleColumnLayout>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const sortedNotes = getSortedNotesMetaData();
  return { props: { notes: sortedNotes } };
}
