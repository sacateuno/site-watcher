import { AddWebsiteForm } from "@/components/AddWebsiteForm";
import { StatsOverview } from "@/components/StatsOverview";
import { WebsiteCard } from "@/components/WebsiteCard";
import { useMonitor } from "@/hooks/useMonitor";
import { Button } from "@/components/ui/button";
import { RefreshCw, Activity } from "lucide-react";

const Index = () => {
  const { websites, addWebsite, removeWebsite, checkAllWebsites } = useMonitor();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Uptime Monitor</h1>
                <p className="text-sm text-muted-foreground">Track your websites in real-time</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={checkAllWebsites}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh All
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Stats Overview */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Overview</h2>
            <StatsOverview websites={websites} />
          </section>

          {/* Add Website Form */}
          <section className="card-glow rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4 text-foreground">Add New Monitor</h2>
            <AddWebsiteForm onAdd={addWebsite} />
          </section>

          {/* Website List */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground">
              Monitored Websites ({websites.length})
            </h2>
            {websites.length === 0 ? (
              <div className="card-glow rounded-lg border border-border bg-card p-12 text-center">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No websites monitored</h3>
                <p className="text-muted-foreground">
                  Add your first website above to start monitoring.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {websites.map((website) => (
                  <WebsiteCard
                    key={website.id}
                    website={website}
                    onRemove={removeWebsite}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          Auto-refreshes every 30 seconds • Connect to Lovable Cloud for persistent storage & real notifications
        </div>
      </footer>
    </div>
  );
};

export default Index;
