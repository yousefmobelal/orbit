import { motion } from "framer-motion";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "#4DA3FF",
}) => {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 56,
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="rounded-full border-4 border-transparent"
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderTopColor: color,
          borderRightColor: `${color}60`,
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
