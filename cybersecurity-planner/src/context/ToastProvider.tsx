import React from "react";
import { SnackbarProvider } from "notistack";

const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    autoHideDuration={3000}
    preventDuplicate
  >
    {children}
  </SnackbarProvider>
);

export default ToastProvider;
