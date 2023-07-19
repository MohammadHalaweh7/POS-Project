import Slider from "react-slick";
import style from "./../Pos.module.css";
import { useDispatch } from "react-redux";

import { setActiveCategory } from "../../../redux/features/Category/categorySlice";
import { useRouteLoaderData } from "react-router-dom";

export default function CategoriesSlider() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;

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
        <h4 className="mb-3 textMode">Categories</h4>
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
              <p className="textMode">{category.categoryName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
