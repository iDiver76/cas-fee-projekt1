import {notes} from './data.js';
import {default as Utility} from './../utils/ajaxUtils.js';

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
      case "nedb":
        _inputNotes = this.getAllNotes();
        break;
      default:
      // TODO
      //this.notes = load data from DB
    }
    return _inputNotes;
  }

  getLastId() {
    console.log(this.loadDatafromSource().length + 1);
    return this.loadDatafromSource().length + 1;
  }

  getAllNotes() {
    return Utility.ajax("GET", "/notes", undefined, {});
  }


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
      case "nedb":
        Utility.ajax("POST", "/notes", {note: data}, {});
        break;
      default:
      // TODO
      //this.notes = load data from DB
    }
  }
}
