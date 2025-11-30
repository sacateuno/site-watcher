import { Website } from "@/types/monitor";
import { StatusBadge } from "./StatusBadge";
import { Trash2, Globe, Clock, Zap, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { formatDistanceToNow } from "date-fns";

interface WebsiteCardProps {
  website: Website;
  onRemove: (id: string) => void;
}

export const WebsiteCard = ({ website, onRemove }: WebsiteCardProps) => {
  return (
    <div className="card-glow rounded-lg border border-border bg-card p-5 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Globe className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate">{website.name}</h3>
              <p className="text-sm text-muted-foreground font-mono truncate">{website.url}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={website.status} />
            </div>
            
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono">
                {website.responseTime !== null ? `${website.responseTime}ms` : '--'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono">{website.uptimePercentage.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {website.lastChecked 
                  ? formatDistanceToNow(website.lastChecked, { addSuffix: true })
                  : 'Never'
                }
              </span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(website.id)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
