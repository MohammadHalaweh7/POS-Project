import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import PaginationTable from "../Table/PaginationTable";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";

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
        <SearchControl />
        <AddProductModal />
      </div>
      <PaginationTable
        getProductsData={getProductsData}
        setMyData={setMyData}
        myData={myData}
      />
    </>
  );
}
