<main>
	<section>
		<article>
			<div>
				<div>
					<h2>LinkedIn</h2>
					<p>@ninavens</p>
				</div>
				<div>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
						alt="LinkedIn logo"
					/>
				</div>
			</div>
			<a href="https://www.linkedin.com/in/ninavens/" target="_blank">Open LinkedIn</a>
		</article>
		<article>
			<div>
				<div>
					<h2>Instagram</h2>
					<p>@ninavensstudio</p>
				</div>
				<div>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Instagram.svg/512px-Instagram.svg.png"
						alt="Instagram logo"
					/>
				</div>
			</div>
			<a href="https://www.instagram.com/ninavensstudio/" target="_blank">Open Instagram</a>
		</article>
		<article>
			<div>
				<div>
					<h2>GitHub</h2>
					<p>@ninadepina</p>
				</div>
				<div>
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
						alt="GitHub logo"
					/>
				</div>
			</div>
			<a href="https://github.com/ninadepina" target="_blank">Open GitHub</a>
		</article>
		<article>
			<div>
				<div>
					<h2>E-mail</h2>
					<p>nina.vens@hva.nl</p>
				</div>
				<div>
					<img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Send-email.svg" alt="E-mail logo" />
				</div>
			</div>
			<a href="mailto:nina.vens@hva.nl?subject=Contact from GitHub portfolio" target="_blank">Open E-mail</a>
		</article>
	</section>
</main>

<style>
	main {
		margin: 24px 72.5px;
	}
	section {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
	article {
		display: flex;
		flex-direction: column;
		flex-basis: calc(33.33333% - 16px);
		width: 100%;
		height: fit-content;
		padding: 16px;
		border: 1px solid #30363d;
		border-radius: 6px;
	}
	article > a {
		width: fit-content;
		padding: 5px 16px;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		text-decoration: none;
		color: #c9d1d9;
		background-color: #21262d;
		border: 1px solid rgba(240, 246, 252, 0.1);
		border-radius: 6px;
		transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
		transition-property: color, background-color, border-color;
	}
	article > a:is(:hover, :focus-visible) {
		background-color: #30363d;
		border-color: #8b949e;
		transition-duration: 0.1s;
	}
	article > div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}
	article > div > div:first-of-type h2 {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.5;
		color: #c9d1d9;
	}
	article > div > div:first-of-type p {
		font-size: 12px;
		font-weight: 400;
		line-height: 1.5;
		color: #6e7681;
	}
	article > div > div:has(img) {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 56px;
		height: 56px;
		background-color: #fff;
		border-radius: 50%;
	}
	article img {
		max-width: 24px;
		max-height: 24px;
	}
</style>
