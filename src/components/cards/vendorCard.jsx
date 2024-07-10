import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ErrorAlert, SuccessAlert } from "../utils/alerts";
import SingleHistory from "./singleHistory";

const VendorCard = ({ vendor }) => {
  const [updateAlert, setupdateAlert] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [transAmount, setTransAmount] = useState(0);
  const [transDesc, setTransDesc] = useState("");
  const [Transtype, setTranstype] = useState("");
  const [historyBody, setHistoryBody] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  // const [transLength, setTransLength] = useState(1);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // const linkStyle = { textDecoration: "none", color: "#fff" };

  // const updateDimensions = () => {
  //   setScreenWidth(window.innerWidth);
  //   setScreenHeight(window.innerHeight);
  // };

  const cardRoot = {
    maxWidth: "100%",
    marginTop: "20px",
    height: historyBody ? "60vh" : "30vh" ,
  };

  const handleUpdateBtn = async (vendorId) => {
    console.log("vendorId" + vendorId);

    if (!Transtype || !transDesc ) {
      setAlertOpen(true);

      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);

      return;
    }

    const vendorTransBody = {
      amount: transAmount,
      desc: transDesc,
      type: Transtype,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/khata/vendor/${vendorId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vendorTransBody),
        }
      );

      if (response) {
        console.log("Transaction Updated : " + response.json());
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }

    //Updating My Balance
    // const UpdateMyBalance = async ({ newTransAmount }) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/khata/mybalance",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newBalance: transAmount,
            transType: Transtype,
          }),
        }
      );

      if (response) {
        console.log("Balance Updated  " + response.json().balance);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
    // };

    setupdateAlert(true);
    setTimeout(() => {
      setupdateAlert(false);
      //After excuting above tasks reload page
      window.location.reload();
    }, 2000);
  };

  const getSingleHistory = async (vendorId) => {
    historyBody ? setHistoryBody(false) : setHistoryBody(true);

    try {
      const response = await fetch(
        `http://localhost:4000/api/khata/vendor/${vendorId}`
      );

      if (response) {
        const data = await response.json();
        const data2 = await data.vendorDetails;
        setAllTransaction(data2.transaction);
        // setTransLength(data2.transaction.length);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <>
      <Card sx={cardRoot} elevation={4}>
        <CardContent>
          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item xs={12} md={4}>
              {vendor.name}
            </Grid>

            <Grid item xs={4}>
              ₹ {vendor.balance}
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                label="Enter Amount"
                variant="outlined"
                value={transAmount}
                sx={{ width: "50%", height: "80%" }}
                onChange={(event) => {
                  setTransAmount(event.target.value);
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} sx={{ mb: 1 }}>
            <Grid item md={2} xs={12}>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="TransType"
                placeholder="TransType"
                value={Transtype}
                sx={{ width: "100%", height: "80%" }}
                onChange={(event) => {
                  setTranstype(event.target.value);
                }}
              >
                <MenuItem value="">
                  <em>-None-</em>
                </MenuItem>
                <MenuItem value={"debit"}>Liye(Debit)</MenuItem>
                <MenuItem value={"credit"}>Diye(Credit)</MenuItem>
              </Select>
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                placeholder="Enter desc..."
                variant="outlined"
                value={transDesc}
                sx={{ width: "80%", height: "80%" }}
                onChange={(event) => {
                  setTransDesc(event.target.value);
                }}
              />
            </Grid>

            <Grid item md={2} xs={12}>
              {(updateAlert && <SuccessAlert message={"Balance Updated"} />) ||
                (alertOpen && <ErrorAlert message={"Enter all fields"} />)}
            </Grid>

            <Grid item md={4} xs={12}>
              <Button
                variant="contained"
                key={vendor._id}
                onClick={() => handleUpdateBtn(vendor._id)}
              >
                Update
              </Button>
              {vendor.id}
            </Grid>
          </Grid>
          <Typography sx={{ mr: 3, float: "right" }}>
            {!historyBody ? (
              <Button
                variant="outlined"
                onClick={() => getSingleHistory(vendor._id)}
              >
                History
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => setHistoryBody(false)}>
                Close
              </Button>
            )}
          </Typography>

          {historyBody ? (
            <Container sx={{ overflow: "hidden" }}>
              <SingleHistory transdata={allTransaction} />
            </Container>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
};

export default VendorCard;
