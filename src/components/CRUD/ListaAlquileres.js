import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Checkbox,
  TableRow,
  Paper,
} from "@mui/material";
import "../../styles/ListaLibros.css";



const ListaAlquileres = ({
  alquilerSeleccionado,
  setAlquilerSeleccionado,
  alquileres,
  actualizarAlquiler,
}) => {
  const handleCheckboxChange = (id) => {
    if (alquilerSeleccionado === id) {
      setAlquilerSeleccionado(null);
      actualizarAlquiler(null);
    } else {
      setAlquilerSeleccionado(id);
      const alquiler = alquileres.find((alquiler) => alquiler.id === id);
      actualizarAlquiler(alquiler);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString();
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className="scrollable-table"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <Table className="table-content">
          <TableHead>
            <TableRow>
              <TableCell className="table-header"></TableCell>
              <TableCell className="table-header">Fecha de Inicio</TableCell>
              <TableCell className="table-header">Fecha de Fin</TableCell>
              <TableCell className="table-header">Título del Libro</TableCell>
              <TableCell className="table-header">Nombre del Alumno</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alquileres.map((alquiler) => (
              <TableRow key={alquiler.id}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={alquilerSeleccionado === alquiler.id}
                    onChange={() => handleCheckboxChange(alquiler.id)}
                  />
                </TableCell>
                <TableCell>{formatearFecha(alquiler.fechaInicio)}</TableCell>
                <TableCell>{formatearFecha(alquiler.fechaFin)}</TableCell>
                <TableCell>{alquiler.tituloLibro}</TableCell>
                <TableCell>{alquiler.nombreCompletoAlumno}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListaAlquileres;
