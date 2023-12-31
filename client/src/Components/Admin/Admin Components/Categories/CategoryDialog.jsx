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
import CategorySchema from "../../../../Schemas/CategorySchema";

import useUploadImage from "../../../hooks/useUploadImage";
import { useRef, useState } from "react";
import { CircularProgress } from "@mui/material";

export default function CategoryDialog({ open, handleClose, handleSave }) {
  const { uploadImage, imageLinkUrl, isPending } = useUploadImage();
  const [imageLink, setImageLink] = useState(null);
  const fileInputRef = useRef(null);

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
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      handleAddCategory(values);
    },
  });

  const handleAddCategory = async (values) => {
    try {
      await axios.post(
        "http://localhost:5050/product-categories",
        {
          ...values,
          image: imageLinkUrl,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
      formik.resetForm();
      revalidator.revalidate();
      handleClose();
      toast.success("Added successfully");
      dispatch(setEditItem(null));
    } catch (error) {
      console.log(error);
      formik.resetForm();
    }
  };

  const handleUpload = (e) => {
    const selectedImage = e.target.files[0];
    formik.setFieldValue("image", selectedImage);
    uploadImage(e.target.files[0]);
    setImageLink(imageLinkUrl);
    revalidator.revalidate();
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
                placeholder="Product image"
                name="image"
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
              />
              {isPending ? <CircularProgress /> : ""}
              {imageLinkUrl ? (
                <img
                  src={imageLinkUrl}
                  alt="Product Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              ) : (
                <img
                  src={editItem.image}
                  alt="Product Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              )}

              {formik.errors.image && (
                <p className="text-danger text-start">{formik.errors.image}</p>
              )}

              <div className="ms-auto mt-2">
                <Button onClick={() => handleSave(editItem,imageLinkUrl)}>Save</Button>
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
              {formik.errors.categoryName ? (
                <p className="text-danger text-start">
                  {formik.errors.categoryName}
                </p>
              ) : (
                ""
              )}
              <Input
                className="mt-3"
                id="image"
                placeholder="Product image"
                name="image"
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
              />
              {isPending ? <CircularProgress /> : ""}
              {imageLinkUrl && (
                <img
                  src={imageLinkUrl}
                  alt="Product Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              )}
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
