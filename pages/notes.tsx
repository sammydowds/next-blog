import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>Notes</title>
				<meta name="description" content="Notes written" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				Notes here
			</main>
		</>
	)
}