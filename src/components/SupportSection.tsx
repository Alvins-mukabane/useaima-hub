import { HelpCircle, Instagram, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { supportChannels } from "@/content/siteContent";

const supportIcons = [Mail, Instagram, Youtube, HelpCircle] as const;

export function SupportSection() {
  return (
    <section id="support" className="bg-muted/25 py-24">
      <div className="container">
        <SectionHeader
          title="Support & Help"
          subtitle="Need help with aima or eva? The support flow is built around direct contact, quick answers, and a dedicated support hub at support.useaima.com."
        />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Support Hub</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">Get help, product guidance, and Q&A in one place</h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
              aima support is designed to make the product feel dependable. Use the support center for product help,
              onboarding questions, direct contact options, and the fastest route to eva-related answers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <a href="https://support.useaima.com" target="_blank" rel="noopener noreferrer">
                  Open support.useaima.com
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/support">View support page</Link>
              </Button>
            </div>
            <div className="mt-8 rounded-[1.5rem] border bg-muted/20 p-6">
              <p className="text-sm font-semibold">What you can do there</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <li>Find direct help for eva and the main aima website.</li>
                <li>Get quick Q&A answers without searching across multiple pages.</li>
                <li>Use the official channels for support, updates, and walkthroughs.</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4">
            {supportChannels.map((channel, index) => {
              const Icon = supportIcons[index] ?? HelpCircle;

              return (
                <a
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="rounded-[1.5rem] border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{channel.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{channel.description}</p>
                      <span className="mt-4 inline-flex text-sm font-medium text-primary">{channel.label}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
