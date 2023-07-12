import AddUnitModal from "./AddUnitModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useRouteLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function UnitOfMeasure() {
  const data = useRouteLoaderData("allDataRoute");
  const unitsData = data[2].value.data;

  const revalidator = useRevalidator();
  const tableKeys = Object.keys(unitsData[0]);
  const searchToken = useSelector((state) => state.search.value);
  const tableData = searchToken
    ? unitsData.filter((item) =>
        searchToken
          ? item.unitName?.toLowerCase().includes(searchToken?.toLowerCase())
          : true
      )
    : unitsData;

  const handleSave = async (event, unit) => {
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
        let updatedUnit;
        if (unit.UnitImage) {
          const unitImage = `/public/unit-of-measure/${unit.imageFile}`;
          updatedUnit = { ...unit, unitImage };
        } else {
          updatedUnit = { ...unit, conversionFactor: +unit.conversionFactor };
        }
        await axios.put(
          `http://localhost:5050/unit-of-measure/${unit.unitId}`,
          updatedUnit,
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
        <AddUnitModal />
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
