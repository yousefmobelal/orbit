import { motion } from "framer-motion";

export const SpinningPlanet: React.FC<{
  fromColor: string;
  viaColor: string;
  toColor: string;
  size?: number;
  orbitRadius?: number; // distance from center
  orbitDuration?: number; // orbit speed
  spinDuration?: number; // self rotation speed
}> = ({
  fromColor,
  viaColor,
  toColor,
  size = 16,
  orbitRadius = 120,
  orbitDuration = 20,
  spinDuration = 12,
}) => {
  const sizeInRem = size * 0.25;

  return (
    <div className="relative flex items-center justify-center">
      {/* Orbit container */}
      <motion.div
        className="absolute"
        animate={{ rotate: 360 }}
        transition={{
          duration: orbitDuration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          width: orbitRadius * 2,
          height: orbitRadius * 2,
        }}
      >
        {/* Planet position on orbit */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            transformOrigin: "center",
          }}
        >
          {/* Planet */}
          <motion.div
            className="relative overflow-hidden rounded-full"
            style={{
              width: `${sizeInRem}rem`,
              height: `${sizeInRem}rem`,
              background: `
                radial-gradient(circle at 30% 25%, rgba(255,255,255,0.5), transparent 40%),
                radial-gradient(circle at 75% 70%, rgba(0,0,0,0.45), transparent 60%),
                linear-gradient(140deg, ${fromColor}, ${viaColor}, ${toColor})
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
            {/* Atmosphere glow */}
            <div
              className="absolute inset-[-6%] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${fromColor}55, transparent 70%)`,
                filter: "blur(10px)",
              }}
            />

            {/* Terminator shadow (day/night edge) */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.55), transparent 40%)",
                mixBlendMode: "multiply",
              }}
            />

            {/* Specular light */}
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
    </div>
  );
};
