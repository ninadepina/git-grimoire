import { formatDistanceToNow } from 'date-fns';

const getRepositories = async () => {
	const url = 'https://api.github.com/users/ninadepina/repos';
	let data;

	try {
		data = await (await fetch(url)).json();
		const repositories = data.map((repository) => {
			const lastUpdated = formatDistanceToNow(new Date(repository.pushed_at), { addSuffix: true });
			const lastUpdatedTime = repository.pushed_at;

			return {
				name: repository.name,
				description: repository.description,
				language: repository.language,
				topics: repository.topics,
				license: repository.license ? repository.license.name : null,
				lastUpdated,
				lastUpdatedTime
			};
		});
		const repositoriesData = await Promise.all(repositories);
		// sort repos descending by last updated
		repositoriesData.sort((a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime));
		return repositoriesData;
	} catch (error) {
		console.error(error);
	}
};

const getUserInfo = async () => {
	const url = 'https://api.github.com/users/ninadepina';
	let data;

	try {
		data = await (await fetch(url)).json();
		const { login, avatar_url, followers, following } = data;

		return {
			username: login,
			avatar: avatar_url,
			followers,
			following
		};
	} catch (error) {
		console.error(error);
	}
};

const getRepoInfo = async (repoName) => {
	const url = `https://api.github.com/repos/ninadepina/${repoName}`;
	let data;

	try {
		data = await (await fetch(url)).json();
		const { name, owner, stargazers_count, watchers_count, forks, topics } = data;
		const lastUpdated = formatDistanceToNow(new Date(data.pushed_at), { addSuffix: true });

		return {
			name,
			user: owner.login,
			lastUpdated,
			stars: stargazers_count,
			watchers: watchers_count,
			forks,
			topics
		};
	} catch (error) {
		console.error(error);
	}
};

const getRepoInfoContents = async (repoName) => {
	const url = `https://api.github.com/repos/ninadepina/${repoName}/contents`;
	let data;

	try {
		data = await (await fetch(url)).json();
		const contents = data.map((content) => {
			return {
				name: content.name,
				type: content.type
			};
		});
		return contents;
	} catch (error) {
		console.error(error);
	}
};

export { getRepositories, getUserInfo, getRepoInfo, getRepoInfoContents };
