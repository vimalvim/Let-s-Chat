const { addMessage, getAllMessage, deleteMessage} = require ("../controllers/messagesController");

const router = require("express").Router();



router.post('/addMessage', addMessage);
router.post('/getAllMessage',getAllMessage);
// router.delete('/:id', deleteMessage);

module.exports = router;