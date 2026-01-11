import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  error = false,
  helperText = "",
  multiple = false,
  fullWidth = true,
  width = "100%",
  height = "40px",
  padding = "0px 0px",
}) => {
  const { t } = useTranslation();
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      sx={{
        width: width || "100%",
        "& .MuiSelect-root": {
          height: height || "auto",
          padding: padding || "8px 14px",
        },
      }}
    >
      <InputLabel
        id={`${name}-label`}
        sx={{
          color: "gray !important", // ✅ always gray
          "&.Mui-focused": {
            color: "gray !important",
          },
          "&.Mui-error": {
            color: "gray !important",
          },
        }}
      >
        {t(label)}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        multiple={multiple}
        value={multiple ? value || [] : value || ""}
        onChange={onChange}
        label={t(label)}
        renderValue={(selected) =>
          multiple
            ? options
                .filter((opt) => selected.includes(opt.value))
                .map((opt) => opt.label)
                .join(", ")
            : selected
        }
        sx={{
          height: height || "auto",
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {t(option.label)}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{t(helperText)}</FormHelperText>}
    </FormControl>
  );
};

export default SelectInput;
// // // SelectInput.jsx
// // SelectInput.jsx
// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";
// import { useTranslation } from "react-i18next";

// const SelectInput = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   error = false,
//   helperText = "",
//   multiple = false,
//   fullWidth = true,
//   width = "100%",
//   height = "40px",
//   padding = "0px 0px",
// }) => {
//   const { t } = useTranslation();
//   return (
//     <FormControl
//       fullWidth={fullWidth}
//       error={error}
//       sx={{
//         width: width || "100%",
//         "& .MuiSelect-root": {
//           height: height || "auto",
//           padding: padding || "8px 14px",
//         },
//       }}
//     >
//       <InputLabel
//         id={`${name}-label`}
//         sx={{
//           color: "inherit !important", // keep normal color
//           "&.Mui-error": {
//             color: "inherit !important", // prevent red color on error
//           },
//         }}
//       >
//         {t(label)}
//       </InputLabel>
//       <Select
//         labelId={`${name}-label`}
//         id={name}
//         name={name}
//         multiple={multiple}
//         value={multiple ? value || [] : value || ""}
//         onChange={onChange}
//         label={t(label)}
//         renderValue={(selected) =>
//           multiple
//             ? options
//                 .filter((opt) => selected.includes(opt.value))
//                 .map((opt) => opt.label)
//                 .join(", ")
//             : selected
//         }
//         sx={{
//           height: height || "auto",
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//       {helperText && <FormHelperText>{t(helperText)}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default SelectInput;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";

// const SelectInput = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   error = false,
//   helperText = "",
//   multiple = false,
//   fullWidth = true,
//   width = "100%",
//   height = "40px",
//   padding = "0px 0px",
// }) => {
//   return (
//     <FormControl
//       fullWidth={fullWidth}
//       error={error}
//       sx={{
//         width: width || "100%",
//         "& .MuiSelect-root": {
//           height: height || "auto",
//           padding: padding || "8px 14px",
//         },
//       }}
//     >
//       <InputLabel id={`${name}-label`}>{label}</InputLabel>
//       <Select
//         labelId={`${name}-label`}
//         id={name}
//         name={name}
//         multiple={multiple}
//         value={multiple ? value || [] : value || ""}
//         onChange={onChange}
//         label={label}
//         renderValue={(selected) =>
//           multiple
//             ? options
//                 .filter((opt) => selected.includes(opt.value))
//                 .map((opt) => opt.label)
//                 .join(", ")
//             : selected
//         }
//         sx={{
//           height: height || "auto",
//         }}
//       >
//         {options.map((option) => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//       {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default SelectInput;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select as MuiSelect,
//   MenuItem,
//   FormHelperText,
//   Chip,
//   Box,
// } from "@mui/material";

// const Select = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   error = false,
//   helperText = "",
//   fullWidth = true,
//   size = "small",
//   variant = "outlined",
//   className = "",
//   focusBorderColor = "#FFDE59",
//   multiple = false,
//   ...rest
// }) => {
//   return (
//     <FormControl
//       fullWidth={fullWidth}
//       size={size}
//       variant={variant}
//       error={error}
//       className={className}
//       sx={{
//         "& .MuiInputLabel-root": {
//           color: "gray",
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: "gray",
//         },
//       }}
//     >
//       <InputLabel>{label}</InputLabel>

//       <MuiSelect
//         name={name}
//         value={value}
//         onChange={onChange}
//         label={label}
//         multiple={multiple}
//         displayEmpty // ✅ important for placeholder
//         renderValue={(selected) => {
//           if (!multiple) {
//             if (!selected) return options[0]?.label; // show placeholder
//             const selectedOption = options.find(
//               (opt) => opt.value === selected
//             );
//             return selectedOption ? selectedOption.label : "";
//           }
//           if (Array.isArray(selected)) {
//             return (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((val) => {
//                   const selectedOption = options.find(
//                     (opt) => opt.value === val
//                   );
//                   return (
//                     <Chip
//                       key={val}
//                       label={selectedOption ? selectedOption.label : val}
//                     />
//                   );
//                 })}
//               </Box>
//             );
//           }
//           return "";
//         }}
//       >
//         {options.map((opt, idx) => (
//           <MenuItem
//             key={idx}
//             value={opt.value}
//             disabled={idx === 0 && !multiple}
//           >
//             {opt.label}
//           </MenuItem>
//         ))}
//       </MuiSelect>

