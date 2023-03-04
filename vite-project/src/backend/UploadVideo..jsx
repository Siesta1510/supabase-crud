import React, { useState } from "react";

import { supabase } from "../config/supabase";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function UploadVideo() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  // console.log(image);

  const navigate = useNavigate();

  // const { data1, error1 } =   ;
  // console.log(supabase.storage.from("beverages").upload("public/" + image));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true)
      await supabase.storage
        .from("beverages")
        .upload("video/" + image?.name, image);

      const imageSrc =
        "https://mbzluisrzxmskyoiehjz.supabase.co/storage/v1/object/video/beverages/video/" +
        image?.name;

      // console.log(data1);
      const { data, error } = await supabase
        .from("beverage")
        .insert([{ name, image: imageSrc, rating }]);
      navigate("/video");
      console.log(image);
    } catch (err) {
      throw err;
    }
    finally{
      setIsLoading(false)
    }
  };

  console.log(isLoading)

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
          <Form.Label htmlFor="image">Video</Form.Label>
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

        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}

export default UploadVideo;
