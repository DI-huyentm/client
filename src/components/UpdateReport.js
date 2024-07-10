import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import ReportEditor from "./ReportEditor";

const UpdateReport = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  React.useEffect(() => {
    if (!id || formData?.id) return;
    axios
      .get(`${process.env.REACT_APP_API_URL}/reports/${id}`)
      .then((response) => {
        const {
          id,
          name,
          start_date: startDate,
          end_date: endDate,
          description,
        } = response?.data;
        setFormData({
          id: id,
          name: name,
          startDate: Date.parse(startDate) / 1000,
          endDate: Date.parse(endDate) / 1000,
          description: description,
        });
        setFromDate(dayjs(startDate));
        setToDate(dayjs(endDate));
      });
  }, [id, formData]);
  return (
    <ReportEditor
      fromDate={fromDate}
      toDate={toDate}
      formData={formData}
      setFormData={setFormData}
      title="Update Report"
    />
  );
};

export default UpdateReport;
