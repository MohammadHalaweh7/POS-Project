import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./../Pos.module.css";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";
export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([]);

  async function getSubCategories() {
    const { data } = await axios.get(`http://localhost:3100/subCategories`);
    setSubCategories(data);
  }

  useEffect(() => {
    getSubCategories();
  }, []);
  return (
    <>
      <div className="mt-3">
        <div className="flexBox mb-2">
        <h2>Products</h2>
        <SearchControl title="Search product" />
        </div>
        <div className={`flexBox`}>
          {subCategories.map((subcategory, index) => (
            <div className={`${style.subCategoryProduct}`} key={index}>
              <p>{subcategory.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
