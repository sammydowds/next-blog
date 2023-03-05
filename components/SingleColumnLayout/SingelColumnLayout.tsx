import { Box, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const SingleColumnLayout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <VStack padding="10px" alignItems="center">
      <Box maxW="700px" width="100%">
        {children}
      </Box>
    </VStack>
  )
}