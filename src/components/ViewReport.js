import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import DeleteReport from "./DeleteReport";

const ViewReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState({});
  React.useEffect(() => {
    if (!id || report?.id) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/reports/${id}`)
      .then((response) => setReport(response?.data));
  }, [id, report]);
  return (
    <>
      <Box px={3}>
        <Box display="flex" justifyContent="center" p={2}>
          <Typography variant="h3" component="div">
            {report?.name}
          </Typography>
        </Box>
        <Box>
          Period: {new Date(report?.start_date).toLocaleDateString()} -{" "}
          {new Date(report?.end_date).toLocaleDateString()}
        </Box>
        <Box
          p={2}
          my={2}
          bgcolor="#f7f7f7"
          border="1px solid #ccc"
          borderRadius={1}
          boxShadow={2}
          overflow="auto"
          maxHeight="600px"
          textOverflow="auto"
        >
          <ReactMarkdown>{report?.description}</ReactMarkdown>
        </Box>
        <Stack
          px={3}
          display="flex"
          justifyContent="end"
          direction="row"
          spacing={2}
        >
          <DeleteReport id={id} name={report?.name} />
          <Button
            variant="contained"
            endIcon={<EditIcon />}
            onClick={() =>
              (window.location.href = `/reports/${id}/update`)
            }
          >
            Edit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default ViewReport;
