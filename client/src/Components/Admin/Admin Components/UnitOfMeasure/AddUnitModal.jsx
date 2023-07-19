import Button from "@mui/material/Button";

import UnitDialog from "./UnitDialog";

export default function AddUnitModal({open ,handleClickOpen ,handleClose,handleSave}) {

  return (
    <>
      <div className="container mt-5">
        <div className="float-end mb-5">
          <Button variant="outlined" onClick={handleClickOpen} className="buttonMode">
            Add new Unit
          </Button>

        <UnitDialog open={open} handleClose={handleClose} handleSave={handleSave}/>
        </div>
      </div>
    </>
  );
}
