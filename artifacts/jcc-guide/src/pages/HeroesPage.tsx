import { useState, useMemo } from "react";
import { allHeroes, getTier } from "@/lib/data";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const COST_STYLES: Record<number, { border: string; badge: string }> = {
  1: { border: "border-gray-400", badge: "bg-gray-500 text-white" },
  2: { border: "border-green-500", badge: "bg-green-600 text-white" },
  3: { border: "border-blue-500", badge: "bg-blue-600 text-white" },
  4: { border: "border-purple-500", badge: "bg-purple-600 text-white" },
  5: { border: "border-amber-400", badge: "bg-amber-500 text-white" },
};

const TIER_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  S: { bg: "bg-[#FF6B35]/10", text: "text-[#FF6B35]", border: "border-[#FF6B35]/30" },
  A: { bg: "bg-[#F5A623]/10", text: "text-[#F5A623]", border: "border-[#F5A623]/30" },
  B: { bg: "bg-[#7ED321]/10", text: "text-[#7ED321]", border: "border-[#7ED321]/30" },
  C: { bg: "bg-[#4A90E2]/10", text: "text-[#4A90E2]", border: "border-[#4A90E2]/30" },
};

export default function HeroesPage() {
  const [search, setSearch] = useState("");
  const [costFilter, setCostFilter] = useState<number | "all">("all");

  const filteredHeroes = useMemo(() => {
    return allHeroes.filter((h) => {
      const matchSearch = !search || h.name.toLowerCase().includes(search.toLowerCase());
      const price = h.extraData?.price ?? 0;
      const matchCost = costFilter === "all" || price === costFilter;
      return matchSearch && matchCost;
    });
  }, [search, costFilter]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8">
        <h2 className="text-3xl font-display font-black text-foreground">弈子<span className="text-primary">排行</span></h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">当前版本弈子强度排行，包含前四率、胜率数据。</p>
        
        <div className="mt-8 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 bg-secondary p-1 rounded-xl border border-border">
            <button 
              onClick={() => setCostFilter("all")}
              className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", costFilter === "all" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
            >全部</button>
            {[1, 2, 3, 4, 5].map(cost => (
              <button 
                key={cost}
                onClick={() => setCostFilter(cost)}
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all", costFilter === cost ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground")}
              >
                {cost}费
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索弈子..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredHeroes.map((hero, idx) => {
          const price = hero.extraData?.price ?? 0;
          const costStyle = COST_STYLES[price] ?? COST_STYLES[1];
          const tier = getTier({ pickRate_4: hero.pickRate_4, pickRate_1: hero.pickRate_1 });
          const tierStyle = TIER_STYLES[tier];
          const equips = hero.extraData?.equipment ?? [];
          const traits = hero.extraData?.traitList ?? [];
          const trend = hero.trend;

          return (
            <motion.div 
              key={hero.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(idx * 0.02, 0.3) }}
              className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className={cn(
                "w-20 h-20 rounded-2xl border-[3px] overflow-hidden mb-3 relative bg-secondary shadow-md group-hover:scale-105 transition-transform duration-300",
                costStyle.border
              )}>
                <img src={hero.img} alt={hero.name} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                {price > 0 && (
                  <div className={cn("absolute bottom-1 right-1 font-bold text-[10px] px-1.5 py-0.5 rounded leading-none", costStyle.badge)}>
                    {price}
                  </div>
                )}
              </div>

              {/* Name + Tier */}
              <h3 className="font-bold text-foreground text-center line-clamp-1 group-hover:text-primary transition-colors mb-1">{hero.name}</h3>
              <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold border mb-2", tierStyle.bg, tierStyle.text, tierStyle.border)}>
                {tier} · 前四率 {hero.pickRate_4.toFixed(1)}%
              </span>

              {/* Stats */}
              <div className="w-full grid grid-cols-2 gap-1 text-[10px] text-muted-foreground">
                <div className="bg-secondary rounded px-1.5 py-1 text-center">
                  <span className="block text-foreground font-bold">{hero.pickRate_1.toFixed(1)}%</span>
                  胜率
                </div>
                <div className="bg-secondary rounded px-1.5 py-1 text-center">
                  <span className="block text-foreground font-bold">{hero.avgRanking.toFixed(2)}</span>
                  均名次
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

              {/* Traits */}
              {traits.length > 0 && (
                <div className="mt-3 w-full flex flex-wrap justify-center gap-1">
                  {traits.slice(0, 3).map((t, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-primary border border-primary/20 font-medium truncate max-w-[5rem]">
                      {t.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Equipment */}
              {equips.length > 0 && (
                <div className="mt-3 w-full">
                  <div className="text-[10px] text-muted-foreground text-center mb-1.5">推荐装备</div>
                  <div className="flex justify-center gap-1">
                    {equips.slice(0, 3).map((eq, i) => (
                      <img
                        key={i}
                        src={eq.img}
                        alt="装备"
                        className="w-6 h-6 rounded border border-border shadow-sm bg-secondary"
                        onError={e => (e.currentTarget.style.display = "none")}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredHeroes.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的弈子</p>
        </div>
      )}
    </div>
  );
}
