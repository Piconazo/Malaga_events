export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>MálagaEvents</h3>
          <p>La plataforma de eventos de Málaga</p>
        </div>
        <div className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li>
              <a href="/">Inicio</a>
            </li>
            <li>
              <a href="/events">Eventos</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contacto</h4>
          <p>Calle Larios 1, Málaga</p>
          <p>info@malagaevents.com</p>
          <p>951 234 567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MálagaEvents. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
