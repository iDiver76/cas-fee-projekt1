'use strict';

const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/", notes.getAllNotes);
router.post("/", notes.addNote);
//router.get("/:id/", notes.showOrder);
//router.delete("/:id/", notes.deleteOrder);

module.exports = router;