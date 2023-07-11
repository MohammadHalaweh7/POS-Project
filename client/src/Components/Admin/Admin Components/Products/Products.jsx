import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData, useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Swal from "sweetalert2";

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
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      Swal.fire("Saved!", "", "success");
      try {
        let updatedProduct;
        updatedProduct = { ...product };

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

        revalidator.revalidate();
        console.log("Item Updated");
      } catch (error) {
        console.error(`Error updating Product:`, error);
      }
    });
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
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
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              throw new Error("Failed to delete Product");
            }
          });
      } catch (error) {
        console.error("Error deleting Product:", error);
      }
    });
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
