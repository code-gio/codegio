import adapter from '@sveltejs/adapter-auto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let highlighterInstance = null;

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			if (!highlighterInstance) {
				highlighterInstance = await createHighlighter({
					themes: ['github-dark'],
					langs: ['javascript', 'typescript', 'ts', 'js', 'json', 'html', 'css', 'bash', 'shell']
				});
			}
			const html = highlighterInstance.codeToHtml(code, {
				lang: lang || 'text',
				theme: 'github-dark'
			});
			return `{@html \`${escapeSvelte(html)}\`}`;
		}
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug],
	layout: {
		_: path.resolve(__dirname, 'src/mdsvex.svelte')
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [mdsvex(mdsvexOptions)],
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
