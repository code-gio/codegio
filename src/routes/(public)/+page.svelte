<script>
  import { siteConfig } from '$lib/config';
  import { Hero, Growth, MyApproach, WhatChanges, About, Videos, CTA } from '$lib/components/public/home';
</script>

<svelte:head>
  <title>{siteConfig.title} — {siteConfig.description}</title>
  <meta name="description" content={siteConfig.description} />
</svelte:head>

<Hero />
<Growth />
<MyApproach />
<WhatChanges />
<About />
<Videos />
<CTA />