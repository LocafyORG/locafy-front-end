import { createRoot } from "react-dom/client";
import "@coreui/coreui/dist/css/coreui.min.css";
import "material-icons/iconfont/material-icons.css";
import "@styles/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
