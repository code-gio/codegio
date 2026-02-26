<script lang="ts">
  import ForgotPasswordForm from "$lib/components/auth/forgot-password-form.svelte";
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-foreground">Forgot password?</h1>
    <p class="text-sm text-muted-foreground">
      Enter your email address and we'll send you a link to reset your
      password
    </p>
  </div>
  <ForgotPasswordForm data={data.form} />
</div>
