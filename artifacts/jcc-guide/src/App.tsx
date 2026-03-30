import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { AppProvider } from "@/context/AppContext";

// Pages
import LineupsPage from "@/pages/LineupsPage";
import HeroesPage from "@/pages/HeroesPage";
import TraitsPage from "@/pages/TraitsPage";
import RunesPage from "@/pages/RunesPage";
import EquipmentPage from "@/pages/EquipmentPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative selection:bg-primary/20 selection:text-primary-foreground">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={LineupsPage} />
          <Route path="/heroes" component={HeroesPage} />
          <Route path="/traits" component={TraitsPage} />
          <Route path="/runes" component={RunesPage} />
          <Route path="/equipment" component={EquipmentPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </AppProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
