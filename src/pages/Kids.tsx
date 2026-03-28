import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { ShieldCheck, Gamepad2, GraduationCap, Heart } from "lucide-react";
import { siteName, siteUrl, toolLinks } from "@/content/siteContent";

const features = [
  { icon: ShieldCheck, title: "Safe Environment", desc: "Every interaction is filtered and age-appropriate. Parental controls built in from day one." },
  { icon: GraduationCap, title: "Personalized Learning", desc: "AI adapts to each child's pace and interests, making education feel like play." },
  { icon: Gamepad2, title: "Interactive Games", desc: "Educational games that reinforce concepts while keeping kids genuinely entertained." },
  { icon: Heart, title: "Parental Trust", desc: "Full transparency on what your child interacts with. Weekly progress reports and content logs." },
];

const kidsStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "KidsAI",
    url: toolLinks.kidsAI,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
    description: "KidsAI is the USEAIMA learning and entertainment product designed to be safe, personalized, and engaging for children.",
  },
];

const Kids = () => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <>
      <SEOHead
        title="KidsAI"
        description="Discover KidsAI, the USEAIMA learning and entertainment experience built to be safe, personalized, and engaging for children."
        path="/kids"
        keywords={["KidsAI", "AI learning for kids", "safe AI for children", "children's education technology"]}
        structuredData={kidsStructuredData}
      />
      <Navbar />
      <main>
        <section className="py-24">
          <div className="container">
            <SectionHeader
              title="KidsAI"
              subtitle="Safe, personalized AI learning and entertainment — designed for curious young minds."
            />
            <div className="mb-10 flex justify-center">
              <Button asChild className="rounded-full">
                <a href={toolLinks.kidsAI} target="_blank" rel="noreferrer">
                  Open KidsAI
                </a>
              </Button>
            </div>
            <div
              ref={ref}
              className={cn("grid gap-6 sm:grid-cols-2 opacity-0", isVisible && "animate-fade-in")}
            >
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Kids;
