import AddUnitModal from "./AddUnitModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UnitOfMeasure() {
  const data = useLoaderData();
  const revalidator = useRevalidator();
  const fetchedData = data;

  const tableKeys = Object.keys(fetchedData[0]);

  const searchToken = useSelector((state) => state.search.value);

  const tableData = searchToken
    ? data.filter((item) =>
      searchToken
        ? item.unitName
          ?.toLowerCase()
          .includes(searchToken?.toLowerCase())
        : true
    )
    : data;

  const handleSave = async (event, unit) => {
    event.preventDefault();
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
        updatedUnit
      );
      revalidator.revalidate();
      console.log("Item Updated");
    } catch (error) {
      console.error(`Error updating Unit:`, error);
    }
  };

  const handleDelete = (unit) => {
    axios
      .delete(`http://localhost:5050/unit-of-measure/${unit.unitId}`)
      .then((response) => {
        console.log(unit.unitId);
        if (response.status === 200) {
          console.log("Item Deleted");
        } else {
          throw new Error(`Failed to delete Unit`);
        }
      })

      .catch((error) => {
        console.error(`Error deleting Unit:`, error);
      });
  };

  return (
    <>
      <div className="container flexBox pt-5">
        <SearchControl title="Search Categories" tableType="Units" />
        <AddUnitModal />
        <PaginationTable
          tableData={tableData}
          tableKeys={tableKeys}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}
