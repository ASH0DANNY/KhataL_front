import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = { textDecoration: "none", color: "#fff" };

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
        }}
      >
        <Typography variant="body1" align="center" sx={{ marginBottom: 3 }}>
          © {new Date().getFullYear()} Khata Manage
        </Typography>
        <Typography variant="body2" color="#fff" align="center">
          {/* Add your footer links here */}
          <Link to="/" style={linkStyle}>HOME</Link> {" | "}
          <Link to="/history" style={linkStyle}>HISTORY</Link>
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
