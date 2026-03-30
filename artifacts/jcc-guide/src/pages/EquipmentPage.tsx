import { useState, useMemo } from "react";
import { getUniqueEquipments } from "@/lib/data";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function EquipmentPage() {
  const [search, setSearch] = useState("");
  const equipments = useMemo(() => getUniqueEquipments(), []);

  const filteredEquips = useMemo(() => {
    if (!search) return equipments;
    return equipments.filter(eq => (eq.equipmentName || "").toLowerCase().includes(search.toLowerCase()));
  }, [equipments, search]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-black text-foreground">装备<span className="text-primary">库</span></h2>
          <p className="text-sm text-muted-foreground mt-2 font-medium">查看所有装备的推荐使用者。</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索装备名称..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 shadow-inner"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEquips.map((eq, idx) => (
          <motion.div 
            key={eq.equipmentId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx > 20 ? 0 : idx * 0.03 }}
            className="bg-card rounded-2xl border border-border p-4 flex gap-4 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border shadow-sm bg-secondary group-hover:scale-105 transition-transform duration-300">
              <img src={eq.equipmentImg || ""} alt={eq.equipmentName || "Eq"} className="w-full h-full object-cover" onError={e => e.currentTarget.style.display='none'} />
            </div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">{eq.equipmentName}</h3>
              
              <div className="mt-2 flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-muted-foreground mr-1">常见于:</span>
                {eq.usedBy.slice(0, 4).map((hero, i) => (
                  <img 
                    key={i} 
                    src={hero.img} 
                    alt={hero.heroName} 
                    title={hero.heroName}
                    className="w-5 h-5 rounded-full border border-border"
                    onError={e => e.currentTarget.style.display='none'}
                  />
                ))}
                {eq.usedBy.length > 4 && (
                  <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full text-muted-foreground border border-border font-medium">
                    +{eq.usedBy.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredEquips.length === 0 && (
        <div className="py-20 text-center bg-card rounded-2xl border border-border border-dashed">
          <p className="text-muted-foreground">没有找到匹配的装备</p>
        </div>
      )}
    </div>
  );
}
