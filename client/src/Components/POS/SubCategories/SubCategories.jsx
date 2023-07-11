import style from "./SubCategories.module.css";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems } from "../../../redux/features/CartItems/cartItemsSlice";
import { setActiveCategory } from "../../../redux/features/Category/categorySlice";
import { toast } from "react-toastify";

export default function SubCategories({ productsData }) {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.category.activeCategory);
  const products = productsData;

  const searchToken = useSelector((state) => state.search.value);

  const filterProducts = (products) => {
    if (activeCategory) {
      products = products.filter(
        (product) => product.categoryId === activeCategory.categoryId
      );
    }

    if (searchToken) {
      products = products.filter((product) =>
        product.name?.toLowerCase().includes(searchToken.toLowerCase())
      );
    }

    return products;
  };

  const renderProducts = filterProducts(products);

  const handleProductsClick = () => {
    dispatch(setActiveCategory(null));
  };

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
      toast.success("Add to cart successfully");
    }
  };

  return (
    <>
      <div className="mt-3">
        <div className="flexBox mb-2 flex-start">
          <h4 style={{ cursor: "pointer" }} onClick={handleProductsClick}>
            Products - {activeCategory?.categoryName}
          </h4>{" "}
          <SearchControl title="Search product" />
        </div>
        <div className={`flexBox mt-3`}>
          {renderProducts &&
            renderProducts?.map((product, index) => (
              <Card
                sx={{ maxWidth: 160, maxHeight: 260, marginBottom: 3 }}
                key={index}
              >
                <CardActionArea className={`${style.cardProduct}`}>
                  <CardMedia
                    component="img"
                    sx={{ height: 120, width: 160 }}
                    image={product.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                      }}
                    >
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
