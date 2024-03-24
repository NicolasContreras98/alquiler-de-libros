import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import "../../styles/ListaLibros.css";



const ListaAlumnos = ({
  alumnoSeleccionado,
  setAlumnoSeleccionado,
  alumnos,
  actualizarAlumno,
}) => {
  const handleCheckboxChange = (idAlumno) => {
    if (alumnoSeleccionado === idAlumno) {
      setAlumnoSeleccionado(null);
      actualizarAlumno(null);
    } else {
      setAlumnoSeleccionado(idAlumno);
      const alumno = alumnos.find((alumno) => alumno.idAlumno === idAlumno);
      actualizarAlumno(alumno);
    }
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
              <TableCell className="table-header">Nombre</TableCell>
              <TableCell className="table-header">Apellido</TableCell>
              <TableCell className="table-header">DNI</TableCell>
              <TableCell className="table-header">Teléfono</TableCell>
              <TableCell className="table-header">Correo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alumnos.map((alumno) => (
              <TableRow key={alumno.idAlumno}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={alumnoSeleccionado === alumno.idAlumno}
                    onChange={() => handleCheckboxChange(alumno.idAlumno)}
                  />
                </TableCell>
                <TableCell>{alumno.nombre}</TableCell>
                <TableCell>{alumno.apellido}</TableCell>
                <TableCell>{alumno.dni}</TableCell>
                <TableCell>{alumno.telefono}</TableCell>
                <TableCell>{alumno.correo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListaAlumnos;
