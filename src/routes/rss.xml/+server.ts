import { siteConfig } from '$lib/config';
import { getPosts } from '$lib/blog/posts';

export async function GET() {
	const posts = await getPosts();
	const baseUrl = siteConfig.url.replace(/\/$/, '');

	const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${escapeXml(siteConfig.title)}</title>
				<description>${escapeXml(siteConfig.description)}</description>
				<link>${baseUrl}</link>
				<atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
					.map(
						(post) => `
					<item>
						<title>${escapeXml(post.title)}</title>
						<description>${escapeXml(post.description)}</description>
						<link>${baseUrl}/blog/${post.slug}</link>
						<guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
						<pubDate>${new Date(post.date).toUTCString()}</pubDate>
					</item>
				`
					)
					.join('')}
			</channel>
		</rss>
	`.trim();

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}
