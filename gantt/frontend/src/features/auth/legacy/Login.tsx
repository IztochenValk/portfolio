import { useState } from "react";
import { login, setAuthToken } from "@api";

interface Props {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setRemaining(null);

    try {
      const data = await login({ email, password });
      if (!data?.token) throw new Error("Token manquant");

      setAuthToken(data.token);
      console.log("🔑 Login réussi, token:", data.token);
      onLoginSuccess();
    } catch (err: any) {
      const msg = err?.message || "Erreur de connexion";
      setError(msg);

      // Extraction du compteur de tentatives restantes
      const match = msg.match(/restantes?:\s*(\d+)/i);
      if (match) {
        setRemaining(Number(match[1]));
      }
    }
  }

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
      {remaining !== null && (
        <p className="text-gray-600 mt-1 text-sm">
          Tentatives restantes avant blocage :{" "}
          <span className={remaining <= 2 ? "text-red-600 font-bold" : "font-semibold"}>
            {remaining}
          </span>
        </p>
      )}
    </div>
  );
}
