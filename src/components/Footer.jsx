import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaSpotify } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-container">

        {/* Redes sociales */}
        <div className="footer-social">
          <FaFacebookF />
          <FaInstagram />
          <FaSpotify />
        </div>

        {/* Columna 1 */}
        <div className="footer-column">
          <p>CONÓCENOS</p>
          <p>ENCUÉNTRANOS</p>
          <p>INFORME 2024</p>
          <p>TARIFAS</p>
          <p>BENEFICIOS</p>
          <p>TRABAJA CON NOSOTROS</p>
          <p>TRANSPARENCIA Y ACCESO A LA INFORMACIÓN PÚBLICA</p>
          <p>NUESTRAS POLÍTICAS</p>
          <p>TÉRMINOS Y CONDICIONES</p>
          <p>NOTIFICACIONES JUDICIALES</p>
        </div>

        {/* Columna 2 */}
        <div className="footer-column">
          <p>TE ACOMPAÑAMOS</p>
          <p>ATENCIÓN Y SERVICIO A LA CIUDADANÍA</p>
          <p>PRESENTAR UNA PETICIÓN U OBSERVACIÓN SOBRE LOS SERVICIOS</p>
          <p>CARTA DERECHOS Y DEBERES AFILIADOS</p>
          <p>NUESTROS COMPROMISOS FRENTE A LA ÉTICA Y EL GOBIERNO CORPORATIVO</p>
          <p>AYÚDANOS A MEJORAR, CUÉNTANOS TU EXPERIENCIA</p>
          <p>MAPA DE SITIO</p>
        </div>

        {/* Columna 3 */}
        <div className="footer-column footer-contact">
          <p className="title">CENTRAL DE LLAMADAS</p>
          <p>PARA LOS DEMÁS MUNICIPIOS Y REGIONES SIN COSTO</p>
          <p className="phone">01 8000 415 455</p>
          <p>VALLE DE ABURRÁ Y ORIENTE CERCANO</p>
          <p className="phone">604 360 70 80</p>
        </div>

      </div>

      <div className="footer-bottom">
        DERECHOS RESERVADOS © 2026
      </div>

    </footer>
  );
};

export default Footer;