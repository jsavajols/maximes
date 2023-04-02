<script>
	import {
		Head,
		Section,
		Container,
		Img,
		Button,
		Hr,
		Html,
		Text,
	} from "svelte-email";

	export let name = "";
	export let author = "";
	export let maxime = "";

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const container = {
		margin: "0 auto",
		padding: "20px 0 48px",
		width: "580px",
		backgroundColor: "lightblue",
	};
	const paragraph = {
		fontFamily,
		fontSize: "18px",
		lineHeight: "1.4",
		color: "#484848",
	};
</script>

<Html lang="fr">
	<Head />
	<Section>
		<Container style={container}>
			<Section>
				<Img
					src="https://maximes.happyapi.fr/1clusif-logo-vertical.png"
					alt="1Clusif"
					width="100%"
					height="100%"
				/>
			</Section>
		</Container>
	</Section>
	<Text style={paragraph}>
		Hello, {name}!
	</Text>
	<Text style={paragraph}>
		Voici la maxime du jour : { maxime }
	</Text>
	<Text style={paragraph}>
		Que l'on attribue à : { author }
	</Text>
	<Hr />
	<Button href="https://1clusif.org">Je veux visiter 1Clusif</Button>
</Html>
