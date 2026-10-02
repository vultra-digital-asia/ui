<script lang="ts">
  import { ScreenOnboarding } from '@vultra/screens';
</script>

<div class="flex min-h-screen items-center justify-center bg-[var(--ui-secondary)]/20 p-4">
  <div class="w-full max-w-md">
    <ScreenOnboarding onComplete={() => (window.location.href = '/app')} />
  </div>
</div>
