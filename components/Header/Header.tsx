import { Box, HStack } from '@chakra-ui/react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { SiGithub, SiLinkedin } from "react-icons/si";
import Link from 'next/link';
import { GithubLinkButton } from '../GithubLinkButton';

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
							<GithubLinkButton href="/">About</GithubLinkButton>
							<GithubLinkButton href="/notes">Notes</GithubLinkButton>
						</>) : (
						<GithubLinkButton href="/notes" forceSelected>
							&larr;
							All notes
						</GithubLinkButton>
					)}
					<Link href="https://github.com/sammydowds">
						<SiGithub color="#333" style={{ height: "30px", width: "30px" }} />
					</Link>
					<Link href="https://www.linkedin.com/in/sammy-d-521182b3/">
						<SiLinkedin color="#0077b5" style={{ height: "30px", width: "30px" }} />
					</Link>
				</Box>
			</HStack>
		</Box>
	)
}
