import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const Input = React.memo(
  ({
    label = "",
    name = "",
    value = "",
    onChange = () => {},
    type = "text",
    placeholder = "",
    required = false,
    error = false,
    helperText = "",
    fullWidth = true,
    variant = "outlined",
    size = "small",
    className = "rounded-md ",
    focusBorderColor = "", // custom focus color
    showButton = false, // new prop to show button
    buttonText = "Click", // button text
    onButtonClick = () => {}, // button click handler
    ...rest
  }) => {
    const { t } = useTranslation();

    const inputLabelProps = type === "date" ? { shrink: true } : {};
    const inputPlaceholder =
      type === "date" && !placeholder ? "dd/mm/yyyy" : t(placeholder);

    return (
      <TextField
        label={t(label)}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={inputPlaceholder}
        required={required}
        error={error}
        helperText={t(helperText)}
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        className={className}
        InputLabelProps={{
          style: { color: "gray" },
          ...inputLabelProps,
        }}
        InputProps={{
          endAdornment: showButton ? (
            <InputAdornment position="end">
              <Button onClick={onButtonClick} className="bg-appcolor px-2 rounded-lg py-1 text-dark text-sm">
                {buttonText}
              </Button>
            </InputAdornment>
          ) : null,
        }}
        {...rest}
      />
    );
  }
);

export default Input;
// import React from "react";
// import TextField from "@mui/material/TextField";
// import { useTranslation } from "react-i18next";

// const Input = React.memo(
//   ({
//     label = "",
//     name = "",
//     value = "",
//     onChange = () => {},
//     type = "text",
//     placeholder = "",
//     required = false,
//     error = false,
//     helperText = "",
//     fullWidth = true,
//     variant = "outlined",
//     size = "small",
//     className = "rounded-md ",
//     focusBorderColor = "", // custom focus color
//     ...rest
//   }) => {
//     const { t } = useTranslation();
//     // Automatically shrink label for date fields
//     const inputLabelProps = type === "date" ? { shrink: true } : {};

//     // Set placeholder for date type to show dd/mm/yyyy
//     const inputPlaceholder =
//       type === "date" && !placeholder ? "dd/mm/yyyy" : t(placeholder);

//     return (
//       <TextField
//         label={t(label)}
//         name={name}
//         value={value}
//         onChange={onChange}
//         type={type}
//         placeholder={inputPlaceholder}
//         required={required}
//         error={error}
//         helperText={t(helperText)}
//         fullWidth={fullWidth}
//         variant={variant}
//         size={size}
//         className={className}
//         InputLabelProps={{
//           style: { color: "gray" },
//           ...inputLabelProps,
//         }}
//         // sx={{
//         //   "& .MuiOutlinedInput-root": {
//         //     "& fieldset": {
//         //       borderColor: "#d1d5db", // default border color
//         //     },
//         //     // "&:hover fieldset": {
//         //     //   borderColor: "#d1d5db", // keep same on hover
//         //     // },
//         //     "&.Mui-focused fieldset": {
//         //       borderColor: focusBorderColor,
//         //     },
//         //   },
//         // }}
//         {...rest}
//       />
//     );
//   }
// );

// export default Input;
