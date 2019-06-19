import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./LoaderButton.css";

export default ({
  isLoading,
  text,
  loadingText,
  className = "",
  disabled = false,
  backgroundColor,
  color,
  ...props
}) =>
  <Button
    className={`LoaderButton ${className}`}
    disabled={disabled || isLoading}
    {...props}
    style = {{borderRadius: "0px", border: "none", height: "60px", fontSize: "13pt", marginTop: "20px", letterSpacing: ".1rem", backgroundColor: backgroundColor, color : color}}
  >
    {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
    {!isLoading ? text : loadingText}
  </Button>;
