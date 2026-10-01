import NotFound from "@/pages/NotFound";
import {
  About,
  Contact,
  Donate,
  GetInvolved,
  GetLegalHelp,
  Home,
  Impact,
  Resources,
  Stories,
  WhatWeDo,
  WhereWeWork,
} from "@/pages/Site";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function ScrollManager() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "auto", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/what-we-do" component={WhatWeDo} />
      <Route path="/where-we-work" component={WhereWeWork} />
      <Route path="/impact" component={Impact} />
      <Route path="/legal-help" component={GetLegalHelp} />
      <Route path="/get-involved" component={GetInvolved} />
      <Route path="/donate" component={Donate} />
      <Route path="/stories" component={Stories} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={Contact} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <ScrollManager />
          <Router />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
