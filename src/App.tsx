import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StickyContactButton from "@/components/StickyContactButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import BurgerMenu from "@/components/BurgerMenu";
import AIChatButton from "@/components/AIChatButton";
import { City } from "@/components/CitySelector";

const queryClient = new QueryClient();

const App = () => {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <StickyContactButton selectedCity={selectedCity} />
        <ScrollToTopButton />
        <BurgerMenu selectedCity={selectedCity} onCityChange={setSelectedCity} />
        <AIChatButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;