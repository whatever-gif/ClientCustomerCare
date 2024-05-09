import React from "react";
import { useNavigate } from "react-router-dom";

export const renderLinkPrimary = ({ text, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate(link);

  return (
    <div onClick={handleNavigate} className="link-primary">
      {text}
    </div>
  );
};
