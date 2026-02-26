<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	import animated404 from '$lib/assets/animated-404.gif';

	const errorStatus = $derived($page?.status ?? 500);
	const errorMessage = $derived($page?.error?.message ?? 'Something went wrong');

	const is404 = $derived(errorStatus === 404);
	const title = $derived(is404 ? "Look like you're lost" : 'Something went wrong');
	const subtitle = $derived(
		is404 ? "The page you are looking for is not available!" : errorMessage
	);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<section class="page-404" style="font-family: 'Arvo', serif;">
	<div class="error-container">
		<div class="error-content">
			<div class="four-zero-four-bg" style="background-image: url({animated404});">
				<h1 class="error-code">{errorStatus}</h1>
			</div>

			<div class="content-box-404">
				<h2 class="error-title">{title}</h2>
				<p class="error-message">{subtitle}</p>
				<Button href="/" size="lg">Go to Home</Button>
			</div>
		</div>
	</div>
</section>

<style>
	.page-404 {
		padding: 40px 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		background: var(--background);
	}

	.error-container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.four-zero-four-bg {
		height: 400px;
		width: 100%;
		max-width: 600px;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}

	.four-zero-four-bg .error-code {
		font-size: 80px;
		font-weight: 700;
		color: var(--foreground);
		margin: 0;
		line-height: 1;
	}

	.content-box-404 {
		margin-top: -50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.error-title {
		font-size: clamp(1.5rem, 4vw, 2rem);
		font-weight: 700;
		color: var(--foreground);
		margin: 0;
	}

	.error-message {
		color: var(--muted-foreground);
		margin: 0;
		max-width: 400px;
		line-height: 1.5;
	}

	.content-box-404 :global(a[data-slot="button"]) {
		margin-top: 20px;
	}
</style>
