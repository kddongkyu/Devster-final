import React from "react";

export default function ToastAlert(enqueueSnackbar) {
  return (message, variant) => {
    enqueueSnackbar(
      <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>{message}</span>,
      {
        variant: variant,
        autoHideDuration: 4000,
      }
    );
  };
}
