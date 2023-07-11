import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useFormik } from "formik";
import { useRevalidator } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export default function AddCategoryModal() {
  const revalidator = useRevalidator();

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
  };

  const handleAddProduct = async (values) => {
    try {
      await axios.post("http://localhost:5050/product-categories", values, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("accessToken")
          )}`,
        },
      });
      revalidator.revalidate();
      handleClose();
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new Category
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Category</DialogTitle>
            <DialogContent className="d-flex flex-column">
              <DialogContentText>
                Please enter the details of the category:
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
