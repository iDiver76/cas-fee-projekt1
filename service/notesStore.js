const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function getAllNotes(callback) {
  db.find({}, (err, docs) => {
    callback( err, docs);
  });
}

function getNote(id, callback){
  db.findOne({ _id: id}, function (err, doc) {
    callback( err, doc);
  });
}

function addNote(data, callback) {
  db.insert(data, (err, newDoc) => {
    if (callback) {
      callback(err, newDoc);
    }
  })
}

function updateNote(id, data, callback) {
  db.update({_id: id}, data, {}, function (err, numReplaced) {
    callback(err, data);
  });
}


function setCompleted(id, callback){
  let finishDate = new Date().getTime();
  db.update({_id: id}, {$set: {done: true, finishDate: finishDate}}, {}, function (err, count) {
    getAllNotes(callback);
  });
}


module.exports = {
  getAll: getAllNotes,
  addNote: addNote,
  getNote: getNote,
  updateNote: updateNote,
  setCompleted: setCompleted
};