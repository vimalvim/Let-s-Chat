const messageModel = require('../model/messageModel');

module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to ,message} = req.body;

        const data = await messageModel.create({
            message: {text:message},
            users: [from, to],
            sender: from,
        });
        console.log(data);
        if(data) return res.json({msg: "Message added successfully."});
        return res.json({msg: "Failed to add message to the database."});
    } catch (ex) {
        next(ex);
        
    }
  };


  module.exports.getAllMessage = async (req,res, next) => {
    try {
        const {from, to} = req.body;
        const messages = await messageModel.find({
            //displays all the users
            users: {
                //all operator and gets the msg from the user and display to the other user.
                $all: [from, to],
            },
        })
        .sort({ updatedAt : 1})
        const projectMessages = messages.map((msg)=> {
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        });
        res.json(projectMessages);

        
    } catch (ex) {
        next(ex);  
    }
  };

// module.exports.deleteMessage = async (req, res, next) => {
//     try {
//         const messageId = req.params.id;
//         const deletedMessage = await messageModel.findByIdAndDelete(messageId);

//         if (!deletedMessage) {
//             return res.status(404).json({ msg: 'Message not found' });
//         }

//         res.json({ msg: 'Message deleted successfully' });
//     } catch (ex) {
//         next(ex);
//     }
// };