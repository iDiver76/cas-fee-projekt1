import {default as Utility} from './../utils/ajaxUtils.js';

export default class RestService {
  constructor(dataSrc = null) {
    this.src = dataSrc || "nedb";
    this.ajaxUtil = new Utility();
  }

  loadDatafromSource() {
    let _inputNotes = [];
    switch (this.src) {
      case "ls":
        _inputNotes = JSON.parse(localStorage.getItem("tasks")) || notes;
        break;
      case "nedb":
      default:
        _inputNotes = this.getAllNotes();
    }
    return _inputNotes
  }

  getLastId() {
    return this.loadDatafromSource().length + 1;
  }

  getAllNotes() {
    return this.ajaxUtil.ajax("GET", "/notes", undefined, {});
  }

  getNote(id) {
    return this.ajaxUtil.ajax("GET", `/note/${id}`, undefined, {});
  }

  update(data) {
    return this.ajaxUtil.ajax("PUT", `/note/${data._id}`, {note: data});
  }

  completed(id) {
    return this.ajaxUtil.ajax("PUT", `/note/done/${id}`, {});
  }

  add(data) {
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
