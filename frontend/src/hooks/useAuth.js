import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      login: async () => ({ success: false }),
      signup: async () => ({ success: false }),
      logout: () => {},
      isAuthenticated: () => false,
      isAdmin: () => false,
      loading: false,
    };
  }

  return context;
};
