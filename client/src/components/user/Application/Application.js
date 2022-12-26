import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "../../../axios/axios";
import DescriptionIcon from "@mui/icons-material/Description";
import "./Application.css";

const theme = createTheme();

export default function Application({ url }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (registerData) => {
    registerData &&
      Axios.post(url, registerData).then(({ data }) => {
        if (data.status === "ok") {
          navigate("/home")
          return;
        }
        navigate("/");
      });
  };

  return (
    <div className="application">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs" className="custom-main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "22px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
              <DescriptionIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              className="application-title"
            >
              Application
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="companyName"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    autoFocus
                    {...register("companyName", {
                      required: true,
                      maxLength: 20,
                      pattern:
                        /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
                    })}
                  />
                  {errors?.companyName?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.companyName?.type === "maxLength" && (
                    <p className="validate-error">
                      Full name cannot exceed 20 characters
                    </p>
                  )}
                  {errors?.companyName?.type === "pattern" && (
                    <p className="validate-error">
                      Alphabetical characters only
                    </p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    autoComplete="city"
                    {...register("city", {
                      required: true,
                    })}
                  />
                  {errors?.city?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="state"
                    label="State"
                    name="state"
                    autoComplete="state"
                    {...register("state", {
                      required: true,
                    })}
                  />
                  {errors?.state?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    {...register("address", {
                      required: true,
                    })}
                  />
                  {errors?.address?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="mobile"
                    label="Mobile Number"
                    name="mobile"
                    autoComplete="mobile"
                    {...register("mobile", {
                      required: true,
                      pattern:
                        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                      maxLength: 10,
                    })}
                  />
                  {errors?.mobile?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.mobile?.type === "pattern" && (
                    <p className="validate-error">
                      Invalid mobile number format
                    </p>
                  )}
                  {errors?.mobile?.type === "maxLength" && (
                    <p className="validate-error">
                      Number contains only 10 numbers
                    </p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="companyType"
                    label="Company Type"
                    name="companyType"
                    autoComplete="companyType"
                    {...register("companyType", {
                      required: true,
                    })}
                  />
                  {errors?.companyType?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="revenue"
                    label="Company Revenue"
                    name="revenue"
                    autoComplete="revenue"
                    {...register("revenue", {
                      required: true,
                      pattern: /^[0-9]*$/,
                    })}
                  />
                  {errors?.revenue?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                  {errors?.revenue?.type === "pattern" && (
                    <p className="validate-error">Invalid number format</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="desCompany"
                    label="Describe Your Company"
                    name="desCompany"
                    autoComplete="desCompany"
                    {...register("desCompany", {
                      required: true,
                    })}
                  />
                  {errors?.desCompany?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="desTeam"
                    label="Describe Your Team"
                    name="desTeam"
                    autoComplete="desTeam"
                    {...register("desTeam", {
                      required: true,
                    })}
                  />
                  {errors?.desTeam?.type === "required" && (
                    <p className="validate-error">This field is required</p>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SUBMIT
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
