import { useState } from "react";
import axios from "axios";

import { useEffect } from "react";
import TableControl from "./TableControl";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Input,
} from "@mui/material";

export default function PaginationTable({
  searchToken,
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

  const [productName, setProductName] = useState();
  const [productCode, setProductCode] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productCost, setProductCost] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productQuantity, setProductQuantity] = useState();
  const [productDescription, setProductDescription] = useState();
  const [imageFile, setImageFile] = useState();

  const filteredData = myData.filter((item) =>
    searchToken
      ? item.productName?.toLowerCase().includes(searchToken.toLowerCase())
      : true
  );

  const numberOfPages = Math.ceil(myData.length / recordsPerPage);
  const numOfAllPage = numberOfPages * recordsPerPage;

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
    const updatedProduct = {
      productName,
      productCode,
      productCategory,
      productImage: `/public/products/${imageFile}`,
      productCost,
      productPrice,
      productQuantity,
      productDescription,
    };
    const updateProductData = await fetch(
      `http://localhost:3100/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    console.log(updatedProduct);
    setEditableRow(null); // Disable editing mode after saving
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
                        <Input
                          type="text"
                          value={ele.productName}
                          onChange={(e) => {
                            setEditableProductData((prev) =>
                              console.log(editableProductData)
                            );
                          }}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={ele.productCode}
                          onChange={(e) => setProductCode(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={ele.productCategory}
                          onChange={(e) => setProductCategory(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="file"
                          onChange={(e) => setImageFile(e.target.files[0])}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          value={ele.productCost}
                          onChange={(e) => setProductCost(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          value={ele.productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="number"
                          value={ele.productQuantity}
                          onChange={(e) => setProductQuantity(e.target.value)}
                        />
                      </td>
                      <td>
                        <Input
                          type="text"
                          value={ele.productDescription}
                          onChange={(e) =>
                            setProductDescription(e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <a
                          className="mx-2 "
                          href="#"
                          onClick={(event) => handleSaveProduct(event, ele.id)}
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
