const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: "Error",
      message: "Acceso denegado — solo administradores",
    });
  }
  next();
};

module.exports = { adminMiddleware };
