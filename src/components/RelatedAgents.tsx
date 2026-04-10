import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentKey, getAgentByKey, getRelatedAgents } from "@/content/entitySchema";
import { cn } from "@/lib/utils";

const tones = {
  eva: "border-primary/20 bg-primary/10",
} as const;

type RelatedAgentsProps = {
  primaryAgentKey: AgentKey;
  className?: string;
};

export function RelatedAgents({ primaryAgentKey, className }: RelatedAgentsProps) {
  const primaryAgent = getAgentByKey(primaryAgentKey);

  if (!primaryAgent) {
    return null;
  }

  const agents = [primaryAgent, ...getRelatedAgents(primaryAgentKey, 2)];
  const isSingleAgent = agents.length === 1;

  return (
    <section className={className}>
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-semibold tracking-tight">{isSingleAgent ? "Next Step" : "Related Agents"}</h2>
      </div>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        {isSingleAgent
          ? "Instead of ending with another abstract article, guide readers straight to eva so they can act on what they just learned."
          : "Instead of sending readers to another generic post, guide them toward the next agent or setup page that actually helps them act."}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {agents.map((agent, index) => (
          <article
            key={agent.key}
            className={cn("rounded-[1.5rem] border p-6 shadow-sm", tones[agent.key])}
          >
            <div className="flex items-center gap-3">
              <img
                src={agent.logoPath}
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                className="h-12 w-12 rounded-2xl object-contain"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {index === 0 ? "Primary next step" : "Related agent"}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{agent.name}</h3>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{agent.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <a href={agent.toolHref} target="_blank" rel="noreferrer noopener">
                  Open {agent.name}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-full">
                <a href={agent.pageHref}>View setup page</a>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
