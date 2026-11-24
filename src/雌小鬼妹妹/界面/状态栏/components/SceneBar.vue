<template>
  <header class="bar">
    <div class="left">
      <span class="date">{{ dateText }}</span>
      <span class="scene">{{ scene }}</span>
    </div>
    <div class="clock">{{ clock }}</div>
    <div class="flag" :class="`flag--${doorTone}`" :title="doorHint">
      <i class="dot"></i>
      <span class="flag-text">{{ doorText }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  dateText: string;
  clock: string;
  scene: string;
  motherPlace: string;
}>();

const 门 = computed(() => {
  switch (props.motherPlace) {
    case '在美容院':
      return { text: '门还没响', tone: 'dim', hint: '她在店里，八点打烊' };
    case '在回家路上':
      return { text: '门快响了', tone: 'warn', hint: '店已打烊，她在回来的路上' };
    case '刚进门':
      return { text: '门刚响过', tone: 'hot', hint: '她刚进门，正在换鞋' };
    default:
      return { text: '人在屋里', tone: 'calm', hint: '她就在这间屋子里' };
  }
});

const doorText = computed(() => 门.value.text);
const doorTone = computed(() => 门.value.tone);
const doorHint = computed(() => 门.value.hint);
</script>

<style scoped>
.bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
  padding: 9px 12px 8px;
  border-bottom: 1px solid var(--c-border);
}

.left {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}

.date {
  font-family: var(--font-num);
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--c-text-muted);
  white-space: nowrap;
}

.scene {
  padding: 1px 7px 2px;
  border: 1px solid var(--c-border);
  border-radius: 999px;
  background: var(--c-surface-raised);
  font-size: 11.5px;
  color: var(--c-text);
  white-space: nowrap;
}

.clock {
  font-family: var(--font-num);
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0.04em;
  color: var(--c-text);
  font-variant-numeric: tabular-nums;
}

.flag {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  min-width: 0;
  font-size: 11.5px;
  color: var(--c-text-dim);
}

.flag-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentcolor;
  flex: none;
}

.flag--dim {
  color: var(--c-text-dim);
}

.flag--warn {
  color: var(--c-warn);
}

.flag--warn .dot {
  box-shadow: 0 0 7px rgb(217 160 60 / 65%);
  animation: breathe 2.4s ease-in-out infinite;
}

.flag--hot {
  color: var(--c-alarm);
}

.flag--hot .dot {
  box-shadow: 0 0 8px rgb(212 92 78 / 70%);
}

.flag--calm {
  color: var(--c-safe);
}

@keyframes breathe {
  50% {
    opacity: 0.35;
  }
}

@media (prefers-reduced-motion: reduce) {
  .flag--warn .dot {
    animation: none;
  }
}
</style>
