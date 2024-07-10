import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Grid } from "@mui/material";
import { fetchData, fetchGeneralInfo } from "../utils/requests";
import { Category } from "../utils/constants";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

Chart.register(...registerables);

const GridItem = styled(Grid)({
  border: "1px",
  borderRadius: 10,
  padding: "4px ! important",
  // boxShadow: "0 3px 3px 3px #E6E6E6",
  backgroundColor: "#f7f7f7",
  margin: 8,
  // color: "#f7f7f7",
});

export const GridContainer = styled(Grid)({
  justifyContent: "center",
  display: "flex",
  margin: 4,
  marginRight: 0,
  width: "inherit",
});

const Information = {
  services: "Services",
  defects: "Defects",
  loc: "Committed Lines of Code",
  dden: "Defect Density",
  mrs: "Merge Requests",
};

const DefectTypeLabel = [
  "CD::Code Readability Problem",
  "CD::Conformance Problem",
  "CD::Data Error Problem",
  "CD::Error Handling Problem",
  "CD::Inconsistent Requirements",
  "CD::Interface Problem",
  "CD::Logical Problem",
  "CD::Memory Problem",
  "CD::Performance Problem",
  "CD::Resuability Problem",
];

const DefectSeverityLabel = ["DS::Critical", "DS::Major", "DS::Minor"];

