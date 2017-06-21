import {default as noteStorage} from "./notesStorage.js";

(function($) {

  $(function() {
      const data = new noteStorage();
      // $("#styleswitch").on("change", () => {
      //   $(".wrapper-outer").toggleClass("sweet");
      // });
      //
      // $(".toggle-task-details").on("click", (e) => {
      //   let target = $(e.currentTarget).attr("href");
      //   $(target).slideToggle("fast");
      //   $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
      // });

    $("#newNote").on("submit", (e) => {
      data.saveNewNote();
    });

  });

})(jQuery);