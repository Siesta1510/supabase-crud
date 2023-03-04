import React, { useState } from "react";

import { supabase } from "../config/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function CreateBeverage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);

  const [error, setError] = useState("");

  // console.log(image);

  const navigate = useNavigate();

  // const { data1, error1 } =   ;
  // console.log(supabase.storage.from("beverages").upload("public/" + image));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.storage
      .from("beverages")
      .upload("public/" + image?.name, image);

    const imageSrc =
      "https://mbzluisrzxmskyoiehjz.supabase.co/storage/v1/object/public/beverages/public/" +
      image?.name;

    // console.log(data1);
    const { data, error } = await supabase
      .from("beverage")
      .insert([{ name, image: imageSrc, rating }]);
    navigate("/beverage");
    if (data) {
    }

    console.log(image);
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
            onChange={(e) => setRating(e.target.value)}
          />

          <Button onClick={handleSubmit}>Submit</Button>
        </Form>

        <Link to={"/beverage"}>Back to Home</Link>
      </div>
    </div>
  );
}

export default CreateBeverage;
