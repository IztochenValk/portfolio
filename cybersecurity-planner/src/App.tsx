import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticatedState } from "@/state/actions/authActions";
import { ThemeContextProvider } from "@context/ThemeContext";
import AppRoutes from "@routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // ou "token" selon ton projet
    if (token) {
      dispatch(setAuthenticatedState(true));
    }
  }, [dispatch]);

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
