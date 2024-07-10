import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CustomDialog from "./CustomDialog";
import CustomIconButton from "./CustomIconButton";
import { Button } from "@mui/material";

const DeleteReport = ({ id, name, icon }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await axios.put(`${process.env.REACT_APP_API_URL}/reports/${id}/delete`);
      setIsLoading(false);
      setOpen(false);
      icon ? window.location.reload() : (window.location.href = "/reports");
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      {icon ? (
        <CustomIconButton
          onClick={() => setOpen(true)}
          label="Delete"
          icon={<DeleteIcon />}
        />
      ) : (
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      )}
      <CustomDialog
        title="Delete report"
        content={`Are you sure you want to delete report [${name}]? This action is irreversible'`}
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default DeleteReport;
