import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [logUser, setlogUser] = useState({ userId: 1, email: "example@email" });

  const loginUser = (user) => {
    setlogUser(user);
  };

  return (
    <UserContext.Provider value={{ logUser, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};
