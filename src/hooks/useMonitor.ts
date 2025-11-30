import { useState, useEffect, useCallback } from "react";
import { Website } from "@/types/monitor";
import { toast } from "@/hooks/use-toast";

const INITIAL_WEBSITES: Website[] = [
  {
    id: "1",
    url: "https://google.com",
    name: "Google",
    status: "up",
    responseTime: 45,
    lastChecked: new Date(),
    uptimePercentage: 99.9,
  },
  {
    id: "2",
    url: "https://github.com",
    name: "GitHub",
    status: "up",
    responseTime: 120,
    lastChecked: new Date(),
    uptimePercentage: 99.5,
  },
  {
    id: "3",
    url: "https://example-down-site.invalid",
    name: "Example Down Site",
    status: "down",
    responseTime: null,
    lastChecked: new Date(),
    uptimePercentage: 85.2,
  },
];

export const useMonitor = () => {
  const [websites, setWebsites] = useState<Website[]>(INITIAL_WEBSITES);

  const checkWebsite = useCallback(async (website: Website): Promise<Website> => {
    // Simulate checking - in production, this would be an actual API call
    const isUp = Math.random() > 0.1; // 90% chance of being up
    const responseTime = isUp ? Math.floor(Math.random() * 200) + 20 : null;
    
    const newStatus = isUp ? 'up' : 'down';
    const wasDown = website.status === 'down';
    const isNowDown = newStatus === 'down';
    
    // Notify on status change
    if (wasDown && !isNowDown) {
      toast({
        title: "Site Recovered",
        description: `${website.name} is back online!`,
      });
    } else if (!wasDown && isNowDown) {
      toast({
        title: "Site Down!",
        description: `${website.name} is not responding.`,
        variant: "destructive",
      });
    }

    return {
      ...website,
      status: newStatus,
      responseTime,
      lastChecked: new Date(),
      uptimePercentage: Math.max(0, Math.min(100, 
        website.uptimePercentage + (isUp ? 0.1 : -0.5)
      )),
    };
  }, []);

  const checkAllWebsites = useCallback(async () => {
    setWebsites(prev => prev.map(w => ({ ...w, status: 'checking' as const })));
    
    const results = await Promise.all(
      websites.map(website => checkWebsite(website))
    );
    
    setWebsites(results);
  }, [websites, checkWebsite]);

  const addWebsite = useCallback((url: string, name: string) => {
    const newWebsite: Website = {
      id: Date.now().toString(),
      url,
      name,
      status: 'checking',
      responseTime: null,
      lastChecked: null,
      uptimePercentage: 100,
    };
    
    setWebsites(prev => [...prev, newWebsite]);
    
    // Simulate initial check
    setTimeout(async () => {
      const checked = await checkWebsite(newWebsite);
      setWebsites(prev => prev.map(w => w.id === newWebsite.id ? checked : w));
    }, 1000);
  }, [checkWebsite]);

  const removeWebsite = useCallback((id: string) => {
    setWebsites(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Website Removed",
      description: "The website has been removed from monitoring.",
    });
  }, []);

  // Auto-check every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkAllWebsites();
    }, 30000);

    return () => clearInterval(interval);
  }, [checkAllWebsites]);

  return {
    websites,
    addWebsite,
    removeWebsite,
    checkAllWebsites,
  };
};