//       {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default Select;

// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select as MuiSelect,
//   MenuItem,
//   FormHelperText,
//   Chip,
//   Box,
// } from "@mui/material";

// const Select = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   error = false,
//   helperText = "",
//   fullWidth = true,
//   size = "small",
//   variant = "outlined",
//   className = "",
//   focusBorderColor = "#FFDE59",
//   multiple = false,
//   ...rest
// }) => {
//   return (
//     <FormControl
//       fullWidth={fullWidth}
//       size={size}
//       variant={variant}
//       error={error}
//       className={className}
//       sx={{
//         "& .MuiInputLabel-root": {
//           color: "gray",
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: "gray",
//         },
//         // "& .MuiOutlinedInput-root": {
//         //   "& fieldset": {
//         //     borderColor: "#d1d5db",
//         //   },
//         //   "&:hover fieldset": {
//         //     borderColor: "#d1d5db",
//         //   },
//         //   "&.Mui-focused fieldset": {
//         //     borderColor: focusBorderColor,
//         //   },
//         // },
//       }}
//     >
//       <InputLabel>{label}</InputLabel>
//       {/* <MuiSelect
//         name={name}
//         value={value}
//         onChange={onChange}
//         label={label}
//         multiple={multiple}
//         renderValue={(selected) => {
//           if (!multiple) {
//             const selectedOption = options.find(
//               (opt) => opt.value === selected
//             );
//             return selectedOption ? selectedOption.label : "";
//           }
//           if (Array.isArray(selected)) {
//             return (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((val) => {
//                   const selectedOption = options.find(
//                     (opt) => opt.value === val
//                   );
//                   return (
//                     <Chip
//                       key={val}
//                       label={selectedOption ? selectedOption.label : val}
//                     />
//                   );
//                 })}
//               </Box>
//             );
//           }
//           return "";
//         }}
//         {...rest}
//       >
//         {options.map((opt, idx) => (
//           <MenuItem key={idx} value={opt.value}>
//             {opt.label}
//           </MenuItem>
//         ))}
//       </MuiSelect> */}
//       <MuiSelect
//         name={name}
//         value={value}
//         onChange={onChange}
//         label={label}
//         multiple={multiple}
//         displayEmpty // ✅ important for placeholder
//         renderValue={(selected) => {
//           if (!multiple) {
//             if (!selected) return options[0]?.label; // show placeholder
//             const selectedOption = options.find(
//               (opt) => opt.value === selected
//             );
//             return selectedOption ? selectedOption.label : "";
//           }
//           if (Array.isArray(selected)) {
//             return (
//               <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                 {selected.map((val) => {
//                   const selectedOption = options.find(
//                     (opt) => opt.value === val
//                   );
//                   return (
//                     <Chip
//                       key={val}
//                       label={selectedOption ? selectedOption.label : val}
//                     />
//                   );
//                 })}
//               </Box>
//             );
//           }
//           return "";
//         }}
//       >
//         {options.map((opt, idx) => (
//           <MenuItem
//             key={idx}
//             value={opt.value}
//             disabled={idx === 0 && !multiple}
//           >
//             {opt.label}
//           </MenuItem>
//         ))}
//       </MuiSelect>

//       {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default Select;
// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select as MuiSelect,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";

// const Select = ({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   error = false,
//   helperText = "",
//   fullWidth = true,
//   size = "small",
//   variant = "outlined",
//   className = "",
//   focusBorderColor = "#FFDE59", // custom focus border color
//   ...rest
// }) => {
//   return (
//     <FormControl
//       fullWidth={fullWidth}
//       size={size}
//       variant={variant}
//       error={error}
//       className={className}
//       sx={{
//         // "& .MuiOutlinedInput-root": {
//         //   "& fieldset": {
//         //     borderColor: "#d1d5db", // default border
//         //   },
//         //   "&:hover fieldset": {
//         //     borderColor: "#d1d5db", // remove hover effect
//         //   },
//         //   "&.Mui-focused fieldset": {
//         //     borderColor: focusBorderColor, // focus border
//         //   },
//         // },
//         "& .MuiInputLabel-root": {
//           color: "gray", // default label color
//         },
//         "& .MuiInputLabel-root.Mui-focused": {
//           color: "gray", // keep label gray even on focus
//         },
//       }}
//     >
//       <InputLabel>{label}</InputLabel>
//       <MuiSelect
//         name={name}
//         value={value || (multiple ? [] : "")}
//         onChange={onChange}
//         label={label}
//         {...rest}
//       >
//         {options.map((opt, idx) => (
//           <MenuItem key={idx} value={opt.value}>
//             {opt.label}
//           </MenuItem>
//         ))}
//       </MuiSelect>
//       {helperText && <FormHelperText>{helperText}</FormHelperText>}
//     </FormControl>
//   );
// };

// export default Select;
