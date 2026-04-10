import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { AgentKey } from "@/content/entitySchema";
import { cn } from "@/lib/utils";

type InsightPoint = {
  label: string;
  value: number;
  detail: string;
  suffix: string;
};

type InsightSeries = {
  id: string;
  label: string;
  description: string;
  points: InsightPoint[];
};

const palette = {
  eva: {
    bar: "from-primary to-warning",
    chip: "border-primary/20 bg-primary/10 text-primary",
    active: "border-primary/30 bg-primary/15 text-primary",
  },
} as const;

const seriesByAgent: Record<AgentKey, InsightSeries[]> = {
  eva: [
    {
      id: "cost",
      label: "Cost savings",
      description: "A quick look at where eva reduces waste and keeps money decisions tighter over time.",
      points: [
        { label: "Subscription waste caught", value: 84, detail: "Highlights repeated spend leaks before month-end.", suffix: "%" },
        { label: "Budget drift detected", value: 71, detail: "Flags early category movement before it becomes a full overrun.", suffix: "%" },
        { label: "Review time reduced", value: 63, detail: "Turns manual weekly finance review into a guided session.", suffix: "%" },
      ],
    },
    {
      id: "performance",
      label: "Agent performance",
      description: "These signals show how an always-on finance agent helps people respond faster and with more context.",
      points: [
        { label: "Anomaly response speed", value: 88, detail: "Fast warnings when spending jumps above normal behavior.", suffix: "%" },
        { label: "Decision clarity", value: 76, detail: "Summaries focus on the next action instead of raw data alone.", suffix: "%" },
        { label: "Habit visibility", value: 69, detail: "Pattern detection creates better awareness week over week.", suffix: "%" },
      ],
    },
  ],
};

type AgentInsightsChartProps = {
  agentKey: AgentKey;
  title?: string;
  description?: string;
  className?: string;
};

export function AgentInsightsChart({ agentKey, title, description, className }: AgentInsightsChartProps) {
  const series = seriesByAgent[agentKey];
  const [activeSeriesId, setActiveSeriesId] = useState(series[0]?.id ?? "");
  const activeSeries = series.find((item) => item.id === activeSeriesId) ?? series[0];
  const tones = palette[agentKey];

  if (!activeSeries) {
    return null;
  }

  return (
    <section className={cn("rounded-[1.75rem] border bg-card p-6 shadow-sm sm:p-7", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Interactive Utility View</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title ?? "Agent performance snapshot"}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            {description ?? "Use the tabs to switch the metric lens and keep the page anchored in practical value."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {series.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSeriesId(item.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                item.id === activeSeries.id ? tones.active : tones.chip,
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-[1.5rem] border bg-muted/20 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <BarChart3 className="h-4 w-4 text-primary" />
          {activeSeries.label}
        </div>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{activeSeries.description}</p>

        <div className="mt-6 grid gap-5">
          {activeSeries.points.map((point) => (
            <div key={point.label}>
              <div className="flex items-center justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">{point.label}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{point.detail}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-foreground">
                  {point.value}
                  {point.suffix}
                </span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn("h-full rounded-full bg-gradient-to-r transition-[width] duration-500", tones.bar)}
                  style={{ width: `${point.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
