import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { supabase } from "../config/supabase";
// import  {useNavigate}  from "react-router-dom";

export const LoadUser = createContext();

const LoadUserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
//   const navigate = useNavigate()
  useEffect(() => {
    LoadUserLogin();
  }, []);

  const LoadUserLogin = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (data) {
      setUser(data.user);
    }
  };

  function deleteUser(){
    setUser([])
  }


  

  return <LoadUser.Provider value={{user,deleteUser}}>{children}</LoadUser.Provider>;
};
export default LoadUserProvider;
