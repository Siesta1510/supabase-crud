import React from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";

function BeverageVideo({ beverages }) {
  const { id } = useParams();
  console.log(beverages);

  return (
    <div>
      {beverages.map((beverage) => {
        return (
          <div>
            <img src={beverage.image} alt="" />
          </div>
        );
      })}
    </div>
  );
}

export default BeverageVideo;
