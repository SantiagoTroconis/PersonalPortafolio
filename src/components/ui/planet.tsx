import { Float, Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";


export const Planet = ({ position, color, size, label, onClick }: any) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useCursor(hovered);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += delta * 0.2;
            const targetScale = hovered ? 1.2 : 1;
            mesh.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <Float floatIntensity={1} rotationIntensity={0.5} speed={1.5}>
            <mesh
                ref={mesh}
                position={position}
                onClick={onClick}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.7}
                    metalness={0.2}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.5 : 0.1}
                    wireframe={false}
                />
                <Html distanceFactor={15} position={[0, size + 0.5, 0]} center className="pointer-events-none">
                    <div className={`transition-all duration-300 ${hovered ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}>
                        <div className="px-3 py-1 rounded-md border border-cyan-500/50 bg-black/60 backdrop-blur-md text-cyan-400 font-mono text-xs tracking-widest whitespace-nowrap">
                            {label}
                        </div>
                        <div className="w-[1px] h-4 bg-cyan-500/50 mx-auto" />
                    </div>
                </Html>
            </mesh>
        </Float>
    );
};