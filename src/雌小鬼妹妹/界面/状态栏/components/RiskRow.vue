<template>
  <section class="risk" aria-label="两条互相独立的风险">
    <BarMeter
      label="外人察觉"
      :value="outsider"
      tone="--c-watch"
      :marks="[30, 55, 80]"
      :caption="outsiderNote"
    />
    <BarMeter
      label="妈妈起疑"
      :value="suspicion"
      tone="--c-suspicion"
      :marks="[40, 65, 85]"
      :caption="suspicionNote"
    />
  </section>
</template>

<script setup lang="ts">
import BarMeter from './BarMeter.vue';

const props = defineProps<{
  outsider: number;
  suspicion: number;
}>();

const outsiderNote = computed(() => {
  const 值 = props.outsider;
  if (值 < 30) return '还没人往这边看';
  if (值 < 55) return '王姨在猫眼里多看了两眼';
  if (值 < 80) return '周姐已经开始问东问西';
  return '传言绕回了这家人耳朵里';
});

const suspicionNote = computed(() => {
  const 值 = props.suspicion;
  if (值 < 40) return '她还没留意';
  if (值 < 65) return '她开始留意女儿说的话';
  if (值 < 85) return '她会当面问一句';
  return '她明白过来了';
});
</script>

<style scoped>
.risk {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 14px;
  padding: 11px 12px 0;
}

@media (max-width: 520px) {
  .risk {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
}
</style>
