import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";

import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function UpdateBeverage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id.id);
  // console.log(name);

  const fetchBeverage = async () => {
    const { data, error } = await supabase
      .from("beverage")
      .select("*")
      .eq("id", id)
      .single();
    // console.log(data);

    if (data) {
      console.log(data)
      setName(data.name);
      setImage(data.image);
      setRating(data.rating);
    }
  };

  useEffect(() => {
    fetchBeverage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await supabase.storage
      .from("beverages")
      .upload("public/" + image?.name, image);

    const imageSrc =
      "https://mbzluisrzxmskyoiehjz.supabase.co/storage/v1/object/public/beverages/public/" +
      image?.name;

    const { data, error } = await supabase
      .from("beverage")
      .update({ name, image: imageSrc, rating })
      .eq("id", id);
    navigate("/beverage");

    setImage(imageSrc);
  };


  return (
    <div className="w-full d-flex justify-content-center">
    <div
      className="d-flex flex-column justify-content-center"
      style={{ width: "300px", padding: "20px", marginTop: "30px" }}
    >
      <Form className="d-flex flex-column" action="" style={{ gap: "10px" }}>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label htmlFor="image">Image Url</Form.Label>
        <Form.Control
          type="file"
          accept="image/"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Form.Label htmlFor="rating">Rating</Form.Label>
        <Form.Control
          type="number"
          id="rating"
          value = {rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </Form>

      <Link to={"/beverage"}>Back to Home</Link>
    </div>
  </div>
  )
}

export default UpdateBeverage;
