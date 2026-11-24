<template>
  <div class="lights" role="list" aria-label="五种手法的使用情况">
    <span
      v-for="item in 列表"
      :key="item.key"
      class="light"
      :class="{ on: item.on }"
      role="listitem"
      :title="item.on ? `${item.key} —— 用过，成了` : `${item.key} —— 还没用成过`"
    >
      <i class="bulb"></i>
      <span class="light-name">{{ item.key }}</span>
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  on: Record<string, boolean>;
}>();

const 名称 = ['破防衣着', '消除羞耻', '接触共处', '危机吃醋', '把风掩护'] as const;

const 列表 = computed(() =>
  名称.map(key => ({
    key,
    on: Boolean(props.on?.[key]),
  })),
);
</script>

<style scoped>
.lights {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 4px;
}

.light {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 2px;
  border: 1px solid var(--c-border);
  border-radius: 5px;
  background: var(--c-surface-sunken);
  color: var(--c-text-dim);
}

.light.on {
  border-color: color-mix(in srgb, var(--c-method-on) 45%, var(--c-border));
  background: color-mix(in srgb, var(--c-method-on) 10%, var(--c-surface));
  color: var(--c-method-on);
}

.bulb {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-method-off);
  flex: none;
}

.light.on .bulb {
  background: var(--c-method-on);
  box-shadow: 0 0 7px var(--c-method-on);
}

.light-name {
  font-size: 10.5px;
  white-space: nowrap;
}

@media (max-width: 520px) {
  .lights {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
