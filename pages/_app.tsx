import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "../theme";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  });

  return (
    <ChakraProvider theme={theme}>
      <Box background="#FFFEFB">
        <Header />
        <Component {...pageProps} />
      </Box>
      <Analytics />
    </ChakraProvider>
  );
}
