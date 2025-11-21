# 🐾 LUXE FURSUIT | 高级兽装定制官网

> "Awaken Your Inner Soul" - 唤醒灵魂的另一面

这是一个为虚拟的高端兽装（Fursuit）工作室设计的静态官方网站。项目采用纯 HTML、CSS 和 JavaScript 编写，注重高端视觉体验、交互动效与移动端适配。

## 🌐 在线预览 (Live Demo)

**[点击这里访问网站](https://HPC-lori.github.io/luxe-fursuit/)**

## ✨ 项目亮点

* **极简轻奢设计**: 采用黑金（Black & Gold）配色，配合磨砂玻璃（Glassmorphism）导航栏，营造高端品牌感。
* **丝滑交互体验**:
    * 🖱️ **自定义光标**: 桌面端拥有高性能的平滑跟随光圈（Lerp算法）。
    * 🌊 **滚动视差**: 页面元素随滚动渐显入场。
    * ✨ **流光文字**: 品牌 Logo 带有优雅的流光动画。
* **功能模块**:
    * **作品画廊**: 支持按风格（写实、日系、部件）进行即时筛选。
    * **用户系统（模拟）**: 包含完整的登录弹窗 UI、表单验证逻辑及登录后的状态持久化（使用 LocalStorage）。
    * **多语言支持**: 支持中/英（CN/EN）一键切换。
    * **响应式布局**: 完美适配手机与桌面端设备。

## 🛠️ 技术栈

* **HTML5**: 语义化标签结构。
* **CSS3**: Flexbox/Grid 布局, CSS 变量, Keyframes 动画, 媒体查询。
* **JavaScript (Vanilla)**: 原生 JS 实现所有逻辑，无第三方库依赖（jQuery-free）。

## 📂 文件结构

```text
luxe-fursuit/
├── index.html      # 首页 - 品牌展示与设计哲学
├── gallery.html    # 作品赏析 - 含分类筛选功能
├── process.html    # 定制流程 - 时间轴与价格表
├── inquiry.html    # 登记数据 - 限制访问表单
├── style.css       # 全局样式表 - 包含所有视觉设计
├── script.js       # 核心逻辑 - 弹窗、动效、登录、多语言
└── README.md       # 项目说明文档