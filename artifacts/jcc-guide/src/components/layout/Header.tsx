import { Link, useLocation } from "wouter";
import { Search, Crown, Users, Hexagon, Sparkles, Sword } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "阵容排行", icon: Crown },
  { href: "/heroes", label: "弈子排行", icon: Users },
  { href: "/traits", label: "羁绊排行", icon: Hexagon },
  { href: "/runes", label: "符文排行", icon: Sparkles },
  { href: "/equipment", label: "装备库", icon: Sword },
];

export function Header() {
  const [location] = useLocation();
  const { globalSearch, setGlobalSearch } = useAppContext();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-yellow-300 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
            <span className="text-xl">♟</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-bold text-foreground leading-tight tracking-wide">
              铲铲攻略站
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              JCC S16
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar mx-4">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border whitespace-nowrap",
                  isActive 
                    ? "bg-accent text-primary border-primary/20 shadow-sm" 
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "opacity-70")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Search & Badge */}
        <div className="flex items-center gap-4 shrink-0 ml-auto">
          <div className="relative group hidden sm:flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-border rounded-xl leading-5 bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
              placeholder="搜索弈子、羁绊、装备…"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
          
          <div className="hidden lg:flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-red-950 to-red-900 border border-red-800/50 shadow-inner">
            <span className="text-xs font-bold text-red-200 tracking-wider">S16 · 怀旧编年史</span>
          </div>
        </div>
      </div>

      {/* Mobile Nav & Search */}
      <div className="md:hidden px-4 pb-3 flex flex-col gap-3">
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                  isActive ? "bg-accent text-primary" : "bg-secondary text-secondary-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            placeholder="搜索…"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
