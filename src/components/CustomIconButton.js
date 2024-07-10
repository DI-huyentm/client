import React from "react";
import { IconButton } from "@mui/material";

const CustomIconButton = (props) => {
  const { label, icon } = props;
  return (
    <IconButton aria-label={label} {...props}>
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
