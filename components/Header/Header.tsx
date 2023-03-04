import { Avatar, Box, Link } from '@chakra-ui/react'
// import { Link } from '@chakra-ui/next-js'

export const Header = () => {
	return (
		<Box
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			borderBottom="1px solid"
			position="sticky"
			left="0"
			top="0"
			padding="10px"
			backdropFilter="blur(10px)"
		>
			<Avatar name="Sammy" src="https://dowds.digital/assets/sammy-b8bb7304.png" />
			<Box display="flex" gap="4">
				<Link href="/">About</Link>
				<Link href="/notes">Notes</Link>
			</Box>
		</Box>
	)
}