import React from "react";
import Card from "./Card";
import style from "./../Dashboard.module.css";
import {useRouteLoaderData } from "react-router-dom";

export default function Cards() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const productsData = data[1].value.data;
  const unitsData = data[2].value.data;

  const Cards = [
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      name: "Products",
      count: `${productsData.length} +`,
      color: "#57b960",
    },
    {
      icon: <i className="fa-solid fa-list"></i>,
      name: "Categories",
      count: `${categoriesData.length} +`,
      color: "#dc3545",
    },
    {
      icon: <i className="fa fa-sliders"></i>,
      name: "Unit of measures",
      count: `${unitsData.length} +`,
      color: "#17a2b8",
    },
    {
      icon: <i className="fa-solid fa-user"></i>,
      name: "Users",
      count: `${categoriesData.length} +`,
      color: "#ffc107",
    },
  ];

  return (
    <div className={`container mt-5 ${style.Cards}`}>
      {Cards.map((ele) => {
        return (
          <Card
            icon={ele.icon}
            name={ele.name}
            color={ele.color}
            count={ele.count}
          />
        );
      })}
    </div>
  );
}
