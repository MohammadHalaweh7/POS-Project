import React from "react";
import Card from "./Card";
import style from "./../Dashboard.module.css";

export default function Cards() {
  const Cards = [
    {
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      name: "Products",
      count: "100+",
      color: "#57b960",
    },
    {
      icon: <i className="fa-solid fa-list"></i>,
      name: "Categories",
      count: "199+",
      color: "#dc3545",
    },
    {
      icon: <i className="fa-solid fa-users"></i>,
      name: "Coustomres",
      count: "205+",
      color: "#17a2b8",
    },
    {
      icon: <i className="fa-solid fa-user"></i>,
      name: "Users",
      count: "2+",
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
