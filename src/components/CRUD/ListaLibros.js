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



const ListaLibros = ({
  libroSeleccionado,
  setLibroSeleccionado,
  libros,
  actualizarLibro, // Recibe la función de actualización
}) => {
  const handleCheckboxChange = (idLibro) => {
    if (libroSeleccionado === idLibro) {
      // Desmarca el libro y establece libroActualizado en null
      setLibroSeleccionado(null);
      actualizarLibro(null);
    } else {
      setLibroSeleccionado(idLibro);
      const libro = libros.find((libro) => libro.idLibro === idLibro);
      actualizarLibro(libro);
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
              <TableCell className="table-header">Título</TableCell>
              <TableCell className="table-header">Autor</TableCell>
              <TableCell className="table-header">Género</TableCell>
              <TableCell className="table-header">Fecha de Salida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro) => (
              <TableRow key={libro.idLibro}>
                <TableCell>
                  <Checkbox
                    className="checkbox"
                    checked={libroSeleccionado === libro.idLibro}
                    onChange={() => handleCheckboxChange(libro.idLibro)}
                  />
                </TableCell>
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.genero}</TableCell>
                <TableCell>
                  {new Date(libro.fechaDeSalida).getFullYear()+1}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ListaLibros;
