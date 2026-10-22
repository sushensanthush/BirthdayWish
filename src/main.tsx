/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { SIGNATURE } from "./credit";

console.info(`%c${SIGNATURE}`, "color:#ff5d8f;font-weight:700");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
