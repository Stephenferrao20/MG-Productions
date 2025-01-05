const asyncHandler = require("express-async-handler");
const chat = require('../Models/chat');
const user = require('../Models/user');

const accessChat = asyncHandler(async (req, res) => {
    const { user_id } = req.body;

    if(!user_id){
        return res.status(400).send({ success: false, msg: "User ID is required" });
    }

    var isChat = await chat.find({ 
        $and:[
            {users : {$elemMatch : { $eq : req.user_id }}},
            {users : {$elemMatch : { $eq : user_id }}}
        ]

     }).populate('users').populate('latestMessage');

     isChat = await user.populate(isChat, {path: 'latestMessage.sender', select: 'name picture email'});

        if(isChat.length > 0){
            res.send(isChat[0]);
        }else{
            var chatData = {
                chatName: "sender",
                users: [req.user_id, user_id]
            };

            try {
                const createdChat = await chat.create(chatData);

                const fullChat = await chat.findOne({ _id: createdChat._id }).populate('users');
                res.status(200).send(fullChat);
            } catch (error) {
                return res.status(500);
                throw new Error(error.message);
            }
        }
});


const fetchChats = asyncHandler(async (req , res) => {
    try {
        chat.find({ users : { $elemMatch : { $eq : req.user_id }} }).populate('users').populate('latestMessage')
        .sort({ updatedAt : -1 })
        .then(async (results) =>{
            results = await user.populate(results, {path: 'latestMessage.sender', select: 'name picture email'});
            res.status(200).send(results);
        });
    } catch (error) {
        return res.status(400);
        throw new Error(error.message);
    }
})
module.exports = { accessChat , fetchChats };