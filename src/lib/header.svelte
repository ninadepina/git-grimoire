<header>
	<nav>
		<a href="/">nina vens</a>
		<a href="/work">work</a>
		<div class="container_social_dropdown">
			<a href="">socials</a>
			<div class="social_dropdown">
				<ul>
					<li><a href="https://www.linkedin.com/in/ninavens" target="_blank">LinkedIn</a></li>
					<li><a href="https://www.instagram.com/ninavensstudio/" target="_blank">Instagram</a></li>
					<li><a href="https://github.com/ninadepina" target="_blank">GitHub</a></li>
				</ul>
			</div>
		</div>
		<a href="">contact</a>
	</nav>
</header>

<style>
	nav {
		position: sticky;
		top: 5vh;
		width: 100%;
		padding: 0 7vw;
		display: flex;
		justify-content: space-between;
		z-index: 999;
	}
	nav a {
		color: #fff;
		font-family: 'Poppins', sans-serif;
		font-size: 12px;
		text-transform: uppercase;
	}

	.container_social_dropdown {
		position: relative;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}

	@media only screen and (min-width: 768px) {
		nav {
			top: 6.5vh;
			padding: 0 5vw;
			color: #383838;
			pointer-events: none;
		}
		nav a {
			position: relative;
			color: inherit;
			text-decoration: none;
			pointer-events: all;
		}
		nav a::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			display: block;
			background-color: #4e4e4e;
			transition: 0.8s;
			transition-timing-function: cubic-bezier(0, 0.89, 0.41, 1);
			transform: scale(0);
		}
		nav a:hover::after,
		.container_social_dropdown:has(.social_dropdown:hover) > a::after {
			transform: scale(1);
		}
		.container_social_dropdown:hover {
			color: #383838;
		}
		.container_social_dropdown:hover .social_dropdown {
			visibility: visible;
			opacity: 1;
			transform: translate(0);
			pointer-events: all;
		}
		.container_social_dropdown:hover .social_dropdown li {
			opacity: 1;
			transform: translate(0);
			transition-delay: calc(var(--order) * 100ms);
		}
		.container_social_dropdown > a {
			position: relative;
			z-index: 4;
		}
		.social_dropdown {
			visibility: hidden;
			position: absolute;
			top: -20px;
			left: -74%;
			width: 12vw;
			opacity: 0;
			background-color: #fff;
			border-radius: 25px;
			transition: 0.4s;
			transition-timing-function: cubic-bezier(0, 0.89, 0.41, 1);
			transform: translateY(-10px);
			transform-origin: top;
		}
		.social_dropdown::after {
			content: url('/chevron_down.svg');
			position: absolute;
			top: 20px;
			right: 28px;
			width: 20px;
			z-index: 4;
		}
		.social_dropdown ul {
			position: relative;
			padding: 58px 0 8px;
		}
		.social_dropdown ul::before {
			content: '';
			position: absolute;
			top: 54px;
			right: 10%;
			width: 80%;
			height: 1px;
			display: block;
			background-color: rgba(65, 65, 65, 0.3);
			transform: scale(0);
			transition: 0.4s;
		}
		.social_dropdown li {
			position: relative;
			margin: 5px;
			padding: 10px 31px;
			opacity: 0;
			border-radius: 50px;
			transform: translateY(20%);
			transition: 0.8s;
			transition-timing-function: cubic-bezier(0, 0.89, 0.41, 1);
			cursor: pointer;
		}
		.social_dropdown ul li:nth-of-type(1) {
			--order: 1;
		}
		.social_dropdown ul li:nth-of-type(2) {
			--order: 2;
		}
		.social_dropdown ul li:nth-of-type(3) {
			--order: 3;
		}
		.social_dropdown li a {
			position: relative;
			color: #383838;
			text-decoration: none !important;
			border-radius: 50px;
			z-index: 1;
		}
	}
</style>
