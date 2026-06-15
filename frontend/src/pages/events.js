import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import EventCard from "../components/EventCard";
import { getEvents } from "../api/eventFetch";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    "Música",
    "Deportes",
    "Gastronomía",
    "Arte",
    "Tecnología",
    "Ocio",
    "Cultura",
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents(category, page);
      setEvents(data.data);
      setTotalPages(data.totalPages);
    };
    fetchEvents();
  }, [category, page]);

  return (
    <div>
      <Menu />
      <h1>🎉 Eventos en Málaga</h1>

      <div className="filters">
        <button
          className={!category ? "btn-active" : "btn-filter"}
          onClick={() => setCategory("")}
        >
          Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={category === cat ? "btn-active" : "btn-filter"}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
