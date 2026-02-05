import { cn } from "@/lib/utils";

interface FlowAnnotationProps {
  step: number;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export const FlowAnnotation = ({
  step,
  title,
  description,
  className,
  children,
}: FlowAnnotationProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Annotation badge */}
      <div className="absolute -top-3 left-4 z-10">
        <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-card">
          <span className="font-mono text-xs font-semibold">Step {step}</span>
          <span className="text-xs font-medium">{title}</span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="pt-4">
        {children}
      </div>

      {/* Optional description */}
      {description && (
        <p className="text-xs text-muted-foreground mt-2 ml-4 italic">
          {description}
        </p>
      )}
    </div>
  );
};

interface VersionBadgeProps {
  version: "V1" | "V2";
  label: string;
  className?: string;
}

export const VersionBadge = ({ version, label, className }: VersionBadgeProps) => {
  const isV2 = version === "V2";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-sm",
        isV2
          ? "bg-accent/10 text-accent border-accent/30"
          : "bg-muted text-muted-foreground border-border",
        className
      )}
    >
      <span className="font-bold">{label}</span>
    </div>
  );
};
