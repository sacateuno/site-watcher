import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'up' | 'down' | 'checking';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "h-3 w-3 rounded-full",
          status === 'up' && "bg-success status-pulse-up",
          status === 'down' && "bg-destructive status-pulse-down",
          status === 'checking' && "bg-warning animate-pulse"
        )}
        style={{
          boxShadow: status === 'up' 
            ? 'var(--glow-success)' 
            : status === 'down' 
            ? 'var(--glow-destructive)' 
            : 'var(--glow-warning)'
        }}
      />
      <span
        className={cn(
          "text-sm font-medium capitalize",
          status === 'up' && "text-success",
          status === 'down' && "text-destructive",
          status === 'checking' && "text-warning"
        )}
      >
        {status}
      </span>
    </div>
  );
};
