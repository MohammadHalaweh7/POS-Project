import Slider from "react-slick";
import style from "./../Pos.module.css";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryProducts,
  setActiveCategory,
} from "../../../redux/features/Category/categorySlice";
import { useEffect, useState } from "react";

export default function CategoriesSlider({ categoriesData, productsData }) {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory);
  const [isDispatch, setIsDispatch] = useState(false);
  const categoryProducts = useSelector(
    (state) => state.category.categoryProducts
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
  };

  const handleSelectCategory = (category) => {
    setIsDispatch(true);
    dispatch(setActiveCategory(category.categoryId));
  };




  // useEffect(() => {
  //   const filterdProductByCategory = productsData.filter(
  //     (product) => product.categoryId === activeCategory
  //   );
  //   dispatch(setCategoryProducts(filterdProductByCategory));
  //   console.log({ categoryProducts });
  //   setIsDispatch(false);
  // }, [isDispatch]);


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
            >
              {category.categoryName}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
