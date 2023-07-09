import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useRevalidator } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

const defaultImage =
  "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-1024.png";

export default function AddProductModal() {
  const revalidator = useRevalidator();

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      quantity: "",
      image: "",
      price: "",
      categoryId: "",
      unitId: "",
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
    console.log("9999999999999999999999999999")
    console.log(values);
    console.log("Selected File:", selectedFile);
    await axios.post("http://localhost:5050/products", {
      ...values,
      image: `/public/products/${selectedFile.name}`,
    });
    revalidator.revalidate();
    handleClose();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add New Products
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
                  id="name"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <Input
                  className="mt-3"
                  id="code"
                  placeholder="Product Code"
                  name="code"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                />
                <Input
                  className="mt-3"
                  id="quantity"
                  placeholder="Product Quantity"
                  name="quantity"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.quantity}
                />

                <Input
                  className="mt-3"
                  id="price"
                  placeholder="Product Price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                />
                <Input
                  className="mt-3"
                  id="categoryId"
                  placeholder="Product Category"
                  name="categoryId"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.categoryId}
                />
                <Input
                  className="mt-3"
                  id="unitId"
                  placeholder="Product unit"
                  name="unitId"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.unitId}
                />

                <label htmlFor="upload-image-input" className="mt-2">
                  <Button variant="outlined" component="span">
                    Upload image
                  </Button>
                  <input
                    className="m-auto m-5 d-none"
                    id="upload-image-input"
                    type="file"
                    name="image"
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
