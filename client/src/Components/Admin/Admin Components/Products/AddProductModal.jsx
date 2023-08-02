import Button from "@mui/material/Button";
import ProductDialog from "./ProductDialog"
export default function AddProductModal({open ,handleClickOpen ,handleClose,handleSave}) {


  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen} className="buttonMode">
            Add New Products
          </Button>

          <ProductDialog open={open} handleClose={handleClose} handleSave={handleSave}/>
        </div>
      </div>
    </>
  );
}
