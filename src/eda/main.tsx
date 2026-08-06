import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { EdaLanding } from "./EdaLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EdaLanding />
  </StrictMode>
);
