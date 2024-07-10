import { Alert } from "@mui/material";
import React from "react";

export function SuccessAlert({message}){
    return (
        <>
          <Alert severity="success" sx={{ minHeight: "10px" }}>
            {message}
          </Alert>
        </>
      );
}

export function ErrorAlert ({message}) {
  return (
    <>
      <Alert severity="error" sx={{ minHeight: "10px" }}>
        {message}
      </Alert>
    </>
  );
};

