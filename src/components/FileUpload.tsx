import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Upload, File, X, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileUpload: (file: File, url: string) => void;
  acceptedTypes?: string[];
  maxSize?: number;
}

export function FileUpload({ 
  onFileUpload,
  acceptedTypes = ['.glb', '.gltf'],
  maxSize = 20 * 1024 * 1024 // 20MB
}: FileUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Create a temporary URL for the uploaded file
      const url = URL.createObjectURL(file);
      setUploadedFile(file);
      onFileUpload(file, url);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for viewing`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/gltf-binary': ['.glb'],
      'model/gltf+json': ['.gltf'],
    },
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Upload 3D Model</h3>
        </div>

        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            
            {isDragActive ? (
              <p className="text-lg font-medium text-primary">Drop your 3D model here...</p>
            ) : (
              <>
                <p className="text-lg font-medium mb-2">
                  Drag & drop your 3D model here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports GLB and GLTF files up to 20MB
                </p>
                <Button variant="outline" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Choose File"}
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-viewer rounded-lg">
            <div className="flex items-center gap-3">
              <File className="w-8 h-8 text-viewer-accent" />
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-viewer-success" />
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}