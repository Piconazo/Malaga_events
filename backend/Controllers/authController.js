const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El email ya está registrado" });

    const newUser = new User({
      name,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    res.status(201).json({
      status: "Success",
      message: "Usuario registrado correctamente",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      status: "Success",
      message: "Login correcto",
      token,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

module.exports = { signup, login };
