import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WindowsizeContextProvider } from "./lib/hooks.tsx";
import { Router } from "wouter";
import { BASE } from "./lib/path.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router base={BASE}>
      <WindowsizeContextProvider>
        <App />
      </WindowsizeContextProvider>
    </Router>
  </StrictMode>,
);
