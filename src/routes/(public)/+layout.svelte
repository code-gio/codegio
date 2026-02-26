<script>
  import { page } from '$app/stores';
  import Header from "$lib/components/public/header.svelte";
  import Footer from "$lib/components/public/footer.svelte";
  let { children } = $props();
  const isHome = $derived($page?.url?.pathname === '/');
</script>
{#if isHome}
  <div class="dark text-foreground bg-background min-h-screen">
    <Header />
    {@render children?.()}
    <Footer />
  </div>
{:else}
  <Header />
  {@render children?.()}
  <Footer />
{/if}