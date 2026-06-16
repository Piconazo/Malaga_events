import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
import Notification from "../../components/Notification";
import { getEventById, joinEvent, leaveEvent } from "../../api/eventFetch";
import Footer from "../../components/Footer";

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAttending, setIsAttending] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const tokenData = localStorage.getItem("token");
    if (userData) setUser(JSON.parse(userData));
    if (tokenData) setToken(tokenData);
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const data = await getEventById(id);
      setEvent(data.data);
      if (user) {
        setIsAttending(data.data.attendees.some((a) => a._id === user.id));
      }
    };
    fetchEvent();
  }, [id, user]);

  if (!event) return <p style={{ margin: "30px" }}>Cargando...</p>;

  const handleJoin = async () => {
    const data = await joinEvent(id, token);
    setNotification({
      message: data.message,
      type: data.status === "Success" ? "success" : "error",
    });
    if (data.status === "Success") {
      const updated = await getEventById(id);
      setEvent(updated.data);
      setIsAttending(true);
    }
  };

  const handleLeave = async () => {
    const data = await leaveEvent(id, token);
    setNotification({
      message: data.message,
      type: data.status === "Success" ? "success" : "error",
    });
    if (data.status === "Success") {
      const updated = await getEventById(id);
      setEvent(updated.data);
      setIsAttending(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div>
      <Menu />
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
      <button
        onClick={() => router.push("/events")}
        style={{ margin: "20px 30px" }}
      >
        Volver a eventos
      </button>
      <div className="event-detail">
        <img src={event.image} alt={event.title} className="event-detail-img" />
        <div className="event-detail-body">
          <span className="event-category">{event.category}</span>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.location}</p>
          <p>{formatDate(event.date)}</p>
          <p>{event.price === 0 ? "Entrada gratuita" : `${event.price}€`}</p>
          <p>
            {event.attendees.length}/{event.capacity} asistentes
          </p>
          <p>
            Organizado por: {event.organizer.name} {event.organizer.lastName}
          </p>

          {token &&
            (isAttending ? (
              <button className="btn-danger" onClick={handleLeave}>
                Cancelar inscripción
              </button>
            ) : (
              <button className="btn-primary" onClick={handleJoin}>
                Inscribirme
              </button>
            ))}
          {!token && (
            <p>
              <a href="/login">Inicia sesión</a> para inscribirte
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
