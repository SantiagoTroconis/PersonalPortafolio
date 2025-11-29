import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { InteractiveGrid } from './InteractiveGrid';
import { Particles } from './Particles';
import { PointLight } from 'three';

const SceneLighting = () => {
  const lightRef = useRef<PointLight>(null!);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 5;
      lightRef.current.position.y = state.pointer.y * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={2} distance={10} />
    </>
  );
};

export const Scene = () => {
  return (
    <Canvas
      eventSource={document.body}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#050505', // Dark background to match the grid
      }}
      camera={{ position: [0, 0, 1], fov: 75 }} // Orthographic-like perspective for the grid
    >
      <SceneLighting />
      <InteractiveGrid />
      <Particles />
      <Preload all />
    </Canvas>
  );
};