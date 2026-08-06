import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { SmenaLanding } from "./SmenaLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmenaLanding />
  </StrictMode>
);
