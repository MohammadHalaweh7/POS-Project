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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/features/User/userSlice";

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
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 100);
    console.log("logout");
  };

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
          <NavLink
            className="nav-link"
            to="/#"
            data-toggle="collapse"
            onClick={handleLogout}
            className={style.link}
            activeclassname={style.active}
          >
            <div className={style.icon}>
              <FaSignOutAlt />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={style.linkText}
            >
              LogOut
            </div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
