const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email incorrecto"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    default: "https://ui-avatars.com/api/?name=User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
