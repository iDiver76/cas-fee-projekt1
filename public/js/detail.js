import {default as RestService} from "./service/rest-service.js";
import {default as Note} from "./service/note-interface.js";

(function ($) {

  $(function() {
    let newNote = new Note();
    let noteService = new RestService();
    let noteId = window.location.hash.substring(1);

    const handlebarTpl = Handlebars.compile($('#detail').html());

    let renderTpl = function(note= null) {
      let selector = $("[data-js-sel='form']");
      selector.fadeOut( 100, () =>
        selector.html(handlebarTpl(note)).fadeIn(100, () =>
          bindEvents())
      )
    };

    let bindEvents = function() {
      $("body").find("[data-js-sel]").off();

      $("[data-js-sel='new-note']")
        .on("click", "button[type='reset']", e => {
          window.location.replace(e.delegateTarget.action);
        })
        .on("submit", e => {
          e.preventDefault();
          newNote._id = $("#note-id").val() || undefined;
          newNote.creationDate = new Date($("#creation-date").val()).getTime() || new Date().getTime();
          newNote.dueDate = new Date($("#dateTo").val()).getTime();
          newNote.title = $("#title").val();
          newNote.description = $("#description").val();
          newNote.importance = $("input[name='importance']:checked").val();

          if (!noteId) {
            noteService.add(newNote);
          }
          else {
            noteService.update(newNote);
          }
          window.location.replace(e.currentTarget.action);
        });
    };

    if (noteId) {
      noteService.getNote(noteId)
        .then( res => {
          renderTpl(new Note(res._id, res.creationDate, res.dueDate, res.finishDate, res.done, res.title, res.description, res.importance))
        });
    } else {
      renderTpl(newNote);
    }

  });

})(jQuery);