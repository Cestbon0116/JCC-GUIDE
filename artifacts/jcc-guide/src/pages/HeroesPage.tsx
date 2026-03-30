import { useState, useMemo } from "react";
import { getUniqueHeroes } from "@/lib/data";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HeroesPage() {
  const [search, setSearch] = useState("");
  const [costFilter, setCostFilter] = useState<number | "all">("all");
  
  const heroes = useMemo(() => getUniqueHeroes(), []);

  const filteredHeroes = useMemo(() => {
    return heroes.filter(h => {
      const matchSearch = h.pieceName.includes(search);
      const matchCost = costFilter === "all" || h.price === costFilter;
      return matchSearch && matchCost;
    });
  }, [heroes, search, costFilter]);

  const costColors = {
    1: "border-gray-400 bg-gray-100 text-gray-700",
    2: "border-green-500 bg-green-50 text-green-700",
    3: "border-blue-500 bg-blue-50 text-blue-700",
    4: "border-purple-500 bg-purple-50 text-purple-700",
    5: "border-amber-500 bg-amber-50 text-amber-700",
  };

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8">
        <h2 className="text-3xl font-display font-black text-foreground">弈子<span className="text-primary">排行</span></h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">统计当前版本所有热门阵容中出现的弈子，了解核心卡牌强度。</p>
        
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
                className={cn("px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1", costFilter === cost ? "bg-card shadow-sm" : "text-muted-foreground hover:text-foreground")}
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
        {filteredHeroes.map((hero, idx) => (
          <motion.div 
            key={hero.pieceId}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.02 > 0.3 ? 0 : idx * 0.02 }}
            className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className={cn(
              "w-20 h-20 rounded-2xl border-[3px] overflow-hidden mb-3 relative bg-secondary shadow-md group-hover:scale-105 transition-transform duration-300",
              costColors[hero.price as keyof typeof costColors].split(' ')[0]
            )}>
              <img src={hero.img} alt={hero.pieceName} className="w-full h-full object-cover" onError={e => e.currentTarget.style.display='none'} />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-1 right-1 font-bold text-white text-xs px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-sm leading-none border border-white/20">
                {hero.price}
              </div>
            </div>
            
            <h3 className="font-bold text-foreground text-center line-clamp-1 group-hover:text-primary transition-colors">{hero.pieceName}</h3>
            
            <div className="mt-2 text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              出场 <span className="text-primary font-bold">{hero.appearanceCount}</span> 次
            </div>

            {hero.recommendedEquipments.length > 0 && (
              <div className="mt-4 w-full">
                <div className="text-[10px] text-muted-foreground text-center mb-1.5">神装推荐</div>
                <div className="flex justify-center gap-1">
                  {hero.recommendedEquipments.slice(0,3).map((eq, i) => (
                    <img 
                      key={i} 
                      src={eq.equipmentImg || ""} 
                      alt={eq.equipmentName || ""} 
                      title={eq.equipmentName || ""}
                      className="w-6 h-6 rounded border border-border shadow-sm bg-secondary"
                      onError={e => e.currentTarget.style.display='none'}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {filteredHeroes.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的弈子</p>
        </div>
      )}
    </div>
  );
}
