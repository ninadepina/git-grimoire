<script>
	import { onMount } from 'svelte';
	import { getRepositories, getUserInfo, getLanguageColors } from '../../lib/api.js';

	let repositories = [];
	let user = [];
	let languageColors = [];
	let inputValue = '';

	function handleInput(e) {
		inputValue = e.target.value;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		sessionStorage.setItem('inputValue', inputValue);
		try {
			repositories = await getRepositories(inputValue);
			user = await getUserInfo(inputValue);
			languageColors = await getLanguageColors();
		} catch (error) {
			sessionStorage.removeItem('inputValue');
			console.error(error);
		}
	}

	onMount(async () => {
		if (sessionStorage.inputValue) sessionStorage.removeItem('inputValue');
		try {
			repositories = await getRepositories();
			user = await getUserInfo();
			languageColors = await getLanguageColors();
		} catch (error) {
			console.error(error);
		}
	});

	let isFollow = false;
	function follow() {
		isFollow = !isFollow;
	}

	function getRepoName(e) {
		const repoName = e.target.getAttribute('href').substring('/repo/'.length);
		sessionStorage.setItem('repoName', repoName);
		window.location.href = e.target.href;
	}
</script>

<main>
	<!-- prettier-ignore -->
	<header>
		<ul>
			<li>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                </svg>
				<p>Overview</p>
			</li>
			<li>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </svg>
				<p>Repositories</p>
			</li>
			<li>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"></path>
                </svg>
				<p>Projects</p>
			</li>
			<li>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="m8.878.392 5.25 3.045c.54.314.872.89.872 1.514v6.098a1.75 1.75 0 0 1-.872 1.514l-5.25 3.045a1.75 1.75 0 0 1-1.756 0l-5.25-3.045A1.75 1.75 0 0 1 1 11.049V4.951c0-.624.332-1.201.872-1.514L7.122.392a1.75 1.75 0 0 1 1.756 0ZM7.875 1.69l-4.63 2.685L8 7.133l4.755-2.758-4.63-2.685a.248.248 0 0 0-.25 0ZM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432Zm6.25 8.271 4.625-2.683a.25.25 0 0 0 .125-.216V5.677L8.75 8.432Z"></path>
                </svg>
				<p>Packages</p>
			</li>
			<li>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                </svg>
				<p>Stars</p>
			</li>
		</ul>
	</header>

	<!-- prettier-ignore -->
	<section class="main_info">
		<section>
			<div>
				<img src="{user.avatar}" alt="GitHub avatar logo" />
				<div>
					<p>🤙🏼</p>
				</div>
			</div>
            <h3>{user.username}</h3>
            <button class:follow={isFollow} on:click={follow}>follow</button>
            <div>
                <svg text="muted" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path>
                </svg>
                <p><span>{user.followers}</span> followers <span>·</span> <span>{user.following}</span> following</p>
            </div>
		</section>
		<section>
			<form autocomplete="off" on:submit={handleSubmit}>
				<input type="text" bind:value={inputValue} on:input={handleInput} placeholder="Enter someones GitHub username here to view their repositories..." name="search" autocomplete="off" />
				<button type="submit">Search</button>
            </form>
			<ul>
				{#each repositories as repository}
					<li>
						<h2><a href="/repo/{repository.name}" on:click={getRepoName}>{repository.name}</a></h2>
						{#if repository.description}
							<p>{repository.description}</p>
						{/if}
                        {#if repository.topics.length > 0}
							<ul>
								{#each repository.topics as topic}
									<li><a href="https://github.com/topics/{topic}" target="_blank">{topic}</a></li>
								{/each}
							</ul>
						{/if}
                        <div>
							{#if repository.language  && languageColors[repository.language]}
								<div>
									<span style="background-color: {languageColors[repository.language].color}"></span>
							   		<p>{repository.language}</p>
								</div>
							{/if}
						    {#if repository.license}
								<div>
									<svg viewBox="0 0 16 16">
										<path
											d="M8.75.75V2h.985c.304 0 .603.08.867.231l1.29.736c.038.022.08.033.124.033h2.234a.75.75 0 0 1 0 1.5h-.427l2.111 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.006.005-.01.01-.045.04c-.21.176-.441.327-.686.45C14.556 10.78 13.88 11 13 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L12.178 4.5h-.162c-.305 0-.604-.079-.868-.231l-1.29-.736a.245.245 0 0 0-.124-.033H8.75V13h2.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1 0-1.5h2.5V3.5h-.984a.245.245 0 0 0-.124.033l-1.289.737c-.265.15-.564.23-.869.23h-.162l2.112 4.692a.75.75 0 0 1-.154.838l-.53-.53.529.531-.001.002-.002.002-.006.006-.016.015-.045.04c-.21.176-.441.327-.686.45C4.556 10.78 3.88 11 3 11a4.498 4.498 0 0 1-2.023-.454 3.544 3.544 0 0 1-.686-.45l-.045-.04-.016-.015-.006-.006-.004-.004v-.001a.75.75 0 0 1-.154-.838L2.178 4.5H1.75a.75.75 0 0 1 0-1.5h2.234a.249.249 0 0 0 .125-.033l1.288-.737c.265-.15.564-.23.869-.23h.984V.75a.75.75 0 0 1 1.5 0Zm2.945 8.477c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327Zm-10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327Z"
										/>
									</svg>
									<p>{repository.license}</p>
								</div>
						    {/if}
						    <p>Updated {repository.lastUpdated}</p>
                        </div>
					</li>
				{/each}
			</ul>
		</section>
	</section>
</main>

<style>
	a {
		text-decoration: none;
	}
	svg {
		width: 16px;
		height: 16px;
		fill: #8b949e;
	}

	header {
		box-shadow: inset 0 -1px 0 #21262d;
	}
	header ul {
		display: flex;
		gap: 0.8em;
		margin-left: 420px;
		min-height: 48px;
	}
	header li {
		display: flex;
		align-items: center;
		gap: 0.8em;
		padding: 0 8px;
		font-size: 14px;
		line-height: 30px;
		color: #c9d1d9;
	}
	header li:nth-of-type(2) {
		font-weight: 600;
		border-bottom: 2px solid #f78166;
	}

	.main_info {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 2.2em;
		margin: 24px 72.5px;
	}
	.main_info section:first-of-type {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9em;
	}
	.main_info section:first-of-type div:has(img) {
		position: relative;
	}
	.main_info section:first-of-type img {
		width: 100%;
		margin-top: -50px;
		border: 2px solid #30363d;
		border-radius: 50%;
	}
	.main_info section:first-of-type div:has(img) div {
		position: absolute;
		top: 66%;
		right: 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 12%;
		aspect-ratio: 1 / 1;
		background-color: #0d1117;
		border: 1px solid #30363d;
		border-radius: 50%;
	}
	.main_info section:first-of-type h3 {
		font-size: 20px;
		font-weight: 300;
		line-height: 24px;
		color: #8b949e;
	}
	.main_info section:first-of-type > button {
		width: 100%;
		padding: 5px 16px;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		text-transform: capitalize;
		color: #c9d1d9;
		background-color: #21262d;
		border: 1px solid rgba(240, 246, 252, 0.1);
		border-radius: 6px;
		transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
		transition-property: color, background-color, border-color;
		cursor: pointer;
	}
	.main_info section:first-of-type > button.follow {
		text-transform: none;
	}
	.main_info section:first-of-type > button.follow::before {
		content: 'Un';
	}
	.main_info section:first-of-type > button:hover {
		background-color: #30363d;
		border-color: #8b949e;
		transition-duration: 0.1s;
	}

	.main_info section:first-of-type > div {
		display: flex;
		align-items: center;
		gap: 0.3em;
		margin-top: 0.3em;
		font-size: 14px;
		color: #8b949e;
	}
	.main_info section:first-of-type > div span {
		color: #c9d1d9;
	}
	.main_info section:first-of-type > div span:nth-child(2n + 1) {
		font-weight: 500;
	}

	.main_info section:last-of-type > ul > li {
		display: flex;
		flex-direction: column;
		gap: 0.4em;
		padding: 24px 0;
		box-shadow: inset 0 -1px 0 #21262d;
	}

	.main_info section:last-of-type ul li h2 + p {
		font-size: 14px;
		line-height: 1.5;
		color: #8b949e;
	}

	.main_info section:last-of-type ul li > div {
		display: flex;
		gap: 16px;
		font-size: 12px;
		line-height: 20px;
		color: #8b949e;
	}

	form {
		display: flex;
		gap: 4px;
		padding-bottom: 16px;
		box-shadow: inset 0 -1px 0 #21262d;
	}
	input {
		width: 100%;
		padding: 5px 12px;
		font-size: 14px;
		line-height: 20px;
		color: #c9d1d9;
		background-color: #0d1117;
		border: 1px solid #30363d;
		border-radius: 6px;
	}
	input:focus-visible {
		border-color: #58a6ff;
		box-shadow: inset 0 0 0 1px #58a6ff;
	}
	form button {
		padding: 5px 16px;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		color: #fff;
		background-color: #238636;
		border: 1px solid rgba(240, 246, 252, 0.1);
		border-radius: 6px;
		cursor: pointer;
	}

	/* repo name */
	h2 {
		display: inline-block;
	}
	h2 a {
		font-size: 20px;
		font-weight: 600;
		line-height: 1.5;
		color: #58a6ff;
	}
	h2 a:is(:hover, :active, :focus-within) {
		text-decoration: underline;
	}

	/* topic tags */
	li ul {
		display: flex;
		gap: 1.5px;
	}
	li ul li {
		display: inline-block;
		margin: 0.4em 0;
		color: #58a6ff;
		background-color: rgba(56, 139, 253, 0.15);
		border-radius: 2em;
	}
	li ul li:is(:hover, :active, :focus-within) {
		background-color: #1f6feb;
	}
	li ul li a {
		padding: 4.4px 10px;
		font-size: 12px;
		line-height: 22px;
		color: #58a6ff;
	}
	li ul li:is(:hover, :active, :focus-within) a {
		color: #fff;
	}

	form + ul div:has(span),
	form + ul div:has(svg) {
		display: flex;
		align-items: center;
		gap: 0.4em;
	}
	form + ul span {
		width: 14px;
		height: 14px;
		border-radius: 50%;
	}
	form + ul div:has(span) p {
		padding-top: 3px;
	}
</style>
