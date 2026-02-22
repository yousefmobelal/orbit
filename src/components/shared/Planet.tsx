import { motion } from "framer-motion";
export const Planet: React.FC<{
  fromColor: string;
  toColor: string;
  size?: number;
}> = ({ fromColor, toColor, size = 16 }) => {
  const sizeInRem = size * 0.25;

  return (
    <motion.div
      className="flex justify-center"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-150"
          style={{ backgroundColor: fromColor }}
        />

        <motion.div
          className="relative rounded-full"
          style={{
            width: `${sizeInRem}rem`,
            height: `${sizeInRem}rem`,
            background: `linear-gradient(to bottom right, ${fromColor},${toColor})`,
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${fromColor}`,
              `0 0 30px ${toColor}`,
              `0 0 20px ${fromColor}`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full opacity-30">
            <div className="absolute top-6 left-8 w-2 h-2 bg-white/20 rounded-full blur-sm" />
            <div className="absolute bottom-8 right-2 w-3 h-3 bg-black/20 rounded-full blur-md" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
