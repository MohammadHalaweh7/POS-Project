import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function Products() {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const tableKeys = Object.keys(data[0]);
  const searchToken = useSelector((state) => state.search.value);
  const tableData = searchToken
    ? data.filter((item) =>
        searchToken
          ? item.name?.toLowerCase().includes(searchToken?.toLowerCase())
          : true
      )
    : data;

  const handleSave = async (event, product) => {
    event.preventDefault();
    try {
      let updatedProduct;
      // if (product.productImage) {
      //   const unitImage = `/public/products/${product.productImage}`;
      //   updatedProduct = { ...product, unitImage };
      // } else {
        updatedProduct = { ...product };
      // }

      await axios.put(
        `http://localhost:5050/products/${product.productId}`,
        updatedProduct,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
      console.log("triggered");
      revalidator.revalidate();
      console.log("Item Updated");
    } catch (error) {
      console.error(`Error updating Product:`, error);
    }
  };

  const handleDelete = (product) => {
    try {
      axios
        .delete(`http://localhost:5050/products/${product.productId}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Item Deleted");
          } else {
            throw new Error("Failed to delete Product");
          }
        });
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  return (
    <>
      <div className="container flexBox pt-5">
        <SearchControl title="Search Product" />
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
