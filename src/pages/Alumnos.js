import React, { useState, useEffect } from "react";
import axios from "axios";
import ListaAlumnos from "../components/CRUD/ListaAlumnos";
import CRUDAlumnos from "../components/CRUD/CRUDAlumnos";
import "../styles/Libros.css";



const Alumnos = () => {
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoActualizado, setAlumnoActualizado] = useState(null);

  useEffect(() => {
    reloadAlumnos();
  }, []);

  const reloadAlumnos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Alumnos");
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error al obtener los alumnos:", error);
    }
  };

  const actualizarAlumno = (alumno) => {
    setAlumnoActualizado(alumno);
  };

  return (
    <>
      <div className="lista">
        <ListaAlumnos
          alumnoSeleccionado={alumnoSeleccionado}
          setAlumnoSeleccionado={setAlumnoSeleccionado}
          alumnos={alumnos}
          actualizarAlumno={actualizarAlumno}
        />
      </div>
      <div className="CRUD">
        <CRUDAlumnos
          alumnoSeleccionado={alumnoSeleccionado}
          setAlumnoSeleccionado={setAlumnoSeleccionado}
          reloadAlumnos={reloadAlumnos}
          alumnoActualizado={alumnoActualizado}
          alumnos={alumnos} // Pasa la lista de alumnos como una prop
        />
      </div>
    </>
  );
};

export default Alumnos;
