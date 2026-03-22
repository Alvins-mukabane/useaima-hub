import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PageTransition } from "@/components/PageTransition";
import { ScrollToHash } from "@/components/ScrollToHash";
import Index from "./pages/Index";
import Finance from "./pages/Finance";
import Health from "./pages/Health";
import Kids from "./pages/Kids";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToHash />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/health" element={<Health />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms-of-service" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
