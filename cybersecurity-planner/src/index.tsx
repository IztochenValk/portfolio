import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux";
import { store } from "./state/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
          <Toaster position='top-center' />
    </Provider>
  </React.StrictMode>
);
