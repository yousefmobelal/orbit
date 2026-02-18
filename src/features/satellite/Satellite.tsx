import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- Types ---

interface SatelliteProps {
  planetPosition?: [number, number, number];
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitTilt?: number;
  bodyColor?: string;
  panelColor?: string;
  initialAngle?: number;
}

// --- Satellite ---

export default function Satellite({
  planetPosition = [0, 0, 0],
  orbitRadius = 2.5,
  orbitSpeed = 0.8,
  orbitTilt = 0.3,
  bodyColor = "#4fc3f7",
  panelColor = "#1a237e",
  initialAngle = 0,
}: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef<number>(initialAngle);

  useFrame((_, delta) => {
    angleRef.current += delta * orbitSpeed;

    const x = planetPosition[0] + Math.cos(angleRef.current) * orbitRadius;
    const y =
      planetPosition[1] + Math.sin(angleRef.current) * orbitTilt * orbitRadius;
    const z = planetPosition[2] + Math.sin(angleRef.current) * orbitRadius;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.y = angleRef.current;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[0.18, 0.18, 0.28]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Solar panel left */}
      <mesh position={[-0.38, 0, 0]}>
        <boxGeometry args={[0.35, 0.02, 0.18]} />
        <meshStandardMaterial
          color={panelColor}
          metalness={0.5}
          roughness={0.3}
          emissive={panelColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Solar panel right */}
      <mesh position={[0.38, 0, 0]}>
        <boxGeometry args={[0.35, 0.02, 0.18]} />
        <meshStandardMaterial
          color={panelColor}
          metalness={0.5}
          roughness={0.3}
          emissive={panelColor}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Antenna stem */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.18, 8]} />
        <meshStandardMaterial color="#cfd8dc" metalness={1} roughness={0.1} />
      </mesh>

      {/* Antenna dish */}
      <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.07, 0.05, 8, 1, true]} />
        <meshStandardMaterial
          color="#cfd8dc"
          metalness={1}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
