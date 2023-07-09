import React from "react";
import Card from "./Card";
import style from "./../Dashboard.module.css";
import { useLoaderData } from "react-router-dom";

export default function Cards() {
  const data = useLoaderData();

  const Cards = [
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      name: "Products",
      count: `${data[1].data.length} +`,
      color: "#57b960",
    },
    {
      icon: <i className="fa-solid fa-list"></i>,
      name: "Categories",
      count: `${data[0].data.length} +`,
      color: "#dc3545",
    },
    {
      icon: <i className="fa fa-sliders"></i>,
      name: "Unit of measures",
      count: `${data[2].data.length} +`,
      color: "#17a2b8",
    },
    {
      icon: <i className="fa-solid fa-user"></i>,
      name: "Users",
      count: `${data[2].data.length} +`,
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
