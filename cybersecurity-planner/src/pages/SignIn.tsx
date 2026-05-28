import React, { useState } from "react";
import bgImage from "../assets/images/toredobyte-signin-background.png";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const darkTheme = createTheme({ palette: { mode: "dark" } });

// Identifiants de démo pour tests
const DEMO_USERNAME = "test";
const DEMO_PASSWORD = "test1234";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const completeLogin = (token: string) => {
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: token });
    navigate("/dashboard");
  };

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    // Bypass démo (à désactiver en production réelle)
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      completeLogin(`static-test-token-${Date.now()}`);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://torpedobyte.solutions/wp-json/jwt-auth/v1/token",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const { token } = response.data || {};
      if (!token) throw new Error("Token manquant");
      completeLogin(token);
    } catch (error: any) {
      console.error("Auth error:", error?.response?.status, error?.response?.data);
      alert("Erreur de connexion. Vérifie tes identifiants ou réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername(DEMO_USERNAME);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1 }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>

            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nom d'utilisateur"
                autoFocus
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Mot de passe"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Se connecter"}
              </Button>

              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Astuce: un compte de démonstration est disponible pour tester sans créer de compte.
              </Typography>

              {/* Bloc d'informations démo */}
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default",
                }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Compte de démonstration
                </Typography>
                <Typography variant="body2">
                  Nom d'utilisateur: <code>{DEMO_USERNAME}</code>
                  <br />
                  Mot de passe: <code>{DEMO_PASSWORD}</code>
                </Typography>

                <Button
                  size="small"
                  sx={{ mt: 1 }}
                  variant="outlined"
                  onClick={fillDemoCredentials}
                >
                  Remplir automatiquement
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;
