import axios from "axios";
import React, { useContext } from "react";
import Slider from "react-slick";
import style from "./../Pos.module.css";
import { CategoryIdContext } from "./../Pos/Pos";

export default function CategoriesSlider({ categoriesData }) {
  const { categoryId, setCategoryId } = useContext(CategoryIdContext);
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 10,
    slidesToScroll: 5,
    autoplay: true,
  };

  const categories = categoriesData;
  console.log(categoriesData);

  return (
    <>
      <div className={`${style.sliderCategory}`}>
        <h4 className="mb-3">Categories</h4>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div
              className="card"
              key={index}
              onClick={() => setCategoryId(category.categoryId)}
            >
              {category.categoryName}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
