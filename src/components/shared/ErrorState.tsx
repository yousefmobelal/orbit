import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Something went wrong",
  onRetry,
  title = "Oops!",
}) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-75 p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-[#121826] rounded-2xl p-8 backdrop-blur-sm border border-white/10 text-center max-w-md">
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ backgroundColor: "#EF4444" }}
            />
            <div className="relative bg-[#EF4444]/20 p-4 rounded-full border border-[#EF4444]/30">
              <AlertCircle className="w-12 h-12 text-[#EF4444]" />
            </div>
          </div>
        </motion.div>

        <motion.h3
          className="text-2xl text-[#F9FAFB] mb-2"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 600,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-[#9CA3AF] mb-6"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>

        {onRetry && (
          <Button
            onClick={onRetry}
            size="sm"
            rounded="lg"
            animateDelay={0.4}
            className="flex items-center gap-2 mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  );
};
