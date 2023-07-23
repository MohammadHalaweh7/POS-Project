import AddProductModal from "./AddProductModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";
import { toast } from "react-toastify";
import useDeleteImage from "../../../hooks/useDeleteImage";

export default function Products() {
  const { deleteImage, isPending } = useDeleteImage()
  const data = useRouteLoaderData("allDataRoute");
  const productsData = data[1].value.data || [];

  const revalidator = useRevalidator();
  
  const tableKeys = productsData.length > 0 ? Object.keys(productsData[0]) : [];



  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(setEditItem(null));
  };

  const handleSave = async (editItem, imageLinkUrl) => {
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
          `http://localhost:5050/products/${editItem.productId}`,
          { ...editItem, image: imageLinkUrl },
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
              deleteImage(product.image)
              revalidator.revalidate();
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


  useEffect(() => { }, [productsData])
  

  return (
    <>
      <div className="container flexBox pt-5">
        <SearchControl title="Search Product" />
        <AddProductModal
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </div>

      <PaginationTable
        tableData={productsData}
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