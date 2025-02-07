const expressAsyncHandler = require("express-async-handler");
const Message = require("../Models/message");
const Chat = require("../Models/chat");

const sendMessages = expressAsyncHandler(async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      return res.status(400).json({ error: "Content and Chat ID are required" });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const message = {
      sender: req.user._id, 
      content,
      chat: chatId,
    };

    const savedMessage = await Message.create(message);

    await Chat.findByIdAndUpdate(chatId, { latestMessage: savedMessage });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name imageURL email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { sendMessages, allMessages };
