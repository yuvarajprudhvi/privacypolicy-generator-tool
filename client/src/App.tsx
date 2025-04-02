import { Switch, Route } from "wouter";
import Home from "@/pages/index";
import Generator from "@/pages/generator";
import Templates from "@/pages/templates";
import FAQ from "@/pages/faq";
import Pricing from "@/pages/pricing";
import RegulationMap from "@/pages/regulation-map";
import PolicyVerification from "@/pages/policy-verification";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/generator" component={Generator} />
          <Route path="/templates" component={Templates} />
          <Route path="/policy-verification" component={PolicyVerification} />
          <Route path="/faq" component={FAQ} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/regulation-map" component={RegulationMap} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
