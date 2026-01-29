import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ChatGPT from './pages/ChatGPT';
import Admin from './pages/Admin';
import Analytics from './pages/Analytics';
import ErrorCodes from './pages/ErrorCodes';
import ErrorCodeDetail from './pages/ErrorCodeDetail';
import NotFound from './pages/NotFound';

export function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chatgpt" element={<ChatGPT />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/error-codes" element={<ErrorCodes />} />
            <Route path="/error-codes/:code" element={<ErrorCodeDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  return { html };
}
