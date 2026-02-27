import { error } from '@sveltejs/kit';
import { getPosts } from '$lib/blog/posts';

export async function load({ params }) {
	try {
		const post = await import(`../../../../posts/${params.slug}.md`);

		if (!post.metadata) {
			error(404, `Could not find post: ${params.slug}`);
		}

		const allPosts = await getPosts();
		const relatedPosts = allPosts
			.filter((p) => p.slug !== params.slug)
			.slice(0, 3);
		return {
			content: post.default,
			meta: post.metadata,
			slug: params.slug,
			relatedPosts
		};
	} catch {
		error(404, `Could not find post: ${params.slug}`);
	}
}
