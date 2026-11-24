import { Schema } from '../../schema';

export type StatData = z.output<typeof Schema>;

/** 界面只看自己这一层楼的数据：同一段聊天里每一层的状态栏显示的是那一刻的账 */
const 楼层变量 = { type: 'message', message_id: getCurrentMessageId() } as VariableOption;

/** 先按 schema 的 prefault 填一份默认值，等真数据落表再换掉，绝不出现空白格 */
export const 数据 = ref<StatData>(Schema.parse({}));

let 已挂了事件 = false;

function 读一次() {
  const 原始 = _.get(getVariables(楼层变量), 'stat_data', {});
  const 结果 = Schema.safeParse(原始);
  if (结果.success) {
    数据.value = 结果.data;
  }
}

export function 开始同步() {
  读一次();

  if (!已挂了事件) {
    已挂了事件 = true;
    // MVU 把这一层的变量改完时立刻重画
    errorCatched(() => eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, 读一次))();
    // 楼层被编辑或重新渲染时也重画
    errorCatched(() =>
      eventOn(tavern_events.MESSAGE_UPDATED, () => {
        读一次();
      }),
    )();
  }

  // 刚打开时 MVU 可能还在写，先快读两秒半；之后放慢，避免每一层都长期空转
  let 快读次数 = 0;
  const 快读 = setInterval(() => {
    读一次();
    快读次数 += 1;
    if (快读次数 >= 5) {
      clearInterval(快读);
      setInterval(读一次, 5000);
    }
  }, 500);
}
