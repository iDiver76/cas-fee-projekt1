import {default as NoteController} from './controller/note-controller.js';

(function($) {
  $(function() {
    let notesObj = new NoteController("ls");
    notesObj.loadNotes();

    const handlebarTpl = Handlebars.compile($('#task').html());

    let bindEvents = function() {
      /// Events
      $(".task-status").on("click", "input[name=isDone]", e => {
        alert("guli");
        notesObj.updateNote(e.target.dataset.id);
      });

      $(".task-actions").on("click", ".toggle-task-details", e => {
        let target = $(e.currentTarget).attr("href");
        $(target).slideToggle("fast");
        $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
      });

      $("#filter").on("click", "[data-sort]", e => {
        $("#filter").find("*").removeClass("active");
        $(e.target).addClass("active");
        renderTpl(notesObj.sortNotes(e.target.dataset.sort, $("#toggle-completed")[0].checked));
      });


      $(".switch-wrapper")
        .on("change", "#styleswitch",() => {
          $(".wrapper-outer").toggleClass("sweet");
        })
        .on("change", "#toggle-completed", e => {
          renderTpl(notesObj.sortNotes( "", e.target.checked));
        });
    }

    let renderTpl = function(notes = notesObj.notes) {
      $('.tasks').html(handlebarTpl({item: notes}));
      bindEvents();
    };



    renderTpl();

  });

})(jQuery);
