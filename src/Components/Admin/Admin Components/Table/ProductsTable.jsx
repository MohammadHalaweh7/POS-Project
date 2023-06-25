import { useState, useContext, useEffect } from "react";
import axios from "axios";
import TableControl from "./TableControl";
import { searchControlContext } from "./../../../../App.js";
import style from './Table.module.css'

export default function ProductsTable({
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
        productImage: `/public/products/${editableProductData.imageFile}`,
      };

      await axios.put(`http://localhost:3100/products/${id}`, updatedProduct);
      console.log(updatedProduct);
      setEditableRow(null); // Disable editing mode after saving
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  useEffect(() => {}, [searchToken]);
  useEffect(() => {
    getProductsData()
  }, [editableRow]);

  return (
    <>
      <div className="container">
        <table className={`${style.paginationTable} table`}>
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
          <tbody >
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
                    <tr key={index} >
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          name="productName"
                          value={editableProductData.productName}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="productCode"
                          value={editableProductData.productCode}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input

                          type="text"
                          name="productCategory"
                          value={editableProductData.productCategory}
                          onChange={handleChange}
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
                          name="productCost"
                          value={editableProductData.productCost}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="productPrice"
                          value={editableProductData.productPrice}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="productQuantity"
                          value={editableProductData.productQuantity}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="productDescription"
                          name="productDescription"
                          value={editableProductData.productDescription}
                          onChange={handleChange}
                        />
                      </td>
                      <td>
                        <a
                          className="mx-2 "
                          href="#"
                          onClick={(event) => {
                            getProductsData();
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
                          onClick={() => {
                            setEditableRow(index);
                            setEditableProductData({ ...ele });
                          }}
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
