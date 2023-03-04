import React, { useContext, useEffect, useState } from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supabase } from "../config/supabase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { user, deleteUser } = useContext(AuthContext);

  console.log(deleteUser);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (e) => {
      if (e !== "SIGNED_OUT") {
        navigate("/beverage");
        // console.log("abc");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="w-50" style={{ margin: "0 auto" }}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["discord", "google"]}
        theme="evenDarker"
      ></Auth>

      <Link to={"/beverage"}>Home Page</Link>
    </div>
  );
}

export default LoginPage;
