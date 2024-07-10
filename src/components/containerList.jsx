import { Container, Grid } from "@mui/material";
import React from "react";
import VendorCard from "./cards/vendorCard";

const ContainerList = ({ vendors }) => {
  return (
    <>
      <Container sx={{ width: "100%", marginBottom: 5 }}>
        <Grid container spacing={2} xs={12} sx={{ width: "100%" }}>
          {vendors.map((vendor, index) => (
            <Grid item key={index} xs={12}>
              <VendorCard vendor={vendor} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ContainerList;
