var express = require('express');
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');

var router = express.Router();

router.get('/', async (req, res, next) => {
    var documentArray = new Array();
    try {
    let documents = await Document.find();
    // clean this up before sending it back to the client!
    for (document of documents) {
        let id = document.id; 
        let name = document.name; 
        let description = document.description; 
        let url = document.url;
        let children = document.children; 
        documentArray.push({id, name, url, description, children});
    }
    return res.status(200).json({
        message: 'fetched Documents.',
        documents: documentArray
        }); 
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({
            error: error
        });
    }    
});

router.post("/:id", async (req, res, next) => { 
    try {
        const maxDocumentId = await sequenceGenerator.nextId("documents");
        const document = new Document({
            id: maxDocumentId,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        });
        document
            .save()
            .then((createdDocument) => {
                return res.status(201).json({
                    message: "Document added successfully.",
                    document: createdDocument,
                });
            })

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred saving the document.",
            error: error,
        });
    }
});

// update a single document
router.put('/:id', async (req, res, next) => {
    try {
        const document = new Document({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        });
        await document
        .updateOne({ id: req.params.id }, document)
        .then(result => {
            // put returns nothing anyway.
            console.log(result);
            console.log(document);
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