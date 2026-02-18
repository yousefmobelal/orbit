import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "../planet/Planet";
import Satellite from "../satellite/Satellite";

// --- Types ---

interface SatelliteConfig {
  orbitRadius: number;
  orbitSpeed: number;
  orbitTilt: number;
  bodyColor: string;
  panelColor: string;
  initialAngle: number;
}

interface PlanetConfig {
  id: string;
  position: [number, number, number];
  color1: string;
  color2: string;
  glowColor: string;
  satellites: SatelliteConfig[];
}

// --- Data ---

const PLANETS: PlanetConfig[] = [
  {
    id: "coding",
    position: [5.5, 0, 0] as [number, number, number],
    color1: "#1a4fd6",
    color2: "#0d1b6e",
    glowColor: "#4fc3f7",
    satellites: [
      {
        orbitRadius: 2.2,
        orbitSpeed: 0.9,
        orbitTilt: 0.2,
        bodyColor: "#4fc3f7",
        panelColor: "#1a237e",
        initialAngle: 0,
      },
      {
        orbitRadius: 2.8,
        orbitSpeed: 0.5,
        orbitTilt: 0.5,
        bodyColor: "#80deea",
        panelColor: "#0d47a1",
        initialAngle: 2,
      },
    ],
  },
  {
    id: "gym",
    position: [2.75, 4.76, 0] as [number, number, number],
    color1: "#d62c1a",
    color2: "#5c0d0d",
    glowColor: "#ff7043",
    satellites: [
      {
        orbitRadius: 2.3,
        orbitSpeed: 1.1,
        orbitTilt: 0.3,
        bodyColor: "#ff7043",
        panelColor: "#b71c1c",
        initialAngle: 1,
      },
    ],
  },
  {
    id: "reading",
    position: [-2.75, 4.76, 0] as [number, number, number],
    color1: "#c4a21a",
    color2: "#5c3d0d",
    glowColor: "#ffe082",
    satellites: [
      {
        orbitRadius: 2.4,
        orbitSpeed: 0.7,
        orbitTilt: 0.4,
        bodyColor: "#ffe082",
        panelColor: "#e65100",
        initialAngle: 3,
      },
    ],
  },
  {
    id: "meditation",
    position: [-5.5, 0, 0] as [number, number, number],
    color1: "#2e7d32",
    color2: "#1b5e20",
    glowColor: "#81c784",
    satellites: [
      {
        orbitRadius: 2.5,
        orbitSpeed: 0.6,
        orbitTilt: 0.35,
        bodyColor: "#81c784",
        panelColor: "#2e7d32",
        initialAngle: 4,
      },
    ],
  },
  {
    id: "music",
    position: [-2.75, -4.76, 0] as [number, number, number],
    color1: "#7b1fa2",
    color2: "#4a148c",
    glowColor: "#ba68c8",
    satellites: [
      {
        orbitRadius: 2.3,
        orbitSpeed: 0.8,
        orbitTilt: 0.45,
        bodyColor: "#ba68c8",
        panelColor: "#6a1b9a",
        initialAngle: 5,
      },
      {
        orbitRadius: 2.9,
        orbitSpeed: 0.4,
        orbitTilt: 0.25,
        bodyColor: "#ce93d8",
        panelColor: "#4a148c",
        initialAngle: 1.5,
      },
    ],
  },
  {
    id: "writing",
    position: [2.75, -4.76, 0] as [number, number, number],
    color1: "#e65100",
    color2: "#bf360c",
    glowColor: "#ff9800",
    satellites: [
      {
        orbitRadius: 2.2,
        orbitSpeed: 1.0,
        orbitTilt: 0.3,
        bodyColor: "#ff9800",
        panelColor: "#e65100",
        initialAngle: 2.5,
      },
    ],
  },
];

// --- Scene ---

export default function GalaxyScene() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000010" }}>
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* {PLANETS.map((planet) => (
          <group key={planet.id}>
            <Planet
              position={planet.position}
              color1={planet.color1}
              color2={planet.color2}
              glowColor={planet.glowColor}
              radius={1.5}
            />
            {planet.satellites.map((sat, i) => (
              <Satellite planetPosition={planet.position} {...sat} key={i} />
            ))}
          </group>
        ))} */}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          zoomSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
