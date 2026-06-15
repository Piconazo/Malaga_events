const User = require("../Models/userModel");
const bcrypt = require("bcrypt");

// GET — Obtener perfil del usuario
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// PATCH — Actualizar perfil
const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    }).select("-password");
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

// PATCH — Cambiar contraseña
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword)
      return res.status(401).json({ message: "Contraseña actual incorrecta" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res
      .status(200)
      .json({ status: "Success", message: "Contraseña actualizada" });
  } catch (error) {
    res.status(400).json({ status: "Error", error: error.message });
  }
};

module.exports = { getProfile, updateProfile, updatePassword };
