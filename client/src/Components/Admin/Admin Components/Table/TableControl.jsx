import style from "./Table.module.css";
export default function TableControl({
  currentPage,
  setCurrentPage,
  numberOfPages,
  setRecordsPerPage,
  firstItemOfPage,
  lastItemOfPage,
  numOfAllPage,
  recordsPerPage
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
    <div className={`${style.TableControl} flexBox container`}>
      <div className={`${style.TableButton} pagination h-50`}>
        <a href="#" className="page-link rounded" onClick={prevPage}>
          Prev
        </a>

        <a href="#" className="page-link rounded" onClick={nextPage}>
          Next
        </a>
      </div>

      <div className={`${style.pageNumInfo} flexBox rounded form-control`}>
        <span className="">{`${firstItemOfPage}-${lastItemOfPage}`}</span>
        <span
          className="text-muted "
          style={{ paddingLeft: "7px", paddingRight: "7px" }}
        >
          of
        </span>
        <span className="">{numOfAllPage}</span>
      </div>

      <div className={` ${style.numOfPage} flexBox form-control`}>
        <input
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
          value={recordsPerPage}
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
