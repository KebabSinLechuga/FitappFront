import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import UserProfile from "./UserProfile";

export default function Bmi() {
  var weight = UserProfile.getWeight();
  var height = UserProfile.getHeight();
  var bmi = (weight / Math.pow(height / 100, 2)).toFixed(1);
  var mensaje = "";
  var mensaje2 = "";

  if (bmi < 16) {
    mensaje = "Delgadez severa";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else if (bmi < 18.5) {
    mensaje = "Delgadez moderada";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else if (bmi < 25) {
    mensaje = "Peso normal";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else if (bmi < 30) {
    mensaje = "Sobrepeso";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else if (bmi < 35) {
    mensaje = "Obesidad grado I";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else if (bmi < 40) {
    mensaje = "Obesidad grado II";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  } else {
    mensaje = "Obesidad grado III";
    mensaje2 =
      "Aquellas personas que mantienen un peso óptimo y saludable no precisan de intervención terapéutica, pero es importante recomendar un mantenimiento de hábitos saludables de dieta y ejercicio a  aquellas que se posicionan en la franja más alta del intervalo.";
  }

  return (
    <>
      <div>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: 700,
          }}
          gutterBottom
        >
          Hola {UserProfile.getName()} {UserProfile.getLastName()} segun tu
          altura {UserProfile.getHeight()} cm y tu peso{" "}
          {UserProfile.getWeight()} kg tu imc es de:
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: 700,
            letterSpacing: "-0.3rem",
            display: "inline-block",
            whiteSpace: "nowrap",
            align: "center",
          }}
          gutterBottom
        >
          I M C ==&gt; {bmi}
        </Typography>
        <Box>
          <Box component="img" src="/static/tablaimc.png" alt="logo" />
        </Box>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "3rem",
            fontWeight: 700,
            letterSpacing: "0.2rem",
            display: "inline-block",
            whiteSpace: "nowrap",
            align: "center",
          }}
          gutterBottom
        >
          {mensaje}
        </Typography>
        <p>{mensaje2}</p>
      </div>
    </>
  );
}
