require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.log(`Error: ${error}`));
db.on("connected", () => console.log("Conectado a MongoDB ✅"));
db.on("disconnected", () => console.log("Desconectado de MongoDB"));

const authRouter = require("./router/authRoutes");
const userRouter = require("./router/userRoutes");
const eventRouter = require("./router/eventRoutes");

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/events", eventRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
