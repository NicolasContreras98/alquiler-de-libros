import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";



const CRUDAlumnos = ({
  alumnoSeleccionado,
  setAlumnoSeleccionado,
  reloadAlumnos,
  alumnoActualizado,
  alumnos,
}) => {

  const [nuevoAlumno, setNuevoAlumno] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
    if (alumnoActualizado) {
      setNuevoAlumno({
        nombre: alumnoActualizado.nombre,
        apellido: alumnoActualizado.apellido,
        dni: alumnoActualizado.dni,
        telefono: alumnoActualizado.telefono,
        correo: alumnoActualizado.correo,
      });
    } else {
      setNuevoAlumno({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        correo: "",
      });
    }
  }, [alumnoActualizado]);

  const handleAgregarAlumno = async () => {
    try {
      if (
        nuevoAlumno.nombre &&
        nuevoAlumno.apellido &&
        nuevoAlumno.dni &&
        nuevoAlumno.fechaNacimiento
      ) {
        if (alumnos.some((alumno) => alumno.dni.toString() === nuevoAlumno.dni.toString())) {
          alert("Este DNI ya existe en la lista de alumnos.");
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/Alumnos",
            nuevoAlumno
          );
  
          if (response.status === 200) {
            handleLimpiarCampos();
            reloadAlumnos();
            alert("Alumno agregado correctamente");
          }
        }
      } else {
        alert("Por favor, complete todos los campos requeridos.");
        // Puedes mostrar un mensaje de error al usuario para indicar que debe completar todos los campos requeridos.
      }
    } catch (error) {
      console.error("Error al agregar el alumno:", error);
    }
  };
  

  const handleEliminarAlumno = async () => {
    if (alumnoSeleccionado) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/Alumnos/${alumnoSeleccionado}`
        );

        if (response.status === 204) {
          setAlumnoSeleccionado(null);
          handleLimpiarCampos();
          reloadAlumnos();
          alert("Alumno eliminado correctamente");
        }
      } catch (error) {
        console.error("Error al eliminar el alumno:", error);
      }
    }
  };

  const handleActualizarAlumno = async () => {
    if (alumnoSeleccionado) {
      try {
        const alumnoParaActualizar = {
          idAlumno: alumnoSeleccionado,
          nombre: nuevoAlumno.nombre,
          apellido: nuevoAlumno.apellido,
          dni: nuevoAlumno.dni,
          telefono: nuevoAlumno.telefono,
          correo: nuevoAlumno.correo,
        };

        await axios.put(
          `http://localhost:5000/api/Alumnos/${alumnoSeleccionado}`,
          alumnoParaActualizar
        );

        handleLimpiarCampos();
        setAlumnoSeleccionado(null);
        reloadAlumnos();
        alert("Alumno actualizado correctamente");
      } catch (error) {
        console.error("Error al actualizar el alumno:", error);
      }
    }
  };

  const handleLimpiarCampos = () => {
    setNuevoAlumno({
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      correo: "",
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
        Agregar Alumno
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Nombre"
            value={nuevoAlumno.nombre}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, nombre: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Apellido"
            value={nuevoAlumno.apellido}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, apellido: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            size="small"
            label="DNI"
            value={nuevoAlumno.dni}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, dni: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            size="small"
            label="Teléfono"
            value={nuevoAlumno.telefono}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, telefono: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Correo"
            value={nuevoAlumno.correo}
            onChange={(e) =>
              setNuevoAlumno({ ...nuevoAlumno, correo: e.target.value })
            }
          />
        </Grid>
      </Grid>
      <Box mt={2} className="Contenedor-CRUD-Button">
        <Button
          className="CRUD-Button"
          variant="contained"
          color="secondary"
          onClick={handleAgregarAlumno}
          style={{ display: alumnoSeleccionado ? "none" : "block" }}
        >
          Agregar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="primary"
          onClick={handleActualizarAlumno}
          style={{ display: alumnoSeleccionado ? "block" : "none" }}
        >
          Actualizar
        </Button>
        <Button
          className="CRUD-Button"
          variant="contained"
          color="error"
          onClick={handleEliminarAlumno}
          style={{ display: alumnoSeleccionado ? "block" : "none" }}
        >
          Eliminar
        </Button>
      </Box>
    </Paper>
  );
};

export default CRUDAlumnos;
