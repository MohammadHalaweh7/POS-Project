import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";

import { useFormik } from "formik";
const defaultImage =
  "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-1024.png";

export default function AddProductModal({title,getProductsData}) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const formik = useFormik({
    initialValues: {
      productName: "",
      productCategory: "",
      productCode: "",
      productCost: "",
      productPrice: "",
      productQuantity: "",
      productDescription: "",
      imagePreview: "",
    },
    onSubmit: (values) => {
      handleAddProduct(values);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImagePreview(defaultImage);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(imagePreview);
  };

  const handleAddProduct = async (values) => {
    console.log(values);
    console.log("Selected File:", selectedFile);
    await fetch("http://localhost:3100/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        productImage: `/public/products/${selectedFile.name}`,
      }),
    });
    handleClose();
    getProductsData();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            {title}
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent className="d-flex flex-column">
              <DialogContentText>
                Please enter the details of the product:
              </DialogContentText>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column"
              >
                <Input
                  className="mt-3"
                  id="productName"
                  placeholder="Product Name"
                  name="productName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.productName}
                />
                <Input
                  className="mt-3"
                  id="productCategory"
                  placeholder="Product Category"
                  name="productCategory"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.productCategory}
                />
                <Input
                  className="mt-3"
                  id="productCode"
                  placeholder="Product Code"
                  name="productCode"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.productCode}
                />
                <Input
                  className="mt-3"
                  id="productPrice"
                  placeholder="Product Price"
                  name="productPrice"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.productPrice}
                />

                <Input
                  className="mt-3"
                  id="productQuantity"
                  placeholder="Product Quantity"
                  name="productQuantity"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.productQuantity}
                />

                <Input
                  className="mt-3"
                  id="productCost"
                  placeholder="Product Cost"
                  name="productCost"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.productCost}
                />
                <Input
                  className="mt-3"
                  id="productDescription"
                  placeholder="Product Description"
                  name="productDescription"
                  type="text"
                  multiline
                  rows={4}
                  onChange={formik.handleChange}
                  value={formik.values.productDescription}
                />
                <label htmlFor="upload-image-input" className="mt-2">
                  <Button variant="outlined" component="span">
                    Upload image
                  </Button>
                  <input
                    className="m-auto m-5 d-none"
                    id="upload-image-input"
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="text-center">
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    style={{ maxWidth: "50%", marginTop: "1rem" }}
                  />
                </div>

                <div className="ms-auto mt-2">
                  <Button type="submit">Add</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
