import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesPage from "./routes/RoutesPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoutesPage />
  </StrictMode>
);
