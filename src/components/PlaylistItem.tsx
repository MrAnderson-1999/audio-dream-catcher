
import React from 'react';
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface PlaylistItemProps {
  title: string;
  thumbnail: string;
  selected: boolean;
  onToggle: () => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ title, thumbnail, selected, onToggle }) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
        selected ? 'bg-secondary border border-purple-500/50' : 'bg-muted hover:bg-secondary'
      }`}
      onClick={onToggle}
    >
      <Checkbox 
        checked={selected} 
        onCheckedChange={() => onToggle()}
        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
      />
      
      {thumbnail ? (
        <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-16 h-12 bg-secondary rounded flex-shrink-0 flex items-center justify-center">
          <div className="audio-wave scale-75">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
      </div>
      
      {selected && (
        <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default PlaylistItem;
