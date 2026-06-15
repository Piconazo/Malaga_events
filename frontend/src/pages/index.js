import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import EventCard from "../components/EventCard";
import { getEvents } from "../api/eventFetch";

export default function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getEvents();
      setEvents(data.data.slice(0, 3));
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <Menu />
      <section className="hero">
        <h1>Descubre los mejores eventos de Málaga 🌴</h1>
        <p>Conciertos, deportes, gastronomía, cultura y mucho más</p>
        <button className="btn-primary" onClick={() => router.push("/events")}>
          Ver todos los eventos
        </button>
      </section>

      <section className="featured">
        <h2>Eventos destacados</h2>
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}
