import React from "react";
import Navbar from "../Navbar/Navbar";
import PaginationTable from "../Table/PaginationTable";
import AddProductModal from "./AddProductModal";
export default function Products() {
  return (
    <>
      <Navbar title="Products" />
      <AddProductModal />
      <PaginationTable />
    </>
  );
}
