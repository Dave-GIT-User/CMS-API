
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
            return sender_id;
        } catch (err) {
            console.error('Error obtaining sender_id:', err);
            throw err;
        }
    },
    async getAuthorId(_id) {
        try {
            const author = await Contact.findOne({"_id": _id}).exec();
            if (!author) {
                throw new Error('author not found');
            }
            const authorId = author.id;
            return authorId;
        } catch (err) {
            console.error('Error obtaining author id:', err);
            throw err;
        }
    },
};

module.exports = util;

