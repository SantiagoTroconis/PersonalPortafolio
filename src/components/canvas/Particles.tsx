import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const Particles = ({ count = 10000 }) => {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const { pointer } = state;
      const targetX = pointer.y * 2;
      const targetY = pointer.x * 2;

      // Use lerp for smoother animation
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.03);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.03);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};