import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { TariffsLanding } from "./TariffsLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TariffsLanding />
  </StrictMode>
);
