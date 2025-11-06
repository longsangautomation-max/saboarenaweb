import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import test in dev mode
if (import.meta.env.DEV) {
  import("./test/supabase-test");
}

createRoot(document.getElementById("root")!).render(<App />);
