import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

/**
 * Reusable Checkbox Component
 * @param {string} label - The label displayed next to the checkbox
 * @param {boolean} checked - Current checked state
 * @param {function} onChange - Callback for checkbox change
 * @param {string} id - Optional id for the checkbox
 */
const CustomCheckbox = ({ label, checked, onChange, id }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          id={id}
          checked={checked}
          onChange={onChange}
          sx={{
            color: "#4B5563", // Tailwind gray-700
            "&.Mui-checked": {
              color: "#1F2937", // Tailwind gray-900 when checked
            },
          }}
        />
      }
      label={label}
      sx={{ margin: 0, fontSize: "1rem", color: "#1F2937" }}
    />
  );
};

export default CustomCheckbox;
