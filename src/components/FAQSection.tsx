import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { ToolMentionText } from "./ToolMentionText";
import { SectionHeader } from "./SectionHeader";
import { faqItems } from "@/content/siteContent";

export function FAQSection() {
  return (
    <section id="faq" className="bg-muted/30 py-24">
      <div className="container max-w-3xl">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Clear answers about what USEAIMA is, how the platform works, and what users should expect from the ecosystem."
        />
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                <ToolMentionText text={f.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <Link to="/about" className="rounded-full border bg-background px-4 py-2 transition-colors hover:text-foreground">
            Learn more about USEAIMA
          </Link>
          <Link to="/privacy-policy" className="rounded-full border bg-background px-4 py-2 transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="rounded-full border bg-background px-4 py-2 transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </section>
  );
}
