import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  { q: "What is USEAIMA?", a: "USEAIMA is an AI-driven platform focused on building intelligent systems that act as assistants in everyday life — covering finances, email, health, social media, and children's education." },
  { q: "Are the tools free?", a: "We offer free tiers for most products so you can explore before committing. Premium features are available through affordable plans." },
  { q: "How is user data handled?", a: "Privacy is foundational. All data is encrypted at rest and in transit, never sold to third parties, and you can delete your data at any time." },
  { q: "Can I use multiple tools together?", a: "Absolutely. The ecosystem is designed to work together — insights from FinanceAI can inform your EmailAI action plans, and SocialPulse trends can feed content ideas." },
  { q: "Who is this platform for?", a: "Anyone who wants to work smarter and live better: freelancers, parents, creators, students, small business owners — anyone who values intelligent automation." },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-muted/30 py-24">
      <div className="container max-w-2xl">
        <SectionHeader title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
