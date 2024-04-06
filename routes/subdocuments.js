var express = require('express');
const Document = require('../models/document');
//const sequenceGenerator = require('./sequenceGenerator');
//const util = require('./util');

var router = express.Router();

// update a single document
// The difference between this and the put
// method of documents.js is that it 
// is for adding, deleting or updating child documents
router.put('/:id', async (req, res, next) => {
    
    try {
        console.log("subdocument put child id "+req.params.id+ " "+req.body.name);

        /*
        // We don't do this, but may learn from it.
        if (!req.body.children){
            const document = {
                name: req.body.name,
                description: req.body.description,
                url: req.body.url,
            };
    
            await Document
            .updateOne({ id: req.params.id }, document)
            .then(result => {
                // put returns nothing anyway.
                console.log('Document updated successfully');
                res.status(204).json({            
                })
            })        
        } else {
            const document = await findOne({"id": req.body.id});
            if (document.children.pop())
        }*/
        // figure out we we are supposed to delete, edit, or add a subdocument.
        var operation = "delete"// really do some analysis to determine the operation.
        switch (operation) {
            case "delete":
                let document = await Document.findOne({"id": req.body.id}); // the parent document
                let child = await document.children[req.params.id];
                await child.deleteOne();
                document.save() // not child.save()!
               .then(result => {
                res.status(204).json({      
                    message: result      
                })
            }); 
                break;
            case "edit":
                this.maxMessageId++;
                updateObject = { maxMessageId: this.maxMessageId };
                nextId = this.maxMessageId;
                break;
            case "add":
                this.maxContactId++;
                updateObject = { maxContactId: this.maxContactId };
                nextId = this.maxContactId;
                break;
            default:
                throw new Error('Invalid child document operation');
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred updating the document.",
            error: error,
        });
    }
});

module.exports = router; 