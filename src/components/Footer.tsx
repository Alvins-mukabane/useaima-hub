import { Link } from "react-router-dom";
import { siteEmail, supportUrl, toolLinks } from "@/content/siteContent";
import { BrandLogo } from "./BrandLogo";

const sections = [
  {
    title: "Product",
    links: [
      { label: "eva", to: toolLinks.financeAI, external: true },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Support", to: "/support" },
      { label: "Blog", to: "https://blog.useaima.com", external: true },
      { label: "FAQs", to: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandLogo size="lg" />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground" style={{ maxWidth: "28ch" }}>
              aima builds eva, the AI finance assistant designed to turn financial activity into clearer next steps.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{siteEmail}</p>
          </div>
          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.title}</h4>
              <ul className="space-y-2">
                {s.links.map((l) =>
                  "external" in l ? (
                    <li key={l.label}>
                      <a href={l.to} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ) : (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} aima. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              About Us
            </Link>
            <a href={supportUrl} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Support
            </a>
            <Link to="/privacy-policy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
