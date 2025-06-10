import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Designs from "@/pages/designs";
import DesignDetails from "@/pages/design-details";
import CustomOrder from "@/pages/custom-order";
import CourierInstructions from "@/pages/courier-instructions";
import OrderTracking from "@/pages/order-tracking";
import Profile from "@/pages/profile";
import Motifs from "@/pages/motifs";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import CategoryPage from "@/pages/category";
import Header from "@/components/header";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/designs" component={Designs} />
          <Route path="/design/:id" component={DesignDetails} />
          <Route path="/category/:slug" component={CategoryPage} />
          <Route path="/order" component={CustomOrder} />
          <Route path="/how-to-send" component={CourierInstructions} />
          <Route path="/track" component={OrderTracking} />
          <Route path="/profile" component={Profile} />
          <Route path="/motifs" component={Motifs} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
