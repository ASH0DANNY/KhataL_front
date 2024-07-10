import React, { useEffect, useState } from "react";
import MetaData from "../components/metadata";
import { Button, Container, Paper, Typography } from "@mui/material";
import ContainerList from "../components/containerList";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../components/utils/alerts";
import FloatingCard from "../components/floatingBalanceCard";
import userLoggedIn from "../pages/loginPage";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { BASE_URL } from "../helper";

let buttonStyle = {
  margin: 2,
};

const HomePage = ({ isLoggedin }) => {
  const [muiAlert, setmuiAlert] = useState(false);

  // const vendors = [
  //   {
  //     name: "John Wick",
  //     desctiption: "This is John Wick",
  //     category: "Actor",
  //     image: {
  //       public_id: "123456",
  //       url: "url1.com",
  //     },
  //     balance: 4000,
  //     transaction: [
  //       {
  //         public_id: "32111",
  //         amount: 300,
  //         desc: "Books and Stationary",
  //       },
  //       {
  //         public_id: "43A36G",
  //         amount: 450,
  //         desc: "Books and Chocklates",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Harry Potter",
  //     desctiption: "This is Harry Potter",
  //     category: "Actor",
  //     image: {
  //       public_id: "123333",
  //       url: "url2.com",
  //     },
  //     balance: 700,
  //     transaction: [
  //       {
  //         public_id: "11111",
  //         amount: 500,
  //         desc: "Toy and Stationary",
  //       },
  //       {
  //         public_id: "43A36G",
  //         amount: 200,
  //         desc: "Ice Cream and Chocklates",
  //       },
  //     ],
  //   },
  // ];

  const navigate = useNavigate();
  const [allvendors, setAllvendors] = useState([]);

  console.log("Get Vendors2 is Clicked!!");
  useEffect(() => {
    const fetchvendors = async () => {
      const response2 = await fetch(`${BASE_URL}/api/khata/vendors`);

      await response2
        .json()
        .then((response) => {
          const response1 = response;
          const mydata1 = response1.Vendors;
          setAllvendors(mydata1);
        })
        .catch((error) => {
          setmuiAlert(true);
          console.log("error:" + error);
        });
    };
    fetchvendors();
  }, []);

  const goToHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <MetaData title="HOME PAGE" />
      {!userLoggedIn ? (
        navigate("/")
      ) : (
        <>
          <Navbar />
          <FloatingCard />

          <Container>
            <Paper elevation={3} sx={{m:0, p:0, width:"100%"}}>
              {Array.isArray(allvendors) && allvendors.length > 0 ? (
                <ContainerList vendors={allvendors} />
              ) : (
                <Typography component="p">
                  passed parameter is not in array
                </Typography>
              )}
              <Typography component="p">
                See all history :
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={goToHistory}
                >
                  All History
                </Button>
              </Typography>
              <Typography>
                {muiAlert && <ErrorAlert message={"Cannot fetch vendors"} />}
              </Typography>
            </Paper>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
