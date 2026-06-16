import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Menu() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    router.push("/login");
  };

  return (
    <nav>
      <div className="nav-brand">
        <Link href="/">MálagaEvents</Link>
      </div>
      <div className="nav-links">
        <Link href="/">Inicio</Link>
        <Link href="/events">Eventos</Link>
        <Link href="/contact">Contacto</Link>
        {token ? (
          <>
            <Link href="/profile">Mi Perfil</Link>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar sesión</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
