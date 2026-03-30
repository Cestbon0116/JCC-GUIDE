import { useState, useMemo } from "react";
import { allTraits, getTier } from "@/lib/data";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  S: { bg: "bg-[#FF6B35]/10", text: "text-[#FF6B35]", border: "border-[#FF6B35]/30" },
  A: { bg: "bg-[#F5A623]/10", text: "text-[#F5A623]", border: "border-[#F5A623]/30" },
  B: { bg: "bg-[#7ED321]/10", text: "text-[#7ED321]", border: "border-[#7ED321]/30" },
  C: { bg: "bg-[#4A90E2]/10", text: "text-[#4A90E2]", border: "border-[#4A90E2]/30" },
};

// Emblem images from 装备排行 转职纹章 data
const EMBLEM_MAP: Record<string, string> = {
  "比尔吉沃特": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41601.png",
  "德玛西亚": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41602.png",
  "迅击战士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41621.png",
  "护卫": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41616.png",
  "主宰": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41619.png",
  "弗雷尔卓德": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41603.png",
  "法师": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41623.png",
  "斗士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41614.png",
  "征服者": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41624.png",
  "约德尔人": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41612.png",
  "艾欧尼亚": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41604.png",
  "诺克萨斯": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41606.png",
  "以绪塔尔": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41605.png",
  "皮尔特沃夫": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41607.png",
  "神盾使": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41625.png",
  "虚空": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41611.png",
  "神谕者": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41618.png",
  "祖安": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41613.png",
  "枪手": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41617.png",
  "狙神": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41620.png",
  "耀光使": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41615.png",
  "裁决战士": "https://game.gtimg.cn/images/lol/act/jkzlk/gamedata/equip/41622.png",
};

function getEmblemImg(traitName: string): string | null {
  // Strip leading number if format is "2 护卫" → "护卫"
  const key = traitName.replace(/^\d+\s+/, "").trim();
  return EMBLEM_MAP[key] ?? null;
}

export default function TraitsPage() {
  const [search, setSearch] = useState("");

  const filteredTraits = useMemo(() => {
    if (!search) return allTraits;
    const q = search.toLowerCase();
    return allTraits.filter(t => t.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-foreground">羁绊<span className="text-primary">排行</span></h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">查看当前版本最热门的羁绊体系，包含前四率与胜率数据。</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索羁绊..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTraits.map((trait, idx) => {
          const tier = getTier({ pickRate_4: trait.pickRate_4, pickRate_1: trait.pickRate_1 });
          const tierStyle = TIER_STYLES[tier];
          const trend = trait.trend;
          const numList = trait.numList ?? [];
          const emblemImg = getEmblemImg(trait.name);

          return (
            <motion.div 
              key={trait.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.04, 0.4) }}
              className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex items-start gap-4 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-border border border-border/80 shadow-inner flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-primary/40 transition-all duration-300 overflow-hidden">
                {emblemImg ? (
                  <img
                    src={emblemImg}
                    alt={trait.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentElement;
                      if (parent && trait.img) {
                        const fallback = document.createElement("img");
                        fallback.src = trait.img;
                        fallback.className = "w-8 h-8 object-contain";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : trait.img ? (
                  <img src={trait.img} alt={trait.name} className="w-8 h-8 object-contain" onError={e => (e.currentTarget.style.display = "none")} />
                ) : (
                  <span className="text-2xl">🔗</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + Tier */}
                <div className="flex items-center justify-between mb-1 gap-2">
                  <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">{trait.name}</h3>
                  <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold border shrink-0", tierStyle.bg, tierStyle.text, tierStyle.border)}>
                    {tier}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center bg-secondary rounded-lg p-2">
                    <div className="text-xs font-bold text-foreground">{trait.pickRate_4.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">前四率</div>
                  </div>
                  <div className="text-center bg-secondary rounded-lg p-2">
                    <div className="text-xs font-bold text-foreground">{trait.pickRate_1.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">胜率</div>
                  </div>
                  <div className="text-center bg-secondary rounded-lg p-2">
                    <div className="text-xs font-bold text-foreground">{trait.avgRanking.toFixed(2)}</div>
                    <div className="text-[9px] text-muted-foreground mt-0.5">平均名次</div>
                  </div>
                </div>

                {/* Trend + Num list */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px]">
                    {trend > 0 ? (
                      <><TrendingUp className="w-3 h-3 text-green-500" /><span className="text-green-600">上升趋势</span></>
                    ) : trend < 0 ? (
                      <><TrendingDown className="w-3 h-3 text-red-500" /><span className="text-red-600">下降趋势</span></>
                    ) : (
                      <><Minus className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">持平</span></>
                    )}
                  </div>
                  {numList.length > 0 && (
                    <div className="flex gap-1">
                      {numList.map((n, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-primary border border-primary/20 font-bold">
                          {n}人
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTraits.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的羁绊</p>
        </div>
      )}
    </div>
  );
}
