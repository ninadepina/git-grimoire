import { formatDistanceToNow } from 'date-fns';

export async function getRepositories() {
	const url = 'https://api.github.com/users/ninadepina/repos';
	let data;

	try {
		data = await (await fetch(url)).json();
		const repositories = data.map((repository) => {
			const lastUpdated = formatDistanceToNow(new Date(repository.updated_at), { addSuffix: true });

			return {
				name: repository.name,
				description: repository.description,
				language: repository.language,
				topics: repository.topics,
				license: repository.license ? repository.license.name : null,
				lastUpdated
			};
		});
		const repositoriesData = await Promise.all(repositories);
		return repositoriesData;
	} catch (error) {
		console.error(error);
	}
}

export async function getUserInfo() {
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
}
