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
    bar: "from-emerald-500 to-lime-400",
    chip: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    active: "border-emerald-500/30 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  },
  ally: {
    bar: "from-violet-500 to-amber-300",
    chip: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    active: "border-violet-500/30 bg-violet-500/12 text-violet-700 dark:text-violet-300",
  },
  ace: {
    bar: "from-amber-700 to-amber-400",
    chip: "border-amber-700/20 bg-amber-700/10 text-amber-800 dark:text-amber-300",
    active: "border-amber-700/30 bg-amber-700/12 text-amber-800 dark:text-amber-300",
  },
  mailmind: {
    bar: "from-sky-500 to-blue-400",
    chip: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
    active: "border-sky-500/30 bg-sky-500/12 text-sky-700 dark:text-sky-300",
  },
  healthai: {
    bar: "from-teal-500 to-cyan-400",
    chip: "border-teal-500/20 bg-teal-500/10 text-teal-700 dark:text-teal-300",
    active: "border-teal-500/30 bg-teal-500/12 text-teal-700 dark:text-teal-300",
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
  ally: [
    {
      id: "learning",
      label: "Learning momentum",
      description: "ally is designed to keep learning structured, safe, and engaging across repeated sessions.",
      points: [
        { label: "Session completion", value: 82, detail: "Guided tasks are easier to finish when the path is clear.", suffix: "%" },
        { label: "Parent confidence", value: 77, detail: "Trust signals help adults understand what children are doing.", suffix: "%" },
        { label: "Concept retention", value: 68, detail: "Short interactive loops make learning easier to revisit.", suffix: "%" },
      ],
    },
    {
      id: "safety",
      label: "Safety coverage",
      description: "The experience is built around visibility, safe exploration, and reduced friction for families.",
      points: [
        { label: "Age-appropriate session flow", value: 91, detail: "Keeps guidance structured for younger learners.", suffix: "%" },
        { label: "Progress transparency", value: 74, detail: "Makes it easier for parents to review activity.", suffix: "%" },
        { label: "Routine consistency", value: 66, detail: "Encourages repeat usage without turning learning into clutter.", suffix: "%" },
      ],
    },
  ],
  ace: [
    {
      id: "growth",
      label: "Growth clarity",
      description: "ace focuses on finding the next content decision instead of overwhelming teams with dashboards.",
      points: [
        { label: "Trend response speed", value: 79, detail: "Surfaces what changed so teams can act sooner.", suffix: "%" },
        { label: "Content planning efficiency", value: 72, detail: "Makes the next post easier to choose with supporting signals.", suffix: "%" },
        { label: "Performance visibility", value: 67, detail: "Connects reach and retention patterns to actual decisions.", suffix: "%" },
      ],
    },
    {
      id: "retention",
      label: "Content retention",
      description: "This view emphasizes how better hooks, stronger pacing, and cleaner analytics improve social outcomes.",
      points: [
        { label: "Hook strength", value: 83, detail: "Early-scroll attention has the biggest impact on distribution.", suffix: "%" },
        { label: "Format alignment", value: 71, detail: "Trend-aware content gives the algorithm more context.", suffix: "%" },
        { label: "Iteration quality", value: 62, detail: "Better post reviews turn one-off wins into repeatable growth.", suffix: "%" },
      ],
    },
  ],
  mailmind: [
    {
      id: "inbox",
      label: "Inbox clarity",
      description: "MailMind turns dense communication into a faster set of decisions, priorities, and follow-ups.",
      points: [
        { label: "Priority detection", value: 86, detail: "Urgent conversations rise to the top sooner.", suffix: "%" },
        { label: "Reply drafting speed", value: 73, detail: "Less blank-page time when responses already have structure.", suffix: "%" },
        { label: "Follow-up coverage", value: 65, detail: "Task extraction reduces forgotten next steps.", suffix: "%" },
      ],
    },
    {
      id: "workload",
      label: "Workload relief",
      description: "The goal is not more inbox data. It is fewer missed actions and better communication flow.",
      points: [
        { label: "Thread summarization", value: 81, detail: "Long conversations collapse into what matters now.", suffix: "%" },
        { label: "Decision friction removed", value: 69, detail: "Email becomes easier to process in batches.", suffix: "%" },
        { label: "Manual triage reduced", value: 58, detail: "A smarter inbox means less context switching.", suffix: "%" },
      ],
    },
  ],
  healthai: [
    {
      id: "readiness",
      label: "Readiness signals",
      description: "HealthAI is being shaped around preventive awareness and clearer next-step guidance.",
      points: [
        { label: "Preventive insight coverage", value: 73, detail: "Highlights the areas where earlier awareness matters most.", suffix: "%" },
        { label: "Routine consistency", value: 61, detail: "Health decisions improve when signals stay visible over time.", suffix: "%" },
        { label: "Check-in momentum", value: 54, detail: "Gentle prompts help people review health patterns more often.", suffix: "%" },
      ],
    },
    {
      id: "clarity",
      label: "Decision clarity",
      description: "The product direction is focused on turning scattered health inputs into calmer, more actionable signals.",
      points: [
        { label: "Behavior visibility", value: 68, detail: "Connects habits to trends users can understand quickly.", suffix: "%" },
        { label: "Risk awareness", value: 59, detail: "Makes important changes easier to spot early.", suffix: "%" },
        { label: "Guidance readiness", value: 48, detail: "Builds toward more useful next-step recommendations.", suffix: "%" },
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
