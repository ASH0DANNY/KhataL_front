import { Container, Grid } from "@mui/material";
import React from "react";
import HistoryCard from "./cards/historyCard";

const HistoryList = ({ histories }) => {
  return (
    <>
      <Container
        sx={{ width: "100%", marginBottom: 5, marginLeft: 0, marginRight: 0 }}
      >
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {histories.map((history, index) => (
            <Grid item key={index} xs={12}>
              <HistoryCard history={history} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HistoryList;
