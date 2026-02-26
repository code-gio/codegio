<script lang="ts">
	import { siteConfig } from '$lib/config';
</script>

<footer class="mt-auto w-full border-t border-border/40 px-4 py-6">
	<div class="mx-auto max-w-3xl">
		<p class="text-center text-sm text-muted-foreground">
			<a href="/" class="hover:text-foreground">{siteConfig.title}</a>
			© {new Date().getFullYear()}. <a href="/rss.xml" class="hover:text-foreground">RSS</a>
		</p>
	</div>
</footer>
