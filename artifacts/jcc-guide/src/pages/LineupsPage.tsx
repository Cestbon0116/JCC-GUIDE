import { useState, useMemo } from "react";
import { allLineups, getTier } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { LineupCard } from "@/components/LineupCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowUpDown } from "lucide-react";

type SortKey = "pickRate_4" | "pickRate_1" | "avgRanking";
type TierFilter = "all" | "S" | "A" | "B" | "C";

export default function LineupsPage() {
  const { globalSearch } = useAppContext();
  const [sortKey, setSortKey] = useState<SortKey>("pickRate_4");
  const [isAsc, setIsAsc] = useState(false);
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setIsAsc(!isAsc);
    } else {
      setSortKey(key);
      setIsAsc(key === "avgRanking"); // Default asc for ranking (lower is better)
    }
  };

  const filteredAndSortedLineups = useMemo(() => {
    let data = [...allLineups];

    // Filter by tier
    if (tierFilter !== "all") {
      data = data.filter((row) => getTier(row) === tierFilter);
    }

    // Filter by search term
    if (globalSearch) {
      const lowerQ = globalSearch.toLowerCase();
      data = data.filter((row) => {
        const camp = row.extraData.campName || "";
        const pieces = row.pieceList.map((p) => p.pieceName).join("");
        const equips = row.pieceList.flatMap((p) => p.equipmentList.map((e) => e.equipmentName || "")).join("");
        return (camp + pieces + equips).toLowerCase().includes(lowerQ);
      });
    }

    // Sort
    data.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return isAsc ? valA - valB : valB - valA;
    });

    return data;
  }, [sortKey, isAsc, tierFilter, globalSearch]);

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Hero Section */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="relative px-8 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary/80 uppercase mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-primary/50" /> 实时数据看板
            </p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-foreground tracking-tight">
              阵容<span className="text-primary">排行榜</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-4 font-medium">
              数据更新: 2026-03-19 07:30 · 基于高段位实际对局统计
            </p>
          </div>
          
          <div className="flex gap-2 shrink-0">
            {[
              { id: 'S', label: '神级', color: 'text-[#FF6B35] bg-[#FF6B35]/10 border-[#FF6B35]/30' },
              { id: 'A', label: '强势', color: 'text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/30' },
              { id: 'B', label: '稳健', color: 'text-[#7ED321] bg-[#7ED321]/10 border-[#7ED321]/30' },
              { id: 'C', label: '一般', color: 'text-[#4A90E2] bg-[#4A90E2]/10 border-[#4A90E2]/30' }
            ].map(t => (
              <button 
                key={t.id}
                onClick={() => setTierFilter(t.id as TierFilter)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold border transition-transform hover:scale-105 active:scale-95 cursor-pointer",
                  t.color,
                  tierFilter === t.id ? "ring-2 ring-offset-2 ring-offset-card ring-primary/50" : ""
                )}
              >
                {t.id} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        
        {/* Left Column: Filters + List */}
        <div className="flex flex-col gap-4">
          
          {/* Controls */}
          <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-md py-3 border-b border-border/50 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">排序</span>
              <div className="flex bg-secondary rounded-lg p-1 border border-border">
                {[
                  { key: "pickRate_4", label: "前四率" },
                  { key: "pickRate_1", label: "胜率" },
                  { key: "avgRanking", label: "平均名次" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => handleSort(s.key as SortKey)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-all",
                      sortKey === s.key 
                        ? "bg-card text-primary shadow-sm border border-border" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                    {sortKey === s.key && (
                      <ArrowUpDown className={cn("w-3 h-3 transition-transform", isAsc ? "" : "rotate-180")} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-6 w-px bg-border hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">评级</span>
              <div className="flex gap-1">
                {["all", "S", "A", "B", "C"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTierFilter(t as TierFilter)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                      tierFilter === t
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-secondary text-muted-foreground border-transparent hover:border-border hover:text-foreground"
                    )}
                  >
                    {t === "all" ? "全部" : t}
                  </button>
                ))}
              </div>
            </div>

            <div className="ml-auto text-xs font-medium text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg border border-border">
              共 <span className="text-primary font-bold mx-1">{filteredAndSortedLineups.length}</span> 套
            </div>
          </div>

          {/* List */}
          <div className="flex flex-col gap-5 pb-20">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedLineups.length > 0 ? (
                filteredAndSortedLineups.map((lineup, idx) => (
                  <motion.div
                    key={lineup.groupId}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LineupCard lineup={lineup} index={idx} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="py-20 text-center bg-card rounded-2xl border border-border border-dashed"
                >
                  <p className="text-muted-foreground">没有找到匹配的阵容</p>
                  <button 
                    onClick={() => { setGlobalSearch(""); setTierFilter("all"); }}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    清除过滤条件
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <Sidebar />
      </div>
    </div>
  );
}
