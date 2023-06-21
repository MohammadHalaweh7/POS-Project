import { useState, useContext } from "react";
import axios from "axios";

import { useEffect } from "react";
import TableControl from "./TableControl";
import { searchControlContext } from "./../../../../App.js"

export default function PaginationTable({
  // searchToken,
  getProductsData,
  myData,
  setMyData,
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

  const [productName, setProductName] = useState(myData.productName);
  const [productCode, setProductCode] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productCost, setProductCost] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productDescription, setProductDescription] = useState();
  const [imageFile, setImageFile] = useState();
  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

  const {searchToken} = useContext(searchControlContext);

  const filteredData = myData.filter((item) =>
    searchToken
      ? item.productName?.toLowerCase().includes(searchToken?.toLowerCase())
      : true
  );

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3100/products/${id}`)
      .then((response) => {
        if (response.status === 200) {
          const newArray = myData.filter((ele) => ele.id !== id);
          setMyData(newArray);
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const handleSaveProduct = async (event, id) => {
    try {
      const updatedProduct = {
        productName: productName,
        productCode: productCode,
        productCategory: productCategory,
        productImage: `/public/products/${imageFile}`,
        productCost: productCost,
        productPrice: productPrice,
        productQuantity: productQuantity,
        productDescription: productDescription,
      };

      await axios.put(`http://localhost:3100/products/${id}`, updatedProduct);
      console.log(updatedProduct);
      setEditableRow(null); // Disable editing mode after saving
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {}, [searchToken]);

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
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
            </tr>
          </thead>
          <tbody>
            {searchToken
              ? filteredData.map((ele, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.productName}</td>
                    <td>{ele.productCode}</td>
                    <td>{ele.productCategory}</td>
                    <td>
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "10%",
                        }}
                        src={ele.imagePreview}
                        alt={ele.productName}
                      />
                    </td>
                    <td>{ele.productCost}</td>
                    <td>{ele.productPrice}$</td>
                    <td>{ele.productQuantity}</td>
                    <td>{ele.productDescription}</td>
                    <td>
                      {editableRow === index ? (
                        <>
                          <a
                            className="mx-2"
                            href="#"
                            onClick={(event) => {
                              setEditableProductData(ele);
                              handleSaveProduct(event, ele.id);
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
                      <a href="#" onClick={() => deleteProduct(ele.id)}>
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
                          value={productName}
                          onChange={(e) => {
                            setProductName(e.target.value);
                          }}
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "75px" }}
                          type="text"
                          value={productCode}
                          onChange={(e) => setProductCode(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          style={{ width: "75px" }}
                          type="text"
                          value={productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="file"
                          onChange={(e) => setImageFile(e.target.files[0])}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={productCost}
                          onChange={(e) => setProductCost(e.target.value)}
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={productQuantity}
                          onChange={(e) => setProductQuantity(e.target.value)}
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                          style={{ width: "75px" }}
                        />
                      </td>
                      <td>
                        <a
                          className="mx-2 "
                          href="#"
                          onClick={(event) => {
                            setEditableProductData(ele);
                            handleSaveProduct(event, ele.id);
                          }}
                        >
                          <i className="fas fa-save"></i>
                        </a>
                        <a href="#" onClick={() => setEditableRow(null)}>
                          <i className="fas fa-times"></i>
                        </a>
                      </td>
                      <td>
                        <a href="#" onClick={() => deleteProduct(ele.id)}>
                          <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ele.productName}</td>
                      <td>{ele.productCode}</td>
                      <td>{ele.productCategory}</td>
                      <td>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10%",
                          }}
                          src={ele.imagePreview}
                          alt={ele.productName}
                        />
                      </td>
                      <td>{ele.productCost}</td>
                      <td>{ele.productPrice}$</td>
                      <td>{ele.productQuantity}</td>
                      <td>{ele.productDescription}</td>
                      <td>
                        <a
                          href="#"
                          onClick={() => setEditableRow(index)} // Set current row as editable
                        >
                          <i className="fas fa-edit"></i>
                        </a>
                      </td>
                      <td>
                        <a href="#" onClick={() => deleteProduct(ele.id)}>
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
