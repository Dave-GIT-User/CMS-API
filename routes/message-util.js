
const Contact = require('../models/contact');

// pattern based on sequenceGenerator
// We need a way to determine the _id of the sender of a message, given their id.

const messageUtil = {
     async getSender_id(id) {
        console.log('looking for sender')
        try {
            const sender = await Contact.findOne({"id": id}).exec();
            if (!sender) {
                throw new Error('Sender not found');
            }
            const sender_id = sender._id;
            return sender_id;
        } catch (err) {
            console.error('Error obtaining sender_id:', err);
            throw err;
        }
    }    
};

module.exports = messageUtil;

