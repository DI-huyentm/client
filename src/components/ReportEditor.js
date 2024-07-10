import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  CssBaseline,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/ClearAll";
import SaveIcon from "@mui/icons-material/Save";
import { Link as RouterLink } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import BasicDateRangePicker from "./BasicDateRangePicker";

const ReportEditor = (props) => {
  const { fromDate, toDate, formData, setFormData, title } = props;
  const [isLoading, setIsLoading] = useState(false);

  const addReport = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/add-report`, formData);
      setIsLoading(false);
      window.location.href = "/reports";
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleChangeDescription = (newReport) => {
    handleFieldChange("description", newReport);
  };
  const handleChangeDate = (event) => {
    if (!event || event.length !== 2) return;
    handleFieldChange("startDate", event[0]?.unix());
    handleFieldChange("endDate", event[1]?.unix());
  };
  const handleClear = () => {
    handleChangeDescription("");
  };
  const handleSave = (e) => {
    addReport();
    e.preventDefault();
  };
  return (
    <Box px={3}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h2" component="div">
          {title}
        </Typography>
      </Box>
      <Box m={1} p={2} display="flex" justifyContent="center">
        <TextField
          id="outlined-controlled"
          label="Name"
          value={formData.name || ""}
          onChange={(e) => {
            handleFieldChange("name", e.target.value);
          }}
          style={{ width: "30%" }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        {fromDate && toDate && (
          <BasicDateRangePicker
            handleChangeDate={handleChangeDate}
            startDate={fromDate}
            endDate={toDate}
          />
        )}
      </Box>
      <CssBaseline />
      <MarkdownEditor
        description={formData.description}
        onChange={handleChangeDescription}
      />
      <Stack
        px={3}
        display="flex"
        justifyContent="end"
        direction="row"
        spacing={2}
      >
        <Button
          variant="outlined"
          startIcon={<RemoveIcon />}
          onClick={handleClear}
          disabled={isLoading}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          type="submit"
          endIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={isLoading}
        >
          Save
        </Button>
      </Stack>
    </Box>
  );
};

export default ReportEditor;
