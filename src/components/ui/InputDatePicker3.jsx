import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
const InputDatePicker3 = React.memo(
  ({
    label = "",
    value = null,
    onChange = () => {},
    error = false,
    helperText = "",
    fullWidth = true,
    size = "small",
    className = "rounded-xl",
    focusBorderColor = "#FFDE59",
    minDate,
    maxDate,
    allowPast = true,
    allowFuture = true,
    ...rest
  }) => {
    // Compute effective minDate and maxDate
    const computedMinDate = allowPast
      ? minDate
        ? dayjs(minDate, "DD/MM/YY")
        : undefined
      : dayjs();
    const computedMaxDate = allowFuture
      ? maxDate
        ? dayjs(maxDate, "DD/MM/YY")
        : undefined
      : dayjs();

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null} // ✅ Handle dayjs object or null
          onChange={(newValue) => {
            onChange(newValue); // ✅ Pass dayjs object directly, not formatted string
          }}
          minDate={computedMinDate}
          maxDate={computedMaxDate}
          format="DD/MM/YY"
          slotProps={{
            textField: {
              error,
              helperText,
              fullWidth,
              size,
              className,
              InputLabelProps: { style: { color: "gray" } },
              sx: {
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d1d5db" },
                  "&:hover fieldset": { borderColor: "#d1d5db" },
                  "&.Mui-focused fieldset": {
                    borderColor: focusBorderColor,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": { color: value ? "inherit" : "gray" },
              },
              renderInput: (params) => <TextField {...params} />,
              ...rest,
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);

InputDatePicker3.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  focusBorderColor: PropTypes.string,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  allowPast: PropTypes.bool, // allow past dates
  allowFuture: PropTypes.bool, // allow future dates
};

export default InputDatePicker3;
