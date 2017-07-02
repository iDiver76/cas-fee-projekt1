export default class NoteInterface {
  constructor(_id = undefined, creationDate = new Date().getTime(), dueDate = new Date().getTime(), finishDate = null, done = false, title = null, description = null, importance = null) {
    this._id = _id;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.finishDate = finishDate;
    this.done = done;
    this.title = title;
    this.description = description;
    this.importance = importance;
  }
}