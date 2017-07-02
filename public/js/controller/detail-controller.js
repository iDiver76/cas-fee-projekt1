import {$, Handlebars} from './../utils/lib.js';
import {default as RestService} from "./../service/rest-service.js";
import {default as Note} from "./../service/note-interface.js";

export default class DetailController {
  constructor() {
    this.newNote = new Note();
    this.noteService = new RestService();
    this.noteId = window.location.hash.substring(1);
    this.handlebarTpl = Handlebars.compile($('#detail').html());
  }

  renderTpl() {
    if (this.noteId) {
      this.noteService.getNote(this.noteId)
        .then(res => {
            this.newNote = new Note(res._id, res.creationDate, res.dueDate, res.finishDate, res.done, res.title, res.description, res.importance)
          }
        )
    }

    let selector = $("[data-js-sel='form']");
    selector.fadeOut(100, () =>
      selector.html(this.handlebarTpl(this.newNote)).fadeIn(100, () =>
        this.bindEvents())
    )
  };

  bindEvents() {
    $("body").find("[data-js-sel]").off();

    $("[data-js-sel='new-note']")
      .on("click", "button[type='reset']", e => {
        window.location.replace(e.delegateTarget.action);
      })
      .on("submit", e => {
        e.preventDefault();
        this.newNote._id = $("#note-id").val() || undefined;
        this.newNote.creationDate = new Date($("#creation-date").val()).getTime() || new Date().getTime();
        this.newNote.dueDate = new Date($("#dateTo").val()).getTime();
        this.newNote.title = $("#title").val();
        this.newNote.description = $("#description").val();
        this.newNote.importance = $("input[name='importance']:checked").val();

        if (!this.noteId) {
          this.noteService.add(this.newNote);
        }
        else {
          this.noteService.update(this.newNote);
        }
        window.location.replace(e.currentTarget.action);
      });
  };
}
