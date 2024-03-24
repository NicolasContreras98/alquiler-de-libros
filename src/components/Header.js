import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from "@mui/material";
import "../styles/Header.css";

const Header = ({ title, isAuthenticated, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const usuario = localStorage.getItem('usuario')

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Puedes redirigir a la página de perfil o realizar otras acciones aquí
    // navigate('/perfil'); // Ejemplo de redirección a la página de perfil
    handleClose();
  };

  const handleLogoutClick = () => {
    // Llama a la función de logout proporcionada como prop
    handleLogout();
    handleClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="profile-header">
        {<Typography className="titulo-header" variant="h4" color="secondary">
          {title}
        </Typography>}
        {/* ... */}
        {/* Avatar y Menú */}
        {isAuthenticated && (
          <>
            <div className="perfil">
            <Typography className="usuario">{usuario}</Typography>
            <IconButton  onClick={handleMenu} color="inherit">
              <Avatar alt="User Avatar" src="/ruta-de-la-imagen.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  mt: 2,
                  minWidth: 200, // Ajusta el ancho según tus necesidades
                  backgroundColor: "#333", // Cambia el color de fondo según tus necesidades
                  borderRadius: 2, // Ajusta el radio de borde según tus necesidades
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Ajusta la sombra según tus necesidades
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleProfileClick}>Mi Perfil</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Salir</MenuItem>
            </Menu>
            </div>
            
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
