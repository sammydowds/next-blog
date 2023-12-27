import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { Analytics } from '@vercel/analytics/react'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {

	useEffect(() => {
		localStorage.setItem('chakra-ui-color-mode', 'light')
	})

	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
			<Analytics />
		</ChakraProvider>
	)
}
