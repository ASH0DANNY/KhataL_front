import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MetaData from "../components/metadata";
import HistoryList from "../components/historyList";
import { ErrorAlert } from "../components/utils/alerts";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const HistoryPage = () => {
  const [muiAlert, setmuiAlert] = useState(false);
  const [allHistory, setAllHistory] = useState([]);

  useEffect(() => {
    const fetchvendors = async () => {
      const tran_history = await fetch(
        `http://localhost:4000/api/khata/transaction/histories`
      );

      await tran_history
        .json()
        .then((response) => {
          const response1 = response;
          const data = response1.History;
          setAllHistory(data);
          console.log("Historydata:" + data);
          console.log(
            "data[0]" + data[0] + "  data[0].vendor_name" + data[0].vendor_name
          );
        })
        .catch((error) => {
          setmuiAlert(true);
          console.log("error:" + error);
        });
    };
    fetchvendors();
  }, []);

  return (
    <>
      <MetaData title="HISTORY" />
      <Navbar />
      {allHistory ? (
        <HistoryList histories={allHistory} />
      ) : (
        <Typography>
          {muiAlert && <ErrorAlert message={"Cannot fetch vendors"} />}
        </Typography>
      )}
      <Footer />
    </>
  );
};

export default HistoryPage;
