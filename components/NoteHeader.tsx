import { Note } from "@/types"
import { Box, Flex } from "@chakra-ui/react"

interface NoteHeaderProps {
  note: Note
}
export const NoteHeader = ({ note }: NoteHeaderProps) => {
  const { estimatedTime, wordCount, data } = note

  return (
    <Flex gap="2px" borderBottom="1px solid gray" justifyContent="end" fontSize="12px">
      <Box>{estimatedTime}min read</Box>
      <Box>·</Box>
      <Box>{wordCount} words</Box>
      <Box>·</Box>
      <Box>written {data.date}</Box>
    </Flex>
  )
}
