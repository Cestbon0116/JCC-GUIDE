import { useState, useMemo } from "react";
import { allRunes, getTier } from "@/lib/data";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  S: { bg: "bg-[#FF6B35]/10", text: "text-[#FF6B35]", border: "border-[#FF6B35]/30", label: "神级" },
  A: { bg: "bg-[#F5A623]/10", text: "text-[#F5A623]", border: "border-[#F5A623]/30", label: "强势" },
  B: { bg: "bg-[#7ED321]/10", text: "text-[#7ED321]", border: "border-[#7ED321]/30", label: "稳健" },
  C: { bg: "bg-[#4A90E2]/10", text: "text-[#4A90E2]", border: "border-[#4A90E2]/30", label: "一般" },
};

const COLOR_TYPE_LABELS: Record<number, string> = {
  1: "金色",
  2: "银色",
  3: "铜色",
};

export default function RunesPage() {
  const [search, setSearch] = useState("");
  const [colorFilter, setColorFilter] = useState<number | "all">("all");

  const filteredRunes = useMemo(() => {
    return allRunes.filter(r => {
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
      const colorType = r.extraData?.colorType ?? 0;
      const matchColor = colorFilter === "all" || colorType === colorFilter;
      return matchSearch && matchColor;
    });
  }, [search, colorFilter]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-foreground">符文<span className="text-primary">排行</span></h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">海克斯强化选择优先级统计，按前四率排序。</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Color Filter */}
          <div className="flex gap-2 bg-secondary p-1 rounded-xl border border-border">
            <button
              onClick={() => setColorFilter("all")}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", colorFilter === "all" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >全部</button>
            {[1, 2, 3].map(ct => (
              <button
                key={ct}
                onClick={() => setColorFilter(ct)}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all", colorFilter === ct ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {COLOR_TYPE_LABELS[ct]}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索符文..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRunes.map((rune, idx) => {
          const tier = getTier({ pickRate_4: rune.pickRate_4, pickRate_1: rune.pickRate_1 });
          const tierStyle = TIER_STYLES[tier];
          const trend = rune.trend;
          const desc = rune.extraData?.desc ?? "";
          const colorType = rune.extraData?.colorType ?? 0;
          const colorLabel = COLOR_TYPE_LABELS[colorType] ?? "";

          return (
            <motion.div
              key={rune.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.03, 0.3) }}
              className="bg-card rounded-2xl border border-border p-4 flex gap-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl shrink-0 overflow-hidden border border-border shadow-sm bg-secondary group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                {rune.img ? (
                  <img src={rune.img} alt={rune.name} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                ) : (
                  <span className="text-2xl">✦</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + Tier */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">{rune.name}</h3>
                  <div className="flex flex-col gap-1 items-end shrink-0">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", tierStyle.bg, tierStyle.text, tierStyle.border)}>
                      {tier} {tierStyle.label}
                    </span>
                    {colorLabel && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-primary border border-primary/20 font-medium">
                        {colorLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {desc && (
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mb-2">{desc}</p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-center bg-secondary rounded px-1 py-1.5">
                    <div className="text-[11px] font-bold text-foreground">{rune.pickRate_4.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground">前四率</div>
                  </div>
                  <div className="text-center bg-secondary rounded px-1 py-1.5">
                    <div className="text-[11px] font-bold text-foreground">{rune.pickRate_1.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground">胜率</div>
                  </div>
                  <div className="text-center bg-secondary rounded px-1 py-1.5">
                    <div className="text-[11px] font-bold text-foreground">{rune.avgRanking.toFixed(2)}</div>
                    <div className="text-[9px] text-muted-foreground">均名次</div>
                  </div>
                </div>

                {/* Trend */}
                <div className="mt-2 flex items-center gap-1 text-[10px]">
                  {trend > 0 ? (
                    <><TrendingUp className="w-3 h-3 text-green-500" /><span className="text-green-600">上升</span></>
                  ) : trend < 0 ? (
                    <><TrendingDown className="w-3 h-3 text-red-500" /><span className="text-red-600">下降</span></>
                  ) : (
                    <><Minus className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">持平</span></>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredRunes.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的符文</p>
        </div>
      )}
    </div>
  );
}
