import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./SubCategories.module.css";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);
  const [state, setState] = useState("done");
  async function getSubCategories() {
    try {
      const { data } = await axios.get(`http://localhost:3100/subCategories`);
      setSubCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSubCategories();
  }, []);

  return (
    <>
      <div className="mt-3">
        <div className="flexBox mb-2">
          <h4>Products</h4>
          <SearchControl title="Search product" />
        </div>
        <div className={`flexBox mt-3`}>
          {subCategories.map((product, index) => (
            <Card
              sx={{ maxWidth: 160, maxHeight: 230, marginBottom: 3 }}
              key={index}
            >
              <CardActionArea className={`${style.cardProduct}`}>
                <CardMedia
                  component="img"
                  height="100"
                  image="assets/imgs/loginHeader.jpeg"
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
                    {product.description}
                  </Typography>

                  <Typography variant="h6" sx={{ color: "orange" }}>
                    {product.price} $
                  </Typography>
                  <div className={`${style.overlay}`}></div>
                  <button id="addBtn" className={`${style.addToCart}`}>
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
