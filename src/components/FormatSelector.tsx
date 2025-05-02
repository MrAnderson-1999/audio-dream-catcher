
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

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
  const availableFormats = formats.length > 0 ? formats : ['mp3', 'wav', 'flac'];

  return (
    <div className="mb-4">
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Select Format</h3>
      <RadioGroup
        value={selectedFormat}
        onValueChange={onChange}
        className="flex gap-3"
        disabled={disabled}
      >
        {availableFormats.map((format) => (
          <div key={format} className="flex items-center space-x-2">
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
                "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-secondary p-4 hover:bg-muted hover:text-accent-foreground",
                "peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-secondary",
                "cursor-pointer transition-all",
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
