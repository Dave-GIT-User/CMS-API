var express = require('express');
const Document = require('../models/document');
const sequenceGenerator = require('./sequenceGenerator');
//const util = require('./util');

var router = express.Router();

// update a single document
// The difference between this and the put
// method of documents.js is that it 
// is for adding, deleting or updating child documents
router.post('/:id', async (req, res, next) => {
    console.log("subdocuments post");
    try {
        index = req.params.id;
        const  document = await Document.findOne({"id": req.body.id}); // the parent document
        // do some analysis to determine the operation.
        var destCount = 0;
        for (let child of document.children) {
            destCount++;
        }
        var srcCount = 0;
        for (let child of req.body.children) {
            srcCount++;
        }

        var operation = "";
        if (srcCount > destCount) {
            operation = "add";
        } else if (srcCount == destCount) {
            operation = "edit";
        } else operation = "delete";

        var id = "0"; // only needed for add, ignored at the client otherwise.
        switch (operation) {
            case "delete":
                console.log("delete");
                deletedChild = document.children[index]; 
                await deletedChild.deleteOne();
                break;
            case "edit":
                console.log("edit");
                req.body.children[index].author = document.author;
                console.log(req.body.children[index].author);
                document.children[index] = req.body.children[index];
                break;
            case "add": 
                index = srcCount - 1; // ignore the index passed in req
                const id = await sequenceGenerator.nextId("documents");
                const author = document.author;
                const name = req.body.children[index].name;
                const description = req.body.children[index].description;
                const url = req.body.children[index].url;
                await document.children.push({id: id, author: author, name: name, description: description, url: url});
                break;
            default:
                throw new Error('Invalid child document operation');
        }
        await document.save()
        .then((response) => { 
            res.status(201).json({
                statusMessage: "Message added successfully.",
                feedback: id 
            });
        })
    } catch(error) {
            res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

module.exports = router; 