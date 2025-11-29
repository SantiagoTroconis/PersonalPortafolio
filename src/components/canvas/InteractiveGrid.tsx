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
  
  // Correct aspect ratio for interaction
  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV = uv;
  aspectUV.x *= aspect;
  
  vec2 aspectMouse = uMouse;
  aspectMouse.x *= aspect;
  
  // Grid configuration
  float gridSize = 20.0;
  // Adjust grid density based on aspect ratio to keep cells square
  vec2 gridUV = uv * vec2(gridSize * aspect, gridSize);
  
  vec2 grid = fract(gridUV);
  float lineThickness = 0.03; // Slightly thicker for elegance
  
  float lines = step(lineThickness, grid.x) * step(lineThickness, grid.y);
  lines = 1.0 - lines;
  
  // Mouse interaction
  float dist = distance(aspectUV, aspectMouse);
  float glowRadius = 0.4;
  float glow = 1.0 - smoothstep(0.0, glowRadius, dist);
  
  // Elegant Color Palette
  vec3 baseColor = vec3(0.02, 0.02, 0.03); // Very dark slate/black
  vec3 gridColor = vec3(0.15, 0.15, 0.2);  // Subtle slate gray lines
  vec3 glowColor = vec3(0.8, 0.85, 0.9);   // Soft white/silver glow
  
  // Mix colors
  vec3 finalColor = mix(baseColor, gridColor, lines * 0.5); // Base grid
  
  // Add glow effect
  // Glow lights up the lines more intensely
  finalColor += glowColor * glow * lines * 3.0; 
  // Ambient glow around the cursor
  finalColor += glowColor * glow * 0.05;
  
  // Vignette / Fade out edges
  float centerDist = distance(uv, vec2(0.5));
  float alpha = 1.0 - smoothstep(0.3, 0.8, centerDist);
  
  gl_FragColor = vec4(finalColor, 1.0);
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

    // Use a global event listener to track mouse position
    // This ensures the grid reacts even when hovering over other UI elements
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            // Normalize mouse position to 0..1
            const x = event.clientX / window.innerWidth;
            const y = 1 - (event.clientY / window.innerHeight); // Flip Y for shader UVs
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

            // Directly set the mouse value without lerp for instant response
            material.uniforms.uMouse.value.copy(mousePosition.current);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};
