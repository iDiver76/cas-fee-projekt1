import {default as RestService} from "./service/rest-service.js";
import {default as Note} from "./service/note-interface.js";

(function ($) {

  $(function () {
    const noteService = new RestService("nedb");

    $("[data-js-sel='new-note']").on("click", "button[type='reset']", e => {
      window.location.replace(e.delegateTarget.action);
    });

    $("[data-js-sel='new-note']").on("submit", e => {
      e.preventDefault();
      let newNote = new Note();
      newNote.creationDate = Date.now();
      newNote.dueDate = new Date($("#dateTo").val()).getTime();
      newNote.done = false;
      newNote.title = $("#title").val();
      newNote.description = $("#description").val();
      newNote.importance = $("input[name='importance']:checked").val();

      // add Note
      noteService.add(newNote);
      window.location.replace(e.currentTarget.action);
    });
  });

})(jQuery);
