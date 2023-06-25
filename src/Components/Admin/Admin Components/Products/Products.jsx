import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import ProductsTable from "../Table/ProductsTable";

export default function Products() {
  const [myData, setMyData] = useState([]);

  const getProductsData = () => {
    axios
      .get("http://localhost:3100/products")
      .then((response) => {
        const data = response.data;
        setMyData(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };
  return (
    <>
      <Navbar title="Products" />
      <div className="container flexBox">
        <SearchControl title="Search Products"/>
        <AddProductModal title="Add New Products" getProductsData={getProductsData}/>
      </div>
      <ProductsTable
        getProductsData={getProductsData}
        setMyData={setMyData}
        myData={myData}
      />
    </>
  );
}
