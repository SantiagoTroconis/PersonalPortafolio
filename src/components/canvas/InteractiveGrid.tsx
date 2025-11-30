import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Aspect ratio correction
  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV = uv;
  aspectUV.x *= aspect;
  
  vec2 aspectMouse = uMouse;
  aspectMouse.x *= aspect;
  
  // Grid
  float gridSize = 20.0;
  vec2 gridUV = uv * vec2(gridSize * aspect, gridSize);
  vec2 grid = fract(gridUV);
  
  // Líneas mucho más suaves usando smoothstep en lugar de step
  // Esto elimina el efecto "pixelado" o duro
  float lineThickness = 0.05;
  float linesX = smoothstep(0.0, lineThickness, grid.x) * smoothstep(1.0, 1.0 - lineThickness, grid.x);
  float linesY = smoothstep(0.0, lineThickness, grid.y) * smoothstep(1.0, 1.0 - lineThickness, grid.y);
  
  // Invertir para obtener las líneas
  float lines = 1.0 - (linesX * linesY);
  
  // Mouse interaction (Glow)
  float dist = distance(aspectUV, aspectMouse);
  float glowRadius = 0.5;
  float glow = 1.0 - smoothstep(0.0, glowRadius, dist);
  
  // Colores: Usamos transparencia en lugar de un color base fijo
  // Esto permite que el fondo CSS de la página se vea a través
  vec3 gridColor = vec3(0.5, 0.5, 0.6); // Gris un poco más claro para visibilidad
  vec3 glowColor = vec3(0.6, 0.7, 1.0); // Azul más brillante para el mouse
  
  // Mezcla final
 vec3 finalColor = gridColor * lines * 0.25; 
  finalColor += glowColor * glow * lines * 0.8;
  
  // Vignette suave para que el grid desaparezca en los bordes
  float centerDist = distance(uv, vec2(0.5));
  float alpha = 1.0 - smoothstep(0.2, 0.9, centerDist);
  
  // Multiplicamos el alpha de las líneas por el vignette
  // Importante: No pintamos fondo negro, solo líneas con alpha
  gl_FragColor = vec4(finalColor, lines * alpha * 0.8); 
}
`;

export const InteractiveGrid = () => {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { viewport } = useThree();
    const mousePosition = useRef(new THREE.Vector2(0.5, 0.5));

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
        }),
        [viewport]
    );

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const x = event.clientX / window.innerWidth;
            const y = 1 - (event.clientY / window.innerHeight);
            mousePosition.current.set(x, y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();
            material.uniforms.uResolution.value.set(state.viewport.width, state.viewport.height);
            // Lerp para suavizar el movimiento del glow
            material.uniforms.uMouse.value.lerp(mousePosition.current, 0.1);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true} // CRUCIAL para ver el fondo CSS
                depthWrite={false}
            />
        </mesh>
    );
};