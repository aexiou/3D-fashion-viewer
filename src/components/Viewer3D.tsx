import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, PresentationControls } from '@react-three/drei';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react';
import * as THREE from 'three';

interface Viewer3DProps {
  modelUrl?: string;
  selectedColor?: string;
  lighting?: string;
  background?: string;
  showWatermark?: boolean;
}

function Model({ url, color = '#ffffff' }: { url: string; color?: string }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Auto-rotate slightly when idle
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  // Apply color to materials
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
      if ('color' in child.material) {
        (child.material as any).color.set(color);
      }
    }
  });

  return <primitive ref={meshRef} object={scene} scale={1} />;
}

function DefaultModel({ color = '#3b82f6' }: { color?: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function Viewer3D({ 
  modelUrl, 
  selectedColor = '#3b82f6', 
  lighting = 'studio', 
  background = 'white',
  showWatermark = true 
}: Viewer3DProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getEnvironment = () => {
    switch (lighting) {
      case 'studio': return 'studio';
      case 'sunset': return 'sunset';
      case 'dawn': return 'dawn';
      case 'warehouse': return 'warehouse';
      default: return 'studio';
    }
  };

  const getBackgroundColor = () => {
    switch (background) {
      case 'white': return '#ffffff';
      case 'black': return '#000000';
      case 'gray': return '#6b7280';
      case 'transparent': return 'transparent';
      default: return '#ffffff';
    }
  };

  return (
    <Card className="relative w-full h-[600px] overflow-hidden bg-viewer shadow-viewer">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 60 }}
        style={{ background: getBackgroundColor() }}
      >
        <Suspense 
          fallback={
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#94a3b8" wireframe />
            </mesh>
          }
        >
          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            {modelUrl ? (
              <Model url={modelUrl} color={selectedColor} />
            ) : (
              <DefaultModel color={selectedColor} />
            )}
          </PresentationControls>
          
          <Environment preset={getEnvironment()} />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={20} />
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>

      {/* Watermark */}
      {showWatermark && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          3D Fashion Viewer
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      )}
    </Card>
  );
}