import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import { useFormik } from "formik";
import { useRevalidator } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";

export default function CategoryDialog({ open, handleClose, handleSave }) {
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
      categoryName: "",
      image: "",
    },
    onSubmit: (values) => {
      handleAddProduct(values);
    },
  });

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
      dispatch(setEditItem(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent className="d-flex flex-column">
          <DialogContentText>
            Please enter the details of the category:
          </DialogContentText>
          {editItem ? (
            <form className="d-flex flex-column">
              <Input
                className="mt-3"
                placeholder="Category Name"
                name="categoryName"
                type="text"
                onChange={handleChange}
                value={editItem?.categoryName || ""}
              />
              <Input
                className="mt-3"
                id="image"
                placeholder="Category image - URL"
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
                placeholder="Category Name"
                name="categoryName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.categoryName}
              />
              <Input
                className="mt-3"
                id="image"
                placeholder="Category image"
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
