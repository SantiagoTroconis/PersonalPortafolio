import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
    const ref = useRef<THREE.Points>(null!);
    const { viewport } = useThree();

    // Generamos 3000 estrellas
    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(6000 * 3);
        const sz = new Float32Array(6000);

        for (let i = 0; i < 6000; i++) {
            // Distribución esférica para profundidad
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            // Radio variable para llenar el espacio
            const r = 10 + Math.random() * 40;

            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);     // x
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y
            pos[i * 3 + 2] = r * Math.cos(phi);                   // z

            // Tamaños variados para realismo
            sz[i] = Math.random() * 1.5 + 0.5;
        }
        return [pos, sz];
    }, []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#ffffff") }, // Estrellas blancas/azuladas
    }), []);

    useFrame((state) => {
        const { clock, pointer } = state;
        if (ref.current && ref.current.material) {
            const material = ref.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = clock.getElapsedTime();
        }

        // Rotación sutil y paralaje con el mouse
        if (ref.current) {
            ref.current.rotation.y = clock.getElapsedTime() * 0.02; // Rotación base lenta
            ref.current.rotation.x = pointer.y * 0.05; // Paralaje vertical suave
            ref.current.rotation.y += pointer.x * 0.05; // Paralaje horizontal suave
        }
    });

    const vertexShader = `
        uniform float uTime;
        attribute float aSize;
        varying float vAlpha;

        void main() {
        vec3 pos = position;
        
        // Movimiento orgánico muy sutil
        pos.x += sin(uTime * 0.5 + pos.z) * 0.2;
        pos.y += cos(uTime * 0.5 + pos.x) * 0.2;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Tamaño basado en atributo y distancia (perspectiva)
        gl_PointSize = aSize * (20.0 / -mvPosition.z);
        
        // Las estrellas más lejanas son más tenues
        vAlpha = smoothstep(50.0, 10.0, -mvPosition.z);
        }
    `;

    const fragmentShader = `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
        // Forma redonda suave
        float strength = distance(gl_PointCoord, vec2(0.5));
        strength = 1.0 - strength;
        strength = pow(strength, 3.0);

        if (strength < 0.1) discard;

        gl_FragColor = vec4(uColor, strength * vAlpha * 0.8);
        }
    `;

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                transparent
                depthWrite={false}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const SpaceBackground = () => {
    return (
        <group rotation={[0, 0, Math.PI / 4]}> {/* Inclinación inicial para dinamismo */}
            <Stars />
            {/* Podríamos añadir otra capa de estrellas más pequeñas y lejanas aquí si quisiéramos más profundidad */}
        </group>
    );
};