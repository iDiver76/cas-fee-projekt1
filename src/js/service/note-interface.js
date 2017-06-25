

export default class NoteInterface {
  constructor(id = null, creationDate = null, dueDate = null, done = null, title = null, description = null, importance = null) {
    this.id = id;
    this.creationDate = creationDate;
    this.dueDate = dueDate;
    this.done = done;
    this.title = title;
    this.description = description;
    this.importance = importance;
  }
}