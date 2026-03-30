import { useMemo } from "react";
import { getUniqueTraits } from "@/lib/data";
import { motion } from "framer-motion";

export default function TraitsPage() {
  const traits = useMemo(() => getUniqueTraits(), []);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8">
        <h2 className="text-3xl font-display font-black text-foreground">羁绊<span className="text-primary">排行</span></h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">查看当前环境最热门的羁绊体系构成。</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {traits.map((trait, idx) => (
          <motion.div 
            key={trait.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card rounded-2xl border border-border p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex items-start gap-4 group"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-border border border-border/80 shadow-inner flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-primary/20 group-hover:border-primary/40 transition-all duration-300">
              {trait.img ? (
                <img src={trait.img} alt={trait.name} className="w-8 h-8 object-contain" onError={e => e.currentTarget.style.display='none'} />
              ) : (
                <span className="text-2xl">🔗</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">{trait.name}</h3>
                <span className="px-2 py-0.5 rounded-md bg-accent text-primary text-xs font-bold border border-primary/20">
                  {trait.lineupCount} 套阵容
                </span>
              </div>
              
              <div className="mt-3">
                <p className="text-[10px] text-muted-foreground uppercase font-semibold mb-1.5">代表阵容</p>
                <ul className="space-y-1">
                  {trait.topLineupNames.map((name, i) => (
                    <li key={i} className="text-xs text-foreground/80 truncate flex items-center gap-1.5 before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-primary/50">
                      {name.replace(" && ", " · ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
