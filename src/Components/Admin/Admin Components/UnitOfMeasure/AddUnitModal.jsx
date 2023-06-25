import { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Input from "@mui/material/Input"

import { useFormik } from "formik"

export default function AddUnitModal({ getUnitsData }) {
  const [open, setOpen] = useState(false)
  const formik = useFormik({
    initialValues: {
      unitName: "",
    },
    onSubmit: (values) => {
      handleAddProduct(values)
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    getUnitsData()
  }

  const handleAddProduct = async (values) => {
    console.log(values)
    await fetch("http://localhost:3100/units", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
      }),
    })
    handleClose()
  }

  return (
    <>
      <div className='container mt-5'>
        <div className='float-end mb-5'>
          <Button variant='outlined' onClick={handleClickOpen}>
            Add new Unit
          </Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Product</DialogTitle>
            <DialogContent className='d-flex flex-column'>
              <DialogContentText>
                Please enter the details of the product:
              </DialogContentText>
              <form
                onSubmit={formik.handleSubmit}
                className='d-flex flex-column'
              >
                <Input
                  className='mt-3'
                  placeholder='Unit Name'
                  name='unitName'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.unitName}
                />

                <div className='ms-auto mt-2'>
                  <Button type='submit'>Add</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  )
}
