import React, { useState } from "react";

export default function TableControl({
  currentPage,
  setCurrentPage,
  numberOfPages,
  setRecordsPerPage,
  firstItemOfPage,
  lastItemOfPage,
  numOfAllPage,
}) {
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleChangePageNumber = (e) => {
    if (e.target.value > numberOfPages || e.target.value < 1) return;
    setCurrentPage(+e.target.value);
  };

  const handleNumberOfItemsPerPage = (e) => {
    setRecordsPerPage(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="container mt-4 d-flex justify-content-between">
      <div className="pagination h-50 ">
        <a href="#" className="page-link rounded" onClick={prevPage}>
          Prev
        </a>

        <a href="#" className="page-link rounded" onClick={nextPage}>
          Next
        </a>
      </div>

      <div
        className=" d-flex justify-content-center  align-items-center p-2 rounded form-control "
        style={{ height: "38px", width: "130px" }}
      >
        <span className="">{`${firstItemOfPage}-${lastItemOfPage}`}</span>
        <span
          className="text-muted "
          style={{ paddingLeft: "7px", paddingRight: "7px" }}
        >
          {" "}
          of{" "}
        </span>
        <span className="">{numOfAllPage}</span>
      </div>

      <div
        className=" d-flex justify-content-end mb-5 form-control"
        style={{ width: "90px" }}
      >
        <input
          style={{ width: "30px", textAlign: "center", border: "none" }}
          type="number"
          value={currentPage}
          onChange={handleChangePageNumber}
        />
        <span style={{ paddingRight: "20px" }}>/</span>
        <span>{numberOfPages}</span>
      </div>

      <div className="form-group">
        <select
          className="form-control"
          name="pagesNumbers"
          id="pagesNumbers"
          onChange={handleNumberOfItemsPerPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
}
