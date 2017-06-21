import {default as notesStorage} from './notesStorage.js';
import {default as jQEvents} from './shared.js';

(function($) {
  let data = new notesStorage();

  // let notes = new notes("filebased");
  //
  // Handelbar - Daten notes.data
  // Filter - notes.filter()
  // Sort - notes.sort()


  console.log(data);
  //data.getAllNotes();
  // let data = {
  //   tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
  // };

  let renderPage = function(contentData = data) {
    let source = $('#task').html();
    let handlebarTpl = Handlebars.compile(source);

    Handlebars.registerHelper('isChecked', function (importance, input) {
      return parseInt(importance) === parseInt(input) ? 'checked' : '';
    });

    Handlebars.registerHelper('isDone', function (done) {
      return done === true ? 'checked' : '';
    });

    Handlebars.registerHelper('dateFormat', function(context, block) {
      if (moment) {
        let f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
        return moment(context).format(f); //had to remove Date(context)
      }else{
        return context;   //  moment plugin not available. return data as is.
      }
    });

    $('.tasks').html(handlebarTpl(contentData));
  };

  let bindEvents = function() {

    $(".task-actions").on("click", ".toggle-task-details", (e) => {
      console.log("eeee", e);
      let target = $(e.currentTarget).attr("href");
      $(target).slideToggle("fast");
      $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
    });

    $("#filter").on("click", "[data-sort]", (e) => {
      $("#filter").find("*").removeClass("active");
      $(e.target).addClass("active");
      data.sortNotes(e.target.dataset.sort);
      renderPage();
    });

    $(".task-status").on("change", "input[name=isDone]", (e) => {
      data.toggleNoteStatus(e.target.dataset.id);
      data.getAllNotes();
    });

  };

  $(function() {
      renderPage(data);
      bindEvents();

    $(".switch-wrapper")
      .on("change", "#styleswitch",() => {
      $(".wrapper-outer").toggleClass("sweet");
      })
      .on("change", "#toggle-completed", () => {
        data = data.hideDoneNotes();
        console.log(data);
        renderPage();


        // notes.sfilter( "showAll", "showUndone")
      });
  });

})(jQuery);