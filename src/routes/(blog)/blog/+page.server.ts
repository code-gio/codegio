import { getPosts } from '$lib/blog/posts';

export async function load() {
	const posts = await getPosts();
	return { posts };
}
