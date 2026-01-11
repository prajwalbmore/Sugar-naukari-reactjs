/* eslint-disable no-unused-vars */
import { CalendarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

// ----------------------------------------------------------------------

const DateRangePicker = forwardRef(
  (
    {
      options: userOptions,
      className,
      hasCalendarIcon = true,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);

    const defaultOptions = {
      mode: "range",
      dateFormat: "Y-m-d",
    };

    const options = {
      ...defaultOptions,
      ...userOptions,
    };

    // Expose focus/blur methods
    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      blur() {
        inputRef.current?.blur();
      },
    }));

    return (
      <div className={clsx("relative inline-block w-full", className)}>
        {hasCalendarIcon && (
          <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 pointer-events-none" />
        )}
        <Flatpickr
          options={options}
          value={value}
          onChange={(dates, str, instance) => {
            if (onChange) {
              onChange(dates, str, instance);
            }
            // ✅ keep calendar open until both dates selected
            if (dates.length === 1) {
              instance.open();
            }
          }}
          {...props}
          render={(_, refInput) => (
            <input
              ref={(el) => {
                inputRef.current = el;
                if (typeof refInput === "function") refInput(el);
                else if (refInput) refInput.current = el;
              }}
              placeholder="Select date range"
              className={clsx(
                "border rounded px-3 py-2 w-full",
                hasCalendarIcon && "pl-10"
              )}
              readOnly
            />
          )}
        />
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export { DateRangePicker };
// /* eslint-disable no-unused-vars */
// // Import Dependencies
// import { CalendarIcon } from "@heroicons/react/24/solid";
// import clsx from "clsx";
// import React, {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useRef,
//   useState,
// } from "react";

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/light.css"; // Import Flatpickr CSS

// // ----------------------------------------------------------------------

// const DateRangePicker = forwardRef(
//   (
//     { options: userOptions, className, hasCalendarIcon = true, ...props },
//     ref
//   ) => {
//     const fp = useRef(null);

//     const defaultOptions = {
//       mode: "range", // Enables range selection
//       dateFormat: "Y-m-d",
//     };

//     const options = {
//       ...defaultOptions,
//       ...userOptions,
//     };

//     useImperativeHandle(ref, () => ({
//       focus() {
//         fp.current.flatpickr.input.focus();
//       },
//       blur() {
//         fp.current.flatpickr.input.blur();
//       },
//     }));

//     return (
//       <div className={clsx("relative inline-block", className)}>
//         {hasCalendarIcon && (
//           <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-500  pointer-events-none" />
//         )}
//         <Flatpickr
//           ref={fp}
//           options={options}
//           {...props}
//           render={({ ...props }, ref) => (
//             <input
//               ref={ref}
//               {...props}
//               placeholder="Select date"
//               className={clsx(
//                 "border rounded  px-3 py-2 w-full",
//                 hasCalendarIcon && "pl-10"
//               )}
//               readOnly
//             />
//           )}
//         />
//       </div>
//     );
//   }
// );

// DateRangePicker.displayName = "DateRangePicker";

// export { DateRangePicker };
