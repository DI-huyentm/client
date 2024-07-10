import React, { useState } from "react";
import dayjs from "dayjs";
import ReportEditor from "./ReportEditor";

const today = dayjs();
const yesterday = today.subtract(1, "day");

const AddReport = () => {
  const [formData, setFormData] = useState({
    name: "",
    startDate: yesterday.unix(),
    endDate: today.unix(),
    description: "",
  });
  return (
    <ReportEditor
      fromDate={yesterday}
      toDate={today}
      formData={formData}
      setFormData={setFormData}
      title="Add Report"
    />
  );
};

export default AddReport;
