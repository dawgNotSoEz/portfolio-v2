import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, geometry, hitRef }: { position: [number, number, number], color: string, geometry: string, hitRef?: { current: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const basePos = useRef<[number, number, number]>(position);
  // randomize phase so shapes don't sync exactly
  const phaseOffset = useRef(Math.random() * 4);
  const prevP = useRef(0);
  // horizontal velocity (units per second)
  const velocityX = useRef((Math.random() > 0.5 ? 1 : -1) * (1.0 + Math.random() * 1.4));
  // horizontal bounds (approx screen half-width at shape depth)
  const boundX = 6.5;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // gentle rotation
    meshRef.current.rotation.x += delta * 0.6;
    meshRef.current.rotation.y += delta * 0.9;

    // horizontal motion and bounce off sides
    meshRef.current.position.x += velocityX.current * delta;
    if (meshRef.current.position.x > boundX) {
      meshRef.current.position.x = boundX;
      velocityX.current = -Math.abs(velocityX.current) * (0.9 + Math.random() * 0.2);
      // trigger a hit-like event when bouncing off the screen edge
      if (hitRef) hitRef.current = state.clock.getElapsedTime();
    } else if (meshRef.current.position.x < -boundX) {
      meshRef.current.position.x = -boundX;
      velocityX.current = Math.abs(velocityX.current) * (0.9 + Math.random() * 0.2);
      if (hitRef) hitRef.current = state.clock.getElapsedTime();
    }

    const time = state.clock.getElapsedTime() + phaseOffset.current;
    const cycle = 5; // shorter cycle so it bounces/approaches more often
    const p = (time % cycle) / cycle; // 0..1 progress

    // approach window: shape moves forward and fades out between 50% and 80% of cycle
    const approachStart = 0.5;
    const approachEnd = 0.8;

    const baseZ = basePos.current[2];
    const frontZ = 6; // in front of camera (camera at ~4)

    if (p >= approachStart && p < approachEnd) {
      const t = (p - approachStart) / (approachEnd - approachStart);
      // ease-out movement forward
      const z = THREE.MathUtils.lerp(baseZ, frontZ, t);
      meshRef.current.position.z = z;
      // fade out
      const opacity = 1 - t;
      // set material opacity if available
      const mat: any = meshRef.current.material;
      if (mat) mat.opacity = opacity;
      // small scale 'squeeze' as it approaches
      const approachScale = 1 + Math.sin(t * Math.PI) * 0.08;
      meshRef.current.scale.set(approachScale, approachScale, approachScale);
    } else if (p >= approachEnd) {
      // after hitting the 'wall', teleport behind and fade back in
      const t = (p - approachEnd) / (1 - approachEnd);
      // start slightly past frontZ then animate back to baseZ
      const startZ = frontZ + 1;
      const z = THREE.MathUtils.lerp(startZ, baseZ, t);
      meshRef.current.position.z = z;
      const opacity = t; // fade in
      const mat: any = meshRef.current.material;
      if (mat) mat.opacity = opacity;
      // register hit moment when we cross into return phase
      if (hitRef && prevP.current < approachEnd) {
        hitRef.current = state.clock.getElapsedTime();
      }
      // bounce back animation scale on return
      const returnBounce = 1 + Math.sin(t * Math.PI * 2) * 0.12;
      meshRef.current.scale.set(returnBounce, returnBounce, returnBounce);
    } else {
      // normal resting/float zone: keep base position and full opacity
      meshRef.current.position.x = basePos.current[0];
      meshRef.current.position.y = basePos.current[1];
      meshRef.current.position.z = basePos.current[2];
      const mat: any = meshRef.current.material;
      if (mat) mat.opacity = 1;
    }
    // add a frequent subtle bounce while idle
    const idleBounce = 1 + Math.sin(time * 12 + phaseOffset.current) * 0.03;
    // only apply idle bounce when not in approach/return phases
    if (p < approachStart) {
      meshRef.current.scale.set(idleBounce, idleBounce, idleBounce);
    }
    prevP.current = p;
  });

  const GeometryComponent = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={[1.6, 64, 64]} />;
      case 'box':
        return <boxGeometry args={[1.6, 1.6, 1.6]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1.4]} />;
      case 'torus':
        return <torusGeometry args={[1.2, 0.4, 32, 64]} />;
      default:
        return <sphereGeometry args={[0.5, 32, 32]} />;
    }
  };

  return (
    <Float speed={1.8} rotationIntensity={2.5} floatIntensity={3.2}>
      <mesh ref={meshRef} position={position}>
        <GeometryComponent />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.6}
          roughness={0}
          transmission={1}
          ior={1.2}
          chromaticAberration={0.02}
          backside
          transparent
          opacity={1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  const hitRef = useRef(0);
  const { camera } = useThree();
  // camera shake state
  const shake = useRef({ time: 0, duration: 0.6, intensity: 0 });

  useFrame((state, delta) => {
    // if a hit was registered recently, start a shake
    if (hitRef.current && state.clock.getElapsedTime() - hitRef.current < 0.1) {
      shake.current.time = 0;
      shake.current.intensity = 0.14;
    }

    if (shake.current.intensity > 0) {
      shake.current.time += delta;
      const t = shake.current.time / shake.current.duration;
      const damp = Math.exp(-3 * t);
      const magnitude = shake.current.intensity * damp;
      camera.position.x = Math.sin(state.clock.getElapsedTime() * 40) * magnitude;
      camera.position.y = Math.cos(state.clock.getElapsedTime() * 38) * magnitude;
      camera.lookAt(0, 0, 0);
      if (t >= 1) {
        // reset
        shake.current.intensity = 0;
        camera.position.set(0, 0, 4);
      }
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingShape position={[4.5, 4.5, -3]} color="#8b5cf6" geometry="sphere" hitRef={hitRef} />
      <FloatingShape position={[-4.5, -3.5, -3]} color="#06b6d4" geometry="octahedron" hitRef={hitRef} />
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
        camera={{ position: [0, 0, 4], fov: 50 }}
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