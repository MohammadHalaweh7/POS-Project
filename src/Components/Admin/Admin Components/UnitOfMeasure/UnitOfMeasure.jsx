import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import AddUnitModal from "./AddUnitModal";
import axios from "axios";
import SearchControl from "../Table/SearchControl";
import PaginationTable from "../Table/PaginationTable";

export default function UnitOfMeasure() {
  const [myData, setMyData] = useState([]);

  const getData = () => {
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
  const productsKeys = ["#", "name"];
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar title="units" width="container"/>
      <div className="container flexBox">
        <SearchControl title="Search Categories" tableType="Units" />
        <AddUnitModal getData={getData} />
        <PaginationTable
          getData={getData}
          setMyData={setMyData}
          myData={myData}
          productsKeys={productsKeys}
          tableType="Units"
        />
      </div>
    </>
  );
}
