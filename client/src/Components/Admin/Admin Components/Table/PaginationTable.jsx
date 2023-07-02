import { useState, useEffect } from "react"
import TableControl from "./TableControl"
import { searchControlContext } from "../../../../App.js"
import style from "./Table.module.css"
import { useContext } from "react"

export default function Table({ tableData, tableKeys, handleSave, handleDelete }) {

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [editableRow, setEditableRow] = useState(null)
  const [editableItem, setEditableItem] = useState({})

  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1
  const lastItemOfPage = recordsPerPage * currentPage
  const recordsData = tableData.slice(firstIndex, lastIndex)
  const numberOfPages = Math.ceil(tableData.length / recordsPerPage)
  const numOfAllPage = numberOfPages * recordsPerPage

  const handleChange = (event) => {
    setEditableItem({
      ...editableItem,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => { }, [editableRow])

  const tdData = () => {
    return tableData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          {
            tableKeys.slice(1).map((key) => {
              return <td key={key}>
                {editableRow === index ? (
                  <input
                    name={key}
                    value={editableItem[key] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <div>{item[key]}</div>
                )}
              </td>
            })
          }
          <td>
            {editableRow === index ? (
              <>
                <a
                  className='mx-2'
                  href='#'
                  onClick={(event) => {
                    handleSave(event, editableItem)
                    setEditableRow(null);
                  }}
                >
                  <i className='fas fa-save'></i>
                </a>
                <a
                  href='#'
                  onClick={(event) => {
                    event.preventDefault();
                    setEditableRow(null);
                    setEditableItem({});
                  }}
                >
                  <i className='fas fa-times'></i>
                </a>
              </>
            ) : (
              <a
                href='#'
                onClick={(event) => {
                  event.preventDefault();
                  setEditableRow(index);
                  setEditableItem({ ...item });
                }}
              >
                <i className='fas fa-edit'></i>
              </a>
            )}
          </td>
          <td>
            <a
              href='#'
              onClick={(event) => {
                handleDelete(item)
              }}
            >
              <i className='fas fa-trash-alt text-danger'></i>
            </a>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div className='container'>
        <table className={`${style.paginationTable} table`}>
          <thead>
            <tr>
              {tableKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tdData()}
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
  )
}
