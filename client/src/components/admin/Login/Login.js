import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm } from "react-hook-form";
import Axios from "../../../axios/axios";
import Alert from "@mui/material/Alert";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className="a-link">Your Website</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ admin, url }) {
  const navigate = useNavigate();

  const [invalid, setInvalid] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (loginData) => {
    if (admin) {
      Axios.post(url, loginData)
        .then(({ data }) => {
          if (data.admin) {
            localStorage.setItem("adminToken", data.token);
            navigate("/dashboard");
            return;
          }
          setInvalid(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Axios.post(url, loginData)
        .then(({ data }) => {
          console.log(data);
          if (data.admin) {
            localStorage.setItem("adminToken", data.token);
            navigate("/admin_home");
            return;
          }
          setInvalid(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="admin-login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="custom-main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "22px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <AccountCircleIcon></AccountCircleIcon>
            </Avatar>
            <Typography component="h1" variant="h5" className="login-title">
              Admin Login
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  max: -1,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors?.email?.type === "required" && (
                <p className="validate-error">This field is required</p>
              )}
              {errors?.email?.type === "max" && (
                <p className="validate-error">Invalid email format</p>
              )}
              {errors?.email?.type === "pattern" && (
                <p className="validate-error">Invalid email format</p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors?.password?.type === "required" && (
                <p className="validate-error">This field is required</p>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Box>
          {invalid && (
            <Alert sx={{ mt: 1 }} severity="error">
              Invalid username or password!
            </Alert>
          )}
          <Copyright sx={{ mt: 2, p: 3 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
