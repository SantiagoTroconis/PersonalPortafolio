import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Planet } from "../ui/planet";

const SolarScene = () => {
    const handleNav = (section: string) => {
        console.log("Viajando a:", section);
    };

    return (
        <group>
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#4c1d95" />

            <Planet
                position={[-4, 0, 0]}
                size={.7}
                color="#3b82f6"
                label="[ BIO_DATA ]"
                onClick={() => handleNav('about')}
            />

            <Planet
                position={[0, 0, -2]}
                size={.4}
                color="#10b981"
                label="[ PROJECTS ]"
                onClick={() => handleNav('projects')}
            />

            <Planet
                position={[4, 0, 0.5]}
                size={.9}
                color="#f43f5e"
                label="[ COMM_LINK ]"
                onClick={() => handleNav('contact')}
            />

            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={200}
                        array={new Float32Array(600).map(() => (Math.random() - 0.5) * 25)}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.4} />
            </points>
        </group>
    );
};

export const HeroScene = () => {
    return (
        <div className="absolute inset-0 w-full h-full z-10 cursor-move">
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                <SolarScene />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    rotateSpeed={0.5}
                    enableDamping={true}
                    dampingFactor={0.05}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
};