import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEditItem } from "../../../../redux/features/editItem/editItemSlice";
import Button from "@mui/material/Button";
import UnitsSchema from "../../../../Schemas/UnitsSchema";

export default function UnitDialog({ open, handleClose, handleSave }) {
  const revalidator = useRevalidator();

  const dispatch = useDispatch();
  const editItem = useSelector((state) => state.editItem.item);

  const formik = useFormik({
    initialValues: {
      unitName: "",
      baseUnit: "",
      conversionFactor: "",
    },
    validationSchema: UnitsSchema,
    onSubmit: (values) => {
      handleAddProduct(values);
    },
  });

  const handleChange = (event) => {
    dispatch(
      setEditItem({
        ...editItem,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleAddProduct = async (values) => {
    try {
      await axios.post("http://localhost:5050/unit-of-measure", values);
      formik.resetForm();
      revalidator.revalidate();
      handleClose();
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
      formik.resetForm();
    }
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Units</DialogTitle>
        <DialogContent className="d-flex flex-column">
          <DialogContentText>
            Please enter the details of the unit:
          </DialogContentText>
          {editItem ? (
            <form className="d-flex flex-column">
              <Input
                className="mt-3"
                placeholder="Unit Name"
                name="unitName"
                type="text"
                onChange={handleChange}
                value={editItem?.unitName || ""}
              />

              <Input
                className="mt-3"
                placeholder="Unit Base"
                name="baseUnit"
                type="text"
                onChange={handleChange}
                value={editItem?.baseUnit || ""}
              />

              <Input
                className="mt-3"
                placeholder="Unit Conversion Factor"
                name="conversionFactor"
                type="number"
                onChange={handleChange}
                value={editItem?.conversionFactor || ""}
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
                placeholder="Unit Name"
                name="unitName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.unitName}
              />
              {formik.errors.unitName && (
                <p className="text-danger text-start">
                  {formik.errors.unitName}
                </p>
              )}

              <Input
                className="mt-3"
                placeholder="Unit Base"
                name="baseUnit"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.baseUnit}
              />
              {formik.errors.baseUnit && (
                <p className="text-danger text-start">
                  {formik.errors.baseUnit}
                </p>
              )}

              <Input
                className="mt-3"
                placeholder="Unit Conversion Factor"
                name="conversionFactor"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.conversionFactor}
              />
              {formik.errors.conversionFactor && (
                <p className="text-danger text-start">
                  {formik.errors.conversionFactor}
                </p>
              )}

              <div className="ms-auto mt-2">
                <Button type="submit">{!editItem && "Add"}</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
