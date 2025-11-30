export interface Website {
  id: string;
  url: string;
  name: string;
  status: 'up' | 'down' | 'checking';
  responseTime: number | null;
  lastChecked: Date | null;
  uptimePercentage: number;
}