function DefectVisualization() {
  const [defectDataTrending, setDefectDataTrending] = useState([]);
  const [defectDataDefectType, setDefectDataDefectType] = useState([]);
  const [defectDataDefectSeverity, setDefectDataDefectSeverity] = useState([]);
  const [defectDataAuthor, setDefectDataAuthor] = useState([]);
  const [defectDataDetectedBy, setDefectDataDetectedBy] = useState([]);
  const [defectDataService, setDefectDataService] = useState([]);
  const [interval, setInterval] = useState("Month");
  const [timeOptions, setTimeOptions] = useState([]);
  const [time, setTime] = useState("2023-01");
  const lineChartContainer = useRef(null);
  const barChartContainerDefectType = useRef(null);
  const barChartContainerDefectSeverity = useRef(null);
  const barChartContainerAuthor = useRef(null);
  const barChartContainerDetectedBy = useRef(null);
  const barChartContainerService = useRef(null);
  const [generalInfo, setGeneralInfo] = useState({});
  const [lineChartInstance, setLineChartInstance] = useState(null);
  const [barChartInstanceDefectType, setBarChartInstanceDefectType] =
    useState(null);
  const [barChartInstanceDefectSeverity, setBarChartInstanceDefectSeverity] =
    useState(null);
  const [barChartInstanceAuthor, setBarChartInstanceAuthor] = useState(null);
  const [barChartInstanceDetectedBy, setBarChartInstanceDetectedBy] =
    useState(null);
  const [barChartInstanceService, setBarChartInstanceService] = useState(null);

  useEffect(() => {
    fetchGeneralInfo().then((data) => {
      setGeneralInfo(data);
    });
  }, []);

  useEffect(() => {
    Object.keys(Category).forEach((category) => {
      const hdata = fetchData(interval, Category[category]);
      hdata.then((data) => {
        switch (category) {
          case "Trending":
            setDefectDataTrending(data);
            const timeOptions = data.map((item) => item.interval);
            setTimeOptions(timeOptions);
            if (interval === "Month" && timeOptions.includes("2023-03")) {
              setTime("2023-03");
            } else setTime(timeOptions[0]);
            break;
          case "DefectType":
            setDefectDataDefectType(data);
            break;
          case "DefectSeverity":
            setDefectDataDefectSeverity(data);
            break;
          case "Author":
            setDefectDataAuthor(data);
            break;
          case "DetectedBy":
            setDefectDataDetectedBy(data);
            break;
          case "Service":
            setDefectDataService(data);
            break;
          default:
            console.error("Invalid category:", category);
        }
      });
    });
  }, [interval]);

  useEffect(() => {
    if (lineChartContainer?.current) {
      if (lineChartInstance) {
        lineChartInstance.destroy();
      }

      if (defectDataTrending) {
        const sortedData = defectDataTrending.sort(
          (a, b) => a.interval - b.interval
        ); // Sort data based on 'interval' field
        const labels = sortedData.map((item) => item.interval);
        const data = sortedData.map((item) => item.count);
        setLineChartInstance(
          new Chart(lineChartContainer.current, {
            type: "line",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Total Defects",
                  data: data,
                  fill: false,
                  borderColor: "#5977d3",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Total Defects",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true, // Start the y-axis from 0
                },
              },
            },
          })
        );
      }
    }

    if (barChartContainerDefectType?.current) {
      if (barChartInstanceDefectType) {
        barChartInstanceDefectType.destroy();
      }

      if (defectDataDefectType) {
        if (!Array.isArray(defectDataDefectType)) {
          console.error("defectData is not an array", defectDataDefectType);
          setDefectDataDefectType([]);
        }
        const dataTimeFilter = defectDataDefectType.filter(
          (item) => item.interval === time
        );
        const groupedData = dataTimeFilter.reduce((accumulator, item) => {
          const key = item.category;
          if (!accumulator[key]) {
            accumulator[key] = 0;
          }
          accumulator[key] += item.count;
          return accumulator;
        }, {});

        const labels = DefectTypeLabel;
        const data = Object.values(groupedData);

        const newBarChartInstance = new Chart(
          barChartContainerDefectType.current,
          {
            type: "radar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Defect Type",
                  data: data,
                  backgroundColor: "rgba(255, 99, 132, 0.2)",
                  borderColor: "rgb(255, 99, 132)",
                  pointBackgroundColor: "rgb(255, 99, 132)",
                  pointBorderColor: "#fff",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgb(255, 99, 132)",
                },
              ],
            },
            options: {
              responsive: true,
              aspectRatio: 2,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Defect Type",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  display: false,
                },
              },
            },
          }
        );

        setBarChartInstanceDefectType(newBarChartInstance);
      }
    }

    if (barChartContainerDefectSeverity?.current) {
      if (barChartInstanceDefectSeverity) {
        barChartInstanceDefectSeverity.destroy();
      }

      if (defectDataDefectSeverity) {
        if (!Array.isArray(defectDataDefectSeverity)) {
          console.error("defectData is not an array", defectDataDefectSeverity);
          setDefectDataDefectSeverity([]);
        }
        const dataTimeFilter = defectDataDefectSeverity.filter(
          (item) => item.interval === time
        );
        const groupedData = dataTimeFilter.reduce((accumulator, item) => {
          const key = item.category;
          if (!accumulator[key]) {
            accumulator[key] = 0;
          }
          accumulator[key] += item.count;
          return accumulator;
        }, {});
        const data = DefectSeverityLabel.map((element) => {
          return groupedData?.[element] || 0;
        });

        const newBarChartInstance = new Chart(
          barChartContainerDefectSeverity.current,
          {
            type: "pie",
            data: {
              labels: DefectSeverityLabel,
              datasets: [
                {
                  label: "Defect Severity",
                  data: data,
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              aspectRatio: 2,
              plugins: {
                title: {
                  display: true,
                  text: "Defect Severity",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  display: false,
                },
              },
            },
          }
        );

        setBarChartInstanceDefectSeverity(newBarChartInstance);
      }
    }

    if (barChartContainerAuthor?.current) {
      if (barChartInstanceAuthor) {
        barChartInstanceAuthor.destroy();
      }

      if (defectDataAuthor) {
        if (!Array.isArray(defectDataAuthor)) {
          console.error("defectData is not an array", defectDataAuthor);
          setDefectDataAuthor([]);
        }
        const defectDataAuthorTime = defectDataAuthor.filter(
          (item) => item.interval === time
        );
        const groupedData = defectDataAuthorTime.reduce((accumulator, item) => {
          const key = item.category;
          if (!accumulator[key]) {
            accumulator[key] = 0;
          }
          accumulator[key] += item.count;
          return accumulator;
        }, {});

        const labels = Object.keys(groupedData);
        const data = Object.values(groupedData);

        const newBarChartInstance = new Chart(barChartContainerAuthor.current, {
          type: "bar",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Author",
                data: data,
                backgroundColor: "#5977d3",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: "Author",
                font: {
                  size: 16,
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true, // Start the y-axis from 0
              },
            },
          },
        });

        setBarChartInstanceAuthor(newBarChartInstance);
      }
    }

    if (barChartContainerDetectedBy?.current) {
      if (barChartInstanceDetectedBy) {
        barChartInstanceDetectedBy.destroy();
      }

      if (defectDataDetectedBy) {
        if (!Array.isArray(defectDataDetectedBy)) {
          console.error("defectData is not an array", defectDataDetectedBy);
          setDefectDataDetectedBy([]);
        }
        const dataTimeFilter = defectDataDetectedBy.filter(
          (item) => item.interval === time
        );
        const groupedData = dataTimeFilter.reduce((accumulator, item) => {
          const key = item.category;
          if (!accumulator[key]) {
            accumulator[key] = 0;
          }
          accumulator[key] += item.count;
          return accumulator;
        }, {});

        const labels = Object.keys(groupedData);
        const data = Object.values(groupedData);

        const newBarChartInstance = new Chart(
          barChartContainerDetectedBy.current,
          {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Detected By",
                  data: data,
                  backgroundColor: "#5977d3",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Detected By",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true, // Start the y-axis from 0
                },
              },
            },
          }
        );

        setBarChartInstanceDetectedBy(newBarChartInstance);
      }
    }

    if (barChartContainerService?.current) {
      if (barChartInstanceService) {
        barChartInstanceService.destroy();
      }

      if (defectDataService) {
        if (!Array.isArray(defectDataService)) {
          console.error("defectData is not an array", defectDataService);
          setDefectDataService([]);
        }
        const dataTimeFilter = defectDataService.filter(
          (item) => item.interval === time
        );
        const groupedData = dataTimeFilter.reduce((accumulator, item) => {
          const key = item.category;
          if (!accumulator[key]) {
            accumulator[key] = 0;
          }
          accumulator[key] += parseFloat(item.count);
          return accumulator;
        }, {});

        const labels = Object.keys(groupedData);
        const data = Object.values(groupedData);

        const newBarChartInstance = new Chart(
          barChartContainerService.current,
          {
            type: "bar",
            data: {
              labels: labels,
              datasets: [
                {
                  label: "Defect Density",
                  data: data,
                  backgroundColor: "#5977d3",
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Defect Density",
                  font: {
                    size: 16,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true, // Start the y-axis from 0
                },
              },
            },
          }
        );

        setBarChartInstanceService(newBarChartInstance);
      }
    }
  }, [
    defectDataTrending,
    defectDataDefectType,
    defectDataDefectSeverity,
    defectDataAuthor,
    defectDataDetectedBy,
    defectDataService,
    time,
  ]);

  return false ? (
    <div>Loading...</div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingBottom: 32,
      }}
    >
      <Grid container justifyContent="center">
        {[1, 2, 3, 4].map((key) => {
          return (
            <GridItem
              item
              xs={2.1}
              style={{
                margin: 4,
                backgroundColor: "inherit",
              }}
            ></GridItem>
          );
        })}
        <Grid
          item
          xs={2.1}
          style={{
            margin: 4,
            marginRight: 0,
            textAlign: "right",
          }}
        >
          <FormControl size="small" style={{ width: "45%", textAlign: "left" }}>
            <InputLabel id="demo-simple-select-label">Interval</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={interval}
              label="Interval"
              onChange={(event) => setInterval(event.target.value)}
            >
              <MenuItem value="Year">Year</MenuItem>
              <MenuItem value="Quarter">Quarter</MenuItem>
              <MenuItem value="Month">Month</MenuItem>
              <MenuItem value="Week">Week</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            size="small"
            style={{ width: "50%", marginLeft: 8, textAlign: "left" }}
          >
            <InputLabel id="demo-simple-select-label-time">Time</InputLabel>
            {time && (
              <Select
                labelId="demo-simple-select-label-time"
                id="demo-simple-select-time"
                value={time}
                label="Time"
                onChange={(event) => setTime(event.target.value)}
              >
                {timeOptions.map((timeOption) => {
                  return <MenuItem value={timeOption}>{timeOption}</MenuItem>;
                })}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <GridContainer container spacing={4} className="info">
        {Object.keys(Information).map((key) => {
          return (
            <GridItem
              item
              xs={2.1}
              style={{
                margin: 4,
                textAlign: "center",
                backgroundColor: "rgba(236, 236, 236, 0.4)",
              }}
              boxShadow={3}
            >
              <h2>{Information[key]}</h2>
              <h1>{generalInfo[key]}</h1>
            </GridItem>
          );
        })}
      </GridContainer>
      <GridContainer container spacing={4}>
        <GridItem item xs={3.5}>
          {defectDataTrending.length > 0 && (
            <div className="w-full max-w-3xl mb-4">
              <canvas ref={lineChartContainer} className="w-120 h-96" />
            </div>
          )}
        </GridItem>
        <GridItem item xs={3.5}>
          {defectDataDefectType.length > 0 && (
            <canvas ref={barChartContainerDefectType} />
          )}
        </GridItem>
        <GridItem item xs={3.5}>
          {defectDataDefectSeverity.length > 0 && (
            <div className="w-full max-w-3xl mb-4">
              <canvas
                ref={barChartContainerDefectSeverity}
                className="w-120 h-96"
              />
            </div>
          )}
        </GridItem>
      </GridContainer>
      <GridContainer container spacing={4}>
        <GridItem item xs={3.5}>
          {defectDataAuthor.length > 0 && (
            <div>
              <canvas
                ref={barChartContainerAuthor}
                // className="w-120 h-96"
              />
            </div>
          )}
        </GridItem>
        <GridItem item xs={3.5}>
          {defectDataDetectedBy.length > 0 && (
            <div>
              <canvas
                ref={barChartContainerDetectedBy}
                // className="w-120 h-96"
              />
            </div>
          )}
        </GridItem>
        <GridItem item xs={3.5}>
          {defectDataService.length > 0 && (
            <div>
              <canvas
                ref={barChartContainerService}
                // className="w-120 h-96"
              />
            </div>
          )}
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default DefectVisualization;
