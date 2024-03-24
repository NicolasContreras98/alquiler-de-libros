import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../../styles/CRUDLibros.css";



const CRUDLibros = ({
  libroSeleccionado,
  setLibroSeleccionado,
  reloadLibros,
  libroActualizado,
}) => {
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    autor: "",
    genero: "",
    fechaDeSalida: new Date(),
  });

  useEffect(() => {
    // Cuando el libroActualizado cambia, cargar los datos del libro en los campos de texto
    if (libroActualizado) {
      setNuevoLibro({
        titulo: libroActualizado.titulo,
        autor: libroActualizado.autor,
        genero: libroActualizado.genero,
        fechaDeSalida: new Date((parseInt(libroActualizado.fechaDeSalida)+1).toString()) ,
      });
    } else {
      // Si no hay libro seleccionado, limpia los campos
      setNuevoLibro({
        titulo: "",
        autor: "",
        genero: "",
        fechaDeSalida: new Date(),
      });
    }
  }, [libroActualizado]);
  const handleAgregarLibro = async () => {
    try {
      // Verifica si los campos obligatorios se han completado
      if (
        nuevoLibro.titulo &&
        nuevoLibro.autor &&
        nuevoLibro.genero &&
        nuevoLibro.fechaDeSalida
      ) {
  
        // Crear un nuevo objeto de libro con la fecha formateada
        const libroParaAgregar = {
          titulo: nuevoLibro.titulo,
          autor: nuevoLibro.autor,
          genero: nuevoLibro.genero,
          fechaDeSalida: nuevoLibro.fechaDeSalida.getFullYear() // Convierte el año en una cadena
        };
  
        // Realizar una solicitud POST para agregar un nuevo libro
        const response = await axios.post(
          "http://localhost:5000/api/Libros",
          libroParaAgregar
        );
  
        if (response.status === 200) {
          // Limpia los campos después de agregar el libro
          handleLimpiarCampos();
          // Recargar la lista de libros
          reloadLibros();
          alert("Libro agregado correctamente");
        }
      } else {
        alert("Por favor, complete todos los campos requeridos.");
        // Puedes mostrar un mensaje de error al usuario para indicar que debe completar todos los campos requeridos.
      }
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  };
  

  const handleEliminarLibro = async () => {
    if (libroSeleccionado) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/Libros/${libroSeleccionado}`
        );

        if (response.status === 204) {
          //Limpiar el libro seleccionado después de la eliminación
          setLibroSeleccionado(null);
          // Limpia los campos después de eliminar el libro
          handleLimpiarCampos();
          //Recargar la lista de libros
          reloadLibros();
          alert("Libro eliminado correctamente");
        }
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
      }
    }
  };

  const handleActualizarLibro = async () => {
    if (libroSeleccionado) {
      try {
        const year = nuevoLibro.fechaDeSalida.getFullYear();

        const libroParaActualizar = {
          idLibro: libroSeleccionado,
          titulo: nuevoLibro.titulo,
          autor: nuevoLibro.autor,
          genero: nuevoLibro.genero,
          fechaDeSalida: year,
        };

        await axios.put(
          `http://localhost:5000/api/Libros/${libroSeleccionado}`,
          libroParaActualizar
        );

        // Recargar la lista de libros
        await reloadLibros();

        // Limpiar los campos después de la actualización
        handleLimpiarCampos();

        // Limpiar la selección del libro actualizado
        setLibroSeleccionado(null);

        alert("Libro actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el libro:", error);
      }
    }
  };


  const handleLimpiarCampos = () => {
    setNuevoLibro({
      titulo: "",
      autor: "",
      genero: "",
      fechaDeSalida: new Date(),
    });
  };

  return (
    <Paper elevation={3} sx={{ p: 2, bgcolor: "background.paper" }}>
      <Typography
        className="titulo-crud"
        variant="h6"
        component="div"
        sx={{ color: "text.primary" }}
      >
        Agregar Libro
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            value={nuevoLibro.titulo}
            onChange={(e) =>
              setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Autor"
            value={nuevoLibro.autor}
            onChange={(e) =>
              setNuevoLibro({ ...nuevoLibro, autor: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Género"
            value={nuevoLibro.genero}
            onChange={(e) =>
              setNuevoLibro({ ...nuevoLibro, genero: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker  
              views={["year"]}
              label="Año de salida"
              value={nuevoLibro.fechaDeSalida}
              onChange={(date) => setNuevoLibro({...nuevoLibro, fechaDeSalida: date})}
              textField={
                <TextField
                  variant="standard" // o el variant que desees
                  helperText={null}
                />
              }
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={handleAgregarLibro}
          style={{ display: libroSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={handleActualizarLibro}
          style={{ display: libroSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={handleEliminarLibro}
          style={{ display: libroSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDLibros;
