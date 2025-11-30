import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddWebsiteFormProps {
  onAdd: (url: string, name: string) => void;
}

export const AddWebsiteForm = ({ onAdd }: AddWebsiteFormProps) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a website URL to monitor.",
        variant: "destructive",
      });
      return;
    }

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      new URL(formattedUrl);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid website URL.",
        variant: "destructive",
      });
      return;
    }

    const siteName = name.trim() || new URL(formattedUrl).hostname;
    onAdd(formattedUrl, siteName);
    setUrl("");
    setName("");
    
    toast({
      title: "Website Added",
      description: `Now monitoring ${siteName}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <Input
        type="text"
        placeholder="Website name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-secondary border-border focus:border-primary"
      />
      <Input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 bg-secondary border-border focus:border-primary font-mono text-sm"
      />
      <Button type="submit" className="gap-2">
        <Plus className="h-4 w-4" />
        Add Website
      </Button>
    </form>
  );
};
