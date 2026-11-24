<template>
  <section class="strip sister" :class="{ away: !present }">
    <div class="head">
      <span class="who">妹妹</span>
      <span class="where">{{ stage }}</span>
      <span class="presence" :class="{ off: !present }">{{ present ? '在视线里' : '不在视线里' }}</span>
    </div>

    <EscalationScale
      :steps="STAGES"
      :current="stageIndex"
      tone="sister"
      aria-label="妹妹阶段：试探 / 加码 / 要账 / 三个人"
      :pulse="stage === '要账'"
    />

    <BarMeter
      label="醋劲"
      :value="jealousy"
      tone="--c-sister"
      :marks="[31, 61, 86]"
      :caption="jealousyNote"
    />
  </section>
</template>

<script setup lang="ts">
import BarMeter from './BarMeter.vue';
import EscalationScale from './EscalationScale.vue';

const props = defineProps<{
  stage: string;
  jealousy: number;
  present: boolean;
}>();

const STAGES = ['试探', '加码', '要账', '三个人'] as const;

const stageIndex = computed(() => Math.max(0, STAGES.indexOf(props.stage as (typeof STAGES)[number])));

const jealousyNote = computed(() => {
  const 值 = props.jealousy;
  if (值 < 31) return '没在酸，嘴硬';
  if (值 < 61) return '开始当场插话';
  if (值 < 86) return '故意拆自己的局';
  return '公开地酸，但死不承认';
});
</script>

<style scoped>
.strip {
  min-width: 0;
  padding: 9px 11px 10px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-radius: 9px;
  transition: opacity 0.5s ease;
}

.away {
  opacity: 0.62;
}

.head {
  display: flex;
  align-items: baseline;
  gap: 7px;
  margin-bottom: 8px;
  min-width: 0;
}

.who {
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--c-sister);
  white-space: nowrap;
}

.where {
  font-size: 11.5px;
  color: var(--c-text);
  white-space: nowrap;
}

.presence {
  margin-left: auto;
  font-size: 10.5px;
  color: var(--c-sister);
  white-space: nowrap;
}

.presence.off {
  color: var(--c-text-dim);
}

.sister :deep(.meter) {
  margin-top: 9px;
}
</style>
