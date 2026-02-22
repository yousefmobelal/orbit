export const OrbitRing: React.FC<{ radius: number; opacity?: number }> = ({
  radius,
  opacity = 0.1,
}) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white pointer-events-none"
      style={{
        width: radius * 2,
        height: radius * 2,
        opacity,
      }}
    />
  );
};
