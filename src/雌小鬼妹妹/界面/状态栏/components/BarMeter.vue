<template>
  <div class="meter">
    <div class="head">
      <span class="label">{{ label }}</span>
      <span class="value">{{ value }}</span>
    </div>
    <div class="track">
      <div class="fill" :style="{ width: `${clamped}%`, background: fill }"></div>
      <span
        v-for="mark in marks"
        :key="mark"
        class="mark"
        :class="{ passed: value >= mark }"
        :style="{ left: `${mark}%` }"
      ></span>
    </div>
    <p v-if="caption" class="caption">{{ caption }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value: number;
  tone: string;
  marks?: readonly number[];
  caption?: string;
}>();

const clamped = computed(() => _.clamp(Math.round(props.value), 0, 100));

/** 填到一半就换颜色：数字一过档，整条尺子跟着变 */
const fill = computed(() => {
  if (props.tone !== '--c-suspicion' && props.tone !== '--c-watch') {
    return `var(${props.tone})`;
  }
  const 高 = props.marks?.length ? props.marks[props.marks.length - 1] : 80;
  const 中 = props.marks?.length ? props.marks[Math.max(0, props.marks.length - 2)] : 50;
  if (props.value >= 高) return 'var(--c-alarm)';
  if (props.value >= 中) return 'var(--c-warn)';
  return `var(${props.tone})`;
});
</script>

<style scoped>
.meter {
  min-width: 0;
}

.head {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.label {
  font-size: 11.5px;
  color: var(--c-text-muted);
  white-space: nowrap;
}

.value {
  margin-left: auto;
  font-family: var(--font-num);
  font-size: 12px;
  color: var(--c-text);
  font-variant-numeric: tabular-nums;
}

.track {
  position: relative;
  height: 5px;
  margin-top: 4px;
  border-radius: 3px;
  background: var(--c-surface-sunken);
  box-shadow: inset 0 0 0 1px var(--c-border);
  overflow: visible;
}

.fill {
  height: 100%;
  border-radius: 3px;
  transition:
    width 0.6s ease,
    background 0.6s ease;
}

.mark {
  position: absolute;
  top: -2px;
  width: 1px;
  height: 9px;
  background: var(--c-border);
}

.mark.passed {
  background: color-mix(in srgb, var(--c-text-muted) 60%, transparent);
}

.caption {
  margin: 5px 0 0;
  font-size: 11px;
  line-height: 1.45;
  color: var(--c-text-muted);
}
</style>
