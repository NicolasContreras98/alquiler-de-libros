import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaAlquileres from "../components/CRUD/ListaAlquileres";
import CRUDAlquileres from "../components/CRUD/CRUDAlquileres";
import "../styles/Libros.css";



const Alquileres = () => {
  const [alquilerSeleccionado, setAlquilerSeleccionado] = useState(null);
  const [alquileres, setAlquileres] = useState([]);
  const [alquilerActualizado, setAlquilerActualizado] = useState(null);
  const [libros, setLibros] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    reloadAlquileres();
    reloadAlumnos();
    reloadLibros();
  }, []);

  const reloadAlquileres = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Alquileres");
      setAlquileres(response.data);
    } catch (error) {
      console.error("Error al obtener los alquileres:", error);
    }
  };

  const reloadLibros = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Libros");
      setLibros(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  const reloadAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Alumnos");
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };

  const actualizarAlquiler = (alquiler) => {
    setAlquilerActualizado(alquiler);
  };

  return (
    <>
      <div className="lista">
        <ListaAlquileres
          alquilerSeleccionado={alquilerSeleccionado}
          setAlquilerSeleccionado={setAlquilerSeleccionado}
          alquileres={alquileres}
          actualizarAlquiler={actualizarAlquiler}
        />
      </div>

      <div className="CRUD">
        <CRUDAlquileres
          alquilerSeleccionado={alquilerSeleccionado}
          setAlquilerSeleccionado={setAlquilerSeleccionado}
          reloadAlquileres={reloadAlquileres}
          alquilerActualizado={alquilerActualizado}
          libros={libros}
          alumnos={alumnos}
        />
      </div>
    </>
  );
};

export default Alquileres;
