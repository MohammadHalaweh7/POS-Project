import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useContext } from "react";
import { searchControlContext } from "App";

export default function Products() {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const fetchedData = data;
  console.log(data);
  const tableKeys = Object.keys(fetchedData[0]);

  const rowData = fetchedData.map((data) => tableKeys.map((key) => data[key]));

  const { searchToken } = useContext(searchControlContext);

  const tableData = searchToken
    ? rowData.filter((item) =>
        searchToken
          ? item.at(1)?.toLowerCase().includes(searchToken?.toLowerCase())
          : true
      )
    : fetchedData;

  const handleSave = async (event, product) => {
    event.preventDefault();
    try {
      let updatedProduct;
      if (product.productImage) {
        const unitImage = `/public/products/${product.productImage}`;
        updatedProduct = { ...product, unitImage };
      } else {
        updatedProduct = { ...product };
      }

      await axios.put(
        `http://localhost:5050/products/${product.productId}`,
        updatedProduct,
        { method: "Put" }
      );
      console.log("triggered");
      revalidator.revalidate();
      console.log("Item Updated");
    } catch (error) {
      console.error(`Error updating Product:`, error);
    }
  };

  const handleDelete = (product) => {
    axios
      .delete(`http://localhost:5050/products/${product.productId}`)
      .then((response) => {
        console.log(product.productId);
        if (response.status === 200) {
          console.log("Item Deleted");
        } else {
          throw new Error(`Failed to delete Product`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting Product:`, error);
      });
  };

  return (
    <>
      <Navbar title="Products" width="container" />
      <div className="container flexBox pt-5">
        <SearchControl />
        <AddProductModal />
      </div>

      <PaginationTable
        tableData={tableData}
        tableKeys={tableKeys}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </>
  );
}
