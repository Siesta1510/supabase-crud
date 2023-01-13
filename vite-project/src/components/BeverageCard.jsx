import { supabase } from "../config/supabase";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDateTime } from "../utils/formatTime";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { TiStar } from "react-icons/ti";

const BeverageCard = () => {
  const [beverages, setBeverages] = useState([]);
  const [star, setStar] = useState((i) => <TiStar></TiStar>);
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
    setBeverages((bev) => {
      return bev.filter((b) => b.id !== id);
    });
  };


  return (
    <div className="row" style={{ padding: "20px" }}>
      {beverages.map((beverage) => {
        return (
          <div
            className="col-6 d-flex flex-column justify-content-center align-items-center "
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              overflow: "hidden",
            }}
            key={beverage.id}
          >
            <h3>{beverage.name}</h3>
            <img className="beverage-image" src={beverage.image} alt="" />
            <p><TiStar/></p>
            <p>{formatDateTime(beverage.created_at)}</p>
            <div className="d-flex justify-content-center align-items-center">
              <Link to={"/beverage/update/" + beverage.id}>
                <Button variant="success">Update</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => handleDelete(beverage.id)}
                style={{ margin: "3px" }}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
      {error ?? <h3>{error}</h3>}

      <Link to={"/beverage/create"}> Create</Link>
      <Link to={"/beverage/upload"}> Upload</Link>
    </div>
  );
};

export default BeverageCard;
