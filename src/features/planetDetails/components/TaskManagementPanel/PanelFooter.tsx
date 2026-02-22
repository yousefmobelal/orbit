import { Button } from "@/components/ui/button";

interface PanelFooterProps {
  onSave: () => void;
}

export function PanelFooter({ onSave }: PanelFooterProps) {
  return (
    <div className="p-6 border-t border-white/10">
      <Button onClick={onSave} variant="gradient" size="lg" className="w-full">
        Save Changes
      </Button>
    </div>
  );
}
