import { useParams } from "react-router-dom";
import { supabase } from "../config/supabase";
import { FaBeer } from "react-icons/fa";

function DeleteBeverage() {
  const id = useParams();

  //nextjs

  const deleteData = async () => {
    const { data, error } = await supabase
      .from("beverage").delete()
  };

  deleteData();

  return <div></div>;
}

export default DeleteBeverage;
