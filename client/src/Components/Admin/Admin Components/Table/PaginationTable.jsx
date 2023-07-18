import { useState, useEffect } from "react";
import TableControl from "./TableControl";
import style from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";

export default function Table({
  tableData,
  tableKeys,
  handleSave,
  handleDelete,
  open,
  handleClickOpen,
  handleClose,
}) {
  const [sortedTableData, setSortedTableData] = useState(tableData);
  const [activeKey, setActiveKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1;
  const lastItemOfPage = recordsPerPage * currentPage;
  const recordsData = sortedTableData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(tableData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

  const dispatch = useDispatch();

  useEffect(() => {}, [recordsPerPage, currentPage]);

  const searchToken = useSelector((state) => state.search.value);
  const filteredTableData = searchToken
    ? tableData.filter((item) =>
        searchToken
          ? item.name?.toLowerCase().includes(searchToken?.toLowerCase())
          : true
      )
    : tableData;

  const onSort = (key) => {
    if (
      key === "name" ||
      key === "price" ||
      key === "quantity" ||
      key === "unitName" ||
      key === "categoryName"
    ) {
      setActiveKey(key);
      const isAsc = sortOrder === "asc";

      const sortedData = [...tableData].sort((a, b) => {
        if (a[key] < b[key]) {
          return isAsc ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return isAsc ? 1 : -1;
        }
        return 0;
      });
      setSortOrder(isAsc ? "desc" : "asc");
      setSortedTableData(sortedData);
    }
  };

  const tdData = () => {
    return filteredTableData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{firstIndex + index + 1}</td>
          {tableKeys.slice(1).map((key) => {
            if (key === "image") {
              return (
                <td key={key}>
                  <img
                    src={item[key]}
                    alt={item.name}
                    style={{
                      width: "90px",
                      height: "70px",
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              );
            } else
              return (
                <td key={key}>
                  <div>{item[key]}</div>
                </td>
              );
          })}
          <td>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                dispatch(setEditItem({ ...item }));
                handleClickOpen();
              }}
            >
              <i className="fas fa-edit"></i>
            </a>
          </td>
          <td>
            <a
              href="#"
              onClick={(event) => {
                handleDelete(item);
              }}
            >
              <i className="fas fa-trash-alt text-danger"></i>
            </a>
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    console.log({ tableData });
  }, [tableData]);

  return (
    <>
      <div className="container">
        <table className={`${style.paginationTable} table`}>
          <thead>
            <tr>
              {tableKeys.map((key) => (
                <th key={key} onClick={() => onSort(key)}>
                  {key}
                  {activeKey === key && sortOrder === "asc" && (
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                  )}
                  {activeKey === key && sortOrder === "desc" && (
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                  )}
                </th>
              ))}
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{tdData()}</tbody>
        </table>
      </div>

      <TableControl
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={numberOfPages}
        setRecordsPerPage={setRecordsPerPage}
        firstItemOfPage={firstItemOfPage}
        lastItemOfPage={lastItemOfPage}
        numOfAllPage={numOfAllPage}
        currentPage={currentPage}
        numberOfPages={numberOfPages}
        recordsPerPage={recordsPerPage}
      />
    </>
  );
}
