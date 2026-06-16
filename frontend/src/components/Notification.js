import { useEffect } from "react";

export default function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!message) return null;

  return (
    <div
      className={`notification ${type === "error" ? "notification-error" : "notification-success"}`}
    >
      <p>{message}</p>
      <button onClick={onClose}>×</button>
    </div>
  );
}
