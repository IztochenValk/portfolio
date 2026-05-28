import { useState } from "react";
import { login } from "@api";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password }); // /api/auth/login + stockage token
      if (res?.token) {
        onLoginSuccess();
      } else {
        setError("Identifiants invalides.");
      }
    } catch (err: any) {
      console.error("❌ Erreur de login:", err);
      setError(err?.response?.data?.error || "Impossible de se connecter. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-bold mb-4">Connexion</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
