import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TableControl from "./TableControl";
import { searchControlContext } from "../../../../App.js";
import style from "./Table.module.css";

export default function PaginationTable({
  getData,
  myData,
  setMyData,
  productsKeys,
  tableType,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editableRow, setEditableRow] = useState(null);
  const [editableProductData, setEditableProductData] = useState({});
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1;
  const lastItemOfPage = recordsPerPage * currentPage;
  const recordsData = myData.slice(firstIndex, lastIndex);
  const [imageFile, setImageFile] = useState();
  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

  const { searchToken } = useContext(searchControlContext);

  const filteredData = myData.filter((item) =>
    searchToken
      ? item.productName?.toLowerCase().includes(searchToken?.toLowerCase())
      : true
  );

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3100/${tableType}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newArray = myData.filter((ele) => ele.id !== id);
          setMyData(newArray);
        } else {
          throw new Error(`Failed to delete ${tableType}`);
        }
      })
      .catch((error) => {
        console.error(`Error deleting ${tableType}:`, error);
      });
  };

  const handleChange = (event) => {
    setEditableProductData({
      ...editableProductData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveProduct = async (event, id) => {
    event.preventDefault();
    try {
      const updatedProduct = {
        ...editableProductData,
        productImage: `/public/${tableType}/${editableProductData.imageFile}`,
      };

      await axios.put(
        `http://localhost:3100/${tableType}/${id}`,
        updatedProduct
      );
      console.log(updatedProduct);
      setEditableRow(null); // Disable editing mode after saving
    } catch (error) {
      console.error(`Error updating ${tableType}:`, error);
    }
  };

  useEffect(() => {}, [searchToken]);
  useEffect(() => {
    getData();
  }, [editableRow]);

  return (
    <>
      <div className="container">
        <table className={`${style.paginationTable} table`}>
          <thead>
            <tr>
              {productsKeys.map((key) => (
                <th key={key}>{key}</th>
              ))}
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {searchToken
              ? filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {editableRow === index
                      ? productsKeys.slice(1).map((i) => (
                          <td key={i}>
                            <input value={item[i]} />
                          </td>
                        ))
                      : Object.values(item)
                          .slice(0, -1)
                          .map((i) => <td key={i}>{i}</td>)}
                    <td>
                      {editableRow === index ? (
                        <>
                          <a
                            className="mx-2"
                            href="#"
                            onClick={(event) => {
                              setEditableProductData(item);
                              handleSaveProduct(event, item.id);
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
                      {" "}
                      <a href="#" onClick={() => deleteProduct(item.id)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))
              : recordsData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {editableRow === index
                      ? productsKeys.slice(1).map((i) => (
                          <td key={i}>
                            <input value={item[i]} />
                          </td>
                        ))
                      : Object.values(item)
                          .slice(0, -1)
                          .map((i) => <td key={i}>{i}</td>)}
                    <td>
                      {editableRow === index ? (
                        <>
                          <a
                            className="mx-2"
                            href="#"
                            onClick={(event) => {
                              setEditableProductData(item);
                              handleSaveProduct(event, item.id);
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
                      {" "}
                      <a href="#" onClick={() => deleteProduct(item.id)}>
                        <i className="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                ))}
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
