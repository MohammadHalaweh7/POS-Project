import Button from "@mui/material/Button";

import CategoryDialog from "./CategoryDialog";

export default function AddCategoryModal({open ,handleClickOpen ,handleClose,handleSave}) {


  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen} className="buttonMode">
            Add new Category
          </Button>
          <CategoryDialog open={open} handleClose={handleClose} handleSave={handleSave}/>
        </div>
      </div>
    </>
  );
}
