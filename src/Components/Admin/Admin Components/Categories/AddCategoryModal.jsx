import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";

import { useFormik } from "formik";

export default function AddCategoryModal({ getData }) {
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      categoryName: "",
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
    getData();
  };

  const handleAddProduct = async (values) => {
    console.log(values);
    await fetch("http://localhost:3100/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    });
    handleClose();
  };

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new Category
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
                  placeholder="Category Name"
                  name="categoryName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.categoryName}
                />

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
