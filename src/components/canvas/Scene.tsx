import { Canvas } from '@react-three/fiber';
import { SpaceBackground } from './SpaceBackground';

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
      }}
      camera={{ position: [0, 0, 20], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['#050508']} />
      <fog attach="fog" args={['#050508', 20, 60]} />

      <SpaceBackground />
    </Canvas>
  );
};