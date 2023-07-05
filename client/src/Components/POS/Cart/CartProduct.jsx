import React, { useContext, useState } from "react";
import style from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setCartItems,
  deleteCartItem,
} from "../../../redux/features/CartItems/cartItemsSlice";

export default function CartProduct() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.cartItems);
  console.log({ cartItems });

  const deleteFromCart = (id) => {
    dispatch(deleteCartItem(id));
  };

  const handleQuantityChange = (e, id) => {
    // const newQuantity = parseInt(e.target.value);
    // const updatedCartItems = [...cartItems];
    // updatedCartItems[id].quantity = newQuantity;
    // dispatch(setCartItems(updatedCartItems));

    const updatedCartItems = cartItems.map((ele) => {
      if (ele.id === id) {
        ele["quantity"] = e.target.value;
      }
    });
    dispatch(setCartItems(updatedCartItems));
  };

  const calculatePrice = (price, quantity) => {
    return price * (quantity || 1);
  };

  return (
    <>
      {cartItems &&
        cartItems?.map((item, index) => {
          const { quantity } = item;
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
                  <div style={{ color: "orange" }}>
                    {" "}
                    {calculatePrice(item.price, quantity)} $
                  </div>
                </div>
              </div>
              <div>
                <input
                  min={1}
                  max={100}
                  type="number"
                  style={{ width: "50px", textAlign: "center" }}
                  value={quantity || 1}
                  onChange={(e) => handleQuantityChange(e, item.id)}
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
