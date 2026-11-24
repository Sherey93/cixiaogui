<template>
  <section class="status" :class="{ redline }" role="status" aria-live="polite">
    <div v-if="tags.length" class="tags">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <SceneBar
      :date-text="dateText"
      :clock="世界.时刻"
      :scene="世界.场景"
      :mother-place="妈妈.位置"
    />

    <div class="grid">
      <MotherStrip
        :place="妈妈.位置"
        :state="妈妈.状态"
        :line="妈妈.妈妈线"
        :depth="妈妈.感情深度"
      />
      <SisterStrip
        :stage="妹妹.阶段"
        :jealousy="妹妹.醋劲"
        :present="妹妹.在场"
      />
    </div>

    <section class="pay" aria-label="报酬阶梯">
      <div class="pay-head">
        <span class="pay-title">报酬阶梯</span>
        <span class="pay-note">付过一格才抬一格</span>
      </div>
      <PaymentLadder :steps="LADDER" :current="ladderIndex" />
    </section>

    <RiskRow :outsider="风险.外人察觉" :suspicion="风险.妈妈起疑" />

    <details class="behind">
      <summary>
        <span class="behind-title">幕后</span>
        <span class="behind-meta">信任 {{ 妈妈.对女儿信任 }} · 手法 {{ openedMethods }}/5</span>
      </summary>
      <div class="behind-body">
        <BarMeter
          label="妈妈对女儿的信任"
          :value="妈妈.对女儿信任"
          tone="--c-mother"
          :caption="trustNote"
        />
        <MethodLights :on="操盘" />
      </div>
    </details>
  </section>
</template>

<script setup lang="ts">
import BarMeter from './components/BarMeter.vue';
import MethodLights from './components/MethodLights.vue';
import MotherStrip from './components/MotherStrip.vue';
import PaymentLadder from './components/PaymentLadder.vue';
import RiskRow from './components/RiskRow.vue';
import SceneBar from './components/SceneBar.vue';
import SisterStrip from './components/SisterStrip.vue';
import { 数据 } from './store';

const 世界 = computed(() => 数据.value.世界);
const 妈妈 = computed(() => 数据.value.妈妈);
const 妹妹 = computed(() => 数据.value.妹妹);
const 操盘 = computed(() => 数据.value.操盘);
const 风险 = computed(() => 数据.value.风险);

const LADDER = ['摸头', '抱一下', '亲脸', '亲嘴', '陪我睡', '要我'] as const;
const ladderIndex = computed(() =>
  Math.max(0, LADDER.indexOf(妹妹.value.报酬阶梯 as (typeof LADDER)[number])),
);

const dateText = computed(() => {
  const 月日 = 世界.value.日期.split('/').slice(-2).join('/');
  return 世界.value.星期 ? `${月日} 周${世界.value.星期}` : 月日;
});

const openedMethods = computed(() => Object.values(操盘.value).filter(Boolean).length);

const trustNote = computed(() => {
  const 值 = 妈妈.value.对女儿信任;
  if (值 < 40) return '她开始防着这个女儿了';
  if (值 < 70) return '一半信一半疑';
  return '她把这女儿当贴心小棉袄';
});

const tags = computed(() => {
  const 结果: string[] = [];
  if (妈妈.value.妈妈线 === '越线') 结果.push('她迈过去了');
  if (妹妹.value.阶段 === '三个人') 结果.push('三个人');
  return 结果;
});

const redline = computed(() => 妈妈.value.妈妈线 === '越线' || 妹妹.value.阶段 === '三个人');
</script>

<style scoped>
.status {
  position: relative;
  margin: 10px 0;
  border: 1px solid var(--c-border);
  border-radius: 14px;
  background:
    radial-gradient(120% 140% at 0% 0%, #1e1814 0%, #171310 55%, #110e0c 100%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 4%),
    0 6px 18px rgb(0 0 0 / 38%);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--c-text);
  overflow: hidden;
  transition:
    border-color 0.6s ease,
    box-shadow 0.6s ease;
}

.status.redline {
  border-color: color-mix(in srgb, var(--c-alarm) 38%, var(--c-border));
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--c-alarm) 30%, transparent),
    0 6px 20px rgb(0 0 0 / 42%);
}

.tags {
  display: flex;
  gap: 6px;
  padding: 8px 12px 0;
}

.tag {
  padding: 1px 7px 2px;
  border: 1px solid color-mix(in srgb, var(--c-alarm) 45%, transparent);
  border-radius: 999px;
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--c-alarm);
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  padding: 9px 12px 0;
}

@media (max-width: 520px) {
  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

.pay {
  margin: 10px 12px 0;
  padding: 8px 10px 9px;
  border: 1px solid var(--c-border);
  border-radius: 9px;
  background: var(--c-surface-sunken);
}

.pay-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 7px;
}

.pay-title {
  font-size: 11.5px;
  letter-spacing: 0.1em;
  color: var(--c-ladder);
}

.pay-note {
  margin-left: auto;
  font-size: 10.5px;
  color: var(--c-text-dim);
}

.behind {
  margin: 10px 12px 11px;
  padding-top: 7px;
  border-top: 1px solid var(--c-border);
}

.behind summary {
  display: flex;
  align-items: baseline;
  gap: 7px;
  list-style: none;
  cursor: pointer;
  font-size: 11.5px;
  color: var(--c-text-muted);
}

.behind summary::-webkit-details-marker {
  display: none;
}

.behind summary::before {
  content: '▸';
  font-size: 9px;
  color: var(--c-text-dim);
  transition: transform 0.2s ease;
}

.behind[open] summary::before {
  content: '▾';
}

.behind summary:hover {
  color: var(--c-text);
}

.behind-title {
  letter-spacing: 0.1em;
}

.behind-meta {
  margin-left: auto;
  font-family: var(--font-num);
  font-size: 11px;
  color: var(--c-text-dim);
}

.behind-body {
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 9px 0 2px;
}
</style>
