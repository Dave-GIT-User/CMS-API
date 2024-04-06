
const Contact = require('../models/contact');
const Document = require('../models/document');
const Message = require('../models/message');


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
    async getContactId(_id) {
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
    // Messages and documents each have foreign keys to contacts.
    // If a contact is deleted, first their documents and 
    // messages must be purged.
    async purgeOphanedRecords(id) {
        try {
            // const author = await Contact.findOne(
            const contact_id = await this.getContact_id(id);
            await Document.deleteMany({author: contact_id})
            console.log("orphaned documents purged.");
            await Message.deleteMany({sender: contact_id})
            console.log("orphaned messagess purged.");
        } catch (err) {
            console.error('Error purging orphaned records', err);
            throw err;
        }
    }
};

module.exports = util;

