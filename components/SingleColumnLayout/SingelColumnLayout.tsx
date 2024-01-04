import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

export const SingleColumnLayout = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <VStack padding="20px" alignItems="center">
      <Box maxW="500px" width="100%">
        {children}
      </Box>
    </VStack>
  );
};
