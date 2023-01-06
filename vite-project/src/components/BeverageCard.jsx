import { supabase } from "../config/supabase";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BeverageVideo from "./BeverageVideo";

const BeverageCard = () => {
  const [beverages, setBeverages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeveragesData();
  }, []);
  const fetchBeveragesData = async () => {
    const { data, error } = await supabase.from("beverage").select("*");
    console.log(supabase.from("beverage").select("*"));

    if (error) {
      setError("Have a error when fetching data");
      // console.log(error);
    }
    if (data) {
      setBeverages(data);
      console.log(data);
    }
  };

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("beverage")
      .delete()
      .eq("id", id);
    navigate("/beverage");
    window.location.reload();
  };

  const handleDownload = async (bev) => {
    const { data, error } = await supabase
      .from("beverage")
      .select("*")
      .eq("id", bev.id);

    if (data) {
      await supabase.storage
        .from("beverages")
        .download("public/" + bev.image.split("/")[9]);
      console.log("public/" + bev.image.split("/")[9]);
    }
  };

  return (
    <div>
      {beverages.map((beverage) => {
        return (
          <div key={beverage.id}>
            <h3>{beverage.name}</h3>
            <img className="beverage-image" src={beverage.image} alt="" />
            {/* <video
              className="beverage-image"
              src={beverage.image}
              controls
            ></video> */}
            {/* {console.log(id)} */}
            <p>{beverage.rating}</p>
            <p>{beverage.created_at}</p>
            <Link to={"/beverage/update/" + beverage.id}>
              <button>Update</button>
            </Link>

            <button onClick={() => handleDelete(beverage.id)}>Delete</button>
            <button onClick={() => handleDownload(beverage)}>Download</button>

            {/* <BeverageVideo beverages={beverages}></BeverageVideo> */}
          </div>
        );
      })}
      {error ?? <h3>{error}</h3>}

      <Link to={"/beverage/create"}> Create</Link>
    </div>
  );
};

export default BeverageCard;
