// components/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      disabled = false,
      loading = false,
      fullWidth = false,
      className = "",
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={clsx(
          "inline-flex items-center justify-center font-medium ",
          fullWidth && "w-full",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="animate-spin border-2 border-current border-t-transparent rounded-full w-6 h-6 mr-2"></span>
        )}
        {startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  bgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  textColor: PropTypes.string,
  focusRing: PropTypes.string,
  rounded: PropTypes.string,
  padding: PropTypes.string,
  textSize: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

export default Button;
