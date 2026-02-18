import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import type { ShaderMaterial } from "three";

// --- GLSL Shaders ---

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float uTime;
  uniform vec3 uColor1;   // base color
  uniform vec3 uColor2;   // band color
  uniform vec3 uGlowColor;

  // Simple noise function
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Swirling surface
    vec2 uv = vUv;
    uv.x += uTime * 0.03; // slow rotation effect

    float n = fbm(uv * 3.0 + fbm(uv * 2.0 + uTime * 0.02));

    // Color bands like the shadertoy
    float band = sin(vUv.y * 10.0 + n * 4.0) * 0.5 + 0.5;
    vec3 surfaceColor = mix(uColor1, uColor2, band);

    // Rim glow (atmosphere)
    float rim = 1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0));
    rim = pow(rim, 2.5);
    vec3 finalColor = mix(surfaceColor, uGlowColor, rim * 0.7);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Create the material
const PlanetMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor1: new THREE.Color("#1a4fd6"),
    uColor2: new THREE.Color("#0a1a5c"),
    uGlowColor: new THREE.Color("#4fc3f7"),
  },
  vertexShader,
  fragmentShader,
);

// Extend the material type
type PlanetMaterialImpl = ShaderMaterial & {
  uTime: number;
  uColor1: THREE.Color;
  uColor2: THREE.Color;
  uGlowColor: THREE.Color;
};

extend({ PlanetMaterial });

// Declare the extended element for TypeScript
declare module "@react-three/fiber" {
  interface ThreeElements {
    planetMaterial: object;
  }
}

// --- Planet Component ---

export default function Planet({
  color1 = "#1a4fd6",
  color2 = "#0a1a5c",
  glowColor = "#4fc3f7",
  radius = 1.5,
  position = [0, 0, 0] as [number, number, number],
}) {
  const materialRef = useRef<PlanetMaterialImpl>(null!);

  // Animate time uniform
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 64, 64]} />
      <planetMaterial
        ref={materialRef}
        uColor1={new THREE.Color(color1)}
        uColor2={new THREE.Color(color2)}
        uGlowColor={new THREE.Color(glowColor)}
      />
    </mesh>
  );
}
