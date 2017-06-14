/**
 * Created by davidjanssen on 06.05.17.
 */

"use strict";

(function($) {

  let data = {
    tasks: localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
  };

  let renderPage = function() {
    let source = $('#task').html();
    let handlebarTpl = Handlebars.compile(source);

    Handlebars.registerHelper('isChecked', function (importance, input) {
      return parseInt(importance) === parseInt(input) ? 'checked' : '';
    });

    Handlebars.registerHelper('isDone', function (done) {
      return done === true ? 'checked' : '';
    });

    Handlebars.registerHelper('dateFormat', function(context, block) {
      if (window.moment) {
        let f = block.hash.format || "MMM DD, YYYY hh:mm:ss A";
        return moment(context).format(f); //had to remove Date(context)
      }else{
        return context;   //  moment plugin not available. return data as is.
      }
    });

    $('.tasks').html(handlebarTpl(data));
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
      sortList(e.target.dataset.sort);
    });

    $(".task-status").on("change", "input[name=isDone]", (e) => {
      getTaskById(e.target.dataset.id);
    })
  };

  let sortList = function(sortBy) {

    switch(sortBy) {
      case "date":
        data.tasks.sort(function(a, b){return parseFloat(a.date) - parseFloat(b.date)});
        break;
      case "create":
        data.tasks.sort(function(a, b){return parseFloat(a.create) - parseFloat(b.create)});
        break;
      case "importance":
        data.tasks.sort(function(a, b){return parseFloat(a.importance) - parseFloat(b.importance)});
        break;
    }
    renderPage();
    bindEvents();
  };

  let getTaskById = function(id) {
    let result =  $.grep(data.tasks, function(e){ return e.id == id; });
    result[0].done = !result[0].done;
    localStorage.setItem("tasks", JSON.stringify(data.tasks));
  };

  $(function() {
      renderPage();
      bindEvents();

    $(".switch-wrapper")
      .on("change", "#styleswitch",() => {
      $(".wrapper-outer").toggleClass("sweet");
      })
      .on("change", "#toggle-completed", () => {
        let result =  $.grep(data.tasks, function(e){ return e.done === false; });
      });
  });

})(jQuery);