import Slider from "react-slick";
import style from "./../Pos.module.css";
import { useDispatch } from "react-redux";

import { setActiveCategory } from "../../../redux/features/Category/categorySlice";
import { useEffect, useState } from "react";

export default function CategoriesSlider({ categoriesData, productsData }) {
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleSelectCategory = (category) => {
    dispatch(setActiveCategory(category));
  };

  return (
    <>
      <div className={`${style.sliderCategory}`}>
        <h4 className="mb-3">Categories</h4>
        <Slider {...settings}>
          {categoriesData.map((category, index) => (
            <div
              className="card text-center p-2"
              key={index}
              onClick={() => handleSelectCategory(category)}
              className={`${style.slideContainer}`}
            >
              <img
                className="card-img-top m-auto"
                src={category.image}
                alt={category.categoryName}
              />
              <p>{category.categoryName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
