import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { TaxiLanding } from "./TaxiLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaxiLanding />
  </StrictMode>
);
