
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface FormatSelectorProps {
  formats: string[];
  selectedFormat: string;
  onChange: (format: string) => void;
  disabled?: boolean;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ 
  formats, 
  selectedFormat, 
  onChange,
  disabled = false
}) => {
  const isMobile = useIsMobile();
  const availableFormats = formats.length > 0 ? formats : ['mp3', 'wav', 'flac'];

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-sm font-medium text-gray-600">Select Format</h3>
      <RadioGroup
        value={selectedFormat}
        onValueChange={onChange}
        className={`flex ${isMobile ? 'flex-wrap' : ''} gap-3`}
        disabled={disabled}
      >
        {availableFormats.map((format) => (
          <div key={format} className={`flex items-center space-x-2 ${isMobile ? 'w-full sm:w-auto' : ''}`}>
            <RadioGroupItem 
              value={format} 
              id={`format-${format}`}
              className={cn(
                "peer sr-only",
              )}
            />
            <Label
              htmlFor={`format-${format}`}
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-purple-600",
                "peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50",
                "cursor-pointer transition-all w-full",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <span className="text-sm font-medium uppercase">{format}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FormatSelector;
