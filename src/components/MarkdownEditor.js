import React from "react";
import { Box, TextField } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownEditor = ({ description, onChange }) => {
  const handleMarkdownChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Box gap={1} p={3} display="flex" flexDirection="row">
      <Box flex={1} bgcolor="white">
        <TextField
          label="Report"
          variant="outlined"
          rows={20}
          multiline
          fullWidth
          value={description || ""}
          onChange={handleMarkdownChange}
        />
      </Box>
      <Box
        flex={1}
        padding={2}
        bgcolor="#f7f7f7"
        border="1px solid #ccc"
        borderRadius={1}
        boxShadow={2}
        overflow="auto"
        maxHeight="inherit"
        height={492}
      >
        <ReactMarkdown>{description}</ReactMarkdown>
      </Box>
    </Box>
  );
};

export default MarkdownEditor;
