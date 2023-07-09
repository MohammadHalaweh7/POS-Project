import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Categories() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  const tableKeys = Object.keys(data[0]);


  const searchToken = useSelector((state) => state.search.value);

  const tableData = searchToken
    ? data.filter((item) =>
      searchToken
        ? item.categoryName
          ?.toLowerCase()
          .includes(searchToken?.toLowerCase())
        : true
    )
    : data;

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
