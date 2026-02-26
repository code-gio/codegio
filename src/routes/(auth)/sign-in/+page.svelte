<script lang="ts">
  import SignInForm from "$lib/components/auth/sign-in-form.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { IconSparkles } from "@tabler/icons-svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-foreground">Sign In</h1>
    <p class="text-sm text-muted-foreground">
      Don't have an account yet?
      <Button variant="link" href="/sign-up" class="p-0">Sign up here</Button>
    </p>
  </div>
  <div class="space-y-5">
    <Button href="/magic-link" class="w-full" variant="outline">
      <IconSparkles />
      Sign in with magic link
    </Button>
    <div
      class="before:muted-foreground after:muted-foreground flex items-center text-xs uppercase text-muted-foreground before:me-6 before:flex-1 before:border-t after:ms-6 after:flex-1 after:border-t dark:before:border-muted-foreground dark:after:border-muted-foreground"
    >
      Or
    </div>

    <SignInForm data={data.form} />
  </div>
</div>
