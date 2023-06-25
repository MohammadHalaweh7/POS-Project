import { useState } from "react";

import Navbar from "../Navbar/Navbar";
import UnitsTable from "../Table/UnitsTable";
import AddUnitModal from "./AddUnitModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";

export default function UnitOfMeasure() {
  const [myData, setMyData] = useState([]);

  const getUnitsData = () => {
    axios
      .get("http://localhost:3100/units")
      .then((response) => {
        const data = response.data;
        setMyData(data);
      })
      .catch((error) => {
        console.error("Error fetching unit data:", error);
      });
  };

  return (
    <>
      <Navbar title="units" />
      <div className="container flexBox">
        <SearchControl title="Search Categories"/>
        <AddUnitModal getUnitsData={getUnitsData} />
        <UnitsTable
          getUnitsData={getUnitsData}
          setMyData={setMyData}
          myData={myData}
        />
      </div>
    </>
  );
}
