import {default as NoteController} from './controller/note-controller.js';

(function($) {
  $(function() {
    const handlebarTpl = Handlebars.compile($('#task').html());

    let notesObj = new NoteController();
    notesObj.loadNotes();

    let bindEvents = function() {
      $("body").find("[data-js-sel]").off();

      $("[data-js-sel='task-status']").on("click", "input[name=is-done]", e => {
        notesObj.setCompleted(e.target.dataset.id);
      });

      $("[data-js-sel='task-actions']").on("click", "[data-js-sel='toggle-task-details']", e => {
        let target = $(e.currentTarget).attr("data-detail");
        $(target).slideToggle("fast");
        $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
      });

      $("[data-js-sel='task-filter']").on("click", "[data-js-sort]", e => {
        let elem = $(e.target);
        if (!elem.hasClass("active")) {
          $(e.delegateTarget).find("*").removeClass("active");
          $(e.target).addClass("active");
          renderTpl(notesObj.sortNotes(e.target.dataset.jsSort, $("[data-js-sel='complete-switch']")[0].checked));
        }
      });

      $("[data-js-sel='switches']")
        .on("change", "[data-js-sel='style-switch']", e => {
          $(".wrapper-outer").toggleClass("sweet");
        })
        .on("change", "[data-js-sel='complete-switch']", e => {
          renderTpl(notesObj.sortNotes( "", e.target.checked));
        });
    };

    let renderTpl = function(notes = notesObj.notes) {
      let selector = $("[data-js-sel='tasks']");
      selector.fadeOut( 100, () =>
        selector.html(handlebarTpl({item: notes})).fadeIn(100, () =>
          bindEvents())
      )
    };

    renderTpl();

  });

})(jQuery);
