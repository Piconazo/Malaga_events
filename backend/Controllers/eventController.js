const Event = require("../Models/eventModel");

// GET — Obtener todos los eventos
const getEvents = async (req, res) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;
    const filter = category ? { category } : {};

    const events = await Event.find(filter)
      .populate("organizer", "name lastName")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: 1 });

    const total = await Event.countDocuments(filter);

    res.status(200).json({
      status: "Success",
      data: events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// GET — Obtener un evento por ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name lastName email")
      .populate("attendees", "name lastName");
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json({ status: "Success", data: event });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// POST — Crear evento
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,
      organizer: req.user.id,
    });
    await newEvent.save();
    res
      .status(201)
      .json({ status: "Success", message: "Evento creado", data: newEvent });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// PATCH — Actualizar evento
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json({ status: "Success", data: event });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// DELETE — Eliminar evento
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json({ status: "Success", message: "Evento eliminado" });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// POST — Inscribirse a un evento
const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });

    if (event.attendees.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Ya estás inscrito en este evento" });
    }

    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: "El evento está completo" });
    }

    event.attendees.push(req.user.id);
    await event.save();

    res
      .status(200)
      .json({
        status: "Success",
        message: "Inscripción correcta",
        data: event,
      });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// DELETE — Cancelar inscripción
const leaveEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Evento no encontrado" });

    event.attendees = event.attendees.filter(
      (attendee) => attendee.toString() !== req.user.id,
    );
    await event.save();

    res
      .status(200)
      .json({ status: "Success", message: "Inscripción cancelada" });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  joinEvent,
  leaveEvent,
};
