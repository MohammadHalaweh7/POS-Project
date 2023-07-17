import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import { useRevalidator, useRouteLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";
import ProductSchema from "../../../../Schemas/ProductSchema";

export default function ProductDialog({ open, handleClose, handleSave }) {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const unitsData = data[2].value.data;
  console.log({ categoriesData });
  const revalidator = useRevalidator();

  const dispatch = useDispatch();
  const editItem = useSelector((state) => state.editItem.item);

  const handleChange = (event) => {
    dispatch(
      setEditItem({
        ...editItem,
        [event.target.name]: event.target.value,
      })
    );
  };

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
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      handleAddProduct(values);
    },
  });

  const handleAddProduct = async (values) => {
    try {
      const product = await axios.post("http://localhost:5050/products", {
        ...values,
      });
      formik.resetForm();
      revalidator.revalidate();
      console.log({ product });
      handleClose();
      toast.success("Added successfully");
    } catch (error) {
      formik.resetForm();
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent className="d-flex flex-column">
          <DialogContentText>
            Please enter the details of the product:
          </DialogContentText>
          {editItem ? (
            <form className="d-flex flex-column">
              <Input
                className="mt-3"
                id="name"
                placeholder="Product Name"
                name="name"
                type="text"
                onChange={handleChange}
                value={editItem?.name || ""}
              />

              <Input
                className="mt-3"
                id="code"
                placeholder="Product Code"
                name="code"
                type="text"
                onChange={handleChange}
                value={editItem?.code || ""}
              />
              <Input
                className="mt-3"
                id="quantity"
                placeholder="Product Quantity"
                name="quantity"
                type="number"
                onChange={handleChange}
                value={editItem?.quantity || ""}
              />

              <Input
                className="mt-3"
                id="price"
                placeholder="Product Price"
                name="price"
                type="number"
                onChange={handleChange}
                value={editItem?.price || ""}
              />

              <FormControl fullWidth className="mt-3">
                <InputLabel id="categoryId">Category </InputLabel>
                <Select
                  labelId="categoryId"
                  id="categoryId"
                  label="Category"
                  name="categoryId"
                  value={editItem?.categoryId || ""}
                  onChange={handleChange}
                >
                  {categoriesData.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category.categoryId}>
                        {category.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth className="mt-3">
                <InputLabel id="unitId">Unit </InputLabel>
                <Select
                  labelId="unitId"
                  id="unitId"
                  label="Unit of measuer"
                  name="unitId"
                  value={editItem?.unitId || ""}
                  onChange={handleChange}
                >
                  {unitsData.map((unit, index) => {
                    return (
                      <MenuItem key={index} value={unit.unitId}>
                        {unit.unitName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <Input
                className="mt-3"
                id="image"
                placeholder="Product image - URL"
                name="image"
                type="text"
                onChange={handleChange}
                value={editItem?.image || ""}
              />
              <div className="ms-auto mt-2">
                <Button onClick={() => handleSave(editItem)}>Save</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
              <Input
                className="mt-3"
                id="name"
                placeholder="Product Name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <p className="text-danger text-start">{formik.errors.name}</p>
              )}
              <Input
                className="mt-3"
                id="code"
                placeholder="Product Code"
                name="code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {formik.errors.code && (
                <p className="text-danger text-start">{formik.errors.code}</p>
              )}
              <Input
                className="mt-3"
                id="quantity"
                placeholder="Product Quantity"
                name="quantity"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.errors.quantity && (
                <p className="text-danger text-start">
                  {formik.errors.quantity}
                </p>
              )}
              <Input
                className="mt-3"
                id="price"
                placeholder="Product Price"
                name="price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.errors.price && (
                <p className="text-danger text-start">{formik.errors.price}</p>
              )}
              <FormControl fullWidth>
                <InputLabel id="categoryId">Category </InputLabel>
                <Select
                  className="mt-3"
                  labelId="categoryId"
                  id="categoryId"
                  label="Category"
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={formik.handleChange}
                >
                  {categoriesData.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category.categoryId}>
                        {category.categoryName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.errors.categoryId && (
                <p className="text-danger text-start">
                  {formik.errors.categoryId}
                </p>
              )}

              <FormControl fullWidth>
                <InputLabel id="unitId">Unit </InputLabel>
                <Select
                  className="mt-3"
                  labelId="unitId"
                  id="unitId"
                  label="Unit of measuer"
                  name="unitId"
                  value={formik.values.unitId}
                  onChange={formik.handleChange}
                >
                  {unitsData.map((unit, index) => {
                    return (
                      <MenuItem key={index} value={unit.unitId}>
                        {unit.unitName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {formik.errors.unitId && (
                <p className="text-danger text-start">{formik.errors.unitId}</p>
              )}
              <Input
                className="mt-3"
                id="image"
                placeholder="Product image"
                name="image"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.image}
              />
              {formik.errors.image && (
                <p className="text-danger text-start">{formik.errors.image}</p>
              )}
              <div className="ms-auto mt-2">
                <Button type="submit">Add</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
