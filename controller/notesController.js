const store = require("../service/notesStore.js");

module.exports.getAllNotes = function(req, res) {
  store.getAll(function (err, data) {
    //console.log(req);
    res.json(data || {});
  })
};

module.exports.addNote = function(req, res) {
  let newItem = req.body.note;
  console.log(newItem);
  store.addNote(newItem, function(err, note) {
    res.json(note);
  })

}