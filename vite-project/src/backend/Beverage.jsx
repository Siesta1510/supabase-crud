import { supabase } from "../config/supabase";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Image, Row, Card } from "react-bootstrap";

const BeverageCard = () => {
  const [beverages, setBeverages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBeveragesData();
  }, []);

  const fetchBeveragesData = async () => {
    const { data, error } = await supabase.from("beverage").select("*");

    if (error) {
      setError("Have a error when fetching data");
    }
    if (data) {
      setBeverages(data);
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
    <div style={{height:'1000px'}}>
      <Row className="g-8 d-flex " style={{width: '1100px', margin:'0 auto', backgroundColor:''}} >
        {beverages.map((beverage) => {
          return (
            <Col
              className="col-6 d-flex flex-column justify-content-center align-items-center "
              style={{
                overflow: "hidden",
                width: "20%",
                marginTop: "20px",
              }}
              key={beverage.id}
            >
              <Card.Title>{beverage.name}</Card.Title>
              <Image
                thumbnail
                variant="top"
                className="beverage-image"
                src={beverage.image}
                alt=""
              />
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
            </Col>
          );
        })}
        {error ?? <Card.Text>{error}</Card.Text>}
      </Row>
      <Link to={"/beverage/create"}> Create</Link>
      <Link to={"/beverage/upload"}> Upload</Link>
    </div>
  );
};

export default BeverageCard;
