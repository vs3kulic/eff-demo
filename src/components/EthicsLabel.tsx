import { cn } from "@/lib/utils";
import { Lock, User, Scale, Eye, Heart } from "lucide-react";

export type EthicsValue = "privacy" | "autonomy" | "fairness" | "transparency" | "dignity";

interface EthicsLabelProps {
  value: EthicsValue;
  className?: string;
  showIcon?: boolean;
}

const ethicsConfig: Record<EthicsValue, { label: string; icon: typeof Lock }> = {
  privacy: { label: "Privacy", icon: Lock },
  autonomy: { label: "Autonomy", icon: User },
  fairness: { label: "Fairness", icon: Scale },
  transparency: { label: "Transparency", icon: Eye },
  dignity: { label: "Dignity", icon: Heart },
};

export const EthicsLabel = ({ value, className, showIcon = true }: EthicsLabelProps) => {
  const config = ethicsConfig[value];
  const Icon = config.icon;

  return (
    <span className={cn(`ethics-label ethics-label--${value}`, className)}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
};

interface EthicsLabelsProps {
  values: EthicsValue[];
  className?: string;
}

export const EthicsLabels = ({ values, className }: EthicsLabelsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {values.map((value) => (
        <EthicsLabel key={value} value={value} />
      ))}
    </div>
  );
};
