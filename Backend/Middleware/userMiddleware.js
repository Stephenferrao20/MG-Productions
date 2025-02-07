const admin = require("../config/firebase.config");
const user = require("../Models/user");  // Correct the import variable name

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await admin.auth().verifyIdToken(token);
      // Find the user in MongoDB using the Firebase UID
      const userExist = await user.findOne({ "user_id": decoded.user_id });

      if (!userExist) {
        return res.status(404).json({ error: "User not found in the database" });
      }

      // Attach user data to req.user
      req.user = userExist;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ error: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
