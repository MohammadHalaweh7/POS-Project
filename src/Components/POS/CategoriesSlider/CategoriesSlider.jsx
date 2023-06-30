import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "./../Pos.module.css";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 5,
    autoplay: true,
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://king-prawn-app-3mgea.ondigitalocean.app/category"
      );
      setCategories(data.category);
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className={`${style.sliderCategory}`}>
        <h4 className="mb-3">Categories</h4>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div className="card" key={index}>
              <img
                className="card-img-top m-auto"
                src={category.image.secure_url}
                alt={category.name}
                // onClick={() => getSubCategories(category.id)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
