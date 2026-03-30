import { LineupRow, getTier } from "@/lib/data";
import { useAppContext } from "@/context/AppContext";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LineupCardProps {
  lineup: LineupRow;
  index: number;
}

export function LineupCard({ lineup, index }: LineupCardProps) {
  const { setSelectedUnit } = useAppContext();
  const tier = getTier(lineup);
  const extra = lineup.extraData;
  const rankNum = index + 1;

  // Level recommendation logic
  const lv9 = extra.levelRate_9 || 0;
  const lv8 = extra.levelRate_8 || 0;
  const lv7 = extra.levelRate_7 || 0;
  const maxLv = Math.max(lv9, lv8, lv7);
  let lvText = "";
  if (maxLv === lv9) lvText = `推荐9级成型 ${lv9.toFixed(0)}%`;
  else if (maxLv === lv8) lvText = `推荐8级成型 ${lv8.toFixed(0)}%`;
  else lvText = `推荐7级成型 ${lv7.toFixed(0)}%`;

  const campName = extra.campName ? extra.campName.replace(" && ", " · ") : "未知阵容";

  const tierColors = {
    S: "from-[#FF6B35] to-[#FF8E63]",
    A: "from-[#F5A623] to-[#F7C05C]",
    B: "from-[#7ED321] to-[#A0E25D]",
    C: "from-[#4A90E2] to-[#76ABEB]",
  };

  const tierBg = {
    S: "bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/30",
    A: "bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30",
    B: "bg-[#7ED321]/10 text-[#7ED321] border-[#7ED321]/30",
    C: "bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/30",
  };

  const costColors = {
    1: "border-gray-400/80 shadow-gray-400/20",
    2: "border-green-500/80 shadow-green-500/20",
    3: "border-blue-500/80 shadow-blue-500/20",
    4: "border-purple-500/80 shadow-purple-500/20",
    5: "border-amber-500 shadow-amber-500/40",
  };

  return (
    <div className="relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-[0_8px_30px_-4px_rgba(200,150,12,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Top colored highlight line */}
      <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300", tierColors[tier])} />
      
      {/* Header */}
      <div className="px-5 py-4 border-b border-border/50 flex flex-wrap sm:flex-nowrap items-center gap-4 bg-gradient-to-br from-transparent to-secondary/20">
        
        {/* Rank Badge */}
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg shadow-sm shrink-0",
          rankNum === 1 ? "bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 shadow-yellow-500/30" :
          rankNum === 2 ? "bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800" :
          rankNum === 3 ? "bg-gradient-to-br from-orange-300 to-orange-600 text-orange-950" :
          "bg-secondary border border-border text-muted-foreground"
        )}>
          {rankNum}
        </div>

        {/* Tier */}
        <div className={cn("px-2.5 py-1 rounded-md text-xs font-bold border shrink-0", tierBg[tier])}>
          {tier}
        </div>

        {/* Title Area */}
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            {extra.img && (
              <img src={extra.img} alt="Trait" className="w-6 h-6 rounded-md object-cover border border-border bg-secondary" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            )}
            <h3 className="font-display font-bold text-lg text-foreground truncate">{campName}</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {extra.authorName || "攻略作者"} · {lvText}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-border/50">
          <div className="text-center">
            <div className="font-bold text-lg text-[#FF6B35] leading-none">{lineup.pickRate_1}%</div>
            <div className="text-[10px] text-muted-foreground mt-1">胜率</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-primary leading-none">{lineup.pickRate_4}%</div>
            <div className="text-[10px] text-muted-foreground mt-1">前四率</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-[#F5A623] leading-none">{lineup.avgRanking.toFixed(2)}</div>
            <div className="text-[10px] text-muted-foreground mt-1">均名次</div>
          </div>
        </div>
      </div>

      {/* Body: Units */}
      <div className="p-5">
        <div className="flex flex-wrap gap-x-4 gap-y-6 items-start">
          {lineup.pieceList.map((piece, i) => {
            const isCore = piece.equipmentList && piece.equipmentList.length > 0;
            const isStar3 = piece.starNum === 3;
            
            return (
              <div 
                key={`${piece.pieceId}-${i}`} 
                className="flex flex-col items-center gap-2 cursor-pointer group/unit w-14"
                onClick={() => setSelectedUnit(piece)}
              >
                <div className="relative">
                  {/* Avatar */}
                  <div className={cn(
                    "w-14 h-14 rounded-xl border-[3px] overflow-hidden bg-secondary transition-transform duration-200 group-hover/unit:scale-110",
                    costColors[piece.price as keyof typeof costColors] || "border-gray-400",
                    isCore && "shadow-lg"
                  )}>
                    <img src={piece.img} alt={piece.pieceName} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Cost indicator */}
                  <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-slate-800 border border-white/20 text-white flex items-center justify-center text-[10px] font-bold shadow-sm z-10">
                    {piece.price}
                  </div>

                  {/* 3-star indicator */}
                  {isStar3 && (
                    <div className="absolute -top-2 inset-x-0 flex justify-center z-10">
                      <div className="bg-gradient-to-b from-yellow-300 to-yellow-600 text-black text-[8px] tracking-widest font-black px-1.5 py-0.5 rounded shadow-sm leading-none border border-yellow-200/50">
                        ★★★
                      </div>
                    </div>
                  )}
                </div>

                {/* Equipment Row */}
                {isCore && (
                  <div className="flex gap-0.5 mt-1">
                    {piece.equipmentList.slice(0, 3).map((eq, j) => (
                      eq.equipmentImg ? (
                        <img 
                          key={j} 
                          src={eq.equipmentImg} 
                          alt={eq.equipmentName || "Eq"} 
                          className="w-4 h-4 rounded-sm border border-border shadow-sm"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      ) : <div key={j} className="w-4 h-4 rounded-sm bg-secondary border border-border" />
                    ))}
                  </div>
                )}

                {/* Name */}
                <div className={cn(
                  "text-[10px] text-center w-full truncate px-1",
                  isCore ? "font-bold text-primary" : "text-muted-foreground font-medium"
                )}>
                  {piece.pieceName}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-secondary/30 border-t border-border/50 flex items-center justify-between">
        <div className="text-xs text-muted-foreground font-medium">
          <span className="text-primary font-bold mr-1">💡</span>
          {lvText}
        </div>
        
        {extra.campUrl ? (
          <a 
            href={extra.campUrl} 
            target="_blank" 
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-sm"
          >
            查看攻略 <ChevronRight className="w-3 h-3" />
          </a>
        ) : (
          <button className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-background border border-border text-xs font-semibold text-muted-foreground hover:text-foreground transition-all duration-200">
            暂无攻略 <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
