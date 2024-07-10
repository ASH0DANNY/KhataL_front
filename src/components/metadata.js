import React from "react";
import Helmet from "react-helmet";

//Use to show webpage title "<MetaData title="Home Page is Working Fine"/>"
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;