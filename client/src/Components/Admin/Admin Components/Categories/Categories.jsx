import SearchControl from "../Table/SearchControl";
import axios from "axios";
import AddCategoryModal from "./AddCategoryModal";
import PaginationTable from "../Table/PaginationTable";
import { useRouteLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {  useState } from "react";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";

export default function Categories() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const revalidator = useRevalidator();
  const tableKeys = Object.keys(categoriesData[0]);
  const searchToken = useSelector((state) => state.search.value);
  const tableData = searchToken
    ? categoriesData.filter((item) =>
        searchToken
          ? item.categoryName
              ?.toLowerCase()
              .includes(searchToken?.toLowerCase())
          : true
      )
    : categoriesData;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(setEditItem(null));
  };

  const handleSave = async (editItem) => {
    setOpen(false);
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
        await axios.put(
          `http://localhost:5050/product-categories/${editItem.categoryId}`,
          editItem,
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
        dispatch(setEditItem(null));
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
            if (response.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              revalidator.revalidate();
              console.log("Item Deleted");
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
        <AddCategoryModal
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </div>
      <PaginationTable
        tableData={tableData}
        tableKeys={tableKeys}
        handleSave={handleSave}
        handleDelete={handleDelete}
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </>
  );
}
