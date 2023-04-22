import { Box, HStack } from '@chakra-ui/react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { MenuLink } from '../MenuLink'

export const Header = () => {
	const router = useRouter()
	const isViewingNote = router.route === "/notes/[id]"
	return (
		<Box
			display="flex"
			justifyContent="space-around"
			alignItems="center"
			position="sticky"
			left="0"
			top="0"
			padding="20px"
			backdropFilter="blur(10px)"
		>
			<HStack maxW="700px" w="100%" justify="space-between">
				<NextImage src="/sammy.png" alt="Sammy" height="40" width="40" style={{ borderRadius: "40px" }} />
				<Box display="flex" gap="4" alignItems="center">
					{!isViewingNote ? (
						<>
							<MenuLink to="/" >About</MenuLink>
							<MenuLink to="/notes">Notes</MenuLink>
						</>) : (
						<MenuLink to="/notes" forceSelected>
							&larr;
							All notes
						</MenuLink>
					)}
				</Box>
			</HStack>
		</Box>
	)
}