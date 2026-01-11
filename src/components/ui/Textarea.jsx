import React from "react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  error = false,
  helperText = "",
  fullWidth = true,
  rows = 3,
  variant = "outlined",
  size = "small",
  className = "",
  focusBorderColor = "#FFDE59", // custom focus border color
  ...rest
}) => {
  const { t } = useTranslation();

  return (
    <TextField
      label={t(label)}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={t(helperText)}
      fullWidth={fullWidth}
      variant={variant}
      size={size}
      multiline
      rows={rows}
      className={className}
      sx={{
        // "& .MuiOutlinedInput-root": {
        //   "& fieldset": {
        //     borderColor: "#d1d5db", // default border
        //   },
        //   "&:hover fieldset": {
        //     borderColor: "#d1d5db", // remove hover effect
        //   },
        //   "&.Mui-focused fieldset": {
        //     borderColor: focusBorderColor, // focus border
        //   },
        // },
        "& .MuiInputLabel-root": {
          color: "gray", // default label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "gray", // keep label gray even on focus
        },
      }}
      {...rest}
    />
  );
};

export default Textarea;
