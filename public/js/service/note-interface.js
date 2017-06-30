export default class NoteInterface {
  constructor(_id = null, creationDate = new Date().getTime(), dueDate = new Date().getTime(), done = null, title = null, description = null, importance = null) {
    this.id = _id;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.done = done;
    this.title = title;
    this.description = description;
    this.importance = importance;
  }
}