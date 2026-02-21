import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function GalaxyScene() {
  return (
    <div className="w-full h-full bg-[#000010]">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />
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
