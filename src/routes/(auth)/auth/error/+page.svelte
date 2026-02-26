<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-destructive">
      Authentication Error
    </h1>
    <p class="text-sm text-muted-foreground">
      There was an error during the sign-in process. Please try again.
    </p>
  </div>
  <Button href="/sign-in" class="w-full">Go to Sign In</Button>
</div>
