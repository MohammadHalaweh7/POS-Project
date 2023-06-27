import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import PaginationTable from "../Table/PaginationTable";


export default function Categories() {
  const [myData, setMyData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3100/categories")
      .then((response) => {
        const data = response.data;
        setMyData(data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  };
  const productsKeys = ["#", "name"];

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar title="Categories" width="container" />
      <div className="container flexBox">
        <SearchControl title="Search Categories" tableType="Categories" />
        <AddCategoryModal getData={getData} />
      </div>
      <PaginationTable
        getData={getData}
        setMyData={setMyData}
        myData={myData}
        productsKeys={productsKeys}
        tableType="categories"
      />
    </>
  );
}
