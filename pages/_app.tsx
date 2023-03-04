import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
import theme from '../theme'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Header />
			<Component {...pageProps} />
		</ChakraProvider>
	)
}
