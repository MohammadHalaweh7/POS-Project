import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import CategoriesTable from "../Table/CategoriesTable";

export default function Categories() {
  const [myData, setMyData] = useState([])

  const getCategoriesData = () => {
    axios
      .get("http://localhost:3100/categories")
      .then((response) => {
        const data = response.data
        setMyData(data)
      })
      .catch((error) => {
        console.error("Error fetching category data:", error)
      })
  }

  return (
    <>
      <Navbar title="Categories" />
      <div className="container flexBox">
        <SearchControl title="Search Categories" />
        <AddCategoryModal getCategoriesData={getCategoriesData} />
      </div>
      <CategoriesTable
      getCategoriesData={getCategoriesData}
      setMyData={setMyData}
      myData={myData}
       />
    </>
  );
}
