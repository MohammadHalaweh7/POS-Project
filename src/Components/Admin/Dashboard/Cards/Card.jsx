import React from "react";
import style from "./../Dashboard.module.css";
export default function Card({ icon, name, count, color }) {
  return (
    <div className={style.Card}>
      <div
        className="card text-white h-100"
        style={{ backgroundColor: `${color}` }}
      >
        <div className="card-body d-flex justify-content-around text-center">
          <div className={style.Icons}>{icon}</div>
          <div>
            <h6 className="text-capitalize">{name}</h6>
            <h1 className="display-9">{count}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
