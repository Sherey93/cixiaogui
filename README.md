# 雌小鬼妹妹 · 前端资源

这张角色卡的**楼层内状态栏**就放在这里，酒馆里的角色卡通过 jsDelivr 读 `dist/` 里的文件渲染界面。

## 酒馆这边加载的地址

```
https://testingcf.jsdelivr.net/gh/Sherey93/cixiaogui/dist/雌小鬼妹妹/界面/状态栏/index.html
```

角色卡里的 `正则/状态栏界面.html` 就是按这个地址去 `$('body').load(...)` 的。

## 目录

```
dist/雌小鬼妹妹/界面/状态栏/index.html   ← 真正被加载的编译产物（单文件，自包含）
src/雌小鬼妹妹/                          ← 状态栏的 Vue 源码，留档用
  schema.ts                             ← MVU 变量结构（与角色卡项目里那份一致）
  界面/状态栏/                            ← App.vue + components/ + store.ts + global.css
```

## 改界面怎么更新

源码的正本在本地开发目录 `D:\ACARD\tavern_helper_template\src\雌小鬼妹妹\`，改完按下面三步走，别手改 `dist/`：

1. 编译：`node node_modules/webpack-cli/bin/cli.js --config webpack.dsh.mjs --mode production`
2. 把这个仓库的 `dist/雌小鬼妹妹/界面/状态栏/` 换成新的产物，提交推送
3. jsDelivr 有缓存，推完要么等它自己刷（约 12 小时），要么去 <https://www.jsdelivr.com/tools/purge> 把链接里的 `testingcf.` 换成 `cdn.` 后 purge 一下

## 注意

- 这个仓库只放前端资源，角色卡本身（世界书、变量、开场白）不在这里。
- `dist/` 的路径和文件名不要改，改了角色卡里的地址就失效。
