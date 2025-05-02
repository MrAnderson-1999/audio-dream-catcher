
import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import FormatSelector from '@/components/FormatSelector';
import DownloadButton from '@/components/DownloadButton';
import { Card, CardContent } from "@/components/ui/card";
import api from '@/services/api';

const Index = () => {
  const [url, setUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('wav');

  const downloadMedia = async () => {
    if (!url.trim()) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsDownloading(true);
    
    try {
      // Build simple request item
      const requestItems = [{ 
        id: url, 
        url: url, 
        format: selectedFormat 
      }];
      
      console.log("Sending download request:", requestItems);
      
      // Send download request to API
      const { blob, filename } = await api.downloadMedia(requestItems);
      
      // Create download
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        link.remove();
        URL.revokeObjectURL(blobUrl);
      }, 100);

      toast.success("Download completed successfully!");
    } catch (err) {
      console.error("Download error:", err);
      toast.error(`Download failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-wave-pattern pb-10">
      <div className="container max-w-3xl px-4 sm:px-6 mx-auto pt-6">
        <Header />
        
        <Card className="border border-gray-200 shadow-md backdrop-blur-sm bg-white/90 mb-6">
          <CardContent className="pt-6">
            <UrlInput 
              url={url} 
              setUrl={setUrl} 
              onFetch={downloadMedia} 
              isLoading={isDownloading}
            />
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-md backdrop-blur-sm bg-white/90 mb-6">
          <CardContent className="pt-6">
            <FormatSelector
              formats={['wav', 'mp3', 'flac']}
              selectedFormat={selectedFormat}
              onChange={setSelectedFormat}
              disabled={isDownloading}
            />
            
            <DownloadButton
              onClick={downloadMedia}
              isLoading={isDownloading}
              disabled={!url.trim()}
              isPlaylist={false}
            />
          </CardContent>
        </Card>
        
        <div className="text-center text-xs text-gray-700 mt-8">
          <p>Audio Dream Catcher • Extract and download audio from YouTube</p>
          <p className="mt-1">
            Made with <span className="text-red-500">♥</span> for music lovers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
