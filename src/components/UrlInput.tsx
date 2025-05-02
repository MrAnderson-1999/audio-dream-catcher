
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: () => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, onFetch, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFetch();
    }
  };

  return (
    <div className="relative w-full mb-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter YouTube URL or playlist link"
            className="pl-4 pr-10 py-6 w-full bg-secondary border-secondary text-white rounded-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <Button 
          onClick={onFetch}
          disabled={isLoading || !url.trim()} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-6 rounded-lg transition-colors"
        >
          <Search className="mr-2 h-4 w-4" />
          Fetch
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Paste a YouTube video or playlist link to get started
      </p>
    </div>
  );
};

export default UrlInput;
