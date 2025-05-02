import React, { useState } from 'react';
import { toast } from '@/components/ui/sonner';
import Header from '@/components/Header';
import UrlInput from '@/components/UrlInput';
import MetadataPreview from '@/components/MetadataPreview';
import FormatSelector from '@/components/FormatSelector';
import DownloadButton from '@/components/DownloadButton';
import { Card, CardContent } from "@/components/ui/card";
import api from '@/services/api';

interface PlaylistEntry {
  id: string;
  title: string;
  thumbnail: string;
  formats: string[];
}

interface VideoMetadata {
  type: 'video' | 'playlist';
  title: string;
  thumbnail: string;
  formats: string[];
  entries?: PlaylistEntry[];
}

const Index = () => {
  const [url, setUrl] = useState('');
  const [isMetadataLoading, setIsMetadataLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('wav');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const fetchMetadata = async () => {
    if (!url.trim()) return;

    setIsMetadataLoading(true);
    setMetadata(null);
    
    try {
      const data = await api.fetchMetadata(url);
      setMetadata(data);

      // For playlists, select all items by default
      if (data.type === 'playlist' && data.entries) {
        setSelectedItems(data.entries.map((entry: PlaylistEntry) => entry.id));
      }

      // Select first available format or default to wav
      if (data.formats && data.formats.length > 0) {
        setSelectedFormat(data.formats[0]);
      } else {
        setSelectedFormat('wav');
      }

      toast.success("Media information loaded successfully");
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(`Failed to fetch information: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setMetadata(null);
    } finally {
      setIsMetadataLoading(false);
    }
  };

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(item => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const selectAll = () => {
    if (!metadata?.entries) return;
    setSelectedItems(metadata.entries.map(entry => entry.id));
  };

  const deselectAll = () => {
    setSelectedItems([]);
  };

  const downloadMedia = async () => {
    if (!metadata) return;

    setIsDownloading(true);
    
    try {
      // Build request body based on metadata type
      let requestItems;
      
      if (metadata.type === 'video') {
        requestItems = [{ 
          id: url, 
          url: url, 
          format: selectedFormat 
        }];
      } else if (metadata.type === 'playlist' && metadata.entries) {
        // Only include selected items
        requestItems = metadata.entries
          .filter(entry => selectedItems.includes(entry.id))
          .map(entry => ({
            id: entry.id,
            url: `https://www.youtube.com/watch?v=${entry.id}`,
            format: selectedFormat
          }));

        if (requestItems.length === 0) {
          throw new Error('No items selected for download');
        }
      } else {
        throw new Error('Invalid metadata');
      }
      
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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 pb-10">
      <div className="container max-w-3xl px-4 sm:px-6">
        <Header />
        
        <Card className="border border-border bg-card mb-6">
          <CardContent className="pt-6">
            <UrlInput 
              url={url} 
              setUrl={setUrl} 
              onFetch={fetchMetadata} 
              isLoading={isMetadataLoading}
            />
            
            {isMetadataLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 rounded-full border-4 border-t-transparent border-purple-600 animate-spin"></div>
                <span className="ml-3">Loading media information...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {metadata && (
          <>
            <MetadataPreview 
              metadata={metadata}
              selectedItems={selectedItems}
              toggleItem={toggleItem}
              selectAll={selectAll}
              deselectAll={deselectAll}
            />
            
            <Card className="border border-border bg-card mb-6">
              <CardContent className="pt-6">
                <FormatSelector
                  formats={metadata.formats || ['wav', 'mp3', 'flac']}
                  selectedFormat={selectedFormat}
                  onChange={setSelectedFormat}
                  disabled={isDownloading}
                />
                
                <DownloadButton
                  onClick={downloadMedia}
                  isLoading={isDownloading}
                  disabled={
                    (metadata.type === 'playlist' && selectedItems.length === 0) ||
                    !metadata
                  }
                  isPlaylist={metadata.type === 'playlist'}
                />
              </CardContent>
            </Card>
            
            <div className="text-center text-xs text-muted-foreground mt-8">
              <p>Audio Dream Catcher • Extract and download audio from YouTube</p>
              <p className="mt-1">
                Made with <span className="text-red-500">♥</span> for music lovers
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
