const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
  },
  category: {
    type: String,
    enum: [
      "Música",
      "Deportes",
      "Gastronomía",
      "Arte",
      "Tecnología",
      "Ocio",
      "Cultura",
    ],
    required: true,
  },
  location: {
    type: String,
    required: [true, "La ubicación es obligatoria"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "La fecha es obligatoria"],
  },
  price: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/400x200",
  },
  capacity: {
    type: Number,
    required: [true, "La capacidad es obligatoria"],
  },
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model("Event", eventSchema, "events");
module.exports = Event;
