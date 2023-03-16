<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	// prettier-ignore
	import { getUserInfo, getRepoInfo, getRepoInfoContents, getCommitMessages, getLanguages } from '../../../lib/api.js';
	let chartCanvas;
	let repoName;
	let contents = [];
	let repoInfo = [];
	let user = [];
	let commitMessages = [];
	let languages = [];

	onMount(async () => {
		try {
			const url = window.location.pathname;
			const storedRepoName = sessionStorage.getItem('repoName');
			if (storedRepoName) {
				repoName = storedRepoName;
			} else {
				repoName = url.substring(url.indexOf('repo/') + 5);
				sessionStorage.setItem('repoName', repoName);
			}

			contents = await getRepoInfoContents(repoName);
			repoInfo = await getRepoInfo(repoName);
			user = await getUserInfo();
			commitMessages = await getCommitMessages(repoName);
			languages = await getLanguages(repoName);

			const data = {
				labels: [''],
				datasets: [
					{
						label: languages[0].language + ' ' + languages[0].percentage + '%',
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 1,
						data: [languages[0].percentage]
					},
					{
						label: languages[1].language + ' ' + languages[1].percentage + '%',
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 1)',
						borderWidth: 1,
						data: [languages[1].percentage]
					},
					{
						label: languages[2].language + ' ' + languages[2].percentage + '%',
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						borderColor: 'rgba(255, 206, 86, 1)',
						borderWidth: 1,
						data: [languages[2].percentage]
					}
				]
			};

			const options = {
				scales: {
					x: {
						display: false,
						stacked: true
					},
					y: {
						stacked: true,
						min: 0,
						max: 100,
						ticks: {
							callback: function (value) {
								return value + '%';
							}
						}
					}
				},
				plugins: {
					legend: {
						onClick: null
					}
				},
				events: []
			};

			new Chart(chartCanvas, {
				type: 'bar',
				data: data,
				options: options
			});
		} catch (error) {
			console.error(error);
		}
	});

	let isFavorite = false;
	let isWatch = false;

	function favorite() {
		isFavorite = !isFavorite;
	}
	function watch() {
		isWatch = !isWatch;
	}

	function getFileName(e) {
		const fileName = e.target.getAttribute('href').substring('/repo/'.length);
		sessionStorage.setItem('fileName', fileName);
		window.location.href = e.target.href;
	}
</script>

