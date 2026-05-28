import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@features/auth/utils/initGuestGuards";

// Redux: import tolérant (named ou default)
import * as storeModule from "./store";
const store = (storeModule as any).store ?? (storeModule as any).default;

// Synchro offline -> online
import { syncNow } from "./sync/syncLocalToRemote";

// Déclenche une synchro quand on redevient en ligne ou quand l’onglet revient au premier plan
window.addEventListener("online", () => {
  syncNow().catch(() => {});
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && navigator.onLine) {
    syncNow().catch(() => {});
  }
});

import { Provider } from "react-redux";
import "./services/axios-globals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
