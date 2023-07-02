import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom"
import { useContext } from "react";
import { searchControlContext } from "App";
export default function Categories() {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const fetchedData = data;

  const tableKeys = Object.keys(fetchedData[0]);

  const rowData = fetchedData.map((data) => tableKeys.map((key) => data[key]));

  const { searchToken } = useContext(searchControlContext);

  const tableData = searchToken
    ? rowData.filter((item) =>
        searchToken
          ? item.categoryName
              ?.toLowerCase()
              .includes(searchToken?.toLowerCase())
          : true
      )
    : fetchedData;

  const handleSave = async (event, category) => {
    event.preventDefault();
    try {
      let updatedProduct;
      if (category.productImage) {
        const productImage = `/public/category/${category.imageFile}`;
        updatedProduct = { ...category, productImage };
      } else {
        updatedProduct = { ...category };
      }

      await axios.put(
        `http://localhost:5050/product-categories/${category.categoryId}`,
        updatedProduct
      );
      revalidator.revalidate();
      console.log("Item Updated");
    } catch (error) {
      console.error(`Error updating Category:`, error);
    }
  };

  const handleDelete = (category) => {
    axios
      .delete(`http://localhost:5050/product-categories/${category.categoryId}`)
      .then((response) => {
        console.log(category.categoryId);
        if (response.status === 200) {
          console.log("Item Deleted");
        } else {
          throw new Error(`Failed to delete Category`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting Category:`, error);
      });
  };
  return (
    <>
      <Navbar title="Categories" width="container" />
      <div className="container flexBox pt-5">
        <SearchControl title="Search Categories" tableType="Categories" />
        <AddCategoryModal />
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
