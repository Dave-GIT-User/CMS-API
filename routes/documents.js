var express = require('express');
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');
const util = require('./util');

var router = express.Router();

router.get('/', async (req, res, next) => {  
    var documentArray = new Array;
    Document.find()
        .populate('author') // the foreign key -> contact
        .then(documents => {
        // clean this up before sending it back to the client!
        for (document of documents) {
            let id = document.id; 
            let author = document.author.id;
            let name = document.name; 
            let description = document.description; 
            let url = document.url;
            let children = document.children; 
            documentArray.push({id, author, name, description, url, children});
        }        
        res.status(200).json({
            message: 'Documents fetched successfully!',
            documents: documentArray
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});


router.post('/:id', async (req, res, next) => {
    try {
        const author_id = await util.getContact_id(req.body.author);
        maxDocumentId = await sequenceGenerator.nextId("documents");
        const document = new Document({
            id: maxDocumentId,
            author: author_id,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url, 
        });

            let id = maxDocumentId;
            let author = req.body.author;
            let name = req.body.name; 
            let description = req.body.description; 
            let url = req.body.url;
            responseDocument = {id, author, name, description, url};
        document.save()
        .then((response) => { 
            res.status(201).json({
                statusMessage: "Message added successfully.",
                document: responseDocument // try to send back a clean document.
            });
        })
    } catch(error) {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

// update a single document
router.put('/:id', async (req, res, next) => {
    try {
        const document = {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        };
        await Document
        .updateOne({ id: req.params.id }, document)
        .then(result => {
            // put returns nothing anyway.
            console.log('Document updated successfully');
            res.status(204).json({            
        })
    })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred updating the document.",
            error: error,
        });
    }
});

router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
        .then(document => {
            Document.deleteOne({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                message: "Document deleted successfully"
            });
        })
            .catch(error => {
                res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        })
    })
});

module.exports = router; 