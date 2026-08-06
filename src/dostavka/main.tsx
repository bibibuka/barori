import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { CourierLanding } from "./CourierLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CourierLanding />
  </StrictMode>
);
