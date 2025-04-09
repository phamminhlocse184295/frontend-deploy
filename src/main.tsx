import { StyleProvider } from "@ant-design/cssinjs";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../src/style/index.css";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </QueryClientProvider>
  </StrictMode>
);
