
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
  isPlaylist?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ 
  onClick, 
  isLoading, 
  disabled,
  isPlaylist = false
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
    >
      {isLoading ? (
        <>
          <div className="h-5 w-5 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
          <span>Downloading...</span>
        </>
      ) : (
        <>
          <Download className="mr-2 h-5 w-5" />
          <span>Download {isPlaylist ? 'Playlist' : 'Audio'}</span>
        </>
      )}
    </Button>
  );
};

export default DownloadButton;
