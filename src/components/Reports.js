import React, { useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import CustomIconButton from "./CustomIconButton";
import DeleteReport from "./DeleteReport";
import "../css/styles.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 2.5,
    headerClassName: "super-app-theme--header",
  },
  {
    field: "created_at",
    headerName: "Created At",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => new Date(params.row.created_at).toLocaleString(),
  },
  {
    field: "period",
    headerName: "Period",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => {
      return `${new Date(
        params.row.start_date
      ).toLocaleDateString()} - ${new Date(
        params.row.end_date
      ).toLocaleDateString()}`;
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    headerClassName: "super-app-theme--header",
    flex: 1,
    renderCell: (params) => (
      <>
        <CustomIconButton
          onClick={() => (window.location.href = `/reports/${params.row.id}`)}
          label="View"
          icon={<VisibilityIcon />}
        />
        <CustomIconButton
          onClick={() =>
            (window.location.href = `/reports/${params.row.id}/update`)
          }
          label="Edit"
          icon={<EditIcon />}
        />
        <DeleteReport id={params.row.id} name={params.row.name} icon />
      </>
    ),
  },
];

const Reports = () => {
  const [reports, setReports] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/reports`)
      .then((response) => setReports(response?.data?.data))
      .catch((error) =>
        console.error("Error fetching merge request data:", error)
      );
    setIsLoading(false);
  }, [isLoading]);
  return (
    <>
      <Box
        px={3}
        sx={{
          "& .super-app-theme--header": {
            backgroundColor: "#1b4d89",
            color: "white",
            fontWeight: "bold !important",
          },
        }}
      >
        <Grid container>
          <Grid item xs={4}></Grid>
          <Grid item xs={4} display="flex" justifyContent="center" p={2}>
            <Typography variant="h2" component="div">
              Reports
            </Typography>
          </Grid>
          <Grid item xs={4} display="flex" justifyContent="end">
            <CustomIconButton
              icon={<AddCircleIcon fontSize="large" />}
              onClick={() => (window.location.href = `/add-report`)}
            />
          </Grid>
        </Grid>
        <DataGrid
          rows={reports}
          columns={columns}
          rowHeight={100}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          headerClassName="custom-header"
          sx={{ backgroundColor: "white" }}
        />
      </Box>
    </>
  );
};

export default Reports;
