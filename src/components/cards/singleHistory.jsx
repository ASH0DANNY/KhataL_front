import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const SingleHistory = ({ transdata }) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const getColor = (type) => {
    const set_color =
      type === "credit" ? "rgb(246, 40, 23,0.6)" : "rgb(127, 255, 212,0.6)";
    const transStyle = {
      marginTop: "15px",
      backgroundColor: set_color,
      borderRadius: 2,
    };
    return transStyle;
  };

  return (
    <>
      <Container>
        {transdata.map((trans, index) => (
          <Typography key={index} sx={getColor(trans.trans_type)}>
            <Grid container spacing={1} sx={{ ml: 2 , fontSize: 12}}>
              <Grid item xs={3}>
                {formatDate(trans.date)}
              </Grid>
              <Grid item xs={3}>
              {trans.trans_type === "credit" ? "Diye" : "Liye"}
              </Grid>
              <Grid item xs={3}>
                {trans.desc}
              </Grid>
              <Grid item xs={3} sx={{ fontWeight: "15px" }}>
                {trans.trans_type === "credit" ? "-" : "+"} ₹ {trans.amount}
              </Grid>
            </Grid>
          </Typography>
        ))}
      </Container>
    </>
  );
};

export default SingleHistory;
