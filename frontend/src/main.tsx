import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router.tsx"; // <-- nouveau fichier Router
import { ApolloProvider } from "@apollo/client";
import { client } from "./ApolloClient.ts";
import { ThemeProvider } from "./components/context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </StrictMode>
  </ThemeProvider>
);
