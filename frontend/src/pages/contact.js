import Menu from "../components/Menu";

export default function Contact() {
  return (
    <div>
      <Menu />
      <div className="form-container">
        <h1>📍 Contacto</h1>
        <div className="contact-card">
          <h2>🌴 MálagaEvents</h2>
          <p>📍 Calle Larios 1, Málaga</p>
          <p>🏙️ Málaga, España</p>
          <p>📞 951 234 567</p>
          <p>📧 info@malagaevents.com</p>
        </div>
        <div className="contact-card">
          <h2>👨‍💻 Desarrollado por</h2>
          <p>
            <strong>Nombre:</strong> Sergio Picón
          </p>
          <p>
            <strong>Ciudad:</strong> Málaga
          </p>
          <p>
            <strong>GitHub:</strong> github.com/Piconazo
          </p>
        </div>
      </div>
    </div>
  );
}
