import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
  // Initialize authUser state
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("chat-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Effect to update localStorage whenever authUser changes
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
