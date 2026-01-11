import React from "react";

const CustomStepper = ({
  steps = ["1", "2", "3"],
  activeStep = 0,
  activeColor = "#FFDE59",
  inactiveColor = "#E0E0E0",
  size = 30,
  lineHeight = 4,
}) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Step Circle */}
          <div
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor:
                activeStep >= index ? activeColor : inactiveColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              fontWeight: "bold",
              zIndex: 1,
            }}
          >
            {step}
          </div>

          {/* Connector Line */}
          {index !== steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: lineHeight,
                backgroundColor:
                  activeStep > index ? activeColor : inactiveColor,
                margin: "0 10px",
                borderRadius: lineHeight / 2,
              }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomStepper;
