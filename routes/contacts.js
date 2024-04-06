var express = require('express');
const Contact = require('../models/contact');
const sequenceGenerator = require('./sequenceGenerator');
const util = require('./util');

var router = express.Router();

router.get('/', (req, res, next) => {
    var contactArray = new Array;
    Contact.find()
      .populate('group')
      .then(contacts => {
        // this is so new messages can set the sender foreign key.
        owner = contacts[0]._id;
        // clean this up before sending it back to the client!
        for (contact of contacts) {
            let id = contact.id; 
            let name = contact.name; 
            let email = contact.email; 
            let phone = contact.phone; 
            let imageUrl = contact.imageUrl; 
            let group = contact.group;
            let hash = contact.hash;
            let admin = contact.admin;
            contactArray.push({id, name, email, phone, imageUrl, group, hash, admin});
        }
        res.status(200).json({
            message: 'Contacts fetched successfully!',
            contacts: contactArray
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });

router.post("/:id", async (req, res, next) => { 
    try {
        const maxContactId = await sequenceGenerator.nextId("contacts");
        const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl, 
        group: [],
        hash: req.body.hash,
        admin: req.body.admin
        });
        await contact
            .save()
            .then((createdContact) => {
                return res.status(201).json({
                    message: "Contact added successfully.",
                    contact: createdContact,
                });
            })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred saving the contact.",
            error: error,
        });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const contact = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            imageUrl: req.body.imageUrl, 
            group: req.body.group,
            hash: req.body.hash
        };
        await Contact
        .updateOne({ id: req.params.id }, contact)
        .then(result => {
            // put returns nothing anyway.
            res.status(204).json({            
        })
    })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred updating the contact.",
            error: error,
        });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const contactId = req.params.id;
        await util.purgeOphanedRecords(contactId);
        await Contact.findOne({ id: id })
        .then(contact => {
            contact.deleteOne({ id: contactId })
            .then(result => {
                res.status(204).json({
                message: "Contact deleted successfully"
                });
            })
        })
    } catch(error) {
        res.status(500).json({
        message: 'An error occurred',
        error: error
        });
    }
});

module.exports = router; 