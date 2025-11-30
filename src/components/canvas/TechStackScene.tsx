import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls, Center } from "@react-three/drei";
import { SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiPython, SiTailwindcss, SiGit, SiNextdotjs } from "react-icons/si";
import { Suspense } from "react";

const icons = [
    { component: SiJavascript, color: "#F7DF1E", position: [-2, 2, 0] },
    { component: SiTypescript, color: "#3178C6", position: [2, 1.5, -1] },
    { component: SiReact, color: "#61DAFB", position: [-2.5, -1, 1] },
    { component: SiNodedotjs, color: "#339933", position: [2.5, -2, 0] },
    { component: SiPython, color: "#3776AB", position: [0, 2.5, -2] },
    { component: SiTailwindcss, color: "#06B6D4", position: [0, -2.5, 1] },
    { component: SiGit, color: "#F05032", position: [-1.5, 0.5, 2] },
    { component: SiNextdotjs, color: "#FFFFFF", position: [1.5, -0.5, 2] },
];

const FloatingIcon = ({ icon: Icon, color, position }: any) => {
    return (
        <Float
            speed={2.5}
            rotationIntensity={1.5}
            floatIntensity={3}
            position={position}
        >
            <Html transform distanceFactor={3.5}>
                <div
                    className="w-32 h-32 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-125 hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group"
                >
                    <Icon className="w-32 h-32 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ color }} />
                </div>
            </Html>
        </Float>
    );
};

export const TechStackScene = () => {
    return (
        <div className="w-full h-full min-h-[400px] relative cursor-grab active:cursor-grabbing">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.8}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />

                    <Center>
                        <group>
                            {icons.map((item, index) => (
                                <FloatingIcon
                                    key={index}
                                    icon={item.component}
                                    color={item.color}
                                    position={item.position}
                                />
                            ))}
                        </group>
                    </Center>
                </Suspense>
            </Canvas>
        </div>
    );
};