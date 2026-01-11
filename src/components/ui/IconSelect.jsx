import React from "react";
import { TextField, MenuItem } from "@mui/material";

export default function SimpleSelect({
  label,
  value,
  placeholder = "",
  onChange,
  options = [],
  labelSize = "20px",
  inputSize = "1rem",
  variant = "standard",
  fullWidth = true,
  ...rest
}) {
  return (
    <TextField
      select
      displayEmpty
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      sx={(theme) => ({
        "& .MuiInputBase-input": {
          fontSize: inputSize,
          color: theme.palette.text.primary,
          py: 1,
        },
        "& .MuiInputLabel-root": {
          fontSize: labelSize,
          color: theme.palette.text.secondary,
          transition: "transform 0.3s ease, color 0.3s ease",
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
          borderBottomColor: theme.palette.text.primary,
        },
      })}
      {...rest}
    >
      {placeholder && (
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
      )}

      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
// import React from "react";
// import { TextField, InputAdornment, MenuItem } from "@mui/material";

// export default function IconSelect({
//   label,
//   icon: Icon,
//   value,
//   onChange,
//   options = [], // array of { value, label }
//   labelSize = "20px",
//   inputSize = "1rem",
//   variant = "standard",
//   fullWidth = true,
//   ...rest
// }) {
//   return (
//     <TextField
//       select
//       label={label}
//       variant={variant}
//       fullWidth={fullWidth}
//       value={value}
//       onChange={onChange}
//       InputProps={{
//         startAdornment: Icon ? (
//           <InputAdornment position="start">
//             <Icon fontSize="small" />
//           </InputAdornment>
//         ) : null,
//       }}
//       InputLabelProps={{
//         shrink: true,
//       }}
//       sx={(theme) => ({
//         "& .MuiInputBase-input": {
//           fontSize: inputSize,
//           color: theme.palette.text.primary,
//           py: 1,
//         },
//         "& .MuiInputLabel-root": {
//           fontSize: labelSize,
//           color: theme.palette.text.secondary,
//           transition: "transform 0.3s ease, color 0.3s ease",
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: theme.palette.text.secondary,
//         },
//         "& .MuiInput-underline:before": {
//           borderBottomColor: theme.palette.divider, // default underline
//         },
//         "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
//           borderBottomColor: theme.palette.divider, // hover underline
//         },
//         "& .MuiInput-underline:after": {
//           borderBottomColor: theme.palette.text.primary, // focused underline
//         },
//         "& .MuiInputAdornment-root": {
//           color: theme.palette.text.secondary,
//           mr: 0.5,
//         },
//       })}
//       {...rest}
//     >
//       {options.map((option) => (
//         <MenuItem key={option.value} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </TextField>
//   );
// }
