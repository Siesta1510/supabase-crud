import React, { useEffect, useState } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../config/supabase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(()=>{
   supabase.auth.onAuthStateChange(async (e) => {
      if (e !== "SIGNED_OUT") {
        navigate("/beverage");
        console.log("abc");
      } else {
        navigate("/login");
      }
    });
  },[])
  

  return (
    <div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["discord", "google"]}
        theme="evenDarker"
      ></Auth>
    </div>
  );
}

export default LoginPage;
