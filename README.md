# 铲铲攻略站 · S16 英雄联盟传奇赛季

金铲铲之战 S16 赛季数据攻略网站，基于高段位实际对局统计，展示阵容、弈子、羁绊、符文、装备实时排行数据。

## 页面功能

| 页面 | 路径 | 内容 |
|------|------|------|
| 阵容排行 | `/` | 25 套热门阵容，含前四率、胜率、均名次、推荐装备与阵容图解 |
| 弈子排行 | `/heroes` | 134 名弈子强度排行，按费用筛选，含羁绊标签与推荐装备 |
| 羁绊排行 | `/traits` | 113 条羁绊体系，A-Z 排序，含激活人数与趋势 |
| 符文排行 | `/runes` | 海克斯强化选择，按银色/金色/棱彩色筛选 |
| 装备排行 | `/equipment` | 201 件装备，按类型筛选，含常见弈子搭配 |

## 技术栈

- **React 19 + Vite** — 前端框架与构建工具
- **TypeScript** — 类型安全
- **Tailwind CSS v4** — 样式
- **Framer Motion** — 动画
- **pnpm workspace** — Monorepo 管理

## 项目结构

```
artifacts/jcc-guide/
├── src/
│   ├── pages/          # 五个页面组件
│   │   ├── LineupsPage.tsx
│   │   ├── HeroesPage.tsx
│   │   ├── TraitsPage.tsx
│   │   ├── RunesPage.tsx
│   │   └── EquipmentPage.tsx
│   ├── components/
│   │   ├── LineupCard.tsx      # 阵容卡片
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── lib/
│   │   ├── data.ts             # 数据加载与处理
│   │   ├── types.ts            # TypeScript 类型定义
│   │   ├── emblems.ts          # 羁绊徽章图片映射
│   │   └── utils.ts
│   └── context/
│       └── AppContext.tsx      # 全局搜索状态
attached_assets/
├── 1_阵容排行.json
├── 2_弈子排行.json
├── 3_羁绊排行.json
├── 4_符文排行.json
└── 5_装备排行.json
```

## 数据说明

所有数据来自 `attached_assets/` 目录下的 5 个 JSON 文件，均为真实高段位对局统计，不含模拟数据。

- `pickRate_4`：前四率
- `pickRate_1`：胜率（第一名率）
- `avgRanking`：平均名次
- `trend`：趋势（up / down / stable）

## 本地开发

```bash
pnpm install
pnpm --filter @workspace/jcc-guide run dev
```

## 主题设计

暖金色调浅色主题，Tier 颜色：

- **S 神级** — 橙红 `#FF6B35`
- **A 强势** — 琥珀 `#F5A623`
- **B 稳健** — 绿色 `#7ED321`
- **C 一般** — 蓝色 `#4A90E2`
