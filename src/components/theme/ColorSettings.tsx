import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from './ThemeContext';

interface ColorSettingsProps {
  onThemeChange: (values: any) => void;
}

export function ColorSettings({ onThemeChange }: ColorSettingsProps) {
  const theme = useTheme();

  return (
    <div className="space-y-2">
      <Label>Colors</Label>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Primary</Label>
          <Input
            type="color"
            value={theme.primaryColor || '#000000'}
            onChange={(e) => onThemeChange({ primary_color: e.target.value })}
            className="h-10 p-1"
          />
        </div>
        <div className="space-y-2">
          <Label>Secondary</Label>
          <Input
            type="color"
            value={theme.secondaryColor || '#000000'}
            onChange={(e) => onThemeChange({ secondary_color: e.target.value })}
            className="h-10 p-1"
          />
        </div>
      </div>
    </div>
  );
}