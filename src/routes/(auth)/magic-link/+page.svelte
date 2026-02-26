<script lang="ts">
  import MagicLinkForm from "$lib/components/auth/magic-link-form.svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-foreground">
      Sign in via magic link
    </h1>
    <p class="text-sm text-muted-foreground">
      Enter your email and we'll send you a magic link to sign in.
    </p>
  </div>
  <MagicLinkForm data={data.form} />
</div>
