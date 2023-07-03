import React, { useContext } from "react";
import style from "./Cart.module.css";
import { CartItemsContext } from "../Pos/Pos";
export default function CartProduct() {
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  console.log("cartItems ???????????????????????");
  console.log(cartItems);

  const deleteFromCart = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };
  
  return (
    <>
      {cartItems.map((item, index) => {
        return (
          <div className={`flexBox mb-2 ${style.CartProduct}`} key={index}>
            <div className="flexBox">
              <img
                src={item.image}
                alt="product image"
                style={{
                  width: "120px",
                  height: "70px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  marginRight: "10px",
                }}
              />
              <div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {item.name}
                </div>
                <div style={{ color: "orange" }}>{item.price} $</div>
              </div>
            </div>
            <div>
              <input
                min={0}
                max={100}
                type="number"
                style={{ width: "50px" }}
              ></input>
            </div>
            <div>
              <i
                className="fas fa-times"
                style={{
                  color: "red",
                  fontSize: "20px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => deleteFromCart(item.id)}
              ></i>
            </div>
          </div>
        );
      })}
    </>
  );
}
