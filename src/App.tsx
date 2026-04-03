import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToHash } from "@/components/ScrollToHash";
import { isBlogHost } from "@/lib/siteMode";

const Index = lazy(() => import("./pages/Index"));
const Finance = lazy(() => import("./pages/Finance"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogHome = lazy(() => import("./pages/blog/BlogHome"));
const BlogCategory = lazy(() => import("./pages/blog/BlogCategory"));
const BlogSearch = lazy(() => import("./pages/blog/BlogSearch"));
const BlogArticle = lazy(() => import("./pages/blog/BlogArticle"));
const BlogNotFound = lazy(() => import("./pages/blog/BlogNotFound"));

const queryClient = new QueryClient();

const App = () => {
  const blogHost = isBlogHost();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToHash />
          <PageTransition>
            <Suspense fallback={<div className="min-h-[40vh]" />}>
              <Routes>
                {blogHost ? (
                  <>
                    <Route path="/" element={<BlogHome />} />
                    <Route path="/category/:slug" element={<BlogCategory />} />
                    <Route path="/search" element={<BlogSearch />} />
                    <Route path="/:slug" element={<BlogArticle />} />
                    <Route path="*" element={<BlogNotFound />} />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Index />} />
                    <Route path="/finance" element={<Finance />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/terms-of-service" element={<Terms />} />
                    <Route path="/blog" element={<BlogHome />} />
                    <Route path="/blog/category/:slug" element={<BlogCategory />} />
                    <Route path="/blog/search" element={<BlogSearch />} />
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="*" element={<NotFound />} />
                  </>
                )}
              </Routes>
            </Suspense>
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
