import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, []);

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setNotification({
        message: "Las contraseñas no coinciden",
        type: "error",
      });
      return;
    }
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:9000/user/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      }),
    });
    const data = await response.json();
    setNotification({
      message: data.message,
      type: data.status === "Success" ? "success" : "error",
    });
    if (data.status === "Success") {
      setShowPasswordForm(false);
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:9000/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: avatarUrl }),
    });
    const data = await response.json();
    if (data.status === "Success") {
      const updatedUser = { ...user, avatar: avatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNotification({
        message: "Foto actualizada correctamente",
        type: "success",
      });
      setShowAvatarForm(false);
      setAvatarUrl("");
    }
  };

  if (!user) return <p>Cargando...</p>;

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
      <div className="form-container">
        <h1>Mi Perfil</h1>
        <div className="profile-avatar">
          <img src={user.avatar} alt="avatar" />
        </div>

        <button
          className="btn-primary"
          style={{ marginTop: "10px", marginBottom: "20px" }}
          onClick={() => setShowAvatarForm(!showAvatarForm)}
        >
          {showAvatarForm ? "Cancelar" : "Cambiar foto"}
        </button>

        {showAvatarForm && (
          <form
            onSubmit={handleAvatarSubmit}
            style={{ marginTop: "10px", boxShadow: "none", padding: "0" }}
          >
            <div>
              <label>URL de la nueva foto:</label>
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://ejemplo.com/mi-foto.jpg"
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Guardar foto
            </button>
          </form>
        )}

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

        <button
          className="btn-primary"
          style={{ marginTop: "20px" }}
          onClick={() => setShowPasswordForm(!showPasswordForm)}
        >
          {showPasswordForm ? "Cancelar" : "Cambiar contraseña"}
        </button>

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordSubmit}
            style={{ marginTop: "20px", boxShadow: "none", padding: "0" }}
          >
            <div>
              <label>Contraseña actual:</label>
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label>Nueva contraseña:</label>
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div>
              <label>Confirmar nueva contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Guardar contraseña
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
