import { cn } from "@/lib/utils";
import { Lock, Scale, Eye, ShieldCheck, Target } from "lucide-react";

export type EthicsValue = "utility" | "fairness" | "privacy" | "explainability" | "safety";

interface EthicsLabelProps {
  value: EthicsValue;
  className?: string;
  showIcon?: boolean;
}

const ethicsConfig: Record<EthicsValue, { label: string; icon: typeof Lock }> = {
  utility: { label: "Utility", icon: Target },
  fairness: { label: "Fairness", icon: Scale },
  privacy: { label: "Privacy", icon: Lock },
  explainability: { label: "Explainability", icon: Eye },
  safety: { label: "Safety", icon: ShieldCheck },
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
