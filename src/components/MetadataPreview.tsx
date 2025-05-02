
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import PlaylistItem from './PlaylistItem';

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

interface MetadataPreviewProps {
  metadata: VideoMetadata | null;
  selectedItems: string[];
  toggleItem: (id: string) => void;
  selectAll: () => void;
  deselectAll: () => void;
}

const MetadataPreview: React.FC<MetadataPreviewProps> = ({ 
  metadata, 
  selectedItems, 
  toggleItem,
  selectAll,
  deselectAll
}) => {
  if (!metadata) return null;

  if (metadata.type === 'video') {
    return (
      <Card className="mb-6 bg-card border border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {metadata.thumbnail ? (
              <div className="w-24 h-20 rounded overflow-hidden">
                <img src={metadata.thumbnail} alt={metadata.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-20 bg-muted rounded flex items-center justify-center">
                <div className="audio-wave">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1 line-clamp-2">{metadata.title}</h3>
              <p className="text-sm text-muted-foreground">Single Track</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // If it's a playlist
  return (
    <Card className="mb-6 bg-card border border-border">
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          {metadata.thumbnail ? (
            <div className="w-24 h-20 rounded overflow-hidden">
              <img src={metadata.thumbnail} alt={metadata.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-24 h-20 bg-muted rounded flex items-center justify-center">
              <div className="audio-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1 line-clamp-2">{metadata.title}</h3>
            <p className="text-sm text-muted-foreground">
              Playlist • {metadata.entries?.length || 0} tracks
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h4 className="font-medium">Tracks</h4>
          <div className="space-x-2 text-xs">
            <button 
              onClick={selectAll}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Select All
            </button>
            <span className="text-muted-foreground">•</span>
            <button 
              onClick={deselectAll}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Deselect All
            </button>
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
          {metadata.entries?.map((entry) => (
            <PlaylistItem
              key={entry.id}
              title={entry.title}
              thumbnail={entry.thumbnail}
              selected={selectedItems.includes(entry.id)}
              onToggle={() => toggleItem(entry.id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetadataPreview;
