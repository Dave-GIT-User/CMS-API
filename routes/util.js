
const Contact = require('../models/contact');

// pattern based on sequenceGenerator
const util = {
    // This is a way to determine the _id of the sender of a message, given their id.
    async getContact_id(id) {
        try {
            const sender = await Contact.findOne({"id": id}).exec();
            if (!sender) {
                throw new Error('Sender not found');
            }
            const sender_id = sender._id;
            console.log('util/getContact_id: '+id+' -> '+sender_id );
            return sender_id;
        } catch (err) {
            console.error('Error obtaining sender_id:', err);
            throw err;
        }
    },
};

module.exports = util;

