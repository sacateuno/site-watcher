import { Website } from "@/types/monitor";
import { Activity, AlertTriangle, CheckCircle, Globe } from "lucide-react";

interface StatsOverviewProps {
  websites: Website[];
}

export const StatsOverview = ({ websites }: StatsOverviewProps) => {
  const totalSites = websites.length;
  const sitesUp = websites.filter(w => w.status === 'up').length;
  const sitesDown = websites.filter(w => w.status === 'down').length;
  const avgUptime = websites.length > 0
    ? websites.reduce((acc, w) => acc + w.uptimePercentage, 0) / websites.length
    : 0;

  const stats = [
    {
      label: "Total Monitors",
      value: totalSites,
      icon: Globe,
      color: "text-foreground",
    },
    {
      label: "Sites Up",
      value: sitesUp,
      icon: CheckCircle,
      color: "text-success",
    },
    {
      label: "Sites Down",
      value: sitesDown,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Avg Uptime",
      value: `${avgUptime.toFixed(1)}%`,
      icon: Activity,
      color: "text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-glow rounded-lg border border-border bg-card p-4 animate-fade-in"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
