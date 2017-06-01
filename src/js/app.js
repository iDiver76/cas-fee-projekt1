/**
 * Created by davidjanssen on 06.05.17.
 */

"use strict";

(function () {
  let data = {
    tasks: [
      {id: "1", date: "21.06.2017", done: false, title: "CAS FEE 1", val: 4},
      {id: "2", date: "22.06.2017", done: true, title: "CAS FEE 2", val: 1},
      {id: "3", date: "25.06.2017", done: false, title: "CAS FEE 3", val: 2},
      {id: "4", date: "29.06.2017", done: true, title: "CAS FEE 4", val: 4},
      {id: "5", date: "30.06.2017", done: false, title: "CAS FEE 5", val: 5}
    ]
  };
    function renderPage() {
        let source = $('#task').html();
        let handlebarTpl = Handlebars.compile(source);

        Handlebars.registerHelper('isChecked', function (val, input) {
          console.log(val);
          return val === input ? 'checked' : '';
        });

        $('.tasks').html(handlebarTpl(data));
    }
    renderPage();

    $("#styleswitch").on("change", () =>{
      alert("style changed");
      $(".wrapper").toggleClass("black");
    });
})();