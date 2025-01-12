import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function BasicDateRangePicker({
  handleChangeDate,
  startDate,
  endDate,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker
          defaultValue={[startDate, endDate]}
          disableFuture
          onChange={handleChangeDate}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
