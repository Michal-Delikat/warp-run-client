import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:3000/login", {
        username: "kapitan",
        password: "tajnehaslo123",
      });
      return response.data.token as string;
    },
    onSuccess: (receivedToken) => {
      setToken(receivedToken);
    },
  });

  useEffect(() => {
    loginMutation.mutate();
  }, []);

  return (
    <AuthContext.Provider value={{ token, isLoading: loginMutation.isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}