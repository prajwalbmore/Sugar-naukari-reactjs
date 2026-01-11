import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function IconInput({
  label,
  icon: Icon,
  value,
  onChange,
  labelSize = "20px", // dynamic label size
  inputSize = "1rem", // dynamic input text size
  labelMargin = "10px", // new prop for label margin
  variant = "standard",
  fullWidth = true,
  ...rest
}) {
  const { t } = useTranslation();
  return (
    <TextField
      label={t(label)}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      // InputProps={{
      //   startAdornment: Icon ? (
      //     <InputAdornment position="start">
      //       <Icon fontSize="small" />
      //     </InputAdornment>
      //   ) : null,
      // }}
      InputLabelProps={{
        shrink: true,
      }}
      sx={(theme) => ({
        borderRadius: 1,
        px: 1.5,
        "& .MuiInputBase-input": {
          fontSize: inputSize, // dynamic input size
          color: theme.palette.text.primary,
          py: 1,
        },
        "& .MuiInputLabel-root": {
          fontSize: labelSize, // dynamic label size
          color: theme.palette.text.secondary,
          transition: "transform 0.3s ease, color 0.3s ease",
          marginRight: labelMargin, // added label margin
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.text.secondary,
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: theme.palette.divider,
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: theme.palette.divider,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.divider,
        },
        "& .MuiInputAdornment-root": {
          color: theme.palette.text.secondary,
          mr: 0.5,
        },
      })}
      {...rest}
    />
  );
}
