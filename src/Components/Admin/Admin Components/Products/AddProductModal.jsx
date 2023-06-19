import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const defaultImage =
  "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-1024.png";

export default function AddProductModal() {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(defaultImage);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCost, setProductCost] = useState("");
  const [productImage, setProductImage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImagePreview(defaultImage); // Reset image preview to default
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    console.log(imagePreview);
  };

  const handleAddProduct = async () => {
    console.log("Selected File:", selectedFile);
    await fetch("http://localhost:3100/myData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productCategory,
        productCode,
        productPrice,
        productQuantity,
        productDescription,
        productCost,
        imagePreview
      }),
    });
    handleClose();
  };

  return (
    <>
      <div className="container mt-5">
        <TextField
          id="search"
          label="Search Product"
          type="text"
          variant="outlined"
          size="small"
          style={{ width: "700px", marginRight: "1rem" }}
        />
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new product
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the details of the product:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="productName"
                label="Product Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productCategory"
                label="Product Category"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductCategory(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productCode"
                label="Product Code"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductCode(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productPrice"
                label="Product Price"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productCost"
                label="Product Cost"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductCost(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productQuantity"
                label="Product Quantity"
                type="number"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductQuantity(e.target.value);
                }}
              />
              <TextField
                margin="dense"
                id="productDescription"
                label="Product Description"
                multiline
                rows={7}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
              />

              <label htmlFor="upload-image-input" className="mt-2">
                <Button variant="outlined" component="span">
                  Upload image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="upload-image-input"
                />
              </label>

              <div className="text-center">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  style={{ maxWidth: "50%", marginTop: "1rem" }}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddProduct}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}
