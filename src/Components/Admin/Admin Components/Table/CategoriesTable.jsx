import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TableControl from "./TableControl";
import { searchControlContext } from "../../../../App.js";
import style from "./Table.module.css";

export default function CategoriesTable({
  getCategoriesData,
  myData,
  setMyData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editableRow, setEditableRow] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1;
  const lastItemOfPage = recordsPerPage * currentPage;
  const recordsData = myData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

  const { searchToken } = useContext(searchControlContext);

  const filteredData = myData.filter((item) =>
    searchToken
      ? item.categoryName?.toLowerCase().includes(searchToken?.toLowerCase())
      : true
  );

  const deleteCategory = (id) => {
    axios
      .delete(`http://localhost:3100/categories/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newArray = myData.filter((ele) => ele.id !== id);
          setMyData(newArray);
        } else {
          throw new Error("Failed to delete category");
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSaveCategory = async (event, id) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3100/categories/${id}`, {
        categoryName,
      });
      console.log(categoryName);
      setEditableRow(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  useEffect(() => {}, [searchToken]);
  useEffect(() => {
    getCategoriesData();
  }, [editableRow]);

  return (
    <>
      <div className='container'>
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
                    <td>{ele.categoryName}</td>
                    <td>
                      {editableRow === index ? (
                        <>
                          <a
                            className='mx-2'
                            href='#'
                            onClick={(event) => {
                              setCategoryName(ele.categoryName)
                              console.log(ele)
                              handleSaveCategory(event, ele.id)
                            }}
                          >
                            <i className='fas fa-save'></i>
                          </a>
                          <a href='#' onClick={() => setEditableRow(null)}>
                            <i className='fas fa-times'></i>
                          </a>
                        </>
                      ) : (
                        <a href='#' onClick={() => setEditableRow(index)}>
                          <i className='fas fa-edit'></i>
                        </a>
                      )}
                    </td>
                    <td>
                      <a href='#' onClick={() => deleteCategory(ele.id)}>
                        <i className='fas fa-trash-alt text-danger'></i>
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
                          type='text'
                          name='categoryName'
                          value={categoryName}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <a
                          className='mx-2 '
                          href='#'
                          onClick={(event) => {
                            getCategoriesData()
                            handleSaveCategory(event, ele.id)
                          }}
                        >
                          <i className='fas fa-save'></i>
                        </a>
                        <a href='#' onClick={() => setEditableRow(null)}>
                          <i className='fas fa-times'></i>
                        </a>
                      </td>
                      <td>
                        <a href='#' onClick={() => deleteCategory(ele.id)}>
                          <i className='fas fa-trash-alt text-danger'></i>
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.categoryName}</td>
                      <td>
                        <a
                          href='#'
                          onClick={() => {
                            setEditableRow(index)
                            setCategoryName(ele.categoryName)
                          }}
                        >
                          <i className='fas fa-edit'></i>
                        </a>
                      </td>
                      <td>
                        <a href='#' onClick={() => deleteCategory(ele.id)}>
                          <i className='fas fa-trash-alt text-danger'></i>
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
