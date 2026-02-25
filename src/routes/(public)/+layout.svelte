<script>
  import Header from "$lib/components/public/header.svelte";
  let { children } = $props();  
</script>
<Header />
{@render children?.()}