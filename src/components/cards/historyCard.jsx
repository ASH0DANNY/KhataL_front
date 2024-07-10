import { Card, CardContent, Grid } from "@mui/material";
import React from "react";

const HistoryCard = ({ history }) => {
  let set_color = "#000";
  history.trans_type === "credit"
    ? (set_color = "rgb(246, 40, 23,0.6)")
    : (set_color = "rgb(127, 255, 212,0.6)");

  const cardRoot = {
    maxWidth: "100%",
    marginTop: "20px",
    height: "70px",
    backgroundColor: set_color,
    fontSize: 13,
    // backgroundColor: `linear-gradient(to right,white, ${set_color} )`,
    // background-image: linear-gradient(to right, red , yellow);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Card sx={cardRoot} elevation={4}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              {formatDate(history.date)}
            </Grid>
            <Grid item xs={3}>
              {history.vendor_name}
            </Grid>
            <Grid item xs={3}>
              {history.trans_desc}
            </Grid>
            <Grid item xs={3} sx={{ fontWeight: "15px" }}>
              {history.trans_type === "credit" ? "-" : "+"} ₹{" "}
              {history.trans_amount}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default HistoryCard;
