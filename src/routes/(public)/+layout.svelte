<script>
  import Header from "$lib/components/public/header.svelte";
  import Footer from "$lib/components/public/footer.svelte";
  let { children } = $props();  
</script>
<Header />
{@render children?.()}
<Footer />