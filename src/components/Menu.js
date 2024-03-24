  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import List from "@mui/material/List";
  import ListItem from "@mui/material/ListItem";
  import ListItemButton from "@mui/material/ListItemButton";
  import ListItemText from "@mui/material/ListItemText";
  import "../styles/Menu.css";



  function Menu() {
    const [selectedButton, setSelectedButton] = useState("/Libros");

    const handleButtonSelect = (to) => {
      setSelectedButton(to);
    };

    return (
      <List className="horizontal-menu-header">
        <ListItem>
          <ListItemButton
            component={Link}
            to="/Libros"
            className={`menu-button ${selectedButton === "/Libros" ? "selected" : ""}`}
            onClick={() => handleButtonSelect("/Libros")}
          >
            <ListItemText className="titulo-button-menu" primary="Libros" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/Alumnos"
            className={`menu-button ${selectedButton === "/Alumnos" ? "selected" : ""}`}
            onClick={() => handleButtonSelect("/Alumnos")}
          >
            <ListItemText className="titulo-button-menu" primary="Alumnos" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            component={Link}
            to="/Alquileres"
            className={`menu-button ${selectedButton === "/Alquileres" ? "selected" : ""}`}
            onClick={() => handleButtonSelect("/Alquileres")}
          >
            <ListItemText className="titulo-button-menu" primary="Alquileres" />
          </ListItemButton>
        </ListItem>
      </List>
    );
  }

  export default Menu;
