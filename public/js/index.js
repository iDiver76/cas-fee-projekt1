import './utils/handlebars.js';
import {Handlebars} from './utils/lib.js';

import {default as NoteController} from './controller/note-controller.js';

(function($) {
  $(function() {

    let $styleSweet = JSON.parse(localStorage.getItem("styleSweet")) || false;
    //let $completeSwitch = $("[data-js-sel='complete-switch']")[0];

    // styleSwitcher
    if ($styleSweet) {
      $("[data-js-sel='style-switch']").attr("checked", true);
      $(".wrapper-outer").addClass("sweet");
    }

    // let $filterDoneNotes
    //localStorage.setItem("filterDoneNotes",

    const handlebarTpl = Handlebars.compile($('#task').html());
    let notesObj = new NoteController();
    notesObj.loadNotes();

    let bindEvents = function() {
      $("body").find("[data-js-sel]").off();

      $("[data-js-sel='task-status']").on("click", "input[name=is-done]", e => {
        notesObj.setCompleted(e.target.dataset.id)
          .then( () => {
            renderTpl();
          });
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
          console.log($("[data-js-sel='complete-switch']")[0].checked);
          localStorage.setItem("sortNotesType", e.target.dataset.jsSort);
          renderTpl(notesObj.sortNotes(e.target.dataset.jsSort, $("[data-js-sel='complete-switch']")[0].checked));
        }
      });

      $("[data-js-sel='switches']")
        .on("change", "[data-js-sel='style-switch']", e => {
          $(".wrapper-outer").toggleClass("sweet");
          $styleSweet = !$styleSweet;
          localStorage.setItem("styleSweet", $styleSweet);
        })
        .on("change", "[data-js-sel='complete-switch']", e => {
          localStorage.setItem("filterDoneNotes", e.target.checked);
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

    renderTpl(notesObj.sortNotes("date", $("[data-js-sel='complete-switch']")[0].checked));

  });

})(jQuery);
