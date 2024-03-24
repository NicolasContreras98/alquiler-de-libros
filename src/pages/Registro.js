import { useState } from "react";
import "../styles/Forms.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Select,
  Grid,
  MenuItem,
  Link as MuiLink,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../theme";



function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [rol, setRol] = useState("");

  const navigate = useNavigate();

  const baseURL = "http://localhost:5000/auth/registro";

  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfPass = (e) => {
    setConfPass(e.target.value);
  };

  const onChangeRol = (e) => {
    setRol(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  function onRegister() {
    axios
      .post(baseURL, {
        nombre: nombre,
        email: email,
        contraseña: password,
        rol: rol,
      })
      .then((response) => {
        alert("Registro exitoso")
      });

      navigate('/');
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs" className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h4"
            color="violet"
            className="titulo"
          >
            Formulario de registro
          </Typography>
          <br />
          <TextField
            className="input"
            label="Nombre"
            type="text"
            size="small"
            value={nombre}
            onChange={onChangeNombre}
            fullWidth
          />
          <TextField
            className="input"
            label="Email"
            type="email"
            size="small"
            value={email}
            onChange={onChangeEmail}
            fullWidth
          />
          <TextField
            className="input"
            label="Contraseña"
            type="password"
            size="small"
            value={password}
            onChange={onChangePass}
            fullWidth
          />
          <TextField
            className="input"
            label="Confirmar contraseña"
            type="password"
            size="small"
            value={confPass}
            onChange={onChangeConfPass}
            fullWidth
          />
          {confPass && password !== confPass ? (
            <Typography color="error" variant="body2">
              Las contraseñas no coinciden
            </Typography>
          ) : null}

          <label className="label-rol">Rol</label>
          <Select
            label="Rol"
            id="rol"
            value={rol}
            size="small"
            onChange={onChangeRol}
            fullWidth
          >
            <MenuItem disabled defaultValue="">
              Elija el rol
            </MenuItem>
            <MenuItem value="Usuario">Usuario</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <MuiLink
                fontSize="1.1em"
                component={Link}
                to={"/"}
                variant="body2"
                color="secondary"
              >
                Volver
              </MuiLink>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default Registro;
