import { LoadingProvider } from "@hooks/useLoading";
import { ToastProvider } from "@hooks/useToast";
import App from "@pages/App";
import "@styles/sweet-alert.css";
import "@styles/tailwind.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container as Element);
root.render(
  <LoadingProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </LoadingProvider>
);
