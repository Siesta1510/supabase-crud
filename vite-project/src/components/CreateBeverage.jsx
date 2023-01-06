import React, { useState } from "react";

import { supabase } from "../config/supabase";
import { useNavigate, Link } from "react-router-dom";

function CreateBeverage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);

  const [error, setError] = useState("");

  console.log(image);

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
    <div>
      <form action="">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="image">Image Url</label>
        <input
          type="file"
          accept="image/"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit</button>
      </form>

      <Link to={"/beverage"}>Back to Home</Link>
    </div>
  );
}

export default CreateBeverage;
