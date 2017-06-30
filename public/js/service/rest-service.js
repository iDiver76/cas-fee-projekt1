import {notes} from './data.js';
import {default as Utility} from './../utils/ajaxUtils.js';

export default class RestService {
  constructor(dataSrc = null) {
    this.src = dataSrc || "ls";
    this.ajaxUtil = new Utility();
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
    return this.ajaxUtil.ajax("GET", "/notes", undefined, {});
  }

  getNote(id) {
    return this.ajaxUtil.ajax("GET", `/note/${id}`, undefined, {});
  }

  update(data) {
    return this.ajaxUtil.ajax("PUT", `/note/${data.id}`, {note: data});
  }

  completed(id) {
    return this.ajaxUtil.ajax("PUT", `/note/done/${id}`, {});
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
      default:
        this.ajaxUtil.ajax("POST", "/note", {note: data}, {});
        break;
    }
  }
}
