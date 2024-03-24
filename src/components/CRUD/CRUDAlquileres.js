import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";



const CRUDAlquileres = ({
  alquilerSeleccionado,
  setAlquilerSeleccionado,
  reloadAlquileres,
  alquilerActualizado,
  libros, // Lista de libros
  alumnos, // Lista de alumnos
}) => {
  const [nuevoAlquiler, setNuevoAlquiler] = useState({
    idLibro: "", // Campo para seleccionar el libro
    idAlumno: "", // Campo para seleccionar el alumno
    fechaInicio: new Date(), // Fecha de inicio predeterminada
    fechaFin: new Date(), // Fecha de fin predeterminada
  });

  useEffect(() => {
    if (alquilerActualizado) {
      setNuevoAlquiler({
        idLibro: alquilerActualizado.idLibro,
        idAlumno: alquilerActualizado.idAlumno,
        fechaInicio: new Date(alquilerActualizado.fechaInicio),
        fechaFin: new Date(alquilerActualizado.fechaFin),
      });
    } else {
      setNuevoAlquiler({
        idLibro: "",
        idAlumno: "",
        fechaInicio: new Date(),
        fechaFin: new Date(),
      });
    }
  }, [alquilerActualizado]);

  const handleAgregarAlquiler = async () => {
    try {
      if (
        nuevoAlquiler.fechaInicio &&
        nuevoAlquiler.fechaFin &&
        nuevoAlquiler.idAlumno &&
        nuevoAlquiler.idLibro
      ) {
        // Formatea las fechas al formato "AAAA-MM-DD"
        const fechaInicioFormateada = new Date(nuevoAlquiler.fechaInicio)
          .toISOString()
          .split("T")[0];
        const fechaFinFormateada = new Date(nuevoAlquiler.fechaFin)
          .toISOString()
          .split("T")[0];

        const alquilerParaAgregar = {
          fechaInicio: fechaInicioFormateada,
          fechaFin: fechaFinFormateada,
          idAlumno: nuevoAlquiler.idAlumno,
          idLibro: nuevoAlquiler.idLibro,
        };

        const response = await axios.post(
          "http://localhost:5000/api/alquileres",
          alquilerParaAgregar
        );

        if (response.status === 200) {
          handleLimpiarCampos();
          reloadAlquileres();
          alert("Alquiler agregado correctamente");
        }
      } else {
        alert("Por favor, complete todos los campos requeridos.");
        // Puedes mostrar un mensaje de error al usuario para indicar que debe completar los campos select.
      }
    } catch (error) {
      console.error("Error al agregar el alquiler:", error);
    }
  };

  const handleEliminarAlquiler = async () => {
    if (alquilerSeleccionado) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/Alquileres/${alquilerSeleccionado}`
        );

        if (response.status === 204) {
          setAlquilerSeleccionado(null);
          handleLimpiarCampos();
          reloadAlquileres();
          alert("Alquiler eliminado correctamente");
        }
      } catch (error) {
        console.error("Error al eliminar el alquiler:", error);
      }
    }
  };

  const handleActualizarAlquiler = async () => {
    try {
      // Formatea las fechas al formato "AAAA-MM-DD"
      const fechaInicioFormateada = new Date(nuevoAlquiler.fechaInicio)
        .toISOString()
        .split("T")[0];
      const fechaFinFormateada = new Date(nuevoAlquiler.fechaFin)
        .toISOString()
        .split("T")[0];

      const alquilerParaActulizar = {
        fechaInicio: fechaInicioFormateada,
        fechaFin: fechaFinFormateada,
        idAlumno: nuevoAlquiler.idAlumno,
        idLibro: nuevoAlquiler.idLibro,
      };

      await axios.put(
        `http://localhost:5000/api/alquileres/${alquilerSeleccionado}`,
        alquilerParaActulizar
      );

      handleLimpiarCampos();
      reloadAlquileres();
      setAlquilerSeleccionado(null);
      alert("Alquiler actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el alquiler:", error);
    }
  };

  const handleLimpiarCampos = () => {
    setNuevoAlquiler({
      idLibro: "",
      idAlumno: "",
      fechaInicio: new Date(),
      fechaFin: new Date(),
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
        Agregar Alquiler
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            select
            label="Libro"
            value={nuevoAlquiler.idLibro}
            onChange={(e) =>
              setNuevoAlquiler({ ...nuevoAlquiler, idLibro: e.target.value })
            }
          >
            {libros.map((libro) => (
              <MenuItem key={libro.idLibro} value={libro.idLibro}>
                {libro.titulo}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="alumno-input-crud"
            fullWidth
            size="small"
            select
            label="Alumno"
            value={nuevoAlquiler.idAlumno}
            onChange={(e) =>
              setNuevoAlquiler({ ...nuevoAlquiler, idAlumno: e.target.value })
            }
          >
            {alumnos.map((alumno) => (
              <MenuItem key={alumno.idAlumno} value={alumno.idAlumno}>
                {`${alumno.nombre} ${alumno.apellido}`}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de Inicio"
              value={nuevoAlquiler.fechaInicio}
              onChange={(date) =>
                setNuevoAlquiler({ ...nuevoAlquiler, fechaInicio: date })
              }
              textField={<TextField variant="standard" helperText={null} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de Fin"
              value={nuevoAlquiler.fechaFin}
              onChange={(date) =>
                setNuevoAlquiler({ ...nuevoAlquiler, fechaFin: date })
              }
              textField={<TextField variant="standard" helperText={null} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={handleAgregarAlquiler}
          style={{ display: alquilerSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={handleActualizarAlquiler}
          style={{ display: alquilerSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={handleEliminarAlquiler}
          style={{ display: alquilerSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDAlquileres;
