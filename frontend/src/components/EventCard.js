import { useRouter } from "next/router";

export default function EventCard({ event }) {
  const router = useRouter();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-card-img" />
      <div className="event-card-body">
        <span className="event-category">{event.category}</span>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">📍 {event.location}</p>
        <p className="event-date">📅 {formatDate(event.date)}</p>
        <div className="event-footer">
          <span className="event-price">
            {event.price === 0 ? "Gratis" : `${event.price}€`}
          </span>
          <span className="event-capacity">
            👥 {event.attendees.length}/{event.capacity}
          </span>
        </div>
        <button
          className="btn-primary"
          onClick={() => router.push(`/event/${event._id}`)}
        >
          Ver detalle →
        </button>
      </div>
    </div>
  );
}
