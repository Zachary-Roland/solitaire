import React, { useCallback, useState, createContext, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const UserContext = createContext(null);

export function UserProvider(props) {
  const { callAPI: logoutAPI } = useFetch("GET");
  const { callAPI: validate } = useFetch("GET");
  const [username, setUsername] = useState(null);
  const login = useCallback((uName) => {
    setUsername(uName);
  }, []);
  const logout = useCallback(async () => {
    const res = await logoutAPI("/api/users/logout");
    if (res.success) {
      setUsername(null);
    }
  }, []);
  useEffect(() => {
    async function valid() {
      const res = await validate("/api/users/validate");
      if (res.success) {
        login(res.data.username);
      }
    }
    valid();
  }, []);
  return (
    <UserContext.Provider value={{ username, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
}
