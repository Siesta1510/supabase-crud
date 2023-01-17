import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import {TiDelete} from "react-icons/ti"
// import {HighlightOffIcon} from '@mui/icons-material';    

function ListBeverage() {
  const [images, setImages] = useState([]);

  const retriveAll = async () => {
    const { data, error } = await supabase.storage
      .from("beverages")
      .list("public");
    console.log(data);
    setImages(data);
  };

  useEffect(() => {
    retriveAll();
  }, []);
  return (
    <div className="image-list">
      {images.map((image) => {
        return (
          <div className="image-items">
            <img className="image-item"
              src={`https://mbzluisrzxmskyoiehjz.supabase.co/storage/v1/object/public/beverages/public/${image.name}`}
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default ListBeverage;
