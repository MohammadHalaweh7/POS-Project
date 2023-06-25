import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TableControl from "./TableControl";
import { searchControlContext } from "../../../../App.js";
import style from "./Table.module.css";

export default function UnitsTable({ getUnitsData, myData, setMyData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editableRow, setEditableRow] = useState(null);
  const [unitName, setUnitName] = useState("");
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1;
  const lastItemOfPage = recordsPerPage * currentPage;
  const recordsData = myData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

  const { searchToken } = useContext(searchControlContext);
  console.log(myData);
  const filteredData = myData.filter((item) =>
    searchToken
      ? item.unitName?.toLowerCase().includes(searchToken?.toLowerCase())
      : true
  );

  const deleteUnit = (id) => {
    axios
      .delete(`http://localhost:3100/units/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newArray = myData.filter((ele) => ele.id !== id);
          setMyData(newArray);
        } else {
          throw new Error("Failed to delete unit");
        }
      })
      .catch((error) => {
        console.error("Error deleting unit:", error);
      });
  };

  const handleChange = (event) => {
    setUnitName(event.target.value);
  };

  const handleSaveUnit = async (event, id) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3100/units/${id}`, {
        unitName,
      });
      console.log(unitName);
      setEditableRow(null);
    } catch (error) {
      console.error("Error updating unit:", error);
    }
  };

  useEffect(() => {}, [searchToken]);
  useEffect(() => {
    getUnitsData();
  }, [editableRow]);

  return (
    <>
      <div className="container">
        <table className={`${style.paginationTable} table`}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchToken
              ? filteredData.map((ele, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.unitName}</td>
                    <td>
                      {editableRow === index ? (
                        <>
                          <a
                            className="mx-2"
                            href="#"
                            onClick={(event) => {
                              setUnitName(ele.unitName);
                              console.log(ele);
                              handleSaveUnit(event, ele.id);
                            }}
                          >
                            <i className="fas fa-save"></i>
                          </a>
                          <a href="#" onClick={() => setEditableRow(null)}>
                            <i className="fas fa-times"></i>
                          </a>
                        </>
                      ) : (
                        <a href="#" onClick={() => setEditableRow(index)}>
                          <i className="fas fa-edit"></i>
                        </a>
                      )}
                    </td>
                    <td>
                      <a href="#" onClick={() => deleteUnit(ele.id)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))
              : recordsData.map((ele, index) =>
                  editableRow === index ? (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          name="unitName"
                          value={unitName}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <a
                          className="mx-2 "
                          href="#"
                          onClick={(event) => {
                            getUnitsData();
                            handleSaveUnit(event, ele.id);
                          }}
                        >
                          <i className="fas fa-save"></i>
                        </a>
                        <a href="#" onClick={() => setEditableRow(null)}>
                          <i className="fas fa-times"></i>
                        </a>
                      </td>
                      <td>
                        <a href="#" onClick={() => deleteUnit(ele.id)}>
                          <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.unitName}</td>
                      <td>
                        <a
                          href="#"
                          onClick={() => {
                            setEditableRow(index);
                            setUnitName(ele.unitName);
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </a>
                      </td>
                      <td>
                        <a href="#" onClick={() => deleteUnit(ele.id)}>
                          <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  )
                )}
          </tbody>
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
      />
    </>
  );
}
