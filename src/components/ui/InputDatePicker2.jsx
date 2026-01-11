import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";

const InputDatePicker2 = React.memo(
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
    ...rest
  }) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value ? dayjs(value, "DD/MM/YY") : null}
          onChange={(newValue) => {
            onChange(newValue ? dayjs(newValue).format("DD/MM/YY") : null);
          }}
          minDate={minDate ? dayjs(minDate, "DD/MM/YY") : undefined}
          maxDate={maxDate ? dayjs(maxDate, "DD/MM/YY") : undefined}
          inputFormat="DD/MM/YY"
          mask="__/__/__"
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
                  "& fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: focusBorderColor,
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  color: value ? "inherit" : "gray",
                },
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

InputDatePicker.propTypes = {
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
};

export default InputDatePicker2;
