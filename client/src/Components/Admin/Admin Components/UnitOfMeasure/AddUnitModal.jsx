import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import axios from "axios";
import { useRevalidator } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function AddUnitModal() {
  const revalidator = useRevalidator();

  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      unitName: "",
      baseUnit: "",
      conversionFactor: "",
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
    await axios.post("http://localhost:5050/unit-of-measure", values);
    revalidator.revalidate();
    handleClose();
    toast.success("Added successfully");
  };

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen}>
            Add new Unit
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Units</DialogTitle>
            <DialogContent className="d-flex flex-column">
              <DialogContentText>
                Please enter the details of the unit:
              </DialogContentText>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column"
              >
                <Input
                  className="mt-3"
                  placeholder="Unit Name"
                  name="unitName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.unitName}
                />

                <Input
                  className="mt-3"
                  placeholder="Unit Base"
                  name="baseUnit"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.baseUnit}
                />

                <Input
                  className="mt-3"
                  placeholder="Unit Conversion Factor"
                  name="conversionFactor"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.conversionFactor}
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
