import React, { useRef } from "react";
import { FormHelperText } from "@mui/material";
import { ArrowUpTrayIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

const FileInput = ({
  label,
  name,
  value,
  setFieldValue,
  multiple = false,
  error = false,
  helperText = "",
  accept = "*",
  fullWidth = true,
  className = "",
  focusBorderColor = "#FFDE59",
}) => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const handleChange = (e) => {
    if (e.currentTarget.files) {
      if (multiple) {
        setFieldValue(name, Array.from(e.currentTarget.files));
      } else {
        setFieldValue(name, e.currentTarget.files[0]);
      }
    }
  };

  const handleRemove = (index) => {
    if (!multiple) {
      setFieldValue(name, null);
    } else {
      const newFiles = value.filter((_, i) => i !== index);
      setFieldValue(name, newFiles);
    }
  };

  return (
    <div
      className={className}
      style={{
        width: fullWidth ? "100%" : "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className={`w-full border-2 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-white text-gray-600`}
        onClick={() => inputRef.current?.click()}
        tabIndex={0}
      >
        <span className="text-sm">{t(label)}</span>
        <ArrowUpTrayIcon className="h-5 w-5" strokeWidth={2} />
      </div>

      <input
        id={name}
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {/* Pills for selected files */}
      {value && (multiple ? value.length > 0 : value.name) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {multiple
            ? value.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
                >
                  <span>{file.name}</span>
                  <XCircleIcon
                    className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleRemove(index)}
                  />
                </div>
              ))
            : value.name && (
                <div className="flex items-center gap-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mt-1">
                  <span>{value.name}</span>
                  <XCircleIcon
                    className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                    onClick={() => handleRemove(0)}
                  />
                </div>
              )}
        </div>
      )}

      {error && helperText && (
        <FormHelperText error className="text-xs mt-1">
          {t(helperText)}
        </FormHelperText>
      )}
    </div>
  );
};

export default FileInput;
// import React, { useRef, useState } from "react";
// import { FormHelperText } from "@mui/material";
// import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

// const FileInput = ({
//   label,
//   name,
//   value,
//   setFieldValue,
//   multiple = false,
//   error = false,
//   helperText = "",
//   accept = "*",
//   fullWidth = true,
//   className = "",
//   focusBorderColor = "#FFDE59",
// }) => {
//   const inputRef = useRef(null);
//   const [focused, setFocused] = useState(false);

//   const handleChange = (e) => {
//     if (e.currentTarget.files) {
//       if (multiple) {
//         setFieldValue(name, Array.from(e.currentTarget.files)); // array of files
//       } else {
//         setFieldValue(name, e.currentTarget.files[0]); // single file
//       }
//     }
//   };
//   const displayValue = () => {
//     if (!value || (Array.isArray(value) && value.length === 0)) return label;

//     if (multiple && Array.isArray(value)) {
//       const fileNames = value.map((file) => file?.name || "").filter(Boolean);
//       return fileNames.length > 0 ? `${label}: ${fileNames.join(", ")}` : label;
//     }

//     return value?.name ? `${label}: ${value.name}` : label;
//   };

//   return (
//     <div
//       className={className}
//       style={{
//         width: fullWidth ? "100%" : "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div
//         className="w-full border-2 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-white text-gray-600"
//         onClick={() => inputRef.current?.click()}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         tabIndex={0} // make div focusable
//       >
//         <span className="text-sm">{displayValue()}</span>
//         {(!value || (Array.isArray(value) && value.length === 0)) && (
//           <ArrowUpTrayIcon className="h-5 w-5" strokeWidth={2} />
//         )}
//       </div>

//       <input
//         id={name}
//         ref={inputRef}
//         type="file"
//         name={name}
//         accept={accept}
//         multiple={multiple}
//         onChange={handleChange}
//         style={{ display: "none" }}
//       />

//       {error && helperText && (
//         <FormHelperText error className="text-xs">
//           {helperText}
//         </FormHelperText>
//       )}
//     </div>
//   );
// };

// export default FileInput;
// import React, { useRef, useState } from "react";
// import { FormHelperText } from "@mui/material";

// const FileInput = ({
//   label,
//   name,
//   value,
//   setFieldValue,
//   error = false,
//   helperText = "",
//   accept = "*",
//   fullWidth = true,
//   className = "",
//   focusBorderColor = "#FFDE59", // custom focus border color
// }) => {
//   const inputRef = useRef(null);
//   const [focused, setFocused] = useState(false);

//   const handleChange = (e) => {
//     if (e.currentTarget.files && e.currentTarget.files[0]) {
//       setFieldValue(name, e.currentTarget.files[0]);
//     }
//   };

//   return (
//     <div
//       className={className}
//       style={{
//         width: fullWidth ? "100%" : "auto",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {/* <label htmlFor={name} className="text-sm mb-1" style={{ color: "gray" }}>
//         {label}
//       </label> */}

//       <div
//         className="w-full border-2 rounded-md px-3 py-2 flex items-center justify-between cursor-pointer bg-white text-gray-600"
//         // style={{
//         //   borderColor: focused ? focusBorderColor : "#d1d5db", // focus border
//         // }}
//         onClick={() => inputRef.current?.click()}
//         onFocus={() => setFocused(true)}
//         onBlur={() => setFocused(false)}
//         tabIndex={0} // make div focusable
//       >
//         <span className="text-sm">{value ? value.name : label}</span>
//       </div>

//       <input
//         id={name}
//         ref={inputRef}
//         type="file"
//         name={name}
//         accept={accept}
//         onChange={handleChange}
//         style={{ display: "none" }}
//       />

//       {error && helperText && (
//         <FormHelperText error className="text-xs">
//           {helperText}
//         </FormHelperText>
//       )}
//     </div>
//   );
// };

// export default FileInput;
