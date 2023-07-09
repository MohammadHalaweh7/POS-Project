import { useState } from "react";
import style from "./Sidebar.module.css";
import {
  FaTh,
  FaBars,
  FaShoppingCart,
  FaSignOutAlt,
  FaRuler,
  FaLaptop,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/dashboard/products",
      name: "Products",
      icon: <FaShoppingCart />,
    },
    {
      path: "/dashboard/categories",
      name: "Categories",
      icon: <FaLaptop />,
    },
    {
      path: "/dashboard/UnitOfMeasure",
      name: "Measures",
      icon: <FaRuler />,
    },
    {
      path: "/#",
      name: "Logout",
      icon: <FaSignOutAlt />,
    },
  ];

  return (
    <>
      <div className={style.sid} style={{ zIndex: 9999 }}>
        <div
          style={{ width: isOpen ? "200px" : "50px" }}
          className={style.sidebar}
        >
          <div className={style.topSection}>
            <h1
              style={{ display: isOpen ? "block" : "none" }}
              className={style.logo}
            >
              Admin
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px", cursor: "pointer" }}
              className={style.bars}
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => {
            return (
              <NavLink
                to={item.path}
                key={index}
                className={style.link}
                activeclassname={style.active}
              >
                <div className={style.icon}>{item.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className={style.linkText}
                >
                  {item.name}
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
