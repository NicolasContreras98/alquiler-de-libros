import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import Logo from '../assets/Logo.jpg';
import "../styles/Footer.css";

const Footer = () => {
  return (
    <>
      <img className="img-logo" src={Logo} alt="Logo" />

      <p className="copyright">
        <FontAwesomeIcon icon={faCopyright} />
        &nbsp;{new Date().getFullYear()} The Home Academy. Todos los derechos
        reservados. by Nicolás Contreras
      </p>
    </>
  );
};

export default Footer;
