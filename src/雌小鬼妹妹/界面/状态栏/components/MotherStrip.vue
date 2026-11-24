<template>
  <section class="strip mother">
    <div class="head">
      <span class="who">妈妈</span>
      <span class="where">{{ placeText }} · {{ state }}</span>
    </div>

    <EscalationScale
      :steps="LINE"
      :current="lineIndex"
      tone="mother"
      aria-label="妈妈线：无防备 / 动摇 / 默许 / 越线"
    />

    <BarMeter label="感情深度" :value="depth" tone="--c-mother" :caption="depthNote" />
  </section>
</template>

<script setup lang="ts">
import BarMeter from './BarMeter.vue';
import EscalationScale from './EscalationScale.vue';

const props = defineProps<{
  place: string;
  state: string;
  line: string;
  depth: number;
}>();

const LINE = ['无防备', '动摇', '默许', '越线'] as const;

const 位置表: Record<string, string> = {
  在美容院: '店里',
  在回家路上: '回来路上',
  刚进门: '刚进门',
  客厅: '客厅',
  卫生间: '卫生间',
  她的房间: '她房里',
};

const placeText = computed(() => 位置表[props.place] ?? props.place);

const lineIndex = computed(() => Math.max(0, LINE.indexOf(props.line as (typeof LINE)[number])));

const depthNote = computed(() => {
  const 值 = props.depth;
  if (值 < 30) return '她把他当儿子护着';
  if (值 < 60) return '她开始拿他当个男人看了';
  if (值 < 85) return '她心里给他留了位置';
  return '她放不下了';
});
</script>

<style scoped>
.strip {
  min-width: 0;
  padding: 9px 11px 10px;
  background: var(--c-surface-raised);
  border: 1px solid var(--c-border);
  border-radius: 9px;
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
  color: var(--c-mother);
  white-space: nowrap;
}

.where {
  font-size: 11.5px;
  color: var(--c-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mother :deep(.meter) {
  margin-top: 9px;
}
</style>
