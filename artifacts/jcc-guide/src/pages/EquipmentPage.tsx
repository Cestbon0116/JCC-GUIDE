import { useState, useMemo } from "react";
import { allEquipments, getTier } from "@/lib/data";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  S: { bg: "bg-[#FF6B35]/10", text: "text-[#FF6B35]", border: "border-[#FF6B35]/30", label: "神级" },
  A: { bg: "bg-[#F5A623]/10", text: "text-[#F5A623]", border: "border-[#F5A623]/30", label: "强势" },
  B: { bg: "bg-[#7ED321]/10", text: "text-[#7ED321]", border: "border-[#7ED321]/30", label: "稳健" },
  C: { bg: "bg-[#4A90E2]/10", text: "text-[#4A90E2]", border: "border-[#4A90E2]/30", label: "一般" },
};

export default function EquipmentPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const allTypes = useMemo(() => {
    const types = new Set<string>();
    allEquipments.forEach(eq => {
      const t = eq.extraData?.type;
      if (t) types.add(t);
    });
    return Array.from(types);
  }, []);

  const filteredEquips = useMemo(() => {
    return allEquipments.filter(eq => {
      const matchSearch = !search || eq.name.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || eq.extraData?.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-foreground">装备<span className="text-primary">排行</span></h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">当前版本装备强度排行，含前四率与胜率数据。</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Type Filter */}
          {allTypes.length > 0 && (
            <div className="flex gap-2 bg-secondary p-1 rounded-xl border border-border overflow-x-auto no-scrollbar">
              <button
                onClick={() => setTypeFilter("all")}
                className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap", typeFilter === "all" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >全部</button>
              {allTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn("px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap", typeFilter === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索装备名称..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEquips.map((eq, idx) => {
          const tier = getTier({ pickRate_4: eq.pickRate_4, pickRate_1: eq.pickRate_1 });
          const tierStyle = TIER_STYLES[tier];
          const trend = eq.trend;
          const pieces = eq.extraData?.piece ?? [];
          const tags = eq.extraData?.tag ?? [];

          return (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(idx * 0.025, 0.3) }}
              className="bg-card rounded-2xl border border-border p-4 flex gap-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border shadow-sm bg-secondary group-hover:scale-105 transition-transform duration-300">
                {eq.img ? (
                  <img src={eq.img} alt={eq.name} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">⚔️</div>
                )}
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                {/* Name + Tier */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{eq.name}</h3>
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border shrink-0", tierStyle.bg, tierStyle.text, tierStyle.border)}>
                    {tier}
                  </span>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-2">
                    {tags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-primary border border-primary/20 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-1 mb-2">
                  <div className="text-center bg-secondary rounded px-1 py-1">
                    <div className="text-[10px] font-bold text-foreground">{eq.pickRate_4.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground">前四率</div>
                  </div>
                  <div className="text-center bg-secondary rounded px-1 py-1">
                    <div className="text-[10px] font-bold text-foreground">{eq.pickRate_1.toFixed(1)}%</div>
                    <div className="text-[9px] text-muted-foreground">胜率</div>
                  </div>
                  <div className="text-center bg-secondary rounded px-1 py-1">
                    <div className="text-[10px] font-bold text-foreground">{eq.avgRanking.toFixed(2)}</div>
                    <div className="text-[9px] text-muted-foreground">均名次</div>
                  </div>
                </div>

                {/* Recommended pieces + Trend */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px]">
                    {trend > 0 ? (
                      <><TrendingUp className="w-3 h-3 text-green-500" /><span className="text-green-600">上升</span></>
                    ) : trend < 0 ? (
                      <><TrendingDown className="w-3 h-3 text-red-500" /><span className="text-red-600">下降</span></>
                    ) : (
                      <><Minus className="w-3 h-3 text-muted-foreground" /><span className="text-muted-foreground">持平</span></>
                    )}
                  </div>
                  {pieces.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] text-muted-foreground">常见:</span>
                      {pieces.slice(0, 4).map((p, i) => (
                        <img
                          key={i}
                          src={p.img}
                          alt="弈子"
                          className="w-5 h-5 rounded-full border border-border"
                          onError={e => (e.currentTarget.style.display = "none")}
                        />
                      ))}
                      {pieces.length > 4 && (
                        <span className="text-[9px] bg-secondary px-1 py-0.5 rounded-full text-muted-foreground border border-border">
                          +{pieces.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEquips.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的装备</p>
        </div>
      )}
    </div>
  );
}
