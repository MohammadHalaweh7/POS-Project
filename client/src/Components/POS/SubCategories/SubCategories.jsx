import React, { useContext } from "react";
import style from "./SubCategories.module.css";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "../../../redux/features/CartItems/cartItemsSlice";
import { searchControlContext } from "App";

export default function SubCategories({ productsData }) {
  const dispatch = useDispatch();
  const categoryInfo = useSelector((state) => state.category);
  const products = productsData;

  const { searchToken } = useContext(searchControlContext);

  const filterdProductByCategory = categoryInfo[0]
    ? products.filter((product) => product.categoryId === categoryInfo[0])
    : products;

  const filterdProduct = searchToken
    ? filterdProductByCategory.filter((item) =>
        searchToken
          ? item.name?.toLowerCase().includes(searchToken?.toLowerCase())
          : true
      )
    : filterdProductByCategory;

  const addToCart = (id) => {
    const productToAdd = products.find(
      (subCategory) => subCategory.productId === id
    );

    if (productToAdd) {
      const newItem = {
        id: productToAdd.productId,
        image: productToAdd.image,
        name: productToAdd.name,
        price: productToAdd.price,
        quantity: 1,
      };

      dispatch(addCartItems(newItem));
    }
  };
  return (
    <>
      <div className="mt-3">
        <div className="flexBox mb-2">
          <h4>Products - {categoryInfo[1]}</h4>
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
                    {product.quantity}
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
