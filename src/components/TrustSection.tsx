import { ArrowRight, FileText, Lock, Scale, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { Button } from "@/components/ui/button";

const trustPoints = [
  {
    title: "Clear platform positioning",
    description:
      "Visitors should understand immediately that aima is a platform of AI assistants for real-life decisions, not a vague experiment.",
    icon: ShieldCheck,
  },
  {
    title: "Responsible privacy stance",
    description:
      "Privacy, secure handling, and user trust are explained in plain language so the product feels credible and transparent.",
    icon: Lock,
  },
  {
    title: "Visible legal foundations",
    description:
      "Terms and Privacy Policy are linked directly from the landing page, reinforcing professionalism and readiness for growth.",
    icon: Scale,
  },
];

export function TrustSection() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container">
        <SectionHeader
          title="Built for Trust and Clarity"
          subtitle="Strong AI products need more than features. They need clear positioning, visible policies, and a brand that feels ready for real users."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon;

            return (
              <article key={point.title} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{point.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-6">
          <div>
            <h3 className="text-lg font-semibold">Explore the important pages</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Learn what aima is, how the platform works, and the policies that support a professional user experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to="/about">
                <FileText className="h-4 w-4" />
                About Us
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/privacy-policy">
                Privacy Policy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/terms-of-service">
                Terms of Service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
