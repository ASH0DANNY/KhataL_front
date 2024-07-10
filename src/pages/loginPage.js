import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorAlert } from "../components/utils/alerts";
import { BASE_URL } from "../helper";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setOpen(true);
    } else {
      try {
        const response = await fetch(`${BASE_URL}/api/khata/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        });

        if (response) {
          let check = await response.json();
          console.log("check = " + check);
          console.log("check[0] = " + check[0]);

          if (check.success === true) {
            setIsLoggedIn(true);
            navigate("/home");
            console.log(
              `Logging in with username: ${email} and password: ${password}`
            );
          }
        }
      } catch (error) {
        console.error("Error while login", error);
      }
    }
  };

  return (
    <Container sx={{ padding: 5 }}>
      <Paper elevation={3} sx={{ mt: 5, padding: 5 }}>
        <Container component="main" maxWidth="xs" sx={{ height: "60vh" }}>
          <div>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                sx={{ mb: 5 }}
                onChange={(e) => setPassword(e.target.value)}
              />
              {open ? (
                <Typography>
                  <ErrorAlert message={"Enter all fields"} />
                </Typography>
              ) : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Container>
      </Paper>
    </Container>
  );
};

export default LoginPage;
