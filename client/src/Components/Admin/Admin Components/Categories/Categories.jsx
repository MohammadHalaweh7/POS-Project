import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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
        if (category.productImage) {
          const productImage = `/public/category/${category.imageFile}`;
          updatedProduct = { ...category, productImage };
        } else {
          updatedProduct = { ...category };
        }

        await axios.put(
          `http://localhost:5050/product-categories/${category.categoryId}`,
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
        toast.success("Updated successfully");
      } catch (error) {
        console.error(`Error updating Category:`, error);
      }
    });
  };

  const handleDelete = (category) => {
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
          .delete(
            `http://localhost:5050/product-categories/${category.categoryId}`,
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${JSON.parse(
                  localStorage.getItem("accessToken")
                )}`,
              },
            }
          )
          .then((response) => {
            console.log(category.categoryId);
            if (response.status === 200) {
              revalidator.revalidate();
              console.log("Item Deleted");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              throw new Error(`Failed to delete Category`);
            }
          });
      } catch (error) {
        console.error(`Error deleting Category:`, error);
      }
    });
  };
  return (
    <>
      <div className="container flexBox pt-5">
        <SearchControl title="Search Categorie" />
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
