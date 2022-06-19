import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import UserProfile from "./UserProfile";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const LoginForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      weight: "",
      height: "",
    },
    onSubmit: () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        name: `${formik.values.name}`,
        lastName: `${formik.values.lastName}`,
        weight: `${formik.values.weight}`,
        height: `${formik.values.height}`,
        email: UserProfile.getEmail(),
        password: UserProfile.getPassword(),
      });
      console.log(raw);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://localhost:8080/api/users-operations/update-user",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          //console.log("OK");
          UserProfile.setName(formik.values.name);
          UserProfile.setLastName(formik.values.lastName);
          UserProfile.setWeight(formik.values.weight);
          UserProfile.setHeight(formik.values.height);
          navigate(from, { replace: true });

          window.location.reload();
        })
        .catch((error) => console.log("error", error));

      // console.log("submitting...");
      //     setTimeout(() => {
      //       console.log("submited!!");
      //       navigate(from, { replace: true });
      //     }, 2000);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              type="text"
              label="Nombre"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              fullWidth
              type="text"
              label="Apellidos"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
            <TextField
              fullWidth
              type="number"
              label="Peso"
              {...getFieldProps("weight")}
              error={Boolean(touched.weight && errors.weight)}
              helperText={touched.weight && errors.weight}
            />
            <TextField
              fullWidth
              type="number"
              label="Altura"
              {...getFieldProps("height")}
              error={Boolean(touched.height && errors.height)}
              helperText={touched.height && errors.height}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            ></Stack>

            <LoadingButton
              sx={{ m: 2 }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {isSubmitting ? "loading..." : "Actualizar datos"}
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;
