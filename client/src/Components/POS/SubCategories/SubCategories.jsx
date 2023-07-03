import axios from "axios";
import React, { useContext, useState } from "react";
import style from "./SubCategories.module.css";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CategoryIdContext } from "./../Pos/Pos";
import { CartItemsContext } from "../Pos/Pos";
export default function SubCategories({ productsData }) {
  const [state, setState] = useState("done");
  const { categoryId } = useContext(CategoryIdContext);
  const { cartItems, setCartItems } = useContext(CartItemsContext);
  const products = productsData;
  console.log(products);

  const filterdProduct = categoryId
    ? products.filter((product) => product.categoryId === categoryId)
    : products;

  const addToCart = (id) => {
    const productToAdd = filterdProduct.find(
      (subCategory) => subCategory.productId === id
    );

    if (productToAdd) {
      const newItem = {
        id: productToAdd.productId,
        image: productToAdd.image,
        name: productToAdd.name,
        price: productToAdd.price,
      };

      setCartItems([...cartItems, newItem]);
    }
  };

  return (
    <>
      <div className="mt-3">
        <div className="flexBox mb-2">
          <h4>Products -</h4>
          <SearchControl title="Search product" />
        </div>
        <div className={`flexBox mt-3`}>
          {filterdProduct.map((product, index) => (
            <Card
              sx={{ maxWidth: 160, maxHeight: 230, marginBottom: 3 }}
              key={index}
            >
              <CardActionArea className={`${style.cardProduct}`}>
                <CardMedia
                  component="img"
                  height="100"
                  image={product.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      fontSize: "12px",
                    }}
                  >
                    {product.code}
                    {/* mmmmmmmm */}
                  </Typography>

                  <Typography variant="h6" sx={{ color: "orange" }}>
                    {product.price} $
                  </Typography>
                  <div className={`${style.overlay}`}></div>
                  <button
                    id="addBtn"
                    className={`${style.addToCart}`}
                    onClick={() => addToCart(product.productId)}
                  >
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
