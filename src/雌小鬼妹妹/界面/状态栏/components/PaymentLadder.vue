<template>
  <div class="ladder" role="list" aria-label="报酬阶梯">
    <span
      v-for="(step, index) in steps"
      :key="step"
      class="cell"
      :class="{ paid: index < current, open: index === current }"
      role="listitem"
      :title="index < current ? `${step} —— 已经付过` : index === current ? `${step} —— 她这一级还没到手` : `${step} —— 还没开到这个价`"
    >
      <span class="cell-name">{{ step }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  steps: readonly string[];
  current: number;
}>();
</script>

<style scoped>
/* 她拍在茶几上的那张账单：付过的被划掉，当前那一格是实的，没付的是空的 */
.ladder {
  display: flex;
  gap: 3px;
}

.cell {
  position: relative;
  flex: 1;
  min-width: 0;
  padding: 3px 1px 4px;
  border: 1px dashed var(--c-border);
  border-radius: 5px;
  background: var(--c-surface-sunken);
  text-align: center;
  color: var(--c-text-dim);
}

.cell-name {
  display: block;
  font-size: 10.5px;
  line-height: 1.25;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell.paid {
  border-style: solid;
  border-color: #40352d;
  background: var(--c-surface-raised);
  color: var(--c-text-muted);
}

.cell.paid .cell-name {
  opacity: 0.75;
}

.cell.paid::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 12%;
  right: 12%;
  height: 1px;
  background: var(--c-ladder);
  opacity: 0.6;
  transform: rotate(-5deg);
}

.cell.open {
  border-style: solid;
  border-color: var(--c-ladder);
  background: color-mix(in srgb, var(--c-ladder) 13%, var(--c-surface));
  color: var(--c-ladder);
}

.cell.open .cell-name {
  font-weight: 700;
}

@media (max-width: 520px) {
  .ladder {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
  }
}
</style>
