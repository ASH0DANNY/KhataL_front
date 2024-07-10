import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const linkStyle = { textDecoration: "none", color: "#fff" };

const Navbar = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          height: 70,
          mb: 5,
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link to="/home" style={linkStyle}>
                KHATA DEKHO
              </Link>
            </Grid>
            <Grid item spacing={2} xs={6} sx={{ display: "flex" }}>
              <Typography sx={{ mr: 3 }}>
                <Link to="/home" style={linkStyle}>
                  <HomeIcon />
                </Link>
              </Typography>
              <Typography sx={{ mr: 3 }}>
                <Link to="/new_vendor" style={linkStyle}>
                  <PersonAddIcon />
                </Link>
              </Typography>
              <Typography sx={{ mr: 3 }}>
                <Link to="/history" style={linkStyle}>
                  <HistoryIcon />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
