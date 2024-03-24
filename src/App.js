import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import darkTheme from "./theme";
import "./App.css";
import "./styles/Content.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Libros from "./pages/Libros";
import Alumnos from "./pages/Alumnos";
import Alquileres from "./pages/Alquileres";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated')
    // Puedes realizar otras acciones necesarias al cerrar sesión
  };

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route
              path="*"
              element={
                <div className="grid-layout">
                  <Header
                    title={"The Home Academy"}
                    isAuthenticated={isAuthenticated}
                    handleLogout={handleLogout}
                  />
                  <div className="menu">
                    <Menu />
                  </div>
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Navigate to="/Libros" />} />
                      <Route path="/Libros" element={<Libros />} />
                      <Route path="/Alumnos" element={<Alumnos />} />
                      <Route path="/Alquileres" element={<Alquileres />} />
                    </Routes>
                  </div>
                  <div className="footer">
                    <Footer />
                  </div>
                </div>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/Login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/Registro" element={<Registro />} />
            <Route path="*" element={<Navigate to="/Login" />} />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
