import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { InfoPage } from "./InfoPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InfoPage />
  </StrictMode>
);
