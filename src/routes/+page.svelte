<script>
</script>

<main>
	<div>
		<h1>GitHub repository <span>with all</span> my GitHub repositories</h1>
		<a href="/work">Go to my repositories</a>
	</div>
	<img src="/hero_img.png" alt="part of this projects GitHub repository" />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		height: calc(100vh - 64px);
		padding-bottom: 0;
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
		margin: auto 0;
	}

	h1 {
		max-width: 560px;
		font-size: 2.6em;
		text-align: center;
		color: #f0f6fc;
	}
	span {
		position: relative;
		color: rgba(0, 0, 0, 0);
		background-image: linear-gradient(to right, #dbc6f3, #7271d3);
		-webkit-background-clip: text;
		background-clip: text;
	}

	a {
		padding: 12px 24px;
		font-size: 0.9em;
		font-weight: 600;
		text-decoration: none;
		color: #0d1117;
		background-color: #f0f6fc;
		border-radius: 6px;
	}
	a:hover {
		color: #f0f6fc;
		background-image: linear-gradient(to right, #dbc6f3, #7271d3);
	}

	img {
		width: 100%;
		max-width: 1000px;
	}
</style>
