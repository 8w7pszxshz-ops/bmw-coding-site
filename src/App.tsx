import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ChatGPT from "./pages/ChatGPT";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import ErrorCodes from "./pages/ErrorCodes";
import ErrorCodeDetail from "./pages/ErrorCodeDetail";
import ChipTuningPage from "./pages/ChipTuningPage";
import CodingPage from "./pages/CodingPage";
import KeysPage from "./pages/KeysPage";
import EcologyPage from "./pages/EcologyPage";
import BMWModelPage from "./pages/BMWModelPage";
import BMWEnginePage from "./pages/BMWEnginePage";
import PricesPage from "./pages/PricesPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import NotFound from "./pages/NotFound";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTopButton />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chatgpt" element={<ChatGPT />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/error-codes" element={<ErrorCodes />} />
            <Route path="/error-codes/:code" element={<ErrorCodeDetail />} />
            <Route path="/chip-tuning" element={<ChipTuningPage />} />
            <Route path="/chip-tuning/:slug" element={<BMWModelPage />} />
            <Route path="/engines/:slug" element={<BMWEnginePage />} />
            <Route path="/coding" element={<CodingPage />} />
            <Route path="/keys" element={<KeysPage />} />
            <Route path="/ecology" element={<EcologyPage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;