import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WindowsizeContextProvider } from "./lib/hooks.tsx";
import { Router } from "wouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router base={import.meta.env.BASE_URL}>
      <WindowsizeContextProvider>
        <App />
      </WindowsizeContextProvider>
    </Router>
  </StrictMode>,
);
