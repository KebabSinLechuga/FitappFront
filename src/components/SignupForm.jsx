import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import UserProfile from "./UserProfile";
/////////////////////////////////////////////////////////////
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

const SignupForm = ({ setAuth }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Muy corto!")
      .max(50, "Muy Largo!")
      .required("Nombre requerido"),
    lastName: Yup.string()
      .min(2, "Muy corto!")
      .max(50, "Muy Largo!")
      .required("Apellido requerido"),
    email: Yup.string()
      .email("Intorduce un email valido")
      .required("El Email es requerido"),
    password: Yup.string().required("La constraseña es requerida"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "Pedro",
      lastName: "Palotes",
      email: "test@gmail.com",
      password: "pwd",
      peso: "75",
      altura: "170",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        id: "",
        name: `${formik.values.firstName}`,
        lastName: `${formik.values.lastName}`,
        email: `${formik.values.email}`,
        password: `${formik.values.password}`,
        weight: `${formik.values.peso}`,
        height: `${formik.values.altura}`,
      });
      console.log(raw);
      console.log("PESOGORDO: " + formik.values.peso);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      ///////////////////////////////////////////////////////////////
      UserProfile.setName(formik.values.firstName);
      UserProfile.setLastName(formik.values.lastName);
      UserProfile.setEmail(formik.values.email);
      UserProfile.setPassword(formik.values.password);
      UserProfile.setWeight(formik.values.peso);
      UserProfile.setHeight(formik.values.altura);
      fetch(
        "http://localhost:8080/api/users-operations/create-user",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          console.log(result);

          if (result === raw) {
            console.log("OK");

            UserProfile.setName(formik.values.firstName);
            UserProfile.setLastName(formik.values.lastName);
            UserProfile.setEmail(formik.values.email);
            UserProfile.setPassword(formik.values.password);
            UserProfile.setWeight(formik.values.peso);
            UserProfile.setHeight(formik.values.altura);

            setAuth(true);
            navigate("/", { replace: true });
          } else {
            //console.log("NO OK");
            alert("Error");
            console.log(result);
            window.location.reload();
          }
        })
        .catch((error) => console.log("error", error));

      //setAuth(true);
      //navigate("/", { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            component={motion.div}
            initial={{ opacity: 0, y: 60 }}
            animate={animate}
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <TextField
              fullWidth
              label="Nombre"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Apellidos"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <Stack
            spacing={3}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Icon
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              type="number"
              label="Peso"
              {...getFieldProps("peso")}
              error={Boolean(touched.peso && errors.peso)}
              helperText={touched.peso && errors.peso}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
            <TextField
              fullWidth
              type="number"
              label="Altura"
              {...getFieldProps("altura")}
              error={Boolean(touched.altura && errors.altura)}
              helperText={touched.altura && errors.altura}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Stack>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              REGISTRARSE
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;
