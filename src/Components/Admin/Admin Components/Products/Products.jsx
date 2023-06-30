import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";

export default function Products() {
  const [myData, setMyData] = useState([]);

  const getData = () => {
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
  const productsKeys = [
    "#",
    "name",
    "code",
    "category",
    "image",
    "quantity",
    "price",
    "description",
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar title="Products" width="container" />
      <div className="container flexBox pt-5">
        <SearchControl title="Search Products" tableType="Proudcts" />
        <AddProductModal getData={getData} />
      </div>
      <PaginationTable
        getData={getData}
        setMyData={setMyData}
        myData={myData}
        productsKeys={productsKeys}
        tableType="proudcts"
      />
    </>
  );
}
