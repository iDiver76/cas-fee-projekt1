const express = require('express');
const router = express.Router();
const notes = require('../controller/notesController.js');

router.get("/notes", notes.getAllNotes);
router.post("/note", notes.addNote);
router.get("/note/:id/", notes.getNote);
router.put("/note/:id/", notes.updateNote);
router.put("/note/done/:id/", notes.setCompleted);

module.exports = router;