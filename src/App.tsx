
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Statistics from "./pages/Statistics";
import CreateRecipe from "./pages/CreateRecipe";
import Account from "./pages/Account";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/statistics" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pt-24"> {/* Added padding-top here */}
                <Statistics />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/create-recipe" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pt-24"> {/* Added padding-top here */}
                <CreateRecipe />
              </main>
              <Footer />
            </div>
          } />
          <Route path="/account" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow pt-24"> {/* Added padding-top here */}
                <Account />
              </main>
              <Footer />
            </div>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
