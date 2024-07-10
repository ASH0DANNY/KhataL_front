import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const cardStyle = {
  width: 150,
  height: 180,
  borderRadius: 8,
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  display: "flex",
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
  transition: "transform 0.2s",
};

const FloatingCard = () => {
  const [mybalance, setMybalance] = useState(0);
  const [newBalance, setNewBalance] = useState(0);
  const [Transtype, setTranstype] = useState("");

  //--Fetch My Balance--
  useEffect(() => {
    const fetchbalance = async () => {
      const getBalance = await fetch(
        "http://localhost:4000/api/khata/mybalance"
      );

      await getBalance
        .json()
        .then((response) => {
          const response2 = response.balance;
          const mydata2 = response2[0].my_balance;
          setMybalance(mydata2);
        })
        .catch((error) => {
          console.log("Fetch balance error:" + error);
        });
    };

    fetchbalance();
  }, [mybalance]);

  //Updating MyBalance
  const UpdateBalance = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/khata/mybalance",
        {
          method: "PUT", // Use PUT for updating data
          headers: { "Content-Type": "application/json" }, // Specify content type
          body: JSON.stringify({
            newBalance: newBalance,
            transType: Transtype,
          }), // Send the updated balance in the request body
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchUpdatedBalance = await fetch(
        "http://localhost:4000/api/khata/mybalance"
      );
      if (!fetchUpdatedBalance.ok) {
        throw new Error(`HTTP error! status: ${fetchUpdatedBalance.status}`);
      }
      const responseData = await fetchUpdatedBalance.json();
      const updatedBalance = responseData.balance[0].my_balance;

      setMybalance(updatedBalance);

      setNewBalance(0);
    } catch (error) {
      console.error("Error updating balance:", error);
      // Handle update errors gracefully, e.g., display an error message to the user
    }
  };

  const handleNewBalanceChange = (event) => {
    // Validate user input (optional, but recommended)
    const parsedValue = event.target.value;
    console.log("parsedValue=" + parsedValue);
    if (!isNaN(parsedValue)) {
      setNewBalance(parsedValue);
      setTranstype("debit");
    } else {
      // Handle invalid input (e.g., display an error message)
      console.error("Invalid new balance entered");
    }
  };

  return (
    <Card sx={cardStyle}>
      <CardContent>
        <Typography variant="h6">My Balance</Typography>
        <Typography
          variant="body2"
          sx={mybalance > 1000 ? { color: "green" } : { color: "red" }}
        >
          ₹ {mybalance}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Enter Amount"
            variant="outlined"
            id="number"
            value={newBalance}
            onChange={handleNewBalanceChange}
          />
          <Button
            variant="contained"
            sx={{ mt: "2px" }}
            onClick={UpdateBalance}
          >
            ADD
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FloatingCard;
