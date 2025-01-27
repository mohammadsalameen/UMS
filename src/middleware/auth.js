import jwt from "jsonwebtoken";
const auth = () => {
  try {
    return (req, res, next) => {
      const { token } = req.headers;
      const decoded = jwt.verify(token, "mohammad");
      if (decoded.role != "admin") {
        return res.status(400).json({ message: "not authorized" });
      }
      next();
    };
  } catch (err) {
    return res.status(500).json("server error", err);
  }
};

export default auth;
