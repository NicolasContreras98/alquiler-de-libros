import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaLibros from "../components/CRUD/ListaLibros";
import CRUDLibros from "../components/CRUD/CRUDLibros";
import "../styles/Libros.css";



const Libros = () => {
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [libros, setLibros] = useState([]);
  const [libroActualizado, setLibroActualizado] = useState(null); // Estado para el libro seleccionado

  useEffect(() => {
    reloadLibros();
  }, []);

  const reloadLibros = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Libros");
      setLibros(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const actualizarLibro = (libro) => {
    setLibroActualizado(libro); // Almacena el libro seleccionado
  };

  return (
    <>
      <div className="lista">
        <ListaLibros
          libroSeleccionado={libroSeleccionado}
          setLibroSeleccionado={setLibroSeleccionado}
          libros={libros}
          actualizarLibro={actualizarLibro} // Pasa la función de actualización
        />
      </div>
      <div className="CRUD">
        <CRUDLibros
          libroSeleccionado={libroSeleccionado}
          setLibroSeleccionado={setLibroSeleccionado}
          reloadLibros={reloadLibros}
          libroActualizado={libroActualizado} // Pasa el libro seleccionado para edición
        />
      </div>
    </>
  );
};

export default Libros;
