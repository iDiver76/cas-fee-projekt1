/**
 * Created by davidjanssen on 06.05.17.
 */

"use strict";

(function($) {

  let data = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

  let addToDo = function() {
    let task = {
      id: data.length+1,
      date: new Date($("#dateTo").val()).getTime(),
      create: Date.now(),
      done: false,
      title: $("#title").val(),
      description: $("#description").val(),
      importance: $("input[name='importance']:checked").val()
    };
    data.push(task);
    return data;
  };

  $(function() {
      $("#styleswitch").on("change", () => {
        $(".wrapper-outer").toggleClass("sweet");
      });

      $(".toggle-task-details").on("click", (e) => {
        let target = $(e.currentTarget).attr("href");
        $(target).slideToggle("fast");
        $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
      });

    $("#newNote").on("submit", (e) => {
      localStorage.setItem("tasks", JSON.stringify(addToDo()));
    });


  });

})(jQuery);