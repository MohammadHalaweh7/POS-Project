import AddUnitModal from "./AddUnitModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useRouteLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";

export default function UnitOfMeasure() {
  const data = useRouteLoaderData("allDataRoute");
  const unitsData = data[2].value.data;
  const dispatch = useDispatch();

  const revalidator = useRevalidator();
  const tableKeys = Object.keys(unitsData[0]);

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
          `http://localhost:5050/unit-of-measure/${editItem.unitId}`,
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
        console.error(`Error updating Unit:`, error);
      }
    });
  };

  const handleDelete = (unit) => {
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
          .delete(`http://localhost:5050/unit-of-measure/${unit.unitId}`, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("accessToken")
              )}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              revalidator.revalidate();
              console.log("Item Deleted");
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              throw new Error(`Failed to delete Unit`);
            }
          });
      } catch (error) {
        console.error(`Error deleting Unit:`, error);
      }
    });
  };

  return (
    <>
      <div className="container flexBox pt-5">
        <SearchControl title="Search Units" />
        <AddUnitModal
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </div>
      <PaginationTable
        tableData={unitsData}
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
