import { Search, ChevronRight, Info } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Link } from "wouter";

const HOT_TAGS = ["薇恩", "安妮", "德莱厄斯", "无尽之刃", "千珏", "斯维因"];

export function Sidebar() {
  const { globalSearch, setGlobalSearch, selectedUnit } = useAppContext();

  return (
    <aside className="hidden lg:flex flex-col gap-6 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pb-8">
      
      {/* Search Panel */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-secondary/50 border-b border-border flex items-center justify-center">
          <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <Search className="w-4 h-4 text-primary" /> 
            关键词检索
          </h3>
        </div>
        <div className="p-5">
          <div className="relative mb-4">
            <input
              type="text"
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              placeholder="输入弈子 / 装备名称…"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex flex-wrap gap-2">
            {HOT_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setGlobalSearch(tag)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent/50 text-accent-foreground border border-primary/10 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col min-h-[300px]">
        <div className="px-5 py-3.5 bg-secondary/50 border-b border-border flex items-center justify-between">
          <h3 className="font-display font-bold text-sm text-foreground flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            弈子详情
          </h3>
          <span className="text-[10px] text-muted-foreground">点击头像查看</span>
        </div>
        
        <div className="flex-1 p-0 flex flex-col">
          {selectedUnit ? (
            <div className="animate-in fade-in zoom-in-95 duration-200">
              <div className="p-5 flex items-center gap-4 bg-gradient-to-br from-accent/30 to-transparent border-b border-border/50">
                <div className={`w-16 h-16 rounded-xl border-2 overflow-hidden shadow-md shrink-0 bg-secondary
                  ${selectedUnit.price === 1 ? 'border-gray-400' : ''}
                  ${selectedUnit.price === 2 ? 'border-green-500' : ''}
                  ${selectedUnit.price === 3 ? 'border-blue-500' : ''}
                  ${selectedUnit.price === 4 ? 'border-purple-500' : ''}
                  ${selectedUnit.price === 5 ? 'border-amber-500' : ''}
                `}>
                  <img 
                    src={selectedUnit.img} 
                    alt={selectedUnit.pieceName}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4='; }}
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground leading-tight">{selectedUnit.pieceName}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedUnit.price}费弈子 {selectedUnit.starNum === 3 ? <span className="text-primary font-bold ml-1">· ★★★核心</span> : ''}
                  </p>
                </div>
              </div>
              
              <div className="p-5">
                <div className="mb-5">
                  <h5 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">基础信息</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary/40 border border-border/50 rounded-xl p-3 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-foreground">{selectedUnit.price}<span className="text-sm ml-0.5">金</span></span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">费用</span>
                    </div>
                    <div className="bg-secondary/40 border border-border/50 rounded-xl p-3 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-primary">{selectedUnit.starNum === 3 ? '★★★' : '—'}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">推荐星级</span>
                    </div>
                  </div>
                </div>

                {selectedUnit.equipmentList && selectedUnit.equipmentList.length > 0 && (
                  <div>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-5" />
                    <h5 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">推荐装备</h5>
                    <div className="flex flex-col gap-2">
                      {selectedUnit.equipmentList.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors group">
                          {eq.equipmentImg ? (
                            <img 
                              src={eq.equipmentImg} 
                              alt={eq.equipmentName || 'Equipment'} 
                              className="w-7 h-7 rounded border border-border shadow-sm group-hover:border-primary/50 transition-colors"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-7 h-7 rounded border border-border bg-secondary" />
                          )}
                          <span className="text-xs font-medium text-foreground">{eq.equipmentName || '未知装备'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
              <div className="w-16 h-16 mb-4 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Info className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground font-medium">点击任意弈子头像<br/>查看详细数值</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Nav */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 bg-secondary/50 border-b border-border">
          <h3 className="font-display font-bold text-sm text-foreground">快速导航</h3>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2">
          <Link href="/" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-accent hover:text-primary transition-colors text-sm font-medium text-muted-foreground">
            <span>🏆</span> 阵容排行
          </Link>
          <Link href="/heroes" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-accent hover:text-primary transition-colors text-sm font-medium text-muted-foreground">
            <span>🦸</span> 弈子排行
          </Link>
          <Link href="/traits" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-accent hover:text-primary transition-colors text-sm font-medium text-muted-foreground">
            <span>🔗</span> 羁绊排行
          </Link>
          <Link href="/runes" className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-accent hover:text-primary transition-colors text-sm font-medium text-muted-foreground">
            <span>💎</span> 符文排行
          </Link>
          <Link href="/equipment" className="col-span-2 flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-accent text-sm font-medium text-foreground transition-all group">
            <div className="flex items-center gap-2">
              <span>⚔️</span> 装备库 · 合成路线
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
