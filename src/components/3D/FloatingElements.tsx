import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry }: { position: [number, number, number], color: string, geometry: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const GeometryComponent = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'box':
        return <boxGeometry args={[0.8, 0.8, 0.8]} />;
      case 'octahedron':
        return <octahedronGeometry args={[0.6]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      default:
        return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <GeometryComponent />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.2}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.02}
          backside
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <FloatingShape position={[-3, 2, -2]} color="#8b5cf6" geometry="sphere" />
      <FloatingShape position={[3, -1, -3]} color="#06b6d4" geometry="octahedron" />
      <FloatingShape position={[0, 1, -4]} color="#10b981" geometry="torus" />
      <FloatingShape position={[-2, -2, -1]} color="#f59e0b" geometry="box" />
      <FloatingShape position={[2, 3, -2]} color="#ef4444" geometry="sphere" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-muted-foreground">Loading 3D elements...</div>
    </div>
  );
}

export default function FloatingElements({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}