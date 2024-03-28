
const Contact = require('../models/contact');

// pattern based on sequenceGenerator
// We need a way to determine the _id of the sender of a message, given their id.

const messageUtil = {
    /*
    sequenceId: null,
    maxDocumentId: 0,
    maxMessageId: 0,
    maxContactId: 0,

    async init() {
        try {
            const sequence = await Sequence.findOne({}).exec();
            if (!sequence) {
                throw new Error('Sequence not found');
            }
            this.sequenceId = sequence._id;
            this.maxDocumentId = sequence.maxDocumentId;
            this.maxMessageId = sequence.maxMessageId;
            this.maxContactId = sequence.maxContactId;
        } catch (err) {
            console.error('Error initializing SequenceGenerator:', err);
            throw err;
        }
    },
*/
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

