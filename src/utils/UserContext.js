import React, { useEffect, useState } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState({ username: "guest" });

  useEffect(() => {
    localStorage.setItem("guest", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("guest"));
    if (user) {
      setUser(user);
    }
  }, []);

  return <Context.Provider value={user}>{children}</Context.Provider>;
}
export { ContextProvider, Context };
