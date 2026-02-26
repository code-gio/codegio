import { json } from '@sveltejs/kit';
import { getPosts } from '$lib/blog/posts';

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
