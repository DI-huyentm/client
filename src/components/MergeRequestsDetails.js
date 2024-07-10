import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
// import { GridContainer } from "./DefectVisualization";

const columns = [
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "author",
    headerName: "Author",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "service_type",
    headerName: "Service Type",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "create_date",
    headerName: "Create Date",
    flex: 0.8,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "resolve_date",
    headerName: "Resolve Date",
    flex: 0.8,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "defect_severity",
    headerName: "Defect Severity",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "detected_by",
    headerName: "Detected By",
    flex: 1,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "detail",
    headerName: "Discussion Details",
    flex: 4,
    headerClassName: "super-app-theme--header",
  },
];

function MergeRequestsDetails() {
  const [mergeRequests, setMergeRequests] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/merge_requests`)
      .then((response) => setMergeRequests(response.data))
      .catch((error) =>
        console.error("Error fetching merge request data:", error)
      );
  }, []);

  return (
    <Grid
      container
      style={{ justifyContent: "center", backgroundColor: "#E9F1FA" }}
    >
      <Grid
        item
        xs={10}
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#1b4d89",
            color: "white",
            fontWeight: "bold !important",
          },
        }}
      >
        <DataGrid
          rows={mergeRequests}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          rowHeight={50}
          sx={{ backgroundColor: "white" }}
        />
      </Grid>
    </Grid>
  );
}

export default MergeRequestsDetails;
