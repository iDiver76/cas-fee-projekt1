/**
 * Created by davidjanssen on 06.05.17.
 */

"use strict";

(function () {

  let data = {};
  let result = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

  data = {
    tasks: [
      {id: "1", date: "21.06.2017", done: false, title: "CAS FEE 1", val: 4},
      {id: "2", date: "22.06.2017", done: true, title: "CAS FEE 2 Done", val: 1},
      {id: "3", date: "25.06.2017", done: false, title: "CAS FEE 3", val: 2},
      {id: "4", date: "29.06.2017", done: true, title: "CAS FEE 4", val: 4},
      {id: "5", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5},
      {id: "6", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5},
      {id: "7", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5},
      {id: "8", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5},
      {id: "9", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5},
      {id: "10", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5}
    ]
  };

  function send(){

    users.id = result.length+1;
    users.name = document.getElementById("name").value;

    result.push(data);
    localStorage.setItem("users", JSON.stringify(result));

    window.location.replace("list.html");
  }


    function renderPage() {
        let source = $('#task').html();
        let handlebarTpl = Handlebars.compile(source);

        Handlebars.registerHelper('isChecked', function (val, input) {
          return val === input ? 'checked' : '';
        });

      Handlebars.registerHelper('isDone', function (done) {
        return done === true ? 'checked' : '';
      });

        $('.tasks').html(handlebarTpl(data));
    }
    renderPage();

    $("#styleswitch").on("change", () =>{
      $(".wrapper-outer").toggleClass("sweet");
    });

    $(".toggle-task-details").on("click", (e) => {
      let target = $(e.currentTarget).attr("href");
      $(target).slideToggle("fast");
      $(e.currentTarget).find("i").toggleClass("fa-plus").toggleClass("fa-minus");
    })
})();