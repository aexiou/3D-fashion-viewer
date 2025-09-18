import { Card } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Palette, Sun, Image } from 'lucide-react';

interface ViewerControlsProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  lighting: string;
  onLightingChange: (lighting: string) => void;
  background: string;
  onBackgroundChange: (background: string) => void;
}

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#ef4444', label: 'Red' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Yellow' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#000000', label: 'Black' },
  { value: '#ffffff', label: 'White' },
  { value: '#6b7280', label: 'Gray' },
];

const lightingOptions = [
  { value: 'studio', label: 'Studio' },
  { value: 'sunset', label: 'Sunset' },
  { value: 'dawn', label: 'Dawn' },
  { value: 'warehouse', label: 'Warehouse' },
];

const backgroundOptions = [
  { value: 'white', label: 'White' },
  { value: 'black', label: 'Black' },
  { value: 'gray', label: 'Gray' },
  { value: 'transparent', label: 'Transparent' },
];

export function ViewerControls({
  selectedColor,
  onColorChange,
  lighting,
  onLightingChange,
  background,
  onBackgroundChange,
}: ViewerControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Material Controls</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="color-select">Color</Label>
          <div className="grid grid-cols-4 gap-2">
            {colorOptions.map((color) => (
              <Button
                key={color.value}
                variant={selectedColor === color.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onColorChange(color.value)}
                className="h-10 relative"
                style={{ 
                  backgroundColor: selectedColor === color.value ? undefined : color.value,
                  borderColor: color.value,
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-border"
                  style={{ backgroundColor: color.value }}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Lighting</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="lighting-select">Preset</Label>
          <Select value={lighting} onValueChange={onLightingChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {lightingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Background</h3>
        </div>

        <div className="space-y-2">
          <Label htmlFor="background-select">Style</Label>
          <Select value={background} onValueChange={onBackgroundChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}