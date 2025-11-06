import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Auth Middleware Token:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = verifyToken(token);
    const user = await findUserById(decoded);
    if (!user) {
      console.log("User not found for decoded ID:", decoded);
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    console.log("Authenticated User:", user);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", error });
  }
};
