import { createRoot } from "react-dom/client";
import "@coreui/coreui/dist/css/coreui.min.css";
import "material-icons/iconfont/material-icons.css";
import "@styles/index.scss";
import App from "./App.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <APIProvider apiKey={import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <App />
    </APIProvider>
  </QueryClientProvider>,
);
