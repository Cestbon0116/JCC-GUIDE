import { Sparkles, Construction } from "lucide-react";

export default function RunesPage() {
  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-card border border-border shadow-sm p-8">
        <h2 className="text-3xl font-display font-black text-foreground">符文<span className="text-primary">排行</span></h2>
        <p className="text-sm text-muted-foreground mt-2 font-medium">海克斯强化选择优先级统计。</p>
      </div>

      <div className="min-h-[400px] bg-card rounded-3xl border border-border border-dashed flex flex-col items-center justify-center p-8 text-center shadow-sm">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 relative">
          <Sparkles className="w-10 h-10 text-primary animate-pulse" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
            <Construction className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">数据采集中</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          符文/海克斯的胜率和选取率数据正在从高段位对局中进行分析与整理，敬请期待该板块的上线。
        </p>
        <button className="mt-8 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 transition-all duration-200">
          返回阵容排行
        </button>
      </div>
    </div>
  );
}
