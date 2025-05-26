
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
import Auth from "./pages/Auth";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/statistics"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow pt-24">
                    <Statistics />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/create-recipe"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow pt-24">
                    <CreateRecipe />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/order"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow pt-24">
                    <Order />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/account"
              element={
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-grow pt-24">
                    <Account />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
