import { Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Bmi from "../components/Bmi";
import UpdateForm from "../components/UpdateForm";
import UserProfile from "../components/UserProfile";

//////////////////////////////////////

const Home = ({ setAuth }) => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box component="img" src="/static/icon_logo.png" alt="logo" />
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "-1em",
          fontSize: "5rem",
          fontWeight: 700,
          letterSpacing: "-0.5rem",
          display: "inline-block",
          whiteSpace: "nowrap",
          [theme.breakpoints.down("sm")]: {
            fontSize: "4rem",
            letterSpacing: "-0.4rem",
          },
        }}
        gutterBottom
      >
        FitApp
      </Typography>
      <Bmi />
      <UpdateForm />
      <Box>
        <Button
          sx={{ m: 2 }}
          color="error"
          size="large"
          variant="contained"
          onClick={() => {
            setAuth(false);
            localStorage.clear();
          }}
        >
          Log out
        </Button>
        <Button
          sx={{ m: 2 }}
          color="error"
          size="large"
          variant="contained"
          onClick={() => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              email: UserProfile.getEmail(),
              password: UserProfile.getPassword(),
            });

            var requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch(
              "http://localhost:8080/api/users-operations/delete-user",
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
            //
            setAuth(false);
            localStorage.clear();
          }}
        >
          Borrar Cuenta
        </Button>
      </Box>
    </Container>
  );
};

// const comp = () => (
//   <motion.span
//     variants={stagger}
//     initial="initial"
//     animate="animate"
//     style={{
//       textAlign: "center",
//       marginTop: 4,
//       padding: 4,
//       fontSize: "8rem",
//       fontWeight: 500,
//       position: "relative",
//       letterSpacing: "-0.8rem",
//       display: "inline-block",
//       whiteSpace: "nowrap",
//       [theme.breakpoints.down("sm")]: {
//         fontSize: "4rem",
//         letterSpacing: "-0.4rem",
//         paddin: 0,
//       },
//     }}
//   >
//     {[..."Welcome Back"].map((l, i) => (
//       <motion.span variants={animation} key={i}>
//         {l}
//       </motion.span>
//     ))}
//   </motion.span>
// );
export default Home;
