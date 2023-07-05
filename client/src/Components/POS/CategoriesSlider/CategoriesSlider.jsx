import Slider from "react-slick";
import style from "./../Pos.module.css";

import { useDispatch } from "react-redux";
import { setCategoryInfo } from "../../../redux/features/Category/categorySlice";

export default function CategoriesSlider({ categoriesData }) {
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 10,
    slidesToScroll: 5,
    autoplay: true,
  };

  return (
    <>
      <div className={`${style.sliderCategory}`}>
        <h4 className="mb-3">Categories</h4>
        <Slider {...settings}>
          {categoriesData.map((category, index) => (
            <div
              className="card"
              key={index}
              onClick={() =>
                dispatch(
                  setCategoryInfo([category.categoryId, category.categoryName])
                )
              }
            >
              {category.categoryName}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
