import { motion } from "framer-motion";

export const SpinningPlanet: React.FC<{
  fromColor: string;
  toColor: string;
  onClick: () => void;
  size?: number;
  orbitRadius?: number; // distance from center
  orbitDuration?: number; // orbit speed
  spinDuration?: number; // self rotation speed
  startAngle?: number; // starting position in degrees
}> = ({
  fromColor,
  toColor,
  onClick,
  size = 16,
  orbitRadius = 120,
  orbitDuration = 20,
  spinDuration = 12,
  startAngle = 0,
}) => {
  const sizeInRem = size * 0.25;

  return (
    <motion.div
      onClick={onClick}
      className="absolute cursor-pointer"
      style={{
        width: orbitRadius * 2,
        height: orbitRadius * 2,
        left: "50%",
        top: "50%",
        marginLeft: -orbitRadius,
        marginTop: -orbitRadius,
      }}
      animate={{ rotate: startAngle + 360 }}
      initial={{ rotate: startAngle }}
      transition={{
        duration: orbitDuration,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          transformOrigin: `center ${orbitRadius}px`,
        }}
      >
        <motion.div
          className="relative overflow-hidden rounded-full"
          style={{
            width: `${sizeInRem}rem`,
            height: `${sizeInRem}rem`,
            background: `
                radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5), transparent 40%),
                radial-gradient(circle at 75% 70%, rgba(0,0,0,0.45), transparent 60%),
                linear-gradient(140deg, ${fromColor}, ${toColor})
              `,
            boxShadow: `
                inset -20px -20px 40px rgba(0,0,0,0.5),
                inset 10px 10px 25px rgba(255,255,255,0.2),
                0 0 30px ${fromColor}55
              `,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: spinDuration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div
            className="absolute inset-[-6%] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${fromColor}55, transparent 70%)`,
              filter: "blur(10px)",
            }}
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.55), transparent 40%)",
              mixBlendMode: "multiply",
            }}
          />

          <div
            className="absolute rounded-full"
            style={{
              top: "12%",
              left: "18%",
              width: "28%",
              height: "28%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.9), transparent 70%)",
              filter: "blur(4px)",
              opacity: 0.8,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
