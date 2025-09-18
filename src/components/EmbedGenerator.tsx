import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Copy, Code, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmbedGeneratorProps {
  modelId?: string;
  currentColor: string;
  currentLighting: string;
  currentBackground: string;
}

export function EmbedGenerator({
  modelId = 'default',
  currentColor,
  currentLighting,
  currentBackground
}: EmbedGeneratorProps) {
  const [embedSettings, setEmbedSettings] = useState({
    width: '600',
    height: '400',
    showControls: true,
    showWatermark: true,
    autoRotate: false,
  });
  
  const { toast } = useToast();

  const generateEmbedCode = () => {
    const params = new URLSearchParams({
      modelId,
      color: currentColor,
      lighting: currentLighting,
      background: currentBackground,
      width: embedSettings.width,
      height: embedSettings.height,
      showControls: embedSettings.showControls.toString(),
      showWatermark: embedSettings.showWatermark.toString(),
      autoRotate: embedSettings.autoRotate.toString(),
    });

    const iframeUrl = `${window.location.origin}/embed?${params.toString()}`;
    
    return `<iframe 
  src="${iframeUrl}"
  width="${embedSettings.width}"
  height="${embedSettings.height}"
  frameborder="0"
  allowfullscreen
  style="border: none; border-radius: 8px;"
></iframe>`;
  };

  const generateScriptTag = () => {
    const params = {
      modelId,
      color: currentColor,
      lighting: currentLighting,
      background: currentBackground,
      ...embedSettings,
    };

    return `<script>
  (function() {
    var viewer = document.createElement('div');
    viewer.id = 'fashion-viewer-${modelId}';
    viewer.style.width = '${embedSettings.width}px';
    viewer.style.height = '${embedSettings.height}px';
    
    var iframe = document.createElement('iframe');
    iframe.src = '${window.location.origin}/embed?${new URLSearchParams(params as any).toString()}';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '8px';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = true;
    
    viewer.appendChild(iframe);
    document.currentScript.parentNode.insertBefore(viewer, document.currentScript);
  })();
</script>`;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${type} code copied successfully`,
    });
  };

  const embedCode = generateEmbedCode();
  const scriptCode = generateScriptTag();

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Code className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Embed Code Generator</h3>
      </div>

      {/* Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            value={embedSettings.width}
            onChange={(e) => setEmbedSettings({ ...embedSettings, width: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="height">Height (px)</Label>
          <Input
            id="height"
            value={embedSettings.height}
            onChange={(e) => setEmbedSettings({ ...embedSettings, height: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-controls">Show Controls</Label>
          <Switch
            id="show-controls"
            checked={embedSettings.showControls}
            onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, showControls: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="show-watermark">Show Watermark</Label>
          <Switch
            id="show-watermark"
            checked={embedSettings.showWatermark}
            onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, showWatermark: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-rotate">Auto Rotate</Label>
          <Switch
            id="auto-rotate"
            checked={embedSettings.autoRotate}
            onCheckedChange={(checked) => setEmbedSettings({ ...embedSettings, autoRotate: checked })}
          />
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <Label>Preview</Label>
        <div className="border rounded-lg p-4 bg-viewer">
          <div 
            className="bg-muted rounded flex items-center justify-center text-sm text-muted-foreground"
            style={{ 
              width: Math.min(parseInt(embedSettings.width), 400), 
              height: Math.min(parseInt(embedSettings.height), 200) 
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            3D Viewer Preview ({embedSettings.width}x{embedSettings.height})
          </div>
        </div>
      </div>

      {/* Embed Codes */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>iframe Embed Code</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(embedCode, 'iframe')}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={embedCode}
            readOnly
            className="font-mono text-sm h-32"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Script Tag (Auto-embed)</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(scriptCode, 'script')}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={scriptCode}
            readOnly
            className="font-mono text-sm h-40"
          />
        </div>
      </div>
    </Card>
  );
}