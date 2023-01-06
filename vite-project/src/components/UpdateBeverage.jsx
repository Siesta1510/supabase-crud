import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { supabase } from "../config/supabase";

import { Link } from "react-router-dom";

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

    // console.log(imageSrc);
    const { data, error } = await supabase
      .from("beverage")
      .update({ name, image: imageSrc, rating })
      .eq("id", id);
    navigate("/beverage");

    setImage(imageSrc);
  };

  // console.log(image);

  return (
    <div>
      <form action="">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="img"></label>
        <input
          id="img"
          type="file"
          accept="image/"
          
          onChange={(e) => setImage(e.target.files[0])}
        />
        <input
          type="text"
          value={rating}
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleSubmit}>Update</button>
      </form>
      <Link to={"/beverage"}>Back to Home</Link>
    </div>
  );
}

export default UpdateBeverage;
