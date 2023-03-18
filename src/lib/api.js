import { formatDistanceToNow } from 'date-fns';

const getRepositories = async (user) => {
	if (!user) user = 'ninadepina';
	const url = `https://api.github.com/users/${user}/repos`;
	let data;

	try {
		data = await (await fetch(url)).json();

		const repositories = await Promise.all(
			data.map(async (repository) => {
				const { name, description, language, topics, pushed_at, license } = repository;
				const lastUpdated = formatDistanceToNow(new Date(pushed_at), { addSuffix: true });
				const lastUpdatedTime = pushed_at;
				const licenseName = license?.name || null;

				return {
					name,
					description,
					language,
					topics,
					license: licenseName,
					lastUpdated,
					lastUpdatedTime
				};
			})
		);
		// sort repos descending by last updated
		repositories.sort((a, b) => new Date(b.lastUpdatedTime) - new Date(a.lastUpdatedTime));
		return repositories;
	} catch (error) {
		console.error(error);
	}
};

const getUserInfo = async (user) => {
	if (sessionStorage.inputValue) user = sessionStorage.inputValue;
	if (!user) user = 'ninadepina';
	const url = `https://api.github.com/users/${user}`;
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
	const user = sessionStorage.inputValue || 'ninadepina';
	const url = `https://api.github.com/repos/${user}/${repoName}`;
	let data;

	try {
		data = await (await fetch(url)).json();
		const { name, owner, stargazers_count, watchers_count, forks, topics } = data;
		const lastUpdated = formatDistanceToNow(new Date(data.pushed_at), { addSuffix: true });
		const user = owner?.login;

		return {
			name,
			user,
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
	const user = sessionStorage.inputValue || 'ninadepina';
	const url = `https://api.github.com/repos/${user}/${repoName}/contents`;
	let data;

	try {
		data = await (await fetch(url)).json();
		const contents = data.map(({ name, type }) => ({ name, type }));
		return contents;
	} catch (error) {
		console.error(error);
	}
};

const getFileContents = async (repoName, fileName) => {
	fileName = fileName.substring(fileName.indexOf('/') + 1);
	const user = sessionStorage.inputValue || 'ninadepina';
	const url = `https://api.github.com/repos/${user}/${repoName}/contents/${fileName}`;
	let data;

	try {
		data = await (await fetch(url)).json();

		if (Array.isArray(data)) {
			return data.map((file) => ({
				name: file.name,
				type: file.type
			}));
		} else {
			return atob(data.content);
		}
	} catch (error) {
		console.error(error);
	}
};

const getCommitMessages = async (repoName) => {
	const user = sessionStorage.inputValue || 'ninadepina';
	const url = `https://api.github.com/repos/${user}/${repoName}/commits`;
	let data;

	try {
		data = await (await fetch(url)).json();
		const commitMessages = data.map((commit) => commit.commit.message);
		return commitMessages;
	} catch (error) {
		console.error(error);
	}
};

const getLanguages = async (repoName) => {
	const user = sessionStorage.inputValue || 'ninadepina';
	const url = `https://api.github.com/repos/${user}/${repoName}/languages`;
	let data;

	try {
		data = await (await fetch(url)).json();

		const totalBytes = Object.values(data).reduce((acc, val) => acc + val, 0);

		let languagePercentages;

		// check amount languages and adjust output accordingly
		if (Object.keys(data).length === 3) {
			languagePercentages = Object.entries(data).map(([key, value]) => ({
				language: key,
				percentage: ((value / totalBytes) * 100).toFixed(2)
			}));
		} else if (Object.keys(data).length >= 4) {
			// get the 2 most used languages
			const topLanguages = Object.entries(data)
				.sort((a, b) => b[1] - a[1])
				.slice(0, 2);

			// get total percentage 2 most used languages
			const topLanguagesTotal = topLanguages.reduce((acc, [_, value]) => acc + value, 0);

			// create 'other' object with remaining percentage
			languagePercentages = [
				...topLanguages.map(([key, value]) => ({
					language: key,
					percentage: ((value / totalBytes) * 100).toFixed(2)
				})),
				{ language: 'Other', percentage: (((totalBytes - topLanguagesTotal) / totalBytes) * 100).toFixed(2) }
			];
		} else {
			languagePercentages = [];
		}

		return languagePercentages;
	} catch (error) {
		console.error(error);
		return [];
	}
};

const getLanguageColors = async () => {
	const url = 'https://raw.githubusercontent.com/ozh/github-colors/master/colors.json';
	let data;

	try {
		data = await (await fetch(url)).json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

// prettier-ignore
export { getRepositories, getUserInfo, getRepoInfo, getRepoInfoContents, getFileContents, getCommitMessages, getLanguages, getLanguageColors };
