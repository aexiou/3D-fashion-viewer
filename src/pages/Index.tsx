import { useState } from 'react';
import { Viewer3D } from '../components/Viewer3D';
import { FileUpload } from '../components/FileUpload';
import { ViewerControls } from '../components/ViewerControls';
import { EmbedGenerator } from '../components/EmbedGenerator';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const [currentModel, setCurrentModel] = useState<{ file: File; url: string } | null>(null);
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [lighting, setLighting] = useState('studio');
  const [background, setBackground] = useState('white');

  const handleFileUpload = (file: File, url: string) => {
    setCurrentModel({ file, url });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-primary">3D Fashion Viewer</h1>
              <Badge variant="secondary">MVP</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-viewer-success/10 text-viewer-success border-viewer-success">
                Free Plan
              </Badge>
              <Button variant="outline" size="sm">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Controls */}
          <div className="space-y-6">
            <FileUpload onFileUpload={handleFileUpload} />
            <ViewerControls
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              lighting={lighting}
              onLightingChange={setLighting}
              background={background}
              onBackgroundChange={setBackground}
            />
          </div>

          {/* Center Column - 3D Viewer */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="viewer" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="viewer">3D Viewer</TabsTrigger>
                <TabsTrigger value="embed">Embed Code</TabsTrigger>
              </TabsList>

              <TabsContent value="viewer" className="space-y-4">
                <Viewer3D
                  modelUrl={currentModel?.url}
                  selectedColor={selectedColor}
                  lighting={lighting}
                  background={background}
                  showWatermark={true}
                />
                <div className="text-center text-sm text-muted-foreground">
                  {currentModel ? (
                    <>Viewing: {currentModel.file.name}</>
                  ) : (
                    <>Upload a GLB/GLTF file to start viewing</>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="embed">
                <EmbedGenerator
                  modelId={currentModel?.file.name || 'default'}
                  currentColor={selectedColor}
                  currentLighting={lighting}
                  currentBackground={background}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Features Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-lg bg-card">
            <h3 className="font-semibold mb-2">Interactive 3D Viewer</h3>
            <p className="text-sm text-muted-foreground">
              Orbit, zoom, and interact with your 3D models in real-time
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card">
            <h3 className="font-semibold mb-2">Material Customization</h3>
            <p className="text-sm text-muted-foreground">
              Change colors, lighting, and backgrounds dynamically
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-card">
            <h3 className="font-semibold mb-2">Easy Embedding</h3>
            <p className="text-sm text-muted-foreground">
              Generate embed codes for your website or store
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
