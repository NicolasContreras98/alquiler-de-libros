import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import darkTheme from "../theme";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg"
import {
  TextField,
  Button,
  Typography,
  Container,
} from "@mui/material";



function Login({ setIsAuthenticated }) {
  const [mensajeError, setMensajeError] = useState("");

  // Función para navegar entre rutas
  const navigate = useNavigate();

  // URL de la API para iniciar sesión
  const baseURL = "http://localhost:5000/auth/login";

 
  // Función para realizar el inicio de sesión
  function onLogin(email, password) {
    axios
      .post(baseURL, {
        email: email,
        contraseña: password,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Inicio de sesión exitoso");

          const usuario = response.data
          
          localStorage.setItem("usuario", usuario.nombre);

          setIsAuthenticated(true);
          // Realiza acciones adicionales aquí si es necesario
          navigate("/"); // Redirige a la página principal después del inicio de sesión
        } else {
          alert("Usuario o Contraseña Incorrecta");
        }
      })
      .catch((error) => {
        // Maneja los errores según el código de estado
        if (error.response && error.response.status === 401) {
          setMensajeError("Contraseña incorrecta");
        } else if (error.response && error.response.status === 404) {
          setMensajeError("Usuario no encontrado");
        } else {
          // Manejar otros errores no específicos
          console.error("Error de inicio de sesión:", error.message);
        }
      });
  }


  // Renderización del componente
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs" className="form-container">
        <form
          className="form"
          onSubmit={(ev) => {
            ev.preventDefault();
            const email = ev.target.email.value;
            const password = ev.target.password.value;
            
            onLogin(email, password);
          }}
        >
          {/* Encabezado del formulario */}
          <img className="logo-login" src={Logo} alt="Logo" />
          <Typography
            className="titulo"
            component="h1"
            variant="h4"
            color="violet"
          >
            Iniciar sesión
          </Typography>

          {/* Campos de entrada para el email, contraseña y confirmación de contraseña */}
          <TextField
            className="input"
            label="Email"
            type="email"
            name="email"
            fullWidth
          />
          <TextField
            className="input"
            label="Contraseña"
            type="password"
            name="password"
            fullWidth
          />

          {/* Mostrar mensajes de error del servidor */}
          {mensajeError !== "" ? (
            <Typography color="error" variant="body2">
              {mensajeError}
            </Typography>
          ) : null}

          {/* Div que contiene los botones de inicio de sesión y registro */}
          <div className="botones-login">
            {/* Botón de inicio de sesión */}
            <Button
              className="boton-login"
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar sesión
            </Button>

            {/* Botón de registro con redirección a la página de registro */}
            <Button
              className="boton-login"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/Registro")}
            >
              Registrarse
            </Button>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
