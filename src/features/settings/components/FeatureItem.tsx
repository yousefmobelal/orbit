import type { LucideIcon } from "lucide-react";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  color,
}: FeatureItemProps) => {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-[#0B0F1A]/50">
      <div
        className="size-8 rounded-lg flex items-center justify-center shrink-0"
        style={{
          backgroundColor: `${color}15`,
        }}
      >
        <Icon className="size-4" style={{ color }} />
      </div>
      <div className="flex-1">
        <p className="text-[#F9FAFB] font-medium text-sm mb-1">{title}</p>
        <p className="text-[#9CA3AF] text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
