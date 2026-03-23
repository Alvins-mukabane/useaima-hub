import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToHash } from "@/components/ScrollToHash";
import { isBlogHost } from "@/lib/siteMode";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Health from "./pages/Health";
import Kids from "./pages/Kids";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import BlogHome from "./pages/blog/BlogHome";
import BlogCategory from "./pages/blog/BlogCategory";
import BlogSearch from "./pages/blog/BlogSearch";
import BlogArticle from "./pages/blog/BlogArticle";
import BlogNotFound from "./pages/blog/BlogNotFound";

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
                  <Route path="/health" element={<Health />} />
                  <Route path="/kids" element={<Kids />} />
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
          </PageTransition>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
