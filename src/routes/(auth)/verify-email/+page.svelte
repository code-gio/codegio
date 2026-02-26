<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { IconChevronRight } from "@tabler/icons-svelte";
  import { page } from "$app/stores";
  import { toast } from "svelte-sonner";

  // Get email from URL params and store it
  let email = $state($page.url.searchParams.get("email") ?? "");

  let isResending = $state(false);
  let emailSent = $state(false);
  let resendTimer = $state(0);
  let canResend = $state(true);

  function startResendTimer() {
    emailSent = true;
    canResend = false;
    resendTimer = 60;

    const timer = setInterval(() => {
      resendTimer--;
      if (resendTimer <= 0) {
        clearInterval(timer);
        canResend = true;
      }
    }, 1000);
  }

  function formatTimer(seconds: number): string {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  }

  async function handleResend() {
    if (!email) {
      toast.error("No email address found");
      return;
    }

    try {
      isResending = true;

      const response = await fetch("/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to resend verification email"
        );
      }

      toast.success("Verification email sent successfully");
      startResendTimer();
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification email"
      );
    } finally {
      isResending = false;
    }
  }
</script>

<div class="w-full space-y-6">
  <div class="space-y-2 text-center">
    <h1 class="text-2xl font-semibold text-foreground">Verify your email</h1>
    <p class="text-sm text-muted-foreground">
      We've sent a link to your email address:
      <span class="font-semibold text-primary">{email}</span>
      Please follow the link inside to continue.
      {#if !canResend}
        <br />
        You can request another link in {formatTimer(resendTimer)}
      {/if}
    </p>
  </div>

  <div class="flex flex-col items-center gap-3">
    <p class="text-sm text-muted-foreground">
      Didn't receive an email?
      <Button
        variant="link"
        class="p-0 gap-0"
        onclick={handleResend}
        disabled={isResending}
      >
        {#if isResending}
          <span class="opacity-50">Sending...</span>
        {:else if emailSent && canResend}
          Send another link
        {:else if emailSent}
          Wait to resend
        {:else}
          Resend
          <IconChevronRight size={16} />
        {/if}
      </Button>
    </p>
    <Button href="/" variant="link">Return Home</Button>
  </div>
</div>
