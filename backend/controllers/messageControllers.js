const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

// @desc    Get all messages
// @route   GET /api/message/:chatId
// @access  Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate({ path: "sender", select: "name pic email", strictPopulate: false })
      .populate({ path: "chat", strictPopulate: false });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Create a new message
// @route   POST /api/message
// @access  Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const newMessage = {
    sender: req.user._id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    // Populate sender and chat safely
    message = await message.populate({ path: "sender", select: "name pic email", strictPopulate: false });
    message = await message.populate({ path: "chat", strictPopulate: false });
    message = await User.populate(message, { path: "chat.users", select: "name pic email" });

    // Update latestMessage in Chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message }, { new: true });

    res.status(200).json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
