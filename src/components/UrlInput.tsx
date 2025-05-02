
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface UrlInputProps {
  url: string;
  setUrl: (url: string) => void;
  onFetch: () => void;
  isLoading: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, setUrl, onFetch, isLoading }) => {
  const isMobile = useIsMobile();
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onFetch();
    }
  };

  return (
    <div className="relative w-full mb-6">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter YouTube URL"
            className="pl-4 pr-10 py-6 w-full bg-white border-gray-200 text-gray-800 rounded-lg shadow-sm"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
        </div>
        <Button 
          onClick={onFetch}
          disabled={isLoading || !url.trim()} 
          className={`bg-purple-500 hover:bg-purple-600 text-white px-5 py-6 rounded-lg transition-colors ${isMobile ? 'w-full' : ''}`}
        >
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Paste a YouTube video link to extract its audio
      </p>
    </div>
  );
};

export default UrlInput;
