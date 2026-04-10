import { HelpCircle, Instagram, Mail, Youtube } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AtomicUtilityBlock } from "@/components/AtomicUtilityBlock";
import { BrandLogo } from "@/components/BrandLogo";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { createBreadcrumbStructuredData, organizationSchemaId } from "@/content/entitySchema";
import {
  blogUrl,
  siteName,
  siteUrl,
  supportChannels,
  supportFaqItems,
  supportUrl,
  toolLinks,
} from "@/content/siteContent";

const iconMap = {
  "Email support": Mail,
  "Instagram updates": Instagram,
  "YouTube explainers": Youtube,
  "Support hub": HelpCircle,
} as const;

const supportStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "HelpPage",
    "@id": `${supportUrl}#help-page`,
    name: "aima Support",
    url: supportUrl,
    description:
      "Official support center for aima and eva, including product help, direct support contact, Q&A, and learning resources.",
    inLanguage: "en-US",
    about: {
      "@id": organizationSchemaId,
    },
    isPartOf: {
      "@id": `${siteUrl}#website`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: supportFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  },
  createBreadcrumbStructuredData([
    { label: "Home", href: siteUrl },
    { label: "Support", href: supportUrl },
  ]),
];

export default function Support() {
  return (
    <>
      <SEOHead
        title="aima Support | Help, Q&A, and Product Guidance"
        description="Official aima support center for help with eva, product questions, direct contact, and practical Q&A."
        path="/"
        siteOrigin={supportUrl}
        keywords={[
          "aima support",
          "eva support",
          "support.useaima.com",
          "help@useaima.com",
          "AI finance support",
        ]}
        structuredData={supportStructuredData}
      />

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="container flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <a href={siteUrl} className="inline-flex items-center" aria-label={`${siteName} home`}>
            <BrandLogo size="md" />
          </a>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="rounded-full">
              <a href={siteUrl}>Main site</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <a href={blogUrl}>Blog</a>
            </Button>
            <Button asChild className="rounded-full">
              <a href={toolLinks.financeAI} target="_blank" rel="noopener noreferrer">
                Open eva
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b bg-muted/20 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">
                Official support for aima and eva
              </div>
              <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Help, support, and Q&amp;A for the aima platform
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
                support.useaima.com is the support layer for aima and eva. It gives users a clear way to get product
                help, contact the team, follow official updates, and move from questions to answers quickly.
              </p>

              <div className="mt-8">
                <AtomicUtilityBlock
                  title="Quick Support Summary"
                  tldr="Need help with aima or eva? Use support.useaima.com for official help, Q&A, direct contact, and the fastest route to product guidance."
                  action={{
                    label: "Open eva",
                    href: toolLinks.financeAI,
                    external: true,
                  }}
                  highlights={[
                    "Official support channels",
                    "Fast answers and Q&A",
                    "Direct route to eva",
                  ]}
                  note="Best for users who want a fast support path without hunting across the site."
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border bg-card p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">How support works</p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight">Start with the official channels, then move to product-specific help</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  The support flow is built to feel straightforward. Use the support hub for general guidance, email for
                  direct questions, and the public channels for updates, explainers, and follow-up learning.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border bg-muted/20 p-5">
                    <h3 className="text-base font-semibold">Best for product help</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Questions about eva, product access, product direction, and how the aima site is structured.
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border bg-muted/20 p-5">
                    <h3 className="text-base font-semibold">Best for Q&amp;A and updates</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Follow official explainers, updates, and support prompts through Instagram and YouTube.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                {supportChannels.map((channel) => {
                  const Icon = iconMap[channel.title as keyof typeof iconMap] ?? HelpCircle;

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

        <section id="q-and-a" className="bg-muted/25 py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl rounded-[2rem] border bg-card p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">Support Q&amp;A</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="mt-8 w-full">
                {supportFaqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`support-faq-${index}`}>
                    <AccordionTrigger className="text-left text-base">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} aima Support. Official help and guidance for aima and eva.</p>
          <div className="flex flex-wrap gap-4">
            <a href={siteUrl} className="transition-colors hover:text-foreground">Main site</a>
            <a href={`${siteUrl}/about`} className="transition-colors hover:text-foreground">About</a>
            <a href={`${siteUrl}/privacy-policy`} className="transition-colors hover:text-foreground">Privacy</a>
            <a href={`${siteUrl}/terms-of-service`} className="transition-colors hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
