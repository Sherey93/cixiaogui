<template>
  <div class="scale" :class="`tone-${tone}`" role="list" :aria-label="ariaLabel">
    <span
      v-for="(step, index) in steps"
      :key="step"
      class="seg"
      :class="{
        done: index < current,
        now: index === current,
        pulse: pulse && index === current,
      }"
      role="listitem"
    >
      <i class="dot"></i>
      <span class="name">{{ step }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  steps: readonly string[];
  current: number;
  ariaLabel: string;
  tone: 'mother' | 'sister';
  pulse?: boolean;
}>();
</script>

<style scoped>
.scale {
  display: flex;
  align-items: flex-start;
  gap: 2px;
}

.tone-mother {
  --tone: var(--c-mother);
}

.tone-sister {
  --tone: var(--c-sister);
}

.seg {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--c-text-dim);
}

/* 刻度之间那条线：没走到的部分是暗的，走到的部分会被点亮 */
.seg::before {
  content: '';
  position: absolute;
  top: 3px;
  left: -50%;
  width: 100%;
  height: 1px;
  background: var(--c-border);
}

.seg:first-child::before {
  display: none;
}

.seg.done::before,
.seg.now::before {
  background: color-mix(in srgb, var(--tone) 55%, transparent);
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid currentcolor;
  background: transparent;
  z-index: 1;
}

.done {
  color: color-mix(in srgb, var(--tone) 62%, var(--c-text-dim));
}

.done .dot {
  background: currentcolor;
}

.now {
  color: var(--tone);
}

.now .dot {
  background: currentcolor;
  box-shadow: 0 0 8px currentcolor;
}

.now .name {
  color: var(--c-text);
}

.name {
  font-size: 11px;
  line-height: 1.2;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.pulse .dot {
  animation: beckon 2.6s ease-in-out infinite;
}

@keyframes beckon {
  50% {
    box-shadow: 0 0 13px var(--tone);
    transform: scale(1.18);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse .dot {
    animation: none;
  }
}
</style>
