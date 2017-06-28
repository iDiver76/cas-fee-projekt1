const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function getAllNotes(callback) {
  console.log(db);
  db.find({}, (err, docs) => {
    callback( err, docs);
  });
}
function addNote(data, callback) {
  db.insert(data, (err, docs) => {
    if (callback) {
      callback(err, docs);
    }
  })
}

module.exports = {
  getAll: getAllNotes,
  addNote: addNote
};