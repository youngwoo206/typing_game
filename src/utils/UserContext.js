import React, { useEffect, useState } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    pic: "",
  });

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
}
export { ContextProvider, Context };
