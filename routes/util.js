
const Contact = require('../models/contact');

// pattern based on sequenceGenerator
const util = {
    // This is a way to determine the _id of the sender of a message, given their id.
    async getSender_id(id) {
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
    // based on https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    // usage: hash = hashCode(str); 
    // This method is synchronous (no need to use await keyword)
    hashCode(str) {
        var hash = 0,
        i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
        console.log('partial hash '+hash);
      }
      return 'xyz'+hash;    
    }
};

module.exports = util;

