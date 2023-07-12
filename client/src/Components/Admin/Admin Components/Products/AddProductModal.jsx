import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";

export default function AddProductModal() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const productsData = data[1].value.data;
  const unitsData = data[2].value.data;

  const revalidator = useRevalidator();

  const [open, setOpen] = useState(false);
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
  };

  const handleAddProduct = async (values) => {
    console.log({ values });
    const product = await axios.post("http://localhost:5050/products", {
      ...values,
    });
    revalidator.revalidate();
    console.log({ product });
    handleClose();
    toast.success("Added successfully");
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

                <FormControl fullWidth>
                  <InputLabel id="categoryId">Category </InputLabel>
                  <Select
                    labelId="categoryId"
                    id="categoryId"
                    label="Category"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                  >
                    {categoriesData.map((category) => {
                      return (
                        <MenuItem value={category.categoryId}>
                          {category.categoryName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="unitId">Unit </InputLabel>
                  <Select
                    labelId="unitId"
                    id="unitId"
                    label="Unit of measuer"
                    name="unitId"
                    value={formik.values.unitId}
                    onChange={formik.handleChange}
                  >
                    {unitsData.map((unit) => {
                      return (
                        <MenuItem value={unit.unitId}>{unit.unitName}</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                <Input
                  className="mt-3"
                  id="image"
                  placeholder="Product image"
                  name="image"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.image}
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
