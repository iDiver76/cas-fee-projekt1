import {notes} from './data.js';

export default class RestService {
  constructor(dataSrc) {
    this.src = dataSrc || "ls";
  }

  loadDatafromSource() {
    let _inputNotes = [];
    switch (this.src) {
      case "ls":
        _inputNotes = JSON.parse(localStorage.getItem("tasks")) || notes;
        break;
      case "file":
        _inputNotes.getAllNotes();
        break;
      default:
      // TODO
      //this.notes = load data from DB
    }
    return _inputNotes
  }

  getLastId() {
    console.log(this.loadDatafromSource().length + 1);
    return this.loadDatafromSource().length + 1;
  }

  //getAllNotes() {
  //   let notesArr = JSON.parse(localStorage.getItem("tasks")) || notes;
  //   this.uid = this.getLastId(notesArr);
  //   return notesArr;
  // }

  update() {
    alert("edit Note");
  }

  add(data) {
    console.log(data);

    switch (this.src) {
      case "ls":
        let _tmp = this.loadDatafromSource();
        data.id = this.getLastId();
        _tmp.push(data);
        localStorage.setItem("tasks", JSON.stringify(_tmp));
        break;
      case "file":
        // ToDo
        break;
      default:
      // TODO
      //this.notes = load data from DB
    }
  }
}
