import { useState } from "react";
import { Input } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import PaginationTable from "../Table/PaginationTable";
import AddProductModal from "./AddProductModal";
import axios from "axios";

export default function Products() {
  const [searchToken, setSearchToken] = useState("");
  const [myData, setMyData] = useState([]);
  console.log(searchToken);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchToken(e.target.value);
  };
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
      <div className="container d-flex align-items-center flex-wrap flex-row">
        <Input
          placeholder="Search Product"
          type="text"
          value={searchToken}
          onChange={onChangeSearch}
          variant="outlined"
          size="small"
          style={{ width: "300px" ,height:"40px"}}
        />
        <AddProductModal />
      </div>
      <PaginationTable
        searchToken={searchToken}
        getProductsData={getProductsData}
        setMyData={setMyData}
        myData={myData}
      />
    </>
  );
}
