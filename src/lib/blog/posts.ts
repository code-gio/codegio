import type { Post } from '$lib/types/blog';

export async function getPosts(): Promise<Post[]> {
	const paths = import.meta.glob<{ metadata: Omit<Post, 'slug'> }>('../../posts/*.md', {
		eager: true
	});

	const posts: Post[] = [];

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata;
			const post: Post = {
				...metadata,
				slug,
				published: metadata.published ?? false
			};
			if (post.published) {
				posts.push(post);
			}
		}
	}
	posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}
