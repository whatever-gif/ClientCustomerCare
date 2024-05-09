import React from "react";

export const customizeRequiredMark = (label, { required = false }) => (
  <>
    {label}
    {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
  </>
);
