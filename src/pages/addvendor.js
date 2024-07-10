import {
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ErrorAlert, SuccessAlert } from "../components/utils/alerts";
import { useNavigate } from "react-router-dom";
import MetaData from "../components/metadata";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { BASE_URL } from "../helper";

const AddNewVendor = () => {
  const [alert, setAlert] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newVDesc, setNewVDesc] = useState("");
  const [newVCategory, setNewVCategory] = useState("");
  const [newImgid, setNewImgid] = useState("");
  const [newImgurl, setNewImgurl] = useState("");
  const [newVBalance, setNewVBalance] = useState(0);

  const newVendorDetails = {
    name: newName,
    desctiption: newVDesc,
    category: newVCategory,
    image: {
      public_id: newImgid,
      url: newImgurl,
    },
    balance: newVBalance,
  };

  const navigate = useNavigate();
  const handleNewCreateBtn = async () => {
    if (
      !newName ||
      !newVDesc ||
      !newVCategory ||
      !newImgid ||
      !newImgurl ||
      !newVBalance
    ) {
      setAlertOpen(true);

      setTimeout(() => {
        setAlertOpen(false);
      }, 2000);

      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/api/khata/vendors/new`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newVendorDetails),
        }
      );

      if (response) {
        setAlert(true);
        console.log("Transaction Updated : " + response.json());

        setTimeout(() => {
          setAlert(false);
          navigate("/home");
          // this.props.history.push('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
    }
  };

  return (
    <>
      <MetaData title="ADD VENDOR" />
      <Navbar />
      <Container>
        <Paper elevation={3} sx={{ m: 2, p: 2 }}>
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    id="v_name"
                    value={newName}
                    onChange={(event) => {
                      setNewName(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    id="v_desc"
                    value={newVDesc}
                    onChange={(event) => {
                      setNewVDesc(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Category"
                    variant="outlined"
                    id="v_category"
                    value={newVCategory}
                    onChange={(event) => {
                      setNewVCategory(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Image Id"
                    variant="outlined"
                    id="image_id"
                    placeholder="Enter Image Id Ex. 123"
                    value={newImgid}
                    onChange={(event) => {
                      setNewImgid(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Image URL"
                    variant="outlined"
                    id="v_image_url"
                    value={newImgurl}
                    onChange={(event) => {
                      setNewImgurl(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Initial Balance"
                    variant="outlined"
                    id="v_balance"
                    value={newVBalance}
                    onChange={(event) => {
                      setNewVBalance(event.target.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  {alertOpen ? (
                    <ErrorAlert message={"Enter all fields"} />
                  ) : null}
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleNewCreateBtn}>
                    Create Vendor
                  </Button>
                </Grid>
              </Grid>
              <Typography>{alert ? <SuccessAlert /> : null}</Typography>
            </Container>
          </FormControl>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default AddNewVendor;
