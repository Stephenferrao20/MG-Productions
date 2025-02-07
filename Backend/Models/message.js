const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("message", messageSchema);
