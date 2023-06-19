import React, { useState } from "react";
import { useEffect } from "react";
export default function PaginationTable() {
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numbers = Array.from(Array(numberOfPages + 1).keys()).slice(1);
  const recordsData = myData.slice(firstIndex, lastIndex);

  const firstItemOfPage = recordsPerPage * currentPage - recordsPerPage + 1;
  const lastItemOfPage = recordsPerPage * currentPage;
  const numOfAllPage = numberOfPages * recordsPerPage;

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  function handleChangePageNumber(e) {
    if (e.target.value > numberOfPages || e.target.value < 1) return;
    setCurrentPage(+e.target.value);
  }

  function handleNumberOfItemsPerPage(e) {
    setRecordsPerPage(e.target.value);
    console.log(e.target.value);
  }
  function deleteProduct(id) {
    fetch(`http://localhost:3100/products/${id}`, {
      method: "DELETE",
    });
    const newArray = myData.filter((ele) => {
      return ele.id !== id;
    });
    setMyData(newArray);
  }

  function getData() {
    fetch("http://localhost:3100/products")
      .then((response) => response.json())
      .then((data) => {
        setMyData(data);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className=" d-flex justify-content-end mb-5">
          <input
            style={{ width: "20px", textAlign: "center" }}
            type="text"
            value={currentPage}
            onChange={handleChangePageNumber}
          />
          <span>/ {numberOfPages}</span>
        </div>

        <table className="table">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Code</th>
            <th>Category</th>
            <th>Image</th>
            <th>Cost</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Update</th>
            <th>Delete</th>
          </thead>

          <tbody>
            {recordsData.map((ele, index) => (
              <tr key={index}>
                <td>{ele.id}</td>
                <td>{ele.productName}</td>
                <td>{ele.productCode}</td>
                <td>{ele.productCategory}</td>
                <td>
                  {
                    <img
                      style={{
                        width: "100px",
                        height: "120px",
                        borderRadius: "10%",
                      }}
                      src={ele.imagePreview}
                      alt={ele.productName}
                    />
                  }
                </td>
                <td>{ele.productCost}</td>
                <td>{ele.productPrice}$</td>
                <td>{ele.productQuantity}</td>
                <td>{ele.productDescription}</td>
                <td>
                  <a href="#">
                    <i className="fas fa-edit"></i>
                  </a>
                </td>
                <td>
                  <a href="#" onClick={() => deleteProduct(ele.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prevPage}>
                Prev
              </a>
            </li>
            {numbers.map((num, index) => (
              <li
                className={`page-item ${currentPage === num ? "active" : ""}`}
                key={index}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={() => changeCurrentPage(num)}
                >
                  {num}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>

        <div>{`${firstItemOfPage}-${lastItemOfPage}of${numOfAllPage}`}</div>
        <div>
          <select
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
    </>
  );
}
