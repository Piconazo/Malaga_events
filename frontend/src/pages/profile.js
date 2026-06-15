import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../components/Menu";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  if (!user) return <p>Cargando...</p>;

  return (
    <div>
      <Menu />
      <div className="form-container">
        <h1>Mi Perfil</h1>
        <div className="profile-avatar">
          <img src={user.avatar} alt="avatar" />
        </div>
        <div className="profile-info">
          <p>
            <strong>Nombre:</strong> {user.name} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong> {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
