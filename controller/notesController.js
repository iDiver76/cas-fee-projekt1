const store = require("../service/notesStore.js");

module.exports.getAllNotes = function(req, res) {
  store.getAll(function (err, data) {
    res.json(data || {});
  })
};

module.exports.addNote = function(req, res) {
  let newItem = req.body.note;
  store.addNote(newItem, function(err, note) {
    res.json(note);
  })
};

module.exports.getNote = function(req, res){
  console.log(req);
  store.getNote(req.params.id, function(err, note) {
    res.json(note);
  });
};

module.exports.updateNote =  function (req, res) {
  let updatedNote = req.body.note;
  if(updatedNote) {
    store.updateNote(req.params.id, updatedNote, function (err, note) {
      res.json(note);
    });
  }
};

module.exports.setCompleted = function (req, res) {
  store.setCompleted(req.params.id, function (err, note) {
    res.json(note);
  });
};