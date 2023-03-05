import { Box, IconButton, Link, useColorMode } from '@chakra-ui/react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import NextImage from 'next/image'

export const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Box
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			position="sticky"
			left="0"
			top="0"
			padding="10px"
			backdropFilter="blur(10px)"
		>
			<NextImage src="/sammy.png" alt="Sammy" height="40" width="40" style={{ borderRadius: "40px" }} />
			<Box display="flex" gap="4" alignItems="center">
				<Link href="/">About</Link>
				<Link href="/notes">Notes</Link>
				<IconButton aria-label={colorMode === 'light' ? "Switch to dark mode" : "Switch to light mode"} icon={colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />} onClick={toggleColorMode} />
			</Box>
		</Box>
	)
}