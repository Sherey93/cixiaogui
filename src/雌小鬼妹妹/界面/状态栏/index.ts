import App from './App.vue';
import './global.css';
import { 开始同步 } from './store';

/**
 * 两道就绪：MVU 框架先起，再等这一层的 stat_data 落表。
 * 这里不用 pinia、不用 async-wait-until —— 状态栏只读不写，带一份自包含的同步逻辑，
 * 打包后除酒馆助手预注入的 Vue / jQuery / lodash / zod 外不依赖任何外部链接。
 */
$(async () => {
  await waitGlobalInitialized('Mvu');

  const 楼层 = { type: 'message', message_id: getCurrentMessageId() } as VariableOption;
  const 起点 = Date.now();
  while (!_.has(getVariables(楼层), 'stat_data') && Date.now() - 起点 < 15000) {
    await new Promise(结束 => setTimeout(结束, 100));
  }

  开始同步();
  createApp(App).mount('#app');
  console.info('[雌小鬼妹妹] 状态栏已挂载');
});
