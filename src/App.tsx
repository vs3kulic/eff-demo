import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserStories from "./pages/UserStories";
import QuestionnaireV1 from "./pages/QuestionnaireV1";
import QuestionnaireV2 from "./pages/QuestionnaireV2";
import ResultsV1 from "./pages/ResultsV1";
import ResultsV2 from "./pages/ResultsV2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-stories" element={<UserStories />} />
          <Route path="/questionnaire/v1" element={<QuestionnaireV1 />} />
          <Route path="/questionnaire/v2" element={<QuestionnaireV2 />} />
          <Route path="/results/v1" element={<ResultsV1 />} />
          <Route path="/results/v2" element={<ResultsV2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
