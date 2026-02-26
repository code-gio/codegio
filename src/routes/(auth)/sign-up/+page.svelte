<script lang="ts">
  import SignUpForm from "$lib/components/auth/sign-up-form.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-foreground">Sign Up</h1>
    <p class="text-sm text-muted-foreground">
      Already have an account?
      <Button variant="link" href="/sign-in" class="p-0">Sign in here</Button>
    </p>
  </div>
  <div class="space-y-5">
    <div
      class="before:muted-foreground after:muted-foreground flex items-center text-xs uppercase text-muted-foreground before:me-6 before:flex-1 before:border-t after:ms-6 after:flex-1 after:border-t dark:before:border-muted-foreground dark:after:border-muted-foreground"
    >
      Or
    </div>

    <SignUpForm data={data.form} />
  </div>
</div>
