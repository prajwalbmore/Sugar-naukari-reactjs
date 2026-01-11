
import React from "react";

export default function IconTextarea({
  icon: Icon,
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  rows = 4,
}) {
  return (
    <div className="flex flex-row gap-1 px-3">
      {/* Optional Icon */}
      {/* {Icon && <Icon className="text-gray-500 text-xl" />} */}
      <textarea
        name={name}        
        placeholder={placeholder}
        value={value}
        onChange={onChange} 
        onBlur={onBlur}     
        rows={rows}
        className="w-full placeholder:text-gray-500 p-2 border-b border-gray-300 resize-y bg-transparent"
      />
    </div>
  );
}

// import React from "react";

// export default function IconTextarea({
//   icon: Icon,
//   placeholder,
//   value,
//   onChange,
//   rows = 4,
// }) {
//   return (
//     <div className="flex flex-col gap-1 ">
//       {/* {Icon && <Icon className="text-gray-500 text-xl " />} */}
//       <textarea
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         rows={rows}
//         className="w-full p-2 border-b border-gray-300  resize-y bg-transparent"
//       />
//     </div>
//   );
// }

// // import React from "react";
// // import { TextField, InputAdornment } from "@mui/material";

// // export default function IconTextarea({
// //   label,
// //   placeholder = "",
// //   icon: Icon,
// //   value,
// //   onChange,
// //   rows = 4, // default rows
// //   labelSize = "20px", // dynamic label size
// //   inputSize = "1rem", // dynamic input text size
// //   variant = "standard",
// //   fullWidth = true,
// //   ...rest
// // }) {
// //   return (
// //     <TextField
// //       label={label}
// //       variant={variant}
// //       fullWidth={fullWidth}
// //       placeholder={placeholder}
// //       value={value}
// //       onChange={onChange}
// //       multiline
// //       rows={rows}
// //       InputProps={{
// //         startAdornment: Icon ? (
// //           <InputAdornment position="center">
// //             <Icon fontSize="small" />
// //           </InputAdornment>
// //         ) : null,
// //       }}
// //       InputLabelProps={{
// //         shrink: true,
// //       }}
// //       sx={(theme) => ({
// //         borderRadius: 1,
// //         px: 1.5,
// //         "& .MuiInputBase-input": {
// //           fontSize: inputSize,
// //           color: theme.palette.text.primary,
// //           py: 1,
// //         },
// //         "& .MuiInputLabel-root": {
// //           fontSize: labelSize,
// //           color: theme.palette.text.secondary,
// //           transition: "transform 0.3s ease, color 0.3s ease",
// //         },
// //         "& .MuiInputLabel-root.Mui-focused": {
// //           color: theme.palette.text.secondary,
// //         },
// //         "& .MuiInput-underline:before": {
// //           borderBottomColor: theme.palette.divider,
// //         },
// //         "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
// //           borderBottomColor: theme.palette.divider,
// //         },
// //         "& .MuiInput-underline:after": {
// //           borderBottomColor: theme.palette.divider,
// //         },
// //         "& .MuiInputAdornment-root": {
// //           color: theme.palette.text.secondary,
// //           mr: 0.5,
// //         },
// //       })}
// //       {...rest}
// //     />
// //   );
// // }