<main>
	<!-- prettier-ignore -->
	<header>
		<section>
			<div>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
					<path
						d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
				</svg>
				<h1>{repoInfo.user} <span>/</span> <span>{repoInfo.name}</span></h1>
				<p>Public</p>
			</div>
			<div>
				<button class:watch={isWatch} on:click={watch}>
					<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
						<path
							d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
					</svg>
					<p>watch</p>
				</button>
				<button>
					<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
						<path
							d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
					</svg>
					<p>fork</p>
				</button>
				<button class:favorite={isFavorite} on:click={favorite}>
					<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" class="octicon octicon-star d-inline-block mr-2">
						<path
							d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
					</svg>
					<p>star</p>
				</button>
			</div>
		</section>
		<ul>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path>
                </svg>
                <p>Code</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                <p>Issues</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"></path>
                </svg>
                <p>Pull requests</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm4.879-2.773 4.264 2.559a.25.25 0 0 1 0 .428l-4.264 2.559A.25.25 0 0 1 6 10.559V5.442a.25.25 0 0 1 .379-.215Z"></path>
                </svg>
                <p>Actions</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"></path>
                </svg>
                <p>Projects</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                </svg>
                <p>Wiki</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M7.467.133a1.748 1.748 0 0 1 1.066 0l5.25 1.68A1.75 1.75 0 0 1 15 3.48V7c0 1.566-.32 3.182-1.303 4.682-.983 1.498-2.585 2.813-5.032 3.855a1.697 1.697 0 0 1-1.33 0c-2.447-1.042-4.049-2.357-5.032-3.855C1.32 10.182 1 8.566 1 7V3.48a1.75 1.75 0 0 1 1.217-1.667Zm.61 1.429a.25.25 0 0 0-.153 0l-5.25 1.68a.25.25 0 0 0-.174.238V7c0 1.358.275 2.666 1.057 3.86.784 1.194 2.121 2.34 4.366 3.297a.196.196 0 0 0 .154 0c2.245-.956 3.582-2.104 4.366-3.298C13.225 9.666 13.5 8.36 13.5 7V3.48a.251.251 0 0 0-.174-.237l-5.25-1.68ZM8.75 4.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 1.5 0ZM9 10.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                </svg>
                <p>Security</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M1.5 1.75V13.5h13.75a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V1.75a.75.75 0 0 1 1.5 0Zm14.28 2.53-5.25 5.25a.75.75 0 0 1-1.06 0L7 7.06 4.28 9.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0L10 7.94l4.72-4.72a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
                </svg>
                <p>Insights</p>
            </li>
            <li>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                    <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path>
                </svg>
                <p>Settings</p>
            </li>
        </ul>
	</header>

	<section class="main_info">
		<!-- prettier-ignore -->
		<section>
			<section class="main_header">
                <div>
                    <button>
                        <svg text="gray" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"></path>
                        </svg>
                        <p>main</p>
                    </button>
                    <div>
                        <svg text="gray" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"></path>
                        </svg>
                        <p><span>1</span> branch</p>
                    </div>
                    <div>
                        <svg text="gray" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"></path>
                        </svg>
                        <p><span>0</span> tags</p>
                    </div>
                </div>
                <div>
                    <button><p>Go to file</p></button>
                    <button><p>Add file</p></button>
                    <button>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path>
                        </svg>
                        <p>Code</p>
                    </button>
                </div>
            </section>
            <div>
                <table>
					<tr>
						<th>
							<div>
								<img
									src="{user.avatar}"
									alt="@{user.username} GitHub avatar"
								/>
								<h3>{user.username}</h3>
								<p>[added] fix</p>
							</div>
							<div>
								<p>{repoInfo.lastUpdated}</p>
							</div>
						</th>
					</tr>
					{#each contents as content, i}
						<tr>
							<td>
								<!-- prettier-ignore -->
								<div>
									{#if content.type === 'dir'}
										<svg aria-label="Directory" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
											<path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z"></path>
										</svg>
									{/if}
									{#if content.type === 'file'}
										<svg aria-label="File" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
											<path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path>
										</svg>
									{/if}
									<a href="/repo/{repoInfo.name}/{content.name}" on:click={getFileName}>{content.name}</a>
								</div>
								<p>{commitMessages[i % commitMessages.length]}</p>
								<p>static time</p>
							</td>
						</tr>
					{/each}
				</table>
            </div>
		</section>
		<!-- prettier-ignore -->
		<section>
			<article>
				<div>
					<h2>About</h2>
                    <svg aria-label="Edit repository metadata" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                        <path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"></path>
                    </svg>
				</div>
                <div>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                        <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path>
                    </svg>
                    <a href="https://github.com/{user.username}/{repoInfo.name}" target="_blank">{user.username}/{repoInfo.name}</a>
                </div>
				{#if repoInfo.topics}
					<ul>
						{#each repoInfo.topics as topic}
							<li><a href="https://github.com/topics/{topic}" target="_blank">{topic}</a></li>
						{/each}
					</ul>
				{/if}
                <ul>
                    <li>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path>
                        </svg>
                        <p>Readme</p>
                    </li>
                    <li>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg>
                        <p><span>{repoInfo.stars}</span> stars</p>
                    </li>
                    <li>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path>
                        </svg>
                        <p><span>{repoInfo.watchers}</span> watching</p>
                    </li>
                    <li>
                        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg>
                        <p><span>{repoInfo.forks}</span> forks</p>
                    </li>
                </ul>
			</article>
			<article>
				<h2>Environments</h2>
                <div>
                    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
                        <path d="M14.064 0h.186C15.216 0 16 .784 16 1.75v.186a8.752 8.752 0 0 1-2.564 6.186l-.458.459c-.314.314-.641.616-.979.904v3.207c0 .608-.315 1.172-.833 1.49l-2.774 1.707a.749.749 0 0 1-1.11-.418l-.954-3.102a1.214 1.214 0 0 1-.145-.125L3.754 9.816a1.218 1.218 0 0 1-.124-.145L.528 8.717a.749.749 0 0 1-.418-1.11l1.71-2.774A1.748 1.748 0 0 1 3.31 4h3.204c.288-.338.59-.665.904-.979l.459-.458A8.749 8.749 0 0 1 14.064 0ZM8.938 3.623h-.002l-.458.458c-.76.76-1.437 1.598-2.02 2.5l-1.5 2.317 2.143 2.143 2.317-1.5c.902-.583 1.74-1.26 2.499-2.02l.459-.458a7.25 7.25 0 0 0 2.123-5.127V1.75a.25.25 0 0 0-.25-.25h-.186a7.249 7.249 0 0 0-5.125 2.123ZM3.56 14.56c-.732.732-2.334 1.045-3.005 1.148a.234.234 0 0 1-.201-.064.234.234 0 0 1-.064-.201c.103-.671.416-2.273 1.15-3.003a1.502 1.502 0 1 1 2.12 2.12Zm6.94-3.935c-.088.06-.177.118-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 0 0 .119-.213ZM3.678 8.116 5.2 5.766c.058-.09.117-.178.176-.266H3.309a.25.25 0 0 0-.213.119l-1.2 1.95ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                    </svg>
                    <h3>Production</h3>
                    <p>Active</p>
                </div>
			</article>
			<article>
				<h2>Languages</h2>
				<canvas bind:this={chartCanvas}></canvas>
			</article>
		</section>
	</section>
</main>

<style>
	.favorite svg {
		fill: #e3b341;
	}
	header section div:last-of-type button:last-of-type.favorite svg path:last-of-type {
		display: inline-block;
	}
	.favorite p::after {
		content: 'red';
	}
	.watch p {
		text-transform: none;
	}
	.watch p::before {
		content: 'Un';
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 1em;
		box-shadow: inset 0 -1px 0 #21262d;
	}
	header section {
		display: flex;
		justify-content: space-between;
	}

	header section div {
		display: flex;
		align-items: center;
		gap: 0.6em;
	}
	header section div:last-of-type button:last-of-type svg path:last-of-type {
		display: none;
	}

	h1 {
		color: #57a6ff;
		font-size: 20px;
		font-weight: 400;
		line-height: 1.5;
	}
	h1 span:first-of-type {
		color: #8b949e;
	}
	h1 span:last-of-type {
		font-weight: 600;
	}

	h1 + p {
		display: inline-block;
		padding: 0 7px;
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: #8b949e;
		border: 1px solid #30363d;
		border-radius: 2em;
	}

	svg {
		width: 16px;
		height: 16px;
		fill: #8b949e;
	}

	header button {
		display: flex;
		align-items: center;
		gap: 0.4em;
		padding: 3px 12px;
		font-size: 12px;
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
	header button:hover {
		background-color: #30363d;
		border-color: #8b949e;
		transition-duration: 0.1s;
	}

	header ul {
		display: flex;
		gap: 0.8em;
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
	header li:first-of-type {
		font-weight: 600;
		border-bottom: 2px solid #f78166;
	}

	/* ------------------------------------- */
	/* ------------------------------------- */
	/* main info section */

	.main_info {
		display: grid;
		grid-template-columns: 2.9fr 1fr;
		gap: 1.3em;
		margin: 24px 72.5px;
	}

	.main_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
	}
	.main_header > div {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.main_header > div:first-of-type {
		gap: 16px;
	}
	.main_header div button {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 5px 16px;
		font-size: 14px;
		font-weight: 600;
		line-height: 20px;
		white-space: nowrap;
		color: #c9d1d9;
		background-color: #21262d;
		border: 1px solid rgba(240, 246, 252, 0.1);
		border-radius: 6px;
		transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
		transition-property: color, background-color, border-color;
		cursor: pointer;
	}
	.main_header div:first-of-type div,
	.main_header button {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.main_header div button:is(:hover, :active, :focus-within) {
		background-color: #30363d;
		border-color: #8b949e;
		transition-duration: 0.1s;
	}
	.main_header div:first-of-type div p {
		font-size: 14px;
		line-height: 1;
		color: #8b949e;
	}
	.main_header div:first-of-type span {
		font-weight: 600;
		color: #c9d1d9;
	}

	.main_header div:last-of-type button:last-of-type {
		color: #fff;
		background-color: #238636;
		border: 1px solid rgba(240, 246, 252, 0.1);
	}
	.main_header div:last-of-type button:last-of-type svg {
		fill: #fff;
	}
	.main_header div:last-of-type button:last-of-type:is(:hover, :active, :focus-within) {
		color: #fff;
		background-color: #2ea043;
	}
	div:has(table) {
		border: 1px solid #30363d;
		border-radius: 6px;
	}
	table {
		width: 100%;
		font-size: 14px;
		line-height: 1.5;
		background-color: #0d1117;
		border-radius: 6px;
		border-collapse: collapse;
		overflow: hidden;
	}
	table img {
		width: 24px;
		height: 24px;
		border-radius: 50%;
	}
	th,
	td,
	td div {
		display: flex;
		align-items: center;
	}
	th {
		justify-content: space-between;
		gap: 16px;
		padding: 16px;
		background-color: #161b22;
	}
	th h3 {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.5;
		color: #c9d1d9;
	}
	th p {
		font-size: 14px;
		font-weight: 400;
		line-height: 1.5;
		color: #8b949e;
	}
	th h3 + p {
		color: #c9d1d9;
	}
	th div:first-of-type {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	td {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 8px 16px;
	}
	td:hover {
		background-color: #161b22;
	}
	td div {
		display: flex;
		gap: 16px;
		color: #c9d1d9;
	}
	td a {
		color: #c9d1d9;
		text-decoration: none;
	}
	td a:hover {
		color: #58a6ff;
		text-decoration: underline;
	}
	td > p {
		color: #8b949e;
	}
	td > p:first-of-type {
		margin: 0 auto 0 0;
	}
	td > p:last-of-type {
		margin: 0 0 0 auto;
	}

	/* ------------------------------------- */
	/* ------------------------------------- */
	/* sidebar */

	.main_info > section:last-of-type {
		display: flex;
		flex-direction: column;
	}
	.main_info > section:last-of-type h2 {
		font-size: 16px;
		font-weight: 600;
		line-height: 1.5;
		color: #c9d1d9;
	}

	/* -------------------- */
	/* about article */
	.main_info > section:last-of-type article:first-of-type {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-bottom: 24px;
		border-bottom: 1px solid #21262d;
	}
	.main_info > section:last-of-type article:first-of-type a {
		color: #58a6ff;
		text-decoration: none;
	}
	/* heading */
	.main_info > section:last-of-type article:first-of-type > div:first-of-type {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	/* link */
	.main_info > section:last-of-type article:first-of-type > div:nth-of-type(2) {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.main_info > section:last-of-type article:first-of-type > div:nth-of-type(2) svg {
		fill: #c9d1d9;
	}
	.main_info > section:last-of-type article:first-of-type > div:nth-of-type(2) a {
		font-size: 14px;
		font-weight: 600;
	}
	.main_info > section:last-of-type article:first-of-type > div:nth-of-type(2):has(:hover, :active, :focus-within) a {
		text-decoration: underline;
	}
	/* topic tags */
	.main_info > section:last-of-type article:first-of-type > ul:first-of-type li {
		display: inline-block;
		padding: 0 10px;
		font-size: 12px;
		line-height: 22px;
		color: #58a6ff;
		background-color: rgba(56, 139, 253, 0.15);
		border-radius: 2em;
	}
	.main_info > section:last-of-type article:first-of-type > ul:first-of-type li:is(:hover, :active, :focus-within) {
		background-color: #1f6feb;
	}
	.main_info > section:last-of-type article:first-of-type > ul:first-of-type li:is(:hover, :active, :focus-within) a {
		color: #fff;
	}
	/* stats */
	.main_info > section:last-of-type article:first-of-type > ul:last-of-type {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.main_info > section:last-of-type article:first-of-type > ul:last-of-type li {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 14px;
		line-height: 1.5;
		color: #8b949e;
	}
	.main_info > section:last-of-type article:first-of-type > ul:last-of-type li span {
		font-weight: 600;
	}

	/* -------------------- */
	/* environments article */
	.main_info > section:last-of-type article:nth-of-type(2) {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 24px 0;
		border-bottom: 1px solid #21262d;
	}
	.main_info > section:last-of-type article:nth-of-type(2) svg {
		fill: #c9d1d9;
	}
	.main_info > section:last-of-type article:nth-of-type(2) > div {
		display: flex;
		gap: 16px;
	}
	.main_info > section:last-of-type article:nth-of-type(2) > div h3 {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.5;
		color: #c9d1d9;
	}
	.main_info > section:last-of-type article:nth-of-type(2) > div p {
		display: inline-block;
		padding: 0 7px;
		font-size: 12px;
		line-height: 19px;
		white-space: nowrap;
		color: #3fb950;
		border: 1px solid #238636;
		border-radius: 2em;
	}

	/* -------------------- */
	/* languages article */
	.main_info > section:last-of-type article:last-of-type {
		padding: 24px 0;
	}
</style>
