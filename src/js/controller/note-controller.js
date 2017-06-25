import {default as RestService} from "./../service/rest-service.js";
import {default as Note} from "./../service/note-interface.js"

export default class NoteController {
  constructor(dataSrc) {
    this.noteService = new RestService(dataSrc);
    this.notes = [];
    this.checked = true;
  }

  loadNotes() {
    let _notes = this.noteService.loadDatafromSource();
    for (let item of _notes) {
      this.notes.push(new Note(item.id, item.creationDate, item.dueDate,
      item.done, item.title, item.description, item.importance));
    }
  }

  updateNote() {
    this.noteService.update();
  }

  sortNotes(sortBy, filter) {
    let result = [];
    switch (sortBy) {
      case "date":
        result = this.notes.sort((a, b) => parseFloat(a.dueDate) - parseFloat(b.dueDate));
        if (!filter) {
          result = this.notes.filter(item => item.done == filter);
        }
        return result;
        break;
      case "create":
        result = this.notes.sort((a, b) => parseFloat(a.creationDate) - parseFloat(b.creationDate));
        if (!filter) {
          result = this.notes.filter(item => item.done == filter);
        }
        return result;
        break;
      case "importance":
        result = this.notes.sort((a, b) => parseFloat(b.importance) - parseFloat(a.importance));
        if (!filter) {
          result = this.notes.filter(item => item.done == filter);
        }
        return result;
        break;
      default:
        if (!filter) {
          return this.notes.filter(item => item.done == filter);
        }
        return;
    }
  }

}
